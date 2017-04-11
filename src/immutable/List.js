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
 * @private
 */

const Node = (value, next = null) => {
    Node.__id += 1;
    const id = Node.__id;
    return {
        value,
        next,
        id
    };
};

Node.__id = -1;

/**
 * Scala style immutable List.
 * @constructor
 * @example
 *
 * const List = require('alef.js').List;
 * // or
 * //
 * // import { List } from 'alef.js';
 * //
 * // or
 * //
 * // import X from 'alef.js';
 * // const List = X.List;
 *
 * const l = List(1,2,3);
 * l.head(); // 1
 * l.tail(); // List(2,3)
 * l.at(2); // 3
 * l.atOr(4, 'default'); // 'default'
 *
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
        this.__begin = null;

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
         * @private
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
     * Dumps a List
     * @private
     */
    __dump() {
        // eslint-disable-next-line no-restricted-syntax
        for (const x of this) {
            // eslint-disable-next-line no-console
            console.log(x.id, x);
        }
    }

    /**
     * Populates List with elements of `xs`
     *
     * @param {Array} xs
     * @private
     */
    __populate(xs) {
        this.length = xs.length;

        this.__begin = Node();
        let tmp = this.__begin;

        for (let i = 0; i < this.length; i += 1) {
            tmp.value = xs[i];
            tmp.next = Node();

            this.__end = tmp;
            tmp = tmp.next;
        }
    }

    /**
     * Iterator for `for of` constructs.
     * @private
     */
    * __iter() {
        let tmp = this.__begin;
        for (let i = 0; i < this.length; i += 1) {
            yield tmp.value;
            tmp = tmp.next;
        }
    }

    /**
     * Inspect the first element of the List.
     *
     * @returns {*} value of the first element or undefined if
     * the List is empty
     * @throws {RangeError} if the list is empty
     */
    head() {
        if (this.length > 0) {
            return this.__begin.value;
        }
        throw new RangeError('The list is empty.');
    }

    /**
     * Return element at position `ix`.
     *
     * @param {Number} ix positive integer
     * @throws {RangeError} if index is out of bounds or negative
     * @returns {*}
     */
    at(ix) {
        let tmp = this.__begin;
        for (let i = 0; i < this.length; i += 1) {
            if (i === ix) {
                return tmp.value;
            }
            tmp = tmp.next;
        }
        throw new RangeError('Index out of bounds.');
    }

    /**
     * Returns new List with `x` added to the top.
     *
     * @param x
     * @returns {List}
     */
    push(x) {
        const nl = new List();
        const ex = Node(x);
        ex.next = this.__begin;
        nl.__begin = ex;
        nl.__end = this.__end;
        nl.length = this.length + 1;
        return nl;
    }

    /**
     * Returns value at `ix` position in the list, or supplied default.
     *
     * @param {Number} ix positive integer
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
     * Copies elements of the list into new Array
     *
     * @return {Array} array of values
     */
    toArray() {
        const ar = new Array(this.length);

        let tmp = this.__begin;
        for (let i = 0; i < this.length; i += 1) {
            ar[i] = tmp.value;
            tmp = tmp.next;
        }

        return ar;
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
     * Selects all elements except the first.
     *
     * @returns {*}
     */
    tail() {
        if (this.__begin) {
            const nxs = new List();
            nxs.__begin = this.__begin.next;
            nxs.__end = this.__end;
            nxs.length = this.length - 1;
            return nxs;
        }
        throw new RangeError('The list is empty.');
    }

    /**
     * Selects first n elements.
     *
     * @param {Number} n the number of elements to take from this list.
     * @returns {List} a list consisting only of the first n elements of
     * this list, or else the whole list, if it has less than n elements.
     */
    take(n) {
        const xs = new List();
        xs.length = n > this.length ? this.length : n;

        xs.__begin = this.__begin;
        xs.__end = xs.__begin;
        for (let i = 0; i < xs.length - 1; i += 1) {
            xs.__end = xs.__end.next;
        }
        return xs;
    }

    /**
     * Returns true if List has no elements, false otherwise
     *
     * @returns {boolean}
     */
    empty() {
        return this.length === 0;
    }

    /**
     * Tests whether this sequence contains a given value as an element.
     *
     * @param {*} value to look for
     * @returns {boolean}
     */
    contains(value) {
        let tmp = this.__begin;
        for (let i = 0; i < this.length; i += 1) {
            if (tmp.value === value) {
                return true;
            }
            tmp = tmp.next;
        }
        return false;
    }
}

export default List;
