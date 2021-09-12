# Prettierrc 文件常用配置

Cli是在终端使用，

Api是在 `.Prettierrc` 中设置使用

## printWidth

指定换行长度

| Default | Cli Override  | Api Override |
| ------- | ------------- | ------------ |
| 80      | --print-width | printWidth:  |

## Tab Width

指定每个缩进的空格数

| Default | Cli Override | Api Override |
| ------- | ------------ | ------------ |
| 2       | --tab-width  | tabWidth:    |

## Tabs

用 `Tab` 缩进而不是空格缩进

| Default | Cli Override | Api Override |
| ------- | ------------ | ------------ |
| false   | --use-tabs   | useTabs:     |

## Semicolons

在语句的末尾打印分号

- true  - 在每个语句的末尾添加一个分号
- false - 只在可能引入ASI故障的行的开头添加分号

| Default | Cli Override | Api Override |
| ------- | ------------ | ------------ |
| true    | --no-semi    | semi:        |

## Quotes

使用单引号而不是双引号

| Default | Cli Override   | Api Override |
| ------- | -------------- | ------------ |
| false   | --single-quote | singleQuote: |

## Trailing Commas

多行时，尽可能打印尾随逗号

- none - 没有尾随逗号
- es5 - 在ES5中有效的尾随逗号（object，arrays等）
- all - 尽可能尾随逗号（包括函数参数）

| Default | Cli Override                      | Api Override                      |
| ------- | --------------------------------- | --------------------------------- |
| None    | --trailing-comma <none\|es5\|all> | trailingComma: "<none\|es5\|all>" |

## Bracket Spacing

在对象文字中的括号之间打印空格

- true - Example { foo: bar }
- flase - Example {foo: bar}

| Default | Cli Override         | Api Override    |
| ------- | -------------------- | --------------- |
| true    | --no-bracket-spacing | bracketSpacing: |

## JSX Brackets

将多行JSX元素的 `>` 放在最后一行的末尾，而不是单独放在下一行

| Default | Cli Override            | Api Override        |
| ------- | ----------------------- | ------------------- |
| false   | --jsx-bracket-same-line | jsxBracketSameLine: |

```jsx
<!-- false -->
<div
	className=""
	style={{}}
    >
    
<!-- true -->
<div
	className=""
	style={{}} >
```

## Arrow Function Parentheses

围绕一个唯一的箭头函数参数包括括号

- avoid - 尽可能省略括号 Example： x => x
- always - 总是包括括号 Example： (x) => x

| Default | Cli Override                   | Api Override                   |
| ------- | ------------------------------ | ------------------------------ |
| avoid   | --arrow-parens <avoid\|always> | arrowParens: "<avoid\|always>" |

## Range

只格式化文件的一部分

这两个选项可用于格式化以给定字符偏移（分别包含和排除）开始和结束的代码

- 返回到包含选定语句的第一行的开头
- 转到选定语句的末尾

这些选项不能与 cursorOffset 一起使用

| Default  | Cli Override  | Api Override |
| -------- | ------------- | ------------ |
| 0        | --range-start | rangeStart:  |
| Infinity | --range-end   | rangeEnd:    |

