import Link from "next/link";
import { listArticles } from "@/lib/wiki";

// 首页：zenn.dev 风格的文章信息流，两列卡片列出 wiki 里的全部文章
export default function Home() {
  const articles = listArticles();

  return (
    <main className="feed-page">
      <div className="feed-container">
        <div className="feed-grid">
          {articles.map(({ slug, title, emoji, date }) => (
            <article key={slug} className="feed-card">
              <Link href={`/article/${slug}`} className="feed-card-emoji">
                {emoji ?? "📝"}
              </Link>
              <div className="feed-card-content">
                <Link href={`/article/${slug}`} className="feed-card-link">
                  <h2 className="feed-card-title">{title}</h2>
                </Link>
                <div className="feed-card-meta">
                  <time className="feed-card-date">{date}</time>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
