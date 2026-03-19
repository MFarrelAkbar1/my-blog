"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Terminal } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-card-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Terminal className="h-5 w-5 text-accent transition-transform group-hover:rotate-12" />
            <span className="font-mono text-lg font-bold text-foreground">
              farrel<span className="text-accent">.dev</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm text-muted hover:text-accent transition-colors"
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="text-sm text-muted hover:text-accent transition-colors"
            >
              Blog
            </Link>
            <Link
              href="https://github.com/MFarrelAkbar1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:text-accent transition-colors"
            >
              GitHub
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-muted hover:text-accent transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden border-t border-card-border pb-4">
            <div className="flex flex-col gap-3 pt-4">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="text-sm text-muted hover:text-accent transition-colors"
              >
                Home
              </Link>
              <Link
                href="/blog"
                onClick={() => setIsOpen(false)}
                className="text-sm text-muted hover:text-accent transition-colors"
              >
                Blog
              </Link>
              <Link
                href="https://github.com/MFarrelAkbar1"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="text-sm text-muted hover:text-accent transition-colors"
              >
                GitHub
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
