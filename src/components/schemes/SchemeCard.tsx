"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight, IndianRupee, PiggyBank } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { Scheme } from "@/types/scheme";
import { formatIndianCompact } from "@/lib/utils";

export interface SchemeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  scheme: Scheme;
}

export function SchemeCard({ scheme, className, ...props }: SchemeCardProps) {
  return (
    <Card
      className={cn(
        "group flex h-full flex-col transition-all hover:border-primary/40",
        className
      )}
      {...props}
    >
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="secondary">{scheme.schemeType}</Badge>
          <Badge variant={scheme.purpose === "education" ? "info" : "success"}>
            {scheme.purpose === "education" ? "Education" : "Business"}
          </Badge>
        </div>

        <h3 className="mt-3 text-lg font-semibold text-text-primary">{scheme.name}</h3>

        {scheme.description && (
          <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-text-secondary">
            {scheme.description}
          </p>
        )}

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-[var(--radius-card)] bg-background p-3">
            <p className="flex items-center gap-1 text-xs text-text-secondary">
              <IndianRupee className="h-3.5 w-3.5" aria-hidden="true" />
              Maximum loan
            </p>
            <p className="mt-0.5 text-sm font-semibold text-text-primary">
              {formatIndianCompact(scheme.maxLoanAmount)}
            </p>
          </div>
          <div className="rounded-[var(--radius-card)] bg-background p-3">
            <p className="flex items-center gap-1 text-xs text-text-secondary">
              <PiggyBank className="h-3.5 w-3.5" aria-hidden="true" />
              Financing
            </p>
            <p className="mt-0.5 text-sm font-semibold text-text-primary">
              Up to {scheme.financingPercentage}%
            </p>
          </div>
        </div>

        {scheme.tags && scheme.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {scheme.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <Link
          href={`/results/scheme/${scheme.id}`}
          className="mt-5 inline-flex items-center text-sm font-medium text-primary hover:text-primary-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          View details
          <ArrowRight
            className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </Card>
  );
}