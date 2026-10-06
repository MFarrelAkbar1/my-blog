"use client"

import { useEffect, useRef, useState } from "react"
import { smoothScrollToElement } from "@/lib/smoothScroll"

export interface ProjectIndexItem {
  id: string
  title: string
  subtitle: string
}

/**
 * Panel INDEX proyek: sticky di desktop, strip horizontal di mobile.
 * Item aktif mengikuti card yang sedang melewati tengah viewport,
 * dan klik item menggulir halaman ke card-nya.
 */
export default function ProjectIndex({ items }: { items: ProjectIndexItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "")
  const listRef = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: "-35% 0px -55% 0px" }
    )
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [items])

  // Jaga item aktif tetap terlihat di dalam list — geser kontainernya saja,
  // bukan halaman (scrollIntoView akan ikut menggulir window)
  useEffect(() => {
    const list = listRef.current
    const item = list?.querySelector<HTMLElement>(`[data-index-id="${active}"]`)
    if (!list || !item) return

    const vertical = list.scrollHeight > list.clientHeight
    if (vertical) {
      const top = item.offsetTop - list.offsetTop
      if (top < list.scrollTop || top + item.offsetHeight > list.scrollTop + list.clientHeight) {
        list.scrollTo({ top: top - list.clientHeight / 2 + item.offsetHeight / 2 })
      }
    } else {
      const left = item.offsetLeft - list.offsetLeft
      list.scrollTo({ left: left - 16 })
    }
  }, [active])

  const jumpTo = (id: string) => {
    const target = document.getElementById(id)
    if (!target) return
    setActive(id)
    smoothScrollToElement(target)
  }

  return (
    <nav
      aria-label="Project index"
      className="panel sticky top-14 z-20 bg-[var(--panel-solid)] lg:top-20 lg:flex lg:max-h-[calc(100vh-6rem)] lg:flex-col"
    >
      <div className="panel-head">
        <span className="panel-label">Index</span>
        <span className="font-mono text-xs text-faint">{items.length}</span>
      </div>

      <ol
        ref={listRef}
        className="thin-scroll flex gap-1 overflow-x-auto p-1.5 lg:flex-col lg:overflow-x-visible lg:overflow-y-auto"
      >
        {items.map((item) => (
          <li key={item.id} className="shrink-0 lg:shrink">
            <button
              type="button"
              data-index-id={item.id}
              onClick={() => jumpTo(item.id)}
              aria-current={active === item.id ? "true" : undefined}
              className="index-item max-w-[14rem] lg:max-w-none"
            >
              <span className="block truncate text-sm font-semibold text-bone">
                {item.title}
              </span>
              <span className="block truncate text-xs text-dim">
                {item.subtitle}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  )
}
