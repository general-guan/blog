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

`call`、`apply`、`bind` 都是用来改变 `this` 的指向

- `call` 与 `apply` 唯一的区别就是它们的传参方式不同，`call` 从第二个参数开始都是传给函数的，`apply` 只有两个参数，第二个参数是一个数组，传给函数的参数都写在这个数组里面
- `call` 与 `apply` 改变了函数的 `this` 指向后会立即执行，而 `bind` 是改变函数的 `this` 指向并返回这个这个函数，不会立即执行
- `call` 与 `apply` 的返回值是函数的执行结果，`bind` 的返回值是改变了 `this` 指向的函数的拷贝

### 原型/继承

### 深拷贝

```js
function deepClone(target, hash = new WeakMap()) {
  if (typeof target !== "object" || typeof target === null) {
    return target;
  }
  let cloneTarget = Array.isArray(target) ? [] : {};
  if (hash.has(target)) {
    return hash.get(target);
  }
  hash.set(target, cloneTarget);
  for (const key in target) {
    cloneTarget[key] = deepClone(target[key], hash);
  }
  return cloneTarget;
}
```

### 事件机制、Event Loop

## 浏览器

### cookie、sessionStorage、localStorage

### 跨域

### 浏览器的重绘与重排

## TypeScript

## Vue

### 路由实现原理

我们都知道一个 URL 是由很多部分组成，包括协议、域名、路径、query、hash 等，比如上面的例子，我们点击不同模块的时候可能看到是这样的 URL

- 首页：yourdomain.xxx.com/index.html/#/
- 商城：yourdomain.xxx.com/index.html/#/shop
- 购物车：yourdomain.xxx.com/index.html/#/shopping-cart
- 我的：yourdomain.xxx.com/index.html/#/mine

\# 号后面的，就是一个 URL 中关于 hash 的组成部分，可以看到，不同路由对应的 hash 是不一样的，但是它们都是在访问同一个静态资源 index.html，我们要做的，就是如何能够监听到 URL 中关于 hash 部分发生的变化，从而做出对应的改变

其实浏览器已经暴露给我们一个现成的方法 **hashchange**，在 hash 改变的时候，触发该事件，有了监听事件，且改变 hash 页面并不刷新，这样我们就可以在监听事件的回调函数中，执行我们展示和隐藏不同 UI 显示的功能，从而实现前端路由

下面是关于 hash 路由的核心实现，可以看出来，主要就是监听 hash 的变化，渲染不同的组件代码

#### hash

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta
      content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"
      name="viewport"
    />
    <title>实现简单的hash路由</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      html,
      body {
        height: 100%;
      }
      #content {
        height: calc(100vh - 50px);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 3em;
      }
      #nav {
        height: 50px;
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        display: flex;
      }
      #nav a {
        width: 25%;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid black;
      }
      #nav a:not(:last-of-type) {
        border-right: none;
      }
    </style>
  </head>
  <body>
    <main id="content"></main>
    <nav id="nav">
      <a href="#/">首页</a>
      <a href="#/shop">商城</a>
      <a href="#/shopping-cart">购物车</a>
      <a href="#/mine">我的</a>
    </nav>
  </body>
  <script>
    class VueRouter {
      constructor(routes = []) {
        this.routes = routes; // 路由映射
        this.currentHash = ""; // 当前的hash
        this.refresh = this.refresh.bind(this);
        window.addEventListener("load", this.refresh, false);
        window.addEventListener("hashchange", this.refresh, false);
      }

      getUrlPath(url) {
        // 获取hash
        return url.indexOf("#") >= 0 ? url.slice(url.indexOf("#") + 1) : "/";
      }

      refresh(event) {
        // URL hash发生改变的时候，拿到当前的hash
        let newHash = "",
          oldHash = null;
        if (event.newURL) {
          oldHash = this.getUrlPath(event.oldURL || "");
          newHash = this.getUrlPath(event.newURL || "");
        } else {
          newHash = this.getUrlPath(window.location.hash);
        }
        this.currentHash = newHash;
        this.matchComponent();
      }

      matchComponent() {
        let curRoute = this.routes.find(
          (route) => route.path === this.currentHash
        );
        if (!curRoute) {
          // 当前URL中的hash不存在的时候，默认取第一个，当然真实场景下，可能会有各种情况，取决于业务逻辑
          curRoute = this.routes.find((route) => route.path === "/");
        }
        const { component } = curRoute;
        document.querySelector("#content").innerHTML = component;
      }
    }

    const router = new VueRouter([
      {
        path: "/",
        name: "home",
        component: "<div>首页内容</div>",
      },
      {
        path: "/shop",
        name: "shop",
        component: "<div>商城内容</div>",
      },
      {
        path: "/shopping-cart",
        name: "shopping-cart",
        component: "<div>购物车内容</div>",
      },
      {
        path: "/mine",
        name: "mine",
        component: "<div>我的内容</div>",
      },
    ]);
  </script>
</html>
```

#### history

history 路由模式的实现，是要归功于 HTML5 提供的一个 history 全局对象，可以将它理解为其中包含了关于我们访问网页（历史会话）的一些信息，同时它还暴露了一些有用的方法，比如：

- window.history.go 可以跳转到浏览器会话历史中的指定的某一个记录页
- window.history.forward 指向浏览器会话历史中的下一页，跟浏览器的前进按钮相同
- window.history.back 返回浏览器会话历史中的上一页，跟浏览器的回退按钮功能相同
- window.history.pushState 可以将给定的数据压入到浏览器会话历史栈中
- window.history.replaceState 将当前的会话页面的 url 替换成指定的数据

而 history 路由的实现，主要就是依靠于 pushState 与 replaceState 实现的，这里我们先总结下它们的一些特点

- 都会改变当前页面显示的 url，但都不会刷新页面
- pushState 是压入浏览器的会话历史栈中，会使得 history.length 加 1，而 replaceState 是替换当前的这条会话历史，因此不会增加 history.length

既然已经能够通过 pushState 或 replaceState 实现改变 URL 而不刷新页面，那么是不是如果我们能够监听到改变 URL 这个动作，就可以实现前端渲染逻辑的处理呢？这个时候，我们还要了解一个事件处理程序 popstate，先看下它的官方定义

> 每当激活同一文档中不同的历史记录条目时，`popstate` 事件就会在对应的 `window` 对象上触发，如果当前处于激活状态的历史记录条目是由 `history.pushState()` 方法创建的或者是由 `history.replaceState()` 方法修改的，则 `popstate` 事件的 `state` 属性包含了这个历史记录条目的 `state` 对象的一个拷贝
>
> 调用 `history.pushState()` 或者 `history.replaceState()` 不会触发 `popstate` 事件，`popstate` 事件只会在浏览器某些行为下触发，比如点击后退按钮（或者在 JavaScript 中调用 `history.back()` 方法），即，在同一文档的两个历史记录条目之间导航会触发该事件

这里我用大白话总结下就是以下几点

- history.pushState 和 history.replaceState 方法是不会触发 popstate 事件的
- 但是浏览器的某些行为会导致 popstate，比如 go、back、forward
- popstate 事件对象中的 state 属性，可以理解是我们在通过 history.pushState 或 history.replaceState 方法时，传入的指定的数据

说了一大堆，结果却是 popstate 无法监听 history.pushState 和 history.replaceState 方法，这不是扯呢吗？那好吧，既然你厂商没实现此功能，那么我自己重新写下你这个 history.pushState 和 history.replaceState 方法吧，让你在这个方法中，也能够暴露出自定义的全局事件，然后我再监听自定义的事件，不就行了？

改写：

```js
let _wr = function (type) {
  let orig = history[type];
  return function () {
    let e = new Event(type);
    e.arguments = arguments;
    window.dispatchEvent(e);
    let rv = orig.apply(this, arguments);
    return rv;
  };
};

history.pushState = _wr("pushState");
history.replaceState = _wr("replaceState");
```

简易实现：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta
      content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"
      name="viewport"
    />
    <title>实现简单的history路由</title>
  </head>
  <body>
    <main id="div"></main>
    <button id="button1">首页</button>
    <button id="button2">商城</button>
    <button id="button3">购物车</button>
    <button id="button4">我的</button>
  </body>
  <script>
    const button1 = document.querySelector("#button1");
    const button2 = document.querySelector("#button2");
    const button3 = document.querySelector("#button3");
    const button4 = document.querySelector("#button4");

    let _wr = function (type) {
      let orig = history[type];
      return function () {
        let e = new Event(type);
        e.arguments = arguments;
        window.dispatchEvent(e);
        let rv = orig.apply(this, arguments);
        return rv;
      };
    };

    history.pushState = _wr("pushState");
    history.replaceState = _wr("replaceState");

    button1.addEventListener("click", () => {
      history.pushState({ state: 1 }, null, "./home");
    });

    button2.addEventListener("click", () => {
      history.pushState({ state: 2 }, null, "./shop");
    });

    button3.addEventListener("click", () => {
      history.pushState({ state: 3 }, null, "./shopping-cart");
    });

    button4.addEventListener("click", () => {
      history.pushState({ state: 4 }, null, "./mine");
    });

    window.addEventListener("pushState", (e) => {
      // 监听pushState自定义事件，拿到上面通过pushState的参数，做出对应的页面渲染，处理的思路与hash雷同
      console.log(e.arguments);
    });
  </script>
</html>
```

刷新 404：

hash 模式是不需要后端服务配合的。但是 history 模式下，如果你再跳转路由后再次刷新会得到 404 的错误，这个错误说白了就是浏览器会把整个地址当成一个可访问的静态资源路径进行访问，然后服务端并没有这个文件

所以一般情况下，我们都需要配置下 nginx，告诉服务器，当我们访问的路径资源不存在的时候，默认指向静态资源 index.html

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

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
