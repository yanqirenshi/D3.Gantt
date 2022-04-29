import Element from './Element.js';
import moment from 'moment';

export default class Workpackage extends Element {
    constructor (data, style) {
        super(data, style);

        const template = () => ({
            size:     { w:0, h:0 },
            location: { x:0, y:0 },
        });

        this._label    = template();
        this._plan     = template();
        this._result   = template();
        this._progress = template();
    }
    location (v) {
        if (arguments.length===0)
            return this._location;

        const location_old = {...this._location};

        super.location(v);

        const vec = {
            x: this._location.x - location_old.x,
            y: this._location.y - location_old.y,
        };

        const addVec = (a, b)=> {
            return {
                x: a.x + b.x,
                y: a.y + b.y,
            };
        };

        this._label.location    = addVec(this._label.location, vec);
        this._plan.location     = addVec(this._plan.location, vec);
        this._result.location   = addVec(this._result.location, vec);
        this._progress.location = addVec(this._progress.location, vec);

        return this._location;
    }
    parentId () {
        return this.core.parent || null;
    }
    url () {
        return this.core.url || null;
    }
    stylingLabel () {
        const style = this.style;

        this._label.location.y = style.label.h;
        this._label.size.h = style.label.h;
    }
    stylingPlan (plan_w) {
        const style = this.style;

        this._plan.location.y = style.label.h + style.label.margin.bottom;
        this._plan.size.w = plan_w;
        this._plan.size.h = style.plan.h;
    }
    stylingResult (result_x, result_w) {
        const style = this.style;

        this._result.location.y = style.label.h + style.label.margin.bottom + style.result.shift;
        this._result.location.x = result_x;
        this._result.size.w = result_w;
        this._result.size.h = style.plan.h;
    }
    stylingProgress (plan_w) {
        const style = this.style;

        this._progress.location.y = style.label.h;
        this._progress.size.w = plan_w;
        this._progress.size.h = style.plan.h;
    }
    calRect (type, core, scale, style) {
        const term = core[type];

        let x = 0, y = 0, w = 0, h = 0;

        const result = () => ({ x: x, y: y, w: w, h: h });

        if (!term) return result();

        const start = term.start;
        const end   = term.end;

        if (type==='plan') {
            if (!start || !end) return result();

            x = scale(start);
            w = scale(end) - x;
            h = style[type].h;
        } else {
            if (!start) return result();

            x = scale(start);
            y = style[type].shift || 0;
            w = scale(end || moment()) - x;
            h = style[type].h;
        }

        return result();
    }
    styling (scale) {
        const core = this.core;

        // background を上書きする。
        if (core.style && core.style.background) {
            const new_style = { ...this.style };

            new_style.background = core.style.background;

            this.style = new_style;
        }

        const style = this.style;

        const plan_rect   = this.calRect('plan', core, scale, style);
        const result_rect = this.calRect('result', core, scale, style);

        this.size({
            w: plan_rect.w,
            h: style.label.h
                + style.label.margin.bottom
                + style.plan.h
                + style.result.shift,
        });

        this.location({ x: plan_rect.x });

        this.stylingLabel();

        this.stylingPlan(plan_rect.w);

        this.stylingResult(result_rect.x, result_rect.w);
        this.stylingProgress(plan_rect.w);

        return this;
    }
};
