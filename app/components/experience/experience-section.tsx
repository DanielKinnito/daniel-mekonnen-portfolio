import { EXPERIENCES } from "@/lib/data/experience";
import ExperienceCard from "./experience-card";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-12 sm:py-16">
      {/* Section Header */}
      <div className="mb-8 space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold">
            [01] Professional Track
          </span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
          Work Experience
        </h2>
        <p className="max-w-2xl text-base text-secondary">
          Engineering roles focused on LLM reasoning validation, technical curriculum leadership, and production-grade architectures.
        </p>
      </div>

      {/* Experience Timeline Grid */}
      <div className="space-y-4">
        {EXPERIENCES.map((exp, idx) => (
          <ExperienceCard key={idx} experience={exp} />
        ))}
      </div>
    </section>
  );
}
