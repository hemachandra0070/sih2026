"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  label?: string;
  error?: string;
  hint?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, prefix, suffix, id, ...props }, ref) => {
    const generatedId = React.useId();
  const inputId = id || generatedId;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-text-primary">
            {label}
          </label>
        )}
        <div className="relative">
          {prefix && <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">{prefix}</div>}
          <input
            id={inputId}
            type={props.type}
            className={cn(
              "flex h-10 w-full rounded-[var(--radius-input)] border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-text-primary disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-error focus:ring-error",
              prefix && "pl-10",
              suffix && "pr-10",
              className
            )}
            ref={ref}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...props}
          />
          {suffix && <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary">{suffix}</div>}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-sm text-error" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="mt-1.5 text-sm text-text-secondary">
            {hint}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };