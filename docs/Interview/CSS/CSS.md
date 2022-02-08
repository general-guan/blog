# CSS 面试题

## 盒模型介绍

CSS3 中的盒模型有以下两种：**标准盒模型**、**IE（替代）盒模型**

两种盒子模型都是由 `content + padding + border + margin` 构成，其大小都是由 `content + padding + border` 决定的，但是盒子内容宽/高度（即 `width/height`）的计算范围根据盒模型的不同会有所不同

- 标准盒模型：只包含 `content` 
- IE（替代）盒模型：`content + padding + border` 

可以通过 `box-sizing` 来改变元素的盒模型：

- `box-sizing: content-box` ：标准盒模型（默认值）
- `box-sizing: border-box` ：IE（替代）盒模型

## css 选择器和优先级

https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors#%E9%80%89%E6%8B%A9%E5%99%A8%E5%8F%82%E8%80%83%E8%A1%A8

https://juejin.cn/post/6844903709772611592

| 选择器         | 示例                |
| :------------- | :------------------ |
| 标签选择器     | `h1 { }`            |
| 通配选择器     | `* { }`             |
| 类选择器       | `.box { }`          |
| ID选择器       | `#unique { }`       |
| 标签属性选择器 | `a[title] { }`      |
| 伪类选择器     | `p:first-child { }` |
| 伪元素选择器   | `p::first-line { }` |
| 后代选择器     | `article p`         |
| 子代选择器     | `article > p`       |
| 相邻兄弟选择器 | `h1 + p`            |
| 通用兄弟选择器 | `h1 ~ p`            |

```css
!important > 内联 > ID选择器 > 类选择器 > 标签选择器
```

优先级是由 `A` 、`B`、`C`、`D` 的值来决定的，其中它们的值计算规则如下：

1. 如果存在内联样式，那么 `A = 1`, 否则 `A = 0`
2. `B` 的值等于 `ID选择器` 出现的次数
3. `C` 的值等于 `类选择器` 和 `属性选择器` 和 `伪类` 出现的总次数
4. `D` 的值等于 `标签选择器` 和 `伪元素` 出现的总次数 

这样子直接看好像也还是很明白 ，那先上个例子：

```css
#nav-global > ul > li > a.nav-link
```

套用上面的算法，依次求出 `A` `B` `C` `D` 的值：

1. 因为没有内联样式 ，所以 `A = 0`
2. ID选择器总共出现了1次， `B = 1`
3. 类选择器出现了1次， 属性选择器出现了0次，伪类选择器出现0次，所以 `C = (1 + 0 + 0) = 1`
4. 标签选择器出现了3次， 伪元素出现了0次，所以 `D = (3 + 0) = 3`

上面算出的`A` 、 `B`、`C`、`D` 可以简记作：`(0, 1, 1, 3)`

练习

```css
li                                  /* (0, 0, 0, 1) */
ul li                               /* (0, 0, 0, 2) */
ul ol+li                            /* (0, 0, 0, 3) */
ul ol+li                            /* (0, 0, 0, 3) */
h1 + *[REL=up]                      /* (0, 0, 1, 1) */
ul ol li.red                        /* (0, 0, 1, 3) */
li.red.level                        /* (0, 0, 2, 1) */
.a1.a2.a3.a4.a5.a6.a7.a8.a9.a10.a11  /* (0, 0, 11,0) */
#x34y                               /* (0, 1, 0, 0) */
li:first-child h2 .title            /* (0, 0, 2, 2) */
#nav .selected > a:hover            /* (0, 1, 2, 1) */
html body #nav .selected > a:hover  /* (0, 1, 2, 3) */
```

OK， 现在已经弄清楚了优先级是怎么算的了，但是，还有一个问题，怎么比较两个优先级的高低呢？ **比较规则是：从左往右依次进行比较 ，较大者胜出，如果相等，则继续往右移动一位进行比较 。如果4位全部相等，则后面的会覆盖前面的**

## 重排（reflow）和重绘（repaint）的理解

https://juejin.cn/post/6844903779700047885

简单地总结下两者的概念：

- 重排：无论通过什么方式影响了元素的**几何信息**(元素在视口内的位置和尺寸大小)，浏览器需要**重新计算**元素在视口内的几何属性，这个过程叫做重排
- 重绘：通过构造渲染树和重排（回流）阶段，我们知道了哪些节点是可见的，以及可见节点的样式和具体的几何信息(元素在视口内的位置和尺寸大小)，接下来就可以将渲染树的每个节点都转换为屏幕上的**实际像素**，这个阶段就叫做重绘

如何减少重排和重绘？

- **最小化重绘和重排**，比如样式集中改变，使用添加新样式类名 `.class` 或 `cssText` 
- **批量操作 DOM**，比如读取某元素 `offsetWidth` 属性存到一个临时变量，再去使用，而不是频繁使用这个计算属性；又比如利用 `document.createDocumentFragment()` 来添加要被添加的节点，处理完之后再插入到实际 DOM 中
- **使用 `absolute` 或 `fixed` 使元素脱离文档流**，这在制作复杂的动画时对性能的影响比较明显
- **开启 GPU 加速**，利用 css 属性 `transform` 、`will-change` 等，比如改变元素位置，我们使用 `translate` 会比使用绝对定位改变其 `left` 、`top` 等来的高效，因为它不会触发重排或重绘，`transform` 使浏览器为元素创建⼀个 GPU 图层，这使得动画元素在一个独立的层中进行渲染，当元素的内容没有发生改变，就没有必要进行重绘

## 对 BFC 的理解

https://juejin.cn/post/6960866014384881671

BFC 即块级格式上下文，根据盒模型可知，每个元素都被定义为一个矩形盒子，然而盒子的布局会受到**尺寸，定位，盒子的子元素或兄弟元素，视口的尺寸**等因素决定，所以这里有一个浏览器计算的过程，计算的规则就是由一个叫做**视觉格式化模型**的东西所定义的，BFC 就是来自这个概念，它是 CSS 视觉渲染的一部分，**用于决定块级盒的布局及浮动相互影响范围的一个区域**

BFC 具有一些特性：

1. 块级元素会在垂直方向一个接一个的排列，和文档流的排列方式一致
2. 在 BFC 中上下相邻的两个容器的 `margin` 会重叠，创建新的 BFC 可以避免外边距重叠
3. 计算 BFC 的高度时，需要计算浮动元素的高度
4. BFC 区域不会与浮动的容器发生重叠
5. BFC 是独立的容器，容器内部元素不会影响外部元素
6. 每个元素的左 `margin` 值和容器的左 `border` 相接触

利用这些特性，我们可以解决以下问题：

- 利用 `4` 和 `6` ，我们可以实现三栏（或两栏）自适应布局
- 利用 `2` ，我们可以避免 `margin` 重叠问题
- 利用 `3` ，我们可以避免高度塌陷

创建 BFC 的方式：

- 绝对定位元素（`position` 为 `absolute` 或 `fixed` ）
- 行内块元素，即 `display` 为 `inline-block` 
- `overflow` 的值不为 `visible` 

## 实现两栏布局（左侧固定 + 右侧自适应布局）

现在有以下 DOM 结构：

```html
<div class="outer">
  <div class="left">左侧</div>
  <div class="right">右侧</div>
</div>
```

1. 利用浮动，左边元素宽度固定 ，设置向左浮动，将右边元素的 `margin-left` 设为固定宽度 ，注意，因为右边元素的 `width` 默认为 `auto` ，所以会自动撑满父元素

```css
.outer {
  height: 100px;
}
.left {
  float: left;
  width: 200px;
  height: 100%;
  background: lightcoral;
}
.right {
  margin-left: 200px;
  height: 100%;
  background: lightseagreen;
}
```

2. 同样利用浮动，左边元素宽度固定 ，设置向左浮动，右侧元素设置 `overflow: hidden;` 这样右边就触发了 `BFC` ，`BFC` 的区域不会与浮动元素发生重叠，所以两侧就不会发生重叠

```css
.outer {
  height: 100px;
}
.left {
  float: left;
  width: 200px;
  height: 100%;
  background: lightcoral;
}
.right {
  overflow: auto;
  height: 100%;
  background: lightseagreen;
}
```

3. 利用 `flex` 布局，左边元素固定宽度，右边的元素设置 `flex: 1`

```css
.outer {
  display: flex;
  height: 100px;
}
.left {
  width: 200px;
  height: 100%;
  background: lightcoral;
}
.right {
  flex: 1;
  height: 100%;
  background: lightseagreen;
}
```

4. 利用绝对定位，父级元素设为相对定位，左边元素 `absolute` 定位，宽度固定，右边元素的 `margin-left` 的值设为左边元素的宽度值

```css
.outer {
  position: relative;
  height: 100px;
}
.left {
  position: absolute;
  width: 200px;
  height: 100%;
  background: lightcoral;
}
.right {
  margin-left: 200px;
  height: 100%;
  background: lightseagreen;
}
```

5. 利用绝对定位，父级元素设为相对定位，左边元素宽度固定，右边元素 `absolute` 定位， `left` 为宽度大小，其余方向定位为 `0` 

```css
.outer {
  position: relative;
  height: 100px;
}
.left {
  width: 200px;
  height: 100%;
  background: lightcoral;
}
.right {
  position: absolute;
  left: 200px;
  top: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  background: lightseagreen;
}
```

## 实现圣杯布局和双飞翼布局（经典三分栏布局）

圣杯布局和双飞翼布局的目的：

- 三栏布局，中间一栏最先加载和渲染（**内容最重要，这就是为什么还需要了解这种布局的原因**）
- 两侧内容固定，中间内容随着宽度自适应
- 一般用于 PC 网页

圣杯布局和双飞翼布局的技术总结：

- 使用 `float` 布局
- 两侧使用 `margin` 负值，以便和中间内容横向重叠
- 防止中间内容被两侧覆盖，圣杯布局用 `padding` ，双飞翼布局用 `margin` 

**圣杯布局：** 

HTML 结构：

```html
<div id="container" class="clearfix">
  <p class="center">我是中间</p>
  <p class="left">我是左边</p>
  <p class="right">我是右边</p>
</div>
```

CSS 样式：

```css
#container {
  padding-left: 200px;
  padding-right: 150px;
  overflow: auto;
}
#container p {
  float: left;
}
.center {
  width: 100%;
  background-color: lightcoral;
}
.left {
  width: 200px;
  position: relative;
  left: -200px;
  margin-left: -100%;
  background-color: lightcyan;
}
.right {
  width: 150px;
  margin-right: -150px;
  background-color: lightgreen;
}
.clearfix:after {
  content: "";
  display: table;
  clear: both;
}
```

**双飞翼布局：**

HTML 结构：

```html
<div id="main" class="float">
  <div id="main-wrap">main</div>
</div>
<div id="left" class="float">left</div>
<div id="right" class="float">right</div>
```

CSS 样式：

```css
.float {
  float: left;
}
#main {
  width: 100%;
  height: 200px;
  background-color: lightpink;
}
#main-wrap {
  margin: 0 190px 0 190px;
}
#left {
  width: 190px;
  height: 200px;
  background-color: lightsalmon;
  margin-left: -100%;
}
#right {
  width: 190px;
  height: 200px;
  background-color: lightskyblue;
  margin-left: -190px;
}
```

## 水平垂直居中多种实现方式

https://juejin.cn/post/6844903982960214029

1. 利用绝对定位，设置 `left: 50%` 和 `top: 50%` 现将子元素左上角移到父元素中心位置，然后再通过 `translate` 来调整子元素的中心点到父元素的中心，该方法可以**不定宽高**

```css
.father {
  position: relative;
}
.son {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
```

2. 利用绝对定位，子元素所有方向都为 `0` ，将 `margin` 设置为 `auto` ，由于宽高固定，对应方向实现平分，该方法必须**盒子有宽高**

```css
.father {
  position: relative;
}
.son {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0px;
  margin: auto;
  height: 100px;
  width: 100px;
}
```

3. 利用绝对定位，设置 `left: 50%` 和 `top: 50%` 现将子元素左上角移到父元素中心位置，然后再通过 `margin-left` 和 `margin-top` 以子元素自己的一半宽高进行负值赋值，该方法**必须定宽高**

```css
.father {
  position: relative;
}
.son {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 200px;
  height: 200px;
  margin-left: -100px;
  margin-top: -100px;
}
```

4. 利用 `flex` ，最经典最方便的一种了，不用解释，定不定宽高无所谓的

```css
.father {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

## flex 布局

https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html

这里有个小问题，很多时候我们会用到 `flex: 1` ，它具体包含了以下的意思：

- `flex-grow: 1` ：该属性默认为 `0` ，如果存在剩余空间，元素也不放大，设置为 `1` 代表会放大
- `flex-shrink: 1` ：该属性默认为 `1` ，如果空间不足，元素缩小
- `flex-basis: 0%` ：该属性定义在分配多余空间之前，元素占据的主轴空间，浏览器就是根据这个属性来**计算是否有多余空间**的，默认值为 `auto` ，即项目本身大小，设置为 `0%` 之后，因为有 `flex-grow` 和 `flex-shrink` 的设置会自动放大或缩小，在做两栏布局时，如果右边的自适应元素 `flex-basis` 设为 `auto` 的话，其本身大小将会是 `0` 

## line-height 如何继承

父元素的 `line-height` 写了**具体数值**，比如 `30px`，则子元素 `line-height` 继承该值

父元素的 `line-height` 写了**比例**，比如 `1.5 或 2`，则子元素 `line-height` 也是继承该比例

父元素的 `line-height` 写了**百分比**，比如 `200%`，则子元素 `line-height` 继承的是父元素 `font-size * 200%` 计算出来的值



































## other

```html
<style>
    .class2{
        color: pink;
    }
    
    .class1{
        color: blue;
    }
</style>	

<div class="class1 class2"></div> <!-- blue -->
```

HTML 元素里应用的 `class` 的先后顺序无关紧要

但是，在 `<style>` 标签里面声明的 `class` 顺序十分重要，之后的声明会覆盖之前的声明，第二个声明的优先级始终高于第一个声明，由于 `.class1` 是在后面声明的，所以它的样式会覆盖 `.class2` 里的样式