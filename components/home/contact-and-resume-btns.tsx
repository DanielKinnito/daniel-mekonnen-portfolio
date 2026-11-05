"use client";

import { RESUME_LINK } from "@/lib/constants";
import Button from "../ui/button";

export default function ContactAndResumeBtns() {
  return (
    <div className="flex flex-wrap items-center gap-3 pt-2">
      <a href="#experience">
        <Button
          variant="primary"
          text="View Experience"
        />
      </a>
      <a href="#projects">
        <Button
          variant="secondary"
          text="Featured Projects"
        />
      </a>
      <a href={RESUME_LINK} target="_blank" rel="noopener noreferrer">
        <Button
          variant="outline"
          text="Download Resume"
          icon="/svg/download.svg"
        />
      </a>
    </div>
  );
}
