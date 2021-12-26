# Webpack

## 安装

前提条件 node 最新版

全局安装

```bash
npm install --global webpack
```

本地安装（推荐）

```bash
npm install --save-dev webpack
npm install --save-dev webpack-cli
```

```js
"scripts": {
    "build": "webpack --config webpack.config.js"
}
```

最新体验版本

```bash
npm install webpack@beta
```

## 起步

基本安装

```bash
mkdir webpack-demo && cd webpack-demo
npm init -y
npm install webpack webpack-cli --save-dev
```

目录结构

```
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
  |- bundle.js （webpack 生成文件）
  |- index.html
|- /src
  |- index.js
|- /node_modules
```

webpack.config.js

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

NPM 脚本

```js
"scripts": {
    "build": "webpack"
}
```

