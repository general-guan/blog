# 函数

## 概述

### 函数的声明

function 命令

```js
function print(s) {
  console.log(s);
}
```

函数表达式

```js
var print = function(s) {
  console.log(s);
};
```

### 函数名的提升

`function` 命令

```js
f();

function f() {}
```

函数表达式

```js
f();
var f = function (){};
// TypeError: undefined is not a function

// 等同于
var f;
f();
f = function () {};
```

面试题

```js
var f = function () {
  console.log('1');
}

function f() {
  console.log('2');
}

f() // 1
```

## 函数的属性和方法

### name 属性

```js
function f1() {}
f1.name // "f1"

var f2 = function () {};
f2.name // "f2"

var f3 = function myName() {};
f3.name // 'myName'
```

### length 属性

`length` 属性返回函数预期传入的参数个数

```js
function f(a, b) {}
f.length // 2
```

### toString()

```js
function f() {
  a();
  b();
  c();
}

f.toString()
// function f() {
//  a();
//  b();
//  c();
// }
```

## 函数作用域

### 函数本身的作用域

函数执行时所在的作用域，是定义时的作用域，而不是调用时所在的作用域

```js
var a = 1;
var x = function () {
  console.log(a);
};

function f() {
  var a = 2;
  x();
}

f() // 1
```

## 参数

### 传递方式

原始类型的值（数值、字符串、布尔值），传递方式是传值传递，这意味着，在函数体内修改参数值，不会影响到函数外部

```js
var p = 2;

function f(p) {
  p = 3;
}
f(p);

p // 2
```

复合类型的值（数组、对象、其他函数），传递方式是传址传递，也就是说，传入函数的原始值的地址，因此在函数内部修改参数，将会影响到原始值

```js
var obj = { p: 1 };

function f(o) {
  o.p = 2;
}
f(obj);

obj.p // 2
```

如果替换掉整个参数，不会影响到原始值

```js
var obj = [1, 2, 3];

function f(o) {
  o = [2, 3, 4];
}
f(obj);

obj // [1, 2, 3]
```

### arguments 对象

`arguments` 对象包含函数运行时的所有参数

```js
var f = function (one) {
  console.log(arguments[0]);
  console.log(arguments[1]);
  console.log(arguments[2]);
}

f(1, 2, 3)
// 1
// 2
// 3
```

## 函数的其他知识点

### 闭包

定义在一个函数内部的函数，`f2` 就是闭包

```js
function f1() {
  var n = 999;
  function f2() {
    console.log(n);
  }
  return f2;
}

var result = f1();
result(); // 999
```

闭包的作用

- 可以读取外层函数内部的变量
- 让这些变量始终保持在内存中

```js
function createIncrementor(start) {
  return function () {
    return start++;
  };
}

var inc = createIncrementor(5);

inc() // 5
inc() // 6
inc() // 7
```

闭包也可以用来封装对象的私有属性和私有方法

```js
function Person(name) {
  var _age;
  function setAge(n) {
    _age = n;
  }
  function getAge() {
    return _age;
  }

  return {
    name: name,
    getAge: getAge,
    setAge: setAge
  };
}

var p1 = Person('张三');
p1.setAge(25);
p1.getAge() // 25
```

> 注：
>
> 外层函数每次运行，都会生成一个新的闭包，而这个闭包又会保留外层函数的内部变量，所以内存消耗很大，因此不能滥用闭包，否则会造成网页的性能问题

### 立即调用的函数表达式（IIFE）

```js
(function(){ /* code */ }());
// 或者
(function(){ /* code */ })();
```

通常情况下，只对匿名函数使用这种“立即执行的函数表达式”，它的目的有两个：

- 不必为函数命名，避免了污染全局变量
-  IIFE 内部形成了一个单独的作用域，可以封装一些外部无法读取的私有变量

```js
// 写法一
var tmp = newData;
processData(tmp);
storeData(tmp);

// 写法二
(function () {
  var tmp = newData;
  processData(tmp);
  storeData(tmp);
}());
```

