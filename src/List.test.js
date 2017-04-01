import test from 'ava';
import { List } from './List';

test('empty list: head return undefined', t => {
    const l = new List();
    t.is(undefined, l.head());
});

test('list with one element: head returns first element', t=> {
    const l = new List(1);
    t.is(1, l.head());
});