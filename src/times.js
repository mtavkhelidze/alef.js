/**
 * times
 *
 * Calls `fn(i)` where `0 <= i < n` and returns an array of results of
 * those calls.
 *
 * Written by Misha Tavkhelidze <misha.tavkhelidze@gmail.com>
 *
 * Copyright (c) 2017 Misha Tavkhelidze
 */

import { List } from 'immutable';

const times = (fn, n) => {
    const xs = List().asMutable();
    for (let i = 0; i < n; i++) {
        xs.push(fn(i));
    }
    return xs.asImmutable();
};

// const _times = (fn, n, xs) =>
//
// const times = (fn, n) => _times(fn, n, List());

export {
    times,
}
