import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Article, ArticleBlock } from "@/lib/types"

interface ArticleCardProps {
  article: Article & { article_blocks?: ArticleBlock[] }
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const firstTextBlock = article.article_blocks?.find(
    (b) => b.type === "text" && b.content
  )
  const excerpt = firstTextBlock?.content
    ? firstTextBlock.content.length > 150
      ? firstTextBlock.content.slice(0, 150) + "..."
      : firstTextBlock.content
    : ""

  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group rounded-xl border border-card-border bg-card-bg p-6 transition-all hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5"
    >
      <time className="font-mono text-xs text-muted">
        {article.published_at
          ? new Date(article.published_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : ""}
      </time>
      <h2 className="mt-2 text-xl font-semibold group-hover:text-accent transition-colors line-clamp-2">
        {article.title}
      </h2>
      {excerpt && (
        <p className="mt-3 text-sm text-muted line-clamp-3">{excerpt}</p>
      )}
      <span className="mt-4 inline-flex items-center gap-1 text-sm text-accent">
        Read more
        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  )
}
