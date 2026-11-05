"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [activeHash, setActiveHash] = useState<string>("#experience");

  const links = [
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#education", label: "Education" },
    { href: "#contact", label: "Contact" },
  ];

  // Dynamic scroll spy: tracks active section as the user scrolls
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

      // 2. Find which section occupies the active reading threshold below the navbar
      let currentSection = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 260 && rect.bottom > 100) {
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
    <nav className="overflow-x-auto no-scrollbar py-1">
      <ul className="flex items-center gap-1.5 sm:gap-2 text-xs font-mono whitespace-nowrap">
        {links.map((l) => {
          const isActive = activeHash === l.href;
          return (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setActiveHash(l.href)}
                className={`inline-flex items-center justify-center rounded-lg border-2 px-3 py-1.5 text-xs font-mono font-semibold transition-all duration-75 select-none cursor-pointer ${
                  isActive
                    ? "bg-accent text-white border-[#B83800] shadow-[0_2px_0_0_#8F2C00] hover:shadow-[0_3px_0_0_#8F2C00] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none"
                    : "bg-card text-secondary border-border shadow-[0_2px_0_0_#D0CDC2] dark:shadow-[0_2px_0_0_#0F1012] hover:text-primary hover:border-accent/60 hover:-translate-y-0.5 hover:shadow-[0_3px_0_0_#D0CDC2] dark:hover:shadow-[0_3px_0_0_#0F1012] active:translate-y-0.5 active:shadow-none"
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
