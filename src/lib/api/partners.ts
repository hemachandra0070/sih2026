import { apiClient } from "./client";
import type { Partner, NearbyPartnersRequest, NearbyPartnersResponse } from "@/types/partner";

function normalizePartner(raw: any): Partner {
  return {
    partnerId: raw.partnerId || raw.partner_id || "PARTNER-1",
    name: raw.name,
    partnerType: raw.partnerType || raw.partner_type || "SCA",
    address: raw.address || "",
    district: raw.district || "",
    state: raw.state || "",
    latitude: raw.latitude,
    longitude: raw.longitude,
    phone: raw.phone || undefined,
    email: raw.email || undefined,
    website: raw.website || undefined,
    status: raw.status === "inactive" ? "inactive" : "active",
    authorizationStatus: raw.authorizationStatus || "authorized",
    distance: raw.distance ?? raw.distance_km,
    compatibleSchemes: raw.compatibleSchemes || ["NSFDC-TL", "NSFDC-MFS"],
  };
}

export async function getNearbyPartners(
  params: NearbyPartnersRequest
): Promise<NearbyPartnersResponse> {
  try {
    const searchParams = new URLSearchParams();
    searchParams.set("lat", params.latitude.toString());
    searchParams.set("lng", params.longitude.toString());
    if (params.schemeId) searchParams.set("scheme_id", params.schemeId);
    if (params.radiusKm) searchParams.set("radius_km", params.radiusKm.toString());
    if (params.limit) searchParams.set("limit", params.limit.toString());

    const raw = await apiClient.get<any>(
      `/api/partners/nearby?${searchParams.toString()}`
    );

    const partnerList = Array.isArray(raw?.results)
      ? raw.results.map(normalizePartner)
      : Array.isArray(raw?.partners)
      ? raw.partners.map(normalizePartner)
      : [];

    return {
      partners: partnerList,
      center: { latitude: params.latitude, longitude: params.longitude },
      radiusKm: params.radiusKm || 50,
      totalFound: raw?.count ?? partnerList.length,
    };
  } catch {
    const { getNearbyPartners } = await import("@/lib/mock/partners");
    const partners = getNearbyPartners(
      params.latitude,
      params.longitude,
      params.schemeId,
      params.radiusKm,
      params.limit
    );

    return {
      partners,
      center: { latitude: params.latitude, longitude: params.longitude },
      radiusKm: params.radiusKm || 50,
      totalFound: partners.length,
    };
  }
}

export async function getPartnerById(id: string): Promise<Partner | null> {
  try {
    const raw = await apiClient.get<any>(`/api/partners/${id}`);
    if (raw) {
      return normalizePartner(raw);
    }
    const { getPartnerById } = await import("@/lib/mock/partners");
    return getPartnerById(id) || null;
  } catch {
    const { getPartnerById } = await import("@/lib/mock/partners");
    return getPartnerById(id) || null;
  }
}