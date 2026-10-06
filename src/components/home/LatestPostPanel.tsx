import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import type { ArticleWithBlocks } from "@/lib/types"
import {
  firstTextContent,
  formatLogDate,
  readingTimeMinutes,
} from "@/lib/comic"

export default async function LatestPostPanel() {
  const supabase = await createClient()

  const { data } = await supabase
    .from("articles")
    .select("*, article_blocks(*)")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(1)

  const article = (data?.[0] ?? null) as ArticleWithBlocks | null

  return (
    <section aria-labelledby="latest-post-label" className="panel flex flex-col">
      <div className="panel-head">
        <h2 id="latest-post-label" className="panel-label">
          Latest Post
        </h2>
        {article && (
          <div className="flex items-center gap-1.5">
            {article.published_at && (
              <time dateTime={article.published_at} className="chip">
                {formatLogDate(article.published_at)}
              </time>
            )}
            <span className="chip">
              {readingTimeMinutes(article.article_blocks)} min read
            </span>
          </div>
        )}
      </div>

      {article ? (
        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-xl leading-snug font-semibold text-bone">
            <Link
              href={`/blog/${article.slug}`}
              className="transition-colors hover:text-accent"
            >
              {article.title}
            </Link>
          </h3>
          <p className="mt-3 line-clamp-5 text-sm leading-relaxed text-dim sm:text-[0.95rem]">
            {firstTextContent(article.article_blocks)}
          </p>
          <div className="mt-auto pt-5">
            <Link
              href={`/blog/${article.slug}`}
              className="btn btn-secondary btn-sm group"
            >
              Read post
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center p-8">
          <p className="font-mono text-sm text-dim">
            <span className="text-accent">$</span> Coming soon...
          </p>
        </div>
      )}
    </section>
  )
}
