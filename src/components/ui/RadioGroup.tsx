"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> & { className?: string }
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    className={cn("grid gap-3", className)}
    {...props}
  />
));
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & { className?: string }
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(
      "aspect-square h-4 w-4 rounded-full border border-border text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
));
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: RadioOption[];
  name: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  hint?: string;
  orientation?: "horizontal" | "vertical";
}

export function RadioCard({
  options,
  name,
  value,
  onChange,
  label,
  error,
  hint,
  orientation = "vertical",
  id,
  ...props
}: RadioCardProps) {
  const generatedId = React.useId();
  const groupId = id || generatedId;

  return (
    <div className="w-full" {...props}>
      {label && (
        <label htmlFor={groupId} className="mb-2 block text-sm font-medium text-text-primary">
          {label}
        </label>
      )}
      <RadioGroup
        name={name}
        value={value}
        onValueChange={onChange}
        className={cn(orientation === "horizontal" ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-1")}
      >
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              "relative flex cursor-pointer items-start p-4 rounded-[var(--radius-card)] border-2 transition-all",
              "hover:border-primary/50 hover:bg-primary/5",
              "data-[state=checked]:border-primary data-[state=checked]:bg-primary/5",
              option.disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <RadioGroupPrimitive.Item
              value={option.value}
              disabled={option.disabled}
              className="mt-0.5 h-4 w-4 shrink-0 rounded-full border-2 border-border text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 data-[state=checked]:border-primary"
            />
            <div className="ml-3 flex-1 min-w-0">
              <p className="font-medium text-text-primary">{option.label}</p>
              {option.description && (
                <p className="mt-0.5 text-sm text-text-secondary">{option.description}</p>
              )}
            </div>
          </label>
        ))}
      </RadioGroup>
      {error && <p className="mt-1.5 text-sm text-error" role="alert">{error}</p>}
      {hint && !error && <p className="mt-1.5 text-sm text-text-secondary">{hint}</p>}
    </div>
  );
}

export { RadioGroup, RadioGroupItem };