"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [activeHash, setActiveHash] = useState<string>("");

  const links = [
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#education", label: "Education" },
    { href: "#contact", label: "Contact" },
  ];

  // Dynamic scroll spy: tracks active section precisely using viewport bounding rects
  useEffect(() => {
    const sectionIds = ["experience", "projects", "skills", "education", "contact"];

    function updateActiveSection() {
      // 1. If at bottom of page, highlight the last section (Contact)
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60
      ) {
        setActiveHash("#contact");
        return;
      }

      // 2. If at top of page (hero area), clear active selection
      if (window.scrollY < 120) {
        setActiveHash("");
        return;
      }

      // 3. Find which section occupies the active reading threshold below the navbar (~180px)
      let currentSection = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 260 && rect.bottom > 120) {
            currentSection = `#${id}`;
          }
        }
      }

      if (currentSection) {
        setActiveHash(currentSection);
      }
    }

    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection, { passive: true });
    updateActiveSection();

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return (
    <nav className="overflow-x-auto no-scrollbar py-0.5">
      <ul className="flex items-center gap-0.5 sm:gap-1 rounded-lg border border-border/70 bg-surface/50 p-1 text-xs font-mono whitespace-nowrap">
        {links.map((l) => {
          const isActive = activeHash === l.href;
          return (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setActiveHash(l.href)}
                className={`inline-flex items-center gap-1.5 rounded-md px-2.5 sm:px-3 py-1 transition-all duration-150 select-none ${
                  isActive
                    ? "bg-card font-semibold text-primary border border-border/80 shadow-xs"
                    : "text-secondary hover:text-primary hover:bg-surface/80 border border-transparent"
                }`}
              >
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0 animate-in fade-in zoom-in-50 duration-150" />
                )}
                <span>{l.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
