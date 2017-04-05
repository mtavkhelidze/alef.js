/**
 * map.test.js
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
import sinon from 'sinon';

import { map } from './map';

const FIRST_ARG = 0;
const SECOND_ARG = 1;
const fn = sinon.spy();
const xs = [1, 2, 3];

test.beforeEach((t) => {
    // eslint-disable-next-line no-param-reassign
    t.context = {
        fn, xs
    };
});

test('expects 2 arguments', (t) => {
    t.is(map.length, 2);
});

test('applies a function to all elements', (t) => {
    map(t.context.fn, t.context.xs);

    for (let i = 0; i < t.context.fn.callCount; i++) {
        t.is(t.context.fn.getCall(i).args[FIRST_ARG], t.context.xs[i]);
    }

    t.is(t.context.fn.callCount, t.context.xs.length);
});

test.skip('supplies positive index as a second argument to fn', (t) => {
    map(t.context.fn, t.context.xs);

    for (let i = 0; i < t.context.fn.callCount; i++) {
        t.is(t.context.fn.getCall(i).args[SECOND_ARG], i);
    }
});

test('returns new list', (t) => {
    t.not(t.context.xs, map(t.context.fn, t.context.xs));
});
