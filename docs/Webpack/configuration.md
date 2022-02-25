# 配置

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
    chunkFilename: "[name]_chank.js",
    // 整个库向外暴露的变量名
    libray: "[name]",
    // 变量添加到那个上
    librayTarget: "window", // borwser
    librayTarget: "global", // node
    librayTarget: "commonjs", // commonjs
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
        exclude: /node_mudules/,
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
    axtensions: [".js", ".json", ".jsx"],
    // 告诉webpack解析模块去哪里找
    module: [resolve(__dirname, "../../node_mudules"), "node_mudules"],
  },
```
