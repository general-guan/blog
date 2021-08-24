# 函数

## 函数声明

```ts
function sum(x: number, y: number): number {
    return x + y;
}
```

## 函数表达式

```ts
let sum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};
```

使用接口定义函数的形状

```ts
interface Sum {
    (x: number, y: number): number
}

let sum: Sum = function(x: number, y: number): number {
    return x + y;
};
```

## 可选参数

```ts
function buildName(firstName: string, lastName?: string) {
    if (lastName) {
        return firstName + ' ' + lastName;
    } else {
        return firstName;
    }
}
```

> 注：
>
> 可选参数（lastName）必须在必需参数（firstName）后面

## 重载

```ts
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string | void {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
```

