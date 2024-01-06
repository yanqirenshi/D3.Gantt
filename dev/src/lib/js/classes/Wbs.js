import WbsNode from './WbsNode.js';

export default class Wbs extends WbsNode {
    constructor (data, style) {
        super(data, style);

        this.type = "WBS";

        // タイトル書くところの高さ
        this.title_h = 166;

        // 子供達の格納場所
        this._children = {
            ht:{},
            list:[],
        };
    }
    /**
     */
    addChild (child) {
        if (!child)
            return;

        const children = this.children();

        children.ht[child.id] = child;
        children.list.push(child);
    }
    children (format) {
        if ('ht'===format)
            return this._children.ht;

        if ('list'===format)
            return this._children.list;

        return this._children;
    }
    padding () {
        return this.style.padding || 0;
    }
    /**
     * 矩形が被るものがないか確認する。 被る=true, 被らない=false
     */
    isPuton (targets) {
        //     for (const target of targets) {
        //         const wp_l = wp.location();
        //         const wp_s = wp.size();
        //         const trg_l = target.location();
        //         const trg_s = target.size();

        //         if (Math.abs(wp_l.x - trg_l.x) < wp_s.w / 2 + trg_s.w / 2 &&
        //             Math.abs(wp_l.y - trg_l.y) < wp_s.h / 2 + trg_s.h / 2)
        //             return true;
        //     }

        //     return false;

        // TODO: 仮設
        return true;
    }
    /**
     * すでに配置済みの子供と被るかどうかを判断している。
     */
    layoutChildrenAddTemp (wbs_node, rows) {
        // const isPuton = (targets) => true;

        // for (const row of rows) {
        //     // wp が 他 wp と被る場合、別の段での表示にする。
        //     if (this.isPuton(row))
        //         continue;

        //     // wp が 他 wp と被らない場合、同じ段での表示にする。
        //     row.push(wbs_node);

        //     return;
        // }

        rows.push([wbs_node]);
    }
    /**
     * 子供達を row にまとめる。
     */
    makeChildrenRows (children) {
        const func = (list, child)=>{
            // WBS
            if (child.type==='WBS')
                child.stylingNew();

            // 最初の子供は無条件で追加する。比較対象がないし。
            if (list.length===0) {
                list.push([child]);
                return list;
            }

            // 二番目以降の子供は被るかどうかを確認しながら追加する。
            this.layoutChildrenAddTemp(child, list);

            return list;
        };

        return children.reduce(func, []);
    }
    /** **************************************************************** *
     * TODO:
     * ここで高さ計算するのに、WBS はそれが計算されていない。
     * 事前に高さを計算する必要がある。
     * その場合、この関数を実行する必要がある。
     * その場合、WBS が子供にいた場合の計算が入れ子になる。
     * 出来てそうな気もするが、それを実装する感じか。
     * **************************************************************** */
    layoutChildren (title_h, children) {
        // ////////////////////////////////////////////////////////////////
        // row ごとに 縦(y) 座標 を設定していく。
        // ////////////////////////////////////////////////////////////////
        const rows = this.makeChildrenRows(children);

        // ////////////////////////////////////////////////////////////////
        // row ごとに 縦(y) 座標 を設定していく。
        // ////////////////////////////////////////////////////////////////

        // 縦(y) 座標 計算用(積み上げ)
        const cal = (ht, wp) => {
            const y = wp.location().y;
            const h = wp.size().h;

            if (y > ht.y) ht.y = y;
            if (h > ht.h) ht.h = h;

            return ht;
        };

        // 子供を上から順番に 縦(y) 座標 を設定する。
        let before = null;
        for(const row of rows) {

            // 最初の子供の配置
            if (!before) {
                // if (this.id===90) {
                //     console.log(this._location);
                //     console.log(row[0]);
                // }

                // TODO: WBS の高さは 親の高さをプラスする必要があるな。
                before = row.reduce(cal, { y: title_h, h:-1 });

                for (const wbs_node of row)
                    wbs_node.location({
                        y: title_h + 33
                    });


                continue;
            }

            for (const wp of row)
                wp.location({
                    y: before.y + before.h + 11
                });

            before = row.reduce(cal, { y:-1, h:-1 });
        }
    }
    childrenRect (children) {
        let h = 0;

        let x_min = null;
        let x_max = null;

        for (const child of children) {
            const child_h = child.location().y + child.size().h;

            if (h < child_h)
                h = child_h;

            if (x_min===null || x_min > child.location().x)
                x_min = child.location().x;

            if (x_max===null || x_max < child.location().x + child.size().w)
                x_max = child.location().x + child.size().w;
        }

        return { x: x_min, w: x_max - x_min, h: h };
    }
    /** ****************************************************************
     * @children List: Wbs, Workpackage
     * **************************************************************** */
    styling (children) {
        const title_h = 88;

        this.layoutChildren(title_h, children);

        const rect = this.childrenRect(children);
        const padding = this.style.padding;

        const h = rect.h===0
              ? this.style.h
              : rect.h + (padding * 2 || 0) + title_h;

        this.size({ w: rect.w + padding * 4, h: h });

        // TODO: this.layoutChildren でやるべき？
        const l = this.location();
        this.location({x: rect.x - padding * 2, y: l.y});

        return this;
    }
    stylingNew () {
        const children = this.children('list');

        // 子供を配置する。
        this.layoutChildren(this.title_h, children);

        // 子供達を見てサイズ(w,h)を決める。
        const rect = this.childrenRect(children);

        // const padding = this.style.padding;
        const padding = 22;

        const h = rect.h===0
              ? this.style.h // ← 子供が無い場合の高さ。
              : rect.h + (padding * 2 || 0) + this.title_h;

        this.size({
            w: rect.w + padding * 4,
            h: h,
        });

        // TODO: this.layoutChildren でやるべき？
        const l = this.location();
        console.log(l);
        this.location({
            x: rect.x - padding * 2,
            y: l.y,
        });

        return this;
    }
    isAllWp () {
        const children = this.children('list');

        for (const child of children)
            if ('Wbs'===child.constructor.name)
                return false;

        return true;
    }
};
