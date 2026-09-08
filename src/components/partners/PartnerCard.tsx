"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { MapPin, Navigation, Check, Info } from "lucide-react";
import Link from "next/link";
import type { Partner } from "@/types/partner";
import { formatDistance } from "@/lib/utils";

export interface PartnerCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  partner: Partner;
  selected?: boolean;
  onSelect?: (partner: Partner) => void;
}

export function PartnerCard({ partner, selected = false, onSelect, className, ...props }: PartnerCardProps) {
  const performanceAvailable = partner.performance?.available === true;

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:border-primary/40",
        onSelect && "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        selected && "border-2 border-primary",
        className
      )}
      onClick={() => onSelect?.(partner)}
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
      aria-pressed={onSelect ? selected : undefined}
      onKeyDown={
        onSelect
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelect(partner);
              }
            }
          : undefined
      }
      {...props}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-base">{partner.name}</CardTitle>
            <CardDescription className="mt-1">{partner.partnerType}</CardDescription>
          </div>
          <Badge variant={partner.authorizationStatus === "authorized" ? "success" : "warning"}>
            <Check className="mr-1 h-3 w-3" aria-hidden="true" />
            {partner.authorizationStatus === "authorized" ? "Authorized" : "Pending"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-1.5 text-sm text-text-secondary">
          <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
          {partner.district}, {partner.state}
          {partner.distance !== undefined && (
            <span className="ml-auto font-medium text-text-primary">
              {formatDistance(partner.distance * 1000)}
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <Badge variant="outline">
            <Check className="mr-1 h-3 w-3" aria-hidden="true" />
            Scheme compatible
          </Badge>
          {partner.compatibleSchemes?.slice(0, 3).map((scheme) => (
            <Badge key={scheme} variant="secondary">{scheme}</Badge>
          ))}
          {partner.compatibleSchemes && partner.compatibleSchemes.length > 3 && (
            <Badge variant="secondary">+{partner.compatibleSchemes.length - 3}</Badge>
          )}
        </div>

        <div>
          <p className="text-xs font-medium text-text-secondary">Performance</p>
          {performanceAvailable ? (
            <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-success">
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
              Performance information available
            </p>
          ) : (
            <p className="mt-0.5 flex items-start gap-1 text-xs leading-relaxed text-warning">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>
                Performance information is currently unavailable from the authoritative source.
              </span>
            </p>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex flex-wrap gap-2">
        <Link
          href={`/partners/${partner.partnerId}`}
          className="inline-flex items-center text-sm font-medium text-primary hover:text-primary-dark"
        >
          View details
        </Link>
        <a
          href={`https://www.openstreetmap.org/directions?to=${partner.latitude}%2C${partner.longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-medium text-text-secondary hover:text-text-primary"
        >
          <Navigation className="h-3.5 w-3.5" aria-hidden="true" />
          Directions
        </a>
      </CardFooter>
    </Card>
  );
}