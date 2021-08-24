# 枚举

## 数字枚举

```ts
enum Direction {
    Up,
    Down,
    Left,
    Right,
}

enum Direction {
    Up = 1,
    Down,
    Left,
    Right
}
```

## 字符串枚举

```ts
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}
```

> 注：
>
> 在字符串枚举里，每个成员都必须用字符串字面量（因为没有自增长行为）

## 常数枚举

```ts
const enum Directions {
    Up,
    Down,
    Left,
    Right
}
```

## 外部枚举

```ts
declare enum Directions {
    Up,
    Down,
    Left,
    Right
}
```

