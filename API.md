# alef.js

![alef.js logo](graphics/alef.js.png)

Immutable Data Structures JavaScript Library

---

This file is automaticallty generated from comments in `src/`.

For general description and installation instruction check [README](README.md).

# API Documentation

<a name="List"></a>

## List
Scala style immutable List.


* [List](#List)
    * [List([...args])](#new_List_new)
    * [.takeRight(n)](#List+takeRight) ⇒ <code>[List](#List)</code>
    * [.head()](#List+head) ⇒ <code>\*</code>
    * [.at(ix)](#List+at) ⇒ <code>\*</code>
    * [.cons(x)](#List+cons) ⇒ <code>[List](#List)</code>
    * [.atOr(ix, xd)](#List+atOr) ⇒ <code>\*</code>
    * [.toArray()](#List+toArray) ⇒ <code>Array</code>
    * [.last()](#List+last) ⇒ <code>\*</code>
    * [.tail()](#List+tail) ⇒ <code>\*</code>
    * [.take(n)](#List+take) ⇒ <code>[List](#List)</code>
    * [.empty()](#List+empty) ⇒ <code>boolean</code>
    * [.elem(value)](#List+elem) ⇒ <code>boolean</code>

<a name="new_List_new"></a>

### List([...args])
Creates instance of List


| Param | Type | Description |
| --- | --- | --- |
| [...args] | <code>\*</code> | arguments or an Array |

**Example**  
```js
const List = require('alef.js').List;
// or
//
// import { List } from 'alef.js';
//
// or
//
// import X from 'alef.js';
// const List = X.List;

const l = new List(1, 'two', { three: true }); // or new List([1, 2, 3])
l.head(); // 1
l.tail(); // List('two', { three: true })
l.at(2); // { three: true }
l.at(4) // throws RangeError
l.atOr(4, 'default'); // 'default'
```
<a name="List+takeRight"></a>

### list.takeRight(n) ⇒ <code>[List](#List)</code>
Returns a list with last n elements of original, or the whole list if
n >= xs.length, or empty List if n == 0.

**Throws**:

- <code>RangeError</code> if the list is empty or n &lt; 0


| Param | Type | Description |
| --- | --- | --- |
| n | <code>Number</code> | number of elements to return |

<a name="List+head"></a>

### list.head() ⇒ <code>\*</code>
Inspect the first element of the List.

**Returns**: <code>\*</code> - value of the first element or undefined if
the List is empty  
**Throws**:

- <code>RangeError</code> if the list is empty

<a name="List+at"></a>

### list.at(ix) ⇒ <code>\*</code>
Return element at position `ix`.

**Throws**:

- <code>RangeError</code> if index is out of bounds or negative


| Param | Type | Description |
| --- | --- | --- |
| ix | <code>Number</code> | positive integer |

<a name="List+cons"></a>

### list.cons(x) ⇒ <code>[List](#List)</code>
Returns new List with `x` added to the top.


| Param |
| --- |
| x | 

<a name="List+atOr"></a>

### list.atOr(ix, xd) ⇒ <code>\*</code>
Returns value at `ix` position in the list, or supplied default.


| Param | Type | Description |
| --- | --- | --- |
| ix | <code>Number</code> | positive integer |
| xd | <code>\*</code> | default value |

<a name="List+toArray"></a>

### list.toArray() ⇒ <code>Array</code>
Copies elements of the list into new Array

**Returns**: <code>Array</code> - array of values  
<a name="List+last"></a>

### list.last() ⇒ <code>\*</code>
Selects last element.

**Throws**:

- <code>RangeError</code> if the list is empty.

<a name="List+tail"></a>

### list.tail() ⇒ <code>\*</code>
Selects all elements except the first.

<a name="List+take"></a>

### list.take(n) ⇒ <code>[List](#List)</code>
Selects first n elements.

The resulting list has only of the first n elements of
this list, or all elements of original list, n is less than length,
or empty list if n <= 0 or the list is empty.


| Param | Type | Description |
| --- | --- | --- |
| n | <code>Number</code> | the number of elements to take from this list. |

<a name="List+empty"></a>

### list.empty() ⇒ <code>boolean</code>
Returns true if List has no elements, false otherwise

<a name="List+elem"></a>

### list.elem(value) ⇒ <code>boolean</code>
Tests whether this sequence contains a given value as an element.


| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | to look for |

