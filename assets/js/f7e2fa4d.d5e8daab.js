"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[474],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>d});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),p=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},u=function(e){var t=p(e.components);return r.createElement(c.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},s=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,l=e.originalType,c=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),s=p(n),d=o,f=s["".concat(c,".").concat(d)]||s[d]||m[d]||l;return n?r.createElement(f,a(a({ref:t},u),{},{components:n})):r.createElement(f,a({ref:t},u))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var l=n.length,a=new Array(l);a[0]=s;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:o,a[1]=i;for(var p=2;p<l;p++)a[p]=n[p];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}s.displayName="MDXCreateElement"},9762:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>a,default:()=>u,frontMatter:()=>l,metadata:()=>i,toc:()=>c});var r=n(7462),o=(n(7294),n(3905));const l={},a="Module \u7684\u52a0\u8f7d\u5b9e\u73b0",i={unversionedId:"ES6/module-loader",id:"ES6/module-loader",isDocsHomePage:!1,title:"Module \u7684\u52a0\u8f7d\u5b9e\u73b0",description:"\u6d4f\u89c8\u5668\u52a0\u8f7d",source:"@site/docs/ES6/module-loader.md",sourceDirName:"ES6",slug:"/ES6/module-loader",permalink:"/blog/docs/ES6/module-loader",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/ES6/module-loader.md",version:"current",frontMatter:{},sidebar:"front",previous:{title:"Module \u7684\u8bed\u6cd5",permalink:"/blog/docs/ES6/module"},next:{title:"\u5feb\u901f\u4e0a\u624b",permalink:"/blog/docs/TypeScript/quickstart"}},c=[{value:"\u6d4f\u89c8\u5668\u52a0\u8f7d",id:"\u6d4f\u89c8\u5668\u52a0\u8f7d",children:[{value:"\u4f20\u7edf\u65b9\u6cd5",id:"\u4f20\u7edf\u65b9\u6cd5",children:[]},{value:"\u52a0\u8f7d\u89c4\u5219",id:"\u52a0\u8f7d\u89c4\u5219",children:[]}]},{value:"ES6 \u6a21\u5757\u4e0e CommonJS \u6a21\u5757\u7684\u5dee\u5f02",id:"es6-\u6a21\u5757\u4e0e-commonjs-\u6a21\u5757\u7684\u5dee\u5f02",children:[]}],p={toc:c};function u(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"module-\u7684\u52a0\u8f7d\u5b9e\u73b0"},"Module \u7684\u52a0\u8f7d\u5b9e\u73b0"),(0,o.kt)("h2",{id:"\u6d4f\u89c8\u5668\u52a0\u8f7d"},"\u6d4f\u89c8\u5668\u52a0\u8f7d"),(0,o.kt)("h3",{id:"\u4f20\u7edf\u65b9\u6cd5"},"\u4f20\u7edf\u65b9\u6cd5"),(0,o.kt)("p",null,"HTML \u7f51\u9875\u4e2d\uff0c\u6d4f\u89c8\u5668\u901a\u8fc7 ",(0,o.kt)("inlineCode",{parentName:"p"},"<script>")," \u6807\u7b7e\u52a0\u8f7d JavaScript \u811a\u672c"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-html"},'\x3c!-- \u9875\u9762\u5185\u5d4c\u7684\u811a\u672c --\x3e\n<script type="application/javascript">\n  // module code\n<\/script>\n\n\x3c!-- \u5916\u90e8\u811a\u672c --\x3e\n<script type="application/javascript" src="path/to/myModule.js">\n<\/script>\n')),(0,o.kt)("h3",{id:"\u52a0\u8f7d\u89c4\u5219"},"\u52a0\u8f7d\u89c4\u5219"),(0,o.kt)("p",null,"\u6d4f\u89c8\u5668\u52a0\u8f7d ES6 \u6a21\u5757\uff0c\u4e5f\u4f7f\u7528 ",(0,o.kt)("inlineCode",{parentName:"p"},"<script>")," \u6807\u7b7e\uff0c\u4f46\u662f\u8981\u52a0\u5165 ",(0,o.kt)("inlineCode",{parentName:"p"},'type="module"')," \u5c5e\u6027"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-html"},'<script type="module" src="./foo.js"><\/script>\n')),(0,o.kt)("p",null,"\u6d4f\u89c8\u5668\u5bf9\u4e8e\u5e26\u6709 ",(0,o.kt)("inlineCode",{parentName:"p"},'type="module"')," \u7684 ",(0,o.kt)("inlineCode",{parentName:"p"},"<script>"),"\uff0c\u90fd\u662f\u5f02\u6b65\u52a0\u8f7d\uff0c\u4e0d\u4f1a\u9020\u6210\u5835\u585e\u6d4f\u89c8\u5668\uff0c\u5373\u7b49\u5230\u6574\u4e2a\u9875\u9762\u6e32\u67d3\u5b8c\uff0c\u518d\u6267\u884c\u6a21\u5757\u811a\u672c\uff0c\u7b49\u540c\u4e8e\u6253\u5f00\u4e86 ",(0,o.kt)("inlineCode",{parentName:"p"},"<script>")," \u6807\u7b7e\u7684 ",(0,o.kt)("inlineCode",{parentName:"p"},"defer")," \u5c5e\u6027"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-html"},'<script type="module" src="./foo.js"><\/script>\n\x3c!-- \u7b49\u540c\u4e8e --\x3e\n<script type="module" src="./foo.js" defer><\/script>\n')),(0,o.kt)("h2",{id:"es6-\u6a21\u5757\u4e0e-commonjs-\u6a21\u5757\u7684\u5dee\u5f02"},"ES6 \u6a21\u5757\u4e0e CommonJS \u6a21\u5757\u7684\u5dee\u5f02"),(0,o.kt)("p",null,"\u6709\u4e09\u4e2a\u91cd\u5927\u5dee\u5f02"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"CommonJS \u6a21\u5757\u8f93\u51fa\u7684\u662f\u4e00\u4e2a\u503c\u7684\u62f7\u8d1d\uff0cES6 \u6a21\u5757\u8f93\u51fa\u7684\u662f\u503c\u7684\u5f15\u7528"),(0,o.kt)("li",{parentName:"ul"},"CommonJS \u6a21\u5757\u662f\u8fd0\u884c\u65f6\u52a0\u8f7d\uff0cES6 \u6a21\u5757\u662f\u7f16\u8bd1\u65f6\u8f93\u51fa\u63a5\u53e3"),(0,o.kt)("li",{parentName:"ul"},"CommonJS \u6a21\u5757\u7684 ",(0,o.kt)("inlineCode",{parentName:"li"},"require()")," \u662f\u540c\u6b65\u52a0\u8f7d\u6a21\u5757\uff0cES6 \u6a21\u5757\u7684 ",(0,o.kt)("inlineCode",{parentName:"li"},"import")," \u547d\u4ee4\u662f\u5f02\u6b65\u52a0\u8f7d\uff0c\u6709\u4e00\u4e2a\u72ec\u7acb\u7684\u6a21\u5757\u4f9d\u8d56\u7684\u89e3\u6790\u9636\u6bb5")),(0,o.kt)("p",null,"CommonJS \u6a21\u5757\u8f93\u51fa\u7684\u662f\u503c\u7684\u62f7\u8d1d\uff0c\u4e5f\u5c31\u662f\u8bf4\uff0c\u4e00\u65e6\u8f93\u51fa\u4e00\u4e2a\u503c\uff0c\u6a21\u5757\u5185\u90e8\u7684\u53d8\u5316\u5c31\u5f71\u54cd\u4e0d\u5230\u8fd9\u4e2a\u503c"),(0,o.kt)("p",null,"lib.js"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"var counter = 3;\nfunction incCounter() {\n  counter++;\n}\nmodule.exports = {\n  counter: counter,\n  incCounter: incCounter,\n};\n")),(0,o.kt)("p",null,"main.js"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"var mod = require('./lib');\n\nconsole.log(mod.counter);  // 3\nmod.incCounter();\nconsole.log(mod.counter); // 3\n")),(0,o.kt)("p",null,"ES6 \u6a21\u5757\u662f\u52a8\u6001\u5f15\u7528\uff0c\u5e76\u4e14\u4e0d\u4f1a\u7f13\u5b58\u503c\uff0c\u6a21\u5757\u91cc\u9762\u7684\u53d8\u91cf\u7ed1\u5b9a\u5176\u6240\u5728\u7684\u6a21\u5757"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"// lib.js\nexport let counter = 3;\nexport function incCounter() {\n  counter++;\n}\n\n// main.js\nimport { counter, incCounter } from './lib';\nconsole.log(counter); // 3\nincCounter();\nconsole.log(counter); // 4\n")))}u.isMDXComponent=!0}}]);