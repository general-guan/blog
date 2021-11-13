# String 对象

## 概述

`String` 对象是 JavaScript 原生提供的三个包装对象之一，用来生成字符串对象

```js
var s1 = 'abc';
var s2 = new String('abc');

typeof s1 // "string"
typeof s2 // "object"

s2.valueOf() // "abc"
```

字符串对象是一个类似数组的对象（很像数组，但不是数组）

```js
new String('abc')
// String {0: "a", 1: "b", 2: "c", length: 3}

(new String('abc'))[1] // "b"
```

除了用作构造函数，`String` 对象还可以当作工具方法使用，将任意类型的值转为字符串

```js
String(true) // "true"
String(5) // "5"
```

## 静态方法

### String.fromCharCode()

该方法的参数是一个或多个数值，代表 Unicode 码点，返回值是这些码点组成的字符串

```js
String.fromCharCode() // ""
String.fromCharCode(97) // "a"
String.fromCharCode(104, 101, 108, 108, 111)
// "hello"
```

注意，该方法不支持 Unicode 码点大于 `0xFFFF` 的字符，即传入的参数不能大于 `0xFFFF`（即十进制的 65535）

```js
String.fromCharCode(0x20BB7)
// "ஷ"
String.fromCharCode(0x20BB7) === String.fromCharCode(0x0BB7)
// true
```

上面代码中，`String.fromCharCode` 参数 `0x20BB7` 大于 `0xFFFF`，导致返回结果出错，`0x20BB7` 对应的字符是汉字 `𠮷`，但是返回结果却是另一个字符（码点 `0x0BB7`），这是因为 `String.fromCharCode` 发现参数值大于 `0xFFFF`，就会忽略多出的位（即忽略 `0x20BB7` 里面的 `2`）

这种现象的根本原因在于，码点大于 `0xFFFF` 的字符占用四个字节，而 JavaScript 默认支持两个字节的字符，这种情况下，必须把 `0x20BB7` 拆成两个字符表示

```js
String.fromCharCode(0xD842, 0xDFB7)
// "𠮷"
```

## 实例属性

### String.prototype.length

字符串实例的 `length` 属性返回字符串的长度

```js
'abc'.length // 3
```

## 实例方法

### String.prototype.charAt()

`charAt` 方法返回指定位置的字符，参数是从 `0` 开始编号的位置

```js
var s = new String('abc');

s.charAt(1) // "b"
s.charAt(s.length - 1) // "c"
```

这个方法完全可以用数组下标替代

```js
'abc'.charAt(1) // "b"
'abc'[1] // "b"
```

如果参数为负数，或大于等于字符串的长度，`charAt` 返回空字符串

```js
'abc'.charAt(-1) // ""
'abc'.charAt(3) // ""
```

### String.prototype.charCodeAt()

`charCodeAt()` 方法返回字符串指定位置的 Unicode 码点（十进制表示），相当于 `String.fromCharCode()` 的逆操作

```js
'abc'.charCodeAt(1) // 98
```

如果没有任何参数，`charCodeAt` 返回首字符的 Unicode 码点

```js
'abc'.charCodeAt() // 97
```

如果参数为负数，或大于等于字符串的长度，`charCodeAt` 返回 `NaN`

```js
'abc'.charCodeAt(-1) // NaN
'abc'.charCodeAt(4) // NaN
```

注意，`charCodeAt` 方法返回的 Unicode 码点不会大于65536（0xFFFF），也就是说，只返回两个字节的字符的码点，如果遇到码点大于 65536 的字符（四个字节的字符），必须连续使用两次 `charCodeAt`，不仅读入 `charCodeAt(i)`，还要读入 `charCodeAt(i+1)`，将两个值放在一起，才能得到准确的字符

### String.prototype.concat()

`concat` 方法用于连接两个字符串，返回一个新字符串，不改变原字符串

```js
var s1 = 'abc';
var s2 = 'def';

s1.concat(s2) // "abcdef"
s1 // "abc"
```

该方法可以接受多个参数

```js
'a'.concat('b', 'c') // "abc"
```

如果参数不是字符串，`concat` 方法会将其先转为字符串，然后再连接

```js
var one = 1;
var two = 2;
var three = '3';

''.concat(one, two, three) // "123"
one + two + three // "33"
```

### String.prototype.slice()

`slice()` 方法用于从原字符串取出子字符串并返回，不改变原字符串，它的第一个参数是子字符串的开始位置，第二个参数是子字符串的结束位置（不含该位置）

```js
'JavaScript'.slice(0, 4) // "Java"
```

如果省略第二个参数，则表示子字符串一直到原字符串结束

```js
'JavaScript'.slice(4) // "Script"
```

如果参数是负值，表示从结尾开始倒数计算的位置，即该负值加上字符串长度

```js
'JavaScript'.slice(-6) // "Script"
'JavaScript'.slice(0, -6) // "Java"
'JavaScript'.slice(-2, -1) // "p"
```

如果第一个参数大于第二个参数（正数情况下），`slice()` 方法返回一个空字符串

```js
'JavaScript'.slice(2, 1) // ""
```

### String.prototype.substring()

`substring` 方法用于从原字符串取出子字符串并返回，不改变原字符串，跟 `slice` 方法很相像，它的第一个参数表示子字符串的开始位置，第二个位置表示结束位置（返回结果不含该位置）

```js
'JavaScript'.substring(0, 4) // "Java"
```

与 `slice` 方法的区别

如果第一个参数大于第二个参数，`substring` 方法会自动更换两个参数的位置

```js
'JavaScript'.substring(10, 4) // "Script"
// 等同于
'JavaScript'.substring(4, 10) // "Script"
```

如果参数是负数，`substring` 方法会自动将负数转为 0

```js
'JavaScript'.substring(-3) // "JavaScript"
'JavaScript'.substring(4, -3) // "Java"
```

由于这些规则违反直觉，因此不建议使用 `substring` 方法，应该优先使用 `slice`

### String.prototype.substr()

`substr` 方法用于从原字符串取出子字符串并返回，不改变原字符串，跟 `slice` 和 `substring` 方法的作用相同

`substr` 方法的第一个参数是子字符串的开始位置（从 0 开始计算），第二个参数是子字符串的长度

```js
'JavaScript'.substr(4, 6) // "Script"
```

与其他的区别：

如果第一个参数是负数，表示倒数计算的字符位置，如果第二个参数是负数，将被自动转为 0，因此会返回空字符串

```js
'JavaScript'.substr(-6) // "Script"
'JavaScript'.substr(4, -1) // ""
```





































































