import { ExternalLink, Github, Linkedin } from "lucide-react"
import Link from "next/link"

const projects = [
  {
    title: "Desa Rejoagung Website",
    description: "Village information and management website",
    url: "https://desa-rejoagung-git-main-farrel-akbars-projects.vercel.app/",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    type: "project" as const,
  },
  {
    title: "ShopMart E-Commerce",
    description: "Full-featured e-commerce platform inspired by Shopee",
    url: "https://tugas-akhir-paw-kel-12.vercel.app/",
    tech: ["Next.js", "TypeScript", "MongoDB"],
    type: "project" as const,
  },
  {
    title: "LinkedIn Profile",
    description: "Professional profile and networking",
    url: "https://www.linkedin.com/in/muhammad-farrel-akbar-96274824b/",
    tech: [],
    type: "social" as const,
    icon: Linkedin,
  },
  {
    title: "GitHub Profile",
    description: "Code repositories and open source contributions",
    url: "https://github.com/MFarrelAkbar1",
    tech: [],
    type: "social" as const,
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
            <Link
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-card-border bg-card-bg p-6 transition-all hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-mono text-lg font-semibold group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                {project.type === "social" && project.icon ? (
                  <project.icon className="h-5 w-5 text-muted group-hover:text-accent transition-colors" />
                ) : (
                  <ExternalLink className="h-4 w-4 text-muted group-hover:text-accent transition-colors" />
                )}
              </div>
              <p className="text-sm text-muted mb-4">{project.description}</p>
              {project.tech.length > 0 && (
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
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
