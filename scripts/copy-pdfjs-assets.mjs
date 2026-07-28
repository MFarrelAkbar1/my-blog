/**
 * Menyalin aset runtime pdfjs-dist ke `public/pdfjs/` supaya react-pdf
 * bisa memuatnya dari origin sendiri (tanpa CDN eksternal).
 *
 * Dijalankan otomatis lewat script `postinstall`, jadi folder hasil salinan
 * tidak perlu ikut di-commit (lihat .gitignore).
 */
import { cp, mkdir } from "node:fs/promises"
import { createRequire } from "node:module"
import path from "node:path"

const require = createRequire(import.meta.url)
const pdfjsRoot = path.dirname(require.resolve("pdfjs-dist/package.json"))
const outDir = path.join(process.cwd(), "public", "pdfjs")

await mkdir(outDir, { recursive: true })

await cp(
  path.join(pdfjsRoot, "build", "pdf.worker.min.mjs"),
  path.join(outDir, "pdf.worker.min.mjs")
)

await cp(
  path.join(pdfjsRoot, "standard_fonts"),
  path.join(outDir, "standard_fonts"),
  { recursive: true }
)

console.log(`[pdfjs] aset disalin ke ${path.relative(process.cwd(), outDir)}`)
