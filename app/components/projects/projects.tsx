"use client";

import { useState } from "react";
import { FEATURED_PROJECTS, ADDITIONAL_PROJECTS } from "@/lib/data/projects";
import Project from "./project";

export default function Projects() {
  const [showAdditional, setShowAdditional] = useState(false);

  return (
    <div className="space-y-6">
      {/* Primary Featured Projects */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {FEATURED_PROJECTS.map((project, idx) => (
          <Project key={idx} {...project} />
        ))}
      </div>

      {/* Subtle Additional Projects Toggle */}
      <div className="flex flex-col items-center pt-2">
        <button
          onClick={() => setShowAdditional((prev) => !prev)}
          className="inline-flex items-center gap-2 rounded-lg border border-dashed border-border px-4 py-2 text-xs font-mono text-muted hover:border-accent hover:text-primary transition-all active:scale-[0.98]"
        >
          <span>
            {showAdditional
              ? "▲ Hide additional projects"
              : "+ View 2 more projects [Attune VS Code Extension, Scoundrel Web Game]"}
          </span>
        </button>

        {showAdditional && (
          <div className="mt-6 grid w-full grid-cols-1 gap-6 lg:grid-cols-2 animate-in fade-in duration-200">
            {ADDITIONAL_PROJECTS.map((project, idx) => (
              <Project key={`add-${idx}`} {...project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
