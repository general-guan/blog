# Handle 面试题

## 防抖

[JavaScript 专题之跟着 underscore 学防抖 ](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fmqyqingfeng%2FBlog%2Fissues%2F22)

```javascript
function debounce(func, wait, immediate) {
  let timeout;

  return function () {
    let context = this;
    let args = arguments;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      let callNow = !timeout;
      timeout = setTimeout(function () {
        timeout = null;
      }, wait);
      if (callNow) func.apply(context, args);
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    }
  };
}
```

## 节流

[JavaScript 专题之跟着 underscore 学节流](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fmqyqingfeng%2FBlog%2Fissues%2F26)

```javascript
// 使用时间戳
function throttle(func, wait) {
  let preTime = 0;

  return function () {
    let nowTime = +new Date();
    let context = this;
    let args = arguments;

    if (nowTime - preTime > wait) {
      func.apply(context, args);
      preTime = nowTime;
    }
  };
}

// 定时器实现
function throttle(func, wait) {
  let timeout;

  return function () {
    let context = this;
    let args = arguments;

    if (!timeout) {
      timeout = setTimeout(function () {
        timeout = null;
        func.apply(context, args);
      }, wait);
    }
  };
}
```

## 快速排序

这里对快排思想不太明白的同学可以看下这个讲解的很清晰的视频：[快速排序算法](https://link.juejin.cn?target=https%3A%2F%2Fwww.bilibili.com%2Fvideo%2FBV1at411T75o%3Ffrom%3Dsearch%26seid%3D10065750342799523965%26spm_id_from%3D333.337.0.0)。

```javascript
function sortArray(nums) {
  quickSort(0, nums.length - 1, nums);
  return nums;
}

function quickSort(start, end, arr) {
  if (start < end) {
    const mid = sort(start, end, arr);
    quickSort(start, mid - 1, arr);
    quickSort(mid + 1, end, arr);
  }
}

function sort(start, end, arr) {
  const base = arr[start];
  let left = start;
  let right = end;
  while (left !== right) {
    while (arr[right] >= base && right > left) {
      right--;
    }
    arr[left] = arr[right];
    while (arr[left] <= base && right > left) {
      left++;
    }
    arr[right] = arr[left];
  }
  arr[left] = base;
  return left;
}
```

## instanceof

这个手写一定要懂原型及原型链。

```javascript
function myInstanceof(target, origin) {
  if (typeof target !== "object" || target === null) return false;
  if (typeof origin !== "function")
    throw new TypeError("origin must be function");
  let proto = Object.getPrototypeOf(target); // 相当于 proto = target.__proto__;
  while (proto) {
    if (proto === origin.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}
```

## 数组扁平化

重点，不要觉得用不到就不管，这道题就是考察你对 js 语法的熟练程度以及手写代码的基本能力。

```javascript
function flat(arr, depth = 1) {
  if (depth > 0) {
    // 以下代码还可以简化，不过为了可读性，还是....
    return arr.reduce((pre, cur) => {
      return pre.concat(Array.isArray(cur) ? flat(cur, depth - 1) : cur);
    }, []);
  }
  return arr.slice();
}
```

## 手写 reduce

先不考虑第二个参数初始值：

```javascript
Array.prototype.reduce = function (cb) {
  const arr = this; //this就是调用reduce方法的数组
  let total = arr[0]; // 默认为数组的第一项
  for (let i = 1; i < arr.length; i++) {
    total = cb(total, arr[i], i, arr);
  }
  return total;
};
```

考虑上初始值：

```javascript
Array.prototype.reduce = function (cb, initialValue) {
  const arr = this;
  let total = initialValue || arr[0];
  // 有初始值的话从0遍历，否则从1遍历
  for (let i = initialValue ? 0 : 1; i < arr.length; i++) {
    total = cb(total, arr[i], i, arr);
  }
  return total;
};
```

## 带并发的异步调度器 Scheduler

JS 实现一个带并发限制的异度调度器 Scheduler，保证同时运行的任务最多有两个。完善下面代码中的 Scheduler 类，使得以下程序能正确输出。

```javascript
class Scheduler {
  add(promiseMaker) {}
}

const timeout = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

const scheduler = new Scheduler();
const addTask = (time, order) => {
  scheduler.add(() => timeout(time).then(() => console.log(order)));
};

addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");
// output：2 3 1 4
// 一开始，1，2两个任务进入队列。
// 500ms 时，2完成，输出2，任务3入队。
// 800ms 时，3完成，输出3，任务4入队。
// 1000ms 时，1完成，输出1。
```

根据题目，我们只需要操作 `Scheduler` 类就行：

```javascript
class Scheduler {
  constructor() {
    this.waitTasks = []; // 待执行的任务队列
    this.excutingTasks = []; // 正在执行的任务队列
    this.maxExcutingNum = 2; // 允许同时运行的任务数量
  }

  add(promiseMaker) {
    if (this.excutingTasks.length < this.maxExcutingNum) {
      this.run(promiseMaker);
    } else {
      this.waitTasks.push(promiseMaker);
    }
  }

  run(promiseMaker) {
    const len = this.excutingTasks.push(promiseMaker);
    const index = len - 1;
    promiseMaker().then(() => {
      this.excutingTasks.splice(index, 1);
      if (this.waitTasks.length > 0) {
        this.run(this.waitTasks.shift());
      }
    });
  }
}
```

## 去重

- 利用 ES6 `set` 关键字：

```javascript
function unique(arr) {
  return [...new Set(arr)];
}
```

- 利用 ES5 `filter` 方法：

```javascript
function unique(arr) {
  return arr.filter((item, index, array) => {
    return array.indexOf(item) === index;
  });
}
```

## 深拷贝

```js
function deepClone(target, hash = new WeakMap()) {
  if (typeof target !== "object" || typeof target === null) {
    return target;
  }
  let cloneTarget = Array.isArray(target) ? [] : {};
  if (hash.has(target)) {
    return hash.get(target);
  }
  hash.set(target, cloneTarget);
  for (const key in target) {
    cloneTarget[key] = deepClone(target[key], hash);
  }
  return cloneTarget;
}
```
