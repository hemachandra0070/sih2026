"use client";

import * as React from "react";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useAssessment } from "@/hooks/useAssessment";
import type { AssessmentState } from "@/types/assessment";
import { getRecommendations, type RecommendationRequest } from "@/lib/api/recommendations";
import type { Recommendation, RecommendationResponse } from "@/types/recommendation";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { Alert } from "@/components/ui/Alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/Accordion";
import { ProgressBar } from "@/components/ui/Progress";
import { Skeleton, SkeletonCard, SkeletonRecommendationCard } from "@/components/ui/Skeleton";
import { SourceBadge } from "@/components/recommendations/SourceBadge";
import {
  ArrowRight,
  Calculator,
  Check,
  ChevronRight,
  FileQuestion,
  LoaderCircle,
  MapPin,
  RefreshCw,
  SearchX,
  Sparkles,
} from "lucide-react";
import { formatIndianCompact } from "@/lib/utils";

type ResultsPhase = "loading" | "error" | "empty" | "ready";

const subscribe = () => () => void 0;

function useIsMounted() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}

function buildRequest(state: AssessmentState): RecommendationRequest {
  return {
    is_sc: state.isSC === true,
    annual_income: state.annualIncome ?? 0,
    purpose: (state.purpose ?? "business") as RecommendationRequest["purpose"],
    activity: state.activity ?? "tailoring",
    project_cost: state.projectCost ?? state.educationCost ?? 0,
    education_cost: state.educationCost ?? undefined,
    location: state.location
      ? { lat: state.location.lat, lng: state.location.lng }
      : { lat: 17.385, lng: 78.4867 },
  };
}

function getInitialPhase(): ResultsPhase {
  if (typeof window === "undefined") return "loading";
  const mode = new URLSearchParams(window.location.search).get("state");
  if (mode === "empty") return "empty";
  if (mode === "error") return "error";
  return "loading";
}

export default function ResultsPage() {
  const mounted = useIsMounted();
  const { state } = useAssessment();
  const [phase, setPhase] = useState<ResultsPhase>(getInitialPhase);
  const [data, setData] = useState<RecommendationResponse | null>(null);

  useEffect(() => {
    if (phase !== "loading") return;
    let cancelled = false;
    getRecommendations(buildRequest(state))
      .then((res) => {
        if (cancelled) return;
        if (res.recommendations.length === 0) {
          setPhase("empty");
          return;
        }
        setData(res);
        setPhase("ready");
      })
      .catch(() => {
        if (!cancelled) setPhase("error");
      });
    return () => {
      cancelled = true;
    };
  }, [phase, state]);

  const primary = data?.recommendations.find((r) => r.isPrimary) ?? data?.recommendations[0] ?? null;
  const alternatives = data?.recommendations.filter((r) => r !== primary) ?? [];

  if (!mounted) {
    return (
      <PageContainer maxWidth="lg">
        <PageHeader
          title="Your recommended schemes"
          subtitle="Based on the information you provided."
        />
        <LoadingState />
      </PageContainer>
    );
  }

  return (
    <PageContainer maxWidth="lg">
      <PageHeader
        title="Your recommended schemes"
        subtitle="Based on the information you provided."
      />

      {phase === "loading" && <LoadingState />}

      {phase === "error" && (
        <ErrorState onRetry={() => setPhase("loading")} />
      )}

      {phase === "empty" && <EmptyState />}

      {phase === "ready" && primary && (
        <div className="space-y-10">
          <PrimaryCard recommendation={primary} />
          {alternatives.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-text-primary">Other suitable options</h2>
              <p className="mt-1 text-sm text-text-secondary">
                A few more schemes that may also fit your needs.
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {alternatives.map((rec) => (
                  <AlternativeCard key={rec.schemeId} recommendation={rec} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </PageContainer>
  );
}

function LoadingState() {
  return (
    <div>
      <div className="mb-6 flex items-center gap-2 text-sm text-text-secondary">
        <LoaderCircle className="h-4 w-4 animate-spin text-primary" aria-hidden="true" />
        Finding suitable schemes…
      </div>
      <SkeletonRecommendationCard className="rounded-[var(--radius-card)] border border-border bg-surface" />
      <div className="mt-10">
        <Skeleton variant="text" className="h-6 w-56" />
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <SkeletonCard className="rounded-[var(--radius-card)] border border-border bg-surface" />
          <SkeletonCard className="rounded-[var(--radius-card)] border border-border bg-surface" />
        </div>
      </div>
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <Card>
      <CardContent className="p-6 sm:p-8">
        <Alert variant="destructive" title="We couldn't find your recommendations">
          <p>We weren&apos;t able to complete the assessment right now. You can try again or review your answers.</p>
        </Alert>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button onClick={onRetry}>
            <RefreshCw className="mr-2 h-4 w-4" aria-hidden="true" />
            Try again
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/assess">Review my answers</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyState() {
  return (
    <Card>
      <CardContent className="flex flex-col items-center py-12 text-center sm:py-16">
        <SearchX className="h-10 w-10 text-text-secondary" aria-hidden="true" />
        <h2 className="mt-4 text-lg font-semibold text-text-primary">
          We couldn&apos;t find a suitable match
        </h2>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-text-secondary">
          We couldn&apos;t find a scheme that fits your answers. You can review your answers or
          browse all available schemes.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/assess">Review my answers</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/schemes">Explore all schemes</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

const MATCH_FACTOR_LABELS: { key: keyof NonNullable<Recommendation["matchFactors"]>; label: string }[] = [
  { key: "eligibility", label: "Eligibility" },
  { key: "activityMatch", label: "Activity match" },
  { key: "financialFit", label: "Financial fit" },
  { key: "partnerAvailability", label: "Partner availability" },
];

function PrimaryCard({ recommendation }: { recommendation: Recommendation }) {
  const f = recommendation.financialFacts;
  return (
    <Card className="overflow-hidden border-2 border-accent">
      <div className="flex items-center justify-between gap-3 bg-accent px-5 py-3 sm:px-6">
        <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-white">
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          BEST MATCH
        </span>
        <span className="text-sm font-bold tracking-wide text-white">
          {recommendation.score}% MATCH
        </span>
      </div>

      <CardContent className="space-y-6 p-5 sm:p-8">
        <div>
          <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">
            {recommendation.schemeName}
          </h2>
          {recommendation.schemeType && (
            <p className="mt-1 text-text-secondary">{recommendation.schemeType}</p>
          )}
        </div>

        <div className="rounded-[var(--radius-card)] bg-background p-4 sm:p-5">
          <h4 className="text-sm font-semibold text-text-primary">Why this matches you</h4>
          <ul className="mt-3 space-y-2">
            {recommendation.reasons.map((reason) => (
              <li key={reason} className="flex items-start gap-2 text-sm text-text-secondary">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                {reason}
              </li>
            ))}
          </ul>
        </div>

        <Accordion type="single" collapsible>
          <AccordionItem value="explanation">
            <AccordionTrigger>Why was this recommended?</AccordionTrigger>
            <AccordionContent>
              <p className="pb-3 text-sm text-text-secondary">
                We matched you with this scheme because of the details below.
              </p>
              <ul className="space-y-2">
                {(recommendation.explanation ?? recommendation.reasons).map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-text-primary">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <FactTile label="Maximum loan" value={formatIndianCompact(f.maxLoan)} />
          <FactTile label="Financing" value={`Up to ${f.financingPercentage}%`} />
          <FactTile
            label="Interest"
            value={
              f.interestRateMin === f.interestRateMax
                ? `${f.interestRateMin}% p.a.`
                : `${f.interestRateMin}–${f.interestRateMax}% p.a.`
            }
          />
          <FactTile label="Repayment" value={`Up to ${f.repaymentYears} years`} />
        </div>

        {recommendation.matchFactors && (
          <div className="rounded-[var(--radius-card)] border border-border bg-background p-4 sm:p-5">
            <h4 className="text-sm font-semibold text-text-primary">Matching factors</h4>
            <div className="mt-4 space-y-3">
              {MATCH_FACTOR_LABELS.map(({ key, label }) => (
                <div key={key}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">{label}</span>
                    <span className="font-medium text-text-primary">
                      {recommendation.matchFactors?.[key]}%
                    </span>
                  </div>
                  <ProgressBar value={recommendation.matchFactors?.[key] ?? 0} className="mt-1.5" />
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-text-secondary">
              This is an internal recommendation score and guidance. It is not a loan approval or an
              officially guaranteed probability.
            </p>
          </div>
        )}

        <div>
          <SourceBadge source="official" />
        </div>

        <div className="flex flex-col gap-3">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href={`/results/scheme/${recommendation.schemeId}`}>
              View scheme
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="secondary" asChild className="w-full sm:flex-1">
              <Link href="/calculator">
                <Calculator className="mr-2 h-4 w-4" aria-hidden="true" />
                Calculate EMI
              </Link>
            </Button>
            <Button variant="secondary" asChild className="w-full sm:flex-1">
              <Link href="/partners">
                <MapPin className="mr-2 h-4 w-4" aria-hidden="true" />
                Find an authorized partner
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function FactTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[var(--radius-card)] bg-background p-3">
      <p className="text-xs text-text-secondary">{label}</p>
      <p className="mt-0.5 text-sm font-semibold text-text-primary">{value}</p>
    </div>
  );
}

function AlternativeCard({ recommendation }: { recommendation: Recommendation }) {
  const f = recommendation.financialFacts;
  return (
    <Card className="flex flex-col">
      <CardContent className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-semibold text-primary tracking-wide">
            {recommendation.score}% MATCH
          </span>
          <Badge variant="secondary">Alternative</Badge>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-card)] bg-accent/10 text-accent">
            <FileQuestion className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-lg font-semibold leading-tight text-text-primary">
              {recommendation.schemeName}
            </h3>
            {recommendation.schemeType && (
              <p className="text-sm text-text-secondary">{recommendation.schemeType}</p>
            )}
          </div>
        </div>
        <ul className="space-y-1.5">
          {recommendation.reasons.slice(0, 2).map((reason) => (
            <li key={reason} className="flex items-start gap-2 text-sm text-text-secondary">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
              {reason}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center justify-between gap-2 border-t border-border pt-4">
          <span className="hidden text-sm text-text-secondary sm:inline">
            Max loan{" "}
            <strong className="font-semibold text-text-primary">
              {formatIndianCompact(f.maxLoan)}
            </strong>
          </span>
          <Link
            href={`/results/scheme/${recommendation.schemeId}`}
            className="inline-flex items-center text-sm font-medium text-primary hover:text-primary-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            View scheme
            <ChevronRight className="ml-1 h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}