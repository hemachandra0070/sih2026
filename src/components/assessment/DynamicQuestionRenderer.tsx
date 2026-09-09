"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type {
  QuestionDefinition,
  QuestionOption,
  SupportedLanguage,
} from "@/lib/assessment/schema";
import { getLocalized } from "@/lib/assessment/schema";
import { CurrencyInput } from "./CurrencyInput";
import { LocationInput } from "./LocationInput";
import { InfoPanel } from "@/components/ui/InfoPanel";
import {
  Store,
  TrendingUp,
  GraduationCap,
  Truck,
  HelpCircle,
  CheckCircle2,
  XCircle,
  HelpCircle as QuestionIcon,
  Search,
  Info,
  Check,
  Building2,
  Coins,
  Sparkles,
} from "lucide-react";

export interface DynamicQuestionRendererProps {
  question: QuestionDefinition;
  value: any;
  onChange: (value: any) => void;
  language: SupportedLanguage;
  error?: string | null;
  onClearError?: () => void;
  className?: string;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Store: <Store className="h-6 w-6" />,
  TrendingUp: <TrendingUp className="h-6 w-6" />,
  GraduationCap: <GraduationCap className="h-6 w-6" />,
  Truck: <Truck className="h-6 w-6" />,
  HelpCircle: <HelpCircle className="h-6 w-6" />,
  Building2: <Building2 className="h-6 w-6" />,
  Coins: <Coins className="h-6 w-6" />,
};

export function DynamicQuestionRenderer({
  question,
  value,
  onChange,
  language,
  error,
  onClearError,
  className,
}: DynamicQuestionRendererProps) {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSelect = (val: any) => {
    onChange(val);
    if (onClearError) onClearError();
  };

  const titleText = getLocalized(question.title, language);
  const subtitleText = getLocalized(question.subtitle, language);
  const helpText = getLocalized(question.helpText, language);
  const helpTitle = getLocalized(question.helpTitle, language) || (
    language === "hi"
      ? "हम यह क्यों पूछ रहे हैं?"
      : language === "te"
      ? "మేము దీనిని ఎందుకు అడుగుతున్నాము?"
      : "Why do we ask this?"
  );

  return (
    <div
      className={cn(
        "w-full rounded-[var(--radius-card)] border border-border bg-surface p-5 sm:p-8 shadow-sm transition-all",
        className
      )}
    >
      {/* Title & Subtitle */}
      <div className="space-y-1.5">
        <h2 className="text-xl font-bold text-text-primary sm:text-2xl leading-snug">
          {titleText}
        </h2>
        {subtitleText && (
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            {subtitleText}
          </p>
        )}
      </div>

      {/* Input Control by Type */}
      <div className="mt-6">
        {renderControlByType({
          question,
          value,
          handleSelect,
          language,
          searchQuery,
          setSearchQuery,
        })}
      </div>

      {/* Error display */}
      {error && (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-error/10 p-3 text-sm text-error" role="alert">
          <Info className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Rural-friendly Collapsible Explanation ("Why do we ask this?") */}
      {helpText && (
        <div className="mt-6 pt-4 border-t border-border/70">
          <InfoPanel title={helpTitle}>
            <p className="flex items-start gap-2 text-sm leading-relaxed text-text-secondary">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-info" aria-hidden="true" />
              <span>{helpText}</span>
            </p>
          </InfoPanel>
        </div>
      )}
    </div>
  );
}

interface ControlProps {
  question: QuestionDefinition;
  value: any;
  handleSelect: (val: any) => void;
  language: SupportedLanguage;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

function renderControlByType({
  question,
  value,
  handleSelect,
  language,
  searchQuery,
  setSearchQuery,
}: ControlProps) {
  switch (question.type) {
    case "single_select":
      return (
        <div className="grid gap-3 sm:grid-cols-1">
          {question.options?.map((option) => {
            const isSelected = value === option.value;
            const labelText = getLocalized(option.label, language);
            const descText = getLocalized(option.description, language);
            const iconNode = option.icon ? ICON_MAP[option.icon] : null;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={cn(
                  "relative flex w-full items-start gap-3.5 rounded-xl border-2 p-4 text-left transition-all",
                  isSelected
                    ? "border-primary bg-primary/[0.04] ring-1 ring-primary"
                    : "border-border bg-surface hover:border-primary/40 hover:bg-background"
                )}
              >
                {iconNode && (
                  <div
                    className={cn(
                      "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors",
                      isSelected ? "bg-primary text-white" : "bg-primary/10 text-primary"
                    )}
                  >
                    {iconNode}
                  </div>
                )}
                <div className="flex-1 pr-6">
                  <div className="text-base font-semibold text-text-primary">
                    {labelText}
                  </div>
                  {descText && (
                    <div className="mt-1 text-xs sm:text-sm text-text-secondary leading-relaxed">
                      {descText}
                    </div>
                  )}
                </div>
                <div
                  className={cn(
                    "absolute right-3.5 top-4 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all",
                    isSelected
                      ? "border-primary bg-primary text-white"
                      : "border-border bg-surface"
                  )}
                >
                  {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>
      );

    case "yes_no_unknown":
      return (
        <div className="grid gap-3 sm:grid-cols-3">
          {question.options?.map((option) => {
            const isSelected = value === option.value;
            const labelText = getLocalized(option.label, language);
            const descText = getLocalized(option.description, language);

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={cn(
                  "flex flex-col items-center justify-center rounded-xl border-2 p-4 text-center transition-all min-h-[96px]",
                  isSelected
                    ? "border-primary bg-primary/[0.05] ring-2 ring-primary"
                    : "border-border bg-surface hover:border-primary/40 hover:bg-background"
                )}
              >
                <div className="mb-1 text-lg font-bold text-text-primary">
                  {labelText}
                </div>
                {descText && (
                  <span className="text-xs text-text-secondary leading-tight">
                    {descText}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      );

    case "income_range":
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          {question.options?.map((option) => {
            const isSelected = value === option.value;
            const labelText = getLocalized(option.label, language);
            const descText = getLocalized(option.description, language);
            const isUnknown = option.value === "unknown";

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={cn(
                  "relative flex flex-col items-start rounded-xl border-2 p-4 text-left transition-all",
                  isUnknown && "sm:col-span-2 border-dashed bg-background/50",
                  isSelected
                    ? "border-primary bg-primary/[0.05] ring-1 ring-primary"
                    : "border-border bg-surface hover:border-primary/40 hover:bg-background"
                )}
              >
                <div className="flex w-full items-center justify-between">
                  <span className="text-base font-bold text-text-primary">
                    {labelText}
                  </span>
                  <div
                    className={cn(
                      "flex h-5 w-5 items-center justify-center rounded-full border-2",
                      isSelected
                        ? "border-primary bg-primary text-white"
                        : "border-border bg-surface"
                    )}
                  >
                    {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                  </div>
                </div>
                {descText && (
                  <span className="mt-1 text-xs text-text-secondary">
                    {descText}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      );

    case "search_select": {
      const q = searchQuery.toLowerCase().trim();
      const filtered = (question.options || []).filter((opt) => {
        if (!q) return true;
        const l = getLocalized(opt.label, language).toLowerCase();
        const d = getLocalized(opt.description, language).toLowerCase();
        return l.includes(q) || d.includes(q);
      });

      return (
        <div className="space-y-3">
          {/* Search box */}
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                getLocalized(question.placeholder, language) || "Type to search options..."
              }
              className="flex h-11 w-full rounded-lg border border-border bg-surface pl-9 pr-3 text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-text-secondary hover:text-text-primary"
              >
                Clear
              </button>
            )}
          </div>

          {/* List of options */}
          <div className="grid max-h-80 gap-2.5 overflow-y-auto pr-1 sm:grid-cols-1">
            {filtered.map((option) => {
              const isSelected = value === option.value;
              const labelText = getLocalized(option.label, language);
              const descText = getLocalized(option.description, language);

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={cn(
                    "flex w-full items-start justify-between rounded-xl border-2 p-3.5 text-left transition-all",
                    isSelected
                      ? "border-primary bg-primary/[0.05] ring-1 ring-primary"
                      : "border-border bg-surface hover:border-primary/40 hover:bg-background"
                  )}
                >
                  <div className="flex-1 pr-3">
                    <div className="text-sm sm:text-base font-semibold text-text-primary">
                      {labelText}
                    </div>
                    {descText && (
                      <div className="mt-0.5 text-xs text-text-secondary leading-snug">
                        {descText}
                      </div>
                    )}
                  </div>
                  <div
                    className={cn(
                      "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                      isSelected
                        ? "border-primary bg-primary text-white"
                        : "border-border bg-surface"
                    )}
                  >
                    {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
            {filtered.length === 0 && (
              <div className="p-4 text-center text-sm text-text-secondary">
                No matching option found. Try a different keyword or choose &quot;Other&quot;.
              </div>
            )}
          </div>
        </div>
      );
    }

    case "currency": {
      const isUnknown = value === "unknown";
      const numericValue = typeof value === "number" ? value : null;

      return (
        <div className="space-y-4">
          <CurrencyInput
            value={numericValue}
            onChange={(num) => handleSelect(num)}
            placeholder={
              getLocalized(question.placeholder, language) || "e.g. 1,40,000"
            }
            suggestions={question.suggestions || [50000, 140000, 500000, 1500000]}
          />

          {question.allowUnknown && (
            <div className="pt-2">
              <button
                type="button"
                onClick={() => handleSelect("unknown")}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl border-2 border-dashed p-3.5 text-left transition-all",
                  isUnknown
                    ? "border-primary bg-primary/[0.05] text-primary"
                    : "border-border bg-surface text-text-secondary hover:border-primary/40 hover:text-text-primary"
                )}
              >
                <span className="text-sm font-medium">
                  {getLocalized(question.unknownLabel, language) ||
                    (language === "hi"
                      ? "मुझे सटीक राशि का पता नहीं है"
                      : language === "te"
                      ? "నాకు ఖచ్చితమైన మొత్తం తెలియదు"
                      : "I'm not sure about the exact amount")}
                </span>
                <span className="rounded-md bg-background px-2 py-0.5 text-xs font-semibold">
                  {isUnknown ? "Selected" : "Pick this"}
                </span>
              </button>
            </div>
          )}
        </div>
      );
    }

    case "location":
      return (
        <LocationInput
          value={value || null}
          onChange={(loc) => handleSelect(loc)}
        />
      );

    case "text":
      return (
        <div>
          <input
            type="text"
            value={value || ""}
            onChange={(e) => handleSelect(e.target.value)}
            placeholder={
              getLocalized(question.placeholder, language) || "Type your answer here..."
            }
            className="flex h-12 w-full rounded-xl border-2 border-border bg-surface px-4 text-base text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      );

    default:
      return null;
  }
}
