"use client"

import { useEffect, useState } from "react"
import { Check, Link2 } from "lucide-react"

/** Salin URL absolut halaman sertifikat (origin diambil dari browser) */
export default function CopyLinkButton({
  path,
  className,
  compact = false,
}: {
  path: string
  className?: string
  compact?: boolean
}) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 1600)
    return () => clearTimeout(timer)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${path}`)
      setCopied(true)
    } catch {
      // Clipboard diblokir (mis. konteks tidak aman) — biarkan tanpa umpan balik
    }
  }

  const Icon = copied ? Check : Link2

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      aria-label="Copy link to this document"
      className={className}
    >
      <Icon className="h-4 w-4" strokeWidth={2.5} />
      <span className={compact ? "hidden sm:inline" : undefined}>
        {copied ? "COPIED" : "COPY LINK"}
      </span>
    </button>
  )
}
