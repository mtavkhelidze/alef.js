/**
 * Tests for `unless`
 *
 * Written by Misha Tavkhelidze <misha.tavkhelidze@gmail.com>
 *
 * Copyright (c) 2017 Misha Tavkhelidze
 */

import test from 'ava';
import sinon from 'sinon';

import { unless } from './unless';

const fn = sinon.spy();

test('expects 3 arguments', (t) => {
    t.is(unless.length, 3);
});

test('calls `fn` if predicate is false', (t) => {
    const arg = '0xdeadbeef';
    unless(false, fn, arg);
    t.is(fn.callCount, 1);
    t.is(fn.firstCall.args[0], arg);
});

test('does not call`fn` if predicate is true', (t) => {
    fn.reset();
    unless(true, fn, null);
    t.is(fn.callCount, 0);
});
