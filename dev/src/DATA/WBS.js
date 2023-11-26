import moment from 'moment';

export const WBS = [
    { id: 10, parent: null, name: 'WBS 10' },
    { id: 20, parent: null, name: 'WBS 20' },
    { id: 30, parent: null, name: 'WBS 30' },
    { id: 40, parent: null, name: 'WBS 40' },
    { id: 50, parent: null, name: 'WBS 50' },
    { id: 60, parent: null, name: 'WBS 60' },
    { id: 70, parent: null, name: 'WBS 70' },
    { id: 80, parent: null, name: 'WBS 80' },
    { id: 90, parent: 10,   name: 'WBS 90' },
    { id: 99, parent: 90,   name: 'WBS 99' },
];
