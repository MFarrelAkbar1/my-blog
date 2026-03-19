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

export default function BlockRenderer({ blocks }: BlockRendererProps) {
  const sortedBlocks = [...blocks].sort((a, b) => a.sort_order - b.sort_order)

  return (
    <div className="space-y-6">
      {sortedBlocks.map((block) => {
        if (block.type === "text" && block.content) {
          return (
            <div
              key={block.id}
              className={`leading-relaxed text-foreground/90 whitespace-pre-wrap ${
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
              className={`${imageAlignmentClass[block.alignment] || "mx-auto"}`}
            >
              <img
                src={block.image_url}
                alt=""
                className="rounded-lg max-w-full h-auto"
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
