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
    <section className="py-20 px-4 speedlines">
      <div className="mx-auto max-w-4xl">
        <div className="mb-14 text-center">
          <span className="caption">
            <span>[ORIGIN_STORY] // experience</span>
          </span>
          <h2 className="mt-4 font-display text-4xl uppercase tracking-wide">
            Pengalaman & Organisasi
          </h2>
        </div>

        <ol className="relative space-y-10 border-l-[3px] border-bone pl-8 sm:pl-10">
          {experiences.map((exp, idx) => (
            <li key={`${exp.org}-${exp.role}`} className="relative">
              <span className="absolute -left-[45px] top-0 flex h-8 w-8 items-center justify-center border-2 border-bone bg-ink sm:-left-[53px]">
                <exp.icon className="h-4 w-4 text-accent" strokeWidth={2.5} />
              </span>

              <div
                className={`panel panel-hover p-6 ${
                  idx % 2 === 0 ? "tilt-r" : "tilt-l"
                }`}
              >
                <div className="flex flex-col gap-3 mb-3 sm:flex-row sm:items-start sm:justify-between">
                  <h3 className="font-display text-lg uppercase tracking-wide leading-snug">
                    {exp.role}
                  </h3>
                  <span className="caption shrink-0">
                    <span>{exp.period}</span>
                  </span>
                </div>
                <p className="font-mono text-xs text-accent mb-3">
                  {exp.org} &middot; {exp.location}
                </p>
                <p className="text-sm text-muted leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 panel p-6 tilt-l">
          <div className="flex items-center gap-3 mb-3">
            <GraduationCap className="h-5 w-5 text-accent" strokeWidth={2.5} />
            <span className="caption caption-green">
              <span>[TRAINING_ARC] // education</span>
            </span>
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
