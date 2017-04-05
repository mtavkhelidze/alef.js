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

import assert from 'assert';

/**
 * Internal class.
 */
class Node {
    constructor(value, next = null) {
        this.value = value;
        this.next = next || null;
    }
}

/**
 * Scala style immutable _List.
 */
class _List {
    /**
     * Creates instance of _List
     *
     * @param {...*} [xs] arguments or an Array
     */
    constructor(...xs) {
        /**
         * Length of the _List
         *
         * @type {number}
         */
        this.length = 0;

        /**
         * _List head
         *
         * @type {Node}
         * @private
         */
        this.__head = null;

        /**
         * _List iterator function
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
     * Returns new _List with `x` added to the top.
     *
     * @param x
     * @returns {_List}
     */
    push(x) {
        const nl = new _List();
        nl.__head = new Node(x);
        nl.__head.next = this.__head;
        nl.length = this.length + 1;
        return nl;
    }

    /**
     * Inspect the first element of the _List.
     *
     * @returns {*} value of the first element or undefined if
     * the _List is empty
     * @throws {Error} if the _List is empty
     */
    head() {
        if (this.__head) {
            return this.__head.value
        }
        throw new Error('The _List is empty');
    }

    /**
     * Return element at position `ix`.
     *
     * @param ix positive integer
     * @returns {*}
     */
    at(ix) {
        assert(ix >= 0);
        let tmp = this.__head;
        for (let i = ix; i > 0; i -= 1) {
            tmp = tmp.next;
        }
        return tmp.value;
    }

    /**
     * Populates _List with elements of `xs`
     *
     * @param {array} xs
     * @private
     */
    __populate(xs) {
        const len = xs.length;
        for (let i = len - 1; i >= 0; i -= 1) {
            const nx = new Node(xs[i]);
            nx.next = this.__head;
            this.__head = nx;
            this.length += 1;
        }
    }

    /**
     * Iterator for `for of` constructs.
     * @private
     */
    * __iter() {
        let tmp = this.__head;
        while (tmp !== null) {
            yield tmp.value;
            tmp = tmp.next;
        }
    }
}

const List = (...args) => new _List(...args);

export {
    List
};

