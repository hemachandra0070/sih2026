import type { Partner, PartnerPerformance } from "@/types/partner";

const basePerformance: PartnerPerformance = {
  available: false,
};

export const mockPartners: Partner[] = [
  {
    partnerId: "CP-SCA-001",
    name: "Telangana Scheduled Castes Co-operative Development Corporation (TSSCCDC)",
    partnerType: "State Channelizing Agency (SCA)",
    state: "Telangana",
    district: "Hyderabad",
    address: "5th Floor, Damodaram Sanjeevaiah Sankshema Bhavan, Masab Tank, Hyderabad - 500028",
    latitude: 17.4065,
    longitude: 78.4772,
    phone: "040-23391234",
    email: "md-tsccorp@telangana.gov.in",
    website: "https://tsccorp.telangana.gov.in",
    status: "active",
    authorizationStatus: "authorized",
    sourceId: "S007",
    distance: 2.3,
    compatibleSchemes: ["NSFDC-MFS", "NSFDC-TL", "NSFDC-AMY", "NSFDC-UNY", "NSFDC-ELS", "NSFDC-MF"],
    performance: basePerformance,
  },
  {
    partnerId: "CP-PSB-001",
    name: "State Bank of India - Hyderabad Main Branch",
    partnerType: "Public Sector Bank (PSB)",
    state: "Telangana",
    district: "Hyderabad",
    address: "SBI Building, Bank Street, Koti, Hyderabad - 500095",
    latitude: 17.385,
    longitude: 78.4867,
    phone: "040-24751000",
    email: "sbi.hydmain@sbi.co.in",
    website: "https://sbi.co.in",
    status: "active",
    authorizationStatus: "authorized",
    sourceId: "S007",
    distance: 1.8,
    compatibleSchemes: ["NSFDC-TL", "NSFDC-ELS", "NSFDC-MFS", "NSFDC-MF"],
    performance: basePerformance,
  },
  {
    partnerId: "CP-PSB-002",
    name: "Canara Bank - Regional Office & SME Branch",
    partnerType: "Public Sector Bank (PSB)",
    state: "Telangana",
    district: "Hyderabad",
    address: "Canara Bank Building, Abids Road, Hyderabad - 500001",
    latitude: 17.3935,
    longitude: 78.4738,
    phone: "040-23204567",
    email: "cbhyd@canarabank.com",
    website: "https://canarabank.com",
    status: "active",
    authorizationStatus: "authorized",
    sourceId: "S007",
    distance: 2.7,
    compatibleSchemes: ["NSFDC-TL", "NSFDC-ELS", "NSFDC-MFS", "NSFDC-MF"],
    performance: basePerformance,
  },
  {
    partnerId: "CP-MFI-001",
    name: "Spandana Sphoorty Financial Limited (Empanelled NBFC-MFI)",
    partnerType: "NBFC-MFI Channel Partner",
    state: "Telangana",
    district: "Hyderabad",
    address: "Plot No. 31 & 32, Ramky Selenium, Financial District, Gachibowli, Hyderabad - 500032",
    latitude: 17.4244,
    longitude: 78.3489,
    phone: "040-45474747",
    email: "contact@spandanaindia.com",
    website: "https://spandanaindia.com",
    status: "active",
    authorizationStatus: "authorized",
    sourceId: "S007",
    distance: 6.4,
    compatibleSchemes: ["NSFDC-AMY", "NSFDC-MFS", "NSFDC-MF"],
    performance: basePerformance,
  },
  {
    partnerId: "CP-SFB-001",
    name: "AU Small Finance Bank - Secunderabad Branch",
    partnerType: "Small Finance Bank (SFB)",
    state: "Telangana",
    district: "Hyderabad",
    address: "MG Road, Near Clock Tower, Secunderabad - 500003",
    latitude: 17.4399,
    longitude: 78.4983,
    phone: "040-27849900",
    email: "secunderabad@aubank.in",
    website: "https://aubank.in",
    status: "active",
    authorizationStatus: "authorized",
    sourceId: "S007",
    distance: 4.8,
    compatibleSchemes: ["NSFDC-UNY", "NSFDC-TL", "NSFDC-MFS", "NSFDC-MF"],
    performance: basePerformance,
  },
  {
    partnerId: "CP-COOP-001",
    name: "Hyderabad District Co-operative Central Bank (DCCB)",
    partnerType: "Co-operative Bank / Society",
    state: "Telangana",
    district: "Hyderabad",
    address: "Troop Bazar, Koti, Hyderabad - 500001",
    latitude: 17.3872,
    longitude: 78.4815,
    phone: "040-24602233",
    email: "hyd_dccb@telangana.gov.in",
    website: "https://hyderabaddccb.org",
    status: "active",
    authorizationStatus: "authorized",
    sourceId: "S007",
    distance: 3.2,
    compatibleSchemes: ["NSFDC-UNY", "NSFDC-MFS", "NSFDC-MF"],
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