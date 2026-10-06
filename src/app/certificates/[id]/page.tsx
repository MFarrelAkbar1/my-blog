import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Download, ExternalLink } from "lucide-react"
import { certificates } from "@/data/certificates"
import { certificateHref } from "@/lib/pdf"
import { certificatePagePath } from "@/lib/certificates"
import CertificatePageViewer from "@/components/certificates/CertificatePageViewer"
import CopyLinkButton from "@/components/certificates/CopyLinkButton"

interface PageProps {
  params: Promise<{ id: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return certificates.map((certificate) => ({ id: certificate.id }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params
  const certificate = certificates.find((c) => c.id === id)
  if (!certificate) return { title: "Document Not Found" }

  return {
    title: certificate.title,
    description: [certificate.category, certificate.issuer, certificate.year]
      .filter(Boolean)
      .join(" · "),
  }
}

const actionClass =
  "flex items-center gap-1.5 rounded-[var(--radius-sm)] border border-line-strong px-2.5 py-2 font-mono text-[10px] tracking-widest text-dim transition-colors hover:border-accent-line hover:text-bone"

export default async function CertificatePage({ params }: PageProps) {
  const { id } = await params
  const certificate = certificates.find((c) => c.id === id)
  if (!certificate) notFound()

  const href = certificateHref(certificate.file)

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <Link
        href="/#certificates"
        className="group mb-6 inline-flex items-center gap-1.5 font-mono text-xs tracking-[0.14em] text-dim transition-colors hover:text-accent"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
        BACK TO CERTIFICATES
      </Link>

      <div className="panel flex h-[85vh] min-h-[32rem] flex-col overflow-hidden">
        <div className="flex shrink-0 flex-col gap-4 border-b border-line bg-panel p-4 sm:flex-row sm:items-start">
          <div className="min-w-0 flex-1">
            <span className="caption">
              <span>
                {certificate.category}
                {certificate.year ? ` · ${certificate.year}` : ""}
              </span>
            </span>
            <h1 className="mt-2.5 text-lg leading-snug font-semibold text-bone sm:text-xl">
              {certificate.title}
            </h1>
            {certificate.issuer && (
              <p className="mt-1 font-mono text-[11px] text-muted">
                {certificate.issuer}
              </p>
            )}
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <CopyLinkButton
              path={certificatePagePath(certificate.id)}
              className={actionClass}
            />
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={actionClass}
            >
              <ExternalLink className="h-4 w-4" strokeWidth={2.5} />
              OPEN PDF
            </a>
            <a href={href} download className={actionClass}>
              <Download className="h-4 w-4" strokeWidth={2.5} />
              DOWNLOAD
            </a>
          </div>
        </div>

        <CertificatePageViewer file={href} />
      </div>
    </div>
  )
}
