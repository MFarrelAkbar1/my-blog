import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import type { Article } from "@/lib/types"
import { formatIssueNumber, formatLogDate } from "@/lib/comic"

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
    <section className="py-20 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <span className="caption">
            <span>[BACK_ISSUES] // latest_posts</span>
          </span>
          <h2 className="mt-4 font-display text-4xl uppercase tracking-wide">
            Latest Articles
          </h2>
        </div>

        {typedArticles.length === 0 ? (
          <div className="panel text-center py-12 px-4 tilt-l">
            <p className="font-mono text-sm text-muted">
              <span className="text-accent">$</span> No issues released yet.
              First issue coming soon...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {typedArticles.map((article, idx) => (
              <Link
                key={article.id}
                href={`/blog/${article.slug}`}
                className={`group relative panel panel-hover p-6 block ${
                  idx % 2 === 0 ? "tilt-l" : "tilt-r"
                }`}
              >
                <span className="caption">
                  <span>
                    [{formatLogDate(article.published_at)}] ISSUE{" "}
                    {formatIssueNumber(totalPublished - idx)}
                  </span>
                </span>
                <h3 className="mt-4 font-display text-xl uppercase tracking-wide leading-snug group-hover:text-accent transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <span className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-accent tracking-widest">
                  READ ISSUE
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        )}

        {typedArticles.length > 0 && (
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 border-2 border-slate-ink px-5 py-2.5 font-mono text-xs tracking-widest text-muted hover:text-accent hover:border-accent transition-colors"
            >
              BROWSE FULL ARCHIVE
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
