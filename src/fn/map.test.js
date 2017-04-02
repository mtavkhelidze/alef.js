/**
 * Written by Misha Tavkhelidze <misha.tavkhelidze@gmail.com>
 *
 * Copyright (c) 2017 Misha Tavkhelidze
 */

import test from 'ava';
import sinon from 'sinon';

import {map} from './map';

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

test.failing('supplies positive index as a second argument to fn', (t) => {
    map(t.context.fn, t.context.xs);

    for (let i = 0; i < t.context.fn.callCount; i++) {
        t.is(t.context.fn.getCall(i).args[SECOND_ARG], i);
    }
});

test('returns new list', (t) => {
    t.not(t.context.xs, map(t.context.fn, t.context.xs));
});
