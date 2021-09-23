# meta

## referrer

主要用于控制网页发送给服务器的 referrer 信息，可以告诉服务器端用户是从哪个页面来到当前网页的

### `<meta>` 标签法（针对整个页面）

```html
<meta name="referrer" content="属性值">
```

content 的属性值，常见有以下几种

- `no-referrer`：不发送 Referrer 信息
- `no-referrer-when-downgrade`：仅当协议降级（如从 HTTPS 页面跳转到 HTTP 页面）时不发送 Referrer 信息，是大部分浏览器默认策略
- `origin`：发送只包含 host 部分的 Referrer 信息，也就是只包含了协议和域名的 url，不包含域名后面部分
- `origin-when-cross-origin`：仅在发生跨域访问时，发送只包含 host 的 Referer 信息，但在同域下还是完整的
- `unsafe-url`：全部都发送Referrer信息，是最宽松，也是最不安全的策略

### 单个链接标签法

常用在 `<a>`、`<img>`、`<area>`、`<iframe>`、`<link>` 标签上

且只有三个值 `no-referrer`、`origin`、`unsafe-url`

```html
<a rel="no-referrer" href="http://www.baidu.com" />百度一下，你就知道</a>
<img rel="no-referrer" src="logo.png" />

<!--简写 noreferrer-->
<a rel="noreferrer" href="http://www.baidu.com" />百度一下，你就知道</a>
```

### 应用

```html
<!--解决访问图片资源403问题-->
<meta name="referrer" content="no-referrer">
```

## 参考链接

[meta标签name="referrer"属性的写法和用法-html-刘代码博客](https://liudaima.com/a/132.html)

