import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import BlockRenderer from "@/components/blog/BlockRenderer"
import type { ArticleWithBlocks } from "@/lib/types"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

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

  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-muted hover:text-accent transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to blog
      </Link>

      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
          {typedArticle.title}
        </h1>
        {typedArticle.published_at && (
          <time className="mt-4 block font-mono text-sm text-muted">
            {new Date(typedArticle.published_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        )}
      </header>

      <BlockRenderer blocks={typedArticle.article_blocks} />
    </article>
  )
}
