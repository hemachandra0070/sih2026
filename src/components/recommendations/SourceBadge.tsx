"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Info, ShieldCheck, Database } from "lucide-react";
import type { RecommendationSource } from "@/types/recommendation";

export interface SourceBadgeProps {
  source: RecommendationSource;
  details?: string;
  className?: string;
}

const sourceConfig: Record<RecommendationSource, { label: string; className: string; icon: React.ReactNode }> = {
  official: {
    label: "Official scheme information",
    className: "bg-success-bg text-success border-success/20",
    icon: <ShieldCheck className="h-3 w-3" aria-hidden="true" />,
  },
  estimate: {
    label: "Estimated calculation",
    className: "bg-warning-bg text-warning border-warning/20",
    icon: <Database className="h-3 w-3" aria-hidden="true" />,
  },
  unavailable: {
    label: "Information unavailable",
    className: "bg-warning-bg text-warning border-warning/20",
    icon: <Info className="h-3 w-3" aria-hidden="true" />,
  },
};

export function SourceBadge({ source, details, className }: SourceBadgeProps) {
  const config = sourceConfig[source];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        config.className,
        className
      )}
    >
      {config.icon}
      {config.label}
      {details && <span className="text-text-secondary">· {details}</span>}
    </span>
  );
}