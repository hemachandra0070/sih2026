"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

export interface ChoiceOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface ChoiceCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  name: string;
  options: ChoiceOption[];
  value?: string;
  onChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
}

export function ChoiceCard({
  name,
  options,
  value,
  onChange,
  orientation = "vertical",
  className,
  ...props
}: ChoiceCardProps) {
  return (
    <div className={cn("w-full", className)} {...props}>
      <RadioGroupPrimitive.Root
        name={name}
        value={value}
        onValueChange={onChange}
        className={cn("grid gap-3", orientation === "horizontal" ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-1")}
      >
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              "relative flex cursor-pointer flex-col gap-1 rounded-[var(--radius-card)] border-2 border-border bg-surface p-4 transition-all",
              "hover:border-primary/40 hover:bg-primary/[0.02]",
              "has-[:checked]:border-primary has-[:checked]:bg-primary/[0.03]",
              option.disabled && "cursor-not-allowed opacity-50"
            )}
          >
            <RadioGroupPrimitive.Item
              value={option.value}
              disabled={option.disabled}
              className="absolute right-3 top-3 mt-0.5 h-4 w-4 shrink-0 rounded-full border-2 border-border data-[state=checked]:border-primary data-[state=checked]:border-[5px] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            />
            {option.icon && <div className="text-primary">{option.icon}</div>}
            <span className="text-base font-medium text-text-primary">{option.label}</span>
            {option.description && (
              <span className="text-sm text-text-secondary">{option.description}</span>
            )}
          </label>
        ))}
      </RadioGroupPrimitive.Root>
    </div>
  );
}