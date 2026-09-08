"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "error" | "info" | "outline";
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default: "bg-primary text-white",
      secondary: "bg-background text-text-secondary border border-border",
      success: "bg-success-bg text-success border border-success/20",
      warning: "bg-warning-bg text-warning border border-warning/20",
      error: "bg-error-bg text-error border border-error/20",
      info: "bg-info-bg text-info border border-info/20",
      outline: "border border-border text-text-secondary",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-[var(--radius-badge)] px-2.5 py-0.5 text-xs font-medium transition-colors",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

export { Badge };