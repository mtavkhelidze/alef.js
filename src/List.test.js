import test from 'ava';
import { List } from './List';

test('empty list: head return undefined', t => {
    const l = new List();
    t.is(undefined, l.head());
});
