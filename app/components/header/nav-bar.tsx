"use client";

import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
  const [activeHash, setActiveHash] = useState("#experience");

  const links = [
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#education", label: "Education" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav>
      <ul className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-mono">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              onClick={() => setActiveHash(l.href)}
              className={`inline-block rounded-md px-3 py-1.5 transition-all duration-100 ${
                activeHash === l.href
                  ? "bg-surface font-semibold text-primary border-2 border-border shadow-[0_2px_0_0_#2B2D33] dark:shadow-[0_2px_0_0_#0F1012]"
                  : "text-secondary hover:text-primary hover:bg-surface/60 border border-transparent hover:border-border hover:shadow-[0_1.5px_0_0_#2B2D33] dark:hover:shadow-[0_1.5px_0_0_#0F1012]"
              }`}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
