/**
 * Katalog sertifikat & dokumen yang tampil di section "Evidence Locker".
 *
 * `file` = nama file di `public/sertifikat-pdf/`, seluruhnya kebab-case tanpa
 * spasi/karakter spesial supaya URL-nya bisa disalin langsung (mis. ke CV).
 * Pertahankan konvensi ini saat menambah entri baru; `certificateHref()` di
 * `@/lib/pdf` yang menyusun path publiknya.
 */

export const CERTIFICATE_CATEGORIES = [
  "Sertifikasi",
  "Kompetisi",
  "Publikasi",
  "Akademik",
] as const

export type CertificateCategory = (typeof CERTIFICATE_CATEGORIES)[number]

export interface Certificate {
  id: string
  title: string
  category: CertificateCategory
  file: string
  /** Penerbit / penyelenggara, ditampilkan sebagai sub-label di kartu */
  issuer?: string
  /** Tahun terbit, ditampilkan di caption box */
  year?: string
}

export const certificates: Certificate[] = [
  {
    id: "best-project-bootcamp-mobile",
    title: "Best Project – Bootcamp Mobile Development",
    category: "Kompetisi",
    file: "best-project-bootcamp-mobile-development.pdf",
  },
  {
    id: "juara-1-bootcamp-iot",
    title: "Juara 1 – Bootcamp IoT",
    category: "Kompetisi",
    file: "juara-1-bootcamp-iot.pdf",
  },
  {
    id: "ctf-find-it-2025",
    title: "Peserta Capture The Flag – FIND IT! 2025",
    category: "Kompetisi",
    file: "capture-the-flag-find-it-2025.pdf",
    issuer: "FIND IT! 2025",
    year: "2025",
  },
  {
    id: "data-analyst-competition-find-it-2025",
    title: "Peserta Data Analyst Competition – FIND IT! 2025",
    category: "Kompetisi",
    file: "data-analyst-competition-find-it-2025.pdf",
    issuer: "FIND IT! 2025",
    year: "2025",
  },
  {
    id: "codelamp-network-pentest",
    title: "Mini Bootcamp Network Penetration Testing",
    category: "Sertifikasi",
    file: "sertifikat-codelamp.pdf",
    issuer: "Codelamp Indonesia — Lulus, 99.2/100 (Mastered)",
    year: "2026",
  },
  {
    id: "cisco-intro-cybersecurity",
    title: "Introduction to Cybersecurity",
    category: "Sertifikasi",
    file: "introduction-to-cybersecurity-certificate.pdf",
    issuer: "Cisco Networking Academy",
  },
  {
    id: "cisco-ccna-itn",
    title: "CCNAv7: Introduction to Networks",
    category: "Sertifikasi",
    file: "ccna-itn-certificate.pdf",
    issuer: "Cisco Networking Academy",
  },
  {
    id: "magang-pupuk-indonesia",
    title: "Sertifikat Magang – Praktik Industri",
    category: "Sertifikasi",
    file: "magang-praktik-industri.pdf",
    issuer: "PT Pupuk Indonesia (Persero)",
    year: "2025",
  },
  {
    id: "datacamp-advanced-deep-learning-keras",
    title: "Advanced Deep Learning with Keras",
    category: "Sertifikasi",
    file: "advanced-deep-learning-with-keras.pdf",
    issuer: "DataCamp",
    year: "2024",
  },
  {
    id: "datacamp-intro-deep-learning-keras",
    title: "Introduction to Deep Learning with Keras",
    category: "Sertifikasi",
    file: "introduction-to-deep-learning-with-keras.pdf",
    issuer: "DataCamp",
    year: "2024",
  },
  {
    id: "datacamp-cleaning-data-python",
    title: "Cleaning Data in Python",
    category: "Sertifikasi",
    file: "cleaning-data-in-python.pdf",
    issuer: "DataCamp",
    year: "2024",
  },
  {
    id: "datacamp-dimensionality-reduction",
    title: "Dimensionality Reduction in Python",
    category: "Sertifikasi",
    file: "dimensionality-reduction-in-python.pdf",
    issuer: "DataCamp",
    year: "2024",
  },
  {
    id: "datacamp-eda-python",
    title: "Exploratory Data Analysis in Python",
    category: "Sertifikasi",
    file: "exploratory-data-analysis-in-python.pdf",
    issuer: "DataCamp",
    year: "2024",
  },
  {
    id: "datacamp-intro-statistics-python",
    title: "Introduction to Statistics in Python",
    category: "Sertifikasi",
    file: "introduction-to-statistics-in-python.pdf",
    issuer: "DataCamp",
    year: "2024",
  },
  {
    id: "datacamp-understanding-data-science",
    title: "Understanding Data Science",
    category: "Sertifikasi",
    file: "understanding-data-science.pdf",
    issuer: "DataCamp",
    year: "2024",
  },
  {
    id: "stc-public-speaking",
    title: "Public Speaking Program",
    category: "Sertifikasi",
    file: "sertifikat-stc.pdf",
    issuer: "STC",
    year: "2024",
  },
  {
    id: "mapreduce-log-anomaly",
    title: "Implementasi MapReduce untuk Identifikasi Anomali pada Log Akses",
    category: "Publikasi",
    file: "implementasi-mapreduce-anomali-log-akses.pdf",
    issuer: "Big Data Analitik — DTETI FT UGM",
  },
  {
    id: "laporan-akhir-penetration-testing",
    title: "Laporan Akhir – Penetration Testing",
    category: "Publikasi",
    file: "laporan-akhir-penetration-testing.pdf",
  },
  {
    id: "asisten-pemrograman-dasar",
    title: "Asisten Praktikum Pemrograman Dasar – Genap 2025/2026",
    category: "Akademik",
    file: "sertifikat-pemrograman-dasar-genap-2025.pdf",
    issuer: "DTETI FT UGM",
    year: "2026",
  },
  {
    id: "skpi-bso-ski",
    title: "SKPI – BSO SKI",
    category: "Akademik",
    file: "skpi-bso-ski.pdf",
    issuer: "Fakultas Teknik UGM",
  },
]
