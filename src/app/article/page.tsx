import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import markdownToHtml from "zenn-markdown-html";
import "zenn-content-css";
import { ArticleEmbeds } from "./embeds";
import { ArticleToc, type TocItem } from "./toc";

const ARTICLE_FILE = join(process.cwd(), "src", "wiki", "001.md");

// 每次渲染都读文件（而不是模块加载时读一次）：
// 开发时修改 001.md 后内容变化会让 "use cache" 的键变化，页面立即更新
function readArticle(): string {
  return readFileSync(ARTICLE_FILE, "utf8");
}

function escapeHtml(source: string): string {
  return source
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

// 首行 h1 作为文章标题，从正文中拆出（zenn 不在正文里重复渲染标题）
function splitTitle(markdown: string): { title: string; emoji: string | null; body: string } {
  const normalized = markdown.replace(/\r\n/g, "\n");
  const newlineIndex = normalized.indexOf("\n");
  const firstLine = (newlineIndex === -1 ? normalized : normalized.slice(0, newlineIndex)).trim();
  const match = firstLine.match(/^#\s+(.+)$/);
  if (!match) return { title: "Article", emoji: null, body: normalized };

  const rawTitle = match[1].trim();
  // 标题开头的 emoji 单独提取，渲染成大图标（zenn 文章头样式）
  const emojiMatch = rawTitle.match(
    /^((?:\p{Extended_Pictographic}(?:‍\p{Extended_Pictographic}|️)*|[#*0-9]️?⃣))\s*/u,
  );
  const emoji = emojiMatch?.[1] ?? null;
  const title = emojiMatch ? rawTitle.slice(emojiMatch[0].length).trim() : rawTitle;
  return { title, emoji, body: normalized.slice(newlineIndex + 1) };
}

// 与 zenn 一致：过长的标题按比例缩小，CJK 字符按全角宽度计
function titleFontSizeEm(title: string): number {
  const width = [...title].reduce(
    (sum, ch) => sum + (/[⺀-鿿豈-﫿！-｠　-〿]/.test(ch) ? 1 : 0.5),
    0,
  );
  return width > 19 ? Math.max(0.7, 19 / width) : 1;
}

// zenn-markdown-html 只会把 mermaid 输出为普通代码块，
// 这里借 customEmbed 钩子把它替换成能通过 sanitize 的占位 div，
// 再在 sanitize 之后的 HTML 里换成 <embed-mermaid> 自定义元素。
// 内部的 shiki 高亮用了 crypto.getRandomValues()，
// cacheComponents 预渲染要求确定性，因此用 "use cache" 缓存转换结果
async function renderArticle(markdown: string): Promise<{ html: string; toc: TocItem[] }> {
  "use cache";
  const html = await markdownToHtml(markdown, {
    customEmbed: {
      mermaid: (source) => `<div class="embed-mermaid">${escapeHtml(source)}</div>`,
    },
  });
  // sanitize 会把占位 div 文本里的 &quot; 解码成裸引号再输出（它对文本只转义 & < >），
  // 所以插回属性前必须把捕获组里的引号重新转义；& < > 已是转义态，不能再处理
  const replaced = html.replace(
    /<div class="embed-mermaid">([\s\S]*?)<\/div>/g,
    (_, code: string) =>
      `<embed-mermaid data-code="${code.replaceAll('"', "&quot;")}"></embed-mermaid>`,
  );
  return { html: replaced, toc: extractToc(replaced) };
}

// 从渲染结果里收集 h2/h3 生成目次（id 与正文锚点一致）
function extractToc(html: string): TocItem[] {
  const items: TocItem[] = [];
  for (const match of html.matchAll(/<h([23]) id="([^"]*)"[^>]*>([\s\S]*?)<\/h\1>/g)) {
    items.push({
      depth: Number(match[1]) as 2 | 3,
      id: match[2],
      text: match[3].replace(/<[^>]+>/g, "").trim(),
    });
  }
  return items;
}

export async function generateMetadata(): Promise<Metadata> {
  const { title } = splitTitle(readArticle());
  return { title };
}

export default async function ArticlePage() {
  const { title, emoji, body } = splitTitle(readArticle());
  const { html, toc } = await renderArticle(body);
  const scale = titleFontSizeEm(title);

  return (
    <div className="article-view">
      <div className="article-container">
        {/* 标题区与 zenn 一致：直接坐在灰色页面背景上，白色卡片从正文才开始 */}
        <header className="article-header">
          {emoji && <div className="article-emoji">{emoji}</div>}
          <h1 className="article-title">
            <span style={scale < 1 ? { fontSize: `${scale}em` } : undefined}>{title}</span>
          </h1>
        </header>
        <div className="article-columns">
          <main className="article-main">
            <div className="article-body">
              <ArticleEmbeds>
                <article className="znc" dangerouslySetInnerHTML={{ __html: html }} />
              </ArticleEmbeds>
            </div>
          </main>
          <aside className="article-sidebar">
            <div className="article-sidebar-sticky">
              <ArticleToc items={toc} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
