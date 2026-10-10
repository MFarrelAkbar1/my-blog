import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import CopyButton from "@/components/ui/CopyButton"
import { profileRows } from "@/data/profile"

export default function ProfilePanel() {
  return (
    <section aria-labelledby="profile-label" className="panel flex flex-col">
      <div className="panel-head">
        <h2 id="profile-label" className="panel-label">
          Profile
        </h2>
      </div>

      <dl className="divide-y divide-line">
        {profileRows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[6.5rem_minmax(0,1fr)_auto] items-center gap-x-3 px-4 py-3 sm:grid-cols-[7rem_minmax(0,1fr)_auto]"
          >
            <dt className="text-sm text-faint">{row.label}</dt>
            <dd className="min-w-0 text-sm">
              <span
                className={`font-semibold text-bone ${
                  row.mono ? "font-mono font-normal" : ""
                }`}
              >
                {row.value}
              </span>
              {row.detail && (
                <span className="text-dim">
                  <span aria-hidden="true" className="mx-1.5">
                    ·
                  </span>
                  {row.detail}
                </span>
              )}
              {row.more?.map((line) => (
                <span key={line.value} className="mt-1.5 block">
                  <span className="font-semibold text-bone">{line.value}</span>
                  {line.detail && (
                    <span className="text-dim">
                      <span aria-hidden="true" className="mx-1.5">
                        ·
                      </span>
                      {line.detail}
                    </span>
                  )}
                </span>
              ))}
            </dd>
            <dd className="justify-self-end">
              {row.action?.kind === "copy" && (
                <CopyButton value={row.action.value} />
              )}
              {row.action?.kind === "open" && (
                <Link
                  href={row.action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${row.label}`}
                  className="btn btn-secondary btn-sm"
                >
                  Open
                  <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
                </Link>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
