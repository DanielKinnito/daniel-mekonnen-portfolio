"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface IconButtonProps {
  type?: "primary";
  text: string;
  icon?: string;
  onClick?: () => void;
}

const defaultClasses =
  "border border-neon-green/40 text-gray-300 text-sm px-4 py-2.5 md:text-base rounded hover:bg-neon-green/10 hover:text-neon-green hover:border-neon-green transition-all duration-200 flex items-center cursor-pointer gap-2 min-h-[44px]";

const primaryClasses = "bg-neon-green/10 text-neon-green border-neon-green/50";

export default function Button({
  type = "primary",
  text,
  icon = "",
  onClick,
}: IconButtonProps) {
  return (
    <button
      className={cn(
        defaultClasses,
        type === "primary" && primaryClasses
      )}
      onClick={onClick}
    >
      <span>{text}</span>
      {icon.trim() && (
        <Image
          src={icon}
          width={22}
          height={22}
          alt="button-icon"
          className="w-4 opacity-70"
        />
      )}
    </button>
  );
}
