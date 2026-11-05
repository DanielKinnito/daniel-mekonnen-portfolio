"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";
import { spring } from "@/lib/animation";

interface ButtonProps {
  variant?: "primary" | "secondary" | "outline";
  text: string;
  icon?: string;
  className?: string;
  onClick?: () => void;
}

export default function Button({
  variant = "primary",
  text,
  icon = "",
  className = "",
  onClick,
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all select-none cursor-pointer";

  const variantClasses = {
    primary:
      "bg-accent hover:bg-accent/90 text-white border border-accent shadow-sm hover:shadow active:scale-[0.98]",
    secondary:
      "bg-card hover:bg-surface text-primary border border-border hover:border-accent/40 active:scale-[0.98]",
    outline:
      "bg-transparent hover:bg-surface text-primary border border-border hover:border-accent/40 active:scale-[0.98]",
  };

  return (
    <motion.button
      onClick={onClick}
      className={cn(baseClasses, variantClasses[variant], className)}
      whileTap={{ scale: 0.98 }}
      transition={spring}
    >
      <span>{text}</span>
      {icon.trim() && (
        <Image
          src={icon}
          width={16}
          height={16}
          alt=""
          className="w-4 h-4 opacity-90"
        />
      )}
    </motion.button>
  );
}
