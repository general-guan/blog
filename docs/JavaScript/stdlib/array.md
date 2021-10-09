# Array 对象

## 构造函数

`Array()` 构造函数有很大缺陷，不同的参数个数会导致不一致的行为

```js
// 无参数时，返回一个空数组
new Array() // []

// 单个正整数参数，表示返回的新数组的长度
new Array(1) // [ empty ]
new Array(2) // [ empty x 2 ]

// 非正整数的数值作为参数，会报错
new Array(3.2) // RangeError: Invalid array length
new Array(-3) // RangeError: Invalid array length

// 单个非数值（比如字符串、布尔值、对象等）作为参数，
// 则该参数是返回的新数组的成员
new Array('abc') // ['abc']
new Array([1]) // [Array[1]]

// 多参数时，所有参数都是返回的新数组的成员
new Array(1, 2) // [1, 2]
new Array('a', 'b', 'c') // ['a', 'b', 'c']
```

`Array()` 作为构造函数，行为很不一致，因此，不建议使用它生成新数组，直接使用数组字面量是更好的做法

```js
// bad
var arr = new Array(1, 2);

// good
var arr = [1, 2];
```

## 静态方法

### Array.isArray()

`Array.isArray` 方法返回一个布尔值，表示参数是否为数组，可以弥补 `typeof` 运算符的不足

```js
var arr = [1, 2, 3];

typeof arr // "object"
Array.isArray(arr) // true
```

## 实例方法

### valueOf()，toString()

数组的 `valueOf` 方法返回数组本身

```ts
valueOf(): Object;
```

```js
var arr = [1, 2, 3];
arr.valueOf() // [1, 2, 3]
```

数组的 `toString` 方法返回数组的字符串形式

```
toString(): string;
```

```js
var arr = [1, 2, 3];
arr.toString() // "1,2,3"
```

### push()，pop()

`push` 方法用于在数组的末端添加一个或多个元素，并返回添加新元素后的数组长度，<u>注意，该方法会改变原数组</u>

```ts
push(...items: T[]): number
```

```js
var arr = [];

arr.push(1) // 1
arr.push(true, {}) // 3
arr // [1, true, {}]
```

`pop` 方法用于删除数组的最后一个元素，并返回该元素，<u>注意，该方法会改变原数组</u>

```ts
pop(): T | undefined;
```

```js
var arr = ['a', 'b', 'c'];

arr.pop() // 'c'
arr // ['a', 'b']
```

### shift()，unshift()

`shift()` 方法用于删除数组的第一个元素，并返回该元素，<u>注意，该方法会改变原数组</u>

```ts
shift(): T | undefined;
```

```js
var a = ['a', 'b', 'c'];

a.shift() // 'a'
a // ['b', 'c']
```

`unshift()` 方法用于在数组的第一个位置添加元素，并返回添加新元素后的数组长度，<u>注意，该方法会改变原数组</u>

```ts
unshift(...items: T[]): number;
```

```js
var a = ['a', 'b', 'c'];

a.unshift('x'); // 4
a // ['x', 'a', 'b', 'c']
```

### join()

`join()` 方法以指定参数作为分隔符，将所有数组成员连接为一个字符串返回，如果不提供参数，默认用逗号分隔

```ts
join(separator?: string): string;
```

```js
var a = [1, 2, 3, 4];

a.join(' ') // '1 2 3 4'
a.join(' | ') // "1 | 2 | 3 | 4"
a.join() // "1,2,3,4"
```

如果数组成员是 `undefined` 或 `null` 或空位，会被转成空字符串

```js
[undefined, null].join('#')
// '#'

['a',, 'b'].join('-')
// 'a--b'
```

通过 `call` 方法，这个方法也可以用于字符串或类似数组的对象

```js
Array.prototype.join.call('hello', '-')
// "h-e-l-l-o"

var obj = { 0: 'a', 1: 'b', length: 2 };
Array.prototype.join.call(obj, '-')
// 'a-b'
```

### concat()

`concat` 方法用于多个数组的合并，它将新数组的成员，添加到原数组成员的后部，然后<u>返回一个新数组，原数组不变</u>

```ts
concat(...items: ConcatArray<T>[]): T[];
concat(...items: (T | ConcatArray<T>)[]): T[];
```

```js
['hello'].concat(['world'], ['!'])
// ["hello", "world", "!"]

[].concat({a: 1}, {b: 2})
// [{ a: 1 }, { b: 2 }]

[1, 2, 3].concat(4, 5, 6)
// [1, 2, 3, 4, 5, 6]
```

如果数组成员包括对象，`concat` 方法返回当前数组的一个浅拷贝，所谓“浅拷贝”，指的是新数组拷贝的是对象的引用

### reverse()

`reverse` 方法用于颠倒排列数组元素，返回改变后的数组，<u>注意，该方法将改变原数组</u>

```ts
reverse(): T[];
```

```js
var a = ['a', 'b', 'c'];

a.reverse() // ["c", "b", "a"]
a // ["c", "b", "a"]
```

### slice()

`slice()` 方法用于提取目标数组的一部分，<u>返回一个新数组，原数组不变</u>

```ts
slice(start?: number, end?: number): T[];
```

它的第一个参数为起始位置（从0开始，会包括在返回的新数组之中），第二个参数为终止位置（但该位置的元素本身不包括在内），如果省略第二个参数，则一直返回到原数组的最后一个成员

```js
var a = ['a', 'b', 'c'];

a.slice(0) // ["a", "b", "c"]
a.slice(1) // ["b", "c"]
a.slice(1, 2) // ["b"]
a.slice(2, 6) // ["c"]
a.slice() // ["a", "b", "c"]
```

如果 `slice()` 方法的参数是负数，则表示倒数计算的位置

```js
var a = ['a', 'b', 'c'];
a.slice(-2) // ["b", "c"]
a.slice(-2, -1) // ["b"]
```

如果第一个参数大于等于数组长度，或者第二个参数小于第一个参数，则返回空数组

```js
var a = ['a', 'b', 'c'];
a.slice(4) // []
a.slice(2, 1) // []
```

`slice()` 方法的一个重要应用，是将类似数组的对象转为真正的数组

```js
Array.prototype.slice.call({ 0: 'a', 1: 'b', length: 2 }) // ['a', 'b']
```





