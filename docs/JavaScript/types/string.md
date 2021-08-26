# 字符串

## 字符集

JavaScript 使用 Unicode 字符集

每个字符在 JavaScript 内部都是以16位（即2个字节）的 UTF-16 格式储存

## Base64 转码

有时，文本里面包含一些不可打印的符号，比如 ASCII 码 0 到 31 的符号都无法打印出来，这时可以使用 Base64 编码，将它们转成可以打印的字符，另一个场景是，有时需要以文本格式传递二进制数据，那么也可以使用 Base64 编码

所谓 Base64 就是一种编码方法，可以将任意值转成 0～9、A～Z、a-z、`+` 和 `/`这64个字符组成的可打印字符，使用它的主要目的，不是为了加密，而是为了不出现特殊字符，简化程序的处理

JavaScript 提供两个 Base64 的方法

- `btoa()`：任意值转为 Base64 编码
- `atob()`：Base64 编码转为原来的值

```js
var string = 'Hello World!';
btoa(string) // "SGVsbG8gV29ybGQh"
atob('SGVsbG8gV29ybGQh') // "Hello World!"
```

> 注：
>
> 这两个方法不适合非 ASCII 码的字符，会报错
>
> ```js
> btoa('你好') // 报错
> ```

要将非 ASCII 码字符转为 Base64 编码，必须中间插入一个转码环节，再使用这两个方法

```js
function b64Encode(str) {
  return btoa(encodeURIComponent(str));
}

function b64Decode(str) {
  return decodeURIComponent(atob(str));
}

b64Encode('你好') // "JUU0JUJEJUEwJUU1JUE1JUJE"
b64Decode('JUU0JUJEJUEwJUU1JUE1JUJE') // "你好"
```

