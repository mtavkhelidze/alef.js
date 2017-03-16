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
    let rxs = Array(len);
    for(let i = 0, len = xs.length; i < len; i++) {
        rxs[i] = fn(xs[i], i);
    }
    return rxs;
};

export {
    map,
};
