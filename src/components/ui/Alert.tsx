"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive" | "success" | "warning" | "info";
  dismissible?: boolean;
  onDismiss?: () => void;
  title?: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", dismissible = false, onDismiss, title, children, ...props }, ref) => {
    const variants = {
      default: "bg-background border-border text-text-primary",
      destructive: "bg-error-bg border-error/30 text-error",
      success: "bg-success-bg border-success/30 text-success",
      warning: "bg-warning-bg border-warning/30 text-warning",
      info: "bg-info-bg border-info/30 text-info",
    };

    const icons = {
      default: <AlertCircle className="h-4 w-4" />,
      destructive: <AlertCircle className="h-4 w-4" />,
      success: <CheckCircle className="h-4 w-4" />,
      warning: <AlertTriangle className="h-4 w-4" />,
      info: <Info className="h-4 w-4" />,
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full rounded-[var(--radius-card)] border p-4 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-current",
          variants[variant],
          className
        )}
        role="alert"
        {...props}
      >
        <div className="flex">
          <div className="flex-shrink-0 mr-3">{icons[variant]}</div>
          <div className="flex-1">
            {title && <h5 className="mb-1 font-medium">{title}</h5>}
            <div className="text-sm [&_p]:leading-relaxed">{children}</div>
          </div>
          {dismissible && (
            <button
              type="button"
              className="flex-shrink-0 ml-4 rounded-md p-1 text-current opacity-50 hover:opacity-100 focus:opacity-100"
              onClick={onDismiss}
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    );
  }
);
Alert.displayName = "Alert";

export { Alert };