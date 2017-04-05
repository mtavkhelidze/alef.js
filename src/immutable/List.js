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
         * List tail
         *
         * @type {Node}
         * @private
         */
        this.__tail = null;

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
     * Returns a new list containing the elements from the this list
     * followed by the elements of the `xs`.
     *
     * @param {List} xs A list to concatenate with
     * @returns {List}
     */
    // concat(xs) {
    //     const nxs = List();
    //     nxs.__head = this.__head;
    //     return nxs;
    // }

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
     * Inspect the first element of the List.
     *
     * @returns {*} value of the first element or undefined if
     * the List is empty
     * @throws {Error} if the List is empty
     */
    head() {
        if (this.__head) {
            return this.__head.value;
        }
        throw new Error('The list is empty.');
    }

    /**
     * Return element at position `ix`.
     *
     * @param ix positive integer
     * @returns {*}
     */
    at(ix) {
        if(ix < 0 && ix >= this.length) {
            throw new Error('Index out of bounds.')
        }
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
            yield tmp.value;
            tmp = tmp.next;
        }
    }
}

export {
    List
};
