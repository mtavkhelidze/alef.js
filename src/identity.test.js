import test from 'ava';
import { identity } from './identity';


test('expcets 1 argument', t => {
    t.is(identity.length, 1);
});

test('returns the argument', t => {
    const obj = { k: 'v' };
    t.is(identity(obj), obj);
});
