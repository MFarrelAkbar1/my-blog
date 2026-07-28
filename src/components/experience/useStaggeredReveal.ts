"use client"

import { useCallback, useRef, useState } from "react"

/**
 * Mengungkap elemen saat masuk viewport, dengan jeda bertahap antar elemen
 * yang muncul pada batch pengamatan yang sama.
 *
 * Jeda dihitung per batch (bukan dari indeks global) supaya pengunjung yang
 * melompat ke tengah halaman tidak menunggu delay panjang milik entri di atas.
 */
export function useStaggeredReveal(stepMs = 100) {
  const [delays, setDelays] = useState<Record<string, number>>({})
  const seen = useRef(new Set<string>())
  const observer = useRef<IntersectionObserver | null>(null)

  const ensureObserver = useCallback(() => {
    if (observer.current) return observer.current

    observer.current = new IntersectionObserver(
      (entries) => {
        const fresh = entries
          .filter((entry) => {
            const id = (entry.target as HTMLElement).dataset.revealId
            return entry.isIntersecting && id && !seen.current.has(id)
          })
          // Urutkan berdasar posisi di layar — urutan `entries` tidak dijamin
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (fresh.length === 0) return

        const next: Record<string, number> = {}
        fresh.forEach((entry, order) => {
          const id = (entry.target as HTMLElement).dataset.revealId as string
          seen.current.add(id)
          next[id] = order * stepMs
          observer.current?.unobserve(entry.target)
        })
        setDelays((prev) => ({ ...prev, ...next }))
      },
      // threshold 0 + margin bawah: terpicu saat tepi atas elemen melewati
      // 85% tinggi viewport, jadi elemen tinggi pun selalu kebagian
      { rootMargin: "0px 0px -15% 0px" }
    )

    return observer.current
  }, [stepMs])

  const register = useCallback(
    (node: HTMLElement | null) => {
      if (!node) return
      const io = ensureObserver()
      io.observe(node)
      return () => io.unobserve(node)
    },
    [ensureObserver]
  )

  return { register, delays }
}
