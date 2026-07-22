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
    <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 font-mono text-xs tracking-widest text-muted hover:text-accent transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        BACK TO ARCHIVE
      </Link>

      {/* Panel judul — cover issue */}
      <header className="panel relative p-6 sm:p-8 mb-12 halftone">
        <span className="absolute -top-3.5 left-4 caption">
          <span>
            [{formatLogDate(typedArticle.published_at)}] ISSUE{" "}
            {formatIssueNumber(issueNumber)} {"//"} {minutes} MIN READ
          </span>
        </span>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl uppercase tracking-wide leading-tight">
          {typedArticle.title}
        </h1>
        {typedArticle.published_at && (
          <time
            dateTime={typedArticle.published_at}
            className="mt-4 block font-mono text-xs text-muted"
          >
            {new Date(typedArticle.published_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        )}
      </header>

      <BlockRenderer blocks={typedArticle.article_blocks} />

      {/* Penutup issue */}
      <div className="mt-14 text-center">
        <span className="caption">
          <span>
            {"//"} END OF ISSUE {formatIssueNumber(issueNumber)} — FIN.
          </span>
        </span>
      </div>
    </article>
  )
}
