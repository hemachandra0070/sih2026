import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Globe, Mail, MapPin, Navigation, Phone, Building2 } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { BackLink } from "@/components/layout/BackLink";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Alert } from "@/components/ui/Alert";
import { PartnerMap } from "@/components/partners/PartnerMap";
import { getPartnerById } from "@/lib/api/partners";
import { getSchemes } from "@/lib/api/schemes";
import { formatDistance } from "@/lib/utils";

interface PartnerDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function PartnerDetailPage({ params }: PartnerDetailPageProps) {
  const { id } = await params;
  const partner = await getPartnerById(id);

  if (!partner) {
    notFound();
  }

  const schemes = await getSchemes();
  const schemeById = new Map(schemes.map((scheme) => [scheme.id, scheme]));
  const instructionsUrl = `https://www.openstreetmap.org/directions?to=${partner.latitude}%2C${partner.longitude}`;

  return (
    <PageContainer maxWidth="lg">
      <BackLink href="/partners" label="Back to partners" />

      <PageHeader
        badge={
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="success">
              <Check className="mr-1 h-3 w-3" aria-hidden="true" />
              {partner.authorizationStatus === "authorized" ? "Authorized" : "Pending authorization"}
            </Badge>
            <Badge variant="outline">
              <Building2 className="mr-1 h-3 w-3" aria-hidden="true" />
              Scheme compatible
            </Badge>
          </div>
        }
        title={`${partner.name} · ${partner.partnerType}`}
        subtitle={`${partner.district}, ${partner.state}`}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Contact &amp; address</CardTitle>
              <CardDescription>Reach the partner directly to begin your application.</CardDescription>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <dt className="text-xs font-medium text-text-secondary">Address</dt>
                    <dd className="mt-0.5 text-sm text-text-primary">{partner.address}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Navigation className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <dt className="text-xs font-medium text-text-secondary">Distance</dt>
                    <dd className="mt-0.5 text-sm text-text-primary">
                      {partner.distance !== undefined
                        ? formatDistance(partner.distance * 1000)
                        : "Demo location, Hyderabad"}
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <dt className="text-xs font-medium text-text-secondary">Phone</dt>
                    <dd className="mt-0.5 text-sm text-text-primary">{partner.phone}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <dt className="text-xs font-medium text-text-secondary">Email</dt>
                    <dd className="mt-0.5 text-sm text-text-primary">{partner.email}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <dt className="text-xs font-medium text-text-secondary">Website</dt>
                    <dd className="mt-0.5 text-sm">
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-dark"
                      >
                        {partner.website}
                      </a>
                    </dd>
                  </div>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Information availability</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert variant="warning" title="Performance information">
                Performance information is currently unavailable from the authoritative source.
                No performance percentages, approval or success rates are shown.
              </Alert>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href={instructionsUrl} target="_blank" rel="noopener noreferrer">
                <Navigation className="mr-2 h-4 w-4" aria-hidden="true" />
                Get directions
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/calculator">Calculate EMI</Link>
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <PartnerMap
            partners={[partner]}
            center={{ lat: partner.latitude, lng: partner.longitude }}
            zoom={14}
            height={320}
          />

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Compatible schemes</CardTitle>
              <CardDescription>Schemes this partner is authorized to service.</CardDescription>
            </CardHeader>
            <CardContent>
              {partner.compatibleSchemes && partner.compatibleSchemes.length > 0 ? (
                <ul className="space-y-2">
                  {partner.compatibleSchemes.map((schemeId) => {
                    const scheme = schemeById.get(schemeId);
                    return (
                      <li key={schemeId}>
                        <Link
                          href={`/results/scheme/${schemeId}`}
                          className="flex items-center justify-between gap-2 rounded-[var(--radius-input)] border border-border bg-background px-3 py-2 text-sm font-medium text-text-primary transition-colors hover:border-primary/40 hover:text-primary"
                        >
                          <span>{scheme?.name ?? schemeId}</span>
                          {scheme && (
                            <Badge variant="secondary">{scheme.schemeType}</Badge>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-sm text-text-secondary">No compatible schemes listed.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}