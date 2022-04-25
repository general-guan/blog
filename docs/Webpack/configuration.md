# 配置

## mode

| 选项        | 描述                                                  |
| ----------- | ----------------------------------------------------- |
| development | 开发模式，打包更加快速，省了代码优化步骤              |
| production  | 生产模式，打包比较慢，会开启 tree-shaking 和 压缩代码 |
| none        | 不使用任何默认优化选项                                |

## entry

```javascript
module.exports = {
  // 字符串写法
  entry: "./path/to/my/entry/file.js",

  // 数组写法
  entry: ["./src/file_1.js", "./src/file_2.js"],

  // 对象写法
  entry: {
    pageOne: "./src/pageOne/index.js",
    pageTwo: ["./src/pageTwo/index.js", "./src/pageThree/index.js"],
  },
};
```

## output

```js
  output: {
    // 文件名称
    filename: "[name].js",
    // 输出文件目录（将来所有资源输出的公共目录）
    path: path.resolve(__dirname, "dist"),
    // 所有资源引入公共路径前缀 --> 'imgs/a.jpg'--> '/imgs/a.jpg'
    publicPath: "/",
    // 非入口chunk的名称
    chunkFilename: "[name]_chunk.js",
    // 整个库向外暴露的变量名
    library: "[name]",
    // 变量添加到那个上
    libraryTarget: "window", // borwser
    libraryTarget: "global", // node
    libraryTarget: "commonjs", // commonjs
  },
```

## module

```js
  module: {
    rules: [
      { test: /\.vue$/, use: "vue-loader" },
      {
        test: /\.js$/,
        use: "eslint-loader",
        // 排除
        exclude: /node_modules/,
        // 包含
        include: resolve(__dirname, "src"),
        // 优先执行
        enforce: "pre",
        // 延后执行
        enforce: "post",
        options: {},
      },
      {
        // 以下配置只会生效一个
        oneOf: [],
      },
    ],
  },
```

## resolve

解析模块的规则

```js
  resolve: {
    // 路径别名
    alias: {
      $css: resolve(__dirname, "src/css"),
    },
    // 省略文件后缀名
    extensions: [".js", ".json", ".jsx"],
    // 告诉webpack解析模块去哪里找
    module: [resolve(__dirname, "../../node_modules"), "node_modules"],
  },
```

## devServer

```js
  devServer: {
    // 运行代码的目录
    contentBase: resolve(__dirname, "build"),
    // 监视 contentBase 目录下的所有文件，一旦文件变化就会 reload
    watchContentBase: true,
    // 忽略文件
    watchOptions: {
      ignored: /node_modules/,
    },
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 5000,
    // 域名
    host: "localhost",
    // 自动打开浏览器
    open: true,
    // 开启HMR功能
    hot: true,
    // 不要显示启动服务器的日志信息
    clientLogLevel: "none",
    // 除了一些基本启动信息以外，其他内容都不要显示
    quiet: true,
    // 如果出错了，不要全屏显示
    overlay: false,
    // 服务器代理 --> 解决开发环境跨域问题
    proxy: {
      // 一旦devServer(5000)服务器接收到 /api/xxx 的请求，就会把请求转发到另外一个服务器(3000)
      "/api": {
        target: "http://localhost:3000",
        // 发送请求时，请求路径重写：将 /api/xxx --> /xxx （去掉/api）
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
```

## loader

css-loader

```bash
npn install css-loader -D
npm install style-loader -D
npm install postcss postcss-loader postcss-preset-env -D
npm install sass-loader -D
npm install file-loader -D
npm install url-loader -D
npm install babel-loader @babel/core @babel/preset-env -D
```

## plugin

```bash
npm install html-webpack-plugin -D
npm install clean-webpack-plugin -D
npm install mini-css-extract-plugin -D
```

## 环境

```bash
npm install cross-env -D
npm intall webpack-dev-server
```



































