"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Check, LocateFixed, MapPin, X, Search, LoaderCircle } from "lucide-react";

export interface AssessmentLocation {
  lat: number;
  lng: number;
  address: string;
}

export interface LocationInputProps {
  value: AssessmentLocation | null;
  onChange: (value: AssessmentLocation | null) => void;
  error?: string;
  className?: string;
}

interface MockLocation {
  name: string;
  state: string;
  lat: number;
  lng: number;
}

const MOCK_LOCATIONS: MockLocation[] = [
  { name: "Hyderabad", state: "Telangana", lat: 17.385, lng: 78.4867 },
  { name: "Secunderabad", state: "Telangana", lat: 17.4399, lng: 78.4983 },
  { name: "Warangal", state: "Telangana", lat: 17.9689, lng: 79.5941 },
  { name: "Karimnagar", state: "Telangana", lat: 18.4386, lng: 79.1288 },
  { name: "Nizamabad", state: "Telangana", lat: 18.6725, lng: 78.0941 },
  { name: "Khammam", state: "Telangana", lat: 17.2473, lng: 80.1514 },
  { name: "Vijayawada", state: "Andhra Pradesh", lat: 16.5062, lng: 80.648 },
  { name: "Visakhapatnam", state: "Andhra Pradesh", lat: 17.6868, lng: 83.2185 },
  { name: "Guntur", state: "Andhra Pradesh", lat: 16.3067, lng: 80.4365 },
  { name: "Tirupati", state: "Andhra Pradesh", lat: 13.6288, lng: 79.4192 },
];

export function LocationInput({ value, onChange, error, className }: LocationInputProps) {
  const [query, setQuery] = React.useState("");
  const [geolocating, setGeolocating] = React.useState(false);
  const [geoNote, setGeoNote] = React.useState<string | null>(null);

  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return MOCK_LOCATIONS.filter(
      (loc) => loc.name.toLowerCase().includes(q) || loc.state.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [query]);

  const select = (location: AssessmentLocation) => {
    onChange(location);
    setQuery("");
    setGeoNote(null);
  };

  const locateMe = () => {
    resetConfirmation();
    if (!("geolocation" in navigator)) {
      setGeoNote("Your browser does not support location. Search for your area below, or use a demo location.");
      return;
    }
    setGeolocating(true);
    setGeoNote(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeolocating(false);
        select({
          lat: Number(position.coords.latitude.toFixed(4)),
          lng: Number(position.coords.longitude.toFixed(4)),
          address: "Your current location",
        });
      },
      () => {
        setGeolocating(false);
        setGeoNote("We couldn't access your location. Search for your area below, or use a demo location.");
      },
      { timeout: 8000 }
    );
  };

  const resetConfirmation = () => {
    onChange(null);
  };

  return (
    <div className={cn("w-full", className)}>
      {value ? (
        <div className="flex items-start justify-between gap-3 rounded-[var(--radius-card)] border border-success/30 bg-success-bg p-4">
          <div className="flex items-start gap-2">
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden="true" />
            <div>
              <p className="font-medium text-text-primary">Location set</p>
              <div className="mt-0.5 flex items-center gap-1 text-sm text-text-secondary">
                <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                {value.address}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={resetConfirmation}
            className="rounded-md p-1 text-text-secondary hover:bg-surface hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Change location"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <Button
            type="button"
            variant="secondary"
            size="lg"
            className="w-full"
            onClick={locateMe}
            disabled={geolocating}
          >
            {geolocating ? (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <LocateFixed className="mr-2 h-4 w-4" aria-hidden="true" />
            )}
            {geolocating ? "Fetching your location…" : "Use my current location"}
          </Button>

          <div className="flex items-center gap-3">
            <span className="h-px flex-1 bg-border" aria-hidden="true" />
            <span className="text-xs font-medium uppercase tracking-wide text-text-secondary">or search your area</span>
            <span className="h-px flex-1 bg-border" aria-hidden="true" />
          </div>

          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" aria-hidden="true" />
            <input
              type="text"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setGeoNote(null);
              }}
              placeholder="Search district or city"
              aria-label="Search district or city"
              className="flex h-12 w-full rounded-[var(--radius-input)] border border-border bg-surface pl-9 pr-3 py-2 text-base text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            />
          </div>

          {results.length > 0 && (
            <ul className="max-h-64 divide-y divide-border overflow-auto rounded-[var(--radius-card)] border border-border bg-surface">
              {results.map((loc) => (
                <li key={`${loc.name}-${loc.state}`}>
                  <button
                    type="button"
                    onClick={() =>
                      select({ lat: loc.lat, lng: loc.lng, address: `${loc.name}, ${loc.state}` })
                    }
                    className="flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-background focus:outline-none focus-visible:bg-background"
                  >
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>
                      <span className="block text-sm font-medium text-text-primary">{loc.name}</span>
                      <span className="block text-xs text-text-secondary">{loc.state}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {geoNote && (
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-[var(--radius-card)] border border-warning/30 bg-warning-bg p-3">
              <p className="text-sm text-warning">{geoNote}</p>
              <button
                type="button"
                onClick={() => select({ lat: 17.385, lng: 78.4867, address: "Hyderabad, Telangana" })}
                className="rounded-md border border-warning/30 px-2.5 py-1 text-xs font-medium text-warning hover:bg-warning/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-warning"
              >
                Use demo location
              </button>
            </div>
          )}
        </div>
      )}

      {error && (
        <p id="location-error" className="mt-3 text-sm text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}