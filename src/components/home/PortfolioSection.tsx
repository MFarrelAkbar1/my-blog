import { ExternalLink, Github, Linkedin } from "lucide-react"
import Link from "next/link"

const projects = [
  {
    title: "Jogja Smart Tour",
    description:
      "Platform perencanaan itinerary wisata Yogyakarta berbasis AI.",
    role: "AI Engineer & Cloud Engineer (tim 3 orang)",
    tech: ["Next.js", "Express", "Supabase", "Azure OpenAI (DeepSeek-R1)"],
    repoUrl: "https://github.com/saaip7/jogja-smart-tour",
  },
  {
    title: "Website Desa Rejoagung",
    description:
      "Website resmi profil Desa Rejoagung (Srono, Banyuwangi) dengan panel admin, statistik desa, dan katalog produk lokal.",
    role: "Solo Developer",
    tech: ["Next.js 15", "Supabase", "Cloudinary", "JWT"],
    liveUrl: "https://desa-rejoagung.vercel.app",
    repoUrl: "https://github.com/MFarrelAkbar1/desa-rejoagung",
  },
  {
    title: "GUARD",
    description:
      "Sistem deteksi anomali & pemutus daya listrik rumah tangga berbasis IoT.",
    role: "Web Developer (tim)",
    tech: ["React", "TypeScript", "Supabase", "Node-RED", "STM32/ESP8266"],
    liveUrl: "https://guard-coral.vercel.app",
    repoUrl: "https://github.com/MFarrelAkbar1/guard-frontend",
  },
  {
    title: "DeLoan",
    description: "Aplikasi DeFi lending dengan NFT sebagai jaminan.",
    role: "Frontend & Smart Contract Developer (tim 2 orang)",
    tech: ["Solidity", "Foundry", "Next.js", "wagmi", "RainbowKit"],
    repoUrl: "https://github.com/MFarrelAkbar1/Deloan-Web3",
  },
  {
    title: "Job Posting ETL Pipeline",
    description:
      "Pipeline ETL data lowongan kerja (Adzuna API + scraping Glassdoor) untuk analisis tren pasar kerja.",
    role: "Data Transform & Visualization (tim 3 orang)",
    tech: ["Python", "Pandas", "Firebase", "Matplotlib", "Seaborn"],
    repoUrl:
      "https://github.com/MFarrelAkbar1/Tugas-Rekdat-Data-Job-Listing",
  },
  {
    title: "FinanceBot",
    description: "Chatbot WhatsApp pencatat & pelacak keuangan pribadi.",
    role: "Lead Developer (tim 2 orang)",
    tech: ["Node.js", "JavaScript"],
    repoUrl: "https://github.com/MFarrelAkbar1/chatbot-finansial-clean",
  },
  {
    title: "FOREAL",
    description:
      "Aplikasi Android redistribusi makanan surplus (mendukung SDG 2: Zero Hunger).",
    role: "Frontend Mobile Developer (tim)",
    tech: ["Kotlin", "Firebase Auth", "Firestore"],
    repoUrl: "https://github.com/grandiv/FOREAL",
  },
  {
    title: "AIKelompok3",
    description:
      "Aplikasi OCR + text-to-speech, alat bantu ubah gambar teks jadi suara.",
    role: "Main Developer (tim)",
    tech: ["Flask", "EasyOCR", "gTTS"],
    repoUrl: "https://github.com/MFarrelAkbar1/AIKelompok3",
  },
  {
    title: "Transformer from Scratch",
    description:
      "Implementasi arsitektur GPT-style Transformer dari nol (multi-head attention, positional encoding, layer normalization) tanpa framework deep learning.",
    role: "Solo",
    tech: ["Python", "NumPy"],
    repoUrl: "https://github.com/MFarrelAkbar1/transformer-from-scratch",
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
    <section className="py-20 px-4 bg-card-bg/30">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="font-mono text-sm text-accent">
            {"// portfolio"}
          </span>
          <h2 className="mt-2 text-3xl font-bold">Projects & Links</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group rounded-xl border border-card-border bg-card-bg p-6 transition-all hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-mono text-lg font-semibold group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <div className="flex items-center gap-3 shrink-0">
                  {project.liveUrl && (
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} live demo`}
                      className="text-muted hover:text-accent transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
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
                      <Github className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </div>

              <p className="font-mono text-xs text-accent mb-3">
                {project.role}
              </p>

              <p className="text-sm text-muted mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-card-border px-3 py-1 font-mono text-xs text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {socials.map((social) => (
            <Link
              key={social.title}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-card-border bg-card-bg p-6 transition-all hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-mono text-lg font-semibold group-hover:text-accent transition-colors">
                    {social.title}
                  </h3>
                  <p className="text-sm text-muted mt-1">
                    {social.description}
                  </p>
                </div>
                <social.icon className="h-5 w-5 text-muted group-hover:text-accent transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
