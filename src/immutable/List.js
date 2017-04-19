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

import Node from './Node';

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
 * const l = new List(1, 'two', { three: true }); // or new List([1, 2, 3])
 * l.head(); // 1
 * l.tail(); // List('two', { three: true })
 * l.at(2); // { three: true }
 * l.at(4) // throws RangeError
 * l.atOr(4, 'default'); // 'default'
 *
 */

class List {
    /**
     * Creates instance of List
     *
     * @param {...*} [args] arguments or an Array
     */
    constructor(...args) {
        /**
         * @private
         */
        this.__length = 0;

        /**
         * @private
         */
        this.__begin = null;

        /**
         * @private
         */
        this.__end = null;

        const __init = xs => {
            const len = xs.length - 1;
            for (let i = xs.length - 1; i >= 0; i -= 1) {
                this.__begin = new Node(xs[i], this.__begin);
                this.__length += 1;
                if (i === len) {
                    this.__end = this.__begin;
                }
            }
        };

        if (args.length === 1 && Array.isArray(args[0])) {
            __init(args[0]);
        } else {
            __init(args);
        }
    }

    get length() {
        return this.__length;
    }

    inspect() {
        const __inspect = (node = this.__begin) => {
            if (node === this.__end) {
                return `${node}`;
            }
            return `${node} -> ${__inspect(node.next)}`;
        };
        return `(List ${__inspect()})`;
    }


    [Symbol.toStringTag]() {
        return this.inspect();
    }

    * [Symbol.iterator]() {
        for (let tmp = this.__begin; tmp !== null; tmp = tmp.next) {
            yield tmp.value;
        }
    }

    /**
     * Returns a list with last n elements of original, or the whole list if
     * n >= xs.length, or empty List if n == 0.
     *
     * @param {Number} n number of elements to return
     * @returns {List}
     * @throws {RangeError} if the list is empty or n &lt; 0
     */
    takeRight(n) {
        if (this.length > 0) {
            if (n < this.length) {
                const xs = new List();

                let tmp = this.__begin;
                const firstN = this.length - n;

                for (let i = 0; i < firstN; i += 1) {
                    tmp = tmp.next;
                }

                xs.__begin = tmp;
                xs.__end = this.__end;
                xs.__length = n;

                return xs;
            }
            return this;
        }
        throw RangeError('The list is empty.');
    }

    /**
     * Inspect the first element of the List.
     *
     * @returns {*} value of the first element or undefined if
     * the List is empty
     * @throws {RangeError} if the list is empty
     */
    head() {
        if (this.__begin !== null) {
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
        let i = 0;
        if (ix < this.length) {
            for (let tmp = this.__begin; tmp !== null; tmp = tmp.next, i += 1) {
                if (i === ix) {
                    return tmp.value;
                }
            }
        }
        throw new RangeError('Index out of bounds.');
    }

    /**
     * Returns new List with `x` added to the top.
     *
     * @param x
     * @returns {List}
     */
    cons(x) {
        const nl = new List();
        nl.__begin = new Node(x, this.__begin);
        nl.__end = this.__end;
        nl.__length = this.length + 1;
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
        let i = 0;

        for (let tmp = this.__begin; tmp !== null; tmp = tmp.next, i += 1) {
            ar[i] = tmp.value;
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
        if (this.__end !== null) {
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
            nxs.__length = this.length - 1;
            return nxs;
        }
        throw new RangeError('The list is empty.');
    }

    /**
     * Selects first n elements.
     *
     * The resulting list has only of the first n elements of
     * this list, or all elements of original list, n is less than length,
     * or empty list if n <= 0 or the list is empty.
     *
     * @param {Number} n the number of elements to take from this list.
     * @returns {List}
     */
    take(n) {
        const xs = new List();
        if (!this.empty() && n > 0) {
            xs.__length = n > this.length ? this.length : n;

            xs.__begin = this.__begin;
            xs.__end = xs.__begin;
            for (let i = 0; i < xs.length - 1; i += 1) {
                xs.__end = xs.__end.next;
            }
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
    elem(value) {
        for (let tmp = this.__begin; tmp !== null; tmp = tmp.next) {
            if (tmp.value === value) {
                return true;
            }
        }
        return false;
    }
}

export default List;
