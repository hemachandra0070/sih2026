import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Star } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { BackLink } from "@/components/layout/BackLink";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { SourceBadge } from "@/components/recommendations/SourceBadge";
import { SchemeFacts } from "@/components/schemes/SchemeFacts";
import { DocumentChecklist } from "@/components/schemes/DocumentChecklist";
import { getSchemeById } from "@/lib/api/schemes";
import { getSchemeDetailById } from "@/lib/mock/scheme-details";

interface SchemeDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function SchemeDetailPage({ params }: SchemeDetailPageProps) {
  const { id } = await params;
  const scheme = await getSchemeById(id);

  if (!scheme) {
    notFound();
  }

  const detail = getSchemeDetailById(scheme.schemeId || scheme.id);

  return (
    <PageContainer maxWidth="lg">
      <BackLink href="/results" label="Back to recommendations" />

      <PageHeader
        badge={
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="success">
              <Star className="mr-1 h-3 w-3 fill-current" aria-hidden="true" />
              Best match
            </Badge>
            <SourceBadge source="official" />
          </div>
        }
        title={`${scheme.name} · ${scheme.schemeType}`}
        subtitle="Understand the scheme's financials, eligibility and documents before you apply."
      />

      <div className="space-y-8">
        {detail && (
          <section>
            <h2 className="mb-3 text-lg font-semibold text-text-primary sm:text-xl">
              About this scheme
            </h2>
            <p className="leading-relaxed text-text-primary">{detail.description}</p>
          </section>
        )}

        <section>
          <SchemeFacts scheme={scheme} title="Financial details" />
        </section>

        {detail && detail.eligibility.length > 0 && (
          <section>
            <h2 className="mb-4 text-lg font-semibold text-text-primary sm:text-xl">
              Eligibility
            </h2>
            <Card>
              <CardContent className="p-4">
                <ul className="space-y-3">
                  {detail.eligibility.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 rounded-[var(--radius-input)] bg-success-bg p-1 text-success">
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                      <span className="text-sm leading-relaxed text-text-primary">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>
        )}

        {detail && detail.documents.length > 0 && (
          <section>
            <DocumentChecklist
              documents={detail.documents}
              title="Documents required"
            />
          </section>
        )}

        {detail && detail.howToApply.length > 0 && (
          <section>
            <h2 className="mb-4 text-lg font-semibold text-text-primary sm:text-xl">
              How to apply
            </h2>
            <ol className="space-y-4">
              {detail.howToApply.map((step, index) => (
                <li key={step} className="flex items-start gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <p className="pt-0.5 text-sm leading-relaxed text-text-primary">{step}</p>
                </li>
              ))}
            </ol>
          </section>
        )}

        {detail && detail.sources.length > 0 && (
          <section>
            <h2 className="mb-4 text-lg font-semibold text-text-primary sm:text-xl">Sources</h2>
            <ul className="space-y-2">
              {detail.sources.map((source) => (
                <li key={source} className="flex items-center gap-2 text-sm text-text-secondary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/60" aria-hidden="true" />
                  {source}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href={`/calculator?scheme=${scheme.id}`}>
              Calculate EMI for this scheme
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/partners">Find an authorized partner</Link>
          </Button>
        </section>
      </div>
    </PageContainer>
  );
}