/**
 * Tests for `times`
 *
 * Written by Misha Tavkhelidze <misha.tavkhelidze@gmail.com>
 *
 * Copyright (c) 2017 Misha Tavkhelidze
 */

import test from 'ava';
import sinon from 'sinon';

import { times } from './times';


const N = 5;

test('expects 2 arguments', t => {
    t.is(times.length, 2);
});

test('calls `fn` given times', t => {
    const fn = sinon.spy();
    times(fn, N);
    t.is(fn.callCount, N);
});

test('calls `fn` with 0 <= i < n', t => {
    const fn = sinon.spy();
    times(fn, N);
    for(let i = 0; i < N; i++) {
        t.is(fn.getCall(i).args[0], i);
    }
});

test('returns array of `fn` return values', t => {
    const double = x => x * 2;
    const xs = times(double, 3);
    t.deepEqual(xs, [0, 2, 4]);
})
