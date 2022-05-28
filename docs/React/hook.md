# hook

## 什么是 Hook 

Hook 是 React 16.8 的新增特性，它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性

**`Hook`** 本质上就是一个函数，它简洁了组件，有自己的状态管理，生命周期管理，状态共享

## React 内置的 Hook

- `useState` 状态管理
- `useEffect` 生命周期管理
- `useContext` 共享状态数据
- `useMemo` 缓存值
- `useRef` 获取 Dom 操作
- `useCallback` 缓存函数
- `useReducer` redux 相似
- `useImperativeHandle` 子组件暴露值/方法
- `useLayoutEffect` 完成副作用操作，会阻塞浏览器绘制

## useState

### 使用

```js
const [state, setState] = useState(initialState)
```

- `setState` 更新 `state` 的方法
- `initialState` 初始值

### 栗子

```jsx
import { useState } from "react";

export default () => {
  const [data, setData] = useState("天晴了");
  return (
    <div>
      <h1>{data}</h1>
      <button onClick={() => setData("下雨了")}>更新 state</button>
    </div>
  );
};
```

## useEffect

### 定义

`useEffect` 可以看作是函数式组件的生命周期管理

`useEffect` 可以使用的 3 个生命周期函数

- `componentDidmount`

- `componentDidUpdate`

- `componentWillUnmount` 

### 使用

```jsx
// 无需清除 Effect 使用
useEffect(() => {
    console.log("组件加载");
}, []);

// 清除 Effect 使用
useEffect(() => {
    console.log("组件加载");
    return () => {
        console.log("组件卸载时执行");
    };
}, []);

// 监听 state 变化
useEffect(() => {
    console.log("data更新了", data);
}, [data]);
```

### 栗子

```jsx
import { useState, useEffect } from "react";

export default () => {
  const [num, setNum] = useState(0);
  const [count, setCount] = useState(1);
  useEffect(() => {
    //默认会执行
    // 这块相当于 class 组件 生命周期的 compoentDidmount compoentDidUpdate
    console.log(`num: ${num}`);
    console.log(`count: ${count}`);

    // 组件在卸载时，将会执行 return 中内容
    return () => {
      // 相当于 class 组件生命周期的 componentWillUnMount
      console.log("测试");
    };
  }, [num]);
  return (
    <div>
      <h1>{num}</h1>
      <button onClick={() => setNum(num + 1)}>更新num</button>
      <br />
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>更新count</button>
    </div>
  );
};
```

## useRef

### 定义

`useRef` 返回的是一个可变的 `ref` 对象，它的属性 `current` 被初始化为传入的参数（`initialValue`），返回的 `ref` 对象在组件的整个生命周期内保持不变

作用

1. 获取 Dom 操作，例如 获取 `input` 焦点
2. 获取子组件的实例（只有类组件可用）
3. 在函数组件中的一个全局变量，不会因为重复 render 重复申明

### 使用

```jsx
const inputRef = useRef<HTMLInputElement>(null);
```

### 栗子

```jsx
import { useRef } from "react";

export default () => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={() => console.log(inputRef.current?.value)}>获取input 值</button>
      <button onClick={() => inputRef.current?.focus()}>获取input 焦点</button>
    </div>
  );
};
```

## useContext

### 定义

数据共享，任何组件都可访问 `Context` 数据

解决跨级组件通信

> 注：context 主要应用场景在于很多不同层级的组件需要访问同样一些的数据，请谨慎使用，因为这会使得组件的复用性变差

### 栗子

```jsx
import { useContext, createContext } from "react";

const result = {
  code: 200,
  title: "添加数据成功",
};

const MyContext = createContext(result);

const Son = () => {
  const res = useContext(MyContext);
  return (
    <>
      <h2>{res.code}</h2>
      <h2>{res.title}</h2>
    </>
  );
};

export default () => {
  return (
    <MyContext.Provider value={result}>
      <div>
        <h1>context</h1>
        <Son />
      </div>
    </MyContext.Provider>
  );
};
```

## useMemo

### 定义

`useMemo` 用于性能优化，通过记忆值来避免在每个渲染上执⾏高开销的计算

`useMemo` 返回值是 `memoized` 值，具有缓存作用

`array` 控制 `useMemo` 重新执⾏的数组，`array` 中 的 `state` 改变时才会重新执行`useMemo`

> 注：
>
> - 不传数组，每次更新都会重新计算（不建议）
>
> - 空数组，只会计算一次
>
> - 依赖对应的值，当对应的值发生变化时，才会重新计算（可以依赖另外一个 `useMemo` 返回的值）

### 栗子

```jsx
import { useState, useMemo } from "react";

export default () => {
  const [count, setCount] = useState(0);
  const [num, setNum] = useState(0);
  const newValue = useMemo(() => {
    console.log(`count 值为${count}`);
    console.log(`num 值为 ${num}`);
    return count + num;
  }, [count]); // 只有在 count 变化时才会计算
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>count + 1</button>
      <hr />
      <h1>{num}</h1>
      <button onClick={() => setNum(num + 1)}>Num + 1</button>
      <hr />
      <h2>{newValue}</h2>
    </div>
  );
};
```

## useCallback

### 定义

`useCallback` 可以说是 `useMemo` 的语法糖，能用 `useCallback` 实现的，都可以使用 `useMemo`, 常用于 `react` 的性能优化

`callback` 是一个函数用于处理逻辑

`array` 控制 `useCallback` 重新执⾏的数组，`array` 改变时才会重新执⾏ `useCallback`

> 注：
>
> 即使 `array` 中没有 `state`，`callback` 也会执行，只不过返回值不变

### 栗子

```jsx
import { useState, useCallback } from "react";

export default () => {
  const [count, setCount] = useState(0);
  const [num, setNum] = useState(0);
  const newValue = useCallback(() => {
    console.log(`count 值为${count}`);
    console.log(`num 值为 ${num}`);
    return count + num;
  }, [count]);
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>count + 1</button>
      <hr />
      <h1>{num}</h1>
      <button onClick={() => setNum(num + 1)}>Num + 1</button>
      <hr />
      <h2>{newValue()}</h2>
    </div>
  );
};
```

## useImperativeHandle

### 定义

`useImperativeHandle` 可以让你在使用 `ref` 时自定义暴露给父组件的实例值，在大多数情况下，应当避免使用 `ref` 这样的命令式代码，`useImperativeHandle` 应当与 `forwardRef` 一起使用

### 使用

```jsx
useImperativeHandle(ref,()=>{},[])
```

- 参数 1： 子组件向父组件暴露的实例
- 参数 2： 函数，传递的父组件可操作的实例和方法
- 参数 3： 监听状态，更新状态 































