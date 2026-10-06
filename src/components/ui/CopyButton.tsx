"use client"

import { useEffect, useState } from "react"

export default function CopyButton({ value }: { value: string }) {
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
