import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import type { Article } from "@/lib/types"

export default async function LatestArticles() {
  const supabase = await createClient()

  const { data: articles } = await supabase
    .from("articles")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(3)

  const typedArticles = (articles ?? []) as Article[]

  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="font-mono text-sm text-accent">
            {"// latest_posts"}
          </span>
          <h2 className="mt-2 text-3xl font-bold">Latest Articles</h2>
        </div>

        {typedArticles.length === 0 ? (
          <div className="text-center py-12 rounded-xl border border-card-border bg-card-bg">
            <p className="font-mono text-muted">
              <span className="text-accent">$</span> No articles yet. Coming
              soon...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {typedArticles.map((article) => (
              <Link
                key={article.id}
                href={`/blog/${article.slug}`}
                className="group rounded-xl border border-card-border bg-card-bg p-6 transition-all hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5"
              >
                <time className="font-mono text-xs text-muted">
                  {article.published_at
                    ? new Date(article.published_at).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )
                    : ""}
                </time>
                <h3 className="mt-2 text-lg font-semibold group-hover:text-accent transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <span className="mt-4 inline-flex items-center gap-1 text-sm text-accent">
                  Read more
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        )}

        {typedArticles.length > 0 && (
          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors"
            >
              View all articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
