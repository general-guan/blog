# window

## window 对象的属性

### top，parent，self，window

```js
window.top // 最顶层窗口
window.parent // 父窗口
window.self === window.window // 窗口本身
```

### devicePixelRatio

返回一个数值，表示一个 CSS 像素的大小与一个物理像素的大小之间的比率，也就是说，它表示一个 CSS 像素由多少个物理像素组成，它可以用于判断用户的显示环境，如果这个比率较大，就表示用户正在使用高清屏幕，因此可以显示较大像素的图片

```js
window.devicePixelRatio 
```

### 位置大小属性

```js
// 返回浏览器窗口左上角距离当前屏幕左上角的水平距离/垂直距离
window.screenX
window.screenY

// 返回网页在当前浏览器窗口中可见部分的宽高，即“视口”（viewpoint）的大小
window.innerWidth
window.innerHeight

// 返回浏览器窗口的宽高
window.outerWidth
window.outerHeight

// 返回页面滚动的水平距离/垂直距离
window.scrollX === window.pageXOffset // true
window.scrollY === window.pageYOffset // true
```

常用获取视口的方法

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

## window 对象的方法

### moveTo，moveBy

移动

```js
window.moveTo(x: number, y: number): void;
```

```js
window.moveBy(x: number, y: number): void;
```

> 注：
>
> 为了防止有人滥用这两个方法，随意移动用户的窗口，目前只有一种情况，浏览器允许用脚本移动窗口：该窗口是用 `window.open()` 方法新建的，并且窗口里只有它一个 Tab 页，除此以外的情况，使用上面两个方法都是无效的

### scroll，scrollTo，scrollBy

滚动

```ts
window.scroll(x: number, y: number): void; // 同 scrollTo
```

```ts
window.scrollTo(x: number, y: number): void;
```

```ts
window.scrollBy(x: number, y: number): void;
```

也可以接收一个 options 对象作为一个参数

```ts
interface ScrollToOptions {
  left?: number;
  top?: number;
  behavior?: "auto" | "smooth"; // auto 正常滚动，smooth 平滑滚动
}
window.scrollTo(options?: ScrollToOptions): void;

window.scrollTo({
  left: 0,
  top: 1000,
  behavior: 'smooth'
});
```

### resizeTo，resizeBy

缩放

```ts
window.resizeTo(x: number, y: number): void;
```

```ts
window.resizeBy(x: number, y: number): void;
```



