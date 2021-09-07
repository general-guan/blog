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

### name

设置软件包的名称

```json
"name": "nodejs_cn"
```

### author

列出软件包的作者名称

```json
"author": "NodeJS中文网 <mail@nodejs.cn> (http://nodejs.cn)"
```

也可以使用以下格式

```json
"author": {
    "name": "NodeJS中文网",
    "email": "mail@nodejs.cn",
    "url": "http://nodejs.cn"
  }
```

### contributors

除作者外，该项目可以有一个或多个贡献者， 此属性是列出他们的数组

```json
"contributors": ["NodeJS中文网 <mail@nodejs.cn> (http://nodejs.cn))"]
```

也可以使用以下格式

```json
"contributors": [
    {
      "name": "NodeJS中文网",
      "email": "mail@nodejs.cn",
      "url": "http://nodejs.cn"
    }
  ]
```

### bugs

链接到软件包的问题跟踪器，最常用的是 GitHub 的 issues 页面

```json
"bugs": "https://github.com/nodejscn/node-api-cn/issues"
```

### homepage

设置软件包的主页

```json
"homepage": "http://nodejs.cn"
```

### version

指定软件包的当前版本

```json
"version": "1.0.0"
```

第一个数字是主版本号，第二个数字是次版本号，第三个数字是补丁版本号

这些数字中的含义是：仅修复缺陷的版本是补丁版本，引入向后兼容的更改的版本是次版本，具有重大更改的是主版本

### license

指定软件包的许可证

```json
"license": "MIT"
```

### keywords

此属性包含与软件包功能相关的关键字数组

```json
"keywords": [
  "email",
  "machine learning",
  "ai"
]
```

这有助于人们在浏览相似的软件包或浏览 [NPM](https://www.npmjs.com/) 网站时找到你的软件包

### description

此属性包含了对软件包的简短描述

```json
"description": "NodeJS中文网入门教程"
```

如果要将软件包发布到 `npm`，则这个属性特别有用，人们可以知道该软件包是干啥用的

### repository

此属性指定了此程序包仓库所在的位置

```json
"repository": "github:nodejscn/node-api-cn",
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

### main

设置软件包的入口点

```json
"main": "src/main.js"
```

### private

如果设置为 `true`，则可以防止应用程序/软件包被意外发布到 `npm` 上

```json
"private": true
```

### scripts

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

 可以通过调用 `npm run XXXX` 或 `yarn XXXX` 来运行它们

### dependencies

设置作为依赖安装的 `npm` 软件包的列表

当使用 npm 或 yarn 安装软件包时

```bash
npm install <PACKAGENAME>
yarn add <PACKAGENAME>
```

### devDependencies

设置作为开发依赖安装的 `npm` 软件包的列表

当使用 npm 或 yarn 安装软件包时

```bash
npm install --save-dev <PACKAGENAME>
yarn add --dev <PACKAGENAME>
```

### engines

设置此软件包/应用程序要运行的 Node.js 或其他命令的版本

```json
"engines": {
  "node": ">= 6.0.0",
  "npm": ">= 3.0.0",
  "yarn": "^0.13.0"
}
```

### browserslist

用于告知要支持哪些浏览器（及其版本）。 Babel、Autoprefixer 和其他工具会用到它，以将所需的 polyfill 和 fallback 添加到目标浏览器

```json
"browserslist": [
  "> 1%",
  "last 2 versions",
  "not ie <= 8"
]
```

此配置意味着需要支持使用率超过 1％（来自 [CanIUse.com](https://caniuse.com/) 的统计信息）的所有浏览器的最新的 2 个主版本，但不含 IE8 及更低的版本

### 命令特有的属性

`package.json` 文件还可以承载命令特有的配置，例如 Babel、ESLint 等

### 软件包版本

`〜3.0.0`

`^0.13.0`

`1.0.0 || >=1.1.0 <1.2.0`

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

可以使用 `@` 语法来安装 npm 软件包的旧版本

```bash
npm install <package>@<version>
```

示例

```bash
npm install cowsay@1.2.0
npm install -g webpack@4.16.4
```

## 将所有 Node.js 依赖包更新到最新版本

更新次版本或补丁版本

```bash
npm update
```

更新主版本

```bash
# 查看软件包的新版本
npm outdated

# 全局地安装 npm-check-updates 软件包
npm install -g npm-check-updates

# 本地运行
ncu -u
npm update
```

## 使用 npm 的语义版本控制

- `^`：只会执行不更改最左边非零数字的更新， 如果写入的是 `^0.13.0`，则当运行 `npm update` 时，可以更新到 `0.13.1`、`0.13.2` 等，但不能更新到 `0.14.0` 或更高版本， 如果写入的是 `^1.13.0`，则当运行 `npm update` 时，可以更新到 `1.13.1`、`1.14.0` 等，但不能更新到 `2.0.0` 或更高版本

- `~`： 如果写入的是 `〜0.13.0`，则当运行 `npm update` 时，会更新到补丁版本：即 `0.13.1` 可以，但 `0.14.0` 不可以

- `>`：接受高于指定版本的任何版本

- `>=`：接受等于或高于指定版本的任何版

- `<=`：接受等于或低于指定版本的任何版

- `<`：接受低于指定版本的任何版本

- `=`：接受确切的版本

- `-`：接受一定范围的版本，例如：`2.1.0 - 2.6.2`

- `||`：组合集合，例如 `< 2.1 || > 2.6`
- 无符号：仅接受指定的特定版本（例如 `1.2.1`）
- `latest`：使用可用的最新版本

## 卸载 npm 软件包

```bash
# 普通卸载
npm uninstall <package-name>

# 同时移除 package.json 文件中的引用
npm uninstall -S <package-name>

# 卸载开发依赖项
npm uninstall -D <package-name>

# 全局卸载
npm uninstall -g <package-name>
```

## Node.js 事件循环

```js
const bar = () => console.log('bar')

const baz = () => console.log('baz')

const foo = () => {
  console.log('foo')
  // 消息队列
  setTimeout(bar, 0)
  // 作业队列
  new Promise((resolve, reject) =>
    resolve('应该在 baz 之后、bar 之前')
  ).then(resolve => console.log(resolve))
  baz()
}

foo()
```

这会打印

```txt
foo
baz
应该在 baz 之后、bar 之前
bar
```

## 了解 process.nextTick()

当将一个函数传给 `process.nextTick()` 时，则指示引擎在当前操作结束（在下一个事件循环滴答开始之前）时调用此函数

```js
process.nextTick(() => {
  //做些事情
})
```

## Node.js 事件触发器

Node.js 提供了使用 [`events` 模块](http://nodejs.cn/api/events.html) 构建事件系统的选项

具体上，此模块提供了 `EventEmitter` 类，用于处理事件

使用以下代码进行初始化

```js
const EventEmitter = require('events')
const eventEmitter = new EventEmitter()
```

该对象公开了 `on` 和 `emit` 方法

- `emit` 用于触发事件
- `on` 用于添加回调函数（会在事件被触发时执行）

例如，创建 `start` 事件，并提供一个示例，通过记录到控制台进行交互

```js
eventEmitter.on('start', () => {
  console.log('开始')
})
```

当运行以下代码时，事件处理函数会被触发，且获得控制台日志

```js
eventEmitter.emit('start')
```

可以通过将参数作为额外参数传给 `emit()` 来将参数传给事件处理程序

```js
eventEmitter.on('start', (start, end) => {
  console.log(`从 ${start} 到 ${end}`)
})

eventEmitter.emit('start', 1, 100)
```

EventEmitter 对象还公开了其他几个与事件进行交互的方法，例如

- `once()`：添加单次监听器
- `removeListener()` / `off()`：从事件中移除事件监听器
- `removeAllListeners()`：移除事件的所有监听器

## 搭建 HTTP 服务器

```js
const http = require('http')

const port = 3000

const server = http.createServer((req, res) => {
  res.statusCode = 200 // 设置 statusCode 属性为 200，以表明响应成功
  res.setHeader('Content-Type', 'text/plain') // 设置 Content-Type 响应头
  res.end('你好世界\n')
})

server.listen(port, () => {
  console.log(`服务器运行在 http://${hostname}:${port}/`)
})
```

## 使用 Node.js 发送 HTTP 请求

执行 GET 请求

```js
const https = require('https')
const options = {
  hostname: 'nodejs.cn',
  port: 443,
  path: '/todos',
  method: 'GET'
}

const req = https.request(options, res => {
  console.log(`状态码: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(d)
  })
})

req.on('error', error => {
  console.error(error)
})

req.end()
```

执行 POST 请求

```js
const https = require('https')

const data = JSON.stringify({
  todo: '做点事情'
})

const options = {
  hostname: 'nodejs.cn',
  port: 443,
  path: '/todos',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}

const req = https.request(options, res => {
  console.log(`状态码: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(d)
  })
})

req.on('error', error => {
  console.error(error)
})

req.write(data)
req.end()
```

## 使用 Node.js 获取 HTTP 请求的正文数据

如果使用的是 Express，则非常简单：使用 `body-parser` Node.js 模块

```js
const express = require('express')
const app = express()

app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

app.post('/todos', (req, res) => {
  console.log(req.body.todo)
})
```

如果不使用 Express 并想在普通的 Node.js 中执行此操作，则需要做多一点的工作

```js
const server = http.createServer((req, res) => {
  let data = '';
  req.on('data', chunk => {
    data += chunk;
  })
  req.on('end', () => {
    JSON.parse(data).todo // '做点事情'
  })
})
```

## 在 Node.js 中使用文件描述符

```js
const fs = require('fs')

fs.open('/Users/joe/test.txt', 'r', (err, fd) => {
  //fd 是文件描述符。
})
```

其他常用的标志有

- `r+` 打开文件用于读写
- `w+` 打开文件用于读写，将流定位到文件的开头。如果文件不存在则创建文件
- `a` 打开文件用于写入，将流定位到文件的末尾。如果文件不存在则创建文件
- `a+` 打开文件用于读写，将流定位到文件的末尾。如果文件不存在则创建文件

> 总结：
>
> 有 `+` 就是读写，`a` 是流定位末尾，`w` 是流定位开头，`r` 没有流

也可以使用 `fs.openSync` 方法打开文件，该方法会返回文件描述符（而不是在回调中提供）

```js
const fs = require('fs')

try {
  const fd = fs.openSync('/Users/joe/test.txt', 'r')
} catch (err) {
  console.error(err)
}
```

## Node.js 文件属性

每个文件都带有一组详细信息，可以使用 Node.js 进行检查

具体地说，使用 `fs` 模块提供的 `stat()` 方法

文件的信息包含在属性变量中

包括

- 使用 `stats.isFile()` 和 `stats.isDirectory()` 判断文件是否目录或文件
- 使用 `stats.isSymbolicLink()` 判断文件是否符号链接
- 使用 `stats.size` 获取文件的大小（以字节为单位）

```js
const fs = require('fs')
fs.stat('/Users/joe/test.txt', (err, stats) => {
  if (err) {
    console.error(err)
    return
  }

  stats.isFile() //true
  stats.isDirectory() //false
  stats.isSymbolicLink() //false
  stats.size //1024000 //= 1MB
})
```

Node.js 也提供了同步的方法，该方法会阻塞线程，直到文件属性准备就绪为止

```js
const fs = require('fs')
try {
  const stats = fs.statSync('/Users/joe/test.txt')
} catch (err) {
  console.error(err)
}
```

## Node.js 文件路径

```js
const path = require('path')
```

从路径中获取信息

给定一个路径，可以使用以下方法从其中提取信息

- `dirname`：获取文件的父文件夹
- `basename`：获取文件名部分
- `extname`：获取文件的扩展名

```js
const notes = '/users/joe/notes.txt'

path.dirname(notes) // /users/joe
path.basename(notes) // notes.txt
path.extname(notes) // .txt
```

可以通过为 `basename` 指定第二个参数来获取不带扩展名的文件名

```js
path.basename(notes, path.extname(notes)) //notes
```

可以使用 `path.join()` 连接路径的两个或多个片段

```js
const name = 'joe'
path.join('/', 'users', name, 'notes.txt') //'/users/joe/notes.txt'
```

可以使用 `path.resolve()` 获得相对路径的绝对路径计算

```js
path.resolve('joe.txt') //'/Users/joe/joe.txt' 如果从主文件夹运行
```

如果指定第二个文件夹参数，则 `resolve` 会使用第一个作为第二个的基础

```js
path.resolve('tmp', 'joe.txt') //'/Users/joe/tmp/joe.txt' 如果从主文件夹运行
```

如果第一个参数以斜杠开头，则表示它是绝对路径

```js
path.resolve('/etc', 'joe.txt') //'/etc/joe.txt'
```

`path.normalize()` 是另一个有用的函数，当包含诸如 `.`、`..` 或双斜杠之类的相对说明符时，其会尝试计算实际的路径

```js
path.normalize('/users/joe/..//test.txt') //'/users/test.txt'
```

## 使用 Node.js 读取文件

在 Node.js 中读取文件最简单的方式是使用 `fs.readFile()` 方法，向其传入文件路径、编码、以及会带上文件数据（以及错误）进行调用的回调函数

```js
const fs = require('fs')

fs.readFile('/Users/joe/test.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(data)
})
```

另外，也可以使用同步的版本 `fs.readFileSync()`

```js
const fs = require('fs')

try {
  const data = fs.readFileSync('/Users/joe/test.txt', 'utf8')
  console.log(data)
} catch (err) {
  console.error(err)
}
```

`fs.readFile()` 和 `fs.readFileSync()` 都会在返回数据之前将文件的全部内容读取到内存中，这意味着大文件会对内存的消耗和程序执行的速度产生重大的影响，在这种情况下，更好的选择是使用流来读取文件的内容

## 使用 Node.js 写入文件

在 Node.js 中写入文件最简单的方式是使用 `fs.writeFile()`

```js
const fs = require('fs')

const content = '一些内容'

fs.writeFile('/Users/joe/test.txt', content, err => {
  if (err) {
    console.error(err)
    return
  }
  //文件写入成功。
})
```

另外，也可以使用同步的版本 `fs.writeFileSync()`

```js
const fs = require('fs')

const content = '一些内容'

try {
  const data = fs.writeFileSync('/Users/joe/test.txt', content)
  //文件写入成功。
} catch (err) {
  console.error(err)
}
```

默认情况下，此 API 会替换文件的内容（如果文件已经存在）

可以通过指定标志来修改默认的行为

```js
fs.writeFile('/Users/joe/test.txt', content, { flag: 'a+' }, err => {})
```

可以在 [文件系统](http://nodejs.cn/api/fs.html#fs_file_system_flags) 中查看更多标志

将内容追加到文件末尾的便捷方法是 `fs.appendFile()`（及其对应的 `fs.appendFileSync()`）

```js
const content = '一些内容'

fs.appendFile('file.log', content, err => {
  if (err) {
    console.error(err)
    return
  }
  //完成！
})
```

所有这些方法都是在将全部内容写入文件之后才会将控制权返回给程序（在异步的版本中，这意味着执行回调），在这种情况下，更好的选择是使用流写入文件的内容

## 在 Node.js 中使用文件夹

使用 `fs.access()` 检查文件夹是否存在以及 Node.js 是否具有访问权限

使用 `fs.mkdir()` 或 `fs.mkdirSync()` 可以创建新的文件夹

```js
const fs = require('fs')

const folderName = './Users/joe/test'

try {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName)
  }
} catch (err) {
  console.error(err)
}
```

使用 `fs.readdir()` 或 `fs.readdirSync()` 可以读取目录的内容

这段代码会读取文件夹的内容（全部的文件和子文件夹），并返回它们的相对路径

```js
const fs = require('fs')
const path = require('path')

const folderPath = './Users/joe'

fs.readdirSync(folderPath)
```

使用 `fs.rename()` 或 `fs.renameSync()` 可以重命名文件夹。 第一个参数是当前的路径，第二个参数是新的路径

```js
const fs = require('fs')

fs.rename('./Users/joe', './Users/roger', err => {
  if (err) {
    console.error(err)
    return
  }
  //完成
})
```

`fs.renameSync()` 是同步的版本

```js
const fs = require('fs')

try {
  fs.renameSync('./Users/joe', './Users/roger')
} catch (err) {
  console.error(err)
}
```

使用 `fs.rmdir()` 或 `fs.rmdirSync()` 可以删除文件夹

删除包含内容的文件夹可能会更复杂，在这种情况下，最好安装 [`fs-extra`](https://www.npmjs.com/package/fs-extra) 模块，该模块非常受欢迎且维护良好，它是 `fs` 模块的直接替代品，在其之上提供了更多的功能，在此示例中，需要的是 `remove()` 方法

```bash
npm install fs-extra
```

并像这样使用它

```js
const fs = require('fs-extra')

const folder = './Users/joe'

fs.remove(folder, err => {
  console.error(err)
})
```

也可以与 promise 一起使用

```javascript
fs.remove(folder)
  .then(() => {
    //完成
  })
  .catch(err => {
    console.error(err)
  })
```

或使用 async/await

```js
async function removeFolder(folder) {
  try {
    await fs.remove(folder)
    //完成
  } catch (err) {
    console.error(err)
  }
}

const folder = './Users/joe'
removeFolder(folder)
```

## Node.js 文件系统模块

`fs` 模块提供了许多非常实用的函数来访问文件系统并与文件系统进行交互

```js
const fs = require('fs')
```

- `fs.access()`: 检查文件是否存在，以及 Node.js 是否有权限访问
- `fs.appendFile()`: 追加数据到文件。如果文件不存在，则创建文件
- `fs.chmod()`: 更改文件（通过传入的文件名指定）的权限。相关方法：`fs.lchmod()`、`fs.fchmod()`
- `fs.chown()`: 更改文件（通过传入的文件名指定）的所有者和群组。相关方法：`fs.fchown()`、`fs.lchown()`
- `fs.close()`: 关闭文件描述符
- `fs.copyFile()`: 拷贝文件
- `fs.createReadStream()`: 创建可读的文件流
- `fs.createWriteStream()`: 创建可写的文件流
- `fs.link()`: 新建指向文件的硬链接
- `fs.mkdir()`: 新建文件夹
- `fs.mkdtemp()`: 创建临时目录
- `fs.open()`: 设置文件模式
- `fs.readdir()`: 读取目录的内容
- `fs.readFile()`: 读取文件的内容。相关方法：`fs.read()`
- `fs.readlink()`: 读取符号链接的值
- `fs.realpath()`: 将相对的文件路径指针（`.`、`..`）解析为完整的路径
- `fs.rename()`: 重命名文件或文件夹
- `fs.rmdir()`: 删除文件夹
- `fs.stat()`: 返回文件（通过传入的文件名指定）的状态。相关方法：`fs.fstat()`、`fs.lstat()`
- `fs.symlink()`: 新建文件的符号链接
- `fs.truncate()`: 将传递的文件名标识的文件截断为指定的长度。相关方法：`fs.ftruncate()`
- `fs.unlink()`: 删除文件或符号链接
- `fs.unwatchFile()`: 停止监视文件上的更改
- `fs.utimes()`: 更改文件（通过传入的文件名指定）的时间戳。相关方法：`fs.futimes()`
- `fs.watchFile()`: 开始监视文件上的更改。相关方法：`fs.watch()`
- `fs.writeFile()`: 将数据写入文件。相关方法：`fs.write()`

关于 `fs` 模块的特殊之处是，所有的方法默认情况下都是异步的，但是通过在后面加上 `Sync` 也可以同步地工作

例如

- `fs.rename()`
- `fs.renameSync()`
- `fs.write()`
- `fs.writeSync()`

例如，试验一下 `fs.rename()` 方法， 异步的 API 会与回调一起使用

```js
const fs = require('fs')

fs.rename('before.json', 'after.json', err => {
  if (err) {
    return console.error(err)
  }

  //完成
})
```

同步的 API 则可以这样使用，并使用 try/catch 块来处理错误

```js
const fs = require('fs')

try {
  fs.renameSync('before.json', 'after.json')
  //完成
} catch (err) {
  console.error(err)
}
```

同步脚本的执行会阻塞，直到文件操作成功

## Node.js 路径模块









## 参考链接

[Node.js 中文网](http://nodejs.cn/learn)

