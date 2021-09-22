# 公共

```css
/* 文本显示为单行，超过部分隐藏并使用省略号 */
.text-single-line {
  width: 120px; /* 固定宽度 */
  overflow: hidden; /* 超出隐藏 */
  text-overflow: ellipsis; /* 超出隐藏使用省略号 */
  white-space: nowrap; /* 强制不换行 */
}

/* 文本显示为多行，超过部分隐藏并使用省略号(只有-webkit内核才有作用) */
.text-single-line {
  width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
```

