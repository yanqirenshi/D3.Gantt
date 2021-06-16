import Element from './Element.js';

export default class Workpackage extends Element {
    parentId () {
        return this.core.parent || null;
    }
    styling (scale) {
        const plan = this.core.plan;
        const x = scale(plan.start);
        const w = scale(plan.end) - x;

        this.size({
            w: w,
            h: this.style.h,
        });

        this.location({ x: x });

        return this;
    }
};
