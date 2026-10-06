"use client"

import { useEffect, useState, type MouseEvent } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { smoothScrollToElement } from "@/lib/smoothScroll"

const tagline = "TypeScript Developer | PHP Web Developer | Security Analyst"

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
