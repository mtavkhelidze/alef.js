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
 * Immutable singly-linked list.
 */
class List {
    /**
     * Creates instance of List
     *
     * @constructor
     * @this {List}
     * @param {any|array} xs arguments or an Array
     */
    constructor(...xs) {
        /**
         * Length of the list
         *
         * @type {number}
         */
        this.length = 0;

        /**
         * List head
         *
         * @type {Node}
         * @private
         */
        this.__head = null;

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
     * Returns new List with `x` added to the top.
     *
     * @param x
     * @returns {List}
     */
    push(x) {
        const nl = new List();
        nl.__head = new Node(x);
        nl.__head.next = this.__head;
        nl.length = this.length + 1;
        return nl;
    }

    /**
     * Inspect the first element of the list.
     *
     * @returns {any|undefined} value of the first element or undefined if
     * the list is empty
     */
    head() {
        return this.__head ? this.__head.value : undefined;
    }

    /**
     * Return element at position `ix`.
     *
     * @param ix positive integer
     * @returns {any}
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
     * Populates List with elements of `xs`
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
            if (!tmp) {
                break;
            }
            yield tmp.value;
            tmp = tmp.next;
        }
    }
}

export {
    List
};
