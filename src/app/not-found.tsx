import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="panel w-full max-w-md">
        <div className="panel-head">
          <span className="panel-label">Error</span>
          <span className="chip">404</span>
        </div>

        <div className="p-8 text-center sm:p-10">
          <h1 className="mb-4 text-6xl font-light tracking-tight text-bone">
            404
          </h1>

          <div className="mb-4">
            <span className="caption caption-red">
              <span>[PANEL_MISSING] // page not found</span>
            </span>
          </div>

          <p className="mb-8 font-mono text-sm leading-relaxed text-dim">
            This page was redacted by the editor.
            <br />
            Core dumped. Story continues elsewhere.
          </p>

          <Link href="/" className="btn btn-primary group">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Return to Issue #01
          </Link>
        </div>
      </div>
    </div>
  )
}
