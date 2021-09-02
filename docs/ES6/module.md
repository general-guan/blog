# Module 的语法

## 概述

历史上，JavaScript 一直没有模块（module）体系，无法将一个大程序拆分成互相依赖的小文件，再用简单的方法拼装起来，这对开发大型的、复杂的项目形成了巨大障碍

在 ES6 之前，社区制定了一些模块加载方案，最主要的有 CommonJS 和 AMD 两种，前者用于服务器，后者用于浏览器

ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案

ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量，CommonJS 和 AMD 模块，都只能在运行时确定这些东西，比如，CommonJS 模块就是对象，输入时必须查找对象属性

```js
// CommonJS模块
let { stat, exists, readfile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;
```

上面代码的实质是整体加载 `fs` 模块（即加载 `fs` 的所有方法），生成一个对象（`_fs`），然后再从这个对象上面读取 3 个方法

ES6 模块不是对象，而是通过 `export` 命令显式指定输出的代码，再通过 `import` 命令输入

```js
// ES6模块
import { stat, exists, readFile } from 'fs';
```

上面代码的实质是从 `fs` 模块加载 3 个方法，其他方法不加载，效率比 CommonJS 模块的加载方式高

## 严格模式

ES6 的模块自动采用严格模式，不管你有没有在模块头部加上 `"use strict";`

严格模式主要有以下限制

- 变量必须声明后再使用
- 函数的参数不能有同名属性，否则报错
- 不能使用 `with` 语句
- 不能对只读属性赋值，否则报错
- 不能使用前缀 0 表示八进制数，否则报错
- 不能删除不可删除的属性，否则报错
- 不能删除变量 `delete prop`，会报错，只能删除属性 `delete global[prop]`
- `eval` 不会在它的外层作用域引入变量
- `eval` 和 `arguments` 不能被重新赋值
- `arguments` 不会自动反映函数参数的变化
- 不能使用 `arguments.callee`
- 不能使用 `arguments.caller`
- 禁止 `this` 指向全局对象
- 不能使用 `fn.caller` 和 `fn.arguments` 获取函数调用的堆栈
- 增加了保留字（比如 `protected`、`static` 和 `interface`）

## export 命令

`export` 命令输出变量

```js
// 方式一
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;

// 等价于 

// 方式二
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export { firstName, lastName, year };
```

> 注：推荐使用第二种，这样就可以在脚本尾部，一眼看清输出了哪些变量

`export` 命令输出函数或类

```js
export function multiply(x, y) {
  return x * y;
};
```

`export` 使用 `as` 关键字重命名

```js
function v1() { ... }
function v2() { ... }

export {
  v1 as streamV1,
  v2 as streamV2
};
```

需要特别注意的是，`export` 命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系

```js
// 报错
export 1;

// 报错
var m = 1;
export m;

// 报错
function f() {}
export f;
```

上面两种写法都会报错，因为没有提供对外的接口，第一种写法直接输出 1，第二种写法通过变量 `m`，还是直接输出 1，`1` 只是一个值，不是接口，正确的写法如下

```js
// 写法一
export var m = 1;

// 写法二
var m = 1;
export {m};

// 写法三
var n = 1;
export {n as m};

// 正确
export function f() {};
```

另外，`export` 语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值

```js
export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);
```

上面代码输出变量 `foo`，值为 `bar`，500 毫秒之后变成 `baz`，这一点与 CommonJS 规范完全不同，CommonJS 模块输出的是值的缓存，不存在动态更新

> 注：`export` 命令可以出现在模块的任何顶层位置，但不能处于块级作用域里内

## import 命令

使用 `export` 命令定义了模块的对外接口以后，其他 JS 文件就可以通过 `import` 命令加载这个模块

```js
import { firstName, lastName, year } from './profile.js';

function setName(element) {
  element.textContent = firstName + ' ' + lastName;
}
```

> 注：建议凡是输入的变量，都当作完全只读，不要轻易改变它的属性

重命名输入变量

```js
import { lastName as surname } from './profile.js';
```

`import` 命令具有提升效果，但是通常写在最前边

```js
foo();

import { foo } from 'my_module';
```

由于 `import` 是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构

```js
// 报错
import { 'f' + 'oo' } from 'my_module';

// 报错
let module = 'my_module';
import { foo } from module;

// 报错
if (x === 1) {
  import { foo } from 'module1';
} else {
  import { foo } from 'module2';
}
```

## 模块的整体加载

使用整体加载，即用星号（`*`）指定一个对象，所有输出值都加载在这个对象上面

circle.js

```js
export function area(radius) {
  return Math.PI * radius * radius;
}

export function circumference(radius) {
  return 2 * Math.PI * radius;
}
```

index.js

```js
import * as circle from './circle';

console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));
```

## export default 命令

使用 `export default`，`import` 命令可以为该匿名函数指定任意名字

export-default.js

```js
export default function () {
  console.log('foo');
}
```

import-default.js

```js
import customName from './export-default';
customName(); // 'foo'
```

> 注：一个模块只能有一个默认输出，因此 `export default` 命令只能使用一次

本质上，`export default` 就是输出一个叫做 `default` 的变量或方法，然后系统允许你为它取任意名字，所以，下面的写法是有效的

```js
// modules.js
function add(x, y) {
  return x * y;
}
export {add as default};
// 等同于
// export default add;

// app.js
import { default as foo } from 'modules';
// 等同于
// import foo from 'modules';
```

正是因为 `export default` 命令其实只是输出一个叫做 `default` 的变量，所以它后面不能跟变量声明语句

```js
// 正确
export var a = 1;

// 正确
var a = 1;
export default a;

// 错误
export default var a = 1;

// 正确
export default 42;

// 报错
export 42;
```

如果想在一条 `import` 语句中，同时输入默认方法和其他接口，可以写成下面这样

```js
import _, { each, forEach } from 'lodash';
```

## export 与 import 的复合写法

如果在一个模块之中，先输入后输出同一个模块，`import` 语句可以与 `export` 语句写在一起

```js
export { foo, bar } from 'my_module';

// 可以简单理解为
import { foo, bar } from 'my_module';
export { foo, bar };
```

> 注：`foo` 和 `bar` 实际上并没有被导入当前模块，只是相当于对外转发了这两个接口，导致当前模块不能直接使用 `foo` 和 `bar`

模块的接口改名和整体输出

```js
// 接口改名
export { foo as myFoo } from 'my_module';

// 整体输出
export * from 'my_module';
```

## 跨模块常量

`const` 声明的常量只在当前代码块有效，如果想设置跨模块的常量（即跨多个文件），或者说一个值要被多个模块共享，可以采用下面的写法

```js
// constants.js 模块
export const A = 1;
export const B = 3;
export const C = 4;

// test1.js 模块
import * as constants from './constants';
console.log(constants.A); // 1
console.log(constants.B); // 3

// test2.js 模块
import {A, B} from './constants';
console.log(A); // 1
console.log(B); // 3
```

如果要使用的常量非常多，可以建一个专门的 `constants` 目录，将各种常量写在不同的文件里面，保存在该目录下

```js
// constants/db.js
export const db = {
  url: 'http://my.couchdbserver.local:5984',
  admin_username: 'admin',
  admin_password: 'admin password'
};

// constants/user.js
export const users = ['root', 'admin', 'staff', 'ceo', 'chief', 'moderator'];
```

然后，将这些文件输出的常量，合并在 `index.js` 里面

```js
// constants/index.js
export {db} from './db';
export {users} from './users';
```

使用的时候，直接加载 `index.js` 就可以了

```js
// script.js
import {db, users} from './constants/index';
```

## import()

### 简介

ES2020 提案 引入 `import()` 函数，支持动态加载模块

```js
import(specifier)
```

`import()` 返回一个 Promise 对象，下面是一个例子

```js
const main = document.querySelector('main');

import(`./section-modules/${someVariable}.js`)
  .then(module => {
    module.loadPageInto(main);
  })
  .catch(err => {
    main.textContent = err.message;
  });
```

`import()` 类似于 Node 的 `require` 方法，区别主要是前者是异步加载，后者是同步加载

### 适用场合

按需加载

```js
button.addEventListener('click', event => {
  import('./dialogBox.js')
  .then(dialogBox => {
    dialogBox.open();
  })
  .catch(error => {
    /* Error handling */
  })
});
```

条件加载

```js
if (condition) {
  import('moduleA').then(...);
} else {
  import('moduleB').then(...);
}
```

动态的模块路径

```js
import(f())
.then(...);
```

### 注意点

`import()` 加载模块成功以后，这个模块会作为一个对象，当作 `then` 方法的参数，因此，可以使用对象解构赋值的语法，获取输出接口

```js
import('./myModule.js')
.then(({export1, export2}) => {
  // ...·
});
```

如果模块有 `default` 输出接口，可以用参数直接获得

```js
import('./myModule.js')
.then(myModule => {
  console.log(myModule.default);
});
```

如果想同时加载多个模块，可以采用下面的写法

```js
Promise.all([
  import('./module1.js'),
  import('./module2.js'),
  import('./module3.js'),
])
.then(([module1, module2, module3]) => {
   ···
});
```

`import()` 也可以用在 async 函数之中

```js
async function main() {
  const myModule = await import('./myModule.js');
  const {export1, export2} = await import('./myModule.js');
  const [module1, module2, module3] =
    await Promise.all([
      import('./module1.js'),
      import('./module2.js'),
      import('./module3.js'),
    ]);
}
main();
```

