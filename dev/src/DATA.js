import {STYLE} from './DATA/STYLE.js';
import {WBS} from './DATA/WBS.js';
import {WORKPACKAGES} from './DATA/WORKPACKAGES.js';

const DATA = {
    scale: {
        // y(years), Q(quarters), M(months), w(weeks), d(days)
        // h(hours), m(minutes), s(seconds), ms(milliseconds)
        // cycle: 'M',
        cycle: 'w',
        w: 222,
        start: null,
        end: null,
    },
    wbs: WBS,
    workpackages: WORKPACKAGES,
    style: STYLE,
};

export default DATA;
