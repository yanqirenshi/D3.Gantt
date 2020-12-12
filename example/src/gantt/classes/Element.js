export default class Element {
    constructor (data) {
        this.core = data;
        data.obj = this;
    }
};
