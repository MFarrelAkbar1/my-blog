"use client"

import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  GripVertical,
  Trash2,
  ArrowUp,
  ArrowDown,
} from "lucide-react"

export interface TextBlockData {
  id: string
  type: "text"
  content: string
  alignment: "left" | "center" | "right" | "justify"
}

interface TextBlockProps {
  block: TextBlockData
  onChange: (block: TextBlockData) => void
  onDelete: () => void
  onMoveUp: () => void
  onMoveDown: () => void
  isFirst: boolean
  isLast: boolean
}

const alignments: { value: TextBlockData["alignment"]; icon: typeof AlignLeft }[] = [
  { value: "left", icon: AlignLeft },
  { value: "center", icon: AlignCenter },
  { value: "right", icon: AlignRight },
  { value: "justify", icon: AlignJustify },
]

export default function TextBlock({
  block,
  onChange,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: TextBlockProps) {
  return (
    <div className="rounded-xl border border-card-border bg-card-bg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <GripVertical className="h-4 w-4 text-muted" />
          <span className="font-mono text-xs text-muted uppercase">
            Text Block
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onMoveUp}
            disabled={isFirst}
            className="rounded p-1 text-muted hover:text-foreground disabled:opacity-30 transition-colors"
            title="Move up"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={isLast}
            className="rounded p-1 text-muted hover:text-foreground disabled:opacity-30 transition-colors"
            title="Move down"
          >
            <ArrowDown className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="rounded p-1 text-muted hover:text-red-400 transition-colors"
            title="Delete block"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <textarea
        value={block.content}
        onChange={(e) => onChange({ ...block, content: e.target.value })}
        placeholder="Write your content here..."
        rows={5}
        className="w-full rounded-lg border border-card-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent resize-y"
      />

      <div className="flex items-center gap-1 mt-3">
        {alignments.map(({ value, icon: Icon }) => (
          <button
            key={value}
            type="button"
            onClick={() => onChange({ ...block, alignment: value })}
            className={`rounded p-2 transition-colors ${
              block.alignment === value
                ? "bg-accent/10 text-accent"
                : "text-muted hover:text-foreground"
            }`}
            title={`Align ${value}`}
          >
            <Icon className="h-4 w-4" />
          </button>
        ))}
      </div>
    </div>
  )
}
