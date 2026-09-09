"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type {
  AssessmentAnswers,
  SupportedLanguage,
  QuestionDefinition,
} from "@/lib/assessment/schema";
import { getLocalized } from "@/lib/assessment/schema";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import {
  Edit3,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  Building2,
  GraduationCap,
  MapPin,
  IndianRupee,
  Users,
  Briefcase,
  Layers,
  HelpCircle,
} from "lucide-react";

export interface AssessmentReviewProps {
  answers: AssessmentAnswers;
  activeQuestions: QuestionDefinition[];
  language: SupportedLanguage;
  onEditQuestion: (questionId: string) => void;
  onSubmit: () => void;
  onReset: () => void;
  className?: string;
}

export function AssessmentReview({
  answers,
  activeQuestions,
  language,
  onEditQuestion,
  onSubmit,
  onReset,
  className,
}: AssessmentReviewProps) {
  // Helper to format answers into user-friendly localized text
  const formatAnswerText = (question: QuestionDefinition): string => {
    const val = answers[question.id];
    if (val === undefined || val === null || val === "") {
      return language === "hi" ? "छोड़ दिया" : language === "te" ? "దాటవేయబడింది" : "Skipped";
    }

    if (val === "unknown") {
      return language === "hi"
        ? "पक्का नहीं पता (मार्गदर्शन चाहिए)"
        : language === "te"
        ? "ఖచ్చితంగా తెలియదు"
        : "Not sure / exploring";
    }

    if (question.type === "currency") {
      if (typeof val === "number") {
        return `₹${new Intl.NumberFormat("en-IN").format(val)}`;
      }
      return String(val);
    }

    if (question.type === "location") {
      if (val && typeof val === "object" && val.address) {
        return val.address;
      }
      return language === "hi" ? "स्थान चुना गया" : language === "te" ? "ప్రాంతం ఎంచుకోబడింది" : "Location selected";
    }

    if (question.options) {
      const match = question.options.find((opt) => opt.value === val);
      if (match) {
        return getLocalized(match.label, language);
      }
    }

    if (val === "yes") {
      return language === "hi" ? "हाँ" : language === "te" ? "అవును" : "Yes";
    }
    if (val === "no") {
      return language === "hi" ? "नहीं" : language === "te" ? "కాదు" : "No";
    }

    return String(val);
  };

  const reviewHeading =
    language === "hi"
      ? "आइए आपके उत्तरों की जांच करें"
      : language === "te"
      ? "మీ సమాధానాలను సరిచూసుకోండి"
      : "Let's check your answers";

  const reviewSub =
    language === "hi"
      ? "योजनाएं खोजने से पहले यदि आप कुछ बदलना चाहते हैं, तो 'बदलें' बटन दबाएं।"
      : language === "te"
      ? "పథకాలను కనుగొనడానికి ముందు ఏవైనా మార్పులు చేయాలనుకుంటే, 'మార్చు' పై క్లిక్ చేయండి."
      : "Review the details you shared. You can change any answer before we find the best matching schemes.";

  const submitText =
    language === "hi"
      ? "मेरे लिए योजनाएं खोजें"
      : language === "te"
      ? "నా కోసం పథకాలను కనుగొనండి"
      : "Find schemes for me";

  return (
    <div className={cn("w-full max-w-2xl mx-auto space-y-6", className)}>
      {/* Header card */}
      <div className="rounded-[var(--radius-card)] border border-primary/20 bg-primary/[0.03] p-6 text-center sm:text-left sm:flex sm:items-center sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-2">
            <CheckCircle2 className="h-4 w-4" />
            <span>
              {language === "hi"
                ? "मूल्यांकन पूरा हुआ"
                : language === "te"
                ? "పూర్తయింది"
                : "Ready to match"}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-text-primary">{reviewHeading}</h2>
          <p className="mt-1 text-sm text-text-secondary leading-relaxed max-w-lg">
            {reviewSub}
          </p>
        </div>
      </div>

      {/* Answer list */}
      <div className="space-y-3">
        {activeQuestions.map((q, idx) => {
          const answerFormatted = formatAnswerText(q);
          const title = getLocalized(q.title, language);

          return (
            <div
              key={q.id}
              className="flex items-center justify-between gap-4 rounded-xl border border-border bg-surface p-4 transition-all hover:border-border-dark"
            >
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-text-secondary">
                  {idx + 1}. {title}
                </div>
                <div className="mt-1 text-base font-semibold text-text-primary truncate">
                  {answerFormatted}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onEditQuestion(q.id)}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-text-secondary transition-colors hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label={`Edit ${title}`}
              >
                <Edit3 className="h-3.5 w-3.5" />
                <span>{language === "hi" ? "बदलें" : language === "te" ? "మార్చు" : "Edit"}</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* CTA actions */}
      <div className="pt-4 flex flex-col sm:flex-row gap-3 items-center justify-between border-t border-border">
        <Button
          variant="secondary"
          onClick={onReset}
          className="w-full sm:w-auto"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          {language === "hi" ? "नए सिरे से शुरू करें" : language === "te" ? "మళ్లీ ప్రారంభించండి" : "Start over"}
        </Button>

        <Button
          onClick={onSubmit}
          size="lg"
          className="w-full sm:w-auto text-base font-bold shadow-md shadow-primary/20"
        >
          <Sparkles className="mr-2 h-5 w-5 animate-pulse" />
          {submitText}
        </Button>
      </div>
    </div>
  );
}
