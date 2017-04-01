class Node {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }
}
class List {
    head() {
        return this._head;
    }
}

export {
    List
};