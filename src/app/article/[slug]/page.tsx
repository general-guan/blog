import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "zenn-content-css";
import { ArticleEmbeds } from "../embeds";
import { ArticleToc } from "../toc";
import { listArticles, readArticle, renderArticle, splitTitle, titleFontSizeEm } from "@/lib/wiki";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const markdown = readArticle(slug);
  if (!markdown) return { title: "Not Found" };
  const { title } = splitTitle(markdown);
  return { title: title ?? slug };
}

// 按 wiki 目录里的 md 文件静态生成：/article/001、/article/favorites-website …
export function generateStaticParams() {
  return listArticles().map(({ slug }) => ({ slug }));
}

export default async function ArticlePage({ params }: PageProps<"/article/[slug]">) {
  const { slug } = await params;
  const markdown = readArticle(slug);
  if (!markdown) notFound();

  const { title, emoji, body } = splitTitle(markdown);
  const displayTitle = title ?? slug;
  const { html, toc } = await renderArticle(body);
  const scale = titleFontSizeEm(displayTitle);

  return (
    <div className="article-view">
      <div className="article-container">
        {/* 标题区与 zenn 一致：直接坐在灰色页面背景上，白色卡片从正文才开始 */}
        <header className="article-header">
          {emoji && <div className="article-emoji">{emoji}</div>}
          <h1 className="article-title">
            <span style={scale < 1 ? { fontSize: `${scale}em` } : undefined}>{displayTitle}</span>
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
