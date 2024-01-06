import moment from 'moment';

import Element from './Element.js';

export default class Head extends Element {
    makeHeaderCells (style, pools) {
        const scale = pools.scale;
        const term = pools.term;

        const cells = [];

        const start = moment(term.start);
        const end = moment(term.end);

        let cell_start = moment(start);

        while (cell_start.isBefore(end)) {
            const cell_end = moment(cell_start).add('d', 1);

            let x_start = scale(cell_start.toDate());
            let x_end   = scale(cell_end.toDate());

            const obj = new c.Cell({
                start: moment(cell_start),
                end:   moment(cell_end),
            }, style.head.cell);

            obj.location({
                x: x_start + pools.stage.padding(),
                y: 0       + pools.stage.padding(),
            });

            obj.size({
                w: x_end - x_start,
                h: style.head.h
            });

            cells.push(obj);

            cell_start.add('M', 1);
        }

        return cells;
    }
};
