"use client"

import { useState } from "react"
import { Document, Page } from "react-pdf"
import { ChevronLeft, ChevronRight } from "lucide-react"
import "react-pdf/dist/Page/TextLayer.css"
import "react-pdf/dist/Page/AnnotationLayer.css"
import { PDF_OPTIONS } from "./pdfjs-setup"
import { PdfError, PdfSkeleton } from "./PdfSkeleton"
import { useElementWidth } from "./useElementWidth"

const MAX_PAGE_WIDTH = 900

/**
 * Viewer PDF penuh untuk modal. Dokumen multi-halaman (laporan, SKPI)
 * dinavigasi per halaman supaya tidak merender puluhan canvas sekaligus.
 *
 * Parent me-remount komponen ini via `key` saat pindah sertifikat,
 * jadi state halaman otomatis reset ke 1.
 */
export default function PdfViewer({ file }: { file: string }) {
  const [setNode, width] = useElementWidth<HTMLDivElement>()
  const [numPages, setNumPages] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)
  const [failed, setFailed] = useState(false)

  const pageWidth = Math.min(Math.max(width - 32, 240), MAX_PAGE_WIDTH)

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div
        ref={setNode}
        className="relative min-h-0 flex-1 overflow-auto bg-ink p-4"
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
              onLoadSuccess={({ numPages: n }) => setNumPages(n)}
              onLoadError={() => setFailed(true)}
              onSourceError={() => setFailed(true)}
              className="mx-auto w-fit border-[3px] border-bone bg-bone"
            >
              <Page
                pageNumber={pageNumber}
                width={pageWidth}
                loading={
                  <div
                    className="cert-skeleton"
                    style={{ width: pageWidth, height: pageWidth * 1.3 }}
                  />
                }
                error={<PdfError message="HALAMAN GAGAL DIRENDER" />}
              />
            </Document>
          )
        )}
      </div>

      {numPages > 1 && (
        <div className="flex shrink-0 items-center justify-center gap-4 border-t-[3px] border-bone bg-panel px-4 py-2.5">
          <button
            type="button"
            onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
            disabled={pageNumber <= 1}
            className="border-2 border-slate-ink p-1.5 text-muted transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-slate-ink disabled:hover:text-muted"
            aria-label="Halaman sebelumnya"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={3} />
          </button>

          <span className="font-mono text-xs tracking-widest text-muted">
            HAL {String(pageNumber).padStart(2, "0")} /{" "}
            {String(numPages).padStart(2, "0")}
          </span>

          <button
            type="button"
            onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
            disabled={pageNumber >= numPages}
            className="border-2 border-slate-ink p-1.5 text-muted transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-slate-ink disabled:hover:text-muted"
            aria-label="Halaman berikutnya"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={3} />
          </button>
        </div>
      )}
    </div>
  )
}
