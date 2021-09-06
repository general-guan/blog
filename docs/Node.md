# Node

## 从命令行运行 Node.js 脚本

```bash
node app.js
```

## 如何从 Node.js 程序退出

控制台关闭

```bash
ctrl + c
```

以编程的方式退出

```js
process.exit()
```

发送信号 `process.on`

```js
const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('你好')
})

const server = app.listen(3000, () => console.log('服务器已就绪'))

// 告诉进程要正常终止的信号
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('进程已终止')
  })
})

// 告诉进程要立即终止的信号
process.on('SIGKILL', () => {
  server.close(() => {
    console.log('进程已终止')
  })
})

// 使用 PID 方式
process.kill(process.pid, 'SIGTERM')
```

## 如何从 Node.js 读取环境变量

```js
process.env.NODE_ENV // "development"
```

## Node.js 从命令行接收参数

命令调用 Node.js 应用程序时，可以传入任意数量的参数，参数可以是独立的，也可以具有键和值

```bash
node app.js joe
```

或

```bash
node app.js name=joe
```

获取参数值的方法是使用 Node.js 中内置的 `process` 对象

它公开了 `argv` 属性，该属性是一个包含所有命令行调用参数的数组

第一个参数是 `node` 命令的完整路径

第二个参数是正被执行的文件的完整路径

所有其他的参数从第三个位置开始

可以使用循环迭代所有的参数（包括 node 路径和文件路径）：

```js
process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`)
})
```

也可以通过创建一个排除了前两个参数的新数组来仅获取其他的参数

```js
const args = process.argv.slice(2)
```

如果参数没有索引名称，例如：

```bash
node app.js joe
```

则可以这样访问：

```js
const args = process.argv.slice(2)
args[0]
```

如果是这种情况：

```bash
node app.js name=joe
```

则 `args[0]` 是 `name=joe`，需要对其进行解析， 最好的方法是使用 [`minimist`](https://www.npmjs.com/package/minimist) 库，该库有助于处理参数：

```js
const args = require('minimist')(process.argv.slice(2))
args['name'] //joe
```

但是需要在每个参数名称之前使用双破折号：

```bash
node app.js --name=joe
```

## 使用 Node.js 输出到命令行

### 使用控制台模块的基础输出

基本用法

```js
const x = 'x'
const y = 'y'
console.log(x, y)
```

传入变量和格式说明符来格式化用语

```js
console.log('我的%s已经%d岁', '猫', 2)
console.log('%o', Number)
```

- `%s` 会格式化变量为字符串
- `%d` 会格式化变量为数字
- `%i` 会格式化变量为其整数部分
- `%o` 会格式化变量为对象

### 清空控制台

`console.clear()`

### 元素计数

`console.count()`

### 打印堆栈踪迹

`console.trace()`

```js
const function2 = () => console.trace()
const function1 = () => function2()
function1()
```

打印以下内容

```bash
Trace
    at function2 (repl:1:33)
    at function1 (repl:1:25)
    at repl:1:1
    at ContextifyScript.Script.runInThisContext (vm.js:44:33)
    at REPLServer.defaultEval (repl.js:239:29)
    at bound (domain.js:301:14)
    at REPLServer.runBound [as eval] (domain.js:314:12)
    at REPLServer.onLine (repl.js:440:10)
    at emitOne (events.js:120:20)
    at REPLServer.emit (events.js:210:7)
```

### 计算耗时

可以使用 `time()` 和 `timeEnd()` 轻松地计算函数运行所需的时间

```js
const doSomething = () => console.log('测试')
const measureDoingSomething = () => {
  console.time('doSomething()')
  //做点事，并测量所需的时间。
  doSomething()
  console.timeEnd('doSomething()')
}
measureDoingSomething()
```

### 为输出着色

可以使用转义序列在控制台中为文本的输出着色，转义序列是一组标识颜色的字符

```js
// 输出黄色你好
console.log('\x1b[33m%s\x1b[0m', '你好')
```

当然，这是执行此操作的底层方法， 为控制台输出着色的最简单方法是使用库， [Chalk](https://github.com/chalk/chalk) 是一个这样的库，除了为其着色外，它还有助于其他样式的设置（例如使文本变为粗体、斜体或带下划线）

可以使用 `npm install chalk` 进行安装，然后就可以使用它

```js
const chalk = require('chalk')
console.log(chalk.yellow('你好'))
```

### 创建进度条

[Progress](https://www.npmjs.com/package/progress) 是一个很棒的软件包，可在控制台中创建进度条，使用 `npm install progress` 进行安装

以下代码段会创建一个 10 步的进度条，每 100 毫秒完成一步。 当进度条结束时，则清除定时器

```js
const ProgressBar = require('progress')

const bar = new ProgressBar(':bar', { total: 10 })
const timer = setInterval(() => {
  bar.tick()
  if (bar.complete) {
    clearInterval(timer)
  }
}, 100)
```

## 在 Node.js 中从命令行接收输入

从版本 7 开始，Node.js 提供了 `readline` 模块来执行以下操作：每次一行地从可读流（例如 `process.stdin` 流，在 Node.js 程序执行期间该流就是终端输入）获取输入

```js
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

readline.question(`你叫什么名字?`, name => {
  console.log(`你好 ${name}!`)
  readline.close()
})
```

这段代码会询问用户名，当输入了文本并且用户按下回车键时，则会发送问候语

`question()` 方法会显示第一个参数（即问题），并等待用户的输入，当按下回车键时，则它会调用回调函数

如果需要密码，则最好不要回显密码，而是显示 `*` 符号

最简单的方式是使用 [`readline-sync` 软件包](https://www.npmjs.com/package/readline-sync)，其在 API 方面非常相似

[Inquirer.js 软件包](https://github.com/SBoudrias/Inquirer.js) 则提供了更完整、更抽象的解决方案

可以使用 `npm install inquirer` 进行安装，然后复用上面的代码如下

```js
const inquirer = require('inquirer')

var questions = [
  {
    type: 'input',
    name: 'name',
    message: "你叫什么名字?"
  }
]

inquirer.prompt(questions).then(answers => {
  console.log(`你好 ${answers['name']}!`)
})
```

Inquirer.js 可以执行许多操作，例如询问多项选择、展示单选按钮、确认等

## 使用 exports 从 Node.js 文件中公开功能

第一种方式是将对象赋值给 `module.exports`（这是模块系统提供的对象），这会使文件只导出该对象

```js
const car = {
  brand: 'Ford',
  model: 'Fiesta'
}

module.exports = car

//在另一个文件中

const car = require('./car')
```

第二种方式是将要导出的对象添加为 `exports` 的属性，这种方式可以导出多个对象、函数或数据

```js
const car = {
  brand: 'Ford',
  model: 'Fiesta'
}

exports.car = car

//在另一个文件中

const items = require('./items')
items.car
```

### 安装所有依赖

```bash
npm install
```

### 安装单个软件包

```bash
npm install <package-name>
```

通常会在此命令中看到更多标志

- `--save` 安装并添加条目到 `package.json` 文件的 dependencies，简写 `-S`
- `--save-dev` 安装并添加条目到 `package.json` 文件的 devDependencies，简写 `-D`

区别主要是，`dependencies` 是生产依赖（线上要用到的），而  `devDependencies` 通常是开发依赖（线上没用到，只有开发使用）

### 更新软件包

```bash
npm update
npm update <package-name>
```

### 运行任务

```bash
npm run <task-name>
```

## npm 将软件包安装到哪里

### 本地安装

```bash
npm install lodash
```

软件包会被安装到当前文件树中的 `node_modules` 子文件夹下

### 全局安装

```bash
npm install -g lodash
```

`npm root -g` 命令会告知其在计算机上的确切位置

## 如何使用或执行 npm 安装的软件包

```js
const _ = require('lodash')
```

如果软件包是可执行文件，该怎么办？

在这种情况下，它会把可执行文件放到 `node_modules/.bin/` 文件夹下

验证这一点的简单示例是 [cowsay](https://www.npmjs.com/package/cowsay)，cowsay 软件包提供了一个命令行程序，可以执行该程序以使母牛说些话（以及其他动物也可以说话）

当使用 `npm install cowsay` 安装软件包时，它会在 node_modules 文件夹中安装自身以及一些依赖包，有一个隐藏的 .bin 文件夹，其中包含指向 cowsay 二进制文件的符号链接

如何执行这些文件？

可以输入 `./node_modules/.bin/cowsay` 来运行它，但是最新版本的 npm（自 5.2 起）中包含的 npx 是更好的选择。 只需运行：

```bash
npx cowsay
```

## package.json 指南

### 文件结构

```json
{
  "name": "test-project",
  "version": "1.0.0",
  "description": "A Vue.js project",
  "main": "src/main.js",
  "private": true,
  "scripts": {
    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
    "start": "npm run dev",
    "unit": "jest --config test/unit/jest.conf.js --coverage",
    "test": "npm run unit",
    "lint": "eslint --ext .js,.vue src test/unit",
    "build": "node build/build.js"
  },
  "dependencies": {
    "vue": "^2.5.2"
  },
  "devDependencies": {
    "eslint": "^4.15.0",
  },
  "engines": {
    "node": ">= 6.0.0",
    "npm": ">= 3.0.0"
  },
  "browserslist": ["> 1%", "last 2 versions", "not ie <= 8"]
}
```

- `version` 表明了当前的版本
- `name` 设置了应用程序/软件包的名称
- `description` 是应用程序/软件包的简短描述
- `main` 设置了应用程序的入口点
- `private` 如果设置为 `true`，则可以防止应用程序/软件包被意外地发布到 `npm`
- `scripts` 定义了一组可以运行的 node 脚本
- `dependencies` 设置了作为依赖安装的 `npm` 软件包的列表
- `devDependencies` 设置了作为开发依赖安装的 `npm` 软件包的列表
- `engines` 设置了此软件包/应用程序在哪个版本的 Node.js 上运行
- `browserslist` 用于告知要支持哪些浏览器（及其版本）

### 属性分类

**name**

设置软件包的名称

```json
"name": "nodejs_cn"
```

**author**

列出软件包的作者名称

```json
{
  "author": "NodeJS中文网 <mail@nodejs.cn> (http://nodejs.cn)"
}
```

也可以使用以下格式

```json
{
  "author": {
    "name": "NodeJS中文网",
    "email": "mail@nodejs.cn",
    "url": "http://nodejs.cn"
  }
}
```

**contributors**

除作者外，该项目可以有一个或多个贡献者。 此属性是列出他们的数组

```json
{
  "contributors": ["NodeJS中文网 <mail@nodejs.cn> (http://nodejs.cn))"]
}
```

也可以使用以下格式

```json
{
  "contributors": [
    {
      "name": "NodeJS中文网",
      "email": "mail@nodejs.cn",
      "url": "http://nodejs.cn"
    }
  ]
}
```

**bugs**

链接到软件包的问题跟踪器，最常用的是 GitHub 的 issues 页面

```json
{
  "bugs": "https://github.com/nodejscn/node-api-cn/issues"
}
```

**homepage**

设置软件包的主页

```json
{
  "homepage": "http://nodejs.cn"
}
```

**version**

指定软件包的当前版本

```json
"version": "1.0.0"
```

第一个数字是主版本号，第二个数字是次版本号，第三个数字是补丁版本号

这些数字中的含义是：仅修复缺陷的版本是补丁版本，引入向后兼容的更改的版本是次版本，具有重大更改的是主版本

**license**

指定软件包的许可证

```json
"license": "MIT"
```

**keywords**

此属性包含与软件包功能相关的关键字数组

```json
"keywords": [
  "email",
  "machine learning",
  "ai"
]
```

这有助于人们在浏览相似的软件包或浏览 [NPM](https://www.npmjs.com/) 网站时找到你的软件包

**description**

此属性包含了对软件包的简短描述

```json
"description": "NodeJS中文网入门教程"
```

如果要将软件包发布到 `npm`，则这个属性特别有用，人们可以知道该软件包是干啥用的。

**repository**

此属性指定了此程序包仓库所在的位置

```json
"repository": "github:nodejscn/node-api-cn",
```

注意 `github` 前缀， 其他流行的服务商还包括：

```json
"repository": "gitlab:nodejscn/node-api-cn",
"repository": "bitbucket:nodejscn/node-api-cn",
```

可以显式地设置版本控制系统

```json
"repository": {
  "type": "git",
  "url": "https://github.com/nodejscn/node-api-cn.git"
}
```

也可以使用其他的版本控制系统

```json
"repository": {
  "type": "svn",
  "url": "..."
}
```

**main**

设置软件包的入口点

当在应用程序中导入此软件包时，应用程序会在该位置搜索模块的导出

```json
"main": "src/main.js"
```

**private**

如果设置为 `true`，则可以防止应用程序/软件包被意外发布到 `npm` 上

```json
"private": true
```

**scripts**

可以定义一组可以运行的 node 脚本

```json
"scripts": {
  "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
  "start": "npm run dev",
  "unit": "jest --config test/unit/jest.conf.js --coverage",
  "test": "npm run unit",
  "lint": "eslint --ext .js,.vue src test/unit",
  "build": "node build/build.js"
}
```

这些脚本是命令行应用程序， 可以通过调用 `npm run XXXX` 或 `yarn XXXX` 来运行它们

**dependencies**

设置作为依赖安装的 `npm` 软件包的列表

当使用 npm 或 yarn 安装软件包时

```bash
npm install <PACKAGENAME>
yarn add <PACKAGENAME>
```

该软件包会被自动地插入此列表中

```json
"dependencies": {
  "vue": "^2.5.2"
}
```

**devDependencies**

设置作为开发依赖安装的 `npm` 软件包的列表

它们不同于 `dependencies`，因为它们只需安装在开发机器上，而无需在生产环境中运行代码

当使用 npm 或 yarn 安装软件包时

```bash
npm install --save-dev <PACKAGENAME>
yarn add --dev <PACKAGENAME>
```

该软件包会被自动地插入此列表中

```json
"devDependencies": {
  "autoprefixer": "^7.1.2",
  "babel-core": "^6.22.1"
}
```

**engines**

设置此软件包/应用程序要运行的 Node.js 或其他命令的版本

```json
"engines": {
  "node": ">= 6.0.0",
  "npm": ">= 3.0.0",
  "yarn": "^0.13.0"
}
```

**browserslist**

用于告知要支持哪些浏览器（及其版本）， Babel、Autoprefixer 和其他工具会用到它，以将所需的 polyfill 和 fallback 添加到目标浏览器

```json
"browserslist": [
  "> 1%",
  "last 2 versions",
  "not ie <= 8"
]
```

此配置意味着需要支持使用率超过 1％（来自 [CanIUse.com](https://caniuse.com/) 的统计信息）的所有浏览器的最新的 2 个主版本，但不含 IE8 及更低的版本

**命令特有的属性**

`package.json` 文件还可以承载命令特有的配置，例如 Babel、ESLint 等

每个都有特有的属性，例如 `eslintConfig`、`babel` 等， 它们是命令特有的，可以在相应的命令/项目文档中找到如何使用它们

### 软件包版本

```json
"dependencies": {
  "vue": "〜3.0.0"
}

"dependencies": {
  "vue": "^0.13.0"
}

// 使用 1.0.0 或从 1.1.0 开始但低于 1.2.0 的版本
"dependencies": {
  "vue": "1.0.0 || >=1.1.0 <1.2.0"
}
```

## 查看 npm 包安装的版本

若要查看所有已安装的 npm 软件包（包括它们的依赖包）的最新版本，则

```bash
npm list
```

若要仅获取顶层的软件包（基本上就是告诉 npm 要安装并在 `package.json` 中列出的软件包）

```bash
npm list --depth=0
```

指定名称来获取特定软件包的版本

```bash
npm list cowsay
```

如果要查看软件包在 npm 仓库上最新的可用版本

```bash
npm view cowsay version

1.3.1
```

## 安装 npm 包的旧版本







































## 参考链接

[Node.js 中文网](http://nodejs.cn/learn)

