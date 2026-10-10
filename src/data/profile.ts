import { experiences } from "@/data/experience"

export const GITHUB_URL = "https://github.com/MFarrelAkbar1"
export const LINKEDIN_URL =
  "https://www.linkedin.com/in/muhammad-farrel-akbar-96274824b/"
export const CONTACT_EMAIL = "farrelakbar2112@gmail.com"

/**
 * Email publik untuk baris "Email" di panel Profile.
 * Sengaja dibiarkan `null` sampai diisi — baris email (beserta tombol Copy)
 * baru tampil setelah alamat yang ingin dipublikasikan dimasukkan di sini.
 */
export const PROFILE_EMAIL: string | null = null

export type ProfileAction =
  | { kind: "copy"; value: string }
  | { kind: "open"; href: string }

export interface ProfileRow {
  label: string
  value: string
  /** Keterangan sekunder redup setelah titik tengah */
  detail?: string
  mono?: boolean
  action?: ProfileAction
  /** Baris tambahan di bawah nilai utama, untuk label yang memuat beberapa entri */
  more?: { value: string; detail?: string }[]
}

const findExperience = (id: string) => {
  const experience = experiences.find((e) => e.id === id)
  if (!experience) throw new Error(`Unknown experience id: ${id}`)
  return experience
}

const pupukIndonesia = findExperience("pupuk-indonesia-frontend")
const labAssistant = findExperience("ugm-lab-assistant")

export const profileRows: ProfileRow[] = [
  {
    label: "Role",
    value: "TypeScript Developer",
    detail: "PHP Web Developer",
  },
  {
    label: "Security",
    value: "Security Analyst",
    detail: "Penetration testing & secure coding",
  },
  {
    label: "Education",
    value: "B.Eng. Information Engineering",
    detail: "Universitas Gadjah Mada",
  },
  {
    label: "Experience",
    value: pupukIndonesia.role,
    detail: pupukIndonesia.company,
    more: [{ value: labAssistant.role, detail: labAssistant.company }],
  },
  ...(PROFILE_EMAIL
    ? [
        {
          label: "Email",
          value: PROFILE_EMAIL,
          mono: true,
          action: { kind: "copy", value: PROFILE_EMAIL },
        } satisfies ProfileRow,
      ]
    : []),
  {
    label: "GitHub",
    value: "@MFarrelAkbar1",
    mono: true,
    action: { kind: "open", href: GITHUB_URL },
  },
  {
    label: "LinkedIn",
    value: "muhammad-farrel-akbar",
    mono: true,
    action: { kind: "open", href: LINKEDIN_URL },
  },
]
