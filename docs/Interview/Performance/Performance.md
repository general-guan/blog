# Performance 面试题

代码层面：

- 防抖和节流（resize，scroll，input）。
- 减少回流（重排）和重绘。
- 事件委托。
- css 放 ，js 脚本放  最底部。
- 减少 DOM 操作。
- 按需加载，比如 React 中使用 `React.lazy` 和 `React.Suspense` ，通常需要与 webpack 中的 `splitChunks` 配合。

构建方面：

- **压缩代码文件**，在 webpack 中使用 `terser-webpack-plugin` 压缩 Javascript 代码；使用 `css-minimizer-webpack-plugin` 压缩 CSS 代码；使用 `html-webpack-plugin` 压缩 html 代码。
- **开启 gzip 压缩**，webpack 中使用 `compression-webpack-plugin` ，node 作为服务器也要开启，使用 `compression`。
- **常用的第三方库使用 CDN 服务**，在 webpack 中我们要配置 externals，将比如 React， Vue 这种包不打倒最终生成的文件中。而是采用 CDN 服务。

其它：

- 使用 http2。因为解析速度快，头部压缩，多路复用，服务器推送静态资源。
- 使用服务端渲染。
- 图片压缩。
- 使用 http 缓存，比如服务端的响应中添加 `Cache-Control / Expires` 。