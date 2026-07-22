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
 * Issue Reader — tiap block dirender sebagai panel komik berurutan.
 * Text block = panel narasi (garis slate tipis, tetap nyaman dibaca),
 * image block = panel splash (garis ink bone tebal).
 */
export default function BlockRenderer({ blocks }: BlockRendererProps) {
  const sortedBlocks = [...blocks].sort((a, b) => a.sort_order - b.sort_order)

  return (
    <div className="space-y-8">
      {sortedBlocks.map((block, idx) => {
        if (block.type === "text" && block.content) {
          return (
            <div
              key={block.id}
              className={`panel-soft p-5 sm:p-6 leading-relaxed text-foreground/90 whitespace-pre-wrap ${
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
              className={`panel p-2 w-fit max-w-full ${
                imageAlignmentClass[block.alignment] || "mx-auto"
              } ${idx % 2 === 0 ? "tilt-l" : "tilt-r"}`}
            >
              <img
                src={block.image_url}
                alt=""
                className="max-w-full h-auto block"
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
