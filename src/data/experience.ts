import {
  Briefcase,
  GraduationCap,
  Mic,
  Shield,
  Terminal,
  Users,
  type LucideIcon,
} from "lucide-react"

export type LocationType = "On-site" | "Hybrid" | "Remote"

export type EmploymentType = "Kontrak" | "Part-time" | "Magang" | "Penuh Waktu"

export interface Experience {
  id: string
  role: string
  company: string
  employmentType: EmploymentType
  /** Bulan mulai, format tampilan "Mmm YYYY" */
  startDate: string
  /** Bulan selesai, format tampilan "Mmm YYYY" */
  endDate: string
  duration: string
  location: string
  locationType: LocationType
  summary: string
  icon: LucideIcon
}

export const experiences: Experience[] = [
  {
    id: "ugm-lab-assistant",
    role: "Basic Programmer Lab Assistant",
    company: "Universitas Gadjah Mada",
    employmentType: "Kontrak",
    startDate: "Feb 2026",
    endDate: "Jul 2026",
    duration: "6 bln",
    location: "Sleman, Yogyakarta",
    locationType: "On-site",
    summary:
      "Mendampingi mahasiswa dalam praktikum dasar pemrograman C++ (termasuk setup environment MinGW di Windows), serta membantu penilaian worksheet dan kuis mahasiswa.",
    icon: GraduationCap,
  },
  {
    id: "cyberkarta-trainee",
    role: "Cyber Security Specialist Trainee",
    company: "Cyberkarta",
    employmentType: "Part-time",
    startDate: "Aug 2025",
    endDate: "Nov 2025",
    duration: "4 bln",
    location: "Sleman, Yogyakarta",
    locationType: "Hybrid",
    summary:
      "Melakukan latihan penetration testing (reconnaissance jaringan, SQL injection, privilege escalation) dan asesmen keamanan aplikasi web menggunakan Nmap, SQLMap, dan Dirsearch, termasuk aktivitas post-exploitation.",
    icon: Shield,
  },
  {
    id: "pupuk-indonesia-frontend",
    role: "Frontend Web Developer",
    company: "PT Pupuk Indonesia (Persero)",
    employmentType: "Magang",
    startDate: "Jan 2025",
    endDate: "Mar 2025",
    duration: "3 bln",
    location: "Jakarta Barat",
    locationType: "Hybrid",
    summary:
      "Membangun sistem IT Service Management (ITSM) full-stack — manajemen user & role, katalog layanan, dan tiket — dengan React/Next.js/TypeScript, autentikasi NextAuth + JWT, dan dashboard eskalasi dengan drag-and-drop.",
    icon: Briefcase,
  },
  {
    id: "night-login",
    role: "Member of Night Login CyberSecurity Team",
    company: "Night Login DTETI FT UGM",
    employmentType: "Kontrak",
    startDate: "Feb 2023",
    endDate: "Mar 2025",
    duration: "2 thn 2 bln",
    location: "Sleman, Yogyakarta",
    locationType: "On-site",
    summary:
      "Eksplorasi mandiri sistem Linux/GNU — command-line, dasar administrasi sistem, dan tools open-source — sebagai bagian dari komunitas keamanan siber kampus.",
    icon: Terminal,
  },
  {
    id: "swaragama-training",
    role: "Communication & Public Speaking Trainee",
    company: "Swaragama Training Center",
    employmentType: "Magang",
    startDate: "Jul 2024",
    endDate: "Aug 2024",
    duration: "2 bln",
    location: "Sleman, Yogyakarta",
    locationType: "On-site",
    summary:
      "Pelatihan komunikasi profesional dan public speaking, termasuk praktik pidato langsung dan umpan balik dari trainer untuk memperkuat vocal control, stage presence, dan kepercayaan diri berbicara di depan umum.",
    icon: Mic,
  },
  {
    id: "ski-al-hannaan",
    role: "Ketua Divisi Kajian",
    company: "SKI Al-Hannaan",
    employmentType: "Part-time",
    startDate: "Aug 2023",
    endDate: "Aug 2024",
    duration: "1 thn 1 bln",
    location: "Sleman, Yogyakarta",
    locationType: "On-site",
    summary:
      "Memimpin perencanaan, koordinasi, dan eksekusi program serta acara organisasi kemahasiswaan, termasuk logistik acara dan komunikasi dengan peserta.",
    icon: Users,
  },
]

const MONTHS: Record<string, number> = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  mei: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  agu: 7,
  sep: 8,
  oct: 9,
  okt: 9,
  nov: 10,
  dec: 11,
  des: 11,
}

/**
 * Apakah entri masih berjalan — dievaluasi pada granularitas BULAN, jadi
 * hasilnya identik antara render server dan hidrasi klien.
 */
export function isOngoing(endDate: string, now = new Date()): boolean {
  const [monthName, year] = endDate.toLowerCase().split(" ")
  const month = MONTHS[monthName.slice(0, 3)]
  if (month === undefined || !year) return false

  const endIndex = Number(year) * 12 + month
  const nowIndex = now.getFullYear() * 12 + now.getMonth()
  return nowIndex <= endIndex
}
