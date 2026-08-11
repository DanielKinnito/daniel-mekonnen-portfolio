"use client";

import { RESUME_LINK } from "@/lib/constants";
import Button from "../ui/button";

export default function ContactAndResumeBtns() {
  return (
    <div className="flex flex-wrap gap-3 sm:gap-4">
      <Button
        href="#contact"
        type="primary"
        text="Start a Conversation"
      />
      <Button
        href={RESUME_LINK}
        target="_blank"
        rel="noreferrer"
        text="Download Resume"
        icon="/svg/download.svg"
      />
    </div>
  );
}
