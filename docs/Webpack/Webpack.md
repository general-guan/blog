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

当涉及到动态代码拆分时，webpack 提供了两个类似的技术。第一种，也是推荐选择的方式是，使用符合 [ECMAScript 提案](https://github.com/tc39/proposal-dynamic-import) 的 [`import()` 语法](https://webpack.docschina.org/api/module-methods/#import-1) 来实现动态导入

```js
import _ from 'lodash';

function getComponent() {
    const element = document.createElement('div');
    
    // import('')
    return import('lodash')
        .then(({ default: _ }) => {
        const element = document.createElement('div');
        element.innerHTML = _.join(['Hello', 'webpack'], ' ');
        return element;
    })
        .catch((error) => 'An error occurred while loading the component');
}


getComponent().then((component) => {
    document.body.appendChild(component);
});
```

### 预获取/预加载模块(prefetch/preload module)

在声明 import 时，使用下面这些内置指令，可以让 webpack 输出 "resource hint(资源提示)"，来告知浏览器：

- **prefetch**(预获取)：将来某些导航下可能需要的资源
- **preload**(预加载)：当前导航下可能需要资源

**prefetch**(预获取)

```js
import(/* webpackPrefetch: true */ './path/to/LoginModal.js');
```

**preload**(预加载)

```js
import(/* webpackPreload: true */ 'ChartingLibrary');
```

与 prefetch 指令相比，preload 指令有许多不同之处：

- preload chunk 会在父 chunk 加载时，以并行方式开始加载，prefetch chunk 会在父 chunk 加载结束后开始加载
- preload chunk 具有中等优先级，并立即下载，prefetch chunk 在浏览器闲置时下载
- preload chunk 会在父 chunk 中立即请求，用于当下时刻，prefetch chunk 会用于未来的某个时刻
- 浏览器支持程度不同

### bundle 分析(bundle analysis)

一旦开始分离代码，一件很有帮助的事情是，分析输出结果来检查模块在何处结束。 [官方分析工具](https://github.com/webpack/analyse) 是一个不错的开始。还有一些其他社区支持的可选项：

- [webpack-chart](https://alexkuz.github.io/webpack-chart/): webpack stats 可交互饼图
- [webpack-visualizer](https://chrisbateman.github.io/webpack-visualizer/): 可视化并分析你的 bundle，检查哪些模块占用空间，哪些可能是重复使用的
- [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)：一个 plugin 和 CLI 工具，它将 bundle 内容展示为一个便捷的、交互式、可缩放的树状图形式
- [webpack bundle optimize helper](https://webpack.jakoblind.no/optimize)：这个工具会分析你的 bundle，并提供可操作的改进措施，以减少 bundle 的大小
- [bundle-stats](https://github.com/bundle-stats/bundle-stats)：生成一个 bundle 报告（bundle 大小、资源、模块），并比较不同构建之间的结果

## 缓存

以上，我们使用 webpack 来打包我们的模块化后的应用程序，webpack 会生成一个可部署的 `/dist` 目录，然后把打包后的内容放置在此目录中。只要 `/dist` 目录中的内容部署到 server 上，client（通常是浏览器）就能够访问此 server 的网站及其资源。而最后一步获取资源是比较耗费时间的，这就是为什么浏览器使用一种名为 [缓存](https://en.wikipedia.org/wiki/Cache_(computing)) 的技术。可以通过命中缓存，以降低网络流量，使网站加载速度更快，然而，如果我们在部署新版本时不更改资源的文件名，浏览器可能会认为它没有被更新，就会使用它的缓存版本。由于缓存的存在，当你需要获取新的代码时，就会显得很棘手

此指南的重点在于通过必要的配置，以确保 webpack 编译生成的文件能够被客户端缓存，而在文件内容变化后，能够请求到新的文件

### 输出文件的文件名(output filename)

我们可以通过替换 `output.filename` 中的 [substitutions](https://webpack.docschina.org/configuration/output/#outputfilename) 设置，来定义输出文件的名称。webpack 提供了一种使用称为 **substitution(可替换模板字符串)** 的方式，通过带括号字符串来模板化文件名。其中，`[contenthash]` substitution 将根据资源内容创建出唯一 hash。当资源内容发生变化时，`[contenthash]` 也会发生变化

webpack.config.js

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  plugins: [
    new HtmlWebpackPlugin({
      title: "Caching",
    }),
  ],
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};
```

### 提取引导模板(extracting boilerplate)

正如我们在 [代码分离](https://webpack.docschina.org/guides/code-splitting) 中所学到的，[`SplitChunksPlugin`](https://webpack.docschina.org/plugins/split-chunks-plugin/) 可以用于将模块分离到单独的 bundle 中。webpack 还提供了一个优化功能，可使用 [`optimization.runtimeChunk`](https://webpack.docschina.org/configuration/optimization/#optimizationruntimechunk) 选项将 runtime 代码拆分为一个单独的 chunk。将其设置为 `single` 来为所有 chunk 创建一个 runtime bundle

将第三方库(library)（例如 `lodash` 或 `react`）提取到单独的 `vendor` chunk 文件中，是比较推荐的做法，这是因为，它们很少像本地的源代码那样频繁修改。因此通过实现以上步骤，利用 client 的长效缓存机制，命中缓存来消除请求，并减少向 server 获取资源，同时还能保证 client 代码和 server 代码版本一致。 这可以通过使用 [SplitChunksPlugin 示例 2](https://webpack.docschina.org/plugins/split-chunks-plugin/#split-chunks-example-2) 中演示的 [`SplitChunksPlugin`](https://webpack.docschina.org/plugins/split-chunks-plugin/) 插件的 [`cacheGroups`](https://webpack.docschina.org/plugins/split-chunks-plugin/#splitchunkscachegroups) 选项来实现。我们在 `optimization.splitChunks` 添加如下 `cacheGroups` 参数并构建：

webpack.config.js

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  plugins: [
    new HtmlWebpackPlugin({
      title: "Caching",
    }),
  ],
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  optimization: {
    // runtimeChunk
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
};
```

### 模块标识符(module identifier)

不论是否添加任何新的本地依赖，对于前后两次构建，`vendor` hash 都应该保持一致

webpack.config.js

```diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: './src/index.js',
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Caching',
      }),
    ],
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    optimization: {
+     moduleIds: 'deterministic',
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
  };
```

## 创建 library

除了打包应用程序，webpack 还可以用于打包 JavaScript library。以下指南适用于希望简化打包策略的 library 作者

### Expose the Library

```diff
 const path = require('path');

 module.exports = {
   entry: './src/index.js',
   output: {
     path: path.resolve(__dirname, 'dist'),
     filename: 'webpack-numbers.js',
+    library: {
+      name: 'webpackNumbers',
+      type: 'umd',
+    },
   },
 };
```

现在 webpack 将打包一个库，其可以与 CommonJS、AMD 以及 script 标签使用

### 外部化 lodash

现在，如果执行 `webpack`，你会发现创建了一个体积相当大的文件。如果你查看这个文件，会看到 lodash 也被打包到代码中。在这种场景中，我们更倾向于把 `lodash` 当作 `peerDependency`。也就是说，consumer(使用者) 应该已经安装过 `lodash` 。因此，你就可以放弃控制此外部 library ，而是将控制权让给使用 library 的 consumer。

这可以使用 `externals` 配置来完成：

webpack.config.js

```diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'webpack-numbers.js',
      library: {
        name: "webpackNumbers",
        type: "umd"
      },
    },
+   externals: {
+     lodash: {
+       commonjs: 'lodash',
+       commonjs2: 'lodash',
+       amd: 'lodash',
+       root: '_',
+     },
+   },
  };
```

#### 外部化的限制

对于想要实现从一个依赖中调用多个文件的那些 library：

```js
import A from 'library/one';
import B from 'library/two';

// ...
```

无法通过在 externals 中指定整个 `library` 的方式，将它们从 bundle 中排除。而是需要逐个或者使用一个正则表达式，来排除它们。

```js
module.exports = {
  //...
  externals: [
    'library/one',
    'library/two',
    // 匹配以 "library/" 开始的所有依赖
    /^library\/.+$/,
  ],
};
```

### 最终步骤

遵循 [生产环境](https://webpack.docschina.org/guides/production) 指南中提到的步骤，来优化生产环境下的输出结果。那么，我们还需要将生成 bundle 的文件路径，添加到 `package.json` 中的 `main` 字段中

package.json

```json
{
  ...
  "main": "dist/webpack-numbers.js",
  ...
}
```

或者，按照这个 [指南](https://github.com/dherman/defense-of-dot-js/blob/master/proposal.md#typical-usage)，将其添加为标准模块：

```json
{
  ...
  "module": "src/index.js",
  ...
}
```

## 环境变量

想要消除 `webpack.config.js` 在 [开发环境](https://webpack.docschina.org/guides/development) 和 [生产环境](https://webpack.docschina.org/guides/production) 之间的差异，你可能需要环境变量(environment variable)

webpack 命令行 [环境配置](https://webpack.docschina.org/api/cli/#environment-options) 的 `--env` 参数，可以允许你传入任意数量的环境变量。而在 `webpack.config.js` 中可以访问到这些环境变量。例如，`--env production` 或 `--env goal=local`。

```bash
npx webpack --env goal=local --env production --progress
```

对于我们的 webpack 配置，有一个必须要修改之处。通常，`module.exports` 指向配置对象。要使用 `env` 变量，你必须将 `module.exports` 转换成一个函数

webpack.config.js

```js
const path = require('path');

module.exports = (env) => {
  // Use env.<YOUR VARIABLE> here:
  console.log('Goal: ', env.goal); // 'local'
  console.log('Production: ', env.production); // true

  return {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };
};
```

## 构建性能

### 通用环境

#### loader

通过使用 `include` 字段，仅将 loader 应用在实际需要将其转换的模块

```js
const path = require('path');

module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
      },
    ],
  },
};
```

#### 引导(bootstrap)

每个额外的 loader/plugin 都有其启动时间，尽量少地使用工具

#### 解析

以下步骤可以提高解析速度：

- 减少 `resolve.modules`, `resolve.extensions`, `resolve.mainFiles`, `resolve.descriptionFiles` 中条目数量，因为他们会增加文件系统调用的次数
- 如果你不使用 symlinks（例如 `npm link` 或者 `yarn link`），可以设置 `resolve.symlinks: false`
- 如果你使用自定义 resolve plugin 规则，并且没有指定 context 上下文，可以设置 `resolve.cacheWithContext: false`

#### dll

使用 `DllPlugin` 为更改不频繁的代码生成单独的编译结果。这可以提高应用程序的编译速度，尽管它增加了构建过程的复杂度

#### 小即是快(smaller = faster)

减少编译结果的整体大小，以提高构建性能。尽量保持 chunk 体积小

- 使用数量更少/体积更小的 library
- 在多页面应用程序中使用 `SplitChunksPlugin`
- 在多页面应用程序中使用 `SplitChunksPlugin `，并开启 `async` 模式
- 移除未引用代码
- 只编译你当前正在开发的那些代码

#### worker 池(worker pool)

`thread-loader` 可以将非常消耗资源的 loader 分流给一个 worker pool

#### 持久化缓存

在 webpack 配置中使用 [`cache`](https://webpack.docschina.org/configuration/cache) 选项，使用 `package.json` 中的 `"postinstall"` 清除缓存目录

#### 自定义 plugin/loader

对它们进行概要分析，以免在此处引入性能问题

#### Progress plugin

将 `ProgressPlugin` 从 webpack 中删除，可以缩短构建时间。请注意，`ProgressPlugin` 可能不会为快速构建提供太多价值，因此，请权衡利弊再使用

### 开发环境

使用 webpack 的 watch mode(监听模式)。而不使用其他工具来 watch 文件和调用 webpack 。内置的 watch mode 会记录时间戳并将此信息传递给 compilation 以使缓存失效

在某些配置环境中，watch mode 会回退到 poll mode(轮询模式)。监听许多文件会导致 CPU 大量负载。在这些情况下，可以使用 `watchOptions.poll` 来增加轮询的间隔时间



























































