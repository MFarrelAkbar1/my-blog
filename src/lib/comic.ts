import type { ArticleBlock } from "@/lib/types"

/** Estimasi waktu baca (menit) dari seluruh text block, ~200 kata/menit */
export function readingTimeMinutes(blocks: ArticleBlock[] | undefined): number {
  if (!blocks || blocks.length === 0) return 1
  const words = blocks
    .filter((b) => b.type === "text" && b.content)
    .map((b) => b.content!.trim().split(/\s+/).length)
    .reduce((a, b) => a + b, 0)
  return Math.max(1, Math.round(words / 200))
}

/** Format tanggal gaya log terminal: [2026-07-22] */
export function formatLogDate(dateString: string | null): string {
  if (!dateString) return ""
  return new Date(dateString).toISOString().slice(0, 10)
}

/** Nomor issue dua digit: #04 */
export function formatIssueNumber(n: number): string {
  return `#${String(Math.max(1, n)).padStart(2, "0")}`
}
