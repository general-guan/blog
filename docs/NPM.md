**1.注册NPM 账号**
注册地址：[https://www.npmjs.com/](https://link.zhihu.com/?target=https%3A//www.npmjs.com/)。（记得邮箱验证）

npm init。

name:finitxu-npm-test

version:v1.0.0

 index.js:

```
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

npm login

npm publish

npm install finitxu-npm-test

```js
var test_npm = require('finitxu-npm-test'); 
console.log(test_npm) 
console.log(test_npm.f1(11));
console.log(test_npm.name)
```

```
node test.js
```

```
{ name: 'finit', f1: [Function: f] } 
11
undefined 
finit
```

