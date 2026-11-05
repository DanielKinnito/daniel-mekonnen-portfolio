import Projects from "./projects";

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-12 sm:py-16">
      {/* Section Header */}
      <div className="mb-8 space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold">
            [02] Production Systems
          </span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
          Featured Projects
        </h2>
        <p className="max-w-2xl text-base text-secondary">
          Selected open-source engines, automated bot pipelines, and full-stack applications with real architecture highlights.
        </p>
      </div>

      <Projects />
    </section>
  );
}
