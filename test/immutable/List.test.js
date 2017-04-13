/**
 * List.test.js
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

import test from 'ava';
import { List } from '../../src/immutable';

test('constructor creates new list', t => {
    const xs = List(1,2,3);
    t.is(xs.length, 3);
});

test('is iterable in correct order', t => {
    const etalon = [1, '0xdeadbeef'];
    const result = [];

    const xs = List(1, '0xdeadbeef');

    // Array.prototype.push adds to the end of the array.

    // eslint-disable-next-line no-restricted-syntax
    for (const x of xs) {
        result.push(x);
    }
    t.deepEqual(result, etalon);
});

test('#head of empty throws an Error', t => {
    const xs = List();
    t.throws(() => {
        xs.head();
    }, RangeError);
});

test('#head returns first number', t => {
    const xs = List(1);
    t.is(1, xs.head());
});

test('#head returns first string', t => {
    const xs = List('0xdeadbeef');
    t.is('0xdeadbeef', xs.head());
});

test('#at(index) returns element at index', t => {
    const xs = List(1, 2, 3);
    t.is(xs.at(0), 1);
    t.is(xs.at(1), 2);
    t.is(xs.at(2), 3);
});

test('#at throws RangeError on invalid index', t => {
    const xs = List();
    t.throws(() => {
        xs.at(10);
    }, RangeError);
});

test('#atOr returns the element or default', t => {
    const xs = List(1, 'string');
    const def = 'default';
    t.is(xs.atOr(1, def), 'string');
    t.is(xs.atOr(10, def), def);
});

test('#toArray creates new Array with list elements', t => {
    const xs = List(1, 3, 4, 'string');
    const ar = xs.toArray();
    t.true(ar instanceof Array);
    t.is(ar.length, xs.length);
    for (let i = 0; i < ar.length; i += 1) {
        t.is(ar[i], xs.at(i));
    }
});

test('#push adds an element to the top', t => {
    const xs = List(1, 2, 3, 4);
    const nxs = xs.push(6);
    t.is(xs.head(), 1);
    t.is(xs.length, 4);
    t.is(nxs.head(), 6);
    t.is(nxs.length, 5);
});

test('#last throws exception if the list is empty', t => {
    const xs = List();
    t.throws(() => {
        xs.last();
    }, RangeError);
});

test('#last returns last element of the list', t => {
    const xs = List(1, 2, 'last');
    t.is(xs.last(), 'last');
});


test('#tail throws exception if the list is empty', t => {
    const xs = List();
    t.throws(() => {
        xs.tail();
    }, RangeError);
});

test('#tail returns a new list minus first element', t => {
    const xs = List('one', 'two', 3);
    t.is(xs.tail().length, xs.length - 1);
    t.is(xs.tail().at(0), 'two');
    t.is(xs.tail().tail().length, xs.length - 2);
    t.is(xs.tail().tail().at(0), 3);
});

test('#contains reports true correctly', t => {
    const xs = List('one', undefined, null);
    t.true(xs.contains(null));
    t.true(xs.contains(undefined));
    t.true(xs.contains('one'));
});

test('#contains reports false correctly', t => {
    const xs = List('one', undefined, null);
    t.false(xs.contains('two'));
});

test('#empty returns true when empty', t => {
    const xs = List();
    t.true(xs.empty());
});

test('#take return a list with first n elements', t => {
    const xs = List(1, 2, 3, 4, 5);
    const nxs = xs.take(3);

    t.is(xs.__begin, nxs.__begin);
    t.is(nxs.length, 3);
    t.throws(() => {
        nxs.at(3);
    }, RangeError);
});
