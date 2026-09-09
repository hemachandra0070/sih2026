import { apiClient } from "./client";
import type { RecommendationResponse } from "@/types/recommendation";
import type { AssessmentAnswers } from "@/lib/assessment/schema";

export interface RecommendationRequest {
  is_sc: boolean;
  annual_income: number;
  purpose: "business" | "expand_business" | "education";
  activity: string;
  project_cost: number;
  education_cost?: number;
  location: {
    lat: number;
    lng: number;
  };
  // Extended contextual attributes collected from conversational flow
  is_sc_unknown?: boolean;
  income_range?: string;
  owns_house?: string;
  owns_land?: string;
  owns_vehicle?: string;
  has_existing_loan?: string;
  raw_answers?: AssessmentAnswers;
}

export function mapAnswersToRecommendationRequest(answers: AssessmentAnswers): RecommendationRequest {
  let purpose: RecommendationRequest["purpose"] = "business";
  if (answers.intent === "education") {
    purpose = "education";
  } else if (answers.intent === "expand_business") {
    purpose = "expand_business";
  }

  // Never convert UNKNOWN -> NO. If user says unknown, explore schemes with flag.
  const is_sc = answers.is_sc === "no" ? false : true;
  const is_sc_unknown = answers.is_sc === "unknown" || !answers.is_sc;

  let annual_income = 300000;
  if (typeof answers.annual_income === "number") {
    annual_income = answers.annual_income;
  } else if (answers.annual_income_range) {
    switch (answers.annual_income_range) {
      case "under_1l":
        annual_income = 80000;
        break;
      case "1l_to_2l":
        annual_income = 150000;
        break;
      case "2l_to_5l":
        annual_income = 350000;
        break;
      case "5l_to_10l":
        annual_income = 650000;
        break;
      case "above_10l":
        annual_income = 1200000;
        break;
      case "unknown":
        if (answers.income_below_5l === "yes") annual_income = 250000;
        else if (answers.income_below_5l === "no") annual_income = 600000;
        else annual_income = 300000;
        break;
    }
  }

  let cost = 140000;
  if (typeof answers.amount_needed === "number" && answers.amount_needed > 0) {
    cost = answers.amount_needed;
  } else if (purpose === "education") {
    cost = 500000;
  }

  const activity =
    answers.activity === "other" || answers.course === "other"
      ? answers.custom_activity || "other enterprise"
      : answers.activity || answers.course || "tailoring_garments";

  const location = answers.location
    ? { lat: Number(answers.location.lat), lng: Number(answers.location.lng) }
    : { lat: 17.385, lng: 78.4867 };

  return {
    is_sc,
    is_sc_unknown,
    annual_income,
    purpose,
    activity,
    project_cost: cost,
    education_cost: purpose === "education" ? cost : undefined,
    location,
    income_range: answers.annual_income_range,
    owns_house: answers.owns_house,
    owns_land: answers.owns_land,
    owns_vehicle: answers.owns_vehicle,
    has_existing_loan: answers.has_existing_loan,
    raw_answers: answers,
  };
}

function normalizeRecommendationResponse(raw: any): RecommendationResponse {
  if (!raw || !Array.isArray(raw.recommendations)) {
    throw new Error("Invalid response format");
  }

  const recommendations = raw.recommendations.map((rec: any, index: number) => {
    if (rec.schemeId && rec.financialFacts) {
      return rec;
    }

    const s = rec.scheme || {};
    const maxLoan = s.max_loan_amount || rec.max_loan_amount || 500000;
    const financingPercentage = s.financing_percentage || rec.financing_percentage || 90;
    const interestRate = s.beneficiary_interest_rate || rec.beneficiary_interest_rate || 6.5;
    const repaymentYears = Math.max(1, Math.round((s.repayment_period_months || 60) / 12));
    const moratoriumMonths = s.moratorium_period_months ?? 3;

    const reasons: string[] = (rec.reasons || []).map((r: string) => {
      switch (r) {
        case "COMMUNITY_MATCH":
          return "Scheduled Caste community requirement satisfied (Rule E001)";
        case "INCOME_WITHIN_LIMIT":
          return "Family income fits within scheme eligibility criteria (Rule E002)";
        case "ACTIVITY_MATCH":
          return "Selected trade/enterprise activity is recognized under guidelines";
        case "FINANCIAL_OK":
          return "Project cost fits within scheme financing limits";
        case "ACTIVITY_UNVERIFIED":
          return "Activity subject to standard documentation check";
        case "PARTNER_DATA_UNAVAILABLE":
          return "Local partner allocation will be confirmed on application";
        default:
          return r.replace(/_/g, " ");
      }
    });

    return {
      schemeId: rec.scheme_id || rec.schemeId || `SCHEME-${index}`,
      schemeName: rec.scheme_name || rec.schemeName || "Eligible Scheme",
      schemeType: rec.scheme_type || "Income-generating finance",
      score: typeof rec.score === "number" ? rec.score : 80,
      reasons: reasons.length > 0 ? reasons : ["Fits your profile and financial need"],
      explanation: reasons,
      financialFacts: {
        maxLoan,
        financingPercentage,
        interestRateMin: interestRate,
        interestRateMax: interestRate,
        repaymentYears,
        moratoriumMonths,
      },
      isPrimary: index === 0,
      matchFactors: {
        eligibility: Math.min(40, Math.round((rec.score || 80) * 0.4)),
        activityMatch: 25,
        financialFit: 20,
        partnerAvailability: 15,
      },
    };
  });

  return {
    recommendations,
    assessmentId: raw.assessment_id || raw.assessmentId || `kb-${Date.now()}`,
    timestamp: raw.timestamp || new Date().toISOString(),
  };
}

export async function getRecommendations(
  data: RecommendationRequest
): Promise<RecommendationResponse> {
  try {
    const raw = await apiClient.post<any>("/api/recommend", data);
    const normalized = normalizeRecommendationResponse(raw);
    if (normalized.recommendations.length > 0) {
      return normalized;
    }
    const { getMockRecommendationsForRequest } = await import("@/lib/mock/recommendations");
    return getMockRecommendationsForRequest(data);
  } catch {
    const { getMockRecommendationsForRequest } = await import("@/lib/mock/recommendations");
    return getMockRecommendationsForRequest(data);
  }
}