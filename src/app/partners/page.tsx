"use client";

import * as React from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { SelectField } from "@/components/ui/Select";
import { Skeleton } from "@/components/ui/Skeleton";
import { PartnerMap } from "@/components/partners/PartnerMap";
import { PartnerCard } from "@/components/partners/PartnerCard";
import { getNearbyPartners, getSchemes } from "@/lib/api";
import { useAssessment } from "@/hooks/useAssessment";
import type { Partner } from "@/types/partner";
import type { Scheme } from "@/types/scheme";

const DEFAULT_CENTER = { lat: 17.385, lng: 78.4867 };

export default function PartnersPage() {
  const { state } = useAssessment();

  const center = React.useMemo(() => {
    if (state.location) return { lat: state.location.lat, lng: state.location.lng };
    return DEFAULT_CENTER;
  }, [state.location]);

  const [schemes, setSchemes] = React.useState<Scheme[]>([]);
  const [filterScheme, setFilterScheme] = React.useState<string>("all");
  const [partners, setPartners] = React.useState<Partner[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  React.useEffect(() => {
    let active = true;
    getSchemes().then((list) => {
      if (active) setSchemes(list);
    });
    return () => {
      active = false;
    };
  }, []);

  React.useEffect(() => {
    let active = true;
    getNearbyPartners({
      latitude: center.lat,
      longitude: center.lng,
      schemeId: filterScheme === "all" ? undefined : filterScheme,
      radiusKm: 50,
      limit: 20,
    }).then((result) => {
      if (!active) return;
      setPartners(result.partners);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [center.lat, center.lng, filterScheme]);

  const selectedPartner = partners.find((p) => p.partnerId === selectedId) ?? null;

  const schemeOptions = React.useMemo(
    () => [
      { value: "all", label: "All schemes" },
      ...schemes.map((scheme) => ({ value: scheme.id, label: scheme.name })),
    ],
    [schemes]
  );

  return (
    <PageContainer maxWidth="xl">
      <PageHeader
        title="Authorized channel partners"
        subtitle="Find authorized partners near you that handle the schemes you are interested in."
      />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:max-w-xs">
          <SelectField
            label="Filter by scheme"
            placeholder="All schemes"
            defaultValue="all"
            onValueChange={(value) => {
              setFilterScheme(value);
              setLoading(true);
            }}
            options={schemeOptions}
          />
        </div>
        <p className="text-sm text-text-secondary">
          {loading ? "Locating partners…" : `${partners.length} partner(s) found`}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="order-1">
          <PartnerMap
            partners={partners}
            center={center}
            zoom={13}
            height={480}
            selectedPartnerId={selectedId ?? undefined}
            onSelectPartner={(partner) => setSelectedId(partner.partnerId)}
            className="lg:sticky lg:top-20"
          />
        </div>

        <div className="order-2 space-y-3">
          {loading && partners.length === 0 && (
            <div className="space-y-3" aria-label="Loading partners">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} variant="card" className="h-40" />
              ))}
            </div>
          )}

          {!loading && partners.length === 0 && (
            <div className="rounded-[var(--radius-card)] border border-border bg-surface p-6 text-center text-text-secondary">
              No authorized partners match the selected scheme within the demo area.
            </div>
          )}

          {partners.map((partner) => (
            <PartnerCard
              key={partner.partnerId}
              partner={partner}
              selected={selectedPartner?.partnerId === partner.partnerId}
              onSelect={(selected) => setSelectedId(selected.partnerId)}
            />
          ))}

          <p className="pt-2 text-xs leading-relaxed text-text-secondary">
            Partner list and map show demo locations for Hyderabad. Select a partner to highlight its
            position on the map.
          </p>
        </div>
      </div>
    </PageContainer>
  );
}