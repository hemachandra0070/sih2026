import { apiClient } from "./client";
import type { CalculatorInputs, CalculatorOutputs, SchemeCalculatorParams } from "@/types/calculator";

export interface CalculateEMIRequest extends CalculatorInputs {
  scheme_id?: string;
}

export async function calculateEMI(
  data: CalculateEMIRequest
): Promise<CalculatorOutputs> {
  try {
    return await apiClient.post<CalculatorOutputs>("/api/calculate-emi", data);
  } catch {
    return calculateEMILocal(data);
  }
}

export function calculateEMILocal(data: CalculateEMIRequest): CalculatorOutputs {
  const { loanAmount, interestRate, tenureYears, moratoriumMonths } = data;

  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = tenureYears * 12;

  const factor = Math.pow(1 + monthlyRate, totalMonths);
  const emi =
    monthlyRate > 0
      ? (loanAmount * monthlyRate * factor) / (factor - 1)
      : loanAmount / totalMonths;

  const monthlyEMI = Math.round(emi);
  const totalRepayment = monthlyEMI * totalMonths;
  const totalInterest = totalRepayment - loanAmount;

  return {
    monthlyEMI,
    totalInterest,
    totalRepayment,
    repaymentMonths: totalMonths,
    principalAmount: loanAmount,
    moratoriumMonths,
  };
}

export async function getSchemeCalculatorParams(
  schemeId: string
): Promise<SchemeCalculatorParams | null> {
  try {
    return await apiClient.get<SchemeCalculatorParams>(`/api/schemes/${schemeId}/calculator`);
  } catch {
    const { getSchemeById } = await import("@/lib/mock/schemes");
    const scheme = getSchemeById(schemeId);
    if (!scheme) return null;

    return {
      schemeId: scheme.id,
      schemeName: scheme.name,
      maxLoanAmount: scheme.maxLoanAmount,
      financingPercentage: scheme.financingPercentage,
      interestRateMin: scheme.interestRateMin,
      interestRateMax: scheme.interestRateMax,
      repaymentPeriod: scheme.repaymentPeriod,
      moratoriumPeriod: scheme.moratoriumPeriod,
      defaultLoanAmount: Math.min(scheme.maxLoanAmount, scheme.maxLoanAmount * 0.6),
    };
  }
}