"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Partner } from "@/types/partner";

export interface LeafletMapClientProps {
  partners: Partner[];
  center: { lat: number; lng: number };
  zoom?: number;
  height?: number;
  selectedPartnerId?: string;
  onSelectPartner?: (partner: Partner) => void;
}

const defaultIcon = L.divIcon({
  html: `<div class="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">P</div>`,
  className: "",
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -20],
});

const selectedIcon = L.divIcon({
  html: `<div class="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">P</div>`,
  className: "",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -28],
});

export function LeafletMapClient({
  partners,
  center,
  zoom = 13,
  selectedPartnerId,
  onSelectPartner,
}: LeafletMapClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [center.lat, center.lng],
      zoom,
      scrollWheelZoom: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current = [];
    };
  }, [center.lat, center.lng, zoom]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    partners.forEach((partner) => {
      const marker = L.marker([partner.latitude, partner.longitude], {
        icon: partner.partnerId === selectedPartnerId ? selectedIcon : defaultIcon,
        title: partner.name,
      });

      marker.on("click", () => onSelectPartner?.(partner));

      marker.bindPopup(
        `<div class="p-1">
          <p class="font-semibold text-base" style="color:#17365D">${partner.name}</p>
          <p class="text-sm" style="color:#586575">${partner.partnerType}</p>
          ${partner.distance ? `<p class="text-sm mt-1" style="color:#16845B">${partner.distance.toFixed(1)} km away</p>` : ""}
        </div>`
      );

      marker.addTo(map);
      markersRef.current.push(marker);
    });
  }, [partners, selectedPartnerId, onSelectPartner]);

  return <div ref={containerRef} style={{ height: "100%", width: "100%" }} />;
}