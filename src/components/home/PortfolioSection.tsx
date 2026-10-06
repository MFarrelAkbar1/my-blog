import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Github, Linkedin } from "lucide-react"
import ProjectIndex from "@/components/home/ProjectIndex"
import { GITHUB_URL, LINKEDIN_URL } from "@/data/profile"

interface Project {
  title: string
  description: string
  role: string
  tech: string[]
  liveUrl?: string
  repoUrl?: string
  /** Screenshot opsional di `public/` — tanpa ini card memakai preview generik */
  image?: string
}

const projects: Project[] = [
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
    url: LINKEDIN_URL,
    icon: Linkedin,
  },
  {
    title: "GitHub Profile",
    description: "Code repositories and open source contributions",
    url: GITHUB_URL,
    icon: Github,
  },
]

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

const projectId = (project: Project) => `project-${slugify(project.title)}`

/** Preview generik bergaya jendela terminal — dipakai bila belum ada screenshot */
function ProjectPreview({ project }: { project: Project }) {
  if (project.image) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-sm)] border border-line">
        <Image
          src={project.image}
          alt={`Screenshot ${project.title}`}
          fill
          sizes="(min-width: 1024px) 380px, 100vw"
          className="object-cover"
        />
      </div>
    )
  }

  return (
    <div
      aria-hidden="true"
      className="flex aspect-[16/10] flex-col overflow-hidden rounded-[var(--radius-sm)] border border-line bg-[#070b0a]"
    >
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-line-strong" />
        <span className="h-2 w-2 rounded-full bg-line-strong" />
        <span className="h-2 w-2 rounded-full bg-accent/70" />
        <span className="ml-2 truncate font-mono text-[10px] text-faint">
          ~/projects/{slugify(project.title)}
        </span>
      </div>
      <div className="relative flex flex-1 flex-col justify-end p-4">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgb(16_185_129/0.16),transparent_60%)]" />
        <span className="relative font-mono text-[11px] text-accent">
          $ open
        </span>
        <span className="relative mt-1 text-2xl leading-tight font-light text-bone sm:text-3xl">
          {project.title}
        </span>
        <span className="relative mt-3 flex flex-wrap gap-1">
          {project.tech.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-[3px] border border-line px-1.5 py-0.5 font-mono text-[10px] text-faint"
            >
              {t}
            </span>
          ))}
        </span>
      </div>
    </div>
  )
}

export default function PortfolioSection() {
  const indexItems = projects.map((project) => ({
    id: projectId(project),
    title: project.title,
    subtitle: project.description,
  }))

  return (
    <section id="projects" className="scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="section-head">
          <h2 className="section-title">Projects &amp; Links</h2>
          <p className="section-caption">
            {projects.length} projects, {socials.length} profiles
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[17rem_minmax(0,1fr)] lg:items-start">
          <ProjectIndex items={indexItems} />

          <div className="space-y-5">
            {projects.map((project) => (
              <article
                key={project.title}
                id={projectId(project)}
                className="panel panel-hover scroll-mt-44 lg:scroll-mt-20"
              >
                <header className="panel-head">
                  <h3 className="text-base font-semibold text-bone sm:text-lg">
                    {project.title}
                  </h3>
                  <span className="panel-label">
                    {project.liveUrl ? "Live" : "Repository"}
                  </span>
                </header>

                <div className="grid gap-5 p-4 sm:p-5 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
                  <ProjectPreview project={project} />

                  <div className="flex min-w-0 flex-col">
                    <p className="font-semibold text-bone">{project.role}</p>
                    <p className="mt-2 text-sm leading-relaxed text-dim sm:text-[0.95rem]">
                      {project.description}
                    </p>

                    <div className="mt-4 flex gap-4 border-t border-line pt-4">
                      <span className="shrink-0 text-sm text-faint">Stack</span>
                      <span className="font-mono text-[0.8rem] leading-relaxed text-bone/90">
                        {project.tech.join(", ")}
                      </span>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.liveUrl && (
                        <Link
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} live demo`}
                          className="btn btn-primary btn-sm"
                        >
                          Visit Site
                          <ArrowUpRight
                            className="h-3.5 w-3.5"
                            strokeWidth={2.5}
                          />
                        </Link>
                      )}
                      {project.repoUrl && (
                        <Link
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} repository`}
                          className={`btn btn-sm ${
                            project.liveUrl ? "btn-secondary" : "btn-primary"
                          }`}
                        >
                          GitHub
                          <ArrowUpRight
                            className="h-3.5 w-3.5"
                            strokeWidth={2.5}
                          />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {socials.map((social) => (
                <Link
                  key={social.title}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="panel panel-hover group flex items-center justify-between gap-4 p-5"
                >
                  <div className="flex items-center gap-3">
                    <social.icon
                      className="h-5 w-5 shrink-0 text-dim transition-colors group-hover:text-accent"
                      strokeWidth={2}
                    />
                    <div>
                      <h3 className="font-semibold text-bone">
                        {social.title}
                      </h3>
                      <p className="mt-0.5 text-xs text-dim">
                        {social.description}
                      </p>
                    </div>
                  </div>
                  <span className="btn btn-secondary btn-sm">
                    Open
                    <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
