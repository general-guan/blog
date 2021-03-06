# Date 对象

`Date` 对象是 JavaScript 原生的时间库，它以国际标准时间（UTC）1970年1月1日00:00:00作为时间的零点，可以表示的时间范围是前后各1亿天（单位为毫秒）

## 普通函数的用法

`Date` 对象可以作为普通函数直接调用，返回一个代表当前时间的字符串

```js
Date()
// "Tue Dec 01 2015 09:34:43 GMT+0800 (CST)"
```

注意，即使带有参数，`Date` 作为普通函数使用时，返回的还是当前时间

```js
Date(2000, 1, 1)
// "Tue Dec 01 2015 09:34:43 GMT+0800 (CST)"
```

## 构造函数的用法

`Date` 还可以当作构造函数使用，对它使用 `new` 命令，会返回一个 `Date` 对象的实例，如果不加参数，实例代表的就是当前时间

```js
var today = new Date();
```

`Date` 实例有一个独特的地方，其他对象求值的时候，都是默认调用 `.valueOf()` 方法，但是 `Date` 实例求值的时候，默认调用的是 `toString()` 方法，这导致对 `Date` 实例求值，返回的是一个字符串，代表该实例对应的时间

```js
var today = new Date();

today
// "Tue Dec 01 2015 09:34:43 GMT+0800 (CST)"

// 等同于
today.toString()
// "Tue Dec 01 2015 09:34:43 GMT+0800 (CST)"
```

作为构造函数时，`Date` 对象可以接受多种格式的参数，返回一个该参数对应的时间实例

```js
// 参数为时间零点开始计算的毫秒数
new Date(1378218728000)
// Tue Sep 03 2013 22:32:08 GMT+0800 (CST)

// 参数为日期字符串
new Date('January 6, 2013');
// Sun Jan 06 2013 00:00:00 GMT+0800 (CST)

// 参数为多个整数，
// 代表年、月、日、小时、分钟、秒、毫秒
new Date(2013, 0, 1, 0, 0, 0, 0)
// Tue Jan 01 2013 00:00:00 GMT+0800 (CST)
```

关于 `Date` 构造函数的参数，有几点说明

第一点，参数可以是负整数，代表1970年元旦之前的时间

```js
new Date(-1378218728000)
// Fri Apr 30 1926 17:27:52 GMT+0800 (CST)
```

第二点，只要是能被 `Date.parse()` 方法解析的字符串，都可以当作参数

```js
new Date('2013-2-15')
new Date('2013/2/15')
new Date('02/15/2013')
new Date('2013-FEB-15')
new Date('FEB, 15, 2013')
new Date('FEB 15, 2013')
new Date('February, 15, 2013')
new Date('February 15, 2013')
new Date('15 Feb 2013')
new Date('15, February, 2013')
// Fri Feb 15 2013 00:00:00 GMT+0800 (CST)
```

第三，参数为年、月、日等多个整数时，年和月是不能省略的，其他参数都可以省略的，也就是说，这时至少需要两个参数，因为如果只使用“年”这一个参数，`Date` 会将其解释为毫秒数

```js
new Date(2013)
// Thu Jan 01 1970 08:00:02 GMT+0800 (CST)
```

最后，各个参数的取值范围如下

- 年：使用四位数年份，比如 `2000`，如果写成两位数或个位数，则加上 `1900`，即 `10` 代表1910年，如果是负数，表示公元前
- 月：`0` 表示一月，依次类推，`11` 表示12月
- 日：`1` 到 `31`
- 小时：`0` 到 `23`
- 分钟：`0` 到 `59`
- 秒：`0` 到 `59`
- 毫秒：`0` 到 `999`



































