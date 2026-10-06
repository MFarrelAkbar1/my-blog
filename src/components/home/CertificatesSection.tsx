"use client"

import { useMemo, useState } from "react"
import {
  CERTIFICATE_CATEGORIES,
  certificates,
  type CertificateCategory,
} from "@/data/certificates"
import CertificateCard from "@/components/certificates/CertificateCard"
import CertificateModal from "@/components/certificates/CertificateModal"

type Filter = "All" | CertificateCategory

const FILTERS: Filter[] = ["All", ...CERTIFICATE_CATEGORIES]

export default function CertificatesSection() {
  const [filter, setFilter] = useState<Filter>("All")
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null)

  const visible = useMemo(
    () =>
      filter === "All"
        ? certificates
        : certificates.filter((c) => c.category === filter),
    [filter]
  )

  const countFor = (value: Filter) =>
    value === "All"
      ? certificates.length
      : certificates.filter((c) => c.category === value).length

  const changeFilter = (next: Filter) => {
    setOpenIndex(null)
    setFilter(next)
  }

  return (
    <section
      id="certificates"
      className="scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="section-head">
          <h2 className="section-title">Certificates &amp; Credentials</h2>
          <p className="section-caption">
            {certificates.length} documents — click a panel to open the original
            file.
          </p>
        </div>

        {/* Filter kategori */}
        <div className="mb-8 flex flex-wrap items-center gap-2">
          {FILTERS.map((value) => {
            const active = filter === value
            return (
              <button
                key={value}
                type="button"
                onClick={() => changeFilter(value)}
                aria-pressed={active}
                className={`rounded-[var(--radius-sm)] border px-3 py-1.5 font-mono text-[11px] tracking-widest uppercase transition-colors ${
                  active
                    ? "border-accent-line bg-accent-soft text-bone"
                    : "border-line-strong bg-panel text-dim hover:border-accent-line hover:text-bone"
                }`}
              >
                {value}
                <span className={active ? "opacity-70" : "opacity-50"}>
                  {" "}
                  [{countFor(value)}]
                </span>
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((certificate, idx) => (
            <CertificateCard
              key={certificate.id}
              certificate={certificate}
              index={idx}
              onOpen={(point) => {
                setOrigin(point)
                setOpenIndex(idx)
              }}
            />
          ))}
        </div>
      </div>

      {openIndex !== null && (
        <CertificateModal
          certificates={visible}
          index={openIndex}
          origin={origin}
          onNavigate={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </section>
  )
}
