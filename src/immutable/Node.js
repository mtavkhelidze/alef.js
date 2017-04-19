/**
 * Internal class.
 * @private
 */

/* eslint-disable no-underscore-dangle */

class Node {
    static set id(v) {
        Node.__id = v;
    }

    static get id() {
        return Node.__id;
    }

    static newId() {
        Node.id += 1;
        return Node.id;
    }

    constructor(value, next = null) {
        this.__id = Node.newId();
        this.__value = value;
        this.__next = next;
    }

    get value() {
        return this.__value;
    }

    get next() {
        return this.__next;
    }

    get id() {
        return this.__id;
    }

    inspect() {
        const next = this.next ? this.next.inspect() : null;
        return `(Node[${this.id}]: ${this.value} -> ${next})`;
    }

    [Symbol.toStringTag]() {
        return this.inspect();
    }
}

Node.__id = 0;

export default Node;
