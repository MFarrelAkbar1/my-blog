"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Document, Page } from "react-pdf"
import "react-pdf/dist/Page/TextLayer.css"
import "react-pdf/dist/Page/AnnotationLayer.css"
import { PDF_OPTIONS } from "./pdfjs-setup"
import { PdfError, PdfSkeleton } from "./PdfSkeleton"
import { useElementWidth } from "./useElementWidth"

const MAX_PAGE_WIDTH = 900

/** Rasio tinggi/lebar cadangan (A4 potret) sebelum dimensi asli diketahui */
const FALLBACK_RATIO = 1.414

/** Seberapa jauh di luar viewport sebuah halaman sudah mulai dirender */
const PRERENDER_MARGIN = "1200px 0px"

/**
 * Viewer PDF penuh untuk modal. Semua halaman ditumpuk vertikal dalam satu
 * kontainer yang bisa di-scroll — dibaca dengan scroll biasa, bukan klik
 * per halaman.
 *
 * Dokumen sertifikat bisa 40+ halaman, jadi canvas hanya dirender untuk
 * halaman yang sedang/hampir terlihat (IntersectionObserver + rootMargin).
 * Setiap slot halaman tetap memesan tinggi sesuai rasio dokumen supaya
 * scrollbar stabil dan tidak melompat saat halaman masuk/keluar window.
 *
 * Parent me-remount komponen ini via `key` saat pindah sertifikat,
 * jadi posisi baca otomatis reset ke halaman 1.
 */
export default function PdfViewer({ file }: { file: string }) {
  const [setWidthNode, width] = useElementWidth<HTMLDivElement>()
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const [numPages, setNumPages] = useState(0)
  const [ratio, setRatio] = useState(FALLBACK_RATIO)
  const [activePage, setActivePage] = useState(1)
  const [renderedPages, setRenderedPages] = useState<Set<number>>(
    () => new Set([1, 2])
  )
  const [failed, setFailed] = useState(false)

  // Satu node melayani dua peran: diukur lebarnya sekaligus jadi root observer
  const setScrollNode = useCallback(
    (node: HTMLDivElement | null) => {
      scrollRef.current = node
      const cleanup = setWidthNode(node)
      return () => {
        scrollRef.current = null
        cleanup?.()
      }
    },
    [setWidthNode]
  )

  const pageWidth = Math.min(Math.max(width - 32, 240), MAX_PAGE_WIDTH)
  // Slot memakai border-box, jadi border 3px di tiap sisi harus ikut dihitung
  const slotWidth = pageWidth + 6
  const pageHeight = Math.round(pageWidth * ratio)
  const slotHeight = pageHeight + 6

  useEffect(() => {
    const root = scrollRef.current
    if (!root || numPages === 0) return

    const slots = Array.from(
      root.querySelectorAll<HTMLElement>("[data-page]")
    )
    const pageOf = (el: Element) => Number(el.getAttribute("data-page"))

    // (1) Window render — halaman yang sedang/hampir masuk viewport
    const near = new Set<number>()
    const renderObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const page = pageOf(entry.target)
          if (entry.isIntersecting) near.add(page)
          else near.delete(page)
        }
        setRenderedPages(new Set(near))
      },
      { root, rootMargin: PRERENDER_MARGIN }
    )

    // (2) Indikator halaman — yang paling banyak terlihat di viewport asli
    const ratios = new Map<number, number>()
    const activeObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(pageOf(entry.target), entry.intersectionRatio)
        }

        let best = 1
        let bestRatio = -1
        for (let page = 1; page <= numPages; page += 1) {
          const value = ratios.get(page) ?? 0
          if (value > bestRatio) {
            best = page
            bestRatio = value
          }
        }
        setActivePage(best)
      },
      { root, threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
    )

    for (const slot of slots) {
      renderObserver.observe(slot)
      activeObserver.observe(slot)
    }

    return () => {
      renderObserver.disconnect()
      activeObserver.disconnect()
    }
  }, [numPages])

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div
        ref={setScrollNode}
        className="relative min-h-0 flex-1 overflow-y-auto bg-ink p-4"
      >
        {failed ? (
          <PdfError message="PDF GAGAL DIMUAT" />
        ) : (
          width > 0 && (
            <Document
              file={file}
              options={PDF_OPTIONS}
              loading={<PdfSkeleton label="LOADING DOCUMENT…" />}
              error={<PdfError message="PDF GAGAL DIMUAT" />}
              noData={null}
              onLoadSuccess={(pdf) => {
                setNumPages(pdf.numPages)
                // Rasio halaman pertama dipakai untuk semua slot — dokumen
                // sertifikat memakai ukuran kertas seragam
                void pdf.getPage(1).then((page) => {
                  const { width: w, height: h } = page.getViewport({ scale: 1 })
                  if (w > 0) setRatio(h / w)
                })
              }}
              onLoadError={() => setFailed(true)}
              onSourceError={() => setFailed(true)}
              className="mx-auto flex w-fit flex-col gap-4"
            >
              {Array.from({ length: numPages }, (_, i) => i + 1).map((page) => (
                <div
                  key={page}
                  data-page={page}
                  style={{ width: slotWidth, minHeight: slotHeight }}
                  className="relative border-[3px] border-bone bg-bone"
                >
                  {renderedPages.has(page) ? (
                    <Page
                      pageNumber={page}
                      width={pageWidth}
                      loading={
                        <div
                          className="cert-skeleton"
                          style={{ width: pageWidth, height: pageHeight }}
                        />
                      }
                      error={<PdfError message="HALAMAN GAGAL DIRENDER" />}
                    />
                  ) : (
                    <div
                      className="cert-skeleton w-full bg-panel"
                      style={{ height: pageHeight }}
                      aria-hidden="true"
                    />
                  )}
                </div>
              ))}
            </Document>
          )
        )}
      </div>

      {numPages > 1 && (
        <div className="flex shrink-0 items-center justify-center gap-4 border-t-[3px] border-bone bg-panel px-4 py-2.5">
          <span className="font-mono text-xs tracking-widest text-muted">
            HAL {String(activePage).padStart(2, "0")} /{" "}
            {String(numPages).padStart(2, "0")}
          </span>
        </div>
      )}
    </div>
  )
}
