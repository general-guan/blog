"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[1963],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>f});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},l=Object.keys(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),p=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},u=function(e){var t=p(e.components);return n.createElement(c.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},s=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,l=e.originalType,c=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),s=p(r),f=a,d=s["".concat(c,".").concat(f)]||s[f]||m[f]||l;return r?n.createElement(d,o(o({ref:t},u),{},{components:r})):n.createElement(d,o({ref:t},u))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=r.length,o=new Array(l);o[0]=s;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:a,o[1]=i;for(var p=2;p<l;p++)o[p]=r[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}s.displayName="MDXCreateElement"},2472:(e,t,r)=>{r.r(t),r.d(t,{contentTitle:()=>o,default:()=>u,frontMatter:()=>l,metadata:()=>i,toc:()=>c});var n=r(7462),a=(r(7294),r(3905));const l={},o="Performance \u9762\u8bd5\u9898",i={unversionedId:"Interview/Performance/Performance",id:"Interview/Performance/Performance",isDocsHomePage:!1,title:"Performance \u9762\u8bd5\u9898",description:"\u4ee3\u7801\u5c42\u9762\uff1a",source:"@site/docs/Interview/Performance/Performance.md",sourceDirName:"Interview/Performance",slug:"/Interview/Performance/Performance",permalink:"/blog/docs/Interview/Performance/Performance",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/Interview/Performance/Performance.md",version:"current",frontMatter:{},sidebar:"front",previous:{title:"Module \u9762\u8bd5\u9898",permalink:"/blog/docs/Interview/Module/Module"},next:{title:"Handle \u9762\u8bd5\u9898",permalink:"/blog/docs/Interview/Handle/Handle"}},c=[],p={toc:c};function u(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"performance-\u9762\u8bd5\u9898"},"Performance \u9762\u8bd5\u9898"),(0,a.kt)("p",null,"\u4ee3\u7801\u5c42\u9762\uff1a"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u9632\u6296\u548c\u8282\u6d41\uff08resize\uff0cscroll\uff0cinput\uff09\u3002"),(0,a.kt)("li",{parentName:"ul"},"\u51cf\u5c11\u56de\u6d41\uff08\u91cd\u6392\uff09\u548c\u91cd\u7ed8\u3002"),(0,a.kt)("li",{parentName:"ul"},"\u4e8b\u4ef6\u59d4\u6258\u3002"),(0,a.kt)("li",{parentName:"ul"},"css \u653e \uff0cjs \u811a\u672c\u653e  \u6700\u5e95\u90e8\u3002"),(0,a.kt)("li",{parentName:"ul"},"\u51cf\u5c11 DOM \u64cd\u4f5c\u3002"),(0,a.kt)("li",{parentName:"ul"},"\u6309\u9700\u52a0\u8f7d\uff0c\u6bd4\u5982 React \u4e2d\u4f7f\u7528 ",(0,a.kt)("inlineCode",{parentName:"li"},"React.lazy")," \u548c ",(0,a.kt)("inlineCode",{parentName:"li"},"React.Suspense")," \uff0c\u901a\u5e38\u9700\u8981\u4e0e webpack \u4e2d\u7684 ",(0,a.kt)("inlineCode",{parentName:"li"},"splitChunks")," \u914d\u5408\u3002")),(0,a.kt)("p",null,"\u6784\u5efa\u65b9\u9762\uff1a"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"\u538b\u7f29\u4ee3\u7801\u6587\u4ef6"),"\uff0c\u5728 webpack \u4e2d\u4f7f\u7528 ",(0,a.kt)("inlineCode",{parentName:"li"},"terser-webpack-plugin")," \u538b\u7f29 Javascript \u4ee3\u7801\uff1b\u4f7f\u7528 ",(0,a.kt)("inlineCode",{parentName:"li"},"css-minimizer-webpack-plugin")," \u538b\u7f29 CSS \u4ee3\u7801\uff1b\u4f7f\u7528 ",(0,a.kt)("inlineCode",{parentName:"li"},"html-webpack-plugin")," \u538b\u7f29 html \u4ee3\u7801\u3002"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"\u5f00\u542f gzip \u538b\u7f29"),"\uff0cwebpack \u4e2d\u4f7f\u7528 ",(0,a.kt)("inlineCode",{parentName:"li"},"compression-webpack-plugin")," \uff0cnode \u4f5c\u4e3a\u670d\u52a1\u5668\u4e5f\u8981\u5f00\u542f\uff0c\u4f7f\u7528 ",(0,a.kt)("inlineCode",{parentName:"li"},"compression"),"\u3002"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"\u5e38\u7528\u7684\u7b2c\u4e09\u65b9\u5e93\u4f7f\u7528 CDN \u670d\u52a1"),"\uff0c\u5728 webpack \u4e2d\u6211\u4eec\u8981\u914d\u7f6e externals\uff0c\u5c06\u6bd4\u5982 React\uff0c Vue \u8fd9\u79cd\u5305\u4e0d\u6253\u5012\u6700\u7ec8\u751f\u6210\u7684\u6587\u4ef6\u4e2d\u3002\u800c\u662f\u91c7\u7528 CDN \u670d\u52a1\u3002")),(0,a.kt)("p",null,"\u5176\u5b83\uff1a"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u4f7f\u7528 http2\u3002\u56e0\u4e3a\u89e3\u6790\u901f\u5ea6\u5feb\uff0c\u5934\u90e8\u538b\u7f29\uff0c\u591a\u8def\u590d\u7528\uff0c\u670d\u52a1\u5668\u63a8\u9001\u9759\u6001\u8d44\u6e90\u3002"),(0,a.kt)("li",{parentName:"ul"},"\u4f7f\u7528\u670d\u52a1\u7aef\u6e32\u67d3\u3002"),(0,a.kt)("li",{parentName:"ul"},"\u56fe\u7247\u538b\u7f29\u3002"),(0,a.kt)("li",{parentName:"ul"},"\u4f7f\u7528 http \u7f13\u5b58\uff0c\u6bd4\u5982\u670d\u52a1\u7aef\u7684\u54cd\u5e94\u4e2d\u6dfb\u52a0 ",(0,a.kt)("inlineCode",{parentName:"li"},"Cache-Control / Expires")," \u3002")))}u.isMDXComponent=!0}}]);