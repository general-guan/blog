# CSS

## 透明度

```css
img {
    opacity:0.4;
    filter:alpha(opacity=40); /* IE8 及其更早版本，注意写法！ */
}
```

> `opacity` 与 `filter:alpha()` 的区别
>
> 都是用来设置透明度的，区别就在于兼容性的问题，`opacity` 支持高版本的浏览器，IE8以上不包含IE8
>
> **opacity**
>
> `opacity` 的取值范围在 `0` 到 `1` 之间，`1` 代表完全不透明
>
> **filter:alpha()**
>
> `filter:alpha(opacity=20)` 表示设置透明度为 `20`，其中透明度范围为 `0-100`，`100` 为完全不透明



