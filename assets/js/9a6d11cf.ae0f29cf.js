"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[6198],{3905:function(e,n,t){t.d(n,{Zo:function(){return u},kt:function(){return d}});var r=t(7294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function c(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function a(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},l=Object.keys(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var i=r.createContext({}),p=function(e){var n=r.useContext(i),t=n;return e&&(t="function"==typeof e?e(n):c(c({},n),e)),t},u=function(e){var n=p(e.components);return r.createElement(i.Provider,{value:n},e.children)},s={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,l=e.originalType,i=e.parentName,u=a(e,["components","mdxType","originalType","parentName"]),m=p(t),d=o,f=m["".concat(i,".").concat(d)]||m[d]||s[d]||l;return t?r.createElement(f,c(c({ref:n},u),{},{components:t})):r.createElement(f,c({ref:n},u))}));function d(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var l=t.length,c=new Array(l);c[0]=m;var a={};for(var i in n)hasOwnProperty.call(n,i)&&(a[i]=n[i]);a.originalType=e,a.mdxType="string"==typeof e?e:o,c[1]=a;for(var p=2;p<l;p++)c[p]=t[p];return r.createElement.apply(null,c)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},7881:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return a},contentTitle:function(){return i},metadata:function(){return p},toc:function(){return u},default:function(){return m}});var r=t(7462),o=t(3366),l=(t(7294),t(3905)),c=["components"],a={},i="Jlc-UI",p={unversionedId:"Jlc-UI/Jlc-UI",id:"Jlc-UI/Jlc-UI",isDocsHomePage:!1,title:"Jlc-UI",description:"\u6e90\u7801",source:"@site/docs/Jlc-UI/Jlc-UI.md",sourceDirName:"Jlc-UI",slug:"/Jlc-UI/Jlc-UI",permalink:"/blog/docs/Jlc-UI/Jlc-UI",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/Jlc-UI/Jlc-UI.md",version:"current",frontMatter:{},sidebar:"front",previous:{title:"Element-UI",permalink:"/blog/docs/Element-UI"},next:{title:"Vite",permalink:"/blog/docs/Vite/Vite"}},u=[{value:"\u6e90\u7801",id:"\u6e90\u7801",children:[]},{value:"\u5b89\u88c5",id:"\u5b89\u88c5",children:[]},{value:"\u5feb\u901f\u4e0a\u624b",id:"\u5feb\u901f\u4e0a\u624b",children:[]}],s={toc:u};function m(e){var n=e.components,t=(0,o.Z)(e,c);return(0,l.kt)("wrapper",(0,r.Z)({},s,t,{components:n,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"jlc-ui"},"Jlc-UI"),(0,l.kt)("h2",{id:"\u6e90\u7801"},"\u6e90\u7801"),(0,l.kt)("p",null,"package.json"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "name": "jlc-ui", // \u540d\u79f0\n  "version": "0.1.0", // \u7248\u672c\n  "private": false, // false \u8868\u793a\u4e0d\u662f\u79c1\u6709\u7684\uff0c\u5141\u8bb8\u4e0a\u4f20 npm\n  "main": "dist/jlc-ui.common.js", // \u5165\u53e3\n  "scripts": {\n    "lib": "vue-cli-service build --target lib packages/index.js" // \u63a5\u4f4f vue-cli \u6253\u5305 dist \u6587\u4ef6\u5939\uff0c\u5e76\u5c06 dist \u6587\u4ef6\u5939\u4e0a\u4f20npm\n  }\n}\n')),(0,l.kt)("p",null,"packages/index.js"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'import Button from "./Button.vue";\nimport Input from "./Input.vue";\n\nconst install = (Vue, options) => {\n  Vue.component(Button.name, Button);\n  Vue.component(Input.name, Input);\n};\n\nexport default {\n  install,\n};\n')),(0,l.kt)("p",null,"packages/Button.vue"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-html"},'<template>\n  <button class="jlc-button">\n    <slot></slot>\n  </button>\n</template>\n\n<script>\n  export default {\n    name: "jlc-button",\n  };\n<\/script>\n\n<style lang="scss">\n  .jlc-button {\n    padding: 12px 20px;\n    background-color: #4091ff;\n    color: #fff;\n    border-radius: 4px;\n    min-height: 40px;\n    border: 1px #4091ff solid;\n    font-size: 14px;\n    line-height: 1;\n    &:hover {\n      cursor: pointer;\n      background-color: #66b1ff;\n      border: 1px #66b1ff solid;\n    }\n  }\n</style>\n')),(0,l.kt)("p",null,"packages/Input.vue"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-html"},'<template>\n  <input class="jlc-input" type="text" :placeholder="placeholder" />\n</template>\n\n<script>\n  export default {\n    name: "jlc-input",\n    props: {\n      placeholder: String,\n    },\n  };\n<\/script>\n\n<style lang="scss">\n  .jlc-input {\n    padding: 0 15px;\n    border-radius: 4px;\n    outline: none;\n    box-sizing: border-box;\n    height: 40px;\n    border: 1px solid #dcdfe6;\n    color: #606266;\n    &::-webkit-input-placeholder {\n      color: #c0c4cc;\n    }\n  }\n</style>\n')),(0,l.kt)("p",null,".npmignore"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"# \u5ffd\u7565\u76ee\u5f55\nnode_modules/\npackages/\npublic/\nsrc/\n\n# \u5ffd\u7565\u6587\u4ef6\n.editorconfig\n.gitignore\n.prettierrc.js\nbabel.config.js\n*.map\n")),(0,l.kt)("h2",{id:"\u5b89\u88c5"},"\u5b89\u88c5"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"npm install jlc-ui\n")),(0,l.kt)("h2",{id:"\u5feb\u901f\u4e0a\u624b"},"\u5feb\u901f\u4e0a\u624b"),(0,l.kt)("p",null,"main.js"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'import Vue from "vue";\nimport App from "./App.vue";\nimport JlcUI from "jlc-ui";\nimport "jlc-ui/dist/jlc-ui.css";\n\nVue.use(JlcUI);\n\nnew Vue({\n  render: (h) => h(App),\n}).$mount("#app");\n')))}m.isMDXComponent=!0}}]);