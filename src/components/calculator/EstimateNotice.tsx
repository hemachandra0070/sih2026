"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, Info } from "lucide-react";

export interface EstimateNoticeProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string;
  variant?: "estimate" | "info";
}

export function EstimateNotice({
  message,
  variant = "estimate",
  className,
  ...props
}: EstimateNoticeProps) {
  const defaultMessage =
    "This is an estimate based on the selected scheme parameters. Final terms may depend on the authorized channel partner.";

  return (
    <div
      role="note"
      className={cn(
        "flex items-start gap-2.5 rounded-[var(--radius-card)] border p-3 text-sm",
        variant === "estimate" && "border-warning/30 bg-warning-bg text-warning",
        variant === "info" && "border-info/30 bg-info-bg text-info",
        className
      )}
      {...props}
    >
      {variant === "estimate" ? (
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      ) : (
        <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      )}
      <div>
        <p className="font-medium">Estimated calculation</p>
        <p className="mt-0.5 text-sm leading-relaxed">{message || defaultMessage}</p>
      </div>
    </div>
  );
}