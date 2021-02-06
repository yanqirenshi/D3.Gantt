import Element from './Element.js';

export default class Wbs extends Element {
    padding () {
        return this.style.padding || 0;
    }
    layoutChildren (children) {
        for (const child of children)
            console.log(child);
    }
    childrenH (children) {
        let h = 0;

        for (const child of children) {
            const child_h = child.location().y + child.size().h;

            if (h < child_h)
                h = child_h;
        }

        return h;
    }
    styling (children) {
        // this.layoutChildren(children);

        const rect = this.childrenH(children);

        const children_h = this.childrenH(children);

        const h = children_h===0 ? this.style.h : this.childrenH(children) + (this.style.padding * 2 || 0);

        this.size({ w: 888, h: h });

        return this;
    }
};
