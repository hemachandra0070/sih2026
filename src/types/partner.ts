export interface Partner {
  partnerId: string;
  name: string;
  partnerType: string;
  state: string;
  district: string;
  address: string;
  latitude: number;
  longitude: number;
  phone?: string;
  email?: string;
  website?: string;
  status: "active" | "inactive" | "pending";
  authorizationStatus: "authorized" | "pending" | "unknown";
  sourceId?: string;
  distance?: number;
  compatibleSchemes?: string[];
  performance?: PartnerPerformance;
}

export interface PartnerPerformance {
  available: boolean;
  period?: string;
  sanctionedAmount?: number;
  disbursedAmount?: number;
  utilizationPercentage?: number;
  beneficiaryCount?: number;
  pendingAmount?: number;
  npaPercentage?: number;
  overdueAmount?: number;
  status?: string;
  asOfDate?: string;
  sourceId?: string;
}

export interface PartnerWithDetails extends Partner {
  compatibleSchemes: string[];
  performance: PartnerPerformance;
}

export interface NearbyPartnersRequest {
  latitude: number;
  longitude: number;
  schemeId?: string;
  radiusKm?: number;
  limit?: number;
}

export interface NearbyPartnersResponse {
  partners: Partner[];
  center: {
    latitude: number;
    longitude: number;
  };
  radiusKm: number;
  totalFound: number;
}

export type PartnerStatusBadge = "authorized" | "scheme-compatible" | "performance-unavailable";