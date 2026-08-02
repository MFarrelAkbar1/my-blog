"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState, type MouseEvent } from "react"
import { Menu, X, ExternalLink } from "lucide-react"
import { smoothScrollToElement } from "@/lib/smoothScroll"

/** Section one-page di halaman utama — urutannya sama dengan urutan di `/` */
const sections = [
  { id: "home", label: "HOME" },
  { id: "stack", label: "STACK" },
  { id: "experience", label: "ORIGIN" },
  { id: "projects", label: "PROJECTS" },
  { id: "certificates", label: "CERTS" },
  { id: "issues", label: "ISSUES" },
] as const

const githubUrl = "https://github.com/MFarrelAkbar1"

/**
 * Garis bawah "coretan tinta" yang menggambar dirinya sendiri.
 * pathLength dinormalisasi ke 1 supaya dash offset bisa dianimasikan
 * tanpa tahu panjang path sebenarnya.
 */
function InkUnderline({ active }: { active: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 8"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -bottom-1.5 left-0 h-2 w-full overflow-visible"
    >
      <path
        d="M1,5.2 C14,2.4 27,6.6 41,4.2 C55,1.9 70,6.4 84,3.8 C90,2.7 95,4.3 99,3.4"
        pathLength={1}
        fill="none"
        stroke="var(--phosphor)"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeDasharray={1}
        strokeDashoffset={active ? 0 : 1}
        className="ink-underline-path"
      />
    </svg>
  )
}

export default function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === "/"

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

  // Sentinel setinggi hero: begitu keluar viewport, navbar mengecil + berbayang
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
        className={`sticky top-0 z-50 border-b-[3px] border-bone transition-all duration-300 ${
          scrolled
            ? "bg-ink/85 shadow-[0_6px_0_-2px_var(--slate-ink),0_18px_30px_-20px_rgba(0,0,0,0.9)] backdrop-blur-md"
            : "bg-ink"
        }`}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              scrolled ? "h-13" : "h-16"
            }`}
          >
            <Link
              href="/"
              onClick={(event) => scrollToSection(event, "home")}
              className="group flex items-center gap-2.5"
            >
              <Image
                src="/logo-wordmark.png"
                alt="Logo MFA"
                width={264}
                height={160}
                priority
                className={`w-auto transition-all group-hover:-rotate-3 ${
                  scrolled ? "h-6" : "h-8"
                }`}
              />
              <span
                className={`font-display tracking-wide text-bone uppercase transition-all ${
                  scrolled ? "text-lg" : "text-xl"
                }`}
              >
                Farrel<span className="text-accent">.dev</span>
              </span>
              <span
                className={`caption ml-2 hidden transition-opacity lg:inline-block ${
                  scrolled ? "opacity-0" : "opacity-100"
                }`}
              >
                <span>A CYBER-NOIR SERIES</span>
              </span>
            </Link>

            <div className="hidden items-center gap-7 lg:flex">
              {sections.map((section) => {
                const isActive = isHome && active === section.id
                return (
                  <Link
                    key={section.id}
                    href={isHome ? `#${section.id}` : `/#${section.id}`}
                    onClick={(event) => scrollToSection(event, section.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative font-mono text-xs tracking-widest transition-colors ${
                      isActive ? "text-accent" : "text-muted hover:text-bone"
                    }`}
                  >
                    {section.label}
                    <InkUnderline active={isActive} />
                  </Link>
                )
              })}

              <Link
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 border-2 border-slate-ink px-2.5 py-1.5 font-mono text-xs tracking-widest text-muted transition-colors hover:border-accent hover:text-accent"
              >
                GITHUB
                <ExternalLink className="h-3 w-3" strokeWidth={2.5} />
              </Link>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="border-2 border-slate-ink p-1.5 text-muted transition-colors hover:border-accent hover:text-accent lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              aria-controls="mobile-drawer"
            >
              {isOpen ? (
                <X className="h-5 w-5" strokeWidth={3} />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={3} />
              )}
            </button>
          </div>
        </div>

        {/* Drawer mobile — panel komik yang terbuka seperti dibalik dari atas */}
        {isOpen && (
          <div
            id="mobile-drawer"
            className="drawer-perspective absolute inset-x-0 top-full lg:hidden"
          >
            <div className="drawer-panel border-b-[3px] border-bone bg-panel px-4 pt-4 pb-5 shadow-[0_20px_30px_-20px_rgba(0,0,0,0.95)]">
              <div className="flex flex-col">
                {sections.map((section, idx) => {
                  const isActive = isHome && active === section.id
                  return (
                    <Link
                      key={section.id}
                      href={isHome ? `#${section.id}` : `/#${section.id}`}
                      onClick={(event) => scrollToSection(event, section.id)}
                      style={{ animationDelay: `${120 + idx * 45}ms` }}
                      className={`drawer-item flex items-center justify-between border-b-2 border-slate-ink py-3 font-mono text-sm tracking-widest transition-colors ${
                        isActive ? "text-accent" : "text-muted"
                      }`}
                    >
                      {section.label}
                      <span className="font-display text-xs text-caption-y">
                        #{String(idx + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  )
                })}

                <Link
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  style={{
                    animationDelay: `${120 + sections.length * 45}ms`,
                  }}
                  className="drawer-item mt-4 flex items-center justify-center gap-2 border-2 border-bone bg-accent px-4 py-2.5 font-display text-sm tracking-wider text-ink uppercase"
                >
                  GitHub
                  <ExternalLink className="h-3.5 w-3.5" strokeWidth={2.5} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
