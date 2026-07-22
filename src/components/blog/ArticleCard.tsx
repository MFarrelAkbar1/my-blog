import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Article, ArticleBlock } from "@/lib/types"
import {
  formatIssueNumber,
  formatLogDate,
  readingTimeMinutes,
} from "@/lib/comic"

interface ArticleCardProps {
  article: Article & { article_blocks?: ArticleBlock[] }
  /** Nomor issue kronologis (tertua = #01) */
  issueNumber?: number
  /** Kemiringan paste-up bergantian dari parent grid */
  tilt?: "l" | "r"
}

export default function ArticleCard({
  article,
  issueNumber,
  tilt = "l",
}: ArticleCardProps) {
  const firstTextBlock = article.article_blocks?.find(
    (b) => b.type === "text" && b.content
  )
  const excerpt = firstTextBlock?.content
    ? firstTextBlock.content.length > 150
      ? firstTextBlock.content.slice(0, 150) + "..."
      : firstTextBlock.content
    : ""
  const minutes = readingTimeMinutes(article.article_blocks)

  return (
    <Link
      href={`/blog/${article.slug}`}
      className={`group relative panel panel-hover p-6 block ${
        tilt === "l" ? "tilt-l" : "tilt-r"
      }`}
    >
      <span className="caption">
        <span>
          [{formatLogDate(article.published_at)}]
          {issueNumber ? ` ISSUE ${formatIssueNumber(issueNumber)}` : ""}{" "}
          {"//"} {minutes} MIN
        </span>
      </span>
      <h2 className="mt-4 font-display text-xl uppercase tracking-wide leading-snug group-hover:text-accent transition-colors line-clamp-2">
        {article.title}
      </h2>
      {excerpt && (
        <p className="mt-3 text-sm text-muted line-clamp-3 leading-relaxed">
          {excerpt}
        </p>
      )}
      <span className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-accent tracking-widest">
        READ ISSUE
        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  )
}
