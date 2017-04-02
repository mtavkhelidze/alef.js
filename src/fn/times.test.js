/**
 * File times.test.js is part of alef.js library.
 *
 * Written by Misha Tavkhelidze <misha.tavkhelidze@gmail.com>
 *
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
import { List } from 'immutable';
import sinon from 'sinon';

import { times } from './times';

const N = 5;

test('expects 2 arguments', (t) => {
    t.is(times.length, 2);
});

test('calls `fn` given times', (t) => {
    const fn = sinon.spy();
    times(fn, N);
    t.is(fn.callCount, N);
});

test('calls `fn` with 0 <= i < n', (t) => {
    const fn = sinon.spy();
    times(fn, N);
    for (let i = 0; i < N; i++) {
        t.is(fn.getCall(i).args[0], i);
    }
});

test('returns a List', (t) => {
    const xs = times(x => x, 3);
    t.true(List.isList(xs));
});

test('returns List of `fn` return values', (t) => {
    const double = x => x * 2;
    const xs = times(double, 3);
    t.deepEqual(xs.toJS(), [0, 2, 4]);
});
