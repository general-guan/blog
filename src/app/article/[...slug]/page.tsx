import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "zenn-content-css";
import { ArticleEmbeds } from "../embeds";
import { ArticleToc } from "../toc";
import { listArticles, readArticle, renderArticle, splitTitle, titleFontSizeEm } from "@/lib/wiki";

type Params = Promise<{ slug: string[] }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const slugPath = (await params).slug.join("/");
  const markdown = readArticle(slugPath);
  if (!markdown) return { title: "Not Found" };
  const { title } = splitTitle(markdown);
  return { title: title ?? slugPath };
}

// 递归按 wiki 目录里的 md 文件静态生成：/article/favorites-website、/article/java/history …
// 子目录文章的 slug 是多段路径（java/history），对应 [...slug] 的数组参数
export function generateStaticParams() {
  return listArticles().map(({ slug }) => ({ slug: slug.split("/") }));
}

// cacheComponents 下 params 属于 URL 数据，须在 <Suspense> 内访问：
// 静态壳先渲染容器结构（避免点击文章卡片时 UI 卡住），正文流式填入
export default function ArticlePage({ params }: PageProps<"/article/[...slug]">) {
  return (
    <div className="article-view">
      <div className="article-container">
        <Suspense fallback={null}>
          <ArticleBody params={params} />
        </Suspense>
      </div>
    </div>
  );
}

async function ArticleBody({ params }: { params: Params }) {
  const slugPath = (await params).slug.join("/");
  const markdown = readArticle(slugPath);
  if (!markdown) notFound();

  const { title, emoji, body } = splitTitle(markdown);
  const displayTitle = title ?? slugPath;
  const { html, toc } = await renderArticle(body);
  const scale = titleFontSizeEm(displayTitle);

  return (
    <>
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
    </>
  );
}
