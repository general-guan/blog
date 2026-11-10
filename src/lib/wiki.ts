import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import markdownToHtml from "zenn-markdown-html";
import type { TocItem } from "@/app/article/toc";

const WIKI_DIR = join(process.cwd(), "src", "wiki");

// 每次都直接读文件（开发时修改 wiki 文件立即生效）
// slug 可含子路径（如 java/history），对应 wiki 目录的子目录结构
export function readArticle(slug: string): string | null {
  // 每段只允许字母数字与常见符号，防路径穿越（.. 的首字符不是字母数字，天然被拒）
  const segments = slug.split("/");
  if (segments.some((s) => !/^[\p{L}\p{N}][\p{L}\p{N}._-]*$/u.test(s))) return null;
  try {
    return readFileSync(join(WIKI_DIR, `${slug}.md`), "utf8");
  } catch {
    return null;
  }
}

// 递归列出 wiki 目录下所有文章（首页信息流 / 列表页 / generateStaticParams 用）
export function listArticles(): {
  slug: string;
  title: string;
  emoji: string | null;
  date: string;
}[] {
  return readdirSync(WIKI_DIR, { recursive: true, encoding: "utf8" })
    .filter((name) => name.endsWith(".md"))
    .map((name) => {
      // recursive 扫描在 Windows 上以 \ 分隔层级，统一成 /；
      // slug 为去掉 .md 后缀的相对路径，如 java/history
      const slug = name.replaceAll("\\", "/").slice(0, -3);
      const { title, emoji } = splitTitle(readFileSync(join(WIKI_DIR, name), "utf8"));
      // 文件修改时间作为展示日期（YYYY/MM/DD）
      const mtime = statSync(join(WIKI_DIR, name)).mtime;
      const pad = (n: number) => String(n).padStart(2, "0");
      const date = `${mtime.getFullYear()}/${pad(mtime.getMonth() + 1)}/${pad(mtime.getDate())}`;
      return { slug, title: title ?? slug, emoji, date };
    })
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

// 首行 h1 作为文章标题，从正文中拆出（zenn 不在正文里重复渲染标题）。
// 文件没有首行 h1 时 title 为 null，由调用方回退（如用 slug 作标题）
export function splitTitle(markdown: string): {
  title: string | null;
  emoji: string | null;
  body: string;
} {
  const normalized = markdown.replace(/\r\n/g, "\n");
  const newlineIndex = normalized.indexOf("\n");
  const firstLine = (newlineIndex === -1 ? normalized : normalized.slice(0, newlineIndex)).trim();
  const match = firstLine.match(/^#\s+(.+)$/);
  if (!match) return { title: null, emoji: null, body: normalized };

  const rawTitle = match[1].trim();
  // 标题开头的 emoji 单独提取，渲染成大图标（zenn 文章头样式）
  const emojiMatch = rawTitle.match(
    /^((?:\p{Extended_Pictographic}(?:‍\p{Extended_Pictographic}|️)*|[#*0-9]️?⃣))\s*/u,
  );
  const emoji = emojiMatch?.[1] ?? null;
  const title = emojiMatch ? rawTitle.slice(emojiMatch[0].length).trim() : rawTitle;
  return { title: title || null, emoji, body: normalized.slice(newlineIndex + 1) };
}

// 与 zenn 一致：过长的标题按比例缩小，CJK 字符按全角宽度计
export function titleFontSizeEm(title: string): number {
  const width = [...title].reduce(
    (sum, ch) => sum + (/[⺀-鿿豈-﫿！-｠　-〿]/.test(ch) ? 1 : 0.5),
    0,
  );
  return width > 19 ? Math.max(0.7, 19 / width) : 1;
}

function escapeHtml(source: string): string {
  return source
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

type CardData = {
  url: string;
  title: string;
  description: string | null;
  image: string | null;
  host: string;
};

// 抓取目标网页的 OG 元数据生成卡片数据；失败时降级为纯 URL 卡片
async function fetchCardData(url: string): Promise<CardData> {
  const host = new URL(url).host;
  const fallback: CardData = { url, title: host, description: null, image: null, host };
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(8000),
      headers: { "User-Agent": "Mozilla/5.0 (compatible; blog-card-fetcher)" },
      redirect: "follow",
    });
    if (!res.ok) return fallback;

    const buffer = await res.arrayBuffer();
    // 按页面声明的字符集解码（部分中文站点是 GBK）
    let html = new TextDecoder("utf-8").decode(buffer);
    const charset = html.match(/<meta[^>]+charset=["']?([\w-]+)/i)?.[1];
    if (charset && !/utf-?8/i.test(charset)) {
      try {
        html = new TextDecoder(charset.toLowerCase()).decode(buffer);
      } catch {
        // 不支持的字符集就保留 utf-8 结果
      }
    }

    const decodeEntities = (value: string) =>
      value
        .replaceAll("&amp;", "&")
        .replaceAll("&lt;", "<")
        .replaceAll("&gt;", ">")
        .replaceAll("&quot;", '"')
        .replaceAll("&#39;", "'");

    const metas = [...html.matchAll(/<meta\b[^>]*>/gi)].map((tag) => ({
      key:
        tag[0].match(/\b(?:property|name)=["']([^"']+)["']/i)?.[1]?.toLowerCase() ?? "",
      content: tag[0].match(/\bcontent=["']([^"']*)["']/i)?.[1] ?? "",
    }));
    const meta = (key: string) => decodeEntities(
      metas.find((m) => m.key === key)?.content.trim() ?? "",
    );

    // 折叠标题里的换行/连续空白（<title> 标签常带换行排版）
    const title = (meta("og:title") ||
      decodeEntities(html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] ?? ""))
      .replace(/\s+/g, " ")
      .trim();
    const description = meta("og:description") || meta("description");
    const rawImage = meta("og:image");
    let image: string | null = null;
    if (rawImage) {
      try {
        const resolved = new URL(rawImage, url);
        image = /^https?:$/.test(resolved.protocol) ? resolved.toString() : null;
      } catch {
        image = null;
      }
    }

    return {
      url,
      title: title || host,
      description: description || null,
      image,
      host,
    };
  } catch {
    return fallback;
  }
}

function renderCardHtml(card: CardData): string {
  const image =
    card.image && /^https?:\/\//.test(card.image) ? escapeHtml(card.image) : null;
  return (
    `<a class="wiki-card" href="${escapeHtml(card.url)}" target="_blank" rel="noopener noreferrer nofollow">` +
    `<span class="wiki-card-main">` +
    `<span class="wiki-card-title">${escapeHtml(card.title)}</span>` +
    (card.description
      ? `<span class="wiki-card-description">${escapeHtml(card.description)}</span>`
      : "") +
    `<span class="wiki-card-host">${escapeHtml(card.host)}</span>` +
    `</span>` +
    (image ? `<span class="wiki-card-thumb" style="background-image:url('${image}')"></span>` : "") +
    `</a>`
  );
}

// zenn-markdown-html 里 @[card](url) 等链接卡片需要服务端抓取网页元数据，
// 不配置 embedOrigin 时只会退化成普通链接。
// 这里借 customEmbed 钩子接管 card：先输出能通过 sanitize 的占位 div，
// 再自己抓取 OG 元数据、按 zenn 卡片样式渲染，无外部服务依赖。
// mermaid 同理替换成 <embed-mermaid> 自定义元素。
// 内部的 shiki 高亮用了 crypto.getRandomValues()，
// cacheComponents 预渲染要求确定性，因此用 "use cache" 缓存转换结果。
// 缓存键包含 markdown 内容，同一篇文章内容不变就命中缓存
export async function renderArticle(markdown: string): Promise<{ html: string; toc: TocItem[] }> {
  "use cache";
  const cardUrls: string[] = [];
  const html = await markdownToHtml(markdown, {
    customEmbed: {
      mermaid: (source) => `<div class="embed-mermaid">${escapeHtml(source)}</div>`,
      card: (url) => {
        cardUrls.push(url);
        return `<div class="embed-card-placeholder">${escapeHtml(url)}</div>`;
      },
    },
  });
  // sanitize 会把占位 div 文本里的 &quot; 解码成裸引号再输出（它对文本只转义 & < >），
  // 所以插回属性前必须把捕获组里的引号重新转义；& < > 已是转义态，不能再处理
  const replaced = html.replace(
    /<div class="embed-mermaid">([\s\S]*?)<\/div>/g,
    (_, code: string) =>
      `<embed-mermaid data-code="${code.replaceAll('"', "&quot;")}"></embed-mermaid>`,
  );

  // 占位符在文档里的出现顺序与 cardUrls 一致，按顺序换成卡片
  let withCards = replaced;
  if (cardUrls.length > 0) {
    const cards = new Map<string, CardData>();
    await Promise.all(
      cardUrls.map(async (url) => {
        if (!cards.has(url)) cards.set(url, await fetchCardData(url));
      }),
    );
    let index = 0;
    withCards = replaced.replace(
      /<div class="embed-card-placeholder">([\s\S]*?)<\/div>/g,
      () => renderCardHtml(cards.get(cardUrls[index++])!),
    );
  }

  return { html: withCards, toc: extractToc(withCards) };
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
