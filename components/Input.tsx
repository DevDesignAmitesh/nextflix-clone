"use client";

import React, { ChangeEvent } from "react";

interface InputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  id: string;
  type?: string;
  autoComplete?: string;
}

const Input = ({
  value,
  onChange,
  label,
  id,
  type = "text",
  autoComplete = "off",
}: InputProps) => {
  return (
    <div className="relative w-full mb-4 rounded-md overflow-hidden">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder=" "
        autoComplete={autoComplete}
        className="w-full outline-none bg-neutral-700 text-white px-3 pb-1 pt-6 peer placeholder-transparent"
      />
      <label
        htmlFor={id}
        className="absolute left-3 text-white/70 text-[14px] transition-all duration-200 peer-placeholder-shown:top-5 peer-placeholder-shown:text-[16px] peer-placeholder-shown:text-white/50 peer-focus:top-1 peer-focus:text-[14px]"
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
