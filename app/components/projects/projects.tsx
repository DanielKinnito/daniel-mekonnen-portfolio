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
          className="inline-flex items-center gap-2 rounded-lg border-2 border-border bg-card px-4 py-2 text-xs font-mono font-semibold text-secondary hover:text-primary hover:border-accent shadow-[0_2.5px_0_0_#2B2D33] dark:shadow-[0_2.5px_0_0_#0F1012] hover:-translate-y-0.5 hover:shadow-[0_3.5px_0_0_#2B2D33] dark:hover:shadow-[0_3.5px_0_0_#0F1012] active:translate-y-1 active:shadow-none transition-all cursor-pointer"
        >
          <span>
            {showAdditional
              ? "▲ Hide additional projects"
              : "+ View 2 more projects [Attune VS Code Extension, Scoundrel Web Game]"}
          </span>
          <kbd className="hidden sm:inline-block rounded bg-surface px-1.5 py-0.2 text-[10px] text-muted border border-border">
            {showAdditional ? "ESC" : "MORE"}
          </kbd>
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
