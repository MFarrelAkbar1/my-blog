"use client"

import dynamic from "next/dynamic"
import { useEffect, useRef, useState } from "react"
import { Maximize2 } from "lucide-react"
import { certificateHref } from "@/lib/pdf"
import type { Certificate } from "@/data/certificates"
import { PdfSkeleton } from "./PdfSkeleton"

/** pdfjs menyentuh API browser — jangan ikut di-render di server */
const PdfThumb = dynamic(() => import("./PdfThumb"), {
  ssr: false,
  loading: () => <PdfSkeleton />,
})

interface CertificateCardProps {
  certificate: Certificate
  index: number
  onOpen: (origin: { x: number; y: number }) => void
}

export default function CertificateCard({
  certificate,
  index,
  onOpen,
}: CertificateCardProps) {
  const cardRef = useRef<HTMLButtonElement>(null)
  const [inView, setInView] = useState(false)

  // Render thumbnail hanya saat kartu mendekati viewport — 19 dokumen
  // sekaligus terlalu berat untuk pdfjs kalau dirender di awal.
  useEffect(() => {
    const node = cardRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: "400px 0px" }
    )
    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  const handleOpen = () => {
    const rect = cardRef.current?.getBoundingClientRect()
    onOpen(
      rect
        ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
        : { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    )
  }

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={handleOpen}
      aria-label={`Buka ${certificate.title}`}
      className="cert-card group panel relative block w-full text-left"
    >
      <span className="absolute top-2 left-2 z-10 rounded-[3px] border border-line-strong bg-ink/85 px-1.5 py-0.5 font-mono text-[10px] text-dim">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Jendela panel — preview halaman 1 PDF asli */}
      <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-line">
        {inView ? (
          <PdfThumb file={certificateHref(certificate.file)} />
        ) : (
          <PdfSkeleton label="QUEUED…" />
        )}

        {/* Gutter gelap di bawah supaya potongan canvas tidak terlihat kasar */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-ink to-transparent"
        />

        <span className="pointer-events-none absolute right-2 bottom-2 z-10 flex items-center gap-1.5 rounded-[3px] border border-line-strong bg-ink/90 px-2 py-1 font-mono text-[10px] tracking-widest text-bone opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
          <Maximize2 className="h-3 w-3" strokeWidth={3} />
          OPEN
        </span>
      </div>

      <div className="p-4">
        <span className="caption">
          <span>
            {certificate.category}
            {certificate.year ? ` · ${certificate.year}` : ""}
          </span>
        </span>

        <h3 className="mt-3 text-[0.95rem] leading-snug font-semibold text-bone transition-colors group-hover:text-accent">
          {certificate.title}
        </h3>

        {certificate.issuer && (
          <p className="mt-2 font-mono text-[11px] leading-relaxed text-muted">
            {certificate.issuer}
          </p>
        )}
      </div>
    </button>
  )
}
