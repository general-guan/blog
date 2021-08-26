# 数值

## 概述

### 数值精度

绝对值小于 2的53次方 的整数

```js
Math.pow(-2, 53) // -9007199254740992
Math.pow(2, 53) // 9007199254740992
```

### 数值范围

```js
// 最大值与最小值
Number.MAX_VALUE // 1.7976931348623157e+308
Number.MIN_VALUE // 5e-324

// 正向溢出与负向溢出
Math.pow(2, 1024) // Infinity
Math.pow(2, -1075) // 0
```

## 数值的表示法

```js
// 字面量形式
123 // 十进制
0xFF // 十六进制

// 科学计数法
123e3 // 123000
123e-3 // 0.123
```

> 注：以下两种情况，JavaScript 会自动将数值转为科学计数法表示
>
> （1）小数点前的数字多于21位
>
> （2）小数点后的零多于5个

## 数值的进制

- 十进制：没有前缀 `0` 的数值
- 二进制：前缀 `0b` 或 `0B` 的数值
- 八进制：前缀 `0o` 或 `0O` 的数值
- 十六进制：前缀 `0x` 或 `0X` 的数值

## 特殊数值

### 正零和负零

正零和负零在任意场合都是等价的，除了被当作分母的时候

```js
(1 / +0) === (1 / -0) // false
```

因为除以正零得到 `+Infinity`，除以负零得到 `-Infinity`

### NaN

`NaN` 是 JavaScript 的特殊值，表示“非数字”，主要出现在将字符串解析成数字出错的场合，或者一些数学运算

```js
5 - 'x' // NaN
Math.acos(2) // NaN
0 / 0 // NaN
```

`NaN` 的数据类型是 `Number`

```js
typeof NaN // 'number'
```

`NaN` 不能与任何值，包括它本身，`NaN` 与任何数做运算得到的都是 `NaN`

```js
// 比较
NaN === NaN // false
[NaN].indexOf(NaN) // -1

// 运算
NaN + 32 // NaN
NaN - 32 // NaN
```

### Infinity

`Infinity` 的运算规则

常规

```js
5 * Infinity // Infinity
5 - Infinity // -Infinity
Infinity / 5 // Infinity
Infinity + Infinity // Infinity
Infinity * Infinity // Infinity
```

非常规

```js
5 / Infinity // 0
0 * Infinity // NaN
0 / Infinity // 0
Infinity / 0 // Infinity
Infinity - Infinity // NaN
Infinity / Infinity // NaN
```

## 与数值相关的全局方法

### parseInt()

`parseInt` 方法用于将字符串转为整数

基本用法

```js
parseInt('123') // 123
parseInt('   81') // 81 如果字符串头部有空格，空格会被自动去除
parseInt('8a') // 8
parseInt('abc') // NaN
parseInt(1000000000000000000000.5) // 1 科学计数法会先转为 parseInt('1e+21')
```

进制转换

`parseInt` 方法还可以接受第二个参数（2到36之间），表示被解析的值的进制

```js
parseInt('1000', 2) // 8
parseInt('1000', 6) // 216
parseInt('1000', 8) // 512

// 如果不在2到36之间，则返回 NaN
parseInt('10', 37) // NaN
parseInt('10', 1) // NaN
```

如果第二个参数是 `0`、`undefined` 和 `null`，则直接忽略

```js
parseInt('10', 0) // 10
parseInt('10', null) // 10
parseInt('10', undefined) // 10
```

### parseFloat()

`parseFloat` 方法用于将一个字符串转为浮点数

```js
parseFloat('3.14') // 3.14
parseFloat('314e-2') // 3.14 如果字符串符合科学计数法，则会进行相应的转换
parseFloat('3.14more non-digit characters') // 3.14
```

`parseFloat` 与 `Number` 函数的区别

```js
parseFloat(true)  // NaN
Number(true) // 1 

parseFloat(null) // NaN
Number(null) // 0

parseFloat('') // NaN
Number('') // 0

parseFloat('123.45#') // 123.45
Number('123.45#') // NaN
```

### isNaN()

`isNaN` 方法可以用来判断一个值是否为 `NaN`

```js
isNaN(NaN) // true
isNaN(123) // false
```

> 注：
>
> `isNaN` 只对数值有效，如果传入其他值，会被先转成数值（`Number` 函数）

### isFinite()

`isFinite` 方法返回一个布尔值，表示某个值是否为正常的数值

只有以下四个值会返回 `false`，其他的数值都会返回 `true`

```js
isFinite(Infinity) // false
isFinite(-Infinity) // false
isFinite(NaN) // false
isFinite(undefined) // false
```

