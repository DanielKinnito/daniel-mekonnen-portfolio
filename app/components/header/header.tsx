"use client";

import Link from "next/link";
import NavBar from "./nav-bar";
import ThemeToggle from "../ui/theme-toggle";
import { RESUME_LINK } from "@/lib/constants";

export default function Header() {
  return (
    <header className="appHeader">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-2.5 sm:px-6 lg:px-8">
        {/* Left: Brand Monogram */}
        <Link
          href="#home"
          className="group flex items-center gap-2 font-mono text-sm font-semibold text-primary"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded bg-accent text-[11px] font-bold text-white shadow-xs">
            DM
          </span>
          <span className="hidden sm:inline-block tracking-tight text-xs font-mono text-muted group-hover:text-primary transition-colors">
            daniel.mekonnen
          </span>
        </Link>

        {/* Center: Navigation Links */}
        <NavBar />

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <a
            href={RESUME_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-mono font-medium text-primary hover:border-accent/50 hover:bg-surface transition-all active:scale-[0.98]"
          >
            <span>Resume</span>
            <span className="ml-1 text-[10px] text-muted">↗</span>
          </a>
        </div>
      </div>
    </header>
  );
}
