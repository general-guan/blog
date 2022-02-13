# Webpack

## 起步

webpack 用于编译 JavaScript 模块。一旦完成 [安装](https://webpack.docschina.org/guides/installation)，你就可以通过 webpack [CLI](https://webpack.docschina.org/api/cli) 或 [API](https://webpack.docschina.org/api/node) 与其配合交互

基本安装

```bash
mkdir webpack-demo
cd webpack-demo
npm init -y
npm install webpack webpack-cli --save-dev
```

目录结构

```diff
 webpack-demo
+ |- /dist
+   |- main.js （webpack 生成文件）
+   |- index.html
+ |- /src
+   |- index.js
+ |- package.json
+ |- webpack.config.js
```

dist/index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>起步</title>
  </head>
  <body>
    <script src="./main.js"></script>
  </body>
</html>
```

src/index.js

```js
function component() {
  const element = document.createElement("div");

  element.innerHTML = "Hello Webpack";

  return element;
}

document.body.appendChild(component());
```

webpack.config.js

```js
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};
```

NPM 脚本

```js
"scripts": {
    "build": "webpack"
},
```

## 管理资源

如果你是从开始一直在沿用指南的示例，现在会有一个小项目，显示 "Hello webpack"，现在我们尝试混合一些其他资源，比如 images，看看 webpack 如何处理

在 webpack 出现之前，前端开发人员会使用 [grunt](https://gruntjs.com/) 和 [gulp](https://gulpjs.com/) 等工具来处理资源，并将它们从 `/src` 文件夹移动到 `/dist` 或 `/build` 目录中，JavaScript 模块也遵循同样方式，但是，像 webpack 这样的工具，将**动态打包**所有依赖（创建所谓的 [依赖图(dependency graph)](https://webpack.docschina.org/concepts/dependency-graph)），这是极好的创举，因为现在每个模块都可以**明确表述它自身的依赖**，可以避免打包未使用的模块

webpack 最出色的功能之一就是，除了引入 JavaScript，还可以通过 loader 或内置的 [Asset Modules](https://webpack.docschina.org/guides/asset-modules/) 引入任何其他类型的文件，也就是说，以上列出的那些 JavaScript 的优点（例如显式依赖），同样可以用来构建 web 站点或 web 应用程序中的所有非 JavaScript 内容

安装

```bash
npm install --save-dev style-loader css-loader # 加载 CSS
npm install --save-dev csv-loader xml-loader # 加载数据
npm install toml yamljs json5 --save-dev # 自定义 JSON 模块 parser
```

webpack.config.js

```js
const path = require("path");
const toml = require("toml");
const yaml = require("yamljs");
const json5 = require("json5");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      // 加载 CSS
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      // 加载 images 图像
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      // 加载 fonts 字体
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      // 加载数据
      {
        test: /\.(csv|tsv)$/i,
        use: ["csv-loader"],
      },
      {
        test: /\.xml$/i,
        use: ["xml-loader"],
      },
      // 加载数据 --- 自定义 JSON 模块 parser
      {
        test: /\.toml$/i,
        type: "json",
        parser: {
          parse: toml.parse,
        },
      },
      {
        test: /\.yaml$/i,
        type: "json",
        parser: {
          parse: yaml.parse,
        },
      },
      {
        test: /\.json5$/i,
        type: "json",
        parser: {
          parse: json5.parse,
        },
      },
    ],
  },
};
```

## 管理输出

到目前为止，我们都是在 `index.html` 文件中手动引入所有资源，然而随着应用程序增长，并且一旦开始 [在文件名中使用 hash](https://webpack.docschina.org/guides/caching) 并输出 [多个 bundle](https://webpack.docschina.org/guides/code-splitting)，如果继续手动管理 `index.html` 文件，就会变得困难起来。然而，通过一些插件可以使这个过程更容易管控

安装

```bash
npm install --save-dev html-webpack-plugin
```

webpack.config.js

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    // 不同入口文件创建不同的 bundle.js
    index: "./src/index.js",
    print: "./src/print.js",
  },
  plugins: [
    // 自动生成 index.html 文件
    new HtmlWebpackPlugin({
      title: "管理输出",
    }),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true, // 每次构建前清理 /dist 文件夹
  },
};
```

## 开发环境

### source map

当 webpack 打包源代码时，可能会很难追踪到 error(错误) 和 warning(警告) 在源代码中的原始位置。例如，如果将三个源文件（`a.js`, `b.js` 和 `c.js`）打包到一个 bundle（`bundle.js`）中，而其中一个源文件包含一个错误，那么堆栈跟踪就会直接指向到 `bundle.js`。你可能需要准确地知道错误来自于哪个源文件，所以这种提示这通常不会提供太多帮助。

为了更容易地追踪 error 和 warning，JavaScript 提供了 [source maps](http://blog.teamtreehouse.com/introduction-source-maps) 功能，可以将编译后的代码映射回原始源代码。如果一个错误来自于 `b.js`，source map 就会明确的告诉你。

source map 有许多 [可用选项](https://webpack.docschina.org/configuration/devtool)，请务必仔细阅读它们，以便可以根据需要进行配置。

对于本指南，我们将使用 `inline-source-map` 选项，这有助于解释说明示例意图（此配置仅用于示例，不要用于生产环境）：

webpack.config.js

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 开发环境
  mode: "development",
  entry: {
    index: "./src/index.js",
    print: "./src/print.js",
  },
  // source map
  devtool: "inline-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      title: "Development",
    }),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};
```

### 选择一个开发工具

在每次编译代码时，手动运行 `npm run build` 会显得很麻烦。

webpack 提供几种可选方式，帮助你在代码发生变化后自动编译代码：

1. webpack's [Watch Mode](https://webpack.docschina.org/configuration/watch/#watch)
2. [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
3. [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware)

多数场景中，你可能需要使用 `webpack-dev-server`，但是不妨探讨一下以上的所有选项。

#### 使用 watch mode(观察模式)

package.json

```json
"scripts": {
    "watch": "webpack --watch",
}
```

唯一的缺点是，为了看到修改后的实际效果，你需要刷新浏览器。如果能够自动刷新浏览器就更好了，因此接下来我们会尝试通过 `webpack-dev-server` 实现此功能

#### 使用 webpack-dev-server

```bash
npm install --save-dev webpack-dev-server
```

webpack.config.js

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js",
    print: "./src/print.js",
  },
  devtool: "inline-source-map",
  // 修改配置文件，告知 dev server，从什么位置查找文件  
  devServer: {
    static: "./dist",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Development",
    }),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};
```

package.json

```json
"scripts": {
    "start": "webpack serve --open"",
}
```

#### 使用 webpack-dev-middleware

`webpack-dev-middleware` 是一个封装器(wrapper)，它可以把 webpack 处理过的文件发送到一个 server。`webpack-dev-server` 在内部使用了它，然而它也可以作为一个单独的 package 来使用，以便根据需求进行更多自定义设置。下面是一个 webpack-dev-middleware 配合 express server 的示例

```bash
npm install --save-dev express webpack-dev-middleware
```

webpack.config.js

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js",
    print: "./src/print.js",
  },
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Development",
    }),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    // 定义路径
    publicPath: "/",
  },
};
```

project

```diff
  webpack-demo
  |- package.json
  |- package-lock.json
  |- webpack.config.js
+ |- server.js
  |- /dist
  |- /src
    |- index.js
    |- print.js
  |- /node_modules
```

server.js

```javascript
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// 告知 express 使用 webpack-dev-middleware，
// 以及将 webpack.config.js 配置文件作为基础配置。
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);

// 将文件 serve 到 port 3000。
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});
```

package.json

```json
"scripts": {
    "server": "node server.js",
}
```

## 代码分离

### 入口起点(entry point)

webpack.config.js

```js
const path = require("path");

module.exports = {
  mode: "development",
  // 入口分开
  entry: {
    index: "./src/index.js",
    another: "./src/another-module.js",
  },
  output: {
    // 不同名 bundle
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
```

正如前面提到的，这种方式存在一些隐患：

- 如果入口 chunk 之间包含一些重复的模块，那些重复模块都会被引入到各个 bundle 中
- 这种方法不够灵活，并且不能动态地将核心应用程序逻辑中的代码拆分出来

以上两点中，第一点对我们的示例来说无疑是个问题，因为之前我们在 `./src/index.js` 中也引入过 `lodash`，这样就在两个 bundle 中造成重复引用，在下一章节会移除重复的模块

### 防止重复(prevent duplication)

#### 入口依赖

配置 [`dependOn` option](https://webpack.docschina.org/configuration/entry-context/#dependencies) 选项，这样可以在多个 chunk 之间共享模块

webpack.config.js

```js
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    // 配置 dependOn
    index: {
      import: "./src/index.js",
      dependOn: "shared",
    },
    another: {
      import: "./src/another-module.js",
      dependOn: "shared",
    },
    shared: "lodash",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
```

如果我们要在一个 HTML 页面上使用多个入口时，还需设置 `optimization.runtimeChunk: 'single'`，否则还会遇到[这里](https://bundlers.tooling.report/code-splitting/multi-entry/)所述的麻烦

**webpack.config.js**

```js
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    index: {
      import: "./src/index.js",
      dependOn: "shared",
    },
    another: {
      import: "./src/another-module.js",
      dependOn: "shared",
    },
    shared: "lodash",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    runtimeChunk: "single",
  },
};
```

由上可知，除了生成 `shared.bundle.js`，`index.bundle.js` 和 `another.bundle.js` 之外，还生成了一个 `runtime.bundle.js` 文件

#### SplitChunksPlugin

[`SplitChunksPlugin`](https://webpack.docschina.org/plugins/split-chunks-plugin) 插件可以将公共的依赖模块提取到已有的入口 chunk 中，或者提取到一个新生成的 chunk。让我们使用这个插件，将之前的示例中重复的 `lodash` 模块去除

webpack.config.js

```js
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js",
    another: "./src/another-module.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
```

### 动态导入(dynamic import)





















































