const PDF_DIR = "/sertifikat-pdf"

/**
 * URL publik sebuah sertifikat. Nama file mengandung spasi, `(`, `)`, dan `!`
 * sehingga harus di-encode agar tidak 404 — hanya segment nama file yang
 * di-encode, separator `/` dibiarkan apa adanya.
 *
 * Modul ini sengaja bebas dependensi pdfjs supaya aman diimpor dari komponen
 * yang tetap dirender di server (pdfjs butuh DOMMatrix, Canvas, dll).
 */
export function certificateHref(file: string): string {
  return `${PDF_DIR}/${encodeURIComponent(file)}`
}
