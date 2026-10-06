import type { ArticleBlock } from "@/lib/types"

interface BlockRendererProps {
  blocks: ArticleBlock[]
}

const alignmentClass: Record<string, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
}

const imageAlignmentClass: Record<string, string> = {
  left: "mr-auto",
  center: "mx-auto",
  right: "ml-auto",
  justify: "mx-auto w-full",
}

/**
 * Merender block artikel berurutan (sort_order).
 * Text block = paragraf dengan alignment-nya, image block = gambar
 * dari Supabase Storage dengan alignment yang sama.
 */
export default function BlockRenderer({ blocks }: BlockRendererProps) {
  const sortedBlocks = [...blocks].sort((a, b) => a.sort_order - b.sort_order)

  return (
    <div className="space-y-6">
      {sortedBlocks.map((block) => {
        if (block.type === "text" && block.content) {
          return (
            <div
              key={block.id}
              className={`prose-body whitespace-pre-wrap ${
                alignmentClass[block.alignment] || "text-left"
              }`}
            >
              {block.content}
            </div>
          )
        }

        if (block.type === "image" && block.image_url) {
          return (
            <figure
              key={block.id}
              className={`w-fit max-w-full overflow-hidden rounded-[var(--radius-sm)] border border-line ${
                imageAlignmentClass[block.alignment] || "mx-auto"
              }`}
            >
              <img
                src={block.image_url}
                alt=""
                className="block h-auto max-w-full"
                loading="lazy"
              />
            </figure>
          )
        }

        return null
      })}
    </div>
  )
}
