"use client"

import { useCallback, useState } from "react"

/**
 * Mengukur lebar sebuah elemen secara reaktif (ResizeObserver).
 * react-pdf butuh lebar dalam piksel untuk merender canvas halaman.
 *
 * Pakai callback ref (dengan cleanup ala React 19) supaya observer terpasang
 * tepat saat node muncul — termasuk pada kartu yang dirender belakangan.
 */
export function useElementWidth<T extends HTMLElement>() {
  const [width, setWidth] = useState(0)

  const ref = useCallback((node: T | null) => {
    if (!node) return

    // ResizeObserver memancarkan ukuran awal segera setelah observe()
    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width)
    })
    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  return [ref, width] as const
}
