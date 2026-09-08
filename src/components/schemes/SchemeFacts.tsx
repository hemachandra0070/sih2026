"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { Scheme } from "@/types/scheme";
import { formatIndianCompact } from "@/lib/utils";

export interface SchemeFactsProps extends React.HTMLAttributes<HTMLDivElement> {
  scheme: Scheme;
  title?: string;
}

interface Fact {
  label: string;
  value: string;
}

function buildFacts(scheme: Scheme): Fact[] {
  return [
    { label: "Maximum loan", value: formatIndianCompact(scheme.maxLoanAmount) },
    { label: "Financing", value: `Up to ${scheme.financingPercentage}%` },
    {
      label: "Interest",
      value: `${scheme.interestRateMin}–${scheme.interestRateMax}%`,
    },
    { label: "Repayment", value: `Up to ${scheme.repaymentPeriod} years` },
    {
      label: "Moratorium",
      value: scheme.moratoriumPeriod > 0 ? `${scheme.moratoriumPeriod} months` : "None",
    },
  ];
}

export function SchemeFacts({ scheme, title, className, ...props }: SchemeFactsProps) {
  const facts = buildFacts(scheme);

  return (
    <div className={cn("w-full", className)} {...props}>
      {title && (
        <h2 className="mb-4 text-lg font-semibold text-text-primary sm:text-xl">{title}</h2>
      )}
      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {facts.map((fact) => (
          <div
            key={fact.label}
            className="rounded-[var(--radius-card)] border border-border bg-background p-3"
          >
            <dt className="text-xs text-text-secondary">{fact.label}</dt>
            <dd className="mt-0.5 text-sm font-semibold text-text-primary">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}