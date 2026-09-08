export interface RecommendationReason {
  text: string;
  met: boolean;
}

export interface FinancialFacts {
  maxLoan: number;
  financingPercentage: number;
  interestRateMin: number;
  interestRateMax: number;
  repaymentYears: number;
  moratoriumMonths: number;
}

export interface Recommendation {
  schemeId: string;
  schemeName: string;
  schemeType?: string;
  score: number;
  reasons: string[];
  explanation?: string[];
  financialFacts: FinancialFacts;
  isPrimary: boolean;
  matchFactors?: {
    eligibility: number;
    activityMatch: number;
    financialFit: number;
    partnerAvailability: number;
  };
}

export interface RecommendationResponse {
  recommendations: Recommendation[];
  assessmentId: string;
  timestamp: string;
}

export type RecommendationSource = "official" | "estimate" | "unavailable";

export interface SourceBadgeProps {
  source: RecommendationSource;
  details?: string;
}