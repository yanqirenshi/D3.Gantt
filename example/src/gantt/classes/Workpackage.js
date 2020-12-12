import Element from './Element.js';

export default class Workpackage extends Element {
    parentId () {
        return this.core.parent || null;
    }
    styling (scale) {
        const plan = this.core.plan;
        const w = scale(plan.end) - scale(plan.start);

        this.size({
            w: w,
            h: this.style.h,
        });

        return this;
    }
};
