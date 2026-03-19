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

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <span className="font-mono text-sm text-accent">{"// blog"}</span>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold">All Articles</h1>
        <p className="mt-2 text-muted">
          Thoughts on web development, security, and technology.
        </p>
      </div>

      {typedArticles.length === 0 ? (
        <div className="text-center py-20 rounded-xl border border-card-border bg-card-bg">
          <p className="font-mono text-muted">
            <span className="text-accent">$</span> No articles published yet.
            Check back soon...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {typedArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  )
}
