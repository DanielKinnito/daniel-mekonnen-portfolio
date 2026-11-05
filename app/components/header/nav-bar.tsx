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

  // Dynamic scroll spy: tracks active section as the user scrolls
  useEffect(() => {
    const sectionIds = ["experience", "projects", "skills", "education", "contact"];

    function handleScroll() {
      const scrollY = window.scrollY;
      const headerOffset = 180; // Offset for sticky navbar + top padding

      // If scrolled to bottom of page, highlight the last section (Contact)
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60
      ) {
        setActiveHash("#contact");
        return;
      }

      let currentSection = "";
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop - headerOffset;
          if (scrollY >= top) {
            currentSection = `#${id}`;
            break;
          }
        }
      }

      setActiveHash(currentSection);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav>
      <ul className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-mono">
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
