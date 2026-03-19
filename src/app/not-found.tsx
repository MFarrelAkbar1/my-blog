import Link from "next/link"
import { ArrowLeft, Terminal } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <Terminal className="h-12 w-12 text-accent mx-auto mb-4" />
        <h1 className="font-mono text-6xl font-bold text-accent mb-2">404</h1>
        <p className="font-mono text-lg text-muted mb-6">
          <span className="text-accent">$</span> page not found
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-background hover:bg-accent-hover transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Home
        </Link>
      </div>
    </div>
  )
}
