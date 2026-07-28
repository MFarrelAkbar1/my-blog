"use client"

import { pdfjs } from "react-pdf"
import type { DocumentProps } from "react-pdf"

/**
 * Konfigurasi runtime pdfjs. Modul ini HANYA boleh diimpor dari komponen yang
 * di-load lewat `dynamic(..., { ssr: false })` — mengevaluasinya di server
 * memicu `ReferenceError: DOMMatrix is not defined`.
 *
 * Worker & font standar di-serve dari origin sendiri (public/pdfjs), disalin
 * saat `postinstall` oleh scripts/copy-pdfjs-assets.mjs.
 */
pdfjs.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.mjs"

/** Harus stabil antar-render — referensi baru memicu remount dokumen */
export const PDF_OPTIONS: DocumentProps["options"] = {
  standardFontDataUrl: "/pdfjs/standard_fonts/",
}
