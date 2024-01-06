export default class Pool {
    constructor (list) {
        this._data = this._make(list);
    }
    data () {
        return this._data;
    }
    _make (list) {
        const pool = { ht: {}, list: [] };

        if (!list)
            return pool;

        return list.reduce((pool, d) => {
            pool.ht[d.id] = d;
            pool.list.push(d);

            return pool;
        }, pool);

    }
}
