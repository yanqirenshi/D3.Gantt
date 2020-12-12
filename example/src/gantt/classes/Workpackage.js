import Element from './Element.js';

const CONTENTS_W = 1111;

export default class Workpackage extends Element {
    parentId () {
        return this.core.parent || null;
    }
    styling (style, children) {
        this.size({
            w: CONTENTS_W,
            h: this.style.h,
        });
    }
};
