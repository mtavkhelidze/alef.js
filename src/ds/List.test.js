import test from 'ava';
import { List } from './List';

const log = console.log.bind(console);

test('empty list head() return undefined', t => {
    const xs = new List();
    t.is(undefined, xs.head());
});

test('list with one number head() returns that number', t => {
    const xs = new List(1);
    t.is(1, xs.head());
});

test('list with one string head() returns that string', t => {
    const xs = new List('0xdeadbeef');
    t.is('0xdeadbeef', xs.head());
});

test('list is iterable and in correct order', t => {
    const etalon = [1, '0xdeadbeef'];
    const result = [];
    const xs = new List(1, '0xdeadbeef');
    for (let x of xs) {
        result.push(x);
    }
    for (let i = 0; i < result.length; i += 1) {
        t.true(result[i] === etalon[i]);
    }
});
