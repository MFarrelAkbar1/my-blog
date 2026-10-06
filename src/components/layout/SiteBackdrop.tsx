"use client"

import Image from "next/image"
import { usePathname } from "next/navigation"

/**
 * Background full-page yang menempel (fixed) di belakang semua halaman.
 * Di home (hero) gambarnya terlihat jelas; halaman lain memakai overlay
 * yang lebih gelap supaya konten panjang tetap nyaman dibaca.
 */
export default function SiteBackdrop() {
  const pathname = usePathname()
  const isHome = pathname === "/"

  return (
    <div aria-hidden="true" className="site-backdrop">
      <Image
        src="/bg.jpeg"
        alt=""
        fill
        priority
        sizes="100vw"
        quality={70}
        className="object-cover object-center"
      />
      <div
        className="site-backdrop-scrim"
        data-dim={isHome ? undefined : ""}
      />
    </div>
  )
}
