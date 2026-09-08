"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Banknote } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export interface EMIResultCardProps extends React.HTMLAttributes<HTMLDivElement> {
  monthlyEMI: number;
  repaymentMonths: number;
  moratoriumMonths?: number;
}

export function EMIResultCard({
  monthlyEMI,
  repaymentMonths,
  moratoriumMonths = 0,
  className,
  ...props
}: EMIResultCardProps) {
  return (
    <Card className={cn("overflow-hidden border-accent/60", className)} {...props}>
      <div className="bg-primary px-6 py-4">
        <p className="flex items-center gap-2 text-sm font-medium text-white/85">
          <Banknote className="h-4 w-4" aria-hidden="true" />
          Estimated monthly EMI
        </p>
        <p className="mt-1 text-3xl font-bold text-white sm:text-4xl">
          {formatCurrency(monthlyEMI)}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2 px-6 py-4">
        <Badge variant="secondary">{repaymentMonths} monthly installments</Badge>
        {moratoriumMonths > 0 && (
          <Badge variant="outline">First payment after {moratoriumMonths} months</Badge>
        )}
      </div>
    </Card>
  );
}