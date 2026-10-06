import Image from "next/image"
import Link from "next/link"
import {
  ArrowUpRight,
  FileText,
  Github,
  Linkedin,
  NotebookText,
  Trophy,
  Youtube,
} from "lucide-react"
import ProjectIndex from "@/components/home/ProjectIndex"
import { GITHUB_URL, LINKEDIN_URL } from "@/data/profile"
import { certificatePagePath } from "@/lib/certificates"

interface Project {
  title: string
  /** Ringkasan pendek untuk panel INDEX */
  summary: string
  description: string
  role?: string
  award?: string
  tech: string[]
  liveUrl?: string
  repoUrl?: string
  notebookUrl?: string
  videoUrl?: string
  /** Halaman dokumen PDF di situs ini (mis. laporan proyek) */
  reportUrl?: string
  /** Screenshot opsional di `public/` — tanpa ini card memakai preview generik */
  image?: string
  /** "contain" untuk diagram agar tidak terpotong */
  imageFit?: "cover" | "contain"
}

// Diurutkan dari proyek paling menonjol
const projects: Project[] = [
  {
    title: "AI-Assisted PHP Migration Pipeline",
    summary: "Thesis: PHP 7.4 to 8.x migration with local LLMs",
    description:
      "My undergraduate thesis: a 6-step pipeline that migrates legacy PHP 7.4 code to PHP 8.3 with Rector, scans it with Semgrep and PHPStan, gets secure fix suggestions from local LLMs via Ollama, and maps every finding to ISO/IEC 27001:2022 controls. Tested on two real CodeIgniter apps (571 PHP files) with up to 97.6% conversion and 100% syntax validity, plus a 165-run benchmark of 5 local LLMs.",
    role: "Researcher & Solo Developer",
    tech: ["Python", "Rector", "Semgrep", "PHPStan", "Ollama", "ISO/IEC 27001"],
    repoUrl: "https://github.com/MFarrelAkbar1/skripsi-php-migration",
    image: "/projects/php-migration.png",
  },
  {
    title: "ForgeQ",
    summary: "Distributed background job queue in Go",
    description:
      "A distributed background job queue in the spirit of Sidekiq or Celery, with PostgreSQL as the only source of truth. Workers claim jobs atomically with SELECT … FOR UPDATE SKIP LOCKED, run them under a lease with a fenced heartbeat, retry with exponential backoff, and move repeated failures to a dead-letter queue. Ships with an htmx dashboard, Prometheus metrics, chaos testing and CI with the race detector.",
    role: "Solo Developer",
    tech: ["Go", "PostgreSQL", "htmx", "Prometheus", "Docker"],
    repoUrl: "https://github.com/MFarrelAkbar1/ForgeQ",
    image: "/projects/forgeq.png",
    imageFit: "contain",
  },
  {
    title: "GUARD",
    summary: "IoT power anomaly detection & cut-off",
    description:
      "An IoT system that monitors household appliance power usage in real time, detects abnormal consumption, and can cut the power automatically through a relay. I built the React dashboard, the Supabase integration, the anomaly detection logic in Node-RED, and the notifications.",
    role: "Web Developer (team of 5)",
    tech: ["React", "TypeScript", "Supabase", "Node-RED", "MQTT", "STM32/ESP8266"],
    liveUrl: "https://guard-coral.vercel.app",
    repoUrl: "https://github.com/MFarrelAkbar1/guard-frontend",
    image: "/projects/guard.png",
  },
  {
    title: "Desa Rejoagung Website",
    summary: "Official village profile site with admin panel",
    description:
      "The official profile website of Rejoagung Village (Srono, Banyuwangi), used by village officials and residents. It covers village statistics, an interactive map, a local product catalog and news, plus an admin panel with JWT auth, email password reset and a block-based content editor. Built end to end, from requirements to handover.",
    role: "Solo Developer",
    tech: ["Next.js 15", "TypeScript", "Supabase", "Cloudinary", "JWT"],
    liveUrl: "https://desa-rejoagung.vercel.app",
    repoUrl: "https://github.com/MFarrelAkbar1/desa-rejoagung",
    image: "/projects/desa-rejoagung.png",
  },
  {
    title: "Jogja Smart Tour",
    summary: "AI-powered Yogyakarta trip planner",
    description:
      "An AI travel planner for Yogyakarta: users enter their preferences, budget and dates, and the platform generates a day-by-day itinerary with cost estimates on an interactive map. I built the Azure OpenAI (DeepSeek-R1) service, designed prompts that return strict JSON, validated the model output, and handled the Docker-based deployment.",
    role: "AI Engineer & Cloud Engineer (team of 3)",
    tech: ["Next.js", "Express", "Prisma", "Supabase", "Azure OpenAI", "Docker"],
    repoUrl: "https://github.com/saaip7/jogja-smart-tour",
    image: "/projects/jogja-smart-tour.png",
  },
  {
    title: "DeLoan",
    summary: "DeFi lending with NFT collateral",
    description:
      "A DeFi lending app where borrowers lock an NFT in a smart contract as collateral. The NFT is returned once the loan is repaid and can be claimed by the lender when it is overdue. I wrote the core Solidity contract with Foundry tests and built the Next.js frontend with wallet connection.",
    role: "Frontend & Smart Contract Developer (team of 2)",
    tech: ["Solidity", "Foundry", "OpenZeppelin", "Next.js", "wagmi", "RainbowKit"],
    repoUrl: "https://github.com/MFarrelAkbar1/Deloan-Web3",
    image: "/projects/deloan.png",
  },
  {
    title: "SOC / SIEM Lab on Azure",
    summary: "ELK Stack brute-force detection lab",
    description:
      "Deployed the ELK Stack with Docker on an Azure Ubuntu VM and shipped Linux system logs with Filebeat. Simulated failed SSH logins, wrote Elasticsearch queries that group them by user and time window, and set up Kibana alerts that fire on brute-force attempts.",
    role: "Solo",
    tech: ["Azure", "Docker", "Elasticsearch", "Logstash", "Kibana", "Filebeat"],
    repoUrl: "https://github.com/MFarrelAkbar1/SOC-SIEM-Lab-ELK",
    image: "/projects/elk-soc.png",
  },
  {
    title: "FOREAL",
    summary: "Android app for surplus food redistribution",
    description:
      "An Android app supporting SDG 2 (Zero Hunger) that redistributes surplus food from restaurants to people in need, with donate, request and volunteer flows. I built the Android UI screens and connected them to Firebase Auth and Firestore.",
    role: "Frontend Mobile Developer (team of 3)",
    award: "1st Place, Mobile Development, TETI Bootcamp DTETI UGM 2023",
    tech: ["Kotlin", "Android", "Firebase Auth", "Firestore"],
    repoUrl: "https://github.com/grandiv/FOREAL",
    image: "/projects/foreal.png",
  },
  {
    title: "Transformer from Scratch",
    summary: "GPT-style Transformer in pure NumPy",
    description:
      "A GPT-style decoder-only Transformer built from scratch without any deep learning framework: scaled dot-product and 8-head attention, sinusoidal positional encoding, pre-norm layer normalization, causal masking and weight tying, with tests and attention visualizations.",
    role: "Solo",
    tech: ["Python", "NumPy", "Matplotlib", "Jupyter"],
    repoUrl: "https://github.com/MFarrelAkbar1/transformer-from-scratch",
    image: "/projects/transformer-from-scratch.png",
  },
  {
    title: "Big Data Log Anomaly Detection",
    summary: "Hadoop MapReduce over 10.3M log records",
    description:
      "A MapReduce pipeline that analyzes 10.3 million web server log records for anomalous patterns. Custom Mapper, Reducer and Combiner written in Java, where the Combiner cut shuffle data by 97% and the whole job finished in about 44 seconds.",
    role: "System Architect (team of 6)",
    tech: ["Hadoop", "HDFS", "YARN", "MapReduce (Java)", "Python"],
    reportUrl: certificatePagePath("mapreduce-log-anomaly"),
    image: "/projects/hadoop-log-anomaly.png",
  },
  {
    title: "Job Posting ETL Pipeline",
    summary: "ETL of job listings for market trend analysis",
    description:
      "An end-to-end ETL pipeline that collects job postings from the Adzuna API and Glassdoor scraping, then loads them into Firebase. I owned the transform step (cleaning, deduplication and merging two schemas into one) and the visual analysis of popular roles, salary ranges and demand trends.",
    role: "Data Transform & Visualization (team of 3)",
    tech: ["Python", "Pandas", "Selenium", "Firebase", "Seaborn", "Docker"],
    repoUrl: "https://github.com/MFarrelAkbar1/Tugas-Rekdat-Data-Job-Listing",
    notebookUrl:
      "https://colab.research.google.com/drive/1U4z8dkjQ0lNUAsDKO2ZCIZ7geKSlpCHF?usp=sharing",
    videoUrl: "https://youtu.be/o9BoCP-DfzI",
    image: "/projects/etl-job-pipeline.png",
  },
  {
    title: "Credit Card Default Risk Analysis",
    summary: "Credit risk modelling on 30,000 real clients",
    description:
      "Analyzed 30,000 real credit card clients (UCI dataset) to find what predicts default. Engineered features such as utilization ratio and delay frequency, compared Logistic Regression, Decision Tree and Random Forest by ROC-AUC, and turned the findings into four risk policy recommendations.",
    role: "Solo",
    tech: ["Python", "Pandas", "scikit-learn", "Seaborn", "Plotly"],
    notebookUrl:
      "https://colab.research.google.com/drive/1zbEOuxk_uMxzY-fkOHwk1wgm3uAS1cpe?usp=sharing",
    image: "/projects/credit-risk.png",
  },
  {
    title: "OJK Fintech Lending Analysis",
    summary: "Indonesian P2P lending data analysis with SQL",
    description:
      "End-to-end analysis of official OJK fintech lending statistics (Jan 2022 – Feb 2023) with pandas and SQLite. Five SQL queries cover regional concentration, credit risk (TWP90), sector share and industry profitability, presented in 8 interactive Plotly charts with business recommendations.",
    role: "Solo",
    tech: ["Python", "Pandas", "SQLite", "Plotly"],
    notebookUrl:
      "https://colab.research.google.com/drive/1W0GDHfAJXmcCMdO_Pb_X4uJqCMHf6tN9?usp=sharing",
    image: "/projects/ojk.png",
  },
  {
    title: "Ladang Lokal",
    summary: "Grocery e-commerce for local Yogyakarta suppliers",
    description:
      "A grocery e-commerce web app that only sources from local Yogyakarta suppliers to help local small businesses. Shoppers browse five fresh food categories, keep items in a persistent cart, pay through Midtrans (e-wallets to bank virtual accounts) and manage their delivery address. Final project for the Web Application Development course at DTETI UGM.",
    tech: ["Next.js", "TypeScript", "Prisma", "MongoDB", "Cloudinary", "Midtrans"],
    liveUrl: "https://tugas-akhir-paw-kel-12.vercel.app",
    repoUrl: "https://github.com/grandiv/tugas-akhir-paw-kel-12",
    image: "/projects/ladang-lokal.png",
  },
  {
    title: "FinanceBot",
    summary: "WhatsApp personal finance chatbot",
    description:
      "A WhatsApp bot that lets students log and analyze daily spending right in the chat, using rule-based intent matching in Indonesian and English. Supports reports, monthly budgets with alerts, statistics and CSV export, with Jest unit tests.",
    role: "Lead Developer (team of 2)",
    tech: ["Node.js", "whatsapp-web.js", "SQLite", "Jest"],
    repoUrl: "https://github.com/MFarrelAkbar1/chatbot-finansial-clean",
    image: "/projects/financebot.png",
  },
  {
    title: "E-Cycle",
    summary: "Marketplace for second-hand & recycled goods",
    description:
      "A circular economy marketplace where users buy and sell second-hand goods through a shopping cart, list their own products, manage their profiles, and read articles that encourage recycling and reuse.",
    role: "Backend Developer (team of 3)",
    tech: ["C#", ".NET 8.0"],
    repoUrl: "https://github.com/MFarrelAkbar1/ecycle",
    image: "/projects/e-cycle.png",
  },
  {
    title: "EatHealthy",
    summary: "AI-powered healthy lifestyle desktop app",
    description:
      "A Windows desktop app that helps users keep a healthy lifestyle. It has a BMI calculator with category classification, an AI recipe generator that uses GPT-3.5 and DALL-E 3 to create both the recipe text and a food image, and a daily fluid intake tracker with AI-based personalized health advice.",
    tech: ["C#", "OpenAI GPT-3.5", "DALL-E 3"],
    repoUrl: "https://github.com/MFarrelAkbar1/EatHealthy",
    videoUrl: "https://www.youtube.com/watch?v=eOKadw0GrNs&t=653s",
    image: "/projects/eathealthy.png",
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

const projectLabel = (project: Project) => {
  if (project.liveUrl) return "Live"
  if (project.repoUrl) return "Repository"
  if (project.notebookUrl) return "Notebook"
  return "Lab"
}

/** Preview generik bergaya jendela terminal — dipakai bila belum ada screenshot */
function ProjectPreview({ project }: { project: Project }) {
  if (project.image) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-sm)] border border-line bg-[#070b0a]">
        <Image
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          fill
          sizes="(min-width: 1024px) 380px, 100vw"
          className={
            project.imageFit === "contain"
              ? "object-contain"
              : "object-cover object-top"
          }
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

/** Tombol tautan proyek — tombol pertama yang tersedia memakai gaya primary */
function ProjectLinks({ project }: { project: Project }) {
  const links = [
    { href: project.liveUrl, label: "Visit Site", aria: "live demo", icon: ArrowUpRight },
    { href: project.repoUrl, label: "GitHub", aria: "repository", icon: ArrowUpRight },
    { href: project.notebookUrl, label: "Notebook", aria: "notebook", icon: NotebookText },
    { href: project.reportUrl, label: "Report", aria: "report", icon: FileText },
    { href: project.videoUrl, label: "YouTube", aria: "video on YouTube", icon: Youtube },
  ].filter((link): link is typeof link & { href: string } => Boolean(link.href))

  if (links.length === 0) return null

  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {links.map((link, i) => (
        <Link
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} ${link.aria}`}
          className={`btn btn-sm ${i === 0 ? "btn-primary" : "btn-secondary"}`}
        >
          {link.label}
          <link.icon className="h-3.5 w-3.5" strokeWidth={2.5} />
        </Link>
      ))}
    </div>
  )
}

export default function PortfolioSection() {
  const indexItems = projects.map((project) => ({
    id: projectId(project),
    title: project.title,
    subtitle: project.summary,
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
                  <span className="panel-label">{projectLabel(project)}</span>
                </header>

                <div className="grid gap-5 p-4 sm:p-5 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
                  <ProjectPreview project={project} />

                  <div className="flex min-w-0 flex-col">
                    {project.role && (
                      <p className="font-semibold text-bone">{project.role}</p>
                    )}
                    {project.award && (
                      <p className="mt-1 flex items-center gap-1.5 text-sm text-accent">
                        <Trophy className="h-3.5 w-3.5 shrink-0" strokeWidth={2.5} />
                        {project.award}
                      </p>
                    )}
                    <p
                      className={`text-sm leading-relaxed text-dim sm:text-[0.95rem] ${
                        project.role || project.award ? "mt-2" : ""
                      }`}
                    >
                      {project.description}
                    </p>

                    <div className="mt-4 flex gap-4 border-t border-line pt-4">
                      <span className="shrink-0 text-sm text-faint">Stack</span>
                      <span className="font-mono text-[0.8rem] leading-relaxed text-bone/90">
                        {project.tech.join(", ")}
                      </span>
                    </div>

                    <ProjectLinks project={project} />
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
