"use client"

import dynamic from "next/dynamic"
import { PdfSkeleton } from "./PdfSkeleton"

/** pdfjs butuh API browser — viewer hanya dirender di client */
const PdfViewer = dynamic(() => import("./PdfViewer"), {
  ssr: false,
  loading: () => (
    <div className="relative min-h-0 flex-1">
      <PdfSkeleton label="LOADING VIEWER…" />
    </div>
  ),
})

export default function CertificatePageViewer({ file }: { file: string }) {
  return <PdfViewer file={file} />
}
