# 面试

## link 与 @import 的区别

- `@import` 需要 IE5 以上才能使用
- `link` 可以使用 js 动态引入，`@import` 不行
- `link` 功能较多，可以定义 `RSS`，定义 `Rel` 等作用，而 `@import` 只能用于加载 css
- 当解析到 `link` 时，页面会同步加载所引的 css，而 `@import` 所引用的 css 会等到页面加载完才被加载

## BFC

触发条件

```css
display: inline-block/table/flex
float: left/right
position: absolute/fixed
ovevflow: hidden/auto/scroll
```

应用

- 阻止 `margin` 重叠
- 可以包含浮动元素

## 层叠上下文

`background/boder` => `z-index` 为负值 => 块级元素 => 浮动元素 => 行内元素 => `z-index: 0/auto` => `z-index` 为正值

## 选择器优先级

`!important` > 行内样式 > `#id` > `.class` > `tag` > `*` > 继承 > 默认

## 去除浮动影响，防止父级高度塌陷

- 增加尾元素清除浮动
- 父级设置高度
- 创建父级 BFC

## 居中布局

水平居中

- 行内元素: text-align: center
- 块级元素: margin: 0 auto
- absolute + transform
- flex + justify-content: center

垂直居中

- line-height: height
- absolute + transform
- flex + align-items: center
- table

水平垂直居中

- absolute + transform
- flex + justify-content + align-items