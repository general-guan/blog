# 会话过期后token刷新，重新请求接口（订阅发布模式）

## 前言

> 登录模块说简单也简单，复杂也复杂，本章主要讲一下，会话过期后，`token` 刷新的一系列的事

## 需求

> 在一个页面内，当请求失败并且返回 `302` 后，判断是接口过期还是登录过期，如果是接口过期，则去请求新的 `token`，然后拿新的 `token` 去再次发起请求

## 思路

- 当初，想了一个黑科技（为了偷懒），就是拿到新的 `token` 后，直接强制刷新页面，这样一个页面内的接口就自动刷新啦（方便是方便，用户体验却不好）
- 目前，想到了重新请求接口时，可以配合订阅发布模式来提高用户体验

## 响应拦截

首先我们发起一个请求 `axios({url:'/test',data:xxx}).then(res=>{})`

拦截到 `302` 后，我们进入到刷新 `token` 逻辑

响应拦截代码

```js
axios.interceptors.response.use(
    function (response) { 
        if (response.status == 200) { 
            return response;
        }
    },
    (err) => {
        // 刷新 token
        let res = err.response || {}; 
        if (res.data.meta?.statusCode == 302) {
            return refeshToken(res);
        } else {  
            return err;
        }
    }
);
```

我们后台的数据格式是根据 `statusCode` 来判断过期（你们可以根据自己的实际情况判断），接着进入 `refrshToken` 方法

## 刷新 token 方法

```js
// 避免其他接口同时请求（只请求一次 token 接口）
let isRefreshToken = false;
const refeshToken = (response) => {
   if (!isRefreshToken) {
            isRefreshToken = true;
            axios({
                // 获取新token接口
                url: `/api/refreshToken`,
            })
                .then((res) => {
                    const { data = '', meta = {} } = res.data;
                    if (meta.statusCode === 200) {
                        isRefreshToken = false; 
                        // 发布消息
                        retryOldRequest.trigger(data);
                    } else { 
                        history.push('/user/login');
                    }
                })
                .catch((err) => { 
                    history.push('/user/login');
                });
        }
        // 收集订阅者 并把成功后的数据返回原接口
        return retryOldRequest.listen(response);
};
```

看到这，有的小伙伴就有点奇怪 `retryOldRequest` 这个又是什么？没错，这就是我们 男二 订阅发布模式队列

## 订阅发布模式

大家如果还不了解[订阅发布模式](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fxiaojieajie%2FdesignMode)，可以点击看一下，里面有大神写的通俗易懂的例子（觉得学到的话，可以顺便帮点赞哦~）

把失败的接口当订阅者，成功拿到新的 `token` 后再发布（重新请求接口）

以下便是订阅发布模式代码

```js
const retryOldRequest = {
    // 维护失败请求的response
    requestQuery: [],

    // 添加订阅者
    listen(response) {
        return new Promise((resolve) => {
            this.requestQuery.push((newToken) => { 
                let config = response.config || {};
                // Authorization 是传给后台的身份令牌
                config.headers['Authorization'] = newToken;
                resolve(axios(config));
            });
        });
    },

    // 发布消息
    trigger(newToken) {
        this.requestQuery.forEach((fn) => {
            fn(newToken);
        });
        this.requestQuery = [];
    },
};
```

大家可以先不用关注订阅者的逻辑，只需要知道订阅者是每次请求失败后的接口（`response`）就好了

每次进入 `refeshToken` 方法,我们失败的接口都会触发 `retryOldRequest.listen` 去订阅，而我们的 `requestQuery` 则是保存这些订阅者的队列

注意：我们订阅者队列 `requestQuery` 是保存待发布的方法，而在成功获取新 `token` 后，`retryOldRequest.trigger` 就会去发布这些消息（新 `token`）给订阅者（触发订阅队列的方法）

而订阅者（`response`）里面有 `config` 配置，我们拿到新的 `token` 后（发布后），修改 `config` 里面的请求头 `Autorzation` 而借助 `Promise` 我们可以更好的拿到新 `token` 请求回来的接口数据，一旦请求到数据，我们可以原封不动的返回给原来的接口 `/test` 了（因为我们在响应拦截那里返回的是 `refreshToken`，而 `refreshToken` 又返回的是订阅者 `retryOldRequest.listen` 返回的数据，而 `Listiner` 又返回 `Promise` 的数据，`Promise` 又在成功请求后 `resolve` 出去）

而在真实开发中，我们的逻辑还含有登录过期（与请求过期区分开来），我们是根据 ` 当前时间 - 过去时间 <  expiresTime` （`epiresTime`：登录后返回的有效时间）来判断是请求过期还是登录过期的， 以下是完整逻辑

以下是完整代码

```js
const retryOldRequest = {
    // 维护失败请求的 response
    requestQuery: [],

    // 添加订阅者
    listen(response) {
        return new Promise((resolve) => {
            this.requestQuery.push((newToken) => { 
                let config = response.config || {};
                config.headers['Authorization'] = newToken;
                resolve(axios(config));
            });
        });
    },

    // 发布消息
    trigger(newToken) {
        this.requestQuery.forEach((fn) => {
            fn(newToken);
        });
        this.requestQuery = [];
    },
};
/**
 * sessionExpiredTips
 * 会话过期：
 * 刷新 token 失败，得重新登录
 * 用户未授权，页面跳转到登录页面 
 * 接口过期 => 刷新 token
 * 登录过期 => 重新登录
 * expiresTime => 在本业务中返回 18000ms == 5h
 * ****/

// 避免其他接口同时请求
let isRefreshToken = false;
let timer = null;
const refeshToken = (response) => {
    // 登录后拿到的有效期
    let userExpir = localStorage.getItem('expiresTime');
    // 当前时间
    let nowTime = Math.floor(new Date().getTime() / 1000);
    // 最后请求的时间
    let lastResTime = localStorage.getItem('lastResponseTime') || nowTime;
    // 登录后保存到本地的 token
    let token = localStorage.getItem('token');

    if (token && nowTime - lastResTime < userExpir) {
        if (!isRefreshToken) {
            isRefreshToken = true;
            axios({
                url: `/api/refreshToken`,
            })
                .then((res) => {
                    const { data = '', meta = {} } = res.data;
                    isRefreshToken = false;
                    if (meta.statusCode === 200) {
                        localStorage.setItem('token', data);
                        localStorage.setItem('lastResponseTime', Math.floor(new Date().getTime() / 1000)
                        );
                        // 发布消息
                        retryOldRequest.trigger(data);
                    } else {
                       // 去登录
                    }
                })
                .catch((err) => {
                    isRefreshToken = false;
                   // 去登录
                });
        }
        // 收集订阅者 并把成功后的数据返回原接口
        return retryOldRequest.listen(response);
    } else {
        // 节流：避免重复运行
       // 去登录
    }
};

// http response 响应拦截
axios.interceptors.response.use(
    function (response) { 
        if (response.status == 200) {
            // 记录最后操作时间
           localStorage.setItem('lastResponseTime', Math.floor(new Date().getTime() / 1000));
            return response;
        }
    },
    (err) => { 
        let res = err.response || {}; 
        if (res.data.meta?.statusCode == 302) {
            return refeshToken(res);
        } else {
            // 非302 报的错误; 
            return err;
        }
    }
);
```

## 参考链接

[会话过期后token刷新，重新请求接口（订阅发布模式） - 掘金](https://juejin.cn/post/7037787299202990093?utm_source=gold_browser_extension#heading-0)
