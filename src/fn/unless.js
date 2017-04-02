/**
 * unless
 *
 * Returns `fn(x)` if `predicate` is `false` or `x` if `true`.
 *
 * Written by Misha Tavkhelidze <misha.tavkhelidze@gmail.com>
 *
 * Copyright (c) 2017 Misha Tavkhelidze
 */

const unless = (predicate, fn, x) => predicate ? x : fn(x);

export {
    unless,
};
