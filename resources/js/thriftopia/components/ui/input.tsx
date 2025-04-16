import React, { useState } from 'react';

import { cn } from "@/lib/utils"

interface FloatingLabelInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  variant?: 'default' | 'maju';
}


function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md  bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

function FloatInput({
  label,
  type = "text",
  value,
  onChange,
  className = "",
  // variant = "default", // Default variant
}: FloatingLabelInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const isFloating = isFocused || value.length > 0;

  // // **Tentukan kelas berdasarkan variant**
  // const variantClass =
  //   variant === "maju"
  //     ? ""
  //     : "border border-gray-300 focus:ring-gray-500";

  return (
    <div className={`relative ${className}`}>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`peer w-full pl-10 py-2 rounded-md transition-all  focus:outline-none focus:ring-2 placeholder-transparent border border-gray-300 focus:ring-gray-500`}
        placeholder=" "
      />
      <label
        className={`absolute left-10 transition-all duration-200 pointer-events-none
          ${isFloating ? "-translate-y-3 text-sm  bg-white rounded-full px-1 will-change-transform text-black" : "translate-y-2 text-gray-500"}
        `}
      >
        {label}
      </label>
    </div>
  );
}
export { Input, FloatInput }
