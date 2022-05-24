# hook

## useEffect

`useEffect `类似 vue 中的 `watch` 侦听器，监听数据变化，会在浏览器绘制后延迟执行，但会保证在任何新的渲染前执行

useEffect常用的几种情况：

1. 只要页面更新就触发回调：

   ```js
   useEffect(() => {
       // 搞事情
   })
   ```

2. 只运行一次（组件挂载和卸载时执行），第二个参数传空数组 `[]`：

	```js
	useEffect(() => {
	    // 搞事情
	},[])
	```
	
3. 条件执行，第二个参数传值，可以是多个数据源的数组，当依赖的数据源发生改变时，执行回调：

   ```js
   useEffect(() => {
       // 搞事情
   },[source1,source2...])
   ```
   

useEffect的清除

```js
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    // 清除订阅
    subscription.unsubscribe();
  };
});
```

为防止内存泄漏，清除函数会在组件卸载前执行。另外，如果组件多次渲染（通常如此），则**在执行下一个 effect 之前，上一个 effect 就已被清除**

