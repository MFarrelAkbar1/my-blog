"use client"

import { useMemo, useState } from "react"
import {
  CERTIFICATE_CATEGORIES,
  certificates,
  type CertificateCategory,
} from "@/data/certificates"
import CertificateCard from "@/components/certificates/CertificateCard"
import CertificateModal from "@/components/certificates/CertificateModal"

type Filter = "Semua" | CertificateCategory

const FILTERS: Filter[] = ["Semua", ...CERTIFICATE_CATEGORIES]

export default function CertificatesSection() {
  const [filter, setFilter] = useState<Filter>("Semua")
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null)

  const visible = useMemo(
    () =>
      filter === "Semua"
        ? certificates
        : certificates.filter((c) => c.category === filter),
    [filter]
  )

  const countFor = (value: Filter) =>
    value === "Semua"
      ? certificates.length
      : certificates.filter((c) => c.category === value).length

  const changeFilter = (next: Filter) => {
    setOpenIndex(null)
    setFilter(next)
  }

  return (
    <section id="certificates" className="speedlines scroll-mt-24 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <span className="caption">
            <span>[EVIDENCE_LOCKER] // certificates</span>
          </span>
          <h2 className="mt-4 font-display text-4xl tracking-wide uppercase">
            Sertifikat &amp; Kredensial
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-mono text-xs leading-relaxed text-muted">
            {certificates.length} dokumen — klik panel untuk membuka berkas
            aslinya.
          </p>
        </div>

        {/* Filter kategori */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
          {FILTERS.map((value) => {
            const active = filter === value
            return (
              <button
                key={value}
                type="button"
                onClick={() => changeFilter(value)}
                aria-pressed={active}
                className={`border-2 px-3.5 py-1.5 font-mono text-[11px] tracking-widest uppercase transition-colors ${
                  active
                    ? "border-bone bg-accent text-ink"
                    : "border-slate-ink text-muted hover:border-accent hover:text-accent"
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

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
