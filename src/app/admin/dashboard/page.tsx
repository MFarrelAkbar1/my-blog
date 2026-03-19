"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import type { Article } from "@/lib/types"
import {
  Plus,
  Pencil,
  Trash2,
  LogOut,
  Loader2,
  FileText,
} from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    fetchArticles()
  }, [])

  async function fetchArticles() {
    const { data } = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false })

    setArticles((data ?? []) as Article[])
    setLoading(false)
  }

  async function handleDelete(id: string) {
    setDeleting(true)
    await supabase.from("articles").delete().eq("id", id)
    setDeleteId(null)
    setDeleting(false)
    fetchArticles()
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="font-mono text-sm text-accent">
            {"// dashboard"}
          </span>
          <h1 className="text-2xl font-bold">Articles</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/dashboard/editor"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-background hover:bg-accent-hover transition-colors"
          >
            <Plus className="h-4 w-4" />
            New Article
          </Link>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-lg border border-card-border px-4 py-2 text-sm text-muted hover:text-foreground hover:border-foreground/20 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-accent" />
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-20 rounded-xl border border-card-border bg-card-bg">
          <FileText className="h-10 w-10 text-muted mx-auto mb-4" />
          <p className="text-muted">No articles yet. Create your first one!</p>
        </div>
      ) : (
        <div className="rounded-xl border border-card-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-card-border bg-card-bg">
                <th className="text-left px-6 py-3 text-xs font-mono uppercase text-muted">
                  Title
                </th>
                <th className="text-left px-6 py-3 text-xs font-mono uppercase text-muted hidden sm:table-cell">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-xs font-mono uppercase text-muted hidden md:table-cell">
                  Created
                </th>
                <th className="text-right px-6 py-3 text-xs font-mono uppercase text-muted">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr
                  key={article.id}
                  className="border-b border-card-border last:border-0 hover:bg-card-bg/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-sm">{article.title}</p>
                    <span className="sm:hidden inline-block mt-1">
                      <StatusBadge status={article.status} />
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <StatusBadge status={article.status} />
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="font-mono text-xs text-muted">
                      {new Date(article.created_at).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/dashboard/editor/${article.id}`}
                        className="rounded-lg p-2 text-muted hover:text-accent hover:bg-accent/10 transition-colors"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => setDeleteId(article.id)}
                        className="rounded-lg p-2 text-muted hover:text-red-400 hover:bg-red-400/10 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="rounded-xl border border-card-border bg-card-bg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-2">Delete Article</h3>
            <p className="text-sm text-muted mb-6">
              Are you sure you want to delete this article? This action cannot
              be undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="rounded-lg border border-card-border px-4 py-2 text-sm text-muted hover:text-foreground transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                disabled={deleting}
                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {deleting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-mono ${
        status === "published"
          ? "bg-accent/10 text-accent"
          : "bg-yellow-500/10 text-yellow-500"
      }`}
    >
      {status}
    </span>
  )
}
