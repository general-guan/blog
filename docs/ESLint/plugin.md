# ESLint 插件

## 前言

虽然现在已经有很多实用的 ESLint 插件了，但随着项目不断迭代发展，你可能会遇到已有 ESLint 插件不能满足现在团队开发的情况，这时候，你需要自己来创建一个 ESLint 插件

本文我将带你了解各种 Lint 工具的大致历史，然后一步一步地创建一个属于你自己的 ESLint 插件，以及教你如何利用 `AST` 抽象语法树来制定这个插件的规则

以此来带你了解 ESLint 的实现原理

## 目标&涉及知识点

本文 `ESLint` 插件目标是在项目开发中禁用：`console.time()`

-  AST 抽象语法树
-  ESLint
-  Npm 发布
-  单元测试

## 插件脚手架构建

这里我们利用 **yeoman** 和 **generator-eslint** 来构建插件的脚手架代码，安装：

```bash
npm install -g yo generator-eslint
```

本地新建文件夹 eslint-plugin-demofortutorial：

```bash
mkdir eslint-plugin-demofortutorial
cd eslint-plugin-demofortutorial
```

初始化 ESLint 插件的项目结构：

```bash
yo eslint:plugin # 搭建一个初始化的目录结构
```

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/11/16db8a2c467812aa~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)

此时文件的目录结构为：

```
.
├── README.md
├── lib
│   ├── index.js
│   └── rules
├── package.json
└── tests
    └── lib
        └── rules
```

安装依赖：

```bash
npm install
```

至此，环境搭建完毕

## 创建规则

终端执行：

```bash
yo eslint:rule # 生成默认 eslint rule 模版文件
```

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/11/16db8c6914bc2472~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)

此时项目结构为：

```
.
├── README.md
├── docs // 使用文档
│   └── rules
│       └── no-console-time.md
├── lib // eslint 规则开发
│   ├── index.js
│   └── rules // 此目录下可以构建多个规则，本文只拿一个规则来讲解
│       └── no-console-time.js
├── package.json
└── tests // 单元测试
    └── lib
        └── rules
            └── no-console-time.js
```

上面结构中，我们需要在 ./lib/ 目录下去开发 Eslint 插件，这里是定义它的规则的位置













