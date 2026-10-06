"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState, type MouseEvent } from "react"
import { Menu, X, ArrowUpRight } from "lucide-react"
import { smoothScrollToElement } from "@/lib/smoothScroll"

/** Section one-page di halaman utama — urutannya sama dengan urutan di `/` */
const sections = [
  { id: "home", label: "HOME" },
  { id: "projects", label: "PROJECTS" },
  { id: "stack", label: "STACK" },
  { id: "experience", label: "ORIGIN" },
  { id: "certificates", label: "CERTS" },
  { id: "issues", label: "ISSUES" },
] as const

const githubUrl = "https://github.com/MFarrelAkbar1"

export default function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const isBlog = pathname.startsWith("/blog")

  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string>("home")

  // Highlight menu mengikuti section yang melewati pita tengah viewport.
  // IntersectionObserver, bukan scroll listener — nol kerja per frame scroll.
  useEffect(() => {
    if (!isHome) return

    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    )
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [isHome])

  // Sentinel setinggi hero: begitu keluar viewport, navbar sedikit lebih pekat
  useEffect(() => {
    const sentinel = document.getElementById("nav-scroll-sentinel")
    if (!sentinel) return

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(sentinel)

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (event: MouseEvent, id: string) => {
    setIsOpen(false)
    if (!isHome) return // biarkan Link menavigasi ke `/#id`
    const target = document.getElementById(id)
    if (!target) return // biarkan perilaku anchor bawaan

    event.preventDefault()
    setActive(id)
    smoothScrollToElement(target)
    window.history.replaceState(null, "", id === "home" ? "/" : `#${id}`)
  }

  return (
    <>
      <div
        id="nav-scroll-sentinel"
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 h-[70vh] w-px"
      />

      <nav
        className={`sticky top-0 z-50 border-b border-line backdrop-blur-md transition-colors duration-300 ${
          scrolled ? "bg-[rgb(10_14_13/0.88)]" : "bg-[rgb(10_14_13/0.62)]"
        }`}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between gap-4">
            <Link
              href="/"
              onClick={(event) => scrollToSection(event, "home")}
              className="flex shrink-0 items-center gap-2.5"
            >
              <Image
                src="/logo-wordmark.png"
                alt="Logo MFA"
                width={264}
                height={160}
                priority
                className="h-6 w-auto"
              />
              <span className="text-[0.95rem] font-semibold text-bone">
                Farrel
                <span className="ml-1.5 font-mono text-[0.8rem] font-normal text-faint">
                  {isBlog ? "blog" : ".dev"}
                </span>
              </span>
            </Link>

            <div className="hidden items-center gap-1 lg:flex">
              {sections.map((section) => {
                const isActive = isHome && active === section.id
                return (
                  <Link
                    key={section.id}
                    href={isHome ? `#${section.id}` : `/#${section.id}`}
                    onClick={(event) => scrollToSection(event, section.id)}
                    aria-current={isActive ? "true" : undefined}
                    className="nav-link"
                  >
                    {section.label}
                  </Link>
                )
              })}

              <Link
                href="/blog"
                aria-current={isBlog ? "page" : undefined}
                className="nav-link"
              >
                BLOG
              </Link>

              <Link
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm ml-2 py-1.5 tracking-[0.04em]"
              >
                GITHUB
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
              </Link>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-[var(--radius-sm)] border border-line-strong p-1.5 text-dim transition-colors hover:border-accent-line hover:text-bone lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              aria-controls="mobile-drawer"
            >
              {isOpen ? (
                <X className="h-5 w-5" strokeWidth={2.5} />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={2.5} />
              )}
            </button>
          </div>
        </div>

        {isOpen && (
          <div id="mobile-drawer" className="absolute inset-x-0 top-full lg:hidden">
            <div className="drawer-panel border-b border-line bg-[rgb(10_14_13/0.97)] px-4 pt-3 pb-4 backdrop-blur-md">
              <div className="flex flex-col gap-1">
                {sections.map((section) => {
                  const isActive = isHome && active === section.id
                  return (
                    <Link
                      key={section.id}
                      href={isHome ? `#${section.id}` : `/#${section.id}`}
                      onClick={(event) => scrollToSection(event, section.id)}
                      aria-current={isActive ? "true" : undefined}
                      className="nav-link py-2.5"
                    >
                      {section.label}
                    </Link>
                  )
                })}

                <Link
                  href="/blog"
                  onClick={() => setIsOpen(false)}
                  aria-current={isBlog ? "page" : undefined}
                  className="nav-link py-2.5"
                >
                  BLOG
                </Link>

                <Link
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="btn btn-primary mt-2"
                >
                  GITHUB
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
