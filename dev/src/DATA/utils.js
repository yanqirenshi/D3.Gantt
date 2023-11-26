import moment from 'moment';

export function term (start, end) {
    const start_m = moment(start);
    const end_m = moment(end);

    return {
        start: start_m.isValid() ? start_m.toDate() : null,
        end:   end_m.isValid()   ? end_m.toDate()   : null,
    };
};
