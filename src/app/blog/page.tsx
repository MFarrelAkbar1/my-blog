import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import ArticleRow, { ArticleTableHead } from "@/components/blog/ArticleRow"
import type { Article, ArticleBlock } from "@/lib/types"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles about web development, TypeScript, PHP, cybersecurity, and more by Muhammad Farrel Akbar.",
}

export default async function BlogPage() {
  const supabase = await createClient()

  const { data: articles } = await supabase
    .from("articles")
    .select("*, article_blocks(*)")
    .eq("status", "published")
    .order("published_at", { ascending: false })

  const typedArticles = (articles ?? []) as (Article & {
    article_blocks: ArticleBlock[]
  })[]
  const total = typedArticles.length

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <header className="section-head">
        <h1 className="section-title sm:text-5xl">Blog</h1>
        <p className="section-caption">
          {total} {total === 1 ? "entry" : "entries"}, newest first
        </p>
      </header>

      <p className="-mt-2 mb-6 text-sm text-dim">
        Thoughts on web development, security, and technology — one issue at a
        time.
      </p>

      {total === 0 ? (
        <div className="panel px-4 py-20 text-center">
          <p className="font-mono text-sm text-dim">
            <span className="text-accent">$</span> No issues released yet.
            Check back soon...
          </p>
        </div>
      ) : (
        <div className="panel overflow-hidden">
          <ArticleTableHead />
          <ol className="divide-y divide-line">
            {typedArticles.map((article, idx) => (
              <ArticleRow
                key={article.id}
                article={article}
                number={total - idx}
              />
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}
