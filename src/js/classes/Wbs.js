import Element from './Element.js';

export default class Wbs extends Element {
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
     * Workpackage のチャートが被るかどうかを整える。(2/2)
     */
    layoutChildrenAddTemp (wp, tmp) {
        const isPuton = (targets) => true;

        for (const wp_list of tmp) {
            // wp が 他 wp と被る場合、別の段での表示にする。
            if (this.isPuton(wp_list))
                continue;

            // wp が 他 wp と被らない場合、同じ段での表示にする。
            wp_list.push(wp);

            return;
        }

        tmp.push([wp]);
    }
    /**
     * Workpackage のチャートが被るかどうかを整える。(1/2)
     */
    layoutChildrenMakeTmp (children) {
        const func = (tmp, child)=>{

            if (tmp.length===0) {
                tmp.push([child]);
                return tmp;
            }

            this.layoutChildrenAddTemp(child, tmp);

            return tmp;
        };

        return children.reduce(func, []);
    }
    layoutChildren (children) {
        const cal = (ht, wp) => {
            const y = wp.location().y;
            const h = wp.size().h;

            if (y > ht.y) ht.y = y;
            if (h > ht.h) ht.h = h;

            return ht;
        };

        // Workpackage のチャートが被るかどうかを整える。
        const tmp = this.layoutChildrenMakeTmp(children);

        // TODO: 現在は Workpackage のみを children の対象としている。
        let before = null;
        for(const wp_list of tmp) {
            if (!before) {
                before = wp_list.reduce(cal, { y:-1, h:-1 });
                continue;
            }

            for (const wp of wp_list)
                wp.location({y: before.y + before.h + 11});

            before = wp_list.reduce(cal, { y:-1, h:-1 });
        }
    }
    childrenH (children) {
        let h = 0;

        for (const child of children) {
            const child_h = child.location().y + child.size().h;

            if (h < child_h)
                h = child_h;
        }

        return h;
    }
    /** ****************************************************************
     * @children List: Wbs, Workpackage
     * **************************************************************** */
    styling (children) {
        this.layoutChildren(children);

        // TODO: 一度計算する?
        this.childrenH(children);

        // TODO: 再度計算する?
        const children_h = this.childrenH(children);

        // TODO: 再々度計算する?
        const h = children_h===0 ? this.style.h : this.childrenH(children) + (this.style.padding * 2 || 0);

        this.size({ w: 888, h: h });

        return this;
    }
};
