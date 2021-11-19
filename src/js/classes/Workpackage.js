import Element from './Element.js';

export default class Workpackage extends Element {
    parentId () {
        return this.core.parent || null;
    }
    styling (scale) {
        // background を上書きする。
        if (this.core.style && this.core.style.background) {
            const new_style = { ...this.style };

            new_style.background = this.core.style.background;

            this.style = new_style;
        }

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
