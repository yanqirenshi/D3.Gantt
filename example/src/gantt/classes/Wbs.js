import Element from './Element.js';

export default class Wbs extends Element {
    layoutChildren (children) {
    }
    rectChildren (children) {
        // for (const child of children)
        //     ; // ここは location と size で最大公約数な Rect を算出する。

        return { w:200, h: 88 };
    }
    styling (children) {
        this.layoutChildren(children);

        const rect = this.rectChildren(children);

        const h = rect.h + this.style.padding || 0;

        this.size({ w: 888, h: h });
    }
};
