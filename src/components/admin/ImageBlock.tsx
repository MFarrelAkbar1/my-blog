"use client"

import { useState } from "react"
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  GripVertical,
  Trash2,
  ArrowUp,
  ArrowDown,
  Upload,
  Loader2,
  ImageIcon,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export interface ImageBlockData {
  id: string
  type: "image"
  image_url: string
  alignment: "left" | "center" | "right" | "justify"
}

interface ImageBlockProps {
  block: ImageBlockData
  onChange: (block: ImageBlockData) => void
  onDelete: () => void
  onMoveUp: () => void
  onMoveDown: () => void
  isFirst: boolean
  isLast: boolean
}

const alignments: {
  value: ImageBlockData["alignment"]
  icon: typeof AlignLeft
}[] = [
  { value: "left", icon: AlignLeft },
  { value: "center", icon: AlignCenter },
  { value: "right", icon: AlignRight },
  { value: "justify", icon: AlignJustify },
]

export default function ImageBlock({
  block,
  onChange,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: ImageBlockProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError("")

    const supabase = createClient()
    const fileExt = file.name.split(".").pop()
    const fileName = `${crypto.randomUUID()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from("article-images")
      .upload(fileName, file)

    if (uploadError) {
      setError(uploadError.message)
      setUploading(false)
      return
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("article-images").getPublicUrl(fileName)

    onChange({ ...block, image_url: publicUrl })
    setUploading(false)
  }

  return (
    <div className="rounded-xl border border-card-border bg-card-bg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <GripVertical className="h-4 w-4 text-muted" />
          <span className="font-mono text-xs text-muted uppercase">
            Image Block
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

      {block.image_url ? (
        <div className="relative rounded-lg overflow-hidden border border-card-border">
          <img
            src={block.image_url}
            alt="Uploaded"
            className="max-w-full h-auto max-h-64 object-contain mx-auto"
          />
          <div className="absolute top-2 right-2">
            <label className="cursor-pointer rounded-lg bg-background/80 backdrop-blur-sm px-3 py-1.5 text-xs text-muted hover:text-foreground transition-colors border border-card-border">
              Replace
              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-card-border py-10 cursor-pointer hover:border-accent/50 transition-colors">
          {uploading ? (
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          ) : (
            <>
              <ImageIcon className="h-8 w-8 text-muted" />
              <div className="text-center">
                <span className="text-sm text-accent font-medium">
                  Click to upload
                </span>
                <p className="text-xs text-muted mt-1">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
            disabled={uploading}
          />
        </label>
      )}

      {error && (
        <p className="text-sm text-red-400 font-mono mt-2">{error}</p>
      )}

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
