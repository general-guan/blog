# Gulp

## 快速入门

检查 node、npm 和 npx 是否正确安装

```bash
node --version
npm --version
npx --version
```

安装 gulp 命令行工具

```bash
npm install --global gulp-cli
gulp --version
```

在项目中使用

```bash
npm init
npm install -D gulp
```

根目录创建 gulpfile.js

```js
function defaultTask(cb) {
  // place code for your default task here
  cb();
}

exports.default = defaultTask
```

测试

```bash
gulp
# 运行多个任务（task）
gulp <task> <othertask>
```

## 创建任务

### 导出任务

任务（tasks）可以是 **public（公开）** 或 **private（私有）** 类型的

- 公开任务（Public tasks） 从 gulpfile 中被导出（export），可以通过 `gulp` 命令直接调用
- 私有任务（Private tasks） 被设计为在内部使用，通常作为 `series()` 或 `parallel()` 组合的组成部分

```js
const { series } = require('gulp');

// `clean` 函数并未被导出（export），因此被认为是私有任务（private task）。
// 它仍然可以被用在 `series()` 组合中。
function clean(cb) {
  // body omitted
  cb();
}

// `build` 函数被导出（export）了，因此它是一个公开任务（public task），并且可以被 `gulp` 命令直接调用。
// 它也仍然可以被用在 `series()` 组合中。
function build(cb) {
  // body omitted
  cb();
}

exports.build = build;
exports.default = series(clean, build);
```

测试

```bash
gulp --tasks
```

### 组合任务

Gulp 提供了两个强大的组合方法： `series()` 和 `parallel()`，允许将多个独立的任务组合为一个更大的操作

如果需要让任务（task）按顺序执行，请使用 `series()` 方法

```js
const { series } = require('gulp');

function transpile(cb) {
  // body omitted
  cb();
}

function bundle(cb) {
  // body omitted
  cb();
}

exports.build = series(transpile, bundle);
```

对于希望以最大并发来运行的任务（tasks），可以使用 `parallel()` 方法将它们组合起来

```js
const { parallel } = require('gulp');

function javascript(cb) {
  // body omitted
  cb();
}

function css(cb) {
  // body omitted
  cb();
}

exports.build = parallel(javascript, css);
```

`series()` 和 `parallel()` 可以被嵌套到任意深度

```js
const { series, parallel } = require('gulp');

function clean(cb) {
  // body omitted
  cb();
}

function cssTranspile(cb) {
  // body omitted
  cb();
}

function cssMinify(cb) {
  // body omitted
  cb();
}

function jsTranspile(cb) {
  // body omitted
  cb();
}

function jsBundle(cb) {
  // body omitted
  cb();
}

function jsMinify(cb) {
  // body omitted
  cb();
}

function publish(cb) {
  // body omitted
  cb();
}

exports.build = series(
  clean,
  parallel(
    cssTranspile,
    series(jsTranspile, jsBundle)
  ),
  parallel(cssMinify, jsMinify),
  publish
);
```

## 异步执行
