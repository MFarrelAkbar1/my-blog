import { Terminal } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t-[3px] border-bone bg-ink halftone">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-accent" />
            <span className="font-display text-sm tracking-wide text-muted uppercase">
              Farrel<span className="text-accent">.dev</span>
            </span>
          </div>
          <span className="caption">
            <span>NEXT ISSUE: COMING SOON</span>
          </span>
          <p className="font-mono text-xs text-muted">
            &copy; {new Date().getFullYear()} Muhammad Farrel Akbar. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
