# 高频面试题

## 跨域的解决方法

- jsonp（json padding）
- cors
- 服务器代理、反向代理（nginx）

## cookie、localStorage、sessionStorage

|                | cookie         | localStorage | sessionStorage |
| -------------- | -------------- | ------------ | -------------- |
| 大小           | 4kb            | 10Mb         | 5Mb            |
| 兼容           | H4/H5          | H5           | H5             |
| 访问           | 任何窗口       | 任何窗口     | 同一窗口       |
| 有效期         | 手动设置       | 永久         | 到窗口关闭     |
| 存储位置       | 浏览器和服务器 | 浏览器       | 浏览器         |
| 与请求一起发送 | 是             | 否           | 否             |
| 语法           | 复杂           | 简易         | 简易           |

> 注：`localStorage` 存储过大会影响页面性能
