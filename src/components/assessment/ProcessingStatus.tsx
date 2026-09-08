"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { CheckCircle2, Circle, LoaderCircle } from "lucide-react";

export interface ProcessingStatusProps {
  steps: string[];
  activeIndex: number;
  className?: string;
}

export function ProcessingStatus({ steps, activeIndex, className }: ProcessingStatusProps) {
  const allDone = activeIndex >= steps.length;

  return (
    <Card
      className={cn("mx-auto w-full max-w-2xl", className)}
      role="status"
      aria-live="polite"
    >
      <div className="p-5 sm:p-8">
        <div className="flex items-center gap-3">
          {!allDone ? (
            <LoaderCircle className="h-5 w-5 shrink-0 animate-spin text-primary" aria-hidden="true" />
          ) : (
            <CheckCircle2 className="h-5 w-5 shrink-0 text-success" aria-hidden="true" />
          )}
          <div>
            <h2 className="text-lg font-semibold text-text-primary">Finding suitable schemes</h2>
            <p className="text-sm text-text-secondary">
              {allDone ? "We found your recommendations." : "We're matching your answers to available schemes."}
            </p>
          </div>
        </div>

        <ul className="mt-6 space-y-3">
          {steps.map((label, index) => {
            const done = index < activeIndex || allDone;
            const active = !done && index === activeIndex;
            return (
              <li key={label} className="flex items-center gap-3">
                {done ? (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-success" aria-hidden="true" />
                ) : active ? (
                  <LoaderCircle className="h-5 w-5 shrink-0 animate-spin text-primary" aria-hidden="true" />
                ) : (
                  <Circle className="h-5 w-5 shrink-0 text-border" aria-hidden="true" />
                )}
                <span
                  className={cn(
                    "text-sm font-medium",
                    done ? "text-text-primary" : active ? "text-primary" : "text-text-secondary"
                  )}
                >
                  {label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </Card>
  );
}