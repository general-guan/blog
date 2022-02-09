# HTTP 面试题

## http 状态码

### 状态码分类

- 1xx - 服务器收到请求
- 2xx - 请求成功，如 200
- 3xx - 重定向，如 302
- 4xx - 客户端错误，如 404
- 5xx - 服务端错误，如 500

### 常见状态码

- 200 - 成功。
- 301 - 永久重定向（配合 location，浏览器自动处理）
- 302 - 临时重定向（配合 location，浏览器自动处理）
- 304 - 资源未被修改
- 403 - 没权限
- 404 - 资源未找到
- 500 - 服务器错误
- 504 - 网关超时

## http 缓存

### 关于缓存

什么是缓存？ 把一些不需要重新获取的内容再重新获取一次

为什么需要缓存？ 网络请求相比于 CPU 的计算和页面渲染是非常非常慢的

哪些资源可以被缓存？ 静态资源，比如 js css img

#### 强制缓存

![图片 1.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0ff1ec224244427ba9f15abecbd668fe~tplv-k3u1fbpfcp-watermark.awebp)

Cache-Control：

- 在 Response Headers 中
- 控制强制缓存的逻辑
- 例如 Cache-Control: max-age=3153600（单位是秒）

Cache-Control 有哪些值

- max-age：缓存最大过期时间
- no-cache：可以在客户端存储资源，每次都必须去服务端做新鲜度校验，来决定从服务端获取新的资源（200）还是使用客户端缓存（304）
- no-store：永远都不要在客户端存储资源，永远都去原始服务器去获取资源

#### 协商缓存（对比缓存）

- 服务端缓存策略
- 服务端判断客户端资源，是否和服务端资源一样
- 一致则返回 304，否则返回 200 和最新的资源

![图片 2.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/56e265f46c80430fbf4673878a27bfc9~tplv-k3u1fbpfcp-watermark.awebp) 资源标识：

- 在 Response Headers 中，有两种
- Last-Modified：资源的最后修改时间
- Etag：资源的唯一标识（一个字符串，类似于人类的指纹）

**Last-Modified：** ![图片 3.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4c4f44afeb73464295e9878d2c47b024~tplv-k3u1fbpfcp-watermark.awebp) 服务端拿到 if-Modified-Since 之后拿这个时间去和服务端资源最后修改时间做比较，如果一致则返回 304 ，不一致（也就是资源已经更新了）就返回 200 和新的资源及新的 Last-Modified。

**Etag：** ![图片 4.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e35285a8d23a4a4380676aeb681e815d~tplv-k3u1fbpfcp-watermark.awebp) 其实 Etag 和 Last-Modified 一样的，只不过 Etag 是服务端对资源按照一定方式（比如 contenthash)计算出来的唯一标识，就像人类指纹一样，传给客户端之后，客户端再传过来时候，服务端会将其与现在的资源计算出来的唯一标识做比较，一致则返回 304，不一致就返回 200 和新的资源及新的 Etag

**两者比较：**

- 优先使用 Etag
- Last-Modified 只能精确到秒级
- 如果资源被重复生成，而内容不变，则 Etag 更精确

#### 综述

![图片 5.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b74c746d1459403382fd0bbc1d96aeca~tplv-k3u1fbpfcp-watermark.awebp)

#### 三种刷新操作对 http 缓存的影响

- 正常操作：地址栏输入 url，跳转链接，前进后退等。
- 手动刷新：f5，点击刷新按钮，右键菜单刷新。
- 强制刷新：ctrl + f5，shift+command+r。

**正常操作：强制缓存有效，协商缓存有效。** **手动刷新：强制缓存失效，协商缓存有效。** **强制刷新：强制缓存失效，协商缓存失效。**

##  面试

**对于更多面试中可能出现的问题，我还是建议精读这篇三元的文章：**[HTTP 灵魂之问，巩固你的 HTTP 知识体系](https://juejin.cn/post/6844904100035821575)。

比如会被经常问到的： GET 和 POST 的区别。

- 从**缓存**的角度，GET 请求会被浏览器主动缓存下来，留下历史记录，而 POST 默认不会。
- 从**编码**的角度，GET 只能进行 URL 编码，只能接收 ASCII 字符，而 POST 没有限制。
- 从**参数**的角度，GET 一般放在 URL 中，因此不安全，POST 放在请求体中，更适合传输敏感信息。
- 从**幂等性**的角度，GET 是幂等的，而 POST 不是。(幂等表示执行相同的操作，结果也是相同的)
- 从 **TCP** 的角度，GET 请求会把请求报文一次性发出去，而 POST 会分为两个 TCP 数据包，首先发 header 部分，如果服务器响应 100(continue)， 然后发 body 部分。(火狐浏览器除外，它的 POST 请求只发一个 TCP 包)

HTTP/2 有哪些改进？（很大可能问原理）

- 头部压缩。
- 多路复用。
- 服务器推送。

关于 HTTPS 的一些原理，可以阅读这篇文章：[这一次，彻底理解 https 原理](https://juejin.cn/post/6844904038509576199)。接着你可以观看这个视频进行更进一步的学习：[HTTPS 底层原理，面试官直接下跪，唱征服！](https://link.juejin.cn?target=https%3A%2F%2Fwww.bilibili.com%2Fvideo%2FBV1XL411b7KZ%3Fp%3D1)

关于**跨域**问题，大部分文章都是理论性比较强，还不如读这篇文章，[聊聊跨域的原理与解决方法](https://link.juejin.cn?target=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F149734572%3Ffrom_voters_page%3Dtrue)，讲的非常清晰，我个人觉得对付面试就是先知道使用流程，把这个流程能自己说出来，然后再讲下原理即可。







































