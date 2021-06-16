import Element from './Element.js';

export default class Stage extends Element {
    padding () {
        return this.style.padding || 0;
    }
    w () {
        return this.size().w;
    }
    contentsW () {
        const w = this.size().w;

        const padding = this.padding();

        return w - padding * 2;
    }
};
