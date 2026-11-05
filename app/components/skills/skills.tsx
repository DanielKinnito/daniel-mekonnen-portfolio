import Image from "next/image";
import { SKILL_CATEGORIES } from "@/lib/data/skills";

export default function Skills() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {SKILL_CATEGORIES.map((cat, idx) => (
        <div
          key={idx}
          className="rounded-xl border border-border bg-card p-5 shadow-xs transition-all duration-200 hover:border-accent/40 hover:shadow-sm"
        >
          {/* Category Header */}
          <div className="mb-4 flex items-center justify-between border-b border-border/70 pb-2">
            <h3 className="text-base font-bold text-primary font-mono">
              {cat.title}
            </h3>
            <span className="font-mono text-[11px] text-muted">
              {cat.skills.length} items
            </span>
          </div>

          {/* Skill Pills */}
          <div className="flex flex-wrap gap-2">
            {cat.skills.map((skill, sIdx) => (
              <div
                key={sIdx}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface/70 px-2.5 py-1 text-xs font-mono text-secondary transition-all hover:border-accent/50 hover:text-primary active:scale-[0.98]"
              >
                {skill.icon && (
                  <Image
                    src={skill.icon}
                    alt=""
                    width={14}
                    height={14}
                    className="h-3.5 w-3.5 opacity-80"
                  />
                )}
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
