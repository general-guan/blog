// <embed-katex> 与 <embed-mermaid> 自定义元素：在浏览器里把服务端输出的
// 数学公式 / mermaid 源码渲染出来。库从 CDN 动态加载，不进打包产物。
// 注意不用 zenn-embed-elements：它的脚本加载器在 CDN 失败后会留下
// 永不清理的轮询 interval，且失败后无法重试。

declare global {
  interface Window {
    katex?: {
      render: (tex: string, element: HTMLElement, options?: Record<string, unknown>) => void;
    };
    mermaid?: {
      initialize: (config: Record<string, unknown>) => void;
      render: (id: string, code: string) => Promise<{ svg: string }>;
    };
  }
}

const loadedScripts = new Map<string, Promise<void>>();

function loadScript(src: string, id: string): Promise<void> {
  const pending = loadedScripts.get(id);
  if (pending) return pending;

  const promise = new Promise<void>((resolve, reject) => {
    // 同 id 的标签已在页面上时（理论上只有本模块会创建）直接认为可用
    if (document.getElementById(id)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.id = id;
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => {
      // 移除失败标签并清掉缓存的 promise，让下一个元素可以重试
      script.remove();
      loadedScripts.delete(id);
      reject(new Error(`Failed to load ${src}`));
    };
    document.head.append(script);
  });
  loadedScripts.set(id, promise);
  return promise;
}

function loadStylesheet(href: string, id: string) {
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = href;
  document.head.append(link);
}

let mermaidReady: Promise<NonNullable<Window["mermaid"]>> | null = null;
let renderCount = 0;

function loadMermaid() {
  if (!mermaidReady) {
    mermaidReady = loadScript(
      "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js",
      "mermaid-js",
    ).then(() => {
      const mermaid = window.mermaid;
      if (!mermaid) throw new Error("mermaid loaded but window.mermaid is missing");
      mermaid.initialize({ startOnLoad: false });
      return mermaid;
    });
    // 失败后允许重试
    mermaidReady.catch(() => {
      mermaidReady = null;
    });
  }
  return mermaidReady;
}

class EmbedKatex extends HTMLElement {
  async connectedCallback() {
    // 首次连接时把公式源码存进 data-source：节点被克隆重连后
    // textContent 已是渲染结果，不能再读
    let tex = this.getAttribute("data-source");
    if (tex === null) {
      tex = this.textContent ?? "";
      if (!tex.trim()) return;
      this.setAttribute("data-source", tex);
    }

    try {
      await loadScript("https://cdn.jsdelivr.net/npm/katex/dist/katex.min.js", "katex-js");
      loadStylesheet("https://cdn.jsdelivr.net/npm/katex/dist/katex.min.css", "katex-css");
      const katex = window.katex;
      if (!katex) throw new Error("katex loaded but window.katex is missing");
      const container = document.createElement("span");
      katex.render(tex, container, {
        displayMode: this.hasAttribute("display-mode"),
        throwOnError: false,
      });
      this.innerHTML = container.innerHTML;
    } catch (error) {
      console.error("embed-katex: 渲染失败", error);
    }
  }
}

class EmbedMermaid extends HTMLElement {
  async connectedCallback() {
    const code = this.getAttribute("data-code");
    if (!code || this.firstChild) return;

    try {
      const mermaid = await loadMermaid();
      const { svg } = await mermaid.render(`embed-mermaid-svg-${++renderCount}`, code);
      this.innerHTML = svg;
    } catch (error) {
      console.error("embed-mermaid: 渲染失败", error);
      const pre = document.createElement("pre");
      pre.textContent = code;
      this.replaceChildren(pre);
    }
  }
}

if (!customElements.get("embed-katex")) {
  customElements.define("embed-katex", EmbedKatex);
}
if (!customElements.get("embed-mermaid")) {
  customElements.define("embed-mermaid", EmbedMermaid);
}

// 标记为 ES 模块，使上方的 declare global 生效
export {};
