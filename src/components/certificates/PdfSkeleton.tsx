import { FileWarning } from "lucide-react"

/**
 * Placeholder bergaya komik saat halaman PDF masih dirender pdfjs —
 * "kertas" kosong bergaris speedline yang bergerak, plus caption log.
 */
export function PdfSkeleton({ label = "RENDERING…" }: { label?: string }) {
  return (
    <div className="absolute inset-0 grid place-items-center bg-panel">
      <div className="cert-skeleton absolute inset-0" aria-hidden="true" />
      <span className="caption relative z-10">
        <span>$ {label}</span>
      </span>
    </div>
  )
}

/** State gagal render — tetap in-character, tidak membuang layout */
export function PdfError({
  message = "PREVIEW UNAVAILABLE",
}: {
  message?: string
}) {
  return (
    <div className="absolute inset-0 grid place-items-center gap-3 bg-panel p-4 text-center">
      <FileWarning className="h-7 w-7 text-klaxon" strokeWidth={2.5} />
      <span className="caption caption-red">
        <span>{message}</span>
      </span>
    </div>
  )
}
