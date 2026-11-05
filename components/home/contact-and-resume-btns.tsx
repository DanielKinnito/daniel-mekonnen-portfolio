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

      // Ignore when modifier keys (Ctrl, Cmd/Meta, Alt) are pressed to allow native browser shortcuts (reload, print, etc.)
      if (e.ctrlKey || e.metaKey || e.altKey) {
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
      <Button
        variant="primary"
        text="View Experience"
        shortcut="E"
        href="#experience"
      />
      <Button
        variant="secondary"
        text="Featured Projects"
        shortcut="P"
        href="#projects"
      />
      <Button
        variant="outline"
        text="Download Resume"
        shortcut="R"
        icon="/svg/download.svg"
        href={RESUME_LINK}
        target="_blank"
        rel="noopener noreferrer"
      />
    </div>
  );
}
