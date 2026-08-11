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
        className="mt-1 w-full rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-main/45 focus:ring-1 focus:ring-main/20 md:text-base"
      />
    </div>
  );
}
