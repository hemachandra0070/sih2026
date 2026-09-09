"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ProgressBar } from "@/components/ui/Progress";
import type { SupportedLanguage } from "@/lib/assessment/schema";
import { Languages, CheckCircle2, ListChecks } from "lucide-react";

export interface SmartProgressProps {
  currentIndex: number;
  total: number;
  category?: string;
  language: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onOpenReview?: () => void;
  canReview?: boolean;
  className?: string;
}

const CATEGORY_NAMES: Record<string, { en: string; hi: string; te: string }> = {
  intent: {
    en: "Your Goal",
    hi: "आपका उद्देश्य",
    te: "మీ ఉద్దేశం",
  },
  profile: {
    en: "Community & Background",
    hi: "समुदाय और पृष्ठभूमि",
    te: "వర్గం & నేపథ్యం",
  },
  activity: {
    en: "Work & Activity",
    hi: "काम और व्यवसाय",
    te: "పని & వ్యాపారం",
  },
  finance: {
    en: "Financing & Income",
    hi: "ऋण आवश्यकता और आय",
    te: "ఆర్థిక అవసరాలు & ఆదాయం",
  },
  assets: {
    en: "Assets & Facilities",
    hi: "सम्पत्ति और साधन",
    te: "ఆస్తులు & సాధనాలు",
  },
  loans: {
    en: "Existing Commitments",
    hi: "मौजूदा ऋण",
    te: "ప్రస్తుత రుణాలు",
  },
  location: {
    en: "Your Location",
    hi: "आपका स्थान",
    te: "మీ ప్రాంతం",
  },
};

const LANGUAGES: { code: SupportedLanguage; label: string; native: string }[] = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "te", label: "Telugu", native: "తెలుగు" },
];

export function SmartProgress({
  currentIndex,
  total,
  category = "intent",
  language,
  onLanguageChange,
  onOpenReview,
  canReview = false,
  className,
}: SmartProgressProps) {
  const percentage = total > 0 ? Math.min(100, Math.round(((currentIndex + 1) / total) * 100)) : 0;
  const categoryInfo = CATEGORY_NAMES[category] || CATEGORY_NAMES.intent;
  const categoryLabel = categoryInfo[language] || categoryInfo.en;

  return (
    <div className={cn("w-full space-y-3", className)}>
      {/* Top row: Category tag + Language selector + Review shortcut */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            {categoryLabel}
          </span>
          <span className="text-xs font-medium text-text-secondary">
            Question {currentIndex + 1} of {total}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {canReview && onOpenReview && (
            <button
              type="button"
              onClick={onOpenReview}
              className="inline-flex items-center gap-1 text-xs font-medium text-text-secondary hover:text-primary transition-colors px-2 py-1 rounded-md hover:bg-surface border border-transparent hover:border-border"
              title="Review answers"
            >
              <ListChecks className="h-3.5 w-3.5 text-primary" />
              <span>Review answers</span>
            </button>
          )}

          {/* Language Switcher Pills */}
          <div className="inline-flex items-center rounded-lg border border-border bg-surface p-0.5 text-xs">
            <Languages className="ml-1.5 mr-1 h-3.5 w-3.5 text-text-secondary" aria-hidden="true" />
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => onLanguageChange(lang.code)}
                className={cn(
                  "rounded-md px-2 py-0.5 font-medium transition-all",
                  language === lang.code
                    ? "bg-primary text-white shadow-sm"
                    : "text-text-secondary hover:text-text-primary"
                )}
                aria-pressed={language === lang.code}
              >
                {lang.native}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-1">
        <ProgressBar value={percentage} className="h-2" />
        <div className="flex justify-between text-[11px] text-text-secondary">
          <span>{percentage < 100 ? `${percentage}% completed` : "Ready for review"}</span>
          <span>{total - currentIndex - 1 > 0 ? `${total - currentIndex - 1} questions remaining` : "Final question"}</span>
        </div>
      </div>
    </div>
  );
}
