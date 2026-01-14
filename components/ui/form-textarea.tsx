"use client";

import { ChangeEvent } from "react";

interface FormTextAreaProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function FormTextArea({ value, onChange }: FormTextAreaProps) {
  return (
    <div>
      <label htmlFor="message" className="text-sm text-gray-400 md:text-base">
        Message
      </label>
      <textarea
        name=""
        id="message"
        className="block h-32 w-full rounded border border-neon-green/30 bg-dark-bg p-2.5 text-sm text-gray-300 outline-none focus:border-neon-green/60 focus:ring-1 focus:ring-neon-green/30 md:text-base mt-1 resize-none"
        value={value}
        onChange={onChange}
      ></textarea>
    </div>
  );
}
