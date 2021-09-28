# Jlc-UI

## 源码

package.json

```json
{
  "name": "jlc-ui", // 名称
  "version": "0.1.0", // 版本
  "private": false, // false 表示不是私有的，允许上传 npm
  "main": "dist/jlc-ui.common.js", // 入口
  "scripts": {
    "lib": "vue-cli-service build --target lib packages/index.js" // 接住 vue-cli 打包 dist 文件夹，并将 dist 文件夹上传npm
  }
}
```

packages/index.js

```js
import Button from "./Button.vue";
import Input from "./Input.vue";

const install = (Vue, options) => {
  Vue.component(Button.name, Button);
  Vue.component(Input.name, Input);
};

export default {
  install,
};
```

packages/Button.vue

```html
<template>
  <button class="jlc-button">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: "jlc-button",
  };
</script>

<style lang="scss">
  .jlc-button {
    padding: 12px 20px;
    background-color: #4091ff;
    color: #fff;
    border-radius: 4px;
    min-height: 40px;
    border: 1px #4091ff solid;
    font-size: 14px;
    line-height: 1;
    &:hover {
      cursor: pointer;
      background-color: #66b1ff;
      border: 1px #66b1ff solid;
    }
  }
</style>
```

packages/Input.vue

```html
<template>
  <input class="jlc-input" type="text" :placeholder="placeholder" />
</template>

<script>
  export default {
    name: "jlc-input",
    props: {
      placeholder: String,
    },
  };
</script>

<style lang="scss">
  .jlc-input {
    padding: 0 15px;
    border-radius: 4px;
    outline: none;
    box-sizing: border-box;
    height: 40px;
    border: 1px solid #dcdfe6;
    color: #606266;
    &::-webkit-input-placeholder {
      color: #c0c4cc;
    }
  }
</style>
```

.npmignore

```bash
# 忽略目录
node_modules/
packages/
public/
src/

# 忽略文件
.editorconfig
.gitignore
.prettierrc.js
babel.config.js
*.map
```

## 安装

```bash
npm install jlc-ui
```

## 快速上手

main.js

```js
import Vue from "vue";
import App from "./App.vue";
import JlcUI from "jlc-ui";
import "jlc-ui/dist/jlc-ui.css";

Vue.use(JlcUI);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
```
