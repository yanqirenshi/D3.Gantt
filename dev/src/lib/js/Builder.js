import * as c from './Classes.js';

export default class Builder {
    makeWbsNode (data, fn) {
        return data.reduce((ht,d)=> {
            const obj = fn(d);
            ht[obj.id] = obj;
            return ht;
        }, {});
    }
    /**
     * WBS を階層構造に組み上げる。
     * */
    buildWbs (wbs, wps, style) {
        // data で Wbs, Workpackage クラスインスタンスを生成する。
        const wbs_ht = this.makeWbsNode(wbs, d=> new c.Wbs(d, style.body.row));
        const wp_ht  = this.makeWbsNode(wps, d=> new c.Workpackage(d, style.body.chart));

        const wbs_list = Object.values(wbs_ht);
        const wp_list  = Object.values(wp_ht);

        // WBS のルートのリストを取得する。 WBS階層を作りながら。
        const roots = wbs_list.reduce((list,wbs)=> {
            const parent_id = wbs.parentId();
            if (!parent_id) {
                list.push(wbs);
                return list;
            }

            const parent = wbs_ht[parent_id];

            parent.addChild(wbs);

            return list;
        }, []);

        // WBS のルートのリストを取得する。 WBS階層を作りながら。
        for (const wp of wp_list) {
            const parent = wbs_ht[wp.parentId()];

            parent.addChild(wp);
        }

        return {
            roots: roots,
            wbs_list: wbs_list,
            wp_list: wp_list,
        };
    }
}
