"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & { className?: string }
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-background",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all duration-300"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export interface StepperStep {
  label: string;
  completed: boolean;
  current: boolean;
}

export interface StepperProps {
  steps: StepperStep[];
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export function Stepper({ steps, className, orientation = "horizontal" }: StepperProps) {
  return (
    <div className={cn("flex", orientation === "vertical" ? "flex-col" : "", className)}>
      {steps.map((step, index) => (
        <div key={index} className={cn("flex items-center", orientation === "vertical" ? "flex-col" : "flex-1")}>
          <div className={cn("flex items-center", orientation === "horizontal" && "flex-1")}>
            <div
              className={cn(
                "relative flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium transition-all",
                step.completed
                  ? "bg-primary border-primary text-white"
                  : step.current
                  ? "border-primary text-primary bg-surface"
                  : "border-border text-text-secondary bg-surface"
              )}
            >
              {step.completed ? (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            {orientation === "horizontal" && index < steps.length - 1 && (
              <div
                className={cn(
                  "hidden h-0.5 flex-1 mx-2 transition-colors",
                  step.completed ? "bg-primary" : "bg-border"
                )}
              />
            )}
          </div>
          <div className={cn("mt-2 text-center text-sm", orientation === "vertical" && "mt-0 mb-4 w-full text-left")}>
            <p className={cn("font-medium", step.current && "text-primary", !step.current && "text-text-secondary")}>
              {step.label}
            </p>
            {step.completed && !step.current && (
              <p className="text-xs text-success">Completed</p>
            )}
          </div>
          {orientation === "vertical" && index < steps.length - 1 && (
            <div
              className={cn(
                "absolute left-4 h-full w-0.5 transition-colors",
                step.completed ? "bg-primary" : "bg-border"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export function ProgressBar({ value, className, showLabel = false }: { value: number; className?: string; showLabel?: boolean }) {
  return (
    <div className={cn("w-full", className)}>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-background">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
      {showLabel && <p className="text-xs text-text-secondary mt-1 text-right">{Math.round(value)}%</p>}
    </div>
  );
}

export { Progress };