"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, Linkedin } from "lucide-react"

const tagline = "TypeScript Developer | PHP Web Developer | Security Analyst"

export default function HeroSection() {
  const [displayText, setDisplayText] = useState("")
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i <= tagline.length) {
        setDisplayText(tagline.slice(0, i))
        i++
      } else {
        clearInterval(interval)
      }
    }, 50)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)
    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent" />
      <div className="relative z-10 max-w-3xl text-center">
        <div className="mb-4 inline-block rounded-full border border-card-border bg-card-bg px-4 py-1.5">
          <span className="font-mono text-xs text-accent">
            ~/portfolio
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
          Muhammad Farrel{" "}
          <span className="text-accent">Akbar</span>
        </h1>
        <div className="h-8 mb-6">
          <p className="font-mono text-sm sm:text-base text-muted">
            <span className="text-accent">$</span> {displayText}
            <span
              className={`inline-block w-2 h-5 ml-0.5 align-middle bg-accent transition-opacity ${
                showCursor ? "opacity-100" : "opacity-0"
              }`}
            />
          </p>
        </div>
        <p className="text-muted text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
          Passionate about building secure, performant web applications. Focused
          on modern web development with TypeScript and PHP, combined with
          cybersecurity expertise in penetration testing and secure coding
          practices.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-background hover:bg-accent-hover transition-colors"
          >
            View Blog
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/muhammad-farrel-akbar-96274824b/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-card-border px-6 py-3 text-sm font-semibold text-foreground hover:border-accent hover:text-accent transition-colors"
          >
            <Linkedin className="h-4 w-4" />
            View LinkedIn
          </Link>
        </div>
      </div>
    </section>
  )
}
