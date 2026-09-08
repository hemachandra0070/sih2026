export interface CalculatorInputs {
  loanAmount: number;
  interestRate: number;
  tenureYears: number;
  moratoriumMonths: number;
}

export interface CalculatorOutputs {
  monthlyEMI: number;
  totalInterest: number;
  totalRepayment: number;
  repaymentMonths: number;
  principalAmount: number;
  moratoriumMonths: number;
}

export interface CalculatorState extends CalculatorInputs {
  schemeId?: string;
  schemeName?: string;
}

export interface SchemeCalculatorParams {
  schemeId: string;
  schemeName: string;
  maxLoanAmount: number;
  financingPercentage: number;
  interestRateMin: number;
  interestRateMax: number;
  repaymentPeriod: number;
  moratoriumPeriod: number;
  defaultLoanAmount?: number;
}

export const DEFAULT_CALCULATOR_INPUTS: CalculatorInputs = {
  loanAmount: 300000,
  interestRate: 7.5,
  tenureYears: 5,
  moratoriumMonths: 6,
};

export const TENURE_OPTIONS = [
  { value: 1, label: "1 year" },
  { value: 2, label: "2 years" },
  { value: 3, label: "3 years" },
  { value: 4, label: "4 years" },
  { value: 5, label: "5 years" },
  { value: 7, label: "7 years" },
  { value: 10, label: "10 years" },
];

export const MORATORIUM_OPTIONS = [
  { value: 0, label: "No moratorium" },
  { value: 3, label: "3 months" },
  { value: 6, label: "6 months" },
  { value: 12, label: "12 months" },
];