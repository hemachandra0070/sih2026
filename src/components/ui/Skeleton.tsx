"use client";

import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular" | "card";
}

export function Skeleton({ className, variant = "text", ...props }: SkeletonProps) {
  const variants = {
    text: "h-4 w-full max-w-xs",
    circular: "h-10 w-10 rounded-full",
    rectangular: "h-12 w-24 rounded-[var(--radius-card)]",
    card: "h-32 w-full rounded-[var(--radius-card)]",
  };

  return (
    <div
      className={cn(
        "animate-pulse bg-background rounded-[var(--radius-input)]",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export function SkeletonCard({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("space-y-4 p-6", className)} {...props}>
      <Skeleton variant="rectangular" className="h-6 w-1/4" />
      <Skeleton variant="text" className="h-4 w-3/4" />
      <Skeleton variant="text" className="h-4 w-1/2" />
      <Skeleton variant="text" className="h-4 w-5/6" />
      <div className="flex gap-2">
        <Skeleton variant="circular" className="h-8 w-8" />
        <Skeleton variant="text" className="h-4 w-24 mt-1" />
      </div>
    </div>
  );
}

export function SkeletonPartnerCard({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("space-y-3 p-4", className)} {...props}>
      <div className="flex items-start gap-3">
        <Skeleton variant="circular" className="h-10 w-10" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" className="h-5 w-1/3" />
          <Skeleton variant="text" className="h-4 w-1/4" />
          <div className="flex gap-2">
            <Skeleton variant="text" className="h-5 w-20" />
            <Skeleton variant="text" className="h-5 w-24" />
          </div>
        </div>
      </div>
      <Skeleton variant="text" className="h-4 w-1/2" />
    </div>
  );
}

export function SkeletonRecommendationCard({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("space-y-4 p-6", className)} {...props}>
      <div className="flex items-center gap-2">
        <Skeleton variant="text" className="h-5 w-20" />
        <Skeleton variant="text" className="h-5 w-16" />
      </div>
      <Skeleton variant="text" className="h-6 w-1/3" />
      <div className="grid grid-cols-2 gap-4">
        <Skeleton variant="rectangular" className="h-20" />
        <Skeleton variant="rectangular" className="h-20" />
        <Skeleton variant="rectangular" className="h-20" />
        <Skeleton variant="rectangular" className="h-20" />
      </div>
      <Skeleton variant="text" className="h-4 w-full" />
      <Skeleton variant="text" className="h-4 w-3/4" />
      <Skeleton variant="text" className="h-4 w-1/2" />
    </div>
  );
}