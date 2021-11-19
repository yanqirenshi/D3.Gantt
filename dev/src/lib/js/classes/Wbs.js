import Element from './Element.js';

export default class Wbs extends Element {
    padding () {
        return this.style.padding || 0;
    }
    layoutChildrenAddTemp (wp, tmp) {
        const isPuton = (targets) => {
            for (const target of targets) {
                const wp_l = wp.location();
                const wp_s = wp.size();
                const trg_l = target.location();
                const trg_s = target.size();

                if (Math.abs(wp_l.x - trg_l.x) < wp_s.w/2 + trg_s.w/2 &&
                    Math.abs(wp_l.y - trg_l.y) < wp_s.h/2 + trg_s.h/2)
                    return true;
            }

            return false;
        };

        for (const wp_list of tmp) {
            if (isPuton(wp_list))
                continue;

            wp_list.push(wp);

            return;
        }

        tmp.push([wp]);
    }
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

        let before = null;
        for(const wp_list of this.layoutChildrenMakeTmp(children)) {
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
    styling (children) {
        this.layoutChildren(children);

        const rect = this.childrenH(children);

        const children_h = this.childrenH(children);

        const h = children_h===0 ? this.style.h : this.childrenH(children) + (this.style.padding * 2 || 0);

        this.size({ w: 888, h: h });

        return this;
    }
};
