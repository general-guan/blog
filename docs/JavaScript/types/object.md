# 对象

## 属性的操作

### 属性的查看

`Object.keys`

```js
var obj = {
  key1: 1,
  key2: 2
};

Object.keys(obj); // ['key1', 'key2']
```

### 属性的删除

`delete` 命令用于删除对象的属性，删除成功后返回`true`

```js
var obj = { p: 1 };
Object.keys(obj) // ["p"]

delete obj.p // true
obj.p // undefined
```

只有一种情况，`delete` 命令会返回 `false`，那就是该属性存在，且不得删除

```js
var obj = Object.defineProperty({}, 'p', {
  value: 123,
  configurable: false
});

obj.p // 123
delete obj.p // false
```

> 注：
>
> `delete` 命令只能删除对象本身的属性，无法删除继承的属性

### 属性是否存在

`in` 运算符用于检查对象是否包含某个属性，如果包含就返回 `true`，否则返回 `false`

```js
var obj = { p: 1 };
'p' in obj // true
'toString' in obj // true
```

> 注：
>
>  继承的属性也为 `true`

### 属性的遍历

`for...in`

```js
var obj = {a: 1, b: 2, c: 3};

for (var i in obj) {
  console.log('键名：', i);
  console.log('键值：', obj[i]);
}
// 键名： a
// 键值： 1
// 键名： b
// 键值： 2
// 键名： c
// 键值： 3
```

> 注：
>
> 遍历的是对象所有可遍历（enumerable）的属性，会跳过不可遍历的属性
>
> 不仅遍历对象自身的属性，还遍历继承的属性

如果只想遍历对象自身的属性，可以结合 `hasOwnProperty` 方法

```js
var person = { name: '老张' };

for (var key in person) {
  if (person.hasOwnProperty(key)) {
    console.log(key);
  }
}
// name
```

