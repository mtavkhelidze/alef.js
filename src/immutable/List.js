/**
 * List.js
 *
 * This file is part of alef.js.
 *
 * Written by Misha Tavkhelidze <misha.tavkhelidze@gmail.com>
 * Copyright (c) 2017 Misha Tavkhelidze
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/* eslint-disable no-underscore-dangle */

/**
 * Internal class.
 */
class Node {
    constructor(value, next, prev) {
        this.value = value;
        this.next = next || null;
        this.prev = prev || null;
    }
}

/**
 * Scala style immutable List.
 */
class List {
    /**
     * Creates instance of List
     *
     * @param {...*} [xs] arguments or an Array
     */
    constructor(...xs) {
        /**
         * Length of the List
         *
         * @type {number}
         * @public
         */
        this.length = 0;

        /**
         * List head
         *
         * @type {Node}
         * @private
         */
        this.__start = null;

        /**
         * List tail
         *
         * @type {Node}
         * @private
         */
        this.__end = null;

        /**
         * List iterator function
         *
         * @type {function}
         */
        this[Symbol.iterator] = this.__iter;

        if (xs.length > 0) {
            if (xs.length === 1 && Array.isArray(xs[0])) {
                this.__populate(xs[0]);
            } else {
                this.__populate(xs);
            }
        }
    }

    /**
     * Tests whether this sequence contains a given value as an element.
     *
     * @param {*} value to look for
     * @returns {boolean}
     */

    contains(val) {
        let tmp = this.__start;
        while (tmp) {
            if (tmp.value === val) {
                return true;
            }
            tmp = tmp.next;
        }
        return false;
    }

    /**
     * Selects last element.
     *
     * @returns {*}
     * @throws {RangeError} if the list is empty.
     */
    last() {
        if (this.__end) {
            return this.__end.value;
        }
        throw new RangeError('The list is empty.');
    }

    /**
     * Copies elements of the list into new Array
     *
     * @return {Array} array of values
     */
    toArray() {
        const ar = new Array(this.length);
        let tmp = this.__start;
        let i = 0;
        while (tmp) {
            ar[i] = tmp.value;
            tmp = tmp.next;
            i += 1;
        }
        return ar;
    }

    /**
     * Returns new List with `x` added to the top.
     *
     * @param x
     * @returns {List}
     */
    push(x) {
        const nl = new List();
        nl.__start = new Node(x, this.__start);
        nl.__start.next.prev = nl.__start;
        nl.length = this.length + 1;
        return nl;
    }

    /**
     * Selects all elements except the first.
     *
     * @returns {*}
     */
    tail() {
        if (this.__start) {
            const nxs = new List();
            nxs.__start = this.__start.next;
            nxs.length = this.length - 1;
            return nxs;
        }
        throw new RangeError('The list is empty.');
    }

    /**
     * Inspect the first element of the List.
     *
     * @returns {*} value of the first element or undefined if
     * the List is empty
     * @throws {RangeError} if the list is empty
     */
    head() {
        if (this.__start) {
            return this.__start.value;
        }
        throw new RangeError('The list is empty.');
    }

    /**
     * Returns value at `ix` position in the list, or supplied default.
     *
     * @param {Number} ix index
     * @param {*} xd default value
     * @returns {*}
     */
    atOr(ix, xd) {
        try {
            return this.at(ix);
        } catch (e) {
            return xd;
        }
    }

    /**
     * Return element at position `ix`.
     *
     * @param ix positive integer
     * @returns {*}
     */
    at(ix) {
        if (ix < 0 || ix >= this.length) {
            throw new RangeError('Index out of bounds.');
        }

        let tmp = null;
        const len = this.length;

        if (ix < len / 2) {
            tmp = this.__start;
            for (let i = 0; i < ix; i += 1) {
                tmp = tmp.next;
            }
        } else {
            tmp = this.__end;
            for (let i = len - 1; i > ix; i -= 1) {
                tmp = tmp.prev;
            }
        }

        return tmp.value;
    }

    /**
     * Populates List with elements of `xs`
     *
     * @param {array} xs
     * @private
     */
    __populate(xs) {
        const len = xs.length;
        for (let i = len - 1; i >= 0; i -= 1) {
            const nx = new Node(xs[i]);
            nx.next = this.__start;

            if (this.__start) {
                this.__start.prev = nx;
            }

            this.__start = nx;
            if (this.__end === null) {
                this.__end = nx;
            }

            this.length += 1;
        }
    }

    /**
     * Iterator for `for of` constructs.
     * @private
     */
    * __iter() {
        let tmp = this.__start;
        while (tmp !== null) {
            yield tmp.value;
            tmp = tmp.next;
        }
    }
}

export default List;
