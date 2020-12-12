export default class Element {
    constructor (data, style) {
        this._size = { w:0, h:0 };
        this._location = { x:0, y:0 };

        this.core = data;
        data.obj = this;

        this.style = style;

        this.id = data.id;
    }
    size (v) {
        if (arguments.length===0)
            return this._size;

        if (v.w && v.w!==this._size.w)
            this._size.w = v.w;

        if (v.h && v.h!==this._size.h)
            this._size.h = v.h;

        return this._size;
    }
    location (v) {
        if (arguments.length===0)
            return this._location;

        if (v.x && v.x!==this._location.x)
            this._location.x = v.x;

        if (v.y && v.y!==this._location.y)
            this._location.y = v.y;

        return this._location;
    }
};
