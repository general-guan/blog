"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[1829],{3905:function(e,n,t){t.d(n,{Zo:function(){return s},kt:function(){return m}});var r=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var c=r.createContext({}),u=function(e){var n=r.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},s=function(e){var n=u(e.components);return r.createElement(c.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,l=e.originalType,c=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),d=u(t),m=a,f=d["".concat(c,".").concat(m)]||d[m]||p[m]||l;return t?r.createElement(f,i(i({ref:n},s),{},{components:t})):r.createElement(f,i({ref:n},s))}));function m(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var l=t.length,i=new Array(l);i[0]=d;var o={};for(var c in n)hasOwnProperty.call(n,c)&&(o[c]=n[c]);o.originalType=e,o.mdxType="string"==typeof e?e:a,i[1]=o;for(var u=2;u<l;u++)i[u]=t[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},3477:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return o},contentTitle:function(){return c},metadata:function(){return u},toc:function(){return s},default:function(){return d}});var r=t(7462),a=t(3366),l=(t(7294),t(3905)),i=["components"],o={},c="\u57fa\u7840\u7c7b\u578b",u={unversionedId:"TypeScript/basic-types",id:"TypeScript/basic-types",isDocsHomePage:!1,title:"\u57fa\u7840\u7c7b\u578b",description:"\u5e03\u5c14\u503c",source:"@site/docs/TypeScript/basic-types.md",sourceDirName:"TypeScript",slug:"/TypeScript/basic-types",permalink:"/blog/docs/TypeScript/basic-types",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/TypeScript/basic-types.md",version:"current",frontMatter:{},sidebar:"front",previous:{title:"\u5feb\u901f\u4e0a\u624b",permalink:"/blog/docs/TypeScript/quickstart"},next:{title:"\u63a5\u53e3",permalink:"/blog/docs/TypeScript/interfaces"}},s=[{value:"\u5e03\u5c14\u503c",id:"\u5e03\u5c14\u503c",children:[]},{value:"\u6570\u5b57",id:"\u6570\u5b57",children:[]},{value:"\u5b57\u7b26\u4e32",id:"\u5b57\u7b26\u4e32",children:[]},{value:"\u6570\u7ec4",id:"\u6570\u7ec4",children:[]},{value:"\u5143\u7ec4",id:"\u5143\u7ec4",children:[]},{value:"\u679a\u4e3e",id:"\u679a\u4e3e",children:[]},{value:"Any",id:"any",children:[]},{value:"Void",id:"void",children:[]},{value:"Null \u548c Undefined",id:"null-\u548c-undefined",children:[]},{value:"Never",id:"never",children:[]},{value:"Object",id:"object",children:[]},{value:"\u7c7b\u578b\u65ad\u8a00",id:"\u7c7b\u578b\u65ad\u8a00",children:[]}],p={toc:s};function d(e){var n=e.components,t=(0,a.Z)(e,i);return(0,l.kt)("wrapper",(0,r.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"\u57fa\u7840\u7c7b\u578b"},"\u57fa\u7840\u7c7b\u578b"),(0,l.kt)("h2",{id:"\u5e03\u5c14\u503c"},"\u5e03\u5c14\u503c"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"let isDone: boolean = false;\n")),(0,l.kt)("h2",{id:"\u6570\u5b57"},"\u6570\u5b57"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"let decLiteral: number = 6;\nlet hexLiteral: number = 0xf00d;\nlet binaryLiteral: number = 0b1010; // \u4e8c\u8fdb\u5236\nlet octalLiteral: number = 0o744; // \u516b\u8fdb\u5236\nlet notANumber: number = NaN;\nlet infinityNumber: number = Infinity;\n")),(0,l.kt)("h2",{id:"\u5b57\u7b26\u4e32"},"\u5b57\u7b26\u4e32"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"let myName: string = 'Tom';\n")),(0,l.kt)("h2",{id:"\u6570\u7ec4"},"\u6570\u7ec4"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"let list: number[] = [1, 2, 3];\n")),(0,l.kt)("p",null,"\u6570\u7ec4\u6cdb\u578b"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"let list: Array<number> = [1, 2, 3];\n")),(0,l.kt)("h2",{id:"\u5143\u7ec4"},"\u5143\u7ec4"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"let tom: [string, number] = ['Tom', 25];\n")),(0,l.kt)("h2",{id:"\u679a\u4e3e"},"\u679a\u4e3e"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"enum Color {Red, Green, Blue}\nlet c: Color = Color.Green;\n")),(0,l.kt)("h2",{id:"any"},"Any"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"let notSure: any = 4;\n")),(0,l.kt)("h2",{id:"void"},"Void"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},'function warnUser(): void {\n    console.log("This is my warning message");\n}\n')),(0,l.kt)("h2",{id:"null-\u548c-undefined"},"Null \u548c Undefined"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"let u: undefined = undefined;\nlet n: null = null;\n")),(0,l.kt)("h2",{id:"never"},"Never"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"function error(message: string): never {\n    throw new Error(message);\n}\n")),(0,l.kt)("h2",{id:"object"},"Object"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},'declare function create(o: object | null): void;\n\ncreate({ prop: 0 }); // OK\ncreate(null); // OK\n\ncreate(42); // Error\ncreate("string"); // Error\ncreate(false); // Error\ncreate(undefined); // Error\n')),(0,l.kt)("h2",{id:"\u7c7b\u578b\u65ad\u8a00"},"\u7c7b\u578b\u65ad\u8a00"),(0,l.kt)("p",null,"\u5c16\u62ec\u53f7\u8bed\u6cd5"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},'<\u7c7b\u578b>\u503c\n\nlet someValue: any = "this is a string";\n\nlet strLength: number = (<string>someValue).length;\n')),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"as")," \u8bed\u6cd5"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},'\u503c as \u7c7b\u578b\n\nlet someValue: any = "this is a string";\n\nlet strLength: number = (someValue as string).length;\n')),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},"\u6ce8\uff1a"),(0,l.kt)("p",{parentName:"blockquote"},"\u5f53\u5728 TypeScript \u91cc\u4f7f\u7528 JSX \u65f6\uff0c\u53ea\u6709 ",(0,l.kt)("inlineCode",{parentName:"p"},"as")," \u8bed\u6cd5\u662f\u88ab\u5141\u8bb8\u7684")))}d.isMDXComponent=!0}}]);