# Token

## Token 是什么

Token 其实就是访问资源对凭证

一般是用户通过用户名和密码登录成功之后，服务器将登录凭证做数字签名，加密之后得到的字符串作为token

## Token 存放位置

cookie、localStorage、sessionStorage

- 存储在 cookie 中，让它自动发送，不过缺点就是不能跨域
- 存储在 localStorage 中，每次调用接口的时候都把它当成一个字段传给后台
- 存储在 localStorage 中，每次调用接口的时候放在 HTTP 请求头的 Authorization 字段里面

## Token 放在 cookie、localStorage、sessionStorage 中的不同点

### 将 Token 存储于 localStorage 或 sessionStorage

Web 存储（localStorage/sessionStorage）可以通过同一域商 Javascript 访问，这意味着任何在你的网站上的运行的 JavaScript 都可以访问 Web 存储，所以容易受到 [XSS](https://juejin.cn/post/6892938793901359112) 攻击，尤其是项目中用到了很多第三方 JavaScript 类库

> XSS攻击：Cross-Site Scripting（跨站脚本攻击）简称 XSS（为了防止缩写与 CSS 混淆，改为 XSS），是一种代码注入攻击，攻击者通过在目标网站注入恶意脚本，使之在用户的浏览器上运行，利用这些恶意脚本，攻击者可以获取用户的敏感信息如 Cookie、SessionID等，进而危害数据安全

### 将 Token 存储于 cookie

**优点：**

- 可以制定 httponly，来防止被 JavaScript 读取，也可以制定 secure，来保证 token 只在 HTTPS 下传输

**缺点：**

- 不符合 [Restful最佳实践](https://juejin.cn/post/6844903941403049998)
- 容易遭受 CSRF 攻击（可以在服务器端检查 Refer 和 Origin）

> CSRF：跨站请求伪造，简单的说，是攻击者通过一些技术手段欺骗用户的浏览器去访问一个自己曾经认证过的网站并运行一些操作（如：发邮件、发信息、甚至财产操作如转账和购买商品），由于浏览器曾经认证过，所以被访问的网站会认为是真正的用户操作而去运行，这利用了web中用户身份验证的一个漏洞：简单的身份验证职能保证请求发自某个用户的浏览器，却不能保证请求本身是用户自愿发出去的，CSRF 并不能够拿到用户的任何信息，它只是欺骗用户浏览器，让其以用户的名义进行操作

## 总结

localStorage 具有更灵活，更大空间，天然免疫 CSRF 的特征，Cookie 空间有限，而 JWT 一半都占用较多字节，而且有时你不止需要存储一个 JWT

不懂什么是 JWT 的参考阅读[【什么是JWT】](https://juejin.cn/post/6909767910818840583)

确保你的代码以及第三方库的代码有足够的 XSS 检查，在此之上将 token 存放在 localStorage 中

## 参考链接

[Token一般存放在哪里？ - 掘金](https://juejin.cn/post/6922782392390746125#heading-4)





