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
import A from './index';

const List = A.List;

test('#head of empty throws an Error', t => {
    const xs = List();
    t.throws(() => {
        xs.head();
    }, Error);
});

test('#head returns first number', t => {
    const xs = List(1);
    t.is(1, xs.head());
});

test('#head returns first string', t => {
    const xs = List('0xdeadbeef');
    t.is('0xdeadbeef', xs.head());
});

test('is iterable in correct order', t => {
    const etalon = [1, '0xdeadbeef'];
    const result = [];
    const xs = List(1, '0xdeadbeef');

    // eslint-disable-next-line no-restricted-syntax
    for (const x of xs) {
        result.push(x);
    }

    for (let i = 0; i < result.length; i += 1) {
        t.true(result[i] === etalon[i]);
    }
});

test('can be initialized from Array', t => {
    const xs = List([1, 2, 3]);
    t.is(xs.head(), 1);
    t.is(xs.length, 3);
});

test('has length property', t => {
    const xs = List(1, 2, 3);
    t.is(xs.length, 3);
});

test('#at(index) returns element at index', t => {
    const xs = List(1, 2, 3);
    t.is(xs.at(0), 1);
    t.is(xs.at(1), 2);
    t.is(xs.at(2), 3);
});

test('#push adds an element to the top', t => {
    const xs = List(1, 2, 3, 4);
    const nxs = xs.push(6);
    t.is(xs.head(), 1);
    t.is(xs.length, 4);
    t.is(nxs.head(), 6);
    t.is(nxs.length, 5);
});

test.skip('#concat returns a concatenated list', t => {
    const l1 = List(1, 2, 3);
    const l2 = List(-2, -1, 0);
    const l = l2.concat(l1);
    t.is(l.head(), l2.head());
    t.is(l.at(3), 1)
});

