import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import SfxBurst from "@/components/ui/SfxBurst"

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 halftone">
      <div className="panel relative max-w-md w-full p-8 sm:p-10 text-center tilt-l">
        {/* Burst statis — selalu tampil, ini gag panel-nya */}
        <div className="flex justify-center mb-4">
          <SfxBurst text="Segfault!" color="red" static />
        </div>

        <h1 className="font-display text-6xl uppercase tracking-wide text-bone mb-3">
          404
        </h1>

        <div className="mb-4">
          <span className="caption caption-red">
            <span>[PANEL_MISSING] // page not found</span>
          </span>
        </div>

        <p className="font-mono text-sm text-muted mb-8 leading-relaxed">
          This page was redacted by the editor.
          <br />
          Core dumped. Story continues elsewhere.
        </p>

        <Link
          href="/"
          className="group relative inline-flex items-center gap-2 border-[3px] border-bone bg-accent px-5 py-2.5 font-display text-sm uppercase tracking-wider text-ink hover:bg-accent-hover transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Return to Issue #01
        </Link>
      </div>
    </div>
  )
}
