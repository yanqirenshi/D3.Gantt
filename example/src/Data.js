const all = {
    scale: {
        cycle: 'days', // month, week, hour, minute, second ここは moment に併せるか。
        start: null,
        end: null,
    },
    wbs: { // ここは Wnqi Big Size に合わせるか。
        id: null,
        name: '',
        children: [],
    },
    header: {
        cell: {
            size: { w:0, h:0 },
            color: '#333',
            background: 'fff',
        }
    },
    body: {
        lane: {
            h: 0,
            background: 'fff',
        }
    },
};
