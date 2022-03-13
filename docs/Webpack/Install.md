## Webpack 基础

### 简单配置


```bash
npm install webpack webpack-cli -D

npm install html-webpack-plugin -D
npm install clean-webpack-plugin -D
npm install webpack-dev-server -D

npm install style-loader -D
npm install css-loader -D
npm install postcss-loader postcss -D
npm install sass-loader -D
npm i node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
npm install mini-css-extract-plugin -D
```





### SourceMap 配置选择

https://juejin.cn/post/7023242274876162084#heading-17

```js
devtool: 'source-map',
```

| devtool                      | build | rebuild       | 显示代码 | SourceMap 文件 | 描述         |
| ---------------------------- | ----- | ------------- | -------- | -------------- | ------------ |
| (none)                       | 很快  | 很快          | 无       | 无             | 无法定位错误 |
| eval                         | 快    | 很快（cache） | 编译后   | 无             | 定位到文件   |
| source-map                   | 很慢  | 很慢          | 源代码   | 有             | 定位到行列   |
| eval-source-map              | 很慢  | 一般（cache） | 编译后   | 有（dataUrl）  | 定位到行列   |
| eval-cheap-source-map        | 一般  | 快（cache）   | 编译后   | 有（dataUrl）  | 定位到行     |
| eval-cheap-module-source-map | 慢    | 快（cache）   | 源代码   | 有（dataUrl）  | 定位到行     |
| inline-source-map            | 很慢  | 很慢          | 源代码   | 有（dataUrl）  | 定位到行列   |
| hidden-source-map            | 很慢  | 很慢          | 源代码   | 有             | 无法定位错误 |
| nosource-source-map          | 很慢  | 很慢          | 源代码   | 无             | 定位到文件   |

#### 推荐配置

1. 本地开发：

推荐：`eval-cheap-module-source-map`

理由：

- 本地开发首次打包慢点没关系，因为 `eval` 缓存的原因，rebuild 会很快
- 开发中，我们每行代码不会写的太长，只需要定位到行就行，所以加上 `cheap`
- 我们希望能够找到源代码的错误，而不是打包后的，所以需要加上 `module`

1. 生产环境：

推荐：`(none)`

理由：

- 就是不想别人看到我的源代码

### 三种 hash 值

| 占位符      | 解释                       |
| ----------- | -------------------------- |
| ext         | 文件后缀名                 |
| name        | 文件名                     |
| path        | 文件相对路径               |
| folder      | 文件所在文件夹             |
| hash        | 每次构建生成的唯一 hash 值 |
| chunkhash   | 根据 chunk 生成 hash 值    |
| contenthash | 根据文件内容生成hash 值    |

表格里面的 `hash`、`chunkhash`、`contenthash` 你可能还是不清楚差别在哪

- **hash** ：任何一个文件改动，整个项目的构建 hash 值都会改变
- **chunkhash**：文件的改动只会影响其所在 chunk 的 hash 值
- **contenthash**：每个文件都有单独的 hash 值，文件的改动只会影响自身的 hash 值

## Webpack 进阶























































