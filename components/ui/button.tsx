"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface IconButtonProps {
  type?: "primary";
  text: string;
  icon?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  buttonType?: "button" | "submit" | "reset";
}

const defaultClasses =
  "group inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm text-slate-200 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-main/50 hover:bg-main/10 hover:text-white md:text-base";

const primaryClasses = "border-main/35 bg-main/12 text-white shadow-[0_10px_28px_rgba(95,164,145,0.12)]";

export default function Button({
  type = "primary",
  text,
  icon = "",
  onClick,
  href,
  target,
  rel,
  className,
  buttonType = "button",
}: IconButtonProps) {
  const content = (
    <>
      <span>{text}</span>
      {icon.trim() && (
        <Image
          src={icon}
          width={22}
          height={22}
          alt="button-icon"
          className="w-4 opacity-80 transition-transform duration-300 group-hover:translate-x-0.5"
        />
      )}
    </>
  );

  const classes = cn(defaultClasses, type === "primary" && primaryClasses, className);

  if (href) {
    return (
      <a className={classes} href={href} target={target} rel={rel}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick} type={buttonType}>
      {content}
    </button>
  );
}
