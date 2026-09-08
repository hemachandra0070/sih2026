import * as React from "react";
import { cn } from "@/lib/utils";

export interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full";
}

const maxWidths = {
  sm: "max-w-2xl",
  md: "max-w-3xl",
  lg: "max-w-4xl",
  xl: "max-w-7xl",
  full: "max-w-none",
};

export function PageContainer({
  className,
  maxWidth = "lg",
  children,
  ...props
}: PageContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-4 py-6 sm:px-6 lg:px-8", maxWidths[maxWidth], className)} {...props}>
      {children}
    </div>
  );
}