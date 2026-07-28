import { ExternalLink, Github, Linkedin } from "lucide-react"
import Link from "next/link"
import SfxBurst from "@/components/ui/SfxBurst"

const projects = [
  {
    title: "Jogja Smart Tour",
    description:
      "Platform perencanaan itinerary wisata Yogyakarta berbasis AI.",
    role: "AI Engineer & Cloud Engineer (tim 3 orang)",
    tech: ["Next.js", "Express", "Supabase", "Azure OpenAI (DeepSeek-R1)"],
    repoUrl: "https://github.com/saaip7/jogja-smart-tour",
    sfx: "Deployed!",
  },
  {
    title: "Website Desa Rejoagung",
    description:
      "Website resmi profil Desa Rejoagung (Srono, Banyuwangi) dengan panel admin, statistik desa, dan katalog produk lokal.",
    role: "Solo Developer",
    tech: ["Next.js 15", "Supabase", "Cloudinary", "JWT"],
    liveUrl: "https://desa-rejoagung.vercel.app",
    repoUrl: "https://github.com/MFarrelAkbar1/desa-rejoagung",
    sfx: "Shipped!",
  },
  {
    title: "GUARD",
    description:
      "Sistem deteksi anomali & pemutus daya listrik rumah tangga berbasis IoT.",
    role: "Web Developer (tim)",
    tech: ["React", "TypeScript", "Supabase", "Node-RED", "STM32/ESP8266"],
    liveUrl: "https://guard-coral.vercel.app",
    repoUrl: "https://github.com/MFarrelAkbar1/guard-frontend",
    sfx: "Anomaly!",
  },
  {
    title: "DeLoan",
    description: "Aplikasi DeFi lending dengan NFT sebagai jaminan.",
    role: "Frontend & Smart Contract Developer (tim 2 orang)",
    tech: ["Solidity", "Foundry", "Next.js", "wagmi", "RainbowKit"],
    repoUrl: "https://github.com/MFarrelAkbar1/Deloan-Web3",
    sfx: "Minted!",
  },
  {
    title: "Job Posting ETL Pipeline",
    description:
      "Pipeline ETL data lowongan kerja (Adzuna API + scraping Glassdoor) untuk analisis tren pasar kerja.",
    role: "Data Transform & Visualization (tim 3 orang)",
    tech: ["Python", "Pandas", "Firebase", "Matplotlib", "Seaborn"],
    repoUrl:
      "https://github.com/MFarrelAkbar1/Tugas-Rekdat-Data-Job-Listing",
    sfx: "Extracted!",
  },
  {
    title: "FinanceBot",
    description: "Chatbot WhatsApp pencatat & pelacak keuangan pribadi.",
    role: "Lead Developer (tim 2 orang)",
    tech: ["Node.js", "JavaScript"],
    repoUrl: "https://github.com/MFarrelAkbar1/chatbot-finansial-clean",
    sfx: "Cha-Ching!",
  },
  {
    title: "FOREAL",
    description:
      "Aplikasi Android redistribusi makanan surplus (mendukung SDG 2: Zero Hunger).",
    role: "Frontend Mobile Developer (tim)",
    tech: ["Kotlin", "Firebase Auth", "Firestore"],
    repoUrl: "https://github.com/grandiv/FOREAL",
    sfx: "Rescued!",
  },
  {
    title: "AIKelompok3",
    description:
      "Aplikasi OCR + text-to-speech, alat bantu ubah gambar teks jadi suara.",
    role: "Main Developer (tim)",
    tech: ["Flask", "EasyOCR", "gTTS"],
    repoUrl: "https://github.com/MFarrelAkbar1/AIKelompok3",
    sfx: "Parsed!",
  },
  {
    title: "Transformer from Scratch",
    description:
      "Implementasi arsitektur GPT-style Transformer dari nol (multi-head attention, positional encoding, layer normalization) tanpa framework deep learning.",
    role: "Solo",
    tech: ["Python", "NumPy"],
    repoUrl: "https://github.com/MFarrelAkbar1/transformer-from-scratch",
    sfx: "Attention!",
  },
]

const socials = [
  {
    title: "LinkedIn Profile",
    description: "Professional profile and networking",
    url: "https://www.linkedin.com/in/muhammad-farrel-akbar-96274824b/",
    icon: Linkedin,
  },
  {
    title: "GitHub Profile",
    description: "Code repositories and open source contributions",
    url: "https://github.com/MFarrelAkbar1",
    icon: Github,
  },
]

export default function PortfolioSection() {
  return (
    <section id="projects" className="py-20 px-4 scroll-mt-24 halftone">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <span className="caption">
            <span>[THE_ROSTER] // portfolio</span>
          </span>
          <h2 className="mt-4 font-display text-4xl uppercase tracking-wide">
            Projects & Links
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project, idx) => (
            <div
              key={project.title}
              className={`group relative panel panel-hover p-6 ${
                idx % 2 === 0 ? "tilt-l" : "tilt-r"
              }`}
            >
              <SfxBurst
                text={project.sfx}
                color={idx % 3 === 2 ? "green" : "yellow"}
                className="-top-10 -right-4"
              />

              {/* Nomor file karakter di sudut */}
              <span className="absolute -top-3 -left-3 border-2 border-bone bg-ink px-2 py-0.5 font-display text-xs text-caption-y">
                #{String(idx + 1).padStart(2, "0")}
              </span>

              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="font-display text-xl uppercase tracking-wide leading-snug">
                  {project.title}
                </h3>
                <div className="flex items-center gap-3 shrink-0 pt-1">
                  {project.liveUrl && (
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} live demo`}
                      className="text-muted hover:text-accent transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" strokeWidth={2.5} />
                    </Link>
                  )}
                  {project.repoUrl && (
                    <Link
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} repository`}
                      className="text-muted hover:text-accent transition-colors"
                    >
                      <Github className="h-4 w-4" strokeWidth={2.5} />
                    </Link>
                  )}
                </div>
              </div>

              <div className="mb-3">
                <span className="caption">
                  <span>CLASS: {project.role}</span>
                </span>
              </div>

              <p className="text-sm text-muted mb-4 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="border border-slate-ink px-2.5 py-1 font-mono text-[11px] text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-10">
          {socials.map((social, idx) => (
            <Link
              key={social.title}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative panel panel-hover p-6 block ${
                idx % 2 === 0 ? "tilt-r" : "tilt-l"
              }`}
            >
              <SfxBurst text="Follow!" color="green" className="-top-10 -right-4" />
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-xl uppercase tracking-wide">
                    {social.title}
                  </h3>
                  <p className="font-mono text-xs text-muted mt-2">
                    {social.description}
                  </p>
                </div>
                <social.icon
                  className="h-6 w-6 text-muted group-hover:text-accent transition-colors"
                  strokeWidth={2.5}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
