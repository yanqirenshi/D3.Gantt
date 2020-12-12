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
        cycle: 'days', // month, week, hour, minute, second ここは moment に併せるか。
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
        { id: 101, parent: 30, name: 'WP 101', plan: term('2020-01-01', 10) },
        { id: 102, parent: 40, name: 'WP 102', plan: term('2020-01-01', 10) },
        { id: 103, parent: 50, name: 'WP 103', plan: term('2020-01-01', 10) },
        { id: 104, parent: 60, name: 'WP 104', plan: term('2020-01-01', 10) },
        { id: 105, parent: 70, name: 'WP 105', plan: term('2020-01-01', 10) },
    ],
    style: {
        stage: {
            w: 1111,
            padding: 22,
        },
        head: {
            h: 111,
            cell: {
                size: { w:0, h:0 },
                color: '#333',
                background: '#fff',
            }
        },
        body: {
            row: {
                padding: 8,
                background: '#fff',
            },
            chart: {
                h: 88,
                padding: 11,
                background: '#f00',
            }
        },
        foot: {
            h: 88,
        },
    }
};

export default DATA;
