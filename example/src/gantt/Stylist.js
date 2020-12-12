import * as Classes from './Classes.js';

const PADDING = 22;
const CONTENTS_W = 1111;
const HEADER_H = 222;
const FOOT_H = 88;

class Element {
    constructor (data) {
        this._size = { w:0, h:0 };
        this._location = { x:0, y:0 };
        this._type = null;

        this.init(data);
    }
    init (data) {
        this.core = data;
        data.obj = this;
    }
    type (v) {
        if (arguments.length>0)
            this._type = v;

        return this._type;
    }
    children () {
        return this.core.children;
    }
    size (v) {
        if (arguments.length===0)
            return this._size;

        if (v.w && v.w!==this._size.w)
            this._size.w = v.w;

        if (v.h && v.h!==this._size.h)
            this._size.h = v.h;

        return this._size;
    }
    location (v) {
        if (arguments.length===0)
            return this._location;

        if (v.x && v.x!==this._location.x)
            this._location.x = v.x;

        if (v.y && v.y!==this._location.y)
            this._location.y = v.y;

        return this._location;
    }
    layoutChildren (children) {
    }
    rectChildren (children) {
        for (const child of children)
            ; // ここは location と size で最大公約数な Rect を算出する。

        return { w:200, h: 88 };
    }
    styling (style, children) {
        const type = this.type();
        if (type==="WP")
            this.size({
                w: CONTENTS_W,
                h: style.h,
            });

        if (type==="WBS") {
            this.layoutChildren(children);

            const rect = this.rectChildren(children);

            const h = rect.h + style.padding || 0;

            this.size({ w: 888, h: h });
        }
    }
}

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
    stylingWorkpackages (style, pools) {
        const workpackages = pools.workpackages;

        for (const data of workpackages.list) {
            const elem = new Element(data);

            elem.type('WP');

            elem.styling(style.body.chart);
        }
    }
    stylingWBS (style, pools) {
        const index = pools.indexWpKeyParent;

        let before = null;
        for (const data of pools.wbs.list) {
            const children = index[data.id] || [];

            const elem = new Element(data);

            elem.type('WBS');

            elem.styling(style.body.row, children);

            if (before)
                elem.location({
                    y: before.location().y + before.size().h,
                });


            before = elem;
        }
    }
    stylingHead (style, pools) {
        const data = {
            size: {
                w: CONTENTS_W,
                h: HEADER_H,
            },
            location: { x: 0, y: 0 },
        };

        new Classes.Head(data);

        pools.head = data;
    }
    stylingBody (style, pools) {
        const header_h = HEADER_H;

        const location = { x: 0, y: header_h};
        const size = {
            w: CONTENTS_W,
            h: 0,
        };

        let h = 0;
        for (const wbs of pools.wbs.list) {
            const l = wbs.obj.location();
            const s = wbs.obj.size();

            if (h < l.y + s.h)
                h = l.y + s.h;

            wbs.obj.location({
                x: l.x + location.x,
                y: l.y + location.y,
            });

            wbs.obj.size({
                w: size.w,
            });
        };

        size.h = h;

        const data= {
            size: size,
            location: location,
        };

        new Classes.Body(data);

        pools.body = data;
    }
    stylingFoot (style, pools) {
        const data = {
            size: {
                w: CONTENTS_W,
                h: FOOT_H
            },
            location: {
                x: 0,
                y: pools.head.size.h + pools.body.size.h
            },
        };

        new Classes.Foot(data);

        pools.foot = data;
    }
    stylingStage (style, pools) {
        const h = PADDING
              + pools.head.size.h
              + pools.body.size.h
              + pools.foot.size.h
              + PADDING;

        pools.head.location.x = pools.head.location.x + PADDING;
        pools.body.location.x = pools.body.location.x + PADDING;
        pools.foot.location.x = pools.foot.location.x + PADDING;

        pools.head.location.y = pools.head.location.y + PADDING;
        pools.body.location.y = pools.body.location.y + PADDING;
        pools.foot.location.y = pools.foot.location.y + PADDING;

        for (const wbs of pools.wbs.list)
            wbs.obj.location({
                x: wbs.obj.location().x + PADDING,
                y: wbs.obj.location().y + PADDING,
            });

        pools.stage = {
            size: {
                w: CONTENTS_W + PADDING * 2,
                h: h
            },
            location: { x: 0, y: 0 },
        };
    }
    getTerm (pools) {
        const out = {
            start: null,
            end: null,
        };

        for (const wp of pools.workpackages.list) {
            console.log(wp);
            if (out.start===null || out.start > wp.plan.start)
                out.start = wp.plan.start;

            if (out.end===null || out.end < wp.plan.end)
                out.end = wp.plan.end;
        }

        return out;
    }
    styling (data, children) {
        const style = data.style;

        const pools = this.data2pools(data);

        const term = this.getTerm(pools);

        this.stylingWorkpackages(style, pools);
        this.stylingWBS(style, pools);

        this.stylingBody(style, pools);
        this.stylingHead(style, pools);
        this.stylingFoot(style, pools);
        this.stylingStage(style, pools);

        return pools;
    }
}
