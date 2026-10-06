import { Code2, Server, Database, Shield, Globe } from "lucide-react"

const techStack = [
  {
    name: "TypeScript",
    description: "Modern type-safe JavaScript development",
    icon: Code2,
  },
  {
    name: "Next.js",
    description: "Full-stack React framework",
    icon: Globe,
  },
  {
    name: "PHP",
    description: "Backend web development",
    icon: Server,
  },
  {
    name: "PostgreSQL",
    description: "Relational database management",
    icon: Database,
  },
  {
    name: "Cybersecurity",
    description: "Penetration testing & secure coding",
    icon: Shield,
  },
]

export default function TechStackSection() {
  return (
    <section id="stack" className="scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="section-head">
          <h2 className="section-title">Skills &amp; Technologies</h2>
          <p className="section-caption">{techStack.length} core areas</p>
        </div>

        <div className="panel">
          <div className="panel-head">
            <span className="panel-label">Stack</span>
            <span className="font-mono text-xs text-faint">
              {techStack.length}
            </span>
          </div>

          <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-b-[var(--radius)] bg-line sm:grid-cols-2 lg:grid-cols-5">
            {techStack.map((tech) => (
              <li
                key={tech.name}
                className="bg-panel p-5 transition-colors hover:bg-[var(--panel-hover)] sm:last:col-span-2 lg:last:col-span-1"
              >
                <div className="flex items-center gap-2.5">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[var(--radius-sm)] border border-line-strong bg-accent-soft">
                    <tech.icon className="h-4 w-4 text-accent" strokeWidth={2} />
                  </span>
                  <h3 className="font-mono text-sm font-semibold text-bone">
                    {tech.name}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-dim">
                  {tech.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
