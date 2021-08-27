# 数组

## 定义

数组（array）是按次序排列的一组值，每个值的位置都有编号（从0开始），整个数组用方括号表示

```js
var arr = ['a', 'b', 'c'];
```

## length 属性

数组的 `length` 属性，返回数组的成员数量

```js
['a', 'b', 'c'].length // 3
```

`length` 属性是一个动态的值，等于键名中的最大整数加上 `1`

```js
var arr = ['a', 'b'];

arr[9] = 'd';
arr.length // 10

arr[1000] = 'e';
arr.length // 1001
```

## in 运算符

检查某个键名是否存在的运算符`in`，适用于对象，也适用于数组

```js
var arr = [ 'a', 'b', 'c' ];
2 in arr  // true
'2' in arr // true
4 in arr // false
```

## for...in 循环和数组的遍历

`for...in` 循环不仅可以遍历对象，也可以遍历数组，但是还会遍历非数字键

```js
var a = [1, 2, 3];
a.foo = true;

for (var key in a) {
  console.log(key);
}
// 0
// 1
// 2
// foo
```

## 数组的空位

使用 `delete` 命令删除一个数组成员，会形成空位，并且不会影响 `length` 属性

```js
var a = [1, 2, 3];
delete a[1];

a[1] // undefined
a.length // 3
```

数组的某个位置是空位，与某个位置是 `undefined`，是不一样的，如果是空位，使用数组的 `forEach` 方法、`for...in` 结构、以及 `Object.keys` 方法进行遍历，空位都会被跳过，如果某个位置是 `undefined`，遍历的时候就不会被跳过

```js
var a = [, , ,];
a.forEach(function (x, i) {
  console.log(i + '. ' + x);
})
// 不产生任何输出

var a = [undefined, undefined, undefined];
a.forEach(function (x, i) {
  console.log(i + '. ' + x);
});
// 0. undefined
// 1. undefined
// 2. undefined
```

## 类似数组的对象

如果一个对象的所有键名都是正整数或零，并且有 `length` 属性，那么这个对象就很像数组，语法上称为“类似数组的对象”

```js
var obj = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3
};

obj[0] // 'a'
obj[1] // 'b'
obj.length // 3
obj.push('d') // TypeError: obj.push is not a function
```

`length` 属性不是动态的

```js
var obj = {
  length: 0
};
obj[3] = 'd';
obj.length // 0
```

典型的“类似数组的对象”是函数的 `arguments` 对象，以及大多数 DOM 元素集，还有字符串

```js
// arguments对象
function args() { return arguments }
var arrayLike = args('a', 'b');

arrayLike[0] // 'a'
arrayLike.length // 2
arrayLike instanceof Array // false

// DOM元素集
var elts = document.getElementsByTagName('h3');
elts.length // 3
elts instanceof Array // false

// 字符串
'abc'[1] // 'b'
'abc'.length // 3
'abc' instanceof Array // false
```

数组的 `slice` 方法可以将“类似数组的对象”变成真正的数组

```js
var arr = Array.prototype.slice.call(arrayLike);
```

除了转为真正的数组，“类似数组的对象”还有一个办法可以使用数组的方法，就是通过 `call()` 把数组的方法放到对象上面

```js
function print(value, index) {
  console.log(index + ' : ' + value);
}

Array.prototype.forEach.call(arrayLike, print);
```

