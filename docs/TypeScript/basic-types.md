# 基础类型

## 布尔值

```ts
let isDone: boolean = false;
```

## 数字

```ts
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010; // 二进制
let octalLiteral: number = 0o744; // 八进制
let notANumber: number = NaN;
let infinityNumber: number = Infinity;
```

## 字符串

```ts
let myName: string = 'Tom';
```

## 数组

```ts
let list: number[] = [1, 2, 3];
```

数组泛型

```ts
let list: Array<number> = [1, 2, 3];
```

## 元组

```ts
let tom: [string, number] = ['Tom', 25];
```

## 枚举

```ts
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
```

## Any

```ts
let notSure: any = 4;
```

## Void

```ts
function warnUser(): void {
    console.log("This is my warning message");
}
```

## Null 和 Undefined

```ts
let u: undefined = undefined;
let n: null = null;
```

## Never

```ts
function error(message: string): never {
    throw new Error(message);
}
```

## Object

```ts
declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK

create(42); // Error
create("string"); // Error
create(false); // Error
create(undefined); // Error
```

## 类型断言

尖括号语法

```ts
<类型>值

let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;
```

`as` 语法

```ts
值 as 类型

let someValue: any = "this is a string";

let strLength: number = (someValue as string).length;
```

> 注：
>
> 当在 TypeScript 里使用 JSX 时，只有 `as` 语法是被允许的
