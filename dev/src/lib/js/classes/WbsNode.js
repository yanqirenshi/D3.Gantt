import Element from './Element.js';
import moment from 'moment';

export default class WbsNode extends Element {
    name () {
        return this.core.name;
    }
    parentId () {
        return this.core.parent || null;
    }
};
