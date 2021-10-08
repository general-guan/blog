# 技巧

##  解决图片底部 5px 间距

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dae7449e2a3a4c9283b2c4d379d5bb87~tplv-k3u1fbpfcp-watermark.awebp?)

html

```html
<div class="img-container">
  <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202002%2F05%2F20200205093101_yfocq.png&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636215521&t=203563292576c66ba434651680281e8a" alt="">
</div>
```

css

```css
html,body{
  margin: 0;
  padding: 0;
}

.img-container{
  background-color: lightblue;
}

img{
  width: 100%;
  /*关键css*/
  vertical-align: bottom;
}
```

## 修改 input placeholder 样式

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a14bb9cce35843ae847d54860133b33e~tplv-k3u1fbpfcp-watermark.awebp)

html

```html
<input type="text" class="placehoder-custom" placeholder="请输入用户名搜索">
<input type="text" placeholder="请输入用户名搜索">
```

css

```css
input{
  width: 300px;
  height: 30px;
  border: none;
  outline: none;
  display: block;
  margin: 15px;
  border: solid 1px #dee0e9;
  padding: 0 15px;
  border-radius: 15px;
}

.placehoder-custom::-webkit-input-placeholder{
  color: #babbc1;
  font-size: 12px;
}
```

## 巧用not选择器

> 有些情况下所有的元素都需要某些样式，唯独最后一个不需要，这时候使用 not 选择器将会特别方便

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/af66215604c34646ab9923b1add0c6bd~tplv-k3u1fbpfcp-watermark.awebp?)

html

```html
<ul>
    <li>
      <span>单元格</span>
      <span>内容</span>
    </li>
    <li>
      <span>单元格</span>
      <span>内容</span>
    </li>
    <li>
      <span>单元格</span>
      <span>内容</span>
    </li>
    <li>
      <span>单元格</span>
      <span>内容</span>
    </li>
</ul>
```

css

```css
li:not(:last-child){
  border-bottom: 1px solid #ebedf0;
}
```

## 使用caret-color改变光标颜色

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b88edad0af6d4b0eb9382c3096473fb1~tplv-k3u1fbpfcp-watermark.awebp?)

html

```html
<input type="text" class="caret-color" />
```

css

```css
.caret-color {
  /* 关键css */
  caret-color: #ffd476;
}
```

## 移除 `type="number"` 尾部的箭头

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/070684e74bec496abb50fc704e5bb52f~tplv-k3u1fbpfcp-watermark.awebp?)

html

```html
<input type="number" />
<input type="number" class="no-arrow" />
```

css

```css
/* 关键css */
.no-arrow::-webkit-outer-spin-button,
.no-arrow::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
```

## `outline:none` 移除input状态线

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b56e0808842b442e86466c11cd7bfbd1~tplv-k3u1fbpfcp-watermark.awebp?)

html

```html
<input type="number" />
<input type="number" class="no-arrow" />
```

css

```css
.no-outline{
  outline: none;
}
```

## 解决IOS滚动条卡顿

> 在IOS机器上，经常遇到元素滚动时卡顿的情况，只需要一行css即可让其支持弹性滚动

```css
body,html{   
  -webkit-overflow-scrolling: touch;
}
```

## 画三角形

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/603fad52b1814b0a8e0856798e338756~tplv-k3u1fbpfcp-watermark.awebp)

html

```css
<div class="box">
  <div class="box-inner">
    <div class="triangle bottom"></div>
    <div class="triangle right"></div>
    <div class="triangle top"></div>
    <div class="triangle left"></div>
  </div>
</div>
```

css

```css
.triangle {
  display: inline-block;
  margin-right: 10px;
  /* 基础样式 */
  border: solid 10px transparent;
}
  /*下*/
.triangle.bottom {
  border-top-color: #0097a7;
}
  /*上*/
.triangle.top {
  border-bottom-color: #b2ebf2;
}
/*左*/
.triangle.left {
  border-right-color: #00bcd4;
}
/*右*/
.triangle.right {
  border-left-color: #009688;
}
```

## 隐藏滚动条

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1495b33a4371430d927116512710914a~tplv-k3u1fbpfcp-watermark.awebp)

html

```html
<div class="box">
  <div>
    爱情会离开，朋友会离开，快乐会离开，但是考试不会,因为你不会就不会
  </div>
</div>

<div class="box box-hide-scrollbar">
  <div>只是因为在人群中多看了你一眼，你就--问我游泳健身了解一下？</div>
</div>
```

css

```css
.box {
  width: 375px;
  overflow: scroll;
}

/* 关键代码 */
.box-hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.box > div {
  margin-bottom: 15px;
  padding: 10px;
  background-color: #f5f6f9;
  border-radius: 6px;
  font-size: 12px;
  width: 750px;
}
```

## 自定义文本选中的样式

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/908a278fea2e441481501e3c71f77e67~tplv-k3u1fbpfcp-watermark.awebp)

html

```html
<div class="box">
  <p class="box-default">
    昨天遇见小学同学，没有想到他混的这么差--只放了一块钱到我的碗里
  </p>
  <p class="box--custom">
    今年情人节，不出意外的话，一个人过，出意外的话--去医院过
  </p>
</div>
```

css

```css
.box-custom::selection {
  color: #ffffff;
  background-color: #ff4c9f;
}
```

## 禁止选择文本

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/851bf7d812e542868763c4be239c6815~tplv-k3u1fbpfcp-watermark.awebp)

html

```html
 <div class="box">
  <p>好不容易习惯了自己的长相--去理了个发，又换了一种丑法</p>
  <p>国庆节放假，想跟女朋友去旅游，请大家帮忙推荐下--哪里有女朋友</p>
</div>
```

css

```css
.box p:last-child{
  user-select: none;
}
```

## 使用filter:grayscale(1)使网页呈现哀悼模式

> 伟大的革命先烈们为我们祖国的诞生做出了巨大的牺牲，在相应节日里，我们的站点会呈现灰色哀悼模式，以此来纪念先烈们

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e221b97bf4e74aeab4a4c178c04555dd~tplv-k3u1fbpfcp-watermark.awebp?)

```css
body{
  filter: grayscale(1);
}
```

## 参考链接

[20+ css高频实用片段，提高幸福感的小技能你可以拥有噢 - 掘金](https://juejin.cn/post/7016476364446367780#heading-19)



















































