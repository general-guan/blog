"use client";

import { useEffect, useState, type MouseEvent as ReactMouseEvent } from "react";

export type TocItem = {
  id: string;
  text: string;
  depth: 2 | 3;
};

// 标题滚动到视口顶部多少像素内时，认为它进入了当前阅读位置
const SCROLL_THRESHOLD_PX = 88;

export function ArticleToc({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      let current: string | null = null;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= SCROLL_THRESHOLD_PX) {
          current = item.id;
        } else {
          break;
        }
      }
      // 还没滚到任何标题时，与 zenn 一致地把第一项标记为当前
      setActiveId(current ?? items[0]?.id ?? null);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  const handleClick = (event: ReactMouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
    setActiveId(id);
  };

  // 把扁平的 h2/h3 列表组装成两级树（zenn 的目次只到 h3 为止）
  const sections: { item: TocItem; children: TocItem[] }[] = [];
  for (const item of items) {
    if (item.depth === 2) {
      sections.push({ item, children: [] });
    } else {
      sections[sections.length - 1]?.children.push(item);
    }
  }

  if (items.length === 0) return null;

  const linkClass = (id: string) => (activeId === id ? "active" : undefined);

  return (
    <div className="article-toc">
      <div className="article-toc-title">目次</div>
      <div className="article-toc-list">
        <ol className="ol-depth-1">
          {sections.map(({ item, children }) => (
            <li key={item.id} className={linkClass(item.id)}>
              <a
                href={`#${item.id}`}
                className={linkClass(item.id)}
                onClick={(event) => handleClick(event, item.id)}
                dangerouslySetInnerHTML={{ __html: item.text }}
              />
              {children.length > 0 && (
                <ol className="ol-depth-2">
                  {children.map((child) => (
                    <li key={child.id} className={linkClass(child.id)}>
                      <a
                        href={`#${child.id}`}
                        className={linkClass(child.id)}
                        onClick={(event) => handleClick(event, child.id)}
                        dangerouslySetInnerHTML={{ __html: child.text }}
                      />
                    </li>
                  ))}
                </ol>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
