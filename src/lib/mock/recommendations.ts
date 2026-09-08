import type { RecommendationResponse } from "@/types/recommendation";

export const mockRecommendationResponse: RecommendationResponse = {
  recommendations: [
    {
      schemeId: "NSFDC-TL",
      schemeName: "Term Loan",
      schemeType: "Business financing",
      score: 94,
      reasons: [
        "Income fits the eligibility requirements",
        "Project cost fits this scheme",
        "Tailoring is an eligible activity",
      ],
      explanation: [
        "SC eligibility matched",
        "Income is within the applicable limit",
        "Project cost fits the scheme",
        "Tailoring is an eligible activity",
      ],
      financialFacts: {
        maxLoan: 5000000,
        financingPercentage: 90,
        interestRateMin: 6.5,
        interestRateMax: 8,
        repaymentYears: 5,
        moratoriumMonths: 6,
      },
      isPrimary: true,
      matchFactors: {
        eligibility: 40,
        activityMatch: 25,
        financialFit: 20,
        partnerAvailability: 15,
      },
    },
    {
      schemeId: "NSFDC-MF",
      schemeName: "Micro Finance Scheme",
      schemeType: "Business financing",
      score: 72,
      reasons: [
        "Income is within the eligibility limit",
        "Tailoring is an eligible activity",
      ],
      financialFacts: {
        maxLoan: 100000,
        financingPercentage: 90,
        interestRateMin: 5,
        interestRateMax: 7,
        repaymentYears: 3,
        moratoriumMonths: 6,
      },
      isPrimary: false,
    },
    {
      schemeId: "NSFDC-AMY",
      schemeName: "Aajeevika Micro-Finance Yojana",
      schemeType: "Business financing",
      score: 68,
      reasons: [
        "Income is within the eligibility limit",
        "Tailoring is an eligible activity",
      ],
      financialFacts: {
        maxLoan: 150000,
        financingPercentage: 90,
        interestRateMin: 4,
        interestRateMax: 6,
        repaymentYears: 3,
        moratoriumMonths: 6,
      },
      isPrimary: false,
    },
  ],
  assessmentId: "demo-assessment-001",
  timestamp: new Date().toISOString(),
};

export const mockEmptyRecommendationResponse: RecommendationResponse = {
  recommendations: [],
  assessmentId: "demo-assessment-002",
  timestamp: new Date().toISOString(),
};