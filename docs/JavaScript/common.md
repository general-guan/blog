# 公共
```js
// 获取浏览器可视区域宽高
let pageWidth = window.innerWidth;
let pageHeight = window.innerHeight;

if (typeof pageWidth !== "number") {
  if (document.compatMode === "CSS1Compat") {
    // 标准模式
    pageWidth = document.documentElement.clientWidth;
    pageHeight = document.documentElement.clientHeight;
  } else {
    // 怪异模式
    pageWidth = document.body.clientWidth;
    pageHeight = document.body.clientHeight;
  }
}
```

