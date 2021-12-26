# Sass

## 函数

### if() 函数

类似于正则表达式，`expression` 为 `true` 则为 `value1`，为 `false` 则为 `value2`

```scss
if( expression, value1, value2 )
```

示例

```scss
h2{
   color: if( 1 + 1 == 2 , green , red);
}

/*结果*/

h2{
   color: green;
}
```

### append() 函数

将单个值 `value` 添加到 `list` 列表尾部，`separator` 是分隔符，默认会自动侦测，或者指定为逗号或空格

```scss
append( list, value, [separator] )
```

`separator`

- 如果取值为 `comma` 将会以逗号分隔列表项
- 如果取值为 `space` 将会以空格分隔列表项

示例

```scss
div {
  border-radius: append((20px 40px 60px), 80px);
}

/*结果*/

div {
  border-radius: 20px 40px 60px 80px;
}
```



