# null, undefined 和布尔值

## null 和 undefined

`null` 和 `undefined` 都可以表示“没有”，含义非常相似，甚至作相等（`==`）比较都为 `true`

```js
undefined == null // true
undefined === null // false --- 类型不一致
```

相同点：`null` 和 `undefined` 转化为布尔值时都为 `false`

不同点：`null` 表示一个“空”的对象，`undefined` 表示无定义；`null` 转为数值时是 `0`，`undefined` 转为数值时为 `NaN`

## 布尔值

只有以下六个值的布尔值为 `false`

- `undefined`
- `null`
- `false`
- `0`
- `NaN`
- `""` 或 `''`（空字符串）

