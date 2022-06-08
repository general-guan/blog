# 引入 tailwind-css

## 安装依赖

目前，Umi 的稳定版本是 `3.5.25` ，其（[@umijs/bundler-webpack](https://link.zhihu.com/?target=https%3A//github.com/umijs/umi/blob/master/packages/bundler-webpack/package.json)）使用的 PostCSS 版本为 `7.0.39` ，而 Tailwind 依赖 PostCSS 的版本为 `8.x.x` 。因此，我们需要安装兼容 PostCSS 7 的 Tailwind 版本

```bash
npm install -D tailwindcss@npm:@tailwindcss/postcss7-compat
```

## 添加 Tailwind 配置

```bash
npx tailwindcss init
```

`tailwind.config.js` 是 Tailwind 的配置文件，通常存放在项目根目录中

```js
module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{ts,tsx,js,jsx}"],
  darkMode: false,
  theme: {},
  variants: {},
  plugins: [],
};
```

注意到在上面的文件中，通过配置 `mode` 属性为 `jit` ，我们开启了 Tailwind 的 JIT（Just In Time）编译模式，开启 JIT 模式，有什么好处呢？

### JIT 编译模式

首先，我们需要了解在不开启 JIT 模式（**传统模式**）下的 Tailwind 构建流程：Tailwind 通过读取配置文件，预生成所有的工具类，提供给开发者使用，最后在打包时，通过 PostCSS 提供的 `pure` 插件，执行 Tree Shaking 操作，移除未被使用的工具类，从而简化产物，在该模式下，如果配置文件有很多自定义的配置，那么就会延长预生成的时间

在开启 JIT 模式后，Tailwind 不预生成所有的工具类，而是根据开发者的实际使用，来生成对应的类，大大提升了编译速度

此外，JIT 模式支持 `w-[100px]` 等包含特殊尺寸的工具类生成，而不需要开发者自行编写特定尺寸的 `style` 或 `class` ，这也提升了开发体验

## 修改 Umi 配置

完成相关依赖的安装后，我们需要修改 Umi 配置文件（`.umirc` 或 `config/config.ts`）的 `extraPostCSSPlugins` 选项

```ts
import { defineConfig } from "umi";

export default defineConfig({
  // ...
  extraPostCSSPlugins: [require("tailwindcss"), require("autoprefixer")],
  // ...
});
```

默认情况下，`tailwindcss` 会识别根目录下的 `tailwind.config.js` 配置文件。如果我们想指定配置文件的读取路径，可设置 `config` 属性。

```ts
import { defineConfig } from "umi";

export default defineConfig({
  // ...
  extraPostCSSPlugins: [
    require("tailwindcss")({ config: "[custom_path]/tailwind.config.js" }),
    require("autoprefixer"),
  ],
  // ...
});
```

## 使用 Tailwind

如下图所示，[官方文档](https://link.zhihu.com/?target=https%3A//tailwindcss.com/docs/installation/using-postcss)建议我们在项目中引入 `base`、`components` 和 `utilities`

![img](https://pic2.zhimg.com/80/v2-2528ab6ca625c66252d9b99a8e81ff51_720w.jpg)

经过验证，`base` 和 `components` 会影响 Ant Design 的样式，会带来样式问题，因此，在 Umi 项目的 `src/global.less` 文件中，我们只需引入 `utilities` 样式

```less
@tailwind utilities;
```









