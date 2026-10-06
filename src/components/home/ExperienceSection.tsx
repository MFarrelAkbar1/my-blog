"use client"

import type { CSSProperties } from "react"
import { CalendarDays, GraduationCap, MapPin } from "lucide-react"
import { experiences, isOngoing } from "@/data/experience"
import { useStaggeredReveal } from "@/components/experience/useStaggeredReveal"

export default function ExperienceSection() {
  const { register, delays } = useStaggeredReveal(100)

  const revealProps = (id: string) => ({
    ref: register,
    "data-reveal-id": id,
    "data-revealed": delays[id] !== undefined ? "true" : undefined,
    style: { "--reveal-delay": `${delays[id] ?? 0}ms` } as CSSProperties,
  })

  return (
    <section id="experience" className="scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="section-head">
          <h2 className="section-title">Pengalaman &amp; Organisasi</h2>
          <p className="section-caption">
            {experiences.length} entries + education
          </p>
        </div>

        <div className="max-w-4xl">
          <ol className="relative">
            {experiences.map((experience) => {
              const ongoing = isOngoing(experience.endDate)

              return (
                <li
                  key={experience.id}
                  className="exp-item relative pb-10 pl-14 last:pb-0 sm:pl-16"
                  {...revealProps(experience.id)}
                >
                  <span aria-hidden="true" className="exp-connector" />

                  <span
                    aria-hidden="true"
                    className={`exp-node ${ongoing ? "exp-node-live" : ""}`}
                  >
                    <experience.icon
                      className={`h-4 w-4 ${
                        ongoing ? "text-accent" : "text-muted"
                      }`}
                      strokeWidth={2}
                    />
                  </span>

                  <article className="exp-card panel p-5 sm:p-6">
                    <h3 className="text-lg leading-snug font-semibold text-bone">
                      {experience.role}
                    </h3>

                    <p className="mt-3 font-mono text-xs text-accent">
                      {experience.company}
                      <span className="text-muted">
                        {" "}
                        · {experience.employmentType}
                      </span>
                      {ongoing && (
                        <span className="ml-2 text-[10px] tracking-widest text-accent/80">
                          {"// BERJALAN"}
                        </span>
                      )}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] text-muted">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays
                          className="h-3.5 w-3.5 shrink-0"
                          strokeWidth={2}
                        />
                        {experience.startDate} – {experience.endDate}
                        <span className="text-muted/60">
                          ({experience.duration})
                        </span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                        {experience.location} · {experience.locationType}
                      </span>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-muted">
                      {experience.summary}
                    </p>
                  </article>
                </li>
              )
            })}
          </ol>

          <div
            className="exp-item relative mt-12"
            {...revealProps("education")}
          >
            <div className="exp-card panel p-5 sm:p-6">
              <div className="mb-3 flex items-center gap-3">
                <GraduationCap
                  className="h-5 w-5 text-accent"
                  strokeWidth={2.5}
                />
                <span className="caption caption-green">
                  <span>[TRAINING_ARC] // education</span>
                </span>
              </div>
              <p className="text-sm leading-relaxed text-muted">
                S1 Teknik Informatika, DTETI, Fakultas Teknik, Universitas Gadjah
                Mada — 2022 – 2026 (perkiraan lulus), IPK 3.29
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
