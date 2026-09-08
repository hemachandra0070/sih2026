"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";

export interface FinancialFactItem {
  label: string;
  value: string;
  hint?: string;
  highlight?: boolean;
}

export interface FinancialSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  items: FinancialFactItem[];
  title?: string;
  description?: string;
}

export function FinancialSummary({ items, title = "Financial details", description, className, ...props }: FinancialSummaryProps) {
  return (
    <Card className={cn("w-full", className)} {...props}>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {items.map((item, index) => (
            <div
              key={index}
              className={cn(
                "rounded-[var(--radius-card)] border p-3",
                item.highlight && "border-accent/40 bg-accent-light",
                !item.highlight && "border-border bg-background"
              )}
            >
              <dt className="text-xs font-medium text-text-secondary">{item.label}</dt>
              <dd className="mt-0.5 text-lg font-semibold text-text-primary">{item.value}</dd>
              {item.hint && <dd className="mt-0.5 text-xs text-text-secondary">{item.hint}</dd>}
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}