"use client";

import { ChangeEvent } from "react";

interface FormInputProps {
  type: "email" | "text" | "password";
  label: string;
  htmlFor: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInput({
  type,
  label,
  htmlFor,
  value,
  onChange,
}: FormInputProps) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="text-sm capitalize text-gray-400 md:text-base"
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        id={htmlFor}
        onChange={onChange}
        className="w-full rounded border border-neon-green/30 bg-dark-bg p-2.5 text-sm text-gray-300 outline-none focus:border-neon-green/60 focus:ring-1 focus:ring-neon-green/30 md:text-base mt-1"
      />
    </div>
  );
}
