# 面试指南

## HTML

## CSS

### BFC

## JavaScript

### 数据类型

JavaScript 共有 8 种数据类型，分别是 `String`、`Number`、`Boolean`、`Undefined`、`Null`、`Object`、`Symbol`、`BigInt`

- `Symbol` 代表创建后独一无二且不可变的数据类型，它主要是为了解决可能出现的全局变量冲突的问题

- `BigInt` 是一种数字类型的数据，它可以表示任意精度格式的整数，使用 `BigInt` 可以安全地存储和操作大整数，即使这个数已经超出了 `Number` 能够表示的安全整数范围

这些数据可以分为原始数据类型和引用数据类型：

- 栈：原始数据类型（`Undefined`、`Null`、`Boolean`、`Number`、`String`、`Symbol`、`BigInt`）
- 堆：引用数据类型（对象、数组、函数）

两种类型的区别在于存储位置的不同：

- 原始数据类型直接存储在栈（stack）中的简单数据段，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储；
- 引用数据类型存储在堆（heap）中的对象，占据空间大、大小不固定。如果存储在栈中，将会影响程序运行的性能；引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。

### 数据类型的检测

#### typeof

```js
console.log(typeof 2); // number
console.log(typeof true); // boolean
console.log(typeof "str"); // string

console.log(typeof {}); // object
console.log(typeof []); // object
console.log(typeof null); // object

console.log(typeof function () {}); // function
console.log(typeof undefined); // undefined
```

#### instanceof

`instanceof` 可以正确判断对象的类型，其内部运行机制是判断在其原型链中能否找到该类型的原型

```js
console.log(2 instanceof Number); // false
console.log(true instanceof Boolean); // false
console.log("str" instanceof String); // false

console.log([] instanceof Array); // true
console.log(function () {} instanceof Function); // true
console.log({} instanceof Object); // true
```

可以看到，`instanceof` 只能正确判断引用数据类型，而不能判断基本数据类型。`instanceof` 运算符可以用来测试一个对象在其原型链中是否存在一个构造函数的 `prototype` 属性

#### constructor

```js
console.log((2).constructor === Number); // true
console.log(true.constructor === Boolean); // true
console.log("str".constructor === String); // true
console.log([].constructor === Array); // true
console.log(function () {}.constructor === Function); // true
console.log({}.constructor === Object); // true
```

`constructor` 有两个作用，一是判断数据的类型，二是对象实例通过 `constrcutor` 对象访问它的构造函数。需要注意，如果创建一个对象来改变它的原型，`constructor` 就不能用来判断数据类型了

```js
function Fn() {}

Fn.prototype = new Array();

var f = new Fn();

console.log(f.constructor === Fn); // false
console.log(f.constructor === Array); // true
```

#### Object.prototype.toString.call()

`Object.prototype.toString.call()` 使用 `Object` 对象的原型方法 `toString` 来判断数据类型

```js
var a = Object.prototype.toString;

console.log(a.call(2)); // [object Number]
console.log(a.call(true)); // [object Boolean]
console.log(a.call("str")); // [object String]
console.log(a.call([])); // [object Array]
console.log(a.call(function () {})); // [object Function]
console.log(a.call({})); // [object Object]
console.log(a.call(undefined)); // [object Undefined]
console.log(a.call(null)); // [object Null]
```

### 判断数组的方式

通过 `Object.prototype.toString.call()` 判断

```js
Object.prototype.toString.call(obj).slice(8, -1) === "Array";
```

通过原型链判断

```js
obj.__proto__ === Array.prototype;
```

通过 ES6 的 `Array.isArray()` 判断

```js
Array.isArrray(obj);
```

通过 `instanceof` 判断

```js
obj instanceof Array;
```

通过 `Array.prototype.isPrototypeOf()` 判断

```js
Array.prototype.isPrototypeOf(obj);
```

### null 和 undefined 区别

### intanceof 操作符的实现原理及实现

`instanceof` 运算符用于判断构造函数的 `prototype` 属性是否出现在对象的原型链中的任何位置

```js
function myInstanceof(left, right) {
  // 获取对象的原型
  let proto = Object.getPrototypeOf(left);
  // 获取构造函数的 prototype 对象
  let prototype = right.prototype;

  // 判断构造函数的 prototype 对象是否在对象的原型链上
  while (true) {
    if (!proto) return false;
    if (proto === prototype) return true;
    // 如果没有找到，就继续从其原型上找，Object.getPrototypeOf方法用来获取指定对象的原型
    proto = Object.getPrototypeOf(proto);
  }
}
```

### why 0.1 + 0.2 !== 0.3

计算机是通过二进制的方式存储数据的，所以计算机计算 0.1+0.2 的时候，实际上是计算的两个数的二进制的和。0.1 的二进制是 `0.0001100110011001100...`（1100 循环），0.2 的二进制是：`0.00110011001100...`（1100 循环），这两个数的二进制都是无限循环的数。那 JavaScript 是如何处理无限循环的二进制小数呢？

一般我们认为数字包括整数和小数，但是在 JavaScript 中只有一种数字类型：Number，它的实现遵循 IEEE 754 标准，使用 64 位固定长度来表示，也就是标准的 double 双精度浮点数。在二进制科学表示法中，双精度浮点数的小数部分最多只能保留 52 位，再加上前面的 1，其实就是保留 53 位有效数字，剩余的需要舍去，遵从“0 舍 1 入”的原则

根据这个原则，0.1 和 0.2 的二进制数相加，再转化为十进制数就是：`0.30000000000000004`

下面看一下双精度数是如何保存的：

![这是图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0cb225cf71d748a8b2d6a5615e402711~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

- 第一部分（蓝色）：用来存储符号位（sign），用来区分正负数，0 表示正数，占用 1 位
- 第二部分（绿色）：用来存储指数（exponent），占用 11 位
- 第三部分（红色）：用来存储小数（fraction），占用 52 位

对于 0.1，它的二进制为：

```js
0.00011001100110011001100110011001100110011001100110011001 10011...
```

转为科学计数法（科学计数法的结果就是浮点数）：

```js
(1.1001100110011001100110011001100110011001100110011001 * 2) ^ -4;
```

可以看出 0.1 的符号位为 0，指数位为-4，小数位为：

```js
1001100110011001100110011001100110011001100110011001;
```

那么问题又来了，指数位是负数，该如何保存呢？

### var、let、const 的区别

### 数组去重

### 防抖与节流

### 执行上下文、作用域链、闭包

### call、apply、bind

### 原型/继承

### 深浅拷贝

### 事件机制、Event Loop

## 浏览器

### cookie、sessionStorage、localStorage

### 跨域

### 浏览器的重绘与重排

## TypeScript

## Vue

## React

## 网络

### 常见的状态码

### 从输入 URL 到页面展示，发生了什么

### TCP 三次握手、四次挥手

## 设计模式

## 数据结构、算法

## 安全

### XSS

### CSRF
