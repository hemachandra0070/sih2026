import type { RecommendationResponse, Recommendation } from "@/types/recommendation";
import type { RecommendationRequest } from "@/lib/api/recommendations";

export const mockRecommendationResponse: RecommendationResponse = {
  recommendations: [
    {
      schemeId: "NSFDC-TL",
      schemeName: "Term Loan (TL)",
      schemeType: "Income-generating / term finance",
      score: 95,
      reasons: [
        "Family income is within the revised ₹5,00,000 ceiling (Rule E002)",
        "SC community eligibility criterion satisfied (Rule E001)",
        "Project cost fits within the ₹50 lakh scheme limit",
        "Activity is recognized under NSFDC indicative activities taxonomy",
      ],
      explanation: [
        "Applicant verified as belonging to Scheduled Caste community (Rule E001)",
        "Annual family income verified within the ₹5,00,000 limit across rural/urban areas (Rule E002)",
        "Enterprise activity qualifies for up to 90% term loan assistance (max ₹45 lakh)",
        "Standard beneficiary interest rate of 8% with 7 years repayment tenure",
      ],
      financialFacts: {
        maxLoan: 4500000,
        financingPercentage: 90,
        interestRateMin: 8,
        interestRateMax: 8,
        repaymentYears: 7,
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
      schemeId: "NSFDC-MFS",
      schemeName: "Micro Finance Scheme (MFS)",
      schemeType: "Income-generating / micro-credit",
      score: 82,
      reasons: [
        "Family income is within the ₹5,00,000 eligibility limit",
        "Low interest rate of 6.5% for small business micro-credit",
      ],
      financialFacts: {
        maxLoan: 125000,
        financingPercentage: 90,
        interestRateMin: 6.5,
        interestRateMax: 6.5,
        repaymentYears: 3,
        moratoriumMonths: 3,
      },
      isPrimary: false,
    },
    {
      schemeId: "NSFDC-UNY",
      schemeName: "Udyam Nidhi Yojana (UNY)",
      schemeType: "Income-generating / small-micro activity",
      score: 75,
      reasons: [
        "Family income fits eligibility requirements",
        "Channeled through Cooperative Banks and Small Finance Banks",
      ],
      financialFacts: {
        maxLoan: 450000,
        financingPercentage: 90,
        interestRateMin: 13,
        interestRateMax: 15,
        repaymentYears: 5,
        moratoriumMonths: 3,
      },
      isPrimary: false,
    },
  ],
  assessmentId: "kb-assessment-001",
  timestamp: new Date().toISOString(),
};

export const mockEmptyRecommendationResponse: RecommendationResponse = {
  recommendations: [],
  assessmentId: "kb-assessment-empty",
  timestamp: new Date().toISOString(),
};

/**
 * Dynamically evaluates user assessment inputs against the authentic NSFDC Knowledge Base schemes.
 */
export function getMockRecommendationsForRequest(req: RecommendationRequest): RecommendationResponse {
  const isSC = req.is_sc;
  const income = req.annual_income || 0;
  const purpose = req.purpose;
  const cost = req.project_cost || req.education_cost || 100000;
  const activityLabel = req.activity ? req.activity.replace(/_/g, " ") : "selected activity";

  const recommendations: Recommendation[] = [];

  const isIncomeEligible = income <= 500000;
  const incomeReason = isIncomeEligible
    ? `Annual family income (₹${income.toLocaleString("en-IN")}) is within the ₹5,00,000 ceiling (Rule E002)`
    : `Income exceeds standard ₹5,00,000 limit; special state approval may be required (Rule E002)`;

  const scReason = isSC
    ? "Scheduled Caste community requirement satisfied (Rule E001)"
    : "NSFDC schemes are targeted to Scheduled Caste beneficiaries (Rule E001)";

  if (purpose === "education") {
    // Educational Loan Scheme (ELS)
    recommendations.push({
      schemeId: "NSFDC-ELS",
      schemeName: "Educational Loan Scheme (ELS)",
      schemeType: "Education loan",
      score: isSC && isIncomeEligible ? 96 : 65,
      reasons: [
        scReason,
        incomeReason,
        "Covers recognized professional and technical courses in India or abroad",
        `Loan assistance covers up to 90% of course fee (max ₹40 lakh) at 6.5% interest`,
      ],
      explanation: [
        scReason,
        incomeReason,
        "Admitted to eligible degree / professional course under NSFDC ELS guidelines",
        "Generous moratorium: entire course duration plus 1 year; repayment up to 10–12 years",
      ],
      financialFacts: {
        maxLoan: 4000000,
        financingPercentage: 90,
        interestRateMin: 6.5,
        interestRateMax: 6.5,
        repaymentYears: 12,
        moratoriumMonths: 12,
      },
      isPrimary: true,
      matchFactors: {
        eligibility: isSC && isIncomeEligible ? 40 : 15,
        activityMatch: 25,
        financialFit: 20,
        partnerAvailability: 15,
      },
    });
  } else {
    // Business / Income-generating
    if (cost <= 140000) {
      // Micro Finance Scheme (MFS) - Primary
      recommendations.push({
        schemeId: "NSFDC-MFS",
        schemeName: "Micro Finance Scheme (MFS)",
        schemeType: "Income-generating / micro-credit",
        score: isSC && isIncomeEligible ? 94 : 60,
        reasons: [
          scReason,
          incomeReason,
          `Project cost of ₹${cost.toLocaleString("en-IN")} fits micro-credit ceiling (max ₹1.40 lakh)`,
          `'${activityLabel}' is an approved micro-business activity under NSFDC guidelines`,
        ],
        explanation: [
          scReason,
          incomeReason,
          "Financing up to 90% (max loan ₹1,25,000) with low 6.5% beneficiary interest rate",
          "Channeled through State Channelizing Agencies (SCAs) via the national PM-SURAJ portal",
        ],
        financialFacts: {
          maxLoan: 125000,
          financingPercentage: 90,
          interestRateMin: 6.5,
          interestRateMax: 6.5,
          repaymentYears: 3,
          moratoriumMonths: 3,
        },
        isPrimary: true,
        matchFactors: {
          eligibility: isSC && isIncomeEligible ? 40 : 20,
          activityMatch: 25,
          financialFit: 20,
          partnerAvailability: 15,
        },
      });

      // Alternative: Aajeevika Micro-Finance Yojana (AMY)
      recommendations.push({
        schemeId: "NSFDC-AMY",
        schemeName: "Aajeevika Micro-Finance Yojana (AMY)",
        schemeType: "Income-generating / micro-finance",
        score: isSC && isIncomeEligible ? 82 : 50,
        reasons: [
          incomeReason,
          "Fast-track micro-finance through empanelled NBFC-MFIs",
          `Project cost fits within the ₹1.40 lakh ceiling`,
        ],
        financialFacts: {
          maxLoan: 125000,
          financingPercentage: 90,
          interestRateMin: 15,
          interestRateMax: 15,
          repaymentYears: 3,
          moratoriumMonths: 3,
        },
        isPrimary: false,
      });

      // Alternative: Udyam Nidhi Yojana (UNY)
      recommendations.push({
        schemeId: "NSFDC-UNY",
        schemeName: "Udyam Nidhi Yojana (UNY)",
        schemeType: "Income-generating / small-micro activity",
        score: isSC && isIncomeEligible ? 74 : 45,
        reasons: [
          incomeReason,
          "Channeled through Cooperative Banks and Small Finance Banks",
        ],
        financialFacts: {
          maxLoan: 450000,
          financingPercentage: 90,
          interestRateMin: 13,
          interestRateMax: 15,
          repaymentYears: 5,
          moratoriumMonths: 3,
        },
        isPrimary: false,
      });
    } else if (cost <= 500000) {
      // Udyam Nidhi Yojana (UNY) - Primary
      recommendations.push({
        schemeId: "NSFDC-UNY",
        schemeName: "Udyam Nidhi Yojana (UNY)",
        schemeType: "Income-generating / small-micro activity",
        score: isSC && isIncomeEligible ? 92 : 55,
        reasons: [
          scReason,
          incomeReason,
          `Project cost of ₹${cost.toLocaleString("en-IN")} fits Udyam Nidhi limit (up to ₹5 lakh)`,
          `'${activityLabel}' eligible for cooperative & small finance bank channel finance`,
        ],
        explanation: [
          scReason,
          incomeReason,
          "Financing up to 90% (max loan ₹4,50,000) with 5 years repayment and 3 months moratorium",
          "Channeled through local Cooperative Banks, Cooperative Societies and Small Finance Banks",
        ],
        financialFacts: {
          maxLoan: 450000,
          financingPercentage: 90,
          interestRateMin: 13,
          interestRateMax: 15,
          repaymentYears: 5,
          moratoriumMonths: 3,
        },
        isPrimary: true,
        matchFactors: {
          eligibility: isSC && isIncomeEligible ? 40 : 20,
          activityMatch: 25,
          financialFit: 20,
          partnerAvailability: 15,
        },
      });

      // Alternative: Term Loan (TL)
      recommendations.push({
        schemeId: "NSFDC-TL",
        schemeName: "Term Loan (TL)",
        schemeType: "Income-generating / term finance",
        score: isSC && isIncomeEligible ? 88 : 50,
        reasons: [
          incomeReason,
          "Lower 8% interest rate with 7-year repayment tenure",
          "Applicable for projects exceeding ₹1.40 lakh",
        ],
        financialFacts: {
          maxLoan: 4500000,
          financingPercentage: 90,
          interestRateMin: 8,
          interestRateMax: 8,
          repaymentYears: 7,
          moratoriumMonths: 6,
        },
        isPrimary: false,
      });
    } else {
      // Term Loan (TL) - Primary
      recommendations.push({
        schemeId: "NSFDC-TL",
        schemeName: "Term Loan (TL)",
        schemeType: "Income-generating / term finance",
        score: isSC && isIncomeEligible ? 95 : 60,
        reasons: [
          scReason,
          incomeReason,
          `Project cost of ₹${cost.toLocaleString("en-IN")} fits Term Loan bracket (up to ₹50 lakh)`,
          `'${activityLabel}' eligible under NSFDC indicative enterprise activities`,
        ],
        explanation: [
          scReason,
          incomeReason,
          "Term loan assistance up to 90% (max loan ₹45 lakh) for machinery, equipment and working capital",
          "Low interest rate of 8% per annum with extended 7-year repayment and 6-month moratorium",
        ],
        financialFacts: {
          maxLoan: 4500000,
          financingPercentage: 90,
          interestRateMin: 8,
          interestRateMax: 8,
          repaymentYears: 7,
          moratoriumMonths: 6,
        },
        isPrimary: true,
        matchFactors: {
          eligibility: isSC && isIncomeEligible ? 40 : 20,
          activityMatch: 25,
          financialFit: 20,
          partnerAvailability: 15,
        },
      });

      // Alternative: Udyam Nidhi Yojana (UNY)
      recommendations.push({
        schemeId: "NSFDC-UNY",
        schemeName: "Udyam Nidhi Yojana (UNY)",
        schemeType: "Income-generating / small-micro activity",
        score: isSC && isIncomeEligible ? 72 : 45,
        reasons: [
          incomeReason,
          "Covers up to ₹4.50 lakh loan for smaller enterprise units",
        ],
        financialFacts: {
          maxLoan: 450000,
          financingPercentage: 90,
          interestRateMin: 13,
          interestRateMax: 15,
          repaymentYears: 5,
          moratoriumMonths: 3,
        },
        isPrimary: false,
      });
    }
  }

  return {
    recommendations,
    assessmentId: `kb-${Date.now()}`,
    timestamp: new Date().toISOString(),
  };
}