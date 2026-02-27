"use client";

import { cn } from "@/lib/utils";

export function Checkbox({
  checked,
  onChange,
  id,
  label,
  className,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
  label?: string;
  className?: string;
}) {
  return (
    <label
      htmlFor={id}
      className={cn("inline-flex items-center gap-2.5 cursor-pointer group", className)}
    >
      <button
        id={id}
        role="checkbox"
        type="button"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-md border transition-all",
          checked
            ? "border-foreground bg-foreground animate-check-pop"
            : "border-foreground/20 bg-white hover:border-foreground/40"
        )}
      >
        {checked && (
          <svg
            width="10"
            height="8"
            viewBox="0 0 10 8"
            fill="none"
            className="text-white"
          >
            <path
              d="M1 4L3.5 6.5L9 1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
      {label && (
        <span
          className={cn(
            "text-sm transition-colors",
            checked ? "text-foreground/40 line-through" : "text-foreground"
          )}
        >
          {label}
        </span>
      )}
    </label>
  );
}
