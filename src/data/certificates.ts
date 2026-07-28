/**
 * Katalog sertifikat & dokumen yang tampil di section "Evidence Locker".
 *
 * `file` = nama file ASLI di `public/sertifikat-pdf/`. Jangan di-rename;
 * nama file mengandung spasi, tanda kurung, dan `!` — path-nya di-encode
 * per segment oleh `certificateHref()` di `@/lib/pdf`.
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
    file: "Best Project Bootcamp Mobile Development (1).pdf",
  },
  {
    id: "juara-1-bootcamp-iot",
    title: "Juara 1 – Bootcamp IoT",
    category: "Kompetisi",
    file: "Juara 1 Bootcamp IoT (1).pdf",
  },
  {
    id: "ctf-find-it-2025",
    title: "Peserta Capture The Flag – FIND IT! 2025",
    category: "Kompetisi",
    file: "E-Sertifikat Peserta Capture The Flag FIND IT! 2025 Muhammad Farrel Akbar.pdf",
    issuer: "FIND IT! 2025",
    year: "2025",
  },
  {
    id: "data-analyst-competition-find-it-2025",
    title: "Peserta Data Analyst Competition – FIND IT! 2025",
    category: "Kompetisi",
    file: "E-Sertifikat Peserta Data Analyst Competition FIND IT! 2025 Muhammad Farrel Akbar.pdf",
    issuer: "FIND IT! 2025",
    year: "2025",
  },
  {
    id: "codelamp-network-pentest",
    title: "Mini Bootcamp Network Penetration Testing",
    category: "Sertifikasi",
    file: "sertifikat codelamp.pdf",
    issuer: "Codelamp Indonesia — Lulus, 99.2/100 (Mastered)",
    year: "2026",
  },
  {
    id: "cisco-intro-cybersecurity",
    title: "Introduction to Cybersecurity",
    category: "Sertifikasi",
    file: "Muhammad FarrelAkbar-Introduction to -certificate (1).pdf",
    issuer: "Cisco Networking Academy",
  },
  {
    id: "cisco-ccna-itn",
    title: "CCNAv7: Introduction to Networks",
    category: "Sertifikasi",
    file: "Muhammad FarrelAkbar-CCNA-ITN Genap 2-certificate.pdf",
    issuer: "Cisco Networking Academy",
  },
  {
    id: "magang-pupuk-indonesia",
    title: "Sertifikat Magang – Praktik Industri",
    category: "Sertifikasi",
    file: "Magang PI a.n Muhammad Farrel Akbar.pdf",
    issuer: "PT Pupuk Indonesia (Persero)",
    year: "2025",
  },
  {
    id: "datacamp-advanced-deep-learning-keras",
    title: "Advanced Deep Learning with Keras",
    category: "Sertifikasi",
    file: "certificate Advanced Deep Learning with Keras.pdf",
    issuer: "DataCamp",
    year: "2024",
  },
  {
    id: "datacamp-intro-deep-learning-keras",
    title: "Introduction to Deep Learning with Keras",
    category: "Sertifikasi",
    file: "datacap introduction to deep learning with keras.pdf",
    issuer: "DataCamp",
    year: "2024",
  },
  {
    id: "datacamp-cleaning-data-python",
    title: "Cleaning Data in Python",
    category: "Sertifikasi",
    file: "certificate Cleaning Data in Python.pdf",
    issuer: "DataCamp",
    year: "2024",
  },
  {
    id: "datacamp-dimensionality-reduction",
    title: "Dimensionality Reduction in Python",
    category: "Sertifikasi",
    file: "certificate Dimensionality Reduction in Python.pdf",
    issuer: "DataCamp",
    year: "2024",
  },
  {
    id: "datacamp-eda-python",
    title: "Exploratory Data Analysis in Python",
    category: "Sertifikasi",
    file: "certificate Exploratory Data Analysis in Python.pdf",
    issuer: "DataCamp",
    year: "2024",
  },
  {
    id: "datacamp-intro-statistics-python",
    title: "Introduction to Statistics in Python",
    category: "Sertifikasi",
    file: "datacamp introduction to statistics in python.pdf",
    issuer: "DataCamp",
    year: "2024",
  },
  {
    id: "datacamp-understanding-data-science",
    title: "Understanding Data Science",
    category: "Sertifikasi",
    file: "certificate Understanding Data Science.pdf",
    issuer: "DataCamp",
    year: "2024",
  },
  {
    id: "stc-public-speaking",
    title: "Public Speaking Program",
    category: "Sertifikasi",
    file: "Sertifikat_STC_M.Farrel Akbar.pdf",
    issuer: "STC",
    year: "2024",
  },
  {
    id: "mapreduce-log-anomaly",
    title: "Implementasi MapReduce untuk Identifikasi Anomali pada Log Akses",
    category: "Publikasi",
    file: "Implementasi MapReduce untuk Identifikasi Anomali pada Log Akses.pdf",
    issuer: "Big Data Analitik — DTETI FT UGM",
  },
  {
    id: "asisten-pemrograman-dasar",
    title: "Asisten Praktikum Pemrograman Dasar – Genap 2025/2026",
    category: "Akademik",
    file: "Sertifikat Pemrograman Dasar Genap 2025-Muhammad Farrel Akbar.pdf",
    issuer: "DTETI FT UGM",
    year: "2026",
  },
  {
    id: "skpi-bso-ski",
    title: "SKPI – BSO SKI",
    category: "Akademik",
    file: "SKPI BSO SKI-Final.pdf",
    issuer: "Fakultas Teknik UGM",
  },
]
