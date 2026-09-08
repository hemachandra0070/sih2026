"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/Input";

export interface CurrencyInputProps {
  value: number | null;
  onChange: (value: number | null) => void;
  label?: string;
  id?: string;
  placeholder?: string;
  error?: string;
  hint?: string;
  suggestions?: number[];
  maxDigits?: number;
  className?: string;
}

const toDigits = (input: string) => input.replace(/\D/g, "");

function formatDisplay(digits: string): string {
  if (!digits) return "";
  return new Intl.NumberFormat("en-IN").format(Number(digits));
}

export function CurrencyInput({
  value,
  onChange,
  label,
  id,
  placeholder = "e.g. 3,00,000",
  error,
  hint,
  suggestions = [],
  maxDigits = 11,
  className,
}: CurrencyInputProps) {
  const [display, setDisplay] = React.useState<string>(() =>
    value ? new Intl.NumberFormat("en-IN").format(value) : ""
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const digits = toDigits(event.target.value).slice(0, maxDigits);
    setDisplay(formatDisplay(digits));
    onChange(digits ? Number(digits) : null);
  };

  const pickSuggestion = (amount: number) => {
    setDisplay(new Intl.NumberFormat("en-IN").format(amount));
    onChange(amount);
  };

  return (
    <div className={cn("w-full", className)}>
      <Input
        id={id}
        label={label}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        prefix={<span className="font-semibold">₹</span>}
        value={display}
        onChange={handleChange}
        placeholder={placeholder}
        error={error}
        hint={hint}
      />
      {suggestions.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {suggestions.map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => pickSuggestion(amount)}
              className={cn(
                "rounded-full border border-border bg-surface px-3 py-1 text-sm font-medium text-text-secondary",
                "hover:border-primary hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              )}
            >
              ₹{new Intl.NumberFormat("en-IN").format(amount)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}