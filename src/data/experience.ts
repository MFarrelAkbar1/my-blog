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

export type EmploymentType = "Contract" | "Part-time" | "Internship" | "Full-time"

export interface ActivityPhoto {
  /** Path di `public/activities/` */
  src: string
  alt: string
}

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
  /** Logo organisasi di `public/logos/` */
  logo?: string
  /** Foto kegiatan opsional, tampil di bawah ringkasan */
  photos?: ActivityPhoto[]
}

export const experiences: Experience[] = [
  {
    id: "ugm-lab-assistant",
    role: "Basic Programmer Lab Assistant",
    company: "Universitas Gadjah Mada",
    employmentType: "Contract",
    startDate: "Feb 2026",
    endDate: "Jul 2026",
    duration: "6 mos",
    location: "Sleman, Yogyakarta",
    locationType: "On-site",
    summary:
      "Guided students through basic C++ programming lab sessions (including setting up the MinGW environment on Windows) and helped grade their worksheets and quizzes.",
    icon: GraduationCap,
    logo: "/logos/dteti-lab-assistant.png",
    photos: [
      {
        src: "/activities/lab-assistant-session.jpeg",
        alt: "Basic programming lab session at DTETI UGM",
      },
    ],
  },
  {
    id: "cyberkarta-trainee",
    role: "Cyber Security Specialist Trainee",
    company: "Cyberkarta",
    employmentType: "Part-time",
    startDate: "Aug 2025",
    endDate: "Nov 2025",
    duration: "4 mos",
    location: "Sleman, Yogyakarta",
    locationType: "Hybrid",
    summary:
      "Carried out penetration testing exercises (network reconnaissance, SQL injection, privilege escalation) and web application security assessments with Nmap, SQLMap and Dirsearch, including post-exploitation activities.",
    icon: Shield,
    logo: "/logos/cyberkarta.png",
    photos: [
      {
        src: "/activities/cyberkarta-session-1.png",
        alt: "Cyberkarta x Netclub UGM hands-on security session",
      },
      {
        src: "/activities/cyberkarta-session-2.png",
        alt: "Cyberkarta x Netclub UGM training presentation",
      },
    ],
  },
  {
    id: "pupuk-indonesia-frontend",
    role: "Frontend Web Developer",
    company: "PT Pupuk Indonesia (Persero)",
    employmentType: "Internship",
    startDate: "Jan 2025",
    endDate: "Mar 2025",
    duration: "3 mos",
    location: "West Jakarta",
    locationType: "Hybrid",
    summary:
      "Built a full-stack IT Service Management (ITSM) system covering user & role management, a service catalog and ticketing, using React/Next.js/TypeScript, NextAuth + JWT authentication, and an escalation dashboard with drag-and-drop.",
    icon: Briefcase,
    logo: "/logos/pupuk-indonesia.png",
  },
  {
    id: "night-login",
    role: "Member of Night Login CyberSecurity Team",
    company: "Night Login DTETI FT UGM",
    employmentType: "Contract",
    startDate: "Feb 2023",
    endDate: "Mar 2025",
    duration: "2 yrs 2 mos",
    location: "Sleman, Yogyakarta",
    locationType: "On-site",
    summary:
      "Self-directed exploration of Linux/GNU systems (the command line, system administration basics and open-source tools) as part of the campus cybersecurity community.",
    icon: Terminal,
    logo: "/logos/nightlogin.png",
  },
  {
    id: "swaragama-training",
    role: "Communication & Public Speaking Trainee",
    company: "Swaragama Training Center",
    employmentType: "Internship",
    startDate: "Jul 2024",
    endDate: "Aug 2024",
    duration: "2 mos",
    location: "Sleman, Yogyakarta",
    locationType: "On-site",
    summary:
      "Professional communication and public speaking training, including live speech practice and trainer feedback to strengthen vocal control, stage presence and confidence when speaking in public.",
    icon: Mic,
    logo: "/logos/swaragama-training-center.png",
  },
  {
    id: "ski-al-hannaan",
    role: "Head of Islamic Studies Division",
    company: "SKI Al-Hannaan",
    employmentType: "Part-time",
    startDate: "Aug 2023",
    endDate: "Aug 2024",
    duration: "1 yr 1 mo",
    location: "Sleman, Yogyakarta",
    locationType: "On-site",
    summary:
      "Led the planning, coordination and execution of the student organization's programs and events, including event logistics and communication with participants.",
    icon: Users,
    logo: "/logos/ski-alhannan.png",
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
