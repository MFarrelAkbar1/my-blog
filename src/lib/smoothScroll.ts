"use client"

/**
 * Scroll beranimasi berbasis requestAnimationFrame.
 *
 * Kenapa tidak `scrollIntoView({ behavior: "smooth" })`? Chrome mematikan
 * seluruh smooth scroll native ketika OS mengaktifkan "reduce motion"
 * (di Windows: Settings → Accessibility → Visual effects → Animation effects),
 * bahkan saat `behavior: "smooth"` diminta eksplisit. Menggerakkan scrollTop
 * sendiri per frame tidak terkena pembatasan itu.
 *
 * Konsekuensinya disengaja: navigasi navbar tetap beranimasi meski pengunjung
 * memilih reduce-motion. Kalau ingin menghormatinya, bungkus pemanggilan
 * `smoothScrollToElement` dengan pengecekan
 * `matchMedia("(prefers-reduced-motion: reduce)").matches` lalu fallback ke
 * `element.scrollIntoView()`.
 */

const MIN_DURATION = 420
const MAX_DURATION = 900
/** ms per piksel jarak — menentukan seberapa "berat" perpindahannya terasa */
const MS_PER_PIXEL = 0.45

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

let frame: number | null = null
let detach: (() => void) | null = null

/** Hentikan animasi yang sedang berjalan (dipanggil juga saat user ambil alih) */
export function cancelSmoothScroll() {
  if (frame !== null) cancelAnimationFrame(frame)
  frame = null
  detach?.()
  detach = null
}

export function smoothScrollToElement(element: HTMLElement) {
  cancelSmoothScroll()

  // Offset navbar sticky diambil dari `scroll-margin-top` elemen (scroll-mt-24),
  // jadi posisi berhenti tetap satu sumber dengan CSS-nya
  const scrollMargin =
    parseFloat(getComputedStyle(element).scrollMarginTop) || 0

  const start = window.scrollY
  const maxScroll = Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight
  )
  const end = Math.min(
    Math.max(element.getBoundingClientRect().top + start - scrollMargin, 0),
    maxScroll
  )
  const distance = end - start

  if (Math.abs(distance) < 2) return

  const duration = Math.min(
    MAX_DURATION,
    Math.max(MIN_DURATION, Math.abs(distance) * MS_PER_PIXEL)
  )
  const startTime = performance.now()

  // Begitu user menggulir sendiri, animasi mundur — jangan rebutan kendali
  const interrupt = () => cancelSmoothScroll()
  window.addEventListener("wheel", interrupt, { passive: true })
  window.addEventListener("touchstart", interrupt, { passive: true })
  detach = () => {
    window.removeEventListener("wheel", interrupt)
    window.removeEventListener("touchstart", interrupt)
  }

  const step = (now: number) => {
    const progress = Math.min(1, (now - startTime) / duration)
    window.scrollTo(0, start + distance * easeInOutCubic(progress))

    if (progress < 1) {
      frame = requestAnimationFrame(step)
    } else {
      frame = null
      detach?.()
      detach = null
    }
  }

  frame = requestAnimationFrame(step)
}
