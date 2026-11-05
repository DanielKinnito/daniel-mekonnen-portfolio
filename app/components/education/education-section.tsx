import { EDUCATION_LIST } from "@/lib/data/education";

export default function EducationSection() {
  return (
    <section id="education" className="py-12 sm:py-16">
      {/* Section Header */}
      <div className="mb-8 space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold">
            [04] Academic Background
          </span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
          Education &amp; Academies
        </h2>
        <p className="max-w-2xl text-base text-secondary">
          Rigorous computer science foundations, competitive algorithmic training, and software engineering coursework.
        </p>
      </div>

      {/* Education Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {EDUCATION_LIST.map((edu, idx) => (
          <div
            key={idx}
            className="group relative flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-xs transition-all duration-200 hover:border-accent/40 hover:shadow-md"
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-primary group-hover:text-accent transition-colors">
                    {edu.degree}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-secondary font-medium">
                    {edu.url ? (
                      <a
                        href={edu.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline hover:text-accent"
                      >
                        {edu.institution} ↗
                      </a>
                    ) : (
                      <span>{edu.institution}</span>
                    )}
                  </div>
                </div>

                {edu.gpa && (
                  <span className="shrink-0 rounded-md border border-accent/30 bg-accent/10 px-2 py-0.5 text-xs font-mono font-semibold text-accent">
                    CGPA {edu.gpa}
                  </span>
                )}
              </div>

              {/* Monospace Metadata */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-muted">
                <span>{edu.period}</span>
                {edu.location && (
                  <>
                    <span>•</span>
                    <span>{edu.location}</span>
                  </>
                )}
              </div>

              {/* Bullets */}
              <ul className="space-y-2 text-sm text-secondary leading-relaxed">
                {edu.bullets.map((b, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2">
                    <span className="text-accent select-none mt-1 text-xs">▸</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Badges */}
            <div className="mt-5 pt-4 border-t border-border/60 flex flex-wrap gap-1.5">
              {edu.badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-md border border-border bg-surface px-2 py-0.5 text-[11px] font-mono text-muted"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

