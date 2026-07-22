"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Terminal } from "lucide-react"

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/blog", label: "ISSUES" },
  {
    href: "https://github.com/MFarrelAkbar1",
    label: "GITHUB",
    external: true,
  },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b-[3px] border-bone bg-ink/90 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Terminal className="h-5 w-5 text-accent transition-transform group-hover:rotate-12" />
            <span className="font-display text-xl tracking-wide text-bone uppercase">
              Farrel<span className="text-accent">.dev</span>
            </span>
            <span className="caption hidden sm:inline-block ml-2">
              <span>A CYBER-NOIR SERIES</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="font-mono text-xs tracking-widest text-muted hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-muted hover:text-accent transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden border-t-2 border-slate-ink pb-4">
            <div className="flex flex-col gap-3 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  {...(link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  onClick={() => setIsOpen(false)}
                  className="font-mono text-xs tracking-widest text-muted hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
