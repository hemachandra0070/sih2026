import { apiClient } from "./client";
import type { Partner, NearbyPartnersRequest, NearbyPartnersResponse } from "@/types/partner";

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

    return await apiClient.get<NearbyPartnersResponse>(
      `/api/partners/nearby?${searchParams.toString()}`
    );
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
    return await apiClient.get<Partner>(`/api/partners/${id}`);
  } catch {
    const { getPartnerById } = await import("@/lib/mock/partners");
    return getPartnerById(id) || null;
  }
}