import type { Partner, PartnerPerformance } from "@/types/partner";

const basePerformance: PartnerPerformance = {
  available: false,
};

export const mockPartners: Partner[] = [
  {
    partnerId: "CP-HYD-001",
    name: "Telangana SC Corporation - Hyderabad",
    partnerType: "State Channelizing Agency",
    state: "Telangana",
    district: "Hyderabad",
    address: "SC Corporation Building, Masab Tank, Hyderabad - 500028",
    latitude: 17.4065,
    longitude: 78.4772,
    phone: "040-2339XXXX",
    email: "hyd@tsccorp.telangana.gov.in",
    website: "https://tsccorp.telangana.gov.in",
    status: "active",
    authorizationStatus: "authorized",
    sourceId: "TS-CORP-2024",
    distance: 2.3,
    compatibleSchemes: ["NSFDC-TL", "NSFDC-MF", "NSFDC-AMY", "NSFDC-UNY", "NSFDC-ELS"],
    performance: basePerformance,
  },
  {
    partnerId: "CP-HYD-002",
    name: "Canara Bank - Hyderabad Main Branch",
    partnerType: "Public Sector Bank",
    state: "Telangana",
    district: "Hyderabad",
    address: "Canara Bank, Bank Street, Koti, Hyderabad - 500095",
    latitude: 17.385,
    longitude: 78.4867,
    phone: "040-2475XXXX",
    email: "hydmain@canarabank.com",
    website: "https://canarabank.com",
    status: "active",
    authorizationStatus: "authorized",
    sourceId: "CNRB-2024",
    distance: 3.1,
    compatibleSchemes: ["NSFDC-TL", "NSFDC-MF", "NSFDC-ELS"],
    performance: basePerformance,
  },
  {
    partnerId: "CP-HYD-003",
    name: "Union Bank of India - Secunderabad",
    partnerType: "Public Sector Bank",
    state: "Telangana",
    district: "Hyderabad",
    address: "Union Bank of India, MG Road, Secunderabad - 500003",
    latitude: 17.4399,
    longitude: 78.4983,
    phone: "040-2784XXXX",
    email: "secunderabad@unionbankofindia.co.in",
    website: "https://unionbankofindia.co.in",
    status: "active",
    authorizationStatus: "authorized",
    sourceId: "UBI-2024",
    distance: 5.2,
    compatibleSchemes: ["NSFDC-TL", "NSFDC-MF", "NSFDC-UNY", "NSFDC-ELS"],
    performance: basePerformance,
  },
  {
    partnerId: "CP-HYD-004",
    name: "State Bank of India - Abids Branch",
    partnerType: "Public Sector Bank",
    state: "Telangana",
    district: "Hyderabad",
    address: "SBI, Abids Road, Hyderabad - 500001",
    latitude: 17.3935,
    longitude: 78.4738,
    phone: "040-2320XXXX",
    email: "abids@sbi.co.in",
    website: "https://sbi.co.in",
    status: "active",
    authorizationStatus: "authorized",
    sourceId: "SBI-2024",
    distance: 1.8,
    compatibleSchemes: ["NSFDC-TL", "NSFDC-MF", "NSFDC-UNY", "NSFDC-ELS"],
    performance: basePerformance,
  },
  {
    partnerId: "CP-HYD-005",
    name: "Indian Bank - Nampally Branch",
    partnerType: "Public Sector Bank",
    state: "Telangana",
    district: "Hyderabad",
    address: "Indian Bank, Nampally Station Road, Hyderabad - 500001",
    latitude: 17.3912,
    longitude: 78.4689,
    phone: "040-2323XXXX",
    email: "nampally@indianbank.in",
    website: "https://indianbank.in",
    status: "active",
    authorizationStatus: "authorized",
    sourceId: "IDBI-2024",
    distance: 2.7,
    compatibleSchemes: ["NSFDC-MF", "NSFDC-AMY", "NSFDC-ELS"],
    performance: basePerformance,
  },
];

export function getPartnerById(id: string): Partner | undefined {
  return mockPartners.find((p) => p.partnerId === id);
}

export function getPartnersByScheme(schemeId: string): Partner[] {
  return mockPartners.filter((p) => p.compatibleSchemes?.includes(schemeId));
}

export function getNearbyPartners(
  lat: number,
  lng: number,
  schemeId?: string,
  radiusKm = 50,
  limit = 10
): Partner[] {
  let partners = mockPartners;

  if (schemeId) {
    partners = partners.filter((p) => p.compatibleSchemes?.includes(schemeId));
  }

  return partners
    .map((p) => ({
      ...p,
      distance: calculateDistance(lat, lng, p.latitude, p.longitude),
    }))
    .filter((p) => (p.distance || 0) <= radiusKm)
    .sort((a, b) => (a.distance || 0) - (b.distance || 0))
    .slice(0, limit);
}

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}