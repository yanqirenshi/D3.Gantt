import moment from 'moment';

export const STYLE = {
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
        // #546a7b border
        // #747a81 font
    },
    body: {
        row: {
            padding: 33,
            background: '#fff',
        },
        chart: {
            h: 111,
            padding: 11,
            background: '#e0ebaf',
            label: {
                h: 122,
                margin: { bottom:10 },
            },
            plan: {
                h: 111,
                background: '#e0ebaf',
            },
            result: {
                h: 111,
                shift: 22,
                background: '#eeeeee',
            },
            progress: {
                h: 111,
                background: '#f00',
            },
        },
        background: '#fff',
        // #516f79 line
    },
    foot: {
        h: 33,
        background: '#fff',
    },
};
