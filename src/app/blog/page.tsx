import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import ArticleCard from "@/components/blog/ArticleCard"
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
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 halftone">
      <div className="mb-14">
        <span className="caption">
          <span>[BACK_ISSUE_ARCHIVE] // blog</span>
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl uppercase tracking-wide">
          All Issues
        </h1>
        <p className="mt-3 font-mono text-sm text-muted">
          Thoughts on web development, security, and technology — one issue at
          a time.
        </p>
      </div>

      {typedArticles.length === 0 ? (
        <div className="panel text-center py-20 px-4 tilt-l">
          <p className="font-mono text-sm text-muted">
            <span className="text-accent">$</span> No issues released yet.
            Check back soon...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {typedArticles.map((article, idx) => (
            <ArticleCard
              key={article.id}
              article={article}
              issueNumber={total - idx}
              tilt={idx % 2 === 0 ? "l" : "r"}
            />
          ))}
        </div>
      )}
    </div>
  )
}
