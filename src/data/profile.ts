import { experiences } from "@/data/experience"

export const GITHUB_URL = "https://github.com/MFarrelAkbar1"
export const LINKEDIN_URL =
  "https://www.linkedin.com/in/muhammad-farrel-akbar-96274824b/"

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
}

const latest = experiences[0]

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
    value: "S1 Teknik Informatika",
    detail: "Universitas Gadjah Mada",
  },
  {
    label: "Experience",
    value: latest.role,
    detail: latest.company,
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
