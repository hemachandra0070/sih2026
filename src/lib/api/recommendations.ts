import { apiClient } from "./client";
import type { RecommendationResponse } from "@/types/recommendation";

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
}

export async function getRecommendations(
  data: RecommendationRequest
): Promise<RecommendationResponse> {
  try {
    return await apiClient.post<RecommendationResponse>("/api/recommend", data);
  } catch {
    const { mockRecommendationResponse } = await import("@/lib/mock/recommendations");
    return mockRecommendationResponse;
  }
}