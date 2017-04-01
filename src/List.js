class Node {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }
}
class List {
    constructor(arg) {
        this._head = arg;
    }
    head() {
        return this._head;
    }
}

export {
    List
};