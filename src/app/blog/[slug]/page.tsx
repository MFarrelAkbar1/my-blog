import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import BlockRenderer from "@/components/blog/BlockRenderer"
import type { ArticleWithBlocks } from "@/lib/types"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import {
  formatIssueNumber,
  formatLogDate,
  readingTimeMinutes,
} from "@/lib/comic"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()

  const { data: article } = await supabase
    .from("articles")
    .select("title")
    .eq("slug", slug)
    .eq("status", "published")
    .single()

  if (!article) {
    return { title: "Article Not Found" }
  }

  return {
    title: article.title,
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: article } = await supabase
    .from("articles")
    .select("*, article_blocks(*)")
    .eq("slug", slug)
    .eq("status", "published")
    .single()

  if (!article) {
    notFound()
  }

  const typedArticle = article as ArticleWithBlocks

  // Nomor issue kronologis: hitung artikel published yang terbit
  // sampai (dan termasuk) artikel ini — tertua = #01
  let issueNumber = 1
  if (typedArticle.published_at) {
    const { count } = await supabase
      .from("articles")
      .select("*", { count: "exact", head: true })
      .eq("status", "published")
      .lte("published_at", typedArticle.published_at)
    issueNumber = count ?? 1
  }

  const minutes = readingTimeMinutes(typedArticle.article_blocks)

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <Link
        href="/blog"
        className="group mb-6 inline-flex items-center gap-1.5 font-mono text-xs tracking-[0.14em] text-dim transition-colors hover:text-accent"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
        BACK TO ARCHIVE
      </Link>

      <div className="panel">
        <div className="panel-head">
          <span className="panel-label">
            Entry {String(issueNumber).padStart(2, "0")}
          </span>
          <div className="flex flex-wrap items-center justify-end gap-1.5">
            {typedArticle.published_at && (
              <time dateTime={typedArticle.published_at} className="chip">
                {formatLogDate(typedArticle.published_at)}
              </time>
            )}
            <span className="chip">{minutes} min read</span>
          </div>
        </div>

        <div className="px-5 py-8 sm:px-10 sm:py-10">
          <header className="mb-8 border-b border-line pb-6">
            <h1 className="text-3xl leading-tight font-light tracking-tight text-bone sm:text-4xl">
              {typedArticle.title}
            </h1>
            {typedArticle.published_at && (
              <p className="mt-3 text-sm text-dim">
                {new Date(typedArticle.published_at).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </p>
            )}
          </header>

          <BlockRenderer blocks={typedArticle.article_blocks} />
        </div>

        <div className="border-t border-line px-5 py-3 text-center sm:px-10">
          <span className="font-mono text-[11px] tracking-[0.14em] text-faint">
            {"//"} END OF ISSUE {formatIssueNumber(issueNumber)}
          </span>
        </div>
      </div>
    </article>
  )
}
