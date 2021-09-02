# NPM

## 注册 NPM 账号

注册地址：[https://www.npmjs.com/](https://link.zhihu.com/?target=https%3A//www.npmjs.com/)

> 注：记得邮箱验证，不验证的话，不可以 `npm publish`

## 初始化自己要发布的项目

```bash
npm init
```

模块名称（name）：<包名> cool-ui-test

初始版本号（version）：v1.0.0

index.js

```js
function npmDemo(argument) 
{ 
var name = 'finit';     
var f1 =function f(arg){console.log(arg)}   
  return {      
     name:name,    
     f1:f1   
  }  
}
 module.exports=npmDemo();
```

## 登录npm，发布自己的npm包

```bash
npm login
# 依次输入账号密码邮箱
npm publish
```

## 使用自己发布的包（模块）的示例代码

下载

```bash
npm install <包名>
npm install cool-ui-test
```

引用 test.js

```js
var test_npm = require('cool-ui-test'); 
console.log(test_npm) 
console.log(test_npm.f1(11));
console.log(test_npm.name)
```

运行 `node test.js`，输出

```bash
{ name: 'finit', f1: [Function: f] } 
11
undefined 
finit
```

## 更新自己的NPM包（模块）及readme.md

```bash
npm version patch 
npm publish
```

`npm version` 后面参数说明：

- `patch`：小变动，比如修复bug等，版本号变动 v1.0.0->v1.0.1
- `minor`：增加新功能，不影响现有功能,版本号变动 v1.0.0->v1.1.0
- `major`：破坏模块对向后的兼容性，版本号变动 v1.0.0->v2.0.0

## 使用更新后的NPM包

```bash
# 针对patch
npm install cool-ui
# 针对minor
npm install cool-ui
# 针对major
npm install cool-ui@2.0.0
```

