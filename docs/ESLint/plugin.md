# ESLint 插件

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/11/16db9c0efc2244f3~tplv-t2oaga2asx-zoom-crop-mark:1304:1304:1304:734.awebp)

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

## AST 在 ESLint 中的运用

在正式写 `ESLint` 插件前，你需要了解下 `ESLint` 的工作原理，其中 `ESLint` 使用方法大家应该都比较熟悉，这里不做讲解，不了解的可以点击官方文档[如何在项目中配置 ESLint](https://link.juejin.cn/?target=https%3A%2F%2Fcn.eslint.org%2Fdocs%2Fuser-guide%2Fconfiguring)

在公司团队项目开发中，不同开发者书写的源码是各不相同的，那么在  `ESLint` 中，如何去分析每个人写的源码呢？

作为开发者，面对这类问题，我们必须懂得要使用 **抽象的手段** ！那么 `Javascript` 的抽象性如何体现呢？

没错，就是 **`AST`** (Abstract Syntax Tree（抽象语法树）），再祭上那张看了几百遍的图

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/11/16db9a1e630b7329~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)

在 `ESLint` 中，默认使用 esprima 来解析我们书写的 `Javascript` 语句，让其生成抽象语法树，然后去 **拦截** 检测是否符合我们规定的书写方式，最后让其展示报错、警告或正常通过， `ESLint` 的核心就是规则（`rules`），而定义规则的核心就是利用 `AST` 来做校验。每条规则相互独立，可以设置禁用 `off`、警告 `warn`⚠️和报错 `error`❌，当然还有正常通过不用给任何提示

## 规则创建

上面讲完了 `ESLint` 和 `AST` 的关系之后，我们可以正式进入开发具体规则。先来看之前生成的 `lib/rules/no-console-time.js`：

```js
/**
 * @fileoverview no console.time()
 * @author Allan91
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "no console.time()",
            category: "Fill me in",
            recommended: false
        },
        fixable: null,  // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ]
    },

    create: function(context) {

        // variables should be defined here

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        // any helper functions should go here or else delete this section

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {

            // give me methods

        };
    }
};

```

这个文件给出了书写规则的模版，一个规则对应一个可导出的 `node` 模块，它由 `meta` 和 `create` 两部分组成

- `meta`：代表了这条规则的元数据，如其类别，文档，可接收的参数的 `schema` 等等
- `create`：如果说 `meta` 表达了我们想做什么，那么 `create` 则用表达了这条 `rule` 具体会怎么分析代码

Create 返回一个对象，其中最常见的**键名**是 `AST` 抽象语法树中的**选择器**，在该选择器中，我们可以获取对应选中的内容，随后我们可以针对选中的内容作一定的判断，看是否满足我们的规则，如果不满足，可用 `context.report` 抛出问题，`ESLint` 会利用我们的配置对抛出的内容做不同的展示

具体参数配置详情见[官方文档](https://link.juejin.cn/?target=https%3A%2F%2Feslint.org%2Fdocs%2Fdeveloper-guide%2Fworking-with-rules%23rule-basics)

本文创建的 `ESLint` 插件是为了不让开发者在项目中使用 `console.time()`，先看看这段代码在抽象语法树中的展现：

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/11/16db9200b01a5fd4~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)



其中，我们将会利用以下内容作为判断代码中是否含有 `console.time`:

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/12/16dbd544233ebc32~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)

那么我们根据上面的 `AST`（抽象语法书）在 `lib/rules/no-console-time.js` 中这样书写规则：

```js
/**
 * @fileoverview no console.time()
 * @author Allan91
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "no console.time()",
            category: "Fill me in",
            recommended: false
        },
        fixable: null,  // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ],
        // 报错信息描述
        messages: {
            avoidMethod: "console method '{{name}}' is forbidden.",
        },
    },

    create: function(context) {
        return {
            // 键名为ast中选择器名
            'CallExpression MemberExpression': (node) => {
                // 如果在ast中满足以下条件，就用 context.report() 进行对外警告⚠️
                if (node.property.name === 'time' && node.object.name === 'console') {
                    context.report({
                        node,
                        messageId: 'avoidMethod',
                        data: {
                            name: 'time',
                        },
                    });
                }
            },
        };
    }
};
```

再修改 `lib/index.js`：

```js
"use strict";

module.exports = {
    rules: {
        'no-console-time': require('./rules/no-console-time'),
    },
    configs: {
        recommended: {
            rules: {
                'demofortutorial/no-console-time': 2, // 可以省略 eslint-plugin 前缀
            },
        },
    },
};
```

至此，`Eslint` 插件创建完成，接下去你需要做的就是将此项目发布到 [npm平台](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2F)， 根目录执行：

```bash
npm publish
```

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/11/16db92e7fb71e9a0~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)

打开[npm](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2F)平台，可以搜索到上面发布的 `eslint-plugin-demofortutorial` 这个 Node 包

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/11/16db9313b6c8c428~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)

## 如何使用

发布完之后在你需要的项目中安装这个包：

```bash
npm install eslint-plugin-demofortutorial -D
```

然后在 `.eslintrc.js` 中配置：

```js
"extends": [
    "eslint:recommended",
    "plugin:eslint-plugin-demofortutorial/recommended",
],
"plugins": [
    'demofortutorial'
],
```

如果之前没有`.eslintrc.js` 文件，可以执行下面命令生成：

```bash
npm install -g eslint
eslint --init
```

此时，如果在当前项目的 `JS` 文件中书写 `console.time`，会出现如下效果：

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/11/16db9411ad504bf2~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)





















