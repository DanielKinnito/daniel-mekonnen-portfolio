"use client";

import { ChangeEvent } from "react";

interface FormInputProps {
  type: "email" | "text" | "password";
  label: string;
  htmlFor: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export default function FormInput({
  type,
  label,
  htmlFor,
  value,
  onChange,
  placeholder = "",
}: FormInputProps) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={htmlFor}
        className="block text-xs font-mono font-medium text-muted uppercase tracking-wider"
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        id={htmlFor}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full rounded-lg border border-border bg-surface/50 px-3 py-2 text-sm text-primary placeholder:text-muted/60 transition-all outline-none focus:border-accent focus:ring-1 focus:ring-accent/40"
      />
    </div>
  );
}
