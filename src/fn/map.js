/**
 * Apply `fn()` to each of `xs`
 *
 * Returns modified `xs`
 *
 * Written by Misha Tavkhelidze <misha.tavkhelidze@gmail.com>
 *
 * Copyright (c) 2017 Misha Tavkhelidze
 */

const map = (fn, xs) => {
    const len = xs.length;
    const rxs = new Array(len);

    for (let i = 0; i < len; i += 1) {
        rxs[i] = fn(xs[i], i);
    }

    return rxs;
};

export {
    map,
};
