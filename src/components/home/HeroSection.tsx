"use client"

import { useEffect, useState, type MouseEvent } from "react"
import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  type LucideIcon,
} from "lucide-react"
import CopyButton from "@/components/ui/CopyButton"
import { smoothScrollToElement } from "@/lib/smoothScroll"
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/data/profile"

const tagline = "TypeScript Developer | PHP Web Developer | Security Analyst"

const socials: {
  title: string
  description: string
  url: string
  icon: LucideIcon
  /** Nilai yang disalin oleh tombol Copy; bila ada, tautan dibuka di tab yang sama */
  copy?: string
}[] = [
  {
    title: "Email",
    description: CONTACT_EMAIL,
    url: `mailto:${CONTACT_EMAIL}`,
    icon: Mail,
    copy: CONTACT_EMAIL,
  },
  {
    title: "LinkedIn",
    description: "Professional profile and networking",
    url: LINKEDIN_URL,
    icon: Linkedin,
  },
  {
    title: "GitHub",
    description: "Code repositories and open source",
    url: GITHUB_URL,
    icon: Github,
  },
]

export default function HeroSection() {
  const [displayText, setDisplayText] = useState("")
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    // Hormati prefers-reduced-motion: tampilkan langsung tanpa efek ketik
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayText(tagline)
      return
    }

    let i = 0
    const interval = setInterval(() => {
      if (i <= tagline.length) {
        setDisplayText(tagline.slice(0, i))
        i++
      } else {
        clearInterval(interval)
      }
    }, 50)

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)

    return () => {
      clearInterval(interval)
      clearInterval(cursorInterval)
    }
  }, [])

  const scrollToProjects = (event: MouseEvent) => {
    const target = document.getElementById("projects")
    if (!target) return
    event.preventDefault()
    smoothScrollToElement(target)
    window.history.replaceState(null, "", "#projects")
  }

  return (
    <section
      id="home"
      className="relative flex min-h-[88svh] scroll-mt-24 items-center px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-2xl">
          <h1 className="text-5xl leading-[1.05] font-light tracking-tight text-bone sm:text-6xl lg:text-7xl">
            Muhammad Farrel Akbar
          </h1>

          {/* Tagline diketik seperti log terminal */}
          <p
            className="mt-5 min-h-[1.5em] font-mono text-xs font-semibold tracking-[0.18em] text-bone/85 uppercase sm:text-sm"
            aria-label={tagline}
          >
            <span aria-hidden="true">
              {displayText}
              <span
                className={`ml-0.5 inline-block h-[1em] w-[0.55em] translate-y-[0.15em] bg-accent transition-opacity ${
                  showCursor ? "opacity-100" : "opacity-0"
                }`}
              />
            </span>
          </p>

          <p className="mt-6 text-base leading-relaxed text-bone/75 sm:text-lg">
            Passionate about building secure, performant web applications.
            Focused on modern web development with TypeScript and PHP, combined
            with cybersecurity expertise in penetration testing and secure
            coding practices.
          </p>

          <p className="mt-5 text-base font-semibold text-bone sm:text-lg">
            Interested in secure web development or penetration testing?
            Let&apos;s connect.
          </p>

          {/* Kotak Email selebar isinya (max-content) agar alamat tidak terpotong.
              Tablet: Email satu baris penuh, LinkedIn + GitHub di bawahnya.
              Desktop: grid melebar keluar max-w-2xl supaya ketiganya muat sebaris. */}
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:w-4xl lg:grid-cols-[max-content_1fr_1fr]">
            {socials.map((social) => (
              <div
                key={social.title}
                className={`panel panel-hover group flex items-center justify-between gap-3 p-4 ${
                  social.copy ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <social.icon
                    className="h-5 w-5 shrink-0 text-dim transition-colors group-hover:text-accent"
                    strokeWidth={2}
                  />
                  <div className="min-w-0">
                    {/* Pseudo-elemen ::after merentangkan tautan ke seluruh kotak,
                        sehingga tombol Copy tidak perlu bersarang di dalam <a> */}
                    <Link
                      href={social.url}
                      {...(social.copy
                        ? {}
                        : { target: "_blank", rel: "noopener noreferrer" })}
                      className="font-semibold text-bone after:absolute after:inset-0 after:rounded-[inherit] focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-accent"
                    >
                      {social.title}
                    </Link>
                    <p className="mt-0.5 text-sm text-dim wrap-anywhere">
                      {/* Titik potong baris sebelum "@" agar alamat email terbelah rapi */}
                      {social.description.split("@").map((part, i) => (
                        <span key={i}>
                          {i > 0 && (
                            <>
                              <wbr />@
                            </>
                          )}
                          {part}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
                {social.copy ? (
                  <div className="relative z-10 shrink-0">
                    <CopyButton value={social.copy} iconOnly />
                  </div>
                ) : (
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-dim transition-colors group-hover:text-accent"
                    strokeWidth={2.5}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/#projects"
              onClick={scrollToProjects}
              className="btn btn-primary"
            >
              View Projects
            </Link>
            <Link href="/blog" className="btn btn-secondary group">
              View Blog
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
