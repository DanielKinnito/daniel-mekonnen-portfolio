"use client";

import { Project as ProjectInterface } from "@/lib/types/project";
import Image from "next/image";

export default function Project({
  name,
  tagline,
  description,
  period,
  imageUrl,
  tags,
  bullets,
  urls,
}: ProjectInterface) {
  return (
    <div className="group flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-xs transition-all duration-200 hover:border-accent/40 hover:shadow-sm">
      <div>
        {/* Top Header: Title, Tagline, & Action Buttons */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors">
                {name}
              </h3>
              {period && (
                <span className="rounded bg-surface px-2 py-0.5 font-mono text-[11px] text-muted hidden sm:inline-block">
                  {period}
                </span>
              )}
            </div>
            {tagline && (
              <p className="mt-0.5 text-xs font-mono text-accent/90">
                {tagline}
              </p>
            )}
          </div>

          {/* Action Links with PostHog mechanical keycap styling */}
          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            {urls.liveDemo && (
              <a
                href={urls.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border-2 border-[#B83800] bg-accent px-3 py-1.5 font-mono text-xs font-semibold text-white shadow-[0_2.5px_0_0_#8F2C00] hover:shadow-[0_3.5px_0_0_#8F2C00] hover:-translate-y-0.5 active:translate-y-1 active:shadow-none transition-all"
              >
                <span>Live Demo</span>
                <span className="text-[10px]">↗</span>
              </a>
            )}
            {urls.repo && (
              <a
                href={urls.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border-2 border-border bg-card px-3 py-1.5 font-mono text-xs font-semibold text-primary shadow-[0_2.5px_0_0_#D0CDC2] dark:shadow-[0_2.5px_0_0_#0F1012] hover:shadow-[0_3.5px_0_0_#D0CDC2] dark:hover:shadow-[0_3.5px_0_0_#0F1012] hover:border-accent/60 hover:-translate-y-0.5 active:translate-y-1 active:shadow-none transition-all"
              >
                <Image
                  src="/skills/github.svg"
                  width={14}
                  height={14}
                  alt="GitHub"
                  className="opacity-80"
                />
                <span>Source</span>
                <span className="text-[10px]">↗</span>
              </a>
            )}
          </div>
        </div>

        {/* Short Summary */}
        <p className="mt-3 text-sm leading-relaxed text-secondary">
          {description}
        </p>

        {/* Key Engineering Highlights / Bullets */}
        {bullets && bullets.length > 0 && (
          <ul className="mt-3 space-y-1.5 text-xs leading-relaxed text-secondary">
            {bullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Architecture & Tech Tags */}
      {tags && tags.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-1.5 border-t border-border/60 pt-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded border border-border/80 bg-surface/70 px-2 py-0.5 font-mono text-[11px] text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
