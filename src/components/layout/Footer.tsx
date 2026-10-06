import { Terminal } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-line bg-[rgb(10_14_13/0.9)] backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-accent" />
            <span className="text-sm font-semibold text-bone">
              Farrel
              <span className="ml-1 font-mono text-xs font-normal text-faint">
                .dev
              </span>
            </span>
          </div>
          <span className="font-mono text-[11px] tracking-[0.14em] text-faint">
            NEXT ISSUE: COMING SOON
          </span>
          <p className="font-mono text-xs text-dim">
            &copy; {new Date().getFullYear()} Muhammad Farrel Akbar. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
