"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { Partner } from "@/types/partner";
import type { MapOptions } from "./types";

export interface PartnerMapProps {
  partners: Partner[];
  center: { lat: number; lng: number };
  zoom?: number;
  height?: number;
  selectedPartnerId?: string;
  onSelectPartner?: (partner: Partner) => void;
  className?: string;
  mapProps?: MapOptions;
}

export function PartnerMap({
  partners,
  center,
  zoom = 13,
  height = 400,
  selectedPartnerId,
  onSelectPartner,
  className,
}: PartnerMapProps) {
  const [LeafletMap, setLeafletMap] = React.useState<React.ComponentType<{
    partners: Partner[];
    center: { lat: number; lng: number };
    zoom: number;
    height: number;
    selectedPartnerId?: string;
    onSelectPartner?: (partner: Partner) => void;
  }> | null>(null);

  React.useEffect(() => {
    let active = true;
    import("./LeafletMapClient")
      .then((mod) => {
        if (active) setLeafletMap(() => mod.LeafletMapClient);
      })
      .catch((err) => {
        console.error("Failed to load map", err);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div
      className={cn("relative w-full overflow-hidden rounded-[var(--radius-card)] border border-border bg-background", className)}
      style={{ height }}
      role="region"
      aria-label="Partner locations map"
    >
      {LeafletMap ? (
        <LeafletMap
          partners={partners}
          center={center}
          zoom={zoom}
          height={height}
          selectedPartnerId={selectedPartnerId}
          onSelectPartner={onSelectPartner}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <div className="animate-pulse text-sm text-text-secondary">Loading map…</div>
        </div>
      )}
    </div>
  );
}