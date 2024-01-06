import moment from 'moment';

import Element from './Element.js';

export default class Stage extends Element {
    init (scale, term) {
        const cycle = scale.cycle;

        const w = scale.w * this.len(term, cycle);

        this.size({
            w: w + this.style.padding * 2,
        });

        return this;
    }
    len (term, cycle) {
        const end   = moment(term.end);
        const start = moment(term.start);

        return end.diff(start, cycle);
    }
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
