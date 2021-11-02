# 属性描述对象

## 概述

JavaScript 提供了一个内部数据结构，用来描述对象的属性，控制它的行为，比如该属性是否可写、可遍历等等，这个内部数据结构称为“属性描述对象”（attributes object），每个属性都有自己对应的属性描述对象，保存该属性的一些元信息

```js
{
  value: 123,
  writable: false,
  enumerable: true,
  configurable: false,
  get: undefined,
  set: undefined
}
```

属性描述对象提供6个元属性

（1）`value`

`value` 是该属性的属性值，默认为 `undefined`

（2）`writable`

`writable` 是一个布尔值，表示属性值（value）是否可改变（即是否可写），默认为 `true`

（3）`enumerable`

`enumerable` 是一个布尔值，表示该属性是否可遍历，默认为 `true`，如果设为 `false`，会使得某些操作（比如 `for...in` 循环、`Object.keys()`）跳过该属性

（4）`configurable`

`configurable` 是一个布尔值，表示属性的可配置性，默认为 `true`，如果设为 `false`，将阻止某些操作改写属性描述对象，比如无法删除该属性，也不得改变各种元属性（`value` 属性除外），也就是说，`configurable` 属性控制了属性描述对象的可写性

（5）`get`

`get` 是一个函数，表示该属性的取值函数（getter），默认为 `undefined`

（6）`set`

`set` 是一个函数，表示该属性的存值函数（setter），默认为 `undefined`

## Object.getOwnPropertyDescriptor()

`Object.getOwnPropertyDescriptor()` 方法可以获取属性描述对象，它的第一个参数是目标对象，第二个参数是一个字符串，对应目标对象的某个属性名

```js
var obj = { p: 'a' };

Object.getOwnPropertyDescriptor(obj, 'p')
// Object { value: "a",
//   writable: true,
//   enumerable: true,
//   configurable: true
// }

Object.getOwnPropertyDescriptor(obj, 'toString')
// undefined
```

注意，`Object.getOwnPropertyDescriptor()` 方法只能用于对象自身的属性，不能用于继承的属性

## Object.getOwnPropertyNames()

`Object.getOwnPropertyNames` 方法返回一个数组，成员是参数对象自身的全部属性的属性名，不管该属性是否可遍历

```js
var obj = Object.defineProperties({}, {
  p1: { value: 1, enumerable: true },
  p2: { value: 2, enumerable: false }
});

Object.getOwnPropertyNames(obj)
// ["p1", "p2"]
```

这跟 `Object.keys` 的行为不同，`Object.keys` 只返回对象自身的可遍历属性的全部属性名

## Object.defineProperty()，Object.defineProperties()

`Object.defineProperty()` 方法允许通过属性描述对象，定义或修改一个属性，然后返回修改后的对象，它的用法如下

```js
Object.defineProperty(object, propertyName, attributesObject)
```

`Object.defineProperty` 方法接受三个参数，依次如下

- object：属性所在的对象
- propertyName：字符串，表示属性名
- attributesObject：属性描述对象

```js
var obj = Object.defineProperty({}, 'p', {
  value: 123,
  writable: false,
  enumerable: true,
  configurable: false
});

obj.p // 123

obj.p = 246;
obj.p // 123
```

如果一次性定义或修改多个属性，可以使用 `Object.defineProperties()` 方法

```js
var obj = Object.defineProperties({}, {
  p1: { value: 123, enumerable: true },
  p2: { value: 'abc', enumerable: true },
  p3: { get: function () { return this.p1 + this.p2 },
    enumerable:true,
    configurable:true
  }
});

obj.p1 // 123
obj.p2 // "abc"
obj.p3 // "123abc"
```

注意，一旦定义了取值函数 `get`（或存值函数 `set`），就不能将 `writable` 属性设为 `true`，或者同时定义 `value` 属性，否则会报错

`Object.defineProperty()` 和 `Object.defineProperties()` 参数里面的属性描述对象，`writable`、`configurable`、`enumerable` 这三个属性的默认值都为 `false`

```js
var obj = {};
Object.defineProperty(obj, 'foo', {});
Object.getOwnPropertyDescriptor(obj, 'foo')
// {
//   value: undefined,
//   writable: false,
//   enumerable: false,
//   configurable: false
// }
```

## Object.prototype.propertyIsEnumerable()

实例对象的 `propertyIsEnumerable()` 方法返回一个布尔值，用来判断某个属性是否可遍历，注意，这个方法只能用于判断对象自身的属性，对于继承的属性一律返回 `false`

```js
var obj = {};
obj.p = 123;

obj.propertyIsEnumerable('p') // true
obj.propertyIsEnumerable('toString') // false
```

## 元属性

### value

`value` 属性是目标属性的值

```js
var obj = {};
obj.p = 123;

Object.getOwnPropertyDescriptor(obj, 'p').value
// 123

Object.defineProperty(obj, 'p', { value: 246 });
obj.p // 246
```















