import moment from 'moment';
import * as d3 from 'd3';

import Builder from './Builder.js';
import * as c from './Classes.js';
import Pool from './Pool.js';
import Term from './Term.js';

export default class Stylist {
    /* **************************************************************** *
     *  Pool
     * **************************************************************** */
    makeIndexWpKeyParent (pool) {
        return pool.list.reduce((ht, d) => {
            if (!ht[d.parent])
                ht[d.parent] = [];

            ht[d.parent].push(d);

            return ht;
        }, {});
    }
    data2pools (data) {
        const makeIndex = (ht, d) => {
            if (!ht[d.parent])
                ht[d.parent] = [];

            ht[d.parent].push(d);

            return ht;
        };

        const groups = new Pool(data.groups).data();
        const wbs = new Pool(data.wbs).data();
        const workpackages = new Pool(data.workpackages).data();

        return {
            gropus: groups,
            wbs: wbs,
            workpackages: workpackages,
            head: null,
            body: null,
            foot: null,
            stage: null,
            indexWpKeyParent: workpackages.list.reduce(makeIndex, {}),
        };
    }
    /* **************************************************************** *
     *  make data or class
     * **************************************************************** */
    makeScale (stage, term) {
        return d3
            .scaleTime()
            .range([0, stage.contentsW()])
            .domain([term.start, term.end]);
    }
    makeStage (data, term, style) {
        return new c.Stage({}, style.stage).init(data.scale, term);
    }
    makeHeaderCells (style, pools) {
        const scale = pools.scale;
        const term = pools.term;

        const cells = [];

        const start = moment(term.start);
        const end = moment(term.end);

        let cell_start = moment(start);

        while (cell_start.isBefore(end)) {
            const cell_end = moment(cell_start).add('d', 1);

            let x_start = scale(cell_start.toDate());
            let x_end   = scale(cell_end.toDate());

            const obj = new c.Cell({
                start: moment(cell_start),
                end:   moment(cell_end),
            }, style.head.cell);

            obj.location({
                x: x_start + pools.stage.padding(),
                y: 0       + pools.stage.padding(),
            });

            obj.size({
                w: x_end - x_start,
                h: style.head.h
            });

            cells.push(obj);

            cell_start.add('M', 1);
        }

        return cells;
    }
    makeGrid (cycle, style, pools) {
        const scale = pools.scale;
        const term = pools.term;

        const cells = [];

        const start = moment(term.start);
        const end = moment(term.end);

        const h = pools.head._size.h + pools.body._size.h + pools.foot._size.h;

        // 月次の線を追加
        let cell_start = moment(start);
        while (cell_start.isBefore(end)) {

            let x_start = scale(cell_start.toDate());

            const obj = {
                location: {
                    x: x_start,
                    y: style.stage.padding,
                },
                size: { w: 0, h: h },
                stroke: {
                    color: '#666666',
                    width: '3',
                    dasharray: null,
                },
            };

            if (obj.location.x>0)
                cells.push(obj);

            cell_start.add('M', 1);
        }

        // 週次の線を追加
        if (cycle==='w') {
            // 週の始め(月曜日)を算出
            const week_start = moment(term.start);

            if (week_start.day()>0)
                week_start.startOf('week');

            week_start.add(1, 'd');
            while (week_start.isBefore(end)) {
                let x_start = scale(week_start.toDate());

                const obj = {
                    location: {
                        x: x_start,
                        y: style.stage.padding,
                    },
                    size: { w: 0, h: h },
                    stroke: {
                        color: '#999999',
                        width: '1',
                        dasharray: 3,
                    },
                };

                if (obj.location.x>0)
                    cells.push(obj);

                week_start.add(1, 'w');
            }
        }

        // 日次の線を追加
        if (cycle==='d') {
            const day_start = moment(term.start);

            day_start.add(1, 'd');

            while (day_start.isBefore(end)) {
                let x_start = scale(day_start.toDate());

                const obj = {
                    location: {
                        x: x_start,
                        y: style.stage.padding,
                    },
                    size: { w: 0, h: h },
                    stroke: {
                        color: '#999999',
                        width: day_start.day()===1 ? 2 : 1,
                        dasharray: 3,
                    },
                };

                if (obj.location.x>0)
                    cells.push(obj);

                day_start.add(1, 'd');
            }
        }

        return cells;
    }
    makeNow (style, pools) {
        const scale = pools.scale;

        const x = scale(new Date());
        const y = style.stage.padding;

        const h = pools.head._size.h + pools.body._size.h + pools.foot._size.h;

        return {
            x1: x,
            y1: y,
            x2: x,
            y2: y + h,
        };
    }
    /* **************************************************************** *
     *  Styling
     * **************************************************************** */
    stylingWorkpackages (style, scale, data) {
        const pool = new Pool().data();

        const index = {};
        for (const wp of data.workpackages) {
            const elem = new c.Workpackage(wp, style.body.chart);

            elem.styling(scale);

            pool.list.push(elem);
            pool.ht[elem.id] = elem;

            const parent_id = elem.parentId();
            if (!index[parent_id])
                index[parent_id] = [];

            index[parent_id].push(elem);
        }

        return { pool: pool, index: index };
    }
    stylingWBS (style, data, index) {
        const pool = new Pool().data();

        // TODO: move to style
        const margin_top = 33;

        // TODO: これ何しているんだっけ？
        let before = null;
        for (const wbs_data of data.wbs) {

            // 子供達を取得する。
            const children = index[wbs_data.id] || [];

            // WBS のクラスインスタンスを作成。
            const wbs = new c.Wbs(wbs_data, style.body.row);

            // 初回のやつ
            if (before)
                wbs.location({
                    y: before.location().y + before.size().h + margin_top,
                });
            else
                wbs.location({
                    y: data.style.head.h + margin_top
                });

            // 子供達のスタイルを整える。
            wbs.styling(children);

            before = wbs;

            pool.list.push(wbs);
            pool.ht[wbs.id] = wbs;
        }

        return pool;
    }
    stylingHead (style, pools) {
        const obj = new c.Head({}, style.head);

        obj.size({
            w: pools.stage.contentsW(),
            h: style.head.h,
        });

        obj.location({ x: 0, y: 0 });

        return obj;
    }
    stylingBody (style, pools) {
        const header_h = pools.head.size().h;
        const location = { x: 0, y: header_h};
        const size = {
            w: pools.stage.contentsW(),
            h: 0,
        };

        let h = 0;
        for (const wbs of pools.wbs.list) {
            const l = wbs.location();
            const s = wbs.size();

            if (h < l.y + s.h)
                h = l.y + s.h;
            // console.log(l);
            // wbs.location({
            //     x: l.x + location.x,
            //     y: l.y + location.y,
            // });

            // wbs.size({
            //     w: size.w,
            // });
        };

        size.h = h;

        const obj = new c.Body({}, style.body);

        obj.size(size);
        obj.location(location);

        return obj;
    }
    stylingFoot (style, pools) {
        const obj = new c.Foot({}, style.foot);

        obj.size({
            w: pools.stage.contentsW(),
            h: style.foot.h,
        });

        obj.location({
            x: 0,
            y: pools.head.size().h + pools.body.size().h
        });

        return obj;
    }
    stylingStage (pools) {
        const obj = pools.stage;
        const padding = obj.padding();

        const h = padding
              + pools.head.size().h
              + pools.body.size().h
              + pools.foot.size().h
              + padding;

        pools.head.location().x = pools.head.location().x + padding;
        pools.body.location().x = pools.body.location().x + padding;
        pools.foot.location().x = pools.foot.location().x + padding;

        pools.head.location().y = pools.head.location().y + padding;
        pools.body.location().y = pools.body.location().y + padding;
        pools.foot.location().y = pools.foot.location().y + padding;

        for (const wbs of pools.wbs.list)
            wbs.location({
                x: wbs.location().x + padding,
                y: wbs.location().y + padding,
            });

        for (const wp of pools.workpackages.list) {
            const wbs = pools.wbs.ht[wp.parentId()];
            wp.location({
                x: wp.location().x + padding,
                y: wp.location().y + wbs.location().y + wbs.padding(),
            });
        }

        const w = pools.stage.w();

        obj.size({ w: w, h: h });

        obj.location({ x: 0, y: 0 });
    }
    styling (data) {
        const style = data.style;

        const models = {
            stage: null,
            head: null,
            body: null,
            foot: null,
            wbs: null,
            workpackages: null,
            indexWpKeyParent: null,
            term: null,
            timescale: null,
            grid: null,
            scale: null,
            now: null,
        };

        models.term = new Term(data).data();

        const term = models.term;

        models.stage = this.makeStage(data, term, style);
        models.scale = this.makeScale(models.stage, models.term);
        models.timescale = this.makeHeaderCells(style, models);

        // まず Workpackage をスタイリング
        const ret = this.stylingWorkpackages(style, models.scale, data);
        models.workpackages = ret.pool;
        models.indexWpKeyParent = ret.index;

        // 次に Wbs をスタイリング
        models.wbs = this.stylingWBS(style, data, models.indexWpKeyParent);

        // その後 Heac, Body, Foot をスタイリング
        models.head = this.stylingHead(style, models);
        models.body = this.stylingBody(style, models);
        models.foot = this.stylingFoot(style, models);

        // 日別線を描画
        models.grid = this.makeGrid(data.scale.cycle, style, models);

        // 当日線を描画
        models.now = this.makeNow (style, models);

        this.stylingStage(models);

        return models;
    }
    /* **************************************************************** *
     *  Styling New
     * **************************************************************** */
    // テスト中
    stylingNew (data) {
        const style = data.style;

        const term = new Term(data).data();
        const stage = this.makeStage(data, term, style);
        const scale = this.makeScale(stage, term);
        const timescale = this.makeHeaderCells2(style, scale, term, stage);

        // WBS の階層を作る。
        const {roots, wbs_list, wp_list} = new Builder().buildWbs(data.wbs, data.workpackages, style);

        // wp の横位置(x), 幅(width), 高さ(height) を決める。
        // y は後で決める。
        // scale を利用する。
        for (const wp of wp_list)
            wp.styling(scale);

        // wbs の横位置(x), 幅(width), 高さ(height) を決める。
        // y は後で決める。
        // children が全部 wp のもの
        for (const wbs of wbs_list)
            if (wbs.isAllWp())
                wbs.stylingNew();

        // 最後に root から 整える。
        // wbs の横位置(x), 幅(width), 高さ(height) を決める。
        // 縦位置(y) も決める。
        for (const root of roots)
            root.stylingNew();

        // その後 Heac, Body, Foot をスタイリング
        const head = this.stylingHead2(style, stage);
        const body = this.stylingBody2(wbs_list, style, stage, head);
        const foot = this.stylingFoot2(style, stage, head, body);

        // 日別線を描画
        const grid = this.makeGrid2(
            style,
            data.scale.cycle,
            scale,
            term,
            head, body, foot);

        // 当日線を描画
        const now = this.makeNow2(style, scale, head, body, foot);

        const list2pool = (list)=>
              list.reduce((pool, wbs_node)=> {
                  pool.ht[wbs_node.id] = wbs_node;
                  pool.list.push(wbs_node);
                  return pool;
              }, {ht:{}, list:[]});

        const makeHtParentID = (list)=>
              list.reduce((ht, wp)=> {
                  if (!ht[wp.core.parent])
                      ht[wp.core.parent] = [];
                  ht[wp.core.parent].push(wp);
                  return ht;
              }, {});

        return {
            stage: stage,
            head: head,
            body: body,
            foot: foot,

            wbs: list2pool(wbs_list),
            workpackages: list2pool(wp_list),
            indexWpKeyParent: makeHtParentID(wp_list),

            term: term,
            timescale: timescale,
            grid: grid,
            scale: scale,
            now: now,
        };
    }
    stylingHead2 (style, stage) {

        const obj = new c.Head({}, style.head);

        obj.size({
            w: stage.contentsW(),
            h: style.head.h,
        });

        obj.location({ x: 0, y: 0 });

        return obj;
    }
    stylingBody2 (wbs_list, style, stage, head) {

        const header_h = head.size().h;
        const location = { x: 0, y: header_h};
        const size = {
            w: stage.contentsW(),
            h: 0,
        };

        let h = 0;
        for (const wbs of wbs_list) {
            const l = wbs.location();
            const s = wbs.size();

            if (h < l.y + s.h)
                h = l.y + s.h;
            // console.log(l);
            // wbs.location({
            //     x: l.x + location.x,
            //     y: l.y + location.y,
            // });

            // wbs.size({
            //     w: size.w,
            // });
        };

        size.h = h;

        const obj = new c.Body({}, style.body);

        obj.size(size);
        obj.location(location);

        return obj;
    }
    stylingFoot2 (style, stage, head, body) {
        const obj = new c.Foot({}, style.foot);

        obj.size({
            w: stage.contentsW(),
            h: style.foot.h,
        });

        obj.location({
            x: 0,
            y: head.size().h + body.size().h
        });

        return obj;
    }
    makeGrid2 (style, cycle, scale, term, head, body, foot) {
        const cells = [];

        const start = moment(term.start);
        const end = moment(term.end);

        const h = head._size.h + body._size.h + foot._size.h;

        // 月次の線を追加
        let cell_start = moment(start);
        while (cell_start.isBefore(end)) {

            let x_start = scale(cell_start.toDate());

            const obj = {
                location: {
                    x: x_start,
                    y: style.stage.padding,
                },
                size: { w: 0, h: h },
                stroke: {
                    color: '#666666',
                    width: '3',
                    dasharray: null,
                },
            };

            if (obj.location.x>0)
                cells.push(obj);

            cell_start.add('M', 1);
        }

        // 週次の線を追加
        if (cycle==='w') {
            // 週の始め(月曜日)を算出
            const week_start = moment(term.start);

            if (week_start.day()>0)
                week_start.startOf('week');

            week_start.add(1, 'd');
            while (week_start.isBefore(end)) {
                let x_start = scale(week_start.toDate());

                const obj = {
                    location: {
                        x: x_start,
                        y: style.stage.padding,
                    },
                    size: { w: 0, h: h },
                    stroke: {
                        color: '#999999',
                        width: '1',
                        dasharray: 3,
                    },
                };

                if (obj.location.x>0)
                    cells.push(obj);

                week_start.add(1, 'w');
            }
        }

        // 日次の線を追加
        if (cycle==='d') {
            const day_start = moment(term.start);

            day_start.add(1, 'd');

            while (day_start.isBefore(end)) {
                let x_start = scale(day_start.toDate());

                const obj = {
                    location: {
                        x: x_start,
                        y: style.stage.padding,
                    },
                    size: { w: 0, h: h },
                    stroke: {
                        color: '#999999',
                        width: day_start.day()===1 ? 2 : 1,
                        dasharray: 3,
                    },
                };

                if (obj.location.x>0)
                    cells.push(obj);

                day_start.add(1, 'd');
            }
        }

        return cells;
    }
    makeNow2 (style, scale, head, body, foot) {
        const x = scale(new Date());
        const y = style.stage.padding;

        const h = head._size.h
              + body._size.h
              + foot._size.h;

        return {
            x1: x,
            y1: y,
            x2: x,
            y2: y + h,
        };
    }
    makeHeaderCells2 (style, scale, term, stage) {
        const cells = [];

        const start = moment(term.start);
        const end = moment(term.end);

        let cell_start = moment(start);

        while (cell_start.isBefore(end)) {
            const cell_end = moment(cell_start).add('d', 1);

            let x_start = scale(cell_start.toDate());
            let x_end   = scale(cell_end.toDate());

            const obj = new c.Cell({
                start: moment(cell_start),
                end:   moment(cell_end),
            }, style.head.cell);

            obj.location({
                x: x_start + stage.padding(),
                y: 0       + stage.padding(),
            });

            obj.size({
                w: x_end - x_start,
                h: style.head.h
            });

            cells.push(obj);

            cell_start.add('M', 1);
        }

        return cells;
    }
}

/*
  +---------------------------------------------------------+
  | Stage                                                   |
  |                                                         |
  |  +---------------------------------------------------------+
  |  | Header                                                  |
  |  |                                                         |
  |  |  +---------------------------------------------------------+
  |  |  | row                                                     |
  |  |  |                                                         |
  |  |  | +------++------++------++------++------++------++------++------+
  |  |  | | cell || cell || cell || cell || cell || cell || cell || cell | ......
  |  |  | +------++------++------++------++------++------++------++------+
  |  |  +---------------------------------------------------------+
  |  |     :                                                   |
  |  |                                                         |
  |  +---------------------------------------------------------+
  |                                                         |
  |  +---------------------------------------------------------+
  |  | Body                                                    |
  |  |                                                         |
  |  |  +---------------------------------------------------------+
  |  |  | row                                                     |
  |  |  +---------------------------------------------------------+
  |  |  +---------------------------------------------------------+
  |  |  | row                                                     |
  |  |  |                                                         |
  |  |  | +------++------++------++------++------++------++------++------+
  |  |  | | cell || cell || cell || cell || cell || cell || cell || cell | ......
  |  |  | +------++------++------++------++------++------++------++------+
  |  |  +---------------------------------------------------------+
  |  |     :                                                   |
  |  |                                                         |
  |  +---------------------------------------------------------+
  |                                                         |
  +---------------------------------------------------------+
*/
