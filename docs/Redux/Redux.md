# Redux

## 原理图

![](./redux原理图.png)

## 安装

npm

```bash
npm install --save redux
npm install --save react-redux # React 绑定库
npm install --save-dev redux-devtools # 开发者工具
```

yarn

```bash
yarn add redux
```

## 快速上手

应用中所有的 state 都以一个对象树的形式储存在一个单一的 store 中， 惟一改变 state 的办法是触发 action，一个描述发生什么的对象， 为了描述 action 如何改变 state 树，你需要编写 reducers

```js
import { createStore } from 'redux';

/**
 * 这是一个 reducer，形式为 (state, action) => state 的纯函数。
 * 描述了 action 如何把 state 转变成下一个 state。
 *
 * state 的形式取决于你，可以是基本类型、数组、对象、
 * 甚至是 Immutable.js 生成的数据结构。惟一的要点是
 * 当 state 变化时需要返回全新的对象，而不是修改传入的参数。
 *
 * 下面例子使用 `switch` 语句和字符串来做判断，但你可以写帮助类(helper)
 * 根据不同的约定（如方法映射）来判断，只要适用你的项目即可。
 */
function counter(state = 0, action) {
  switch (action.type) {
  case 'INCREMENT':
    return state + 1;
  case 'DECREMENT':
    return state - 1;
  default:
    return state;
  }
}

// 创建 Redux store 来存放应用的状态。
// API 是 { subscribe, dispatch, getState }。
let store = createStore(counter);

// 可以手动订阅更新，也可以事件绑定到视图层。
store.subscribe(() =>
  console.log(store.getState())
);

// 改变内部 state 惟一方法是 dispatch 一个 action。
// action 可以被序列化，用日记记录和储存下来，后期还可以以回放的方式执行
store.dispatch({ type: 'INCREMENT' });
// 1
store.dispatch({ type: 'INCREMENT' });
// 2
store.dispatch({ type: 'DECREMENT' });
// 1
```

## 三大原则

### 单一数据源

整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中

```js
console.log(store.getState())

/* 输出
{
  visibilityFilter: 'SHOW_ALL',
  todos: [
    {
      text: 'Consider using Redux',
      completed: true,
    },
    {
      text: 'Keep all state in a single tree',
      completed: false
    }
  ]
}
*／
```

### State 是只读的

唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象

```js
store.dispatch({
  type: 'COMPLETE_TODO',
  index: 1
})

store.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_COMPLETED'
})
```

### 使用纯函数来执行修改

为了描述 action 如何改变 state tree ，你需要编写 reducers

```js
function visibilityFilter(state = 'SHOW_ALL', action) {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case 'COMPLETE_TODO':
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: true
          })
        }
        return todo
      })
    default:
      return state
  }
}

import { combineReducers, createStore } from 'redux'
let reducer = combineReducers({ visibilityFilter, todos })
let store = createStore(reducer)
```

## Action

Action 是把数据从应用传到 store 的有效载荷，它是 store 数据的唯一来源，一般来说你会通过 store.dispatch() 将 action 传到 store

添加新 todo 任务的 action 是这样的

```js
const ADD_TODO = 'ADD_TODO'

{
  type: ADD_TODO,
  text: 'Build my first Redux app'
}
```

Action 本质上是 JavaScript 普通对象，我们约定，action 内必须使用一个字符串类型的 `type` 字段来表示将要执行的动作，多数情况下，`type` 会被定义成字符串常量，当应用规模越来越大时，建议使用单独的模块或文件来存放 action

```js
import { ADD_TODO, REMOVE_TODO } from './actionTypes'
```

### Action 创建函数

### 异步 Action

安装

```bash
yarn add redux-thunk
```

index.js

```js
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { selectSubreddit, fetchPosts } from './actions'
import rootReducer from './reducers'

const loggerMiddleware = createLogger()

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware)
)

store.dispatch(selectSubreddit('reactjs'))
store
  .dispatch(fetchPosts('reactjs'))
  .then(() => console.log(store.getState())
)
```

## Store

```js
import { createStore } from 'redux'
import todoApp from './reducers'
let store = createStore(todoApp)
```

## Reducer

## react-redux

原理图

![](.\react-redux模型图.png)

## 鸣谢

[Redux 中文文档](https://www.redux.org.cn/)