"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useAssessment } from "@/hooks/useAssessment";
import {
  DynamicQuestionRenderer,
  SmartProgress,
  AssessmentReview,
  ProcessingStatus,
} from "@/components/assessment";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import {
  getRecommendations,
  mapAnswersToRecommendationRequest,
} from "@/lib/api/recommendations";
import { PageContainer } from "@/components/layout/PageContainer";
import { ProgressBar } from "@/components/ui/Progress";

const PROCESSING_STEPS = [
  "Understanding your requirements",
  "Checking eligibility",
  "Matching schemes",
  "Calculating financing",
  "Finding nearby partners",
];

const subscribe = () => () => void 0;

function useIsMounted() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}

export default function AssessPage() {
  const router = useRouter();
  const mounted = useIsMounted();
  const {
    state,
    activeQuestions,
    currentQuestionIndex,
    totalQuestions,
    currentQuestion,
    setAnswer,
    nextQuestion,
    prevQuestion,
    jumpToQuestion,
    enterReview,
    exitReview,
    setLanguage,
    reset,
  } = useAssessment();

  const [error, setError] = useState<string | null>(null);
  const [phase, setPhase] = useState<"questions" | "processing">("questions");
  const [statusIndex, setStatusIndex] = useState(0);

  // Animate processing steps
  useEffect(() => {
    if (phase !== "processing") return;
    const id = window.setInterval(() => {
      setStatusIndex((i) => Math.min(i + 1, PROCESSING_STEPS.length));
    }, 750);
    return () => window.clearInterval(id);
  }, [phase]);

  // When processing completes, request recommendations and redirect to /results
  useEffect(() => {
    if (phase !== "processing" || statusIndex < PROCESSING_STEPS.length) return;
    let cancelled = false;

    const request = mapAnswersToRecommendationRequest(state.answers);

    getRecommendations(request)
      .catch(() => null)
      .then(() => {
        if (!cancelled) router.push("/results");
      });

    return () => {
      cancelled = true;
    };
  }, [phase, statusIndex, router, state.answers]);

  const currentVal = currentQuestion ? state.answers[currentQuestion.id] : undefined;

  // Validation function for the current question
  const validateCurrent = (): string | null => {
    if (!currentQuestion || !currentQuestion.required) return null;

    const val = state.answers[currentQuestion.id];
    const lang = state.language;

    if (val === undefined || val === null || val === "") {
      if (lang === "hi") {
        return "कृपया आगे बढ़ने के लिए कोई विकल्प चुनें या 'मुझे पक्का नहीं पता' चुनें।";
      }
      if (lang === "te") {
        return "ముందుకు సాగడానికి దయచేసి ఒక ఎంపికను ఎంచుకోండి లేదా 'నాకు తెలియదు' ఎంచుకోండి.";
      }
      return "Please select an option or choose 'I don't know' to continue.";
    }

    if (currentQuestion.type === "currency" && val !== "unknown") {
      if (typeof val === "number" && val <= 0) {
        return lang === "hi"
          ? "कृपया 0 से अधिक राशि दर्ज करें या 'मुझे पक्का नहीं पता' चुनें।"
          : lang === "te"
          ? "దయచేసి సరైన మొత్తాన్ని నమోదు చేయండి."
          : "Please enter a valid amount or select 'I'm not sure'.";
      }
    }

    return null;
  };

  const handleBack = () => {
    setError(null);
    if (state.inReview) {
      exitReview();
      return;
    }
    if (currentQuestionIndex > 0) {
      prevQuestion();
    } else {
      router.push("/");
    }
  };

  const handleContinue = () => {
    const err = validateCurrent();
    if (err) {
      setError(err);
      return;
    }
    setError(null);

    if (currentQuestionIndex >= totalQuestions - 1) {
      enterReview();
    } else {
      nextQuestion();
    }
  };

  const handleStartMatching = () => {
    setStatusIndex(0);
    setPhase("processing");
  };

  const handleRestart = () => {
    reset();
    setError(null);
    setPhase("questions");
    setStatusIndex(0);
  };

  if (!mounted) {
    return (
      <PageContainer maxWidth="lg">
        <div className="mx-auto w-full max-w-2xl pt-6">
          <ProgressBar value={15} />
          <div className="mt-6 rounded-[var(--radius-card)] border border-border bg-surface p-6 sm:p-8">
            <span className="text-sm font-medium text-text-secondary">Loading questions…</span>
          </div>
        </div>
      </PageContainer>
    );
  }

  if (phase === "processing") {
    return (
      <PageContainer maxWidth="lg">
        <div className="pt-8 sm:pt-14">
          <ProcessingStatus steps={PROCESSING_STEPS} activeIndex={statusIndex} />
          <div className="mx-auto mt-8 w-full max-w-2xl text-center">
            <button
              type="button"
              onClick={handleRestart}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Start a fresh assessment
            </button>
          </div>
        </div>
      </PageContainer>
    );
  }

  // Review screen
  if (state.inReview) {
    return (
      <PageContainer maxWidth="lg">
        <div className="pt-2 pb-12">
          <AssessmentReview
            answers={state.answers}
            activeQuestions={activeQuestions}
            language={state.language}
            onEditQuestion={(qid) => jumpToQuestion(qid)}
            onSubmit={handleStartMatching}
            onReset={handleRestart}
          />
        </div>
      </PageContainer>
    );
  }

  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const hasMultipleAnswers = Object.keys(state.answers).length >= 2;

  return (
    <PageContainer maxWidth="lg">
      <div className="mx-auto w-full max-w-2xl pt-2 pb-12">
        {/* Smart progress with category and language switcher */}
        <div className="mb-6">
          <SmartProgress
            currentIndex={currentQuestionIndex}
            total={totalQuestions}
            category={currentQuestion?.category || "intent"}
            language={state.language}
            onLanguageChange={(lang) => setLanguage(lang)}
            onOpenReview={enterReview}
            canReview={hasMultipleAnswers}
          />
        </div>

        {/* Dynamic question card */}
        {currentQuestion && (
          <DynamicQuestionRenderer
            question={currentQuestion}
            value={currentVal}
            onChange={(val) => {
              setAnswer(currentQuestion.id, val);
              setError(null);
            }}
            language={state.language}
            error={error}
            onClearError={() => setError(null)}
          />
        )}

        {/* Action navigation */}
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button
            variant="secondary"
            onClick={handleBack}
            className="w-full sm:w-auto"
            aria-label="Previous question"
          >
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
            {state.language === "hi" ? "पीछे" : state.language === "te" ? "వెనుకకు" : "Back"}
          </Button>

          <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
            {/* If question is optional, allow skipping */}
            {!currentQuestion?.required && (
              <Button
                variant="ghost"
                onClick={() => {
                  setError(null);
                  if (isLastQuestion) enterReview();
                  else nextQuestion();
                }}
                className="text-text-secondary hover:text-text-primary"
              >
                {state.language === "hi" ? "छोड़ें" : state.language === "te" ? "దాటవేయి" : "Skip"}
              </Button>
            )}

            <Button
              onClick={handleContinue}
              className="w-full sm:w-auto font-semibold shadow-sm"
            >
              {isLastQuestion
                ? state.language === "hi"
                  ? "सत्यापन करें"
                  : state.language === "te"
                  ? "సరిచూసుకోండి"
                  : "Review answers"
                : state.language === "hi"
                ? "आगे बढ़ें"
                : state.language === "te"
                ? "కొనసాగించండి"
                : "Continue"}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}