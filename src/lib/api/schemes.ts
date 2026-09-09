import { apiClient } from "./client";
import type { Scheme } from "@/types/scheme";

function normalizeScheme(raw: any): Scheme {
  return {
    id: raw.id || raw.scheme_id || raw.schemeId,
    schemeId: raw.schemeId || raw.scheme_id || raw.id,
    name: raw.name || raw.scheme_name || "Scheme",
    schemeType: raw.schemeType || raw.scheme_type || "loan",
    purpose: raw.purpose === "education" ? "education" : "business",
    description: raw.description || `${raw.name || "NSFDC Scheme"} under official guidelines`,
    tags: raw.tags || [raw.purpose || "business", raw.scheme_type || "finance"],
    projectCostMin: raw.projectCostMin ?? raw.project_cost_min ?? 0,
    projectCostMax: raw.projectCostMax ?? raw.project_cost_max ?? 5000000,
    maxLoanAmount: raw.maxLoanAmount ?? raw.max_loan_amount ?? 4500000,
    financingPercentage: raw.financingPercentage ?? raw.financing_percentage ?? 90,
    nsfdcInterestRate: raw.nsfdcInterestRate ?? raw.nsfdc_interest_rate ?? 2,
    beneficiaryInterestRate: raw.beneficiaryInterestRate ?? raw.beneficiary_interest_rate ?? 6.5,
    interestRateMin: raw.interestRateMin ?? raw.beneficiary_interest_rate ?? 6.5,
    interestRateMax: raw.interestRateMax ?? raw.beneficiary_interest_rate ?? 6.5,
    repaymentPeriod: raw.repaymentPeriod ?? Math.round((raw.repayment_period_months || 60) / 12),
    moratoriumPeriod: raw.moratoriumPeriod ?? (raw.moratorium_period_months || 3),
    installmentFrequency: raw.installmentFrequency || raw.installment_frequency || "monthly",
    targetGroup: raw.targetGroup || raw.target_group || "Scheduled Caste beneficiaries",
    applicationMode: raw.applicationMode || "both",
    status: raw.status || "active",
    effectiveFrom: raw.effectiveFrom || "2024-04-01",
  };
}

export async function getSchemes(): Promise<Scheme[]> {
  try {
    const raw = await apiClient.get<any[]>("/api/schemes");
    if (Array.isArray(raw)) {
      return raw.map(normalizeScheme);
    }
    const { mockSchemes } = await import("@/lib/mock/schemes");
    return mockSchemes;
  } catch {
    const { mockSchemes } = await import("@/lib/mock/schemes");
    return mockSchemes;
  }
}

export async function getSchemeById(id: string): Promise<Scheme | null> {
  try {
    const raw = await apiClient.get<any>(`/api/schemes/${id}`);
    if (raw) {
      return normalizeScheme(raw);
    }
    const { getSchemeById } = await import("@/lib/mock/schemes");
    return getSchemeById(id) || null;
  } catch {
    const { getSchemeById } = await import("@/lib/mock/schemes");
    return getSchemeById(id) || null;
  }
}

export async function getSchemesByPurpose(
  purpose: "business" | "education"
): Promise<Scheme[]> {
  try {
    const raw = await apiClient.get<any[]>(`/api/schemes?purpose=${purpose}`);
    if (Array.isArray(raw)) {
      return raw.map(normalizeScheme);
    }
    const { getSchemesByPurpose } = await import("@/lib/mock/schemes");
    return getSchemesByPurpose(purpose);
  } catch {
    const { getSchemesByPurpose } = await import("@/lib/mock/schemes");
    return getSchemesByPurpose(purpose);
  }
}