import Link from "next/link"
import type { Article, ArticleBlock } from "@/lib/types"
import { firstTextContent, formatLogDate } from "@/lib/comic"

interface ArticleRowProps {
  article: Article & { article_blocks?: ArticleBlock[] }
  /** Nomor kronologis (tertua = 1, terbaru = tertinggi) */
  number: number
}

/** Kolom grid dibagi bersama header tabel di `ArticleTableHead` */
export const ARTICLE_ROW_COLS =
  "sm:grid sm:grid-cols-[3.5rem_7.5rem_minmax(0,1fr)] sm:gap-x-4"

export function ArticleTableHead() {
  return (
    <div
      aria-hidden="true"
      className={`panel-head hidden min-h-0 py-2.5 ${ARTICLE_ROW_COLS}`}
    >
      <span className="panel-label">No.</span>
      <span className="panel-label">Date</span>
      <span className="panel-label">Entry</span>
    </div>
  )
}

export default function ArticleRow({ article, number }: ArticleRowProps) {
  const excerpt = firstTextContent(article.article_blocks)

  return (
    <li>
      <Link
        href={`/blog/${article.slug}`}
        className={`group block px-4 py-4 transition-colors hover:bg-[var(--panel-hover)] focus-visible:bg-[var(--panel-hover)] sm:py-5 ${ARTICLE_ROW_COLS}`}
      >
        <div className="flex items-center gap-3 font-mono text-xs text-faint sm:contents sm:text-[0.8rem]">
          <span className="sm:pt-0.5">{String(number).padStart(2, "0")}</span>
          {article.published_at && (
            <time dateTime={article.published_at} className="text-dim sm:pt-0.5">
              {formatLogDate(article.published_at)}
            </time>
          )}
        </div>

        <div className="mt-1.5 min-w-0 sm:col-start-3 sm:mt-0">
          <h3 className="font-semibold text-bone transition-colors group-hover:text-accent">
            {article.title}
          </h3>
          {excerpt && (
            <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-dim">
              {excerpt}
            </p>
          )}
        </div>
      </Link>
    </li>
  )
}
