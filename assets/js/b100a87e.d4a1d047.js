"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[6939],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return k}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var i=r.createContext({}),c=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(i.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=c(n),k=a,m=d["".concat(i,".").concat(k)]||d[k]||s[k]||o;return n?r.createElement(m,p(p({ref:t},u),{},{components:n})):r.createElement(m,p({ref:t},u))}));function k(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,p=new Array(o);p[0]=d;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l.mdxType="string"==typeof e?e:a,p[1]=l;for(var c=2;c<o;c++)p[c]=n[c];return r.createElement.apply(null,p)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},162:function(e,t,n){n.r(t),n.d(t,{contentTitle:function(){return i},default:function(){return d},frontMatter:function(){return l},metadata:function(){return c},toc:function(){return u}});var r=n(7462),a=n(3366),o=(n(7294),n(3905)),p=["components"],l={},i="\u5bf9\u8c61",c={unversionedId:"JavaScript/types/object",id:"JavaScript/types/object",isDocsHomePage:!1,title:"\u5bf9\u8c61",description:"\u5c5e\u6027\u7684\u64cd\u4f5c",source:"@site/docs/JavaScript/types/object.md",sourceDirName:"JavaScript/types",slug:"/JavaScript/types/object",permalink:"/blog/docs/JavaScript/types/object",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/JavaScript/types/object.md",version:"current",frontMatter:{},sidebar:"front",previous:{title:"\u5b57\u7b26\u4e32",permalink:"/blog/docs/JavaScript/types/string"},next:{title:"\u51fd\u6570",permalink:"/blog/docs/JavaScript/types/function"}},u=[{value:"\u5c5e\u6027\u7684\u64cd\u4f5c",id:"\u5c5e\u6027\u7684\u64cd\u4f5c",children:[{value:"\u5c5e\u6027\u7684\u67e5\u770b",id:"\u5c5e\u6027\u7684\u67e5\u770b",children:[]},{value:"\u5c5e\u6027\u7684\u5220\u9664",id:"\u5c5e\u6027\u7684\u5220\u9664",children:[]},{value:"\u5c5e\u6027\u662f\u5426\u5b58\u5728",id:"\u5c5e\u6027\u662f\u5426\u5b58\u5728",children:[]},{value:"\u5c5e\u6027\u7684\u904d\u5386",id:"\u5c5e\u6027\u7684\u904d\u5386",children:[]}]}],s={toc:u};function d(e){var t=e.components,n=(0,a.Z)(e,p);return(0,o.kt)("wrapper",(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"\u5bf9\u8c61"},"\u5bf9\u8c61"),(0,o.kt)("h2",{id:"\u5c5e\u6027\u7684\u64cd\u4f5c"},"\u5c5e\u6027\u7684\u64cd\u4f5c"),(0,o.kt)("h3",{id:"\u5c5e\u6027\u7684\u67e5\u770b"},"\u5c5e\u6027\u7684\u67e5\u770b"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"Object.keys")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"var obj = {\n  key1: 1,\n  key2: 2\n};\n\nObject.keys(obj); // ['key1', 'key2']\n")),(0,o.kt)("h3",{id:"\u5c5e\u6027\u7684\u5220\u9664"},"\u5c5e\u6027\u7684\u5220\u9664"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"delete")," \u547d\u4ee4\u7528\u4e8e\u5220\u9664\u5bf9\u8c61\u7684\u5c5e\u6027\uff0c\u5220\u9664\u6210\u529f\u540e\u8fd4\u56de",(0,o.kt)("inlineCode",{parentName:"p"},"true")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'var obj = { p: 1 };\nObject.keys(obj) // ["p"]\n\ndelete obj.p // true\nobj.p // undefined\n')),(0,o.kt)("p",null,"\u53ea\u6709\u4e00\u79cd\u60c5\u51b5\uff0c",(0,o.kt)("inlineCode",{parentName:"p"},"delete")," \u547d\u4ee4\u4f1a\u8fd4\u56de ",(0,o.kt)("inlineCode",{parentName:"p"},"false"),"\uff0c\u90a3\u5c31\u662f\u8be5\u5c5e\u6027\u5b58\u5728\uff0c\u4e14\u4e0d\u5f97\u5220\u9664"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"var obj = Object.defineProperty({}, 'p', {\n  value: 123,\n  configurable: false\n});\n\nobj.p // 123\ndelete obj.p // false\n")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"\u6ce8\uff1a"),(0,o.kt)("p",{parentName:"blockquote"},(0,o.kt)("inlineCode",{parentName:"p"},"delete")," \u547d\u4ee4\u53ea\u80fd\u5220\u9664\u5bf9\u8c61\u672c\u8eab\u7684\u5c5e\u6027\uff0c\u65e0\u6cd5\u5220\u9664\u7ee7\u627f\u7684\u5c5e\u6027")),(0,o.kt)("h3",{id:"\u5c5e\u6027\u662f\u5426\u5b58\u5728"},"\u5c5e\u6027\u662f\u5426\u5b58\u5728"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"in")," \u8fd0\u7b97\u7b26\u7528\u4e8e\u68c0\u67e5\u5bf9\u8c61\u662f\u5426\u5305\u542b\u67d0\u4e2a\u5c5e\u6027\uff0c\u5982\u679c\u5305\u542b\u5c31\u8fd4\u56de ",(0,o.kt)("inlineCode",{parentName:"p"},"true"),"\uff0c\u5426\u5219\u8fd4\u56de ",(0,o.kt)("inlineCode",{parentName:"p"},"false")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"var obj = { p: 1 };\n'p' in obj // true\n'toString' in obj // true\n")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"\u6ce8\uff1a"),(0,o.kt)("p",{parentName:"blockquote"}," \u7ee7\u627f\u7684\u5c5e\u6027\u4e5f\u4e3a ",(0,o.kt)("inlineCode",{parentName:"p"},"true"))),(0,o.kt)("h3",{id:"\u5c5e\u6027\u7684\u904d\u5386"},"\u5c5e\u6027\u7684\u904d\u5386"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"for...in")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"var obj = {a: 1, b: 2, c: 3};\n\nfor (var i in obj) {\n  console.log('\u952e\u540d\uff1a', i);\n  console.log('\u952e\u503c\uff1a', obj[i]);\n}\n// \u952e\u540d\uff1a a\n// \u952e\u503c\uff1a 1\n// \u952e\u540d\uff1a b\n// \u952e\u503c\uff1a 2\n// \u952e\u540d\uff1a c\n// \u952e\u503c\uff1a 3\n")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"\u6ce8\uff1a"),(0,o.kt)("p",{parentName:"blockquote"},"\u904d\u5386\u7684\u662f\u5bf9\u8c61\u6240\u6709\u53ef\u904d\u5386\uff08enumerable\uff09\u7684\u5c5e\u6027\uff0c\u4f1a\u8df3\u8fc7\u4e0d\u53ef\u904d\u5386\u7684\u5c5e\u6027"),(0,o.kt)("p",{parentName:"blockquote"},"\u4e0d\u4ec5\u904d\u5386\u5bf9\u8c61\u81ea\u8eab\u7684\u5c5e\u6027\uff0c\u8fd8\u904d\u5386\u7ee7\u627f\u7684\u5c5e\u6027")),(0,o.kt)("p",null,"\u5982\u679c\u53ea\u60f3\u904d\u5386\u5bf9\u8c61\u81ea\u8eab\u7684\u5c5e\u6027\uff0c\u53ef\u4ee5\u7ed3\u5408 ",(0,o.kt)("inlineCode",{parentName:"p"},"hasOwnProperty")," \u65b9\u6cd5"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"var person = { name: '\u8001\u5f20' };\n\nfor (var key in person) {\n  if (person.hasOwnProperty(key)) {\n    console.log(key);\n  }\n}\n// name\n")))}d.isMDXComponent=!0}}]);