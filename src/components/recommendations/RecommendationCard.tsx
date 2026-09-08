"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import type { Recommendation } from "@/types/recommendation";
import { formatCurrency } from "@/lib/utils";

export interface RecommendationCardProps extends React.HTMLAttributes<HTMLDivElement> {
  recommendation: Recommendation;
  isPrimary?: boolean;
}

export function RecommendationCard({
  recommendation,
  isPrimary = false,
  className,
  ...props
}: RecommendationCardProps) {
  const { schemeName, score, reasons = [], financialFacts, schemeId } = recommendation;

  return (
    <Card
      className={cn(
        "relative overflow-hidden",
        isPrimary && "border-2 border-accent",
        className
      )}
      {...props}
    >
      {isPrimary && (
        <div className="absolute top-0 right-0">
          <span className="inline-flex items-center gap-1 bg-accent px-3 py-1 text-xs font-semibold text-white">
            <Sparkles className="h-3 w-3" aria-hidden="true" />
            BEST MATCH
          </span>
        </div>
      )}

      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <Badge variant={isPrimary ? "default" : "secondary"}>
            {isPrimary ? "Primary recommendation" : "Alternative"}
          </Badge>
          <span className="text-sm font-semibold text-primary">{score}% match</span>
        </div>
        <CardTitle className="text-2xl">{schemeName}</CardTitle>
        <CardDescription>Business financing</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {reasons.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-text-primary">Why this matches</h4>
            <ul className="space-y-1.5">
              {reasons.map((reason, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-text-secondary">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        )}

        {financialFacts && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-[var(--radius-card)] bg-background p-3">
              <p className="text-xs text-text-secondary">Max loan</p>
              <p className="mt-0.5 text-sm font-semibold text-text-primary">
                {formatCurrency(financialFacts.maxLoan).replace(/^.+?(\d)/, "₹$1")}
              </p>
            </div>
            <div className="rounded-[var(--radius-card)] bg-background p-3">
              <p className="text-xs text-text-secondary">Financing</p>
              <p className="mt-0.5 text-sm font-semibold text-text-primary">
                Up to {financialFacts.financingPercentage}%
              </p>
            </div>
            <div className="rounded-[var(--radius-card)] bg-background p-3">
              <p className="text-xs text-text-secondary">Interest</p>
              <p className="mt-0.5 text-sm font-semibold text-text-primary">
                {financialFacts.interestRateMin}–{financialFacts.interestRateMax}%
              </p>
            </div>
            <div className="rounded-[var(--radius-card)] bg-background p-3">
              <p className="text-xs text-text-secondary">Repayment</p>
              <p className="mt-0.5 text-sm font-semibold text-text-primary">
                Up to {financialFacts.repaymentYears} years
              </p>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-wrap gap-2">
        <Link href={`/results/scheme/${schemeId}`} className="inline-flex items-center text-sm font-medium text-primary hover:text-primary-dark">
          View scheme <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
        </Link>
        <Link href="/calculator" className="inline-flex items-center text-sm font-medium text-text-secondary hover:text-text-primary">
          Calculate EMI
        </Link>
        <Link href="/partners" className="inline-flex items-center text-sm font-medium text-text-secondary hover:text-text-primary">
          Find a partner
        </Link>
      </CardFooter>
    </Card>
  );
}