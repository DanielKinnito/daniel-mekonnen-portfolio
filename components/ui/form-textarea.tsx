"use client";

import { ChangeEvent } from "react";

interface FormTextAreaProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  label?: string;
  htmlFor?: string;
  placeholder?: string;
}

export default function FormTextArea({
  value,
  onChange,
  label = "Message",
  htmlFor = "message",
  placeholder = "Write your message here...",
}: FormTextAreaProps) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={htmlFor}
        className="block text-xs font-mono font-medium text-muted uppercase tracking-wider"
      >
        {label}
      </label>
      <textarea
        id={htmlFor}
        rows={4}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-border bg-surface/50 px-3 py-2 text-sm text-primary placeholder:text-muted/60 transition-all outline-none focus:border-accent focus:ring-1 focus:ring-accent/40 resize-none"
      />
    </div>
  );
}
