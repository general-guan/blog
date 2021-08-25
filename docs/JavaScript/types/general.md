# 概述

## 简介

JavaScript 共有六种数据类型

- 数值（number）
- 字符串（string）
- 布尔值（boolean）
- `undefined`
- `null`
- 对象（object）

通常，数值、字符串、布尔值合称为原始类型，`undefined`、`null` 看成特殊值

对象可细分为三个子类型

- 狭义的对象（object）
- 数组（array）
- 函数（function）

## typeof 运算符

JavaScript 有三种方法，可以判断一个值是什么类型

- `typeof` 运算符
- `instanceof` 运算符
- `Object.prototype.toString` 方法

常规

```js
// 数值
typeof 123 // "number"

// 字符串
typeof '123' // "string"

// 布尔值
typeof false // "boolean"

// undefined
typeof undefined // "undefined"
```

非常规

```js
// 函数
function f() {}
typeof f // "function"

// 对象
typeof window // "object"
typeof null // "object"
typeof {} // "object"
typeof [] // "object"
```

如果需要区分数组和对象，可以使用 `instanceof` 运算符

```js
var o = {};
var a = [];

o instanceof Array // false
a instanceof Array // true
```

