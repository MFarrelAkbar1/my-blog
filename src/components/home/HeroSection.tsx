"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, Linkedin } from "lucide-react"
import SfxBurst from "@/components/ui/SfxBurst"

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

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center px-4 py-16 halftone">
      <div className="relative z-10 w-full max-w-3xl">
        {/* Panel cover — splash page Issue #01 */}
        <div className="panel p-8 sm:p-12 text-center">
          {/* Corner box khas cover komik */}
          <div className="absolute -top-4 -left-3 sm:-top-5 sm:-left-5 border-2 border-bone bg-ink px-3 py-1.5 text-left">
            <p className="font-display text-sm leading-none text-caption-y uppercase">
              Issue #01
            </p>
            <p className="font-mono text-[10px] text-muted mt-1">IDR 0.00</p>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl uppercase leading-[0.95] tracking-wide mb-6">
            Muhammad
            <br />
            Farrel <span className="text-accent">Akbar</span>
          </h1>

          {/* Caption box = log line terminal */}
          <div className="mb-6 min-h-8">
            <span className="caption text-left max-w-full">
              <span className="whitespace-normal">
                $ {displayText}
                <span
                  aria-hidden="true"
                  className={`inline-block w-2 h-3.5 ml-0.5 align-middle bg-ink transition-opacity ${
                    showCursor ? "opacity-100" : "opacity-0"
                  }`}
                />
              </span>
            </span>
          </div>

          <p className="text-muted text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Passionate about building secure, performant web applications.
            Focused on modern web development with TypeScript and PHP, combined
            with cybersecurity expertise in penetration testing and secure
            coding practices.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link
              href="/blog"
              className="group relative inline-flex items-center gap-2 border-[3px] border-bone bg-accent px-6 py-3 font-display text-base uppercase tracking-wider text-ink hover:bg-accent-hover transition-colors"
            >
              Read the Issues
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              <SfxBurst text="Access Granted!" className="-top-16 -right-10" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/muhammad-farrel-akbar-96274824b/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 border-[3px] border-slate-ink px-6 py-3 font-display text-base uppercase tracking-wider text-bone hover:border-bone transition-colors"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
              <SfxBurst
                text="Connect!"
                color="green"
                className="-top-16 -right-10"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
