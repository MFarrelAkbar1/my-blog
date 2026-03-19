"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import BlockEditor, { type BlockData } from "./BlockEditor"
import type { ArticleWithBlocks } from "@/lib/types"
import { Loader2, Save, ArrowLeft, Check } from "lucide-react"
import Link from "next/link"

interface ArticleFormProps {
  articleId?: string
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export default function ArticleForm({ articleId }: ArticleFormProps) {
  const router = useRouter()
  const supabase = createClient()

  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [status, setStatus] = useState<"draft" | "published">("draft")
  const [blocks, setBlocks] = useState<BlockData[]>([])
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(!!articleId)
  const [toast, setToast] = useState<{
    message: string
    type: "success" | "error"
  } | null>(null)
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false)

  useEffect(() => {
    if (articleId) {
      loadArticle(articleId)
    }
  }, [articleId])

  useEffect(() => {
    if (!slugManuallyEdited) {
      setSlug(slugify(title))
    }
  }, [title, slugManuallyEdited])

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  async function loadArticle(id: string) {
    const { data, error } = await supabase
      .from("articles")
      .select("*, article_blocks(*)")
      .eq("id", id)
      .single()

    if (error || !data) {
      setToast({ message: "Failed to load article", type: "error" })
      setLoading(false)
      return
    }

    const article = data as ArticleWithBlocks
    setTitle(article.title)
    setSlug(article.slug)
    setStatus(article.status)
    setSlugManuallyEdited(true)

    const sortedBlocks = [...article.article_blocks].sort(
      (a, b) => a.sort_order - b.sort_order
    )

    const editorBlocks: BlockData[] = sortedBlocks.map((b) => {
      if (b.type === "text") {
        return {
          id: b.id,
          type: "text" as const,
          content: b.content ?? "",
          alignment: b.alignment,
        }
      }
      return {
        id: b.id,
        type: "image" as const,
        image_url: b.image_url ?? "",
        alignment: b.alignment,
      }
    })

    setBlocks(editorBlocks)
    setLoading(false)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()

    if (!title.trim() || !slug.trim()) {
      setToast({ message: "Title and slug are required", type: "error" })
      return
    }

    setSaving(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    const articleData = {
      title: title.trim(),
      slug: slug.trim(),
      status,
      published_at:
        status === "published" ? new Date().toISOString() : null,
      author_id: user?.id ?? null,
    }

    let savedArticleId = articleId

    if (articleId) {
      // Update existing article
      const { error } = await supabase
        .from("articles")
        .update(articleData)
        .eq("id", articleId)

      if (error) {
        setToast({ message: `Error: ${error.message}`, type: "error" })
        setSaving(false)
        return
      }

      // Delete old blocks
      await supabase
        .from("article_blocks")
        .delete()
        .eq("article_id", articleId)
    } else {
      // Create new article
      const { data, error } = await supabase
        .from("articles")
        .insert(articleData)
        .select("id")
        .single()

      if (error || !data) {
        setToast({ message: `Error: ${error?.message}`, type: "error" })
        setSaving(false)
        return
      }

      savedArticleId = data.id
    }

    // Insert blocks
    if (blocks.length > 0 && savedArticleId) {
      const blockInserts = blocks.map((block, index) => ({
        article_id: savedArticleId,
        type: block.type,
        content: block.type === "text" ? (block as { content: string }).content : null,
        image_url:
          block.type === "image"
            ? (block as { image_url: string }).image_url
            : null,
        alignment: block.alignment,
        sort_order: index,
      }))

      const { error: blockError } = await supabase
        .from("article_blocks")
        .insert(blockInserts)

      if (blockError) {
        setToast({
          message: `Article saved, but blocks error: ${blockError.message}`,
          type: "error",
        })
        setSaving(false)
        return
      }
    }

    setToast({
      message: articleId ? "Article updated!" : "Article created!",
      type: "success",
    })
    setSaving(false)

    if (!articleId && savedArticleId) {
      router.push(`/admin/dashboard/editor/${savedArticleId}`)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-accent" />
      </div>
    )
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Toast notification */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 rounded-lg px-4 py-3 text-sm font-medium shadow-lg flex items-center gap-2 ${
            toast.type === "success"
              ? "bg-accent text-background"
              : "bg-red-500 text-white"
          }`}
        >
          {toast.type === "success" && <Check className="h-4 w-4" />}
          {toast.message}
        </div>
      )}

      <div className="flex items-center justify-between">
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center gap-1 text-sm text-muted hover:text-accent transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-background hover:bg-accent-hover transition-colors disabled:opacity-50"
        >
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-muted mb-1.5">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Article title"
            required
            className="w-full rounded-lg border border-card-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted mb-1.5">
            Slug
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value)
              setSlugManuallyEdited(true)
            }}
            placeholder="article-slug"
            required
            className="w-full rounded-lg border border-card-border bg-background px-4 py-2.5 text-sm font-mono text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-muted mb-1.5">
          Status
        </label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setStatus("draft")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              status === "draft"
                ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/30"
                : "border border-card-border text-muted hover:text-foreground"
            }`}
          >
            Draft
          </button>
          <button
            type="button"
            onClick={() => setStatus("published")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              status === "published"
                ? "bg-accent/10 text-accent border border-accent/30"
                : "border border-card-border text-muted hover:text-foreground"
            }`}
          >
            Published
          </button>
        </div>
      </div>

      <BlockEditor blocks={blocks} onChange={setBlocks} />
    </form>
  )
}
