# CSS 面试题

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