import moment from 'moment';

const term = (start, length) => {
    const start_m = moment(start);
    const end_m = moment(start).add('d', length);

    return {
        start: start_m.toDate(),
        end: end_m.toDate(),
    };
};

const DATA = {
    scale: {
        // y(years), Q(quarters), M(months), w(weeks), d(days)
        // h(hours), m(minutes), s(seconds), ms(milliseconds)
        cycle: 'd',
        w: 88,
        start: null,
        end: null,
    },
    groups: [],
    wbs: [
        { id: 10, name: 'WBS 10' },
        { id: 20, name: 'WBS 20' },
        { id: 30, name: 'WBS 30' },
        { id: 40, name: 'WBS 40' },
        { id: 50, name: 'WBS 50' },
        { id: 60, name: 'WBS 60' },
        { id: 70, name: 'WBS 70' },
        { id: 80, name: 'WBS 80' },
    ],
    workpackages: [
        { id: 100, parent: 20, name: 'WP 100', plan: term('2020-01-01', 10) },
        { id: 101, parent: 30, name: 'WP 101', plan: term('2020-01-05', 10) },
        { id: 102, parent: 40, name: 'WP 102', plan: term('2020-01-10', 10) },
        { id: 103, parent: 50, name: 'WP 103', plan: term('2020-01-15', 10) },
        { id: 104, parent: 60, name: 'WP 104', plan: term('2020-01-20', 10) },
        { id: 105, parent: 70, name: 'WP 105', plan: term('2020-01-25', 10) },
    ],
    style: {
        stage: {
            padding: 22,
            background: '#f8f8f8',
        },
        head: {
            h: 111,
            cell: {
                size: { w:0, h:0 },
                color: '#333',
                background: '#fafafa',
            },
            background: '#fff',
        },
        body: {
            row: {
                padding: 22,
                background: '#fff',
            },
            chart: {
                h: 88,
                padding: 11,
                background: '#ea5506',
            },
            background: '#fff',
        },
        foot: {
            h: 33,
            background: '#fff',
        },
    }
};

export default DATA;
