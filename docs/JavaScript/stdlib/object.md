# Object 对象

## 概述

JavaScript 原生提供 `Object` 对象（注意起首的 `O` 是大写）

JavaScript 的所有其他对象都继承自 `Object` 对象，即那些对象都是 `Object` 的实例

`Object` 对象的原生方法分成两类：`Object` 本身的方法（又称为“静态方法”）与 `Object` 的实例方法

**（1）`Object` 对象本身的方法**

```js
Object.print = function (o) { console.log(o) };
```

**（2）`Object` 的实例方法**

所谓实例方法就是定义在 `Object` 原型对象 `Object.prototype` 上的方法，它可以被 `Object` 实例直接使用

```js
Object.prototype.print = function () {
  console.log(this);
};

var obj = new Object();
obj.print() // Object
```

## Object()

`Object` 本身是一个函数，可以当作工具方法使用，将任意值转为对象，这个方法常用于保证某个值一定是对象

如果参数为空（或者为 `undefined` 和 `null`），`Object()` 返回一个空对象

```js
var obj = Object();
// 等同于
var obj = Object(undefined);
var obj = Object(null);

obj instanceof Object // true
```

`instanceof` 运算符用来验证，一个对象是否为指定的构造函数的实例，`obj instanceof Object` 返回 `true`，就表示 `obj` 对象是 `Object` 的实例

如果参数是原始类型的值，`Object` 方法将其转为对应的包装对象的实例

```js
var obj = Object(1);
obj instanceof Object // true
obj instanceof Number // true

var obj = Object('foo');
obj instanceof Object // true
obj instanceof String // true

var obj = Object(true);
obj instanceof Object // true
obj instanceof Boolean // true
```

如果 `Object` 方法的参数是一个对象，它总是返回该对象，即不用转换

```js
var arr = [];
var obj = Object(arr); // 返回原数组
obj === arr // true

var value = {};
var obj = Object(value) // 返回原对象
obj === value // true

var fn = function () {};
var obj = Object(fn); // 返回原函数
obj === fn // true
```

利用这一点，可以写一个判断变量是否为对象的函数

```js
function isObject(value) {
  return value === Object(value);
}

isObject([]) // true
isObject(true) // false
```

## Object 构造函数

`Object` 不仅可以当作工具函数使用，还可以当作构造函数使用，即前面可以使用 `new` 命令

```js
var obj = new Object();
```

> 注意，通过 `var obj = new Object()` 的写法生成新对象，与字面量的写法 `var obj = {}` 是等价的，或者说，后者只是前者的一种简便写法

`Object` 构造函数的用法与工具方法很相似，几乎一模一样，使用时，可以接受一个参数，如果该参数是一个对象，则直接返回这个对象；如果是一个原始类型的值，则返回该值对应的包装对象

```js
var o1 = {a: 1};
var o2 = new Object(o1);
o1 === o2 // true

var obj = new Object(123);
obj instanceof Number // true
```

虽然用法相似，但是 `Object(value)` 与 `new Object(value)` 两者的语义是不同的，`Object(value)` 表示将 `value` 转成一个对象，`new Object(value)` 则表示新生成一个对象，它的值是 `value`

## Object 的静态方法

### Object.keys()，Object.getOwnPropertyNames()

















