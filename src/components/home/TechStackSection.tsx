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
    <section className="py-20 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="font-mono text-sm text-accent">
            {"// tech_stack"}
          </span>
          <h2 className="mt-2 text-3xl font-bold">Skills & Technologies</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="group rounded-xl border border-card-border bg-card-bg p-6 transition-all hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5"
            >
              <tech.icon className="h-8 w-8 text-accent mb-4 transition-transform group-hover:scale-110" />
              <h3 className="font-mono text-lg font-semibold mb-2">
                {tech.name}
              </h3>
              <p className="text-sm text-muted">{tech.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
