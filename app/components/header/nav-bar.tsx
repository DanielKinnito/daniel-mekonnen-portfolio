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
          // Active when the section top has scrolled past the header offset
          // and its bottom is still visible in the upper viewport
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
    <nav className="overflow-x-auto no-scrollbar">
      <ul className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-mono whitespace-nowrap">
        {links.map((l) => {
          const isActive = activeHash === l.href;
          return (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setActiveHash(l.href)}
                className={`inline-block rounded-md px-3 py-1.5 transition-all duration-100 ${
                  isActive
                    ? "bg-surface font-semibold text-primary border-2 border-border shadow-[0_2px_0_0_#2B2D33] dark:shadow-[0_2px_0_0_#0F1012]"
                    : "text-secondary hover:text-primary hover:bg-surface/60 border border-transparent hover:border-border hover:shadow-[0_1.5px_0_0_#2B2D33] dark:hover:shadow-[0_1.5px_0_0_#0F1012]"
                }`}
              >
                {l.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
