# 手写

## 函数防抖（debounce）

在事件被触发 n 秒后再执行回调，如果在这 n 秒内又被触发，则重新计时

```js
/**
 *
 * @param {Function} fn 需要防抖的函数
 * @param {number} delay 时间间隔
 * @returns
 */
function debounce(fn, delay = 500) {
  let timer = null;
  // 使用闭包（这样节流函数复用时，不会相互影响，且不污染全局变量）
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args); // 利用 apply 绑定 this，同时展开 args 数组并传参
    }, delay);
  };
}
```

> 个人理解：函数防抖就是法师发技能的时候要读条，技能读条没完再按技能就会重新读条

## 函数节流（throttle）

规定在一个单位时间内，只能触发一次函数，如果这个单位时间内触发多次函数，只有一次生效

> 个人理解：函数节流就是fps游戏的射速，就算一直按着鼠标射击，也只会在规定射速内射出子弹

## 参考链接

[7分钟理解JS的节流、防抖及使用场景 - 掘金](https://juejin.cn/post/6844903669389885453#heading-2)

[简单理解防抖和节流 - 知乎](https://zhuanlan.zhihu.com/p/265952983)