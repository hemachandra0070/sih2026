"use client";

import * as React from "react";
import { TranslationProvider } from "@/hooks/useTranslation";
import { AssessmentProvider } from "@/hooks/useAssessment";
import { TooltipProvider } from "@/components/ui/Tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TranslationProvider>
      <AssessmentProvider>
        <TooltipProvider delayDuration={200}>{children}</TooltipProvider>
      </AssessmentProvider>
    </TranslationProvider>
  );
}