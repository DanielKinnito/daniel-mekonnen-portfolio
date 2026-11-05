"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface ButtonProps {
  variant?: "primary" | "secondary" | "outline";
  text: string;
  icon?: string;
  shortcut?: string;
  className?: string;
  onClick?: () => void;
}

export default function Button({
  variant = "primary",
  text,
  icon = "",
  shortcut = "",
  className = "",
  onClick,
}: ButtonProps) {
  // PostHog tactile mechanical keycap classes with physical 3D depression on press
  const baseClasses =
    "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-mono font-semibold transition-all duration-75 select-none cursor-pointer border-2";

  const variantClasses = {
    primary:
      "bg-accent text-white border-[#B83800] shadow-[0_3px_0_0_#8F2C00] hover:shadow-[0_4px_0_0_#8F2C00] hover:-translate-y-0.5 active:translate-y-1 active:shadow-none",
    secondary:
      "bg-card text-primary border-border shadow-[0_3px_0_0_#2B2D33] dark:shadow-[0_3px_0_0_#0A0B0D] hover:shadow-[0_4px_0_0_#2B2D33] dark:hover:shadow-[0_4px_0_0_#0A0B0D] hover:-translate-y-0.5 active:translate-y-1 active:shadow-none",
    outline:
      "bg-surface text-secondary hover:text-primary border-border shadow-[0_2px_0_0_#2B2D33] dark:shadow-[0_2px_0_0_#0A0B0D] hover:-translate-y-0.5 active:translate-y-1 active:shadow-none",
  };

  return (
    <button
      onClick={onClick}
      className={cn(baseClasses, variantClasses[variant], className)}
    >
      <span>{text}</span>
      {shortcut && (
        <kbd className="hidden sm:inline-block rounded px-1.5 py-0.5 text-[10px] font-mono font-bold bg-black/20 text-white/90 dark:bg-white/10 dark:text-white/80 border border-white/20 uppercase">
          {shortcut}
        </kbd>
      )}
      {icon.trim() && (
        <Image
          src={icon}
          width={14}
          height={14}
          alt=""
          className="w-3.5 h-3.5 opacity-90 inline-block"
        />
      )}
    </button>
  );
}
