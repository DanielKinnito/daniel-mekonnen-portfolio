"use client";

import { useEffect } from "react";
import { RESUME_LINK } from "@/lib/constants";
import Button from "../ui/button";

export default function ContactAndResumeBtns() {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }
      if (e.key === "e" || e.key === "E") {
        document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
      } else if (e.key === "p" || e.key === "P") {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
      } else if (e.key === "r" || e.key === "R") {
        window.open(RESUME_LINK, "_blank");
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-3 pt-2">
      <a href="#experience">
        <Button
          variant="primary"
          text="View Experience"
          shortcut="E"
        />
      </a>
      <a href="#projects">
        <Button
          variant="secondary"
          text="Featured Projects"
          shortcut="P"
        />
      </a>
      <a href={RESUME_LINK} target="_blank" rel="noopener noreferrer">
        <Button
          variant="outline"
          text="Download Resume"
          shortcut="R"
          icon="/svg/download.svg"
        />
      </a>
    </div>
  );
}
