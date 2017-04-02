/* eslint-disable no-underscore-dangle */

import 'babel-polyfill';

class Node {
    constructor(value, next = null) {
        this.value = value;
        this.next = next || null;
    }
}

class List {
    constructor(...xs) {
        this.__populate(xs);
        this[Symbol.iterator] = this.__iter;
    }
    
    __populate(xs) {
        const len = xs.length;
        for (let i = len - 1; i >= 0; i -= 1) {
            const nx = new Node(xs[i]);
            nx.next = this.__head;
            this.__head = nx;
        }
    }

    * __iter() {
        let tmp = this.__head;
        while (tmp !== null) {
            if (!tmp) {
                break;
            }
            yield tmp.value;
            tmp = tmp.next;
        }
    };

    head() {
        return this.__head ? this.__head.value : undefined;
    }

}

export {
    List
};