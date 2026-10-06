import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import type { Article } from "@/lib/types"
import ArticleRow, { ArticleTableHead } from "@/components/blog/ArticleRow"

export default async function LatestArticles() {
  const supabase = await createClient()

  const { data: articles, count } = await supabase
    .from("articles")
    .select("*", { count: "exact" })
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(3)

  const typedArticles = (articles ?? []) as Article[]
  const totalPublished = count ?? typedArticles.length

  return (
    <section id="issues" className="scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="section-head">
          <h2 className="section-title">Latest Articles</h2>
          <p className="section-caption">
            {typedArticles.length > 0
              ? `${typedArticles.length} of ${totalPublished} entries, newest first`
              : "No entries yet"}
          </p>
        </div>

        {typedArticles.length === 0 ? (
          <div className="panel px-4 py-12 text-center">
            <p className="font-mono text-sm text-dim">
              <span className="text-accent">$</span> No issues released yet.
              First issue coming soon...
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
                  number={totalPublished - idx}
                />
              ))}
            </ol>
          </div>
        )}

        {typedArticles.length > 0 && (
          <div className="mt-6 flex justify-end">
            <Link href="/blog" className="btn btn-secondary group">
              Browse full archive
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
