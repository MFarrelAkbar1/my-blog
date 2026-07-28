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
    <section id="stack" className="py-20 px-4 scroll-mt-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <span className="caption">
            <span>[LOADOUT] // tech_stack</span>
          </span>
          <h2 className="mt-4 font-display text-4xl uppercase tracking-wide">
            Skills & Technologies
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {techStack.map((tech, idx) => (
            <div
              key={tech.name}
              className={`panel panel-hover p-6 ${
                idx % 2 === 0 ? "tilt-l" : "tilt-r"
              }`}
            >
              <tech.icon
                className="h-8 w-8 text-accent mb-4"
                strokeWidth={2.5}
              />
              <h3 className="font-display text-xl uppercase tracking-wide mb-2">
                {tech.name}
              </h3>
              <p className="font-mono text-xs text-muted leading-relaxed">
                {tech.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
