import Element from './Element.js';

export default class Stage extends Element {
    padding () {
        return this.style.padding || 0;
    }
    w () {
        return this.style.w || 0;
    }
    contentsW () {
        const w = this.style.w || 0;

        const padding = this.padding();

        return w - padding * 2;
    }
};
