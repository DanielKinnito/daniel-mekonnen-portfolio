import { Experience } from "@/lib/data/experience";

export default function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <div className="group relative rounded-xl border border-border bg-card p-6 shadow-xs transition-all duration-200 hover:border-accent/40 hover:shadow-sm">
      {/* Top Bar: Role & Period */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
        <div>
          <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors">
            {experience.role}
          </h3>
          <div className="flex items-center gap-2 pt-0.5 text-sm text-secondary">
            {experience.url ? (
              <a
                href={experience.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline decoration-border hover:decoration-accent hover:text-accent"
              >
                {experience.company}
              </a>
            ) : (
              <span className="font-medium text-primary">{experience.company}</span>
            )}
            <span className="text-muted">•</span>
            <span className="text-muted text-xs font-mono">{experience.location}</span>
          </div>
        </div>

        {/* Monospace Period Badge */}
        <div className="self-start sm:self-auto">
          <span className="inline-flex items-center rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-mono text-muted">
            {experience.period}
          </span>
        </div>
      </div>

      {/* Bullets */}
      <ul className="mt-4 space-y-2 text-sm leading-relaxed text-secondary">
        {experience.bullets.map((bullet, idx) => (
          <li key={idx} className="flex items-start gap-2.5">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      {/* Skills / Tech Tags */}
      <div className="mt-4 flex flex-wrap gap-1.5 pt-2 border-t border-border/60">
        {experience.skills.map((skill) => (
          <span
            key={skill}
            className="rounded border border-border/80 bg-surface/60 px-2 py-0.5 font-mono text-[11px] text-muted"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
