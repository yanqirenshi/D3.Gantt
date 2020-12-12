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

            index[elem.parentId()] = elem;
        }

        return { pool: pool, index: index };
    }
    stylingWBS (style, data, index) {
        const pool = this.makePool();

        let before = null;
        for (const wbs of data.wbs) {
            const children = index[wbs.id] || [];

            const elem = new Classes.Wbs(wbs, style.body.row, children);

            elem.styling();

            if (before)
                elem.location({
                    y: before.location().y + before.size().h,
                });

            before = elem;

            pool.list.push(elem);
            pool.ht[elem.id] = elem;
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

        const obj = new Classes.Body({});

        obj.size(size);
        obj.location(location);

        return obj;
    }
    stylingFoot (style, pools) {
        const obj = new Classes.Foot({});

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
    makeScale (stage, data) {
        const term = this.getTerm(data);

        return d3
            .scaleTime()
            .range([0, stage.contentsW()])
            .domain([term.start, term.end]);
    }
    styling (data, children) {
        const style = data.style;

        const stage = new Classes.Stage({}, style.stage);

        const pools = {
            stage: stage,
            head: null,
            body: null,
            foot: null,
            gropus: null,
            wbs: null,
            workpackages: null,
            indexWpKeyParent: null,
        };

        const scale = this.makeScale(stage, data);

        const ret = this.stylingWorkpackages(style, scale, data);
        pools.workpackages = ret.pool;
        pools.indexWpKeyParent = ret.index;

        pools.wbs = this.stylingWBS(style, data, pools);

        pools.head = this.stylingHead(style, pools);
        pools.body = this.stylingBody(style, pools);
        pools.foot = this.stylingFoot(style, pools);

        this.stylingStage(pools);

        return pools;
    }
}
