"use client"

import { useState } from "react"
import { Document, Page } from "react-pdf"
import { PDF_OPTIONS } from "./pdfjs-setup"
import { PdfError, PdfSkeleton } from "./PdfSkeleton"
import { useElementWidth } from "./useElementWidth"

/**
 * Thumbnail halaman 1 sebuah PDF, dirender sungguhan lewat pdfjs
 * (bukan ikon generik). Canvas dipotong oleh kontainer ber-aspect-ratio,
 * jadi dokumen potret menampilkan bagian kepalanya — bagian paling informatif.
 */
export default function PdfThumb({ file }: { file: string }) {
  const [setNode, width] = useElementWidth<HTMLDivElement>()
  const [rendered, setRendered] = useState(false)
  const [failed, setFailed] = useState(false)

  return (
    <div ref={setNode} className="absolute inset-0 overflow-hidden bg-panel">
      {!rendered && !failed && <PdfSkeleton />}
      {failed && <PdfError />}

      {width > 0 && !failed && (
        <Document
          file={file}
          options={PDF_OPTIONS}
          loading={null}
          error={null}
          noData={null}
          onLoadError={() => setFailed(true)}
          onSourceError={() => setFailed(true)}
          className={rendered ? "cert-thumb-doc" : "invisible"}
        >
          <Page
            pageNumber={1}
            width={width}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            loading={null}
            error={null}
            onRenderSuccess={() => setRendered(true)}
            onRenderError={() => setFailed(true)}
          />
        </Document>
      )}
    </div>
  )
}
