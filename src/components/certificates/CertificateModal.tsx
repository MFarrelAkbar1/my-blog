"use client"

import dynamic from "next/dynamic"
import { useEffect, useRef, useState, type CSSProperties } from "react"
import { createPortal } from "react-dom"
import { ChevronLeft, ChevronRight, Download, X } from "lucide-react"
import { certificateHref } from "@/lib/pdf"
import type { Certificate } from "@/data/certificates"
import { PdfSkeleton } from "./PdfSkeleton"

const PdfViewer = dynamic(() => import("./PdfViewer"), {
  ssr: false,
  loading: () => (
    <div className="relative min-h-0 flex-1">
      <PdfSkeleton label="LOADING VIEWER…" />
    </div>
  ),
})

interface CertificateModalProps {
  certificates: Certificate[]
  index: number
  /** Titik asal animasi (pusat kartu yang diklik), koordinat viewport */
  origin: { x: number; y: number } | null
  onNavigate: (index: number) => void
  onClose: () => void
}

export default function CertificateModal({
  certificates,
  index,
  origin,
  onNavigate,
  onClose,
}: CertificateModalProps) {
  const [entered, setEntered] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  const certificate = certificates[index]
  const total = certificates.length

  // Panel "zoom in" dari posisi kartu asal — dijalankan setelah frame pertama
  useEffect(() => {
    const frame = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  // Kunci scroll halaman di belakang modal
  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previous
    }
  }, [])

  // Fokus pindah ke modal saat dibuka, kembali ke pemicu saat ditutup
  useEffect(() => {
    const trigger = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    return () => trigger?.focus?.()
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
      if (event.key === "ArrowLeft") onNavigate((index - 1 + total) % total)
      if (event.key === "ArrowRight") onNavigate((index + 1) % total)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [index, total, onNavigate, onClose])

  if (!certificate) return null

  const panelStyle: CSSProperties = {
    transformOrigin: origin ? `${origin.x}px ${origin.y}px` : "center",
  }

  const href = certificateHref(certificate.file)

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={certificate.title}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
    >
      <button
        type="button"
        aria-label="Tutup"
        tabIndex={-1}
        onClick={onClose}
        className={`halftone absolute inset-0 cursor-default bg-ink/92 backdrop-blur-sm transition-opacity duration-300 ${
          entered ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        style={panelStyle}
        className={`modal-panel panel relative flex max-h-full w-full max-w-4xl flex-col overflow-hidden ${
          entered ? "modal-panel-in" : ""
        }`}
      >
        {/* Header — judul + aksi */}
        <div className="flex shrink-0 items-start gap-3 border-b-[3px] border-bone bg-panel p-4">
          <div className="min-w-0 flex-1">
            <span className="caption">
              <span>
                [{String(index + 1).padStart(2, "0")}/
                {String(total).padStart(2, "0")}] {certificate.category}
              </span>
            </span>
            <h2 className="mt-2.5 font-display text-lg leading-snug tracking-wide uppercase sm:text-xl">
              {certificate.title}
            </h2>
            {certificate.issuer && (
              <p className="mt-1 font-mono text-[11px] text-muted">
                {certificate.issuer}
              </p>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={href}
              download
              className="flex items-center gap-1.5 border-2 border-slate-ink px-2.5 py-2 font-mono text-[10px] tracking-widest text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <Download className="h-4 w-4" strokeWidth={2.5} />
              <span className="hidden sm:inline">DOWNLOAD</span>
            </a>

            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Tutup pratinjau"
              className="ink-scratch border-2 border-bone bg-klaxon p-2 text-bone"
            >
              <X className="h-4 w-4" strokeWidth={3.5} />
            </button>
          </div>
        </div>

        {/* Viewer — remount saat pindah sertifikat agar halaman reset ke 1 */}
        <PdfViewer key={certificate.id} file={href} />

        {/* Footer — navigasi antar sertifikat tanpa menutup modal */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-t-[3px] border-bone bg-panel px-3 py-2.5">
          <button
            type="button"
            onClick={() => onNavigate((index - 1 + total) % total)}
            className="group flex items-center gap-2 border-2 border-slate-ink px-3 py-2 font-mono text-[10px] tracking-widest text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <ChevronLeft
              className="h-4 w-4 transition-transform group-hover:-translate-x-1"
              strokeWidth={3}
            />
            PREV
          </button>

          <span className="hidden truncate font-mono text-[10px] tracking-widest text-muted/70 sm:block">
            ESC / ← / →
          </span>

          <button
            type="button"
            onClick={() => onNavigate((index + 1) % total)}
            className="group flex items-center gap-2 border-2 border-slate-ink px-3 py-2 font-mono text-[10px] tracking-widest text-muted transition-colors hover:border-accent hover:text-accent"
          >
            NEXT
            <ChevronRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              strokeWidth={3}
            />
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
