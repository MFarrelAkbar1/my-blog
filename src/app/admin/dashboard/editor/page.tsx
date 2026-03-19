import type { Metadata } from "next"
import ArticleForm from "@/components/admin/ArticleForm"

export const metadata: Metadata = {
  title: "New Article",
}

export default function NewArticlePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <span className="font-mono text-sm text-accent">
          {"// new_article"}
        </span>
        <h1 className="text-2xl font-bold">Create New Article</h1>
      </div>
      <ArticleForm />
    </div>
  )
}
