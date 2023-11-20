import moment from 'moment';
import * as d3 from 'd3';

import * as Classes from './Classes.js';

export default class Stylist {
    makePool (list) {
        if (!list)
            return { ht: {}, list: [] };

        return list.reduce((pool, d) => {
            pool.ht[d.id] = d;
            return pool;
        }, { ht: {}, list: [...list] });
    }
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

        const groups =  this.makePool(data.groups);
        const wbs = this.makePool(data.wbs);
        const workpackages = this.makePool(data.workpackages);

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
    stylingWorkpackages (style, scale, data) {
        const pool = this.makePool();

        const index = {};
        for (const wp of data.workpackages) {
            const elem = new Classes.Workpackage(wp, style.body.chart);

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
        const pool = this.makePool();

        let before = null;
        for (const wbs_data of data.wbs) {
            const children = index[wbs_data.id] || [];

            // WBS のクラスを生成する。
            const wbs = new Classes.Wbs(wbs_data, style.body.row);

            // 同じ階層のWBSは並べる。
            if (before)
                wbs.location({
                    y: before.location().y + before.size().h,
                });

            // WBS の位置/サイズを決める。children から。
            wbs.styling(children);

            // 同じ階層の次のWBSのために今回のWBSをキープする。
            before = wbs;

            // アウトプットに出力する。
            pool.list.push(wbs);
            pool.ht[wbs.id] = wbs;
        }

        return pool;
    }
    stylingHead (style, pools) {
        const obj = new Classes.Head({}, style.head);

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

            wbs.location({
                x: l.x + location.x,
                y: l.y + location.y,
            });

            wbs.size({
                w: size.w,
            });
        };

        size.h = h;

        const obj = new Classes.Body({}, style.body);

        obj.size(size);
        obj.location(location);

        return obj;
    }
    stylingFoot (style, pools) {
        const obj = new Classes.Foot({}, style.foot);

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
    getTerm (pools) {
        const out = {
            start: null,
            end: null,
        };

        for (const wp of pools.workpackages) {
            if (out.start===null || out.start > wp.plan.start)
                out.start = wp.plan.start;

            if (out.end===null || out.end < wp.plan.end)
                out.end = wp.plan.end;
        }

        return out;
    }
    makeScale (stage, term) {
        return d3
            .scaleTime()
            .range([0, stage.contentsW()])
            .domain([term.start, term.end]);
    }
    makeStage (data, term, style) {
        const stage = new Classes.Stage({}, style.stage);

        const cycle = data.scale.cycle;
        const len = moment(term.end).diff(moment(term.start), cycle);
        const w = data.scale.w * len;

        stage.size({
            w: w + style.stage.padding * 2,
        });

        return stage;
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
            let x_end = scale(cell_end.toDate());

            const obj = new Classes.Cell({
                start: moment(cell_start),
                end: moment(cell_end),
            }, style.head.cell);

            obj.location({
                x:x_start + pools.stage.padding(),
                y: 0 + pools.stage.padding(),
            });

            obj.size({ w: x_end - x_start, h: style.head.h });

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
                    width: '1',
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
    styling (data, children) {
        const style = data.style;

        const models = {
            stage: null,
            head: null,
            body: null,
            foot: null,
            gropus: null,
            wbs: null,
            workpackages: null,
            indexWpKeyParent: null,
            term: null,
            timescale: null,
            grid: null,
            scale: null,
            now: null,
        };

        models.term = this.getTerm(data);

        const term = models.term;

        models.stage = this.makeStage(data, term, style);

        models.scale = this.makeScale(models.stage, models.term);

        models.timescale = this.makeHeaderCells(style, models);

        const ret = this.stylingWorkpackages(style, models.scale, data);
        models.workpackages = ret.pool;
        models.indexWpKeyParent = ret.index;

        models.wbs = this.stylingWBS(style, data, models.indexWpKeyParent);

        models.head = this.stylingHead(style, models);
        models.body = this.stylingBody(style, models);
        models.foot = this.stylingFoot(style, models);

        models.grid = this.makeGrid(data.scale.cycle, style, models);

        models.now = this.makeNow (style, models);

        this.stylingStage(models);

        return models;
    }
}
