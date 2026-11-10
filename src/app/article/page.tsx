import type { Metadata } from "next";
import Link from "next/link";
import { listArticles } from "@/lib/wiki";

export const metadata: Metadata = { title: "文章" };

// 文章列表：wiki 目录里每个 md 文件对应 /article/<文件名> 一篇文章
export default function ArticleIndexPage() {
  const articles = listArticles();

  return (
    <div className="article-view">
      <div className="article-container">
        <main className="article-main">
          <div className="article-body">
            <h1 className="article-index-title">文章</h1>
            <ul className="article-index-list">
              {articles.map(({ slug, title }) => (
                <li key={slug}>
                  <Link href={`/article/${slug}`} prefetch={true} className="article-index-link">
                    {title}
                  </Link>
                  <span className="article-index-slug">/article/{slug}</span>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}
