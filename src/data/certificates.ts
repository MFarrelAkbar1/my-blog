/**
 * Katalog sertifikat & dokumen yang tampil di section "Evidence Locker".
 *
 * `file` = nama file di `public/sertifikat-pdf/`, seluruhnya kebab-case tanpa
 * spasi/karakter spesial supaya URL-nya bisa disalin langsung (mis. ke CV).
 * Pertahankan konvensi ini saat menambah entri baru; `certificateHref()` di
 * `@/lib/pdf` yang menyusun path publiknya.
 */

export const CERTIFICATE_CATEGORIES = [
  "Certifications",
  "Competitions",
  "Publications",
  "Academic",
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
    category: "Competitions",
    file: "best-project-bootcamp-mobile-development.pdf",
  },
  {
    id: "juara-1-bootcamp-iot",
    title: "1st Place – IoT Bootcamp",
    category: "Competitions",
    file: "juara-1-bootcamp-iot.pdf",
  },
  {
    id: "ctf-find-it-2025",
    title: "Participant – Capture The Flag, FIND IT! 2025",
    category: "Competitions",
    file: "capture-the-flag-find-it-2025.pdf",
    issuer: "FIND IT! 2025",
    year: "2025",
  },
  {
    id: "data-analyst-competition-find-it-2025",
    title: "Participant – Data Analyst Competition, FIND IT! 2025",
    category: "Competitions",
    file: "data-analyst-competition-find-it-2025.pdf",
    issuer: "FIND IT! 2025",
    year: "2025",
  },
  {
    id: "codelamp-network-pentest",
    title: "Mini Bootcamp Network Penetration Testing",
    category: "Certifications",
    file: "sertifikat-codelamp.pdf",
    issuer: "Codelamp Indonesia — Passed, 99.2/100 (Mastered)",
    year: "2026",
  },
  {
    id: "cisco-intro-cybersecurity",
    title: "Introduction to Cybersecurity",
    category: "Certifications",
    file: "introduction-to-cybersecurity-certificate.pdf",
    issuer: "Cisco Networking Academy",
  },
  {
    id: "cisco-ccna-itn",
    title: "CCNAv7: Introduction to Networks",
    category: "Certifications",
    file: "ccna-itn-certificate.pdf",
    issuer: "Cisco Networking Academy",
  },
  {
    id: "magang-pupuk-indonesia",
    title: "Internship Certificate – Industrial Practice",
    category: "Certifications",
    file: "magang-praktik-industri.pdf",
    issuer: "PT Pupuk Indonesia (Persero)",
    year: "2025",
  },
  {
    id: "datacamp-advanced-deep-learning-keras",
    title: "Advanced Deep Learning with Keras",
    category: "Certifications",
    file: "advanced-deep-learning-with-keras.pdf",
    issuer: "DataCamp",
    year: "2024",
  },
  {
    id: "datacamp-intro-deep-learning-keras",
    title: "Introduction to Deep Learning with Keras",
    category: "Certifications",
    file: "introduction-to-deep-learning-with-keras.pdf",
    issuer: "DataCamp",
    year: "2024",
  },
  {
    id: "datacamp-cleaning-data-python",
    title: "Cleaning Data in Python",
    category: "Certifications",
    file: "cleaning-data-in-python.pdf",
    issuer: "DataCamp",
    year: "2024",
  },
  {
    id: "datacamp-dimensionality-reduction",
    title: "Dimensionality Reduction in Python",
    category: "Certifications",
    file: "dimensionality-reduction-in-python.pdf",
    issuer: "DataCamp",
    year: "2024",
  },
  {
    id: "datacamp-eda-python",
    title: "Exploratory Data Analysis in Python",
    category: "Certifications",
    file: "exploratory-data-analysis-in-python.pdf",
    issuer: "DataCamp",
    year: "2024",
  },
  {
    id: "datacamp-intro-statistics-python",
    title: "Introduction to Statistics in Python",
    category: "Certifications",
    file: "introduction-to-statistics-in-python.pdf",
    issuer: "DataCamp",
    year: "2024",
  },
  {
    id: "datacamp-understanding-data-science",
    title: "Understanding Data Science",
    category: "Certifications",
    file: "understanding-data-science.pdf",
    issuer: "DataCamp",
    year: "2024",
  },
  {
    id: "stc-public-speaking",
    title: "Public Speaking Program",
    category: "Certifications",
    file: "sertifikat-stc.pdf",
    issuer: "STC",
    year: "2024",
  },
  {
    id: "mapreduce-log-anomaly",
    title: "Implementing MapReduce to Identify Anomalies in Access Logs",
    category: "Publications",
    file: "implementasi-mapreduce-anomali-log-akses.pdf",
    issuer: "Big Data Analytics — DTETI FT UGM",
  },
  {
    id: "laporan-akhir-penetration-testing",
    title: "Final Report – Penetration Testing",
    category: "Publications",
    file: "laporan-akhir-penetration-testing.pdf",
  },
  {
    id: "asisten-pemrograman-dasar",
    title: "Basic Programming Lab Assistant – Even Semester 2025/2026",
    category: "Academic",
    file: "sertifikat-pemrograman-dasar-genap-2025.pdf",
    issuer: "DTETI FT UGM",
    year: "2026",
  },
  {
    id: "skpi-bso-ski",
    title: "Diploma Supplement (SKPI) – BSO SKI",
    category: "Academic",
    file: "skpi-bso-ski.pdf",
    issuer: "Faculty of Engineering, UGM",
  },
]
