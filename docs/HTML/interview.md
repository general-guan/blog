# 面试

## 创建带有 ID 属性的 DOM 元素有什么副作用

会增加内存负担

会创建同名的全局变量（如果一个元素拥有 ID 属性，那么 ID 属性的属性值就会成为 window 对象的属性名）

## 行内元素与块级元素

行内元素不可以设置宽高，但是可以设置 左右 `padding`、左右 `margin`

## form 表单中 input 元素的 readonly 与 disabled 区别

`disabled` 指当 `input` 元素加载时禁用此元素，`input` 内容不会随着表单提交

`readonly` 规定输入字段为只读，`input` 内容会随着表单提交

无论设置 `readonly` 还是 `disabled`，通过 `js` 脚本都能更改 `input` 的 `value`
