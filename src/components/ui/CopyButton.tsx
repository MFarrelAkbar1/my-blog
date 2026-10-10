"use client"

import { useEffect, useState } from "react"
import { Check, Copy } from "lucide-react"

interface CopyButtonProps {
  value: string
  /** Tampilkan ikon saja (dengan aria-label) alih-alih teks "Copy" */
  iconOnly?: boolean
}

export default function CopyButton({ value, iconOnly = false }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 1600)
    return () => clearTimeout(timer)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
    } catch {
      // Clipboard diblokir (mis. konteks tidak aman) — biarkan tanpa umpan balik
    }
  }

  if (iconOnly) {
    const Icon = copied ? Check : Copy
    return (
      <button
        type="button"
        onClick={copy}
        className={`btn btn-secondary btn-sm !p-2 ${copied ? "text-accent" : ""}`}
        aria-label={copied ? "Copied" : `Copy ${value}`}
        title={copied ? "Copied" : "Copy"}
        aria-live="polite"
      >
        <Icon className="h-4 w-4" strokeWidth={2.25} />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="btn btn-secondary btn-sm"
      aria-live="polite"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  )
}
