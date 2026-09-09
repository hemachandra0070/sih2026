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

export async function getRecommendations(
  data: RecommendationRequest
): Promise<RecommendationResponse> {
  try {
    return await apiClient.post<RecommendationResponse>("/api/recommend", data);
  } catch {
    const { getMockRecommendationsForRequest } = await import("@/lib/mock/recommendations");
    return getMockRecommendationsForRequest(data);
  }
}