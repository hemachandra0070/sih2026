"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";
import { InfoPanel } from "@/components/ui/InfoPanel";

export interface QuestionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  step: number;
  totalSteps: number;
  question: string;
  description?: string;
  helpText?: string;
  helpTitle?: string;
  error?: string;
}

export function QuestionCard({
  step,
  totalSteps,
  question,
  description,
  helpText,
  helpTitle = "Why do we ask this?",
  error,
  className,
  children,
  ...props
}: QuestionCardProps) {
  return (
    <div
      className={cn(
        "w-full max-w-2xl mx-auto rounded-[var(--radius-card)] border border-border bg-surface p-5 sm:p-8",
        className
      )}
      {...props}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-medium text-text-secondary">
          Step {step} of {totalSteps}
        </span>
      </div>

      <h2 className="text-xl font-semibold text-text-primary sm:text-2xl">{question}</h2>

      {description && (
        <p className="mt-2 text-base text-text-secondary">{description}</p>
      )}

      <div className="mt-6">{children}</div>

      {helpText && (
        <div className="mt-6">
          <InfoPanel title={helpTitle}>
            <p className="flex items-start gap-2 text-sm leading-relaxed">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-info" aria-hidden="true" />
              {helpText}
            </p>
          </InfoPanel>
        </div>
      )}

      {error && (
        <p id="question-error" className="mt-3 text-sm text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}