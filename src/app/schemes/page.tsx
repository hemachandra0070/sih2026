"use client";

import * as React from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { SchemeCard } from "@/components/schemes/SchemeCard";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/Sheet";
import { getSchemes } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { Scheme } from "@/types/scheme";

const FILTERS = [
  { value: "all", label: "All" },
  { value: "business", label: "Business" },
  { value: "education", label: "Education" },
  { value: "micro", label: "Micro" },
  { value: "term-loan", label: "Term Loan" },
] as const;

type FilterValue = (typeof FILTERS)[number]["value"];

function matchesFilter(scheme: Scheme, filter: FilterValue): boolean {
  switch (filter) {
    case "business":
      return scheme.purpose === "business" || scheme.purpose === "both";
    case "education":
      return scheme.purpose === "education" || scheme.purpose === "both";
    case "micro":
      return scheme.schemeType.toLowerCase().includes("micro");
    case "term-loan":
      return scheme.schemeType.toLowerCase().includes("term loan");
    default:
      return true;
  }
}

function matchesQuery(scheme: Scheme, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack = [
    scheme.name,
    scheme.schemeType,
    scheme.description ?? "",
    scheme.tags?.join(" ") ?? "",
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(q);
}

export default function SchemesPage() {
  const [schemes, setSchemes] = React.useState<Scheme[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [query, setQuery] = React.useState("");
  const [filter, setFilter] = React.useState<FilterValue>("all");

  React.useEffect(() => {
    let active = true;
    getSchemes().then((list) => {
      if (active) {
        setSchemes(list);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const filtered = React.useMemo(
    () => schemes.filter((scheme) => matchesFilter(scheme, filter) && matchesQuery(scheme, query)),
    [schemes, filter, query]
  );

  const activeFilterLabel = FILTERS.find((f) => f.value === filter)?.label ?? "All";

  return (
    <PageContainer maxWidth="lg">
      <PageHeader
        title="Explore schemes"
        subtitle="Find schemes by purpose, type or need."
      />

      <div className="mb-6 space-y-4">
        <div className="relative max-w-xl">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary"
            aria-hidden="true"
          />
          <Input
            type="search"
            placeholder="Search schemes..."
            aria-label="Search schemes"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="pl-10"
          />
        </div>

        <div className="hidden flex-wrap items-center gap-2 sm:flex" aria-label="Filter by category">
          {FILTERS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setFilter(option.value)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                filter === option.value
                  ? "border-transparent bg-primary text-white"
                  : "border-border bg-surface text-text-secondary hover:border-primary/40 hover:text-primary"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="sm:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="mr-2 h-4 w-4" aria-hidden="true" />
                Filter: {activeFilterLabel}
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom">
              <SheetHeader>
                <SheetTitle>Filter schemes</SheetTitle>
                <SheetDescription>Choose a category to filter the scheme list.</SheetDescription>
              </SheetHeader>
              <div className="mt-4 space-y-2">
                {FILTERS.map((option) => (
                  <SheetClose asChild key={option.value}>
                    <button
                      type="button"
                      onClick={() => setFilter(option.value)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-[var(--radius-input)] border px-4 py-3 text-left text-sm font-medium transition-colors",
                        filter === option.value
                          ? "border-transparent bg-primary text-white"
                          : "border-border bg-background text-text-primary hover:border-primary/40"
                      )}
                    >
                      {option.label}
                      {filter === option.value && <X className="h-4 w-4" aria-hidden="true" />}
                    </button>
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {loading && schemes.length === 0 ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" aria-label="Loading schemes">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} variant="card" className="h-64" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-[var(--radius-card)] border border-border bg-surface p-10 text-center">
          <p className="text-base font-medium text-text-primary">No schemes found</p>
          <p className="mt-1 text-sm text-text-secondary">
            Try a different search term or filter.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </div>
      )}
    </PageContainer>
  );
}