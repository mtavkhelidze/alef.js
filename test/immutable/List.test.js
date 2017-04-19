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

test('#constructor creates new list', t => {
    const xs = new List();
    t.true(xs instanceof List);
});

test('#length of empty list is zero', t => {
    const xs = new List();
    t.is(xs.length, 0);
});

test('#length is read-only', t => {
    const xs = new List();
    t.throws(() => {
        xs.length = 0;
    }, Error);
});

test('#constructor creates list from arguments', t => {
    const xs = new List(1, 2, 3);
    t.is(xs.length, 3);
    t.is(xs.at(0), 1);
    t.is(xs.at(1), 2);
    t.is(xs.at(2), 3);
});

test('#constructor creates list from Array', t => {
    const xs = new List([1, 2]);
    t.is(xs.length, 2);
    t.is(xs.__begin.value, 1);
    t.is(xs.__end.value, 2);
});

test('is iterable in correct order', t => {
    const before = [1, '0xdeadbeef'];
    const after = [];

    const xs = new List(1, '0xdeadbeef');

    for (const x of xs) {
        after.push(x);
    }

    t.deepEqual(before, after);
});

test('#head of empty throws an Error', t => {
    const xs = new List();
    t.throws(() => {
        xs.head();
    }, RangeError);
});

test('#head returns first number', t => {
    const xs = new List(1, 2);
    t.is(1, xs.head());
});

test('#head returns first string', t => {
    const xs = new List('0xdeadbeef');
    t.is('0xdeadbeef', xs.head());
});

test('#at(index) returns element at index', t => {
    const xs = new List(1, 2, 3);
    t.is(xs.at(0), 1);
    t.is(xs.at(1), 2);
    t.is(xs.at(2), 3);
});

test('#at throws RangeError on invalid index', t => {
    const xs = new List(10, 11);
    t.throws(() => {
        xs.at(10);
    }, RangeError);
});

test('#atOr returns the element or default', t => {
    const xs = new List(1, 'string');
    const def = 'default';
    t.is(xs.atOr(1, def), 'string');
    t.is(xs.atOr(10, def), def);
});

test('#toArray creates new Array with list elements', t => {
    const xs = new List(1, 3, 4, 'string');
    const ar = xs.toArray();
    t.true(ar instanceof Array);
    t.is(ar.length, xs.length);
    for (let i = 0; i < ar.length; i += 1) {
        t.is(ar[i], xs.at(i));
    }
});

test('#cons adds an element to the top', t => {
    const xs = new List(1, 2, 3, 4);
    const nxs = xs.cons(6);
    t.is(xs.head(), 1);
    t.is(xs.length, 4);
    t.is(nxs.head(), 6);
    t.is(nxs.length, 5);
});

test('#last throws exception if the list is empty', t => {
    const xs = new List();
    t.throws(() => {
        xs.last();
    }, RangeError);
});

test('#last returns last element of the list', t => {
    const xs = new List(1, 2, 'last');
    t.is(xs.last(), 'last');
});

test('#tail throws exception if the list is empty', t => {
    const xs = new List();
    t.throws(() => {
        xs.tail();
    }, RangeError);
});

test('#tail returns a new list minus first element', t => {
    const xs = new List('one', 'two', 3);
    const t1 = xs.tail();
    const t2 = t1.tail();
    t.is(t1.length, xs.length - 1);
    t.is(t1.at(0), 'two');
    t.is(t2.length, xs.length - 2);
    t.is(t2.at(0), 3);
});

test('#elem returns correct answer', t => {
    const xs = new List('one', undefined, null);
    t.true(xs.elem(null));
    t.true(xs.elem(undefined));
    t.true(xs.elem('one'));
    t.false(xs.elem('two'));
});

test('#empty returns true when empty', t => {
    const xs = new List();
    t.true(xs.empty());
});

test('#take returns a list with first n elements', t => {
    const xs = new List(1, 2, 3, 4, 5);
    const nxs = xs.take(3);

    t.is(xs.__begin, nxs.__begin);
    t.is(nxs.length, 3);
    t.throws(() => {
        nxs.at(3);
    }, RangeError);
});

test('#tekaRight throws Range error if the list is empty', t => {
    const xs = new List();
    t.throws(() => {
        xs.takeRight(10);
    }, RangeError);
});

test('#takeRight returns the same list if n is greater than length', t => {
    const xs = new List(1, 2, 3, 4, 5, 6);
    const nxs = xs.takeRight(10);
    t.is(nxs, xs);
});

test('#takeRight returns new list with last n elements', t => {
    const xs = new List(1, 2, 3, 4, 5, 6);
    const nxs = xs.takeRight(3);
    t.is(nxs.length, 3);
    for (let i = 0; i < 3; i += 1) {
        t.is(nxs.at(i), xs.at(xs.length - 3 + i));
    }
});
