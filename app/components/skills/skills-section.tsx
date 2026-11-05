import Skills from "./skills";

export default function SkillsSection() {
  return (
    <section id="skills" className="py-12 sm:py-16">
      {/* Section Header */}
      <div className="mb-8 space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold">
            [03] Technical Arsenal
          </span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
          Core Competencies
        </h2>
        <p className="max-w-2xl text-base text-secondary">
          Languages, backend frameworks, cloud data infrastructure, and algorithmic practices honed through production delivery and intensive coaching.
        </p>
      </div>

      <Skills />
    </section>
  );
}
