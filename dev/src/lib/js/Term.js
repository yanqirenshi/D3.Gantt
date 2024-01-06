export default class Term {
    constructor (pools) {
        this._data = {
            start: null,
            end: null,
        };

        pools.workpackages.reduce((out, wp)=> {
            if (out.start===null || out.start > wp.plan.start)
                out.start = wp.plan.start;

            if (out.end===null || out.end < wp.plan.end)
                out.end = wp.plan.end;

            return out;
        }, this._data);
    }
    data () {
        return this._data;
    }
}
