"use client"

import { Plus, Type, ImageIcon } from "lucide-react"
import TextBlock, { type TextBlockData } from "./TextBlock"
import ImageBlockComponent, { type ImageBlockData } from "./ImageBlock"

export type BlockData = TextBlockData | ImageBlockData

interface BlockEditorProps {
  blocks: BlockData[]
  onChange: (blocks: BlockData[]) => void
}

export default function BlockEditor({ blocks, onChange }: BlockEditorProps) {
  function addTextBlock() {
    const newBlock: TextBlockData = {
      id: crypto.randomUUID(),
      type: "text",
      content: "",
      alignment: "left",
    }
    onChange([...blocks, newBlock])
  }

  function addImageBlock() {
    const newBlock: ImageBlockData = {
      id: crypto.randomUUID(),
      type: "image",
      image_url: "",
      alignment: "center",
    }
    onChange([...blocks, newBlock])
  }

  function updateBlock(index: number, updatedBlock: BlockData) {
    const newBlocks = [...blocks]
    newBlocks[index] = updatedBlock
    onChange(newBlocks)
  }

  function deleteBlock(index: number) {
    onChange(blocks.filter((_, i) => i !== index))
  }

  function moveBlock(index: number, direction: "up" | "down") {
    const newBlocks = [...blocks]
    const swapIndex = direction === "up" ? index - 1 : index + 1
    ;[newBlocks[index], newBlocks[swapIndex]] = [
      newBlocks[swapIndex],
      newBlocks[index],
    ]
    onChange(newBlocks)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-muted uppercase">
          Content Blocks
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={addTextBlock}
            className="inline-flex items-center gap-1.5 rounded-lg border border-card-border px-3 py-1.5 text-xs text-muted hover:text-accent hover:border-accent/50 transition-colors"
          >
            <Type className="h-3.5 w-3.5" />
            Add Text
          </button>
          <button
            type="button"
            onClick={addImageBlock}
            className="inline-flex items-center gap-1.5 rounded-lg border border-card-border px-3 py-1.5 text-xs text-muted hover:text-accent hover:border-accent/50 transition-colors"
          >
            <ImageIcon className="h-3.5 w-3.5" />
            Add Image
          </button>
        </div>
      </div>

      {blocks.length === 0 ? (
        <div className="text-center py-12 rounded-xl border-2 border-dashed border-card-border">
          <Plus className="h-8 w-8 text-muted mx-auto mb-3" />
          <p className="text-sm text-muted">
            No blocks yet. Add a text or image block to start.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {blocks.map((block, index) => {
            if (block.type === "text") {
              return (
                <TextBlock
                  key={block.id}
                  block={block}
                  onChange={(updated) => updateBlock(index, updated)}
                  onDelete={() => deleteBlock(index)}
                  onMoveUp={() => moveBlock(index, "up")}
                  onMoveDown={() => moveBlock(index, "down")}
                  isFirst={index === 0}
                  isLast={index === blocks.length - 1}
                />
              )
            }
            return (
              <ImageBlockComponent
                key={block.id}
                block={block}
                onChange={(updated) => updateBlock(index, updated)}
                onDelete={() => deleteBlock(index)}
                onMoveUp={() => moveBlock(index, "up")}
                onMoveDown={() => moveBlock(index, "down")}
                isFirst={index === 0}
                isLast={index === blocks.length - 1}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
