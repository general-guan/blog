"use client";

import { useEffect, type ReactNode } from "react";

// 负责两件事：
// 1. 在客户端注册文章内嵌内容的自定义元素（KaTeX 公式、mermaid 图）
// 2. zenn-content-css 的暗色主题靠 [data-theme^=dark] 切换；
//    首屏主题由 layout.tsx 里的阻塞脚本提前设好，这里只负责跟随系统切换
export function ArticleEmbeds({ children }: { children: ReactNode }) {
  useEffect(() => {
    void import("./embed-elements");

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const applyTheme = () => {
      document.documentElement.dataset.theme = media.matches ? "dark" : "light";
    };
    applyTheme();
    media.addEventListener("change", applyTheme);
    return () => media.removeEventListener("change", applyTheme);
  }, []);

  return <>{children}</>;
}
