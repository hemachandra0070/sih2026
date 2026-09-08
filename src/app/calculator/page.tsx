import { CalculatorPanel } from "@/components/calculator/CalculatorPanel";
import { getSchemeCalculatorParams } from "@/lib/api/calculator";
import type { CalculatorInputs } from "@/types/calculator";

const SPEC_DEFAULTS: CalculatorInputs = {
  loanAmount: 270000,
  interestRate: 7.5,
  tenureYears: 5,
  moratoriumMonths: 3,
};

interface CalculatorPageProps {
  searchParams: Promise<{ scheme?: string }>;
}

export default async function CalculatorPage({ searchParams }: CalculatorPageProps) {
  const { scheme } = await searchParams;

  let initialInputs = SPEC_DEFAULTS;
  let schemeName: string | null = null;

  if (scheme) {
    const params = await getSchemeCalculatorParams(scheme);
    if (params) {
      initialInputs = {
        loanAmount: params.defaultLoanAmount ?? Math.min(params.maxLoanAmount, params.maxLoanAmount * 0.6),
        interestRate: params.interestRateMin,
        tenureYears: params.repaymentPeriod,
        moratoriumMonths: params.moratoriumPeriod,
      };
      schemeName = params.schemeName;
    }
  }

  return <CalculatorPanel initialInputs={initialInputs} schemeName={schemeName} />;
}