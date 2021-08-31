# 算数运算符

## 概述

JavaScript 共有10个算术运算符

- **加法运算符**：`x + y`
- **减法运算符**： `x - y`
- **乘法运算符**： `x * y`
- **除法运算符**：`x / y`
- **指数运算符**：`x ** y`
- **余数运算符**：`x % y`
- **自增运算符**：`++x` 或者 `x++`
- **自减运算符**：`--x` 或者 `x--`
- **数值运算符**： `+x`
- **负数值运算符**：`-x`

## 加法运算符

### 基本规则

加法运算符一般用来求两个数值的和

```js
1 + 1 // 2
```

非数值类型求和，会自动转为数值类型

```js
true + true // 2
1 + true // 2
```

如果有一个运算子是字符串，那么加法运算符会变成连接运算符

```js
1 + 'a' // "1a"
false + 'a' // "falsea"
```

> 注：
>
> 除了加法运算符，其他算术运算符的所有运算子一律转为数值，再进行相应的数学运算

### 对象的相加

如果运算子是对象，必须先转成原始类型的值，然后再相加

```js
var obj = { p: 1 };
obj + 2 // "[object Object]2"
```

转换规则：先调用对象的 `valueOf` 方法，一般返回对象本身，再自动调用对象的 `toString` 方法，将其转为字符串

```js
var obj = { p: 1 };
obj.valueOf().toString() // "[object Object]"
```

所以可以通过自定义对象的 `valueOf` 或者 `toString` 方法，得到想要的结果

```js
// 修改对象的 valueOf 方法
var obj = {
  valueOf: function () {
    return 1;
  }
};

obj + 2 // 3

// 修改对象的 toString 方法
var obj = {
  toString: function () {
    return 'hello';
  }
};

obj + 2 // "hello2"
```

## 余数运算符