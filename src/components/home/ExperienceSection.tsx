import { Briefcase, GraduationCap, Shield, Users } from "lucide-react"

const experiences = [
  {
    role: "Asisten Praktikum Dasar Pemrograman",
    org: "Universitas Gadjah Mada",
    location: "Sleman, Yogyakarta",
    period: "Feb 2026 – Sekarang",
    description:
      "Membimbing mahasiswa dalam pemrograman C++ dan penyiapan development environment.",
    icon: GraduationCap,
  },
  {
    role: "Cyber Security Specialist Trainee",
    org: "CyberKarta",
    location: "Yogyakarta (Hybrid)",
    period: "Agu 2025 – Des 2025",
    description:
      "Melakukan asesmen keamanan jaringan & sistem, serta menyusun laporan temuan teknis dan rekomendasi perbaikan.",
    icon: Shield,
  },
  {
    role: "Frontend Web Developer — Magang Software Developer",
    org: "PT Pupuk Indonesia (Persero)",
    location: "Jakarta Barat (Hybrid)",
    period: "Jan 2025 – Mar 2025",
    description:
      "Membangun sistem IT Service Management (ITSM) menggunakan React/Next.js dan TypeScript dengan role-based access control (RBAC). Mengimplementasikan autentikasi berbasis JWT (NextAuth.js) dengan protected routes dan manajemen sesi.",
    icon: Briefcase,
  },
  {
    role: "Anggota, Night Login Cybersecurity Club",
    org: "Night Login DTETI FT UGM",
    location: "Yogyakarta",
    period: "Feb 2023 – Feb 2026",
    description:
      "Aktif dalam diskusi keamanan siber, persiapan CTF, dan administrasi sistem Linux/Unix.",
    icon: Users,
  },
]

export default function ExperienceSection() {
  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <span className="font-mono text-sm text-accent">
            {"// experience"}
          </span>
          <h2 className="mt-2 text-3xl font-bold">
            Pengalaman & Organisasi
          </h2>
        </div>

        <ol className="relative space-y-8 border-l border-card-border pl-8 sm:pl-10">
          {experiences.map((exp) => (
            <li key={`${exp.org}-${exp.role}`} className="relative">
              <span className="absolute -left-[41px] top-0 flex h-8 w-8 items-center justify-center rounded-full border border-card-border bg-card-bg sm:-left-[49px]">
                <exp.icon className="h-4 w-4 text-accent" />
              </span>

              <div className="group rounded-xl border border-card-border bg-card-bg p-6 transition-all hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5">
                <div className="flex flex-col gap-1 mb-3 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="font-mono text-lg font-semibold group-hover:text-accent transition-colors">
                    {exp.role}
                  </h3>
                  <span className="font-mono text-xs text-accent whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>
                <p className="text-sm text-muted mb-3">
                  {exp.org} &middot; {exp.location}
                </p>
                <p className="text-sm text-muted leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 rounded-xl border border-card-border bg-card-bg p-6">
          <div className="flex items-center gap-3 mb-2">
            <GraduationCap className="h-5 w-5 text-accent" />
            <h3 className="font-mono text-base font-semibold">Pendidikan</h3>
          </div>
          <p className="text-sm text-muted leading-relaxed">
            S1 Teknik Informatika, DTETI, Fakultas Teknik, Universitas Gadjah
            Mada — 2022 – 2026 (perkiraan lulus), IPK 3.29
          </p>
        </div>
      </div>
    </section>
  )
}
