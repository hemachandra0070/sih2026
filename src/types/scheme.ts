export interface Scheme {
  id: string;
  schemeId: string;
  name: string;
  schemeType: string;
  purpose: "business" | "education" | "both";
  description?: string;
  tags?: string[];
  projectCostMin: number;
  projectCostMax: number;
  maxLoanAmount: number;
  financingPercentage: number;
  nsfdcInterestRate: number;
  beneficiaryInterestRate: number;
  interestRateMin: number;
  interestRateMax: number;
  repaymentPeriod: number;
  moratoriumPeriod: number;
  installmentFrequency: "monthly" | "quarterly";
  targetGroup: string;
  applicationMode: "online" | "offline" | "both";
  status: "active" | "inactive";
  effectiveFrom: string;
  effectiveUntil?: string;
  sourceId?: string;
}

export interface SchemeWithDetails extends Scheme {
  eligibility: EligibilityRule[];
  documents: ApplicationDocument[];
  activities: string[];
  partnerTypes: string[];
}

export interface EligibilityRule {
  id: string;
  schemeId: string;
  field: string;
  operator: "eq" | "neq" | "gt" | "gte" | "lt" | "lte" | "in" | "nin";
  value: string | number | boolean;
  unit?: string;
  priority: number;
  sourceId?: string;
}

export interface ApplicationDocument {
  id: string;
  schemeId: string;
  documentName: string;
  mandatory: boolean;
  description?: string;
  sourceId?: string;
}

export interface Activity {
  id: string;
  name: string;
  sector: string;
  subSector?: string;
  keywords: string[];
  aliases: string[];
}

export interface ELSCourse {
  id: string;
  name: string;
  category: string;
  level: "undergraduate" | "postgraduate" | "diploma" | "phd";
}