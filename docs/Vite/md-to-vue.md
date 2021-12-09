# vite实现md转vue

## 前言：

早期UI库文档代码与渲染用的是 2 套代码，自然改文档时需要改 2 份代码。 `md` 转 `vue` 的目的就是为了能让渲染代码与文档代码共用一套代码。

![在这里插入图片描述](https://img-blog.csdnimg.cn/c740ff3f17084920be61bd9b25c281de.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6Iic5bKz,size_20,color_FFFFFF,t_70,g_se,x_16)

## 整体思路

**我们知道，vite pulgin 将 md 文件转换成 vue 组件渲染的主要流程是:**

1. 配置 vue router 路由，指向 .md 文件
2. 编写 vite 插件将 .md 文件解析成 vue 文件字符串
3. 最后由 vite 的插件 [@vitejs/plugin-vue](https://github.com/vitejs/vite/tree/main/packages/plugin-vue) 将 vue 文件字符串编译成函数组件返回给前端

**我们知道，.md 文件解析成 vue 文件的主要编译流程是:**

1. 通过 [marked.lexer](https://marked.js.org/using_pro#lexer) 把 md 文档解析成 tokens 数组格式
2. 查找出 tokens 数组中的 html、js、css 代码块字符串
3. 通过代码块字符串拼接成你想要的 vue 文件代码

是不是很简单，其实就是字符串的拼接🤣，下面我们开始吧！

## 1. 配置 [vue](https://so.csdn.net/so/search?from=pc_blog_highlight&q=vue) router 路由，指向 .md 文件

```js
import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(),
  routes: [
     ...
     {
        path: '/docs/zh-CN/components/button',
        component: () => import('../../src/button/demos/zhCN/button.md')
     }
   ]
})

```

当浏览器请求 http://localhost:3000/docs/zh-CN/components/button 时, 就会去请求 button.md 文件

## 2. 编写 vite 插件将 .md 文件解析成 vue 文件

我们知道 vite 会拦截请求文件，并把文件编译成对应的 vue 函数组件代码返回给前端
**vite.config.js 如下：**

```js
import path from 'path'
import fs from 'fs-extra'
import { defineConfig } from 'vite'
import createVuePlugin from '@vitejs/plugin-vue'

const fileRegex = /\.(md)$/
const vuePlugin = createVuePlugin({ include: [/\.vue$/, /\.md$/] })  // 配置可编译 .vue 与 .md 文件

export default defineConfig({
  root: __dirname,
  plugins: [
    {
      name: 'vite-plugin-md',       // 手动实现一个 vite 插件将 .md 文件解析成 vue 文件
      async transform (_, path) {
        const code = await fs.readFile(path, 'utf-8')
        if (path.endsWith('.md')) {
          return demoLoader(code, path)
        }
      },
      async handleHotUpdate (ctx) { // 热更新
        const { file } = ctx
        if (fileRegex.test(file)) {
           const code = await fs.readFile(file, 'utf-8')
           let codeLoader
           if (path.endsWith('.md')) {
             codeLoader = demoLoader(code, path)
           }
           return vuePlugin.handleHotUpdate({
              ...ctx,
              read: () => codeLoader
           })
        }
      }
    },
    vuePlugin // 可编译 path 结尾是 .vue 与 .md 的文件
  ],
  ...
})
```

我们看见插件将 .md 文件解析成 vue 文件的工作交给了 `demoLoader(code, path)` ，demoLoader 做了什么，我们往下看。

### 2.1 通过 [marked.lexer](https://marked.js.org/using_pro#lexer) 把 md 文档解析成 tokens 数组格式

code 参数是 .md 文件的内容， path 参数是 .md 文件的路径

```js
const marked = require('marked')
function demoLoader(code, path) {
    const tokens = marked.lexer(code)
    ...
    return vueComponent
}
```

编译前的 code：

~~~js
    ```html
    <div>
      <n-button>{{ num }}</n-button>
    </div>
    ```

    ```js
    import { button as NButton } from '@vicons/ionicons5'
    import { defineComponent, ref } from 'vue'

    export default defineComponent({
      components: { NButton },
      setup (props) {
        let num = ref(0)
        return {
          num
        }
      },
    })
    ```

    ```css
    .button {
      color: red
    }
    ```
~~~

编译后：

```js
const tokens = [
    {
        type: 'code',
        raw: '```html\n<div>\n  <n-button>{{ num }}</n-button>\n</div>\n```\n\n',
        lang: 'html',
        text: '<div>\n  <n-button>{{ num }}</n-button>\n</div>'
    },
    {
        type: 'code',
        raw: '```js\n' +
          "import { button as NButton } from '@vicons/ionicons5'\n" +
          "import { defineComponent, ref } from 'vue'\n" +
          '\n' +
          'export default defineComponent({\n' +
          '  components: { NButton },\n' +
          '  setup (props) {\n' +
          '    let num = ref(0)\n' +
          '    return {\n' +
          '      num\n' +
          '    }\n' +
          '  },\n' +
          '})\n' +
          '```\n' +
          '\n',
        lang: 'js',
        text: "import { button as NButton } from '@vicons/ionicons5'\n" +
          "import { defineComponent, ref } from 'vue'\n" +
          '\n' +
          'export default defineComponent({\n' +
          '  components: { NButton },\n' +
          '  setup (props) {\n' +
          '    let num = ref(0)\n' +
          '    return {\n' +
          '      num\n' +
          '    }\n' +
          '  },\n' +
          '})'
    },
    {
        type: 'code',
        raw: '```css\n.button {\n  color: red\n}\n```\n',
        lang: 'css',
        text: '.button {\n  color: red\n}'
    }
]
```

很明显通过 `lang` 判断代码类型，就可以通过 `text` 自动取出 `md` 文件中对应的代码片段，[Naive UI](https://www.naiveui.com/zh-CN/os-theme/components/button)文档中展示与复制对应代码时就可以直接通过 `lang` 获取啦。

### 2.2 查找出 tokens 数组中的 html、js、css 代码块字符串

```js
let template, script, style
for (const token of tokens) {
    if (token.type === 'code' && token.lang === 'html') {
      template = token.text
    } else if (token.type === 'code' && token.lang === 'js') {
      script = token.text
    } else if (token.type === 'code' && token.lang === 'css') {
      style = token.text
    }
}
```

### 2.3 通过代码块字符串拼接成你想要的 .vue 文件字符串

```js
const vueComponent = `
    <template>\n ${template} \n</template>
    <script>\n ${script} \n</script>
    <style>\n ${style} \n</style>
`
```

看到这你想的不错 vueComponent 就是 `demoLoader(code, path)` 返回的字符串

## 3. 插件 `@vitejs/plugin-vue` 将 vueComponent 编译成函数组件

上面的 `vite.config.js` 插件配置中， vite 最终将 `demoLoader(code, path)` 返回值传递给了下一个插件，那就是 `vuePlugin`

```js
import createVuePlugin from '@vitejs/plugin-vue'
const vuePlugin = createVuePlugin({ include: [/\.vue$/, /\.md$/] }) // 配置可编译 .vue 与 .md 文件

```

## 知识拓展

上面的案例中一次路由请求只能转换一个 .md 文件， 如果我需要以一个 .md 文件为根页面，根页面内请求其他 md 文件来展示其他组件，类似 [Naive UI](https://www.naiveui.com/zh-CN/os-theme/components/button)，那我们该怎么做呢？

我们可以自定义规则 `.demo-entry.md` 结尾代表根页面文件， `.demo.md` 结尾代表根页面内不同样式的组件，只要让vite插件解析 `.demo-entry.md` 结尾的文件得到的代码中包含 `import colorDemo from './xxx.demo.md'` 的字样返回给前端, 前端执行则会再次对 `import` 文件发起请求，最后 vite 插件再次将 `.demo.md` 结尾的文件解析成函数组件返回给前端。

### 目录结构：

参考 [Naive UI](https://www.naiveui.com/zh-CN/os-theme/components/button) 实现

```
├── build
├── src
│   ├── button
|   |   ├── demos
|   |   |   ├── zh-CN
│   │   │   │   ├── size.demo.md           // 大小样式展示
│   │   │   │   ├── color.demo.md          // 颜色样式展示
│   │   │   │   └── index.demo-entry.md    // 文档入口
│   │   ├── src
│   │   │   ├── Button.ts                  // 文档内用到的组件
│   └── ...
├── demo
│   ├── pages
│   ├── routes         // 配置 md 路由
│   ├── App.vue
│   └── main.js
├── package.json
└── vite.config.js     // 配置 vite-plugin-md

```

### 实现原理：

此时 `vite.config.js` 配置如下

```js
export default defineConfig({
  root: __dirname,
  plugins: [
    {
      name: 'vite-plugin-md',     // 手动实现一个 vite plugin 插件
      async transform (_, path) {
        const code = await fs.readFile(path, 'utf-8')
        if (path.endsWith('.demo.md')) {
          return demoLoader(code, path)
        } else if (path.endsWith('.demo-entry.md')) {
          return docLoader(code, path)  // 解析 .demo-entry.md 结尾的文件
        }
      },
      async handleHotUpdate (ctx) {
        const { file } = ctx
        if (fileRegex.test(file)) {
          const code = await fs.readFile(file, 'utf-8')
           let codeLoader
           if (path.endsWith('.demo.md')) {
              codeLoader = demoLoader(code, path)
           } else if (path.endsWith('.demo-entry.md')) {
              codeLoader = docLoader(code, path)
           }
          return vuePlugin.handleHotUpdate({
            ...ctx,
            read: () => codeLoader
          })
        }
      }
    },
    vuePlugin // 可编译 path 结尾是 .vue 与 .md 的文件
  ],
  ...
})
```

docLoader 内做了什么，其实还是先通过 [marked.lexer](https://marked.js.org/using_pro#lexer) 把 md 文档解析成 tokens 数组格式

```js
const marked = require('marked')
function docLoader(code, path) {
    const tokens = marked.lexer(code)
    ...
    return vueComponent
}

```

index.demo-entry.md 解析前：

```
    # 按钮 Button
    
    ```demo
    color
    size
    ```

    ## 表格
    | 名称 | 类型 | 默认值 | 说明 |
    | --- | --- | --- | --- |
    | block | `boolean` | `false` | 按钮是否显示为块级 |
```

index.demo-entry.md 解析后：

```js
const tokens = [
    {
        type: 'heading',
        raw: '# 按钮 Button\n\n',
        depth: 1,
        text: '按钮 Button',
        tokens: [ [Object] ]
    }, 
    {
       type: 'code',
       raw: '```demo\ncolor\nsize\n```\n\n\n',
       lang: 'demo',
       text: 'color\nsize'
    },
    // 通过自定义规则 上述结构可转换成下面结构
    // {
    //    type: 'html',
    //    pre: false,
    //    text: '<colorDemo />\n<sizeDemo />'
    // },
    {
        type: 'heading',
        raw: '## 表格\n\n',
        depth: 2,
        text: '表格',
        tokens: [ [Object] ]
    },
    {
        type: 'table',
        header: [ '名称', '类型', '默认值', '说明' ],
        align: [ null, null, null, null ],
        cells: [ [Array] ],
        raw: '| 名称 | 类型 | 默认值 | 说明 |\n' +
             '| --- | --- | --- | --- |\n' +
             '| block | `boolean` | `false` | 按钮是否显示为块级 |\n',
        tokens: { header: [Array], cells: [Array] }
   }
]
```

下面我们再来介绍 marked 库中的一个方法 [marked.parser](https://marked.js.org/using_pro#parser) 它可以将 tokens 中一些类型比如 heading, table 都转换成 html代码， 如下：

```js
console.log( marked.parser([tokens[0]]) ) // <h1>按钮 Button</h1>
```

可是有些标签我不想直接转换成 html 标签，我需要转换成我自己写的组件，如下:

```js
console.log( marked.parser([tokens[0]]) ) // <my-header>按钮 Button</my-header>
```

该怎么做呢？
很简单，我们只需要自定义 marked 中的 renderer 即可, 将某些标签原本的转换规则替换成自己写的

```js
const marked = require('marked')
const html = marked.parser(tokens, {
    gfm: true,                 // 启动表格前提必须gfm: true,
    renderer: createRenderer() // 返回替换后的规则
})
```

createRenderer 代码如下：

```js
function createRenderer (wrapCodeWithCard = true) {
  const renderer = new marked.Renderer()

  const overrides = {       // 定义自己的规则
    table (header, body) {  // header
      if (body) body = '<tbody>' + body + '</tbody>'
      return (
        '<div class="md-table-wrapper"><my-table single-column class="md-table">\n' +
        '<thead>\n' +
        header +
        '</thead>\n' +
        body +
        '</my-table>\n' +
        '</div>'
      )
    },
    heading (text, level) {
      return `<my-header${level}>${text}</my-header${level}>`
    }
  }

  Object.keys(overrides).forEach((key) => {
    renderer[key] = overrides[key]  // 覆盖上自己的规则
  })
  return renderer
}
```

得到的 html 大致是这样的：

```html
<div>
    <my-header>按钮 Butto</my-header>
    <colorDemo />
    <sizeDemo />
    <my-header2>表格</my-header2>
    <my-table>
        <thead>
          <tr> <th>名称</th><th>类型</th><th>默认值</th><th>说明</th> </tr>
        </thead>
        <tbody>
          <tr>
            <td>block</td>
            <td>boolean</td>
            <td>false</td>
            <td>按钮是否显示为块级</td>
          </tr>
        </tbody>
    </my-table>
</div>
```

这样我们只需要与 script 代码拼接就可以组成一个 vue 文件了，可是 index.demo-entry.md 文件中没有 script 代码，怎么办呢？ 有了我们可以手动拼接一个 script 代码，把用到的组件 import 导入进去。

参考 [resolveDemoInfos](https://github.com/TuSimple/naive-ui/blob/main/build/loaders/convert-md-to-doc.js#L17) 将 tokens 中自定义的 `lang: 'demo',` 的元素的转换成 demoInfos 形式进行即可

最后我们开始拼接 script:

```js
const demoInfos = [
    {
        id: 'color',
        variable: 'colorDemo',
        fileName: 'color.demo.md',
        tag: '<colorDemo />',
        debug: false
    },
    {
        id: 'size',
        variable: 'sizeDemo',
        fileName: 'size.demo.md',
        tag: '<sizeDemo />',
        debug: false
    }
]
function genScript (demoInfos, components = []) {
  const importStmts = demoInfos
    .map(({ variable, fileName }) => `import ${variable} from './${fileName}'`)
    .join('\n')
  const componentStmts = demoInfos
    .map(({ variable }) => variable)
    .join(',\n')
  const script = `
    <script>
    ${importStmts}
    import MyTable from 'my-table'
    import MyTable1 from 'my-header1'
    import MyTable2 from 'my-header2'
    import { computed } from 'vue'

    export default {
      components: {
        MyTable,
        MyTable1,
        MyTable2,
        ${componentStmts}
      },
      setup () {
        ...
      }
    }
    </script>`
  return script
}

const script = genScript(demoInfos)
```

拼接成功后

```js
const script = `
<script>
    import colorDemo from './color.demo.md'
    import sizeDemo from './size.demo.md'
    import MyTable from 'my-table'
    import MyTable1 from 'my-header1'
    import MyTable2 from 'my-header2'
    import { computed } from 'vue'

    export default {
      components: { 
        MyTable,
        MyTable1,
        MyTable2,
        colorDemo,
        sizeDemo
      },
      setup () {
        ...
      }
    }
</script>`

```

最终将html、script 再次拼接在一起就变成了 vue 文件字符串，vite 将其传递给下一个插件 vueLugin 编译成函数组件，返回给前端，这样一切都大功告成啦！

```js
const vueComponent = `
<template>
  <div> ${html} </div>
</template>

${script}
`
```

## 参考链接

[vite实现md转vue](https://blog.csdn.net/qq_41614928/article/details/120316523)