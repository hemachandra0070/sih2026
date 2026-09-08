"use client";

import * as React from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { SelectField } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { CurrencyInput } from "@/components/assessment/CurrencyInput";
import { EMIResultCard } from "@/components/calculator/EMIResultCard";
import { EstimateNotice } from "@/components/calculator/EstimateNotice";
import { FinancialSummary } from "@/components/recommendations/FinancialSummary";
import { calculateEMILocal } from "@/lib/api/calculator";
import { TENURE_OPTIONS, MORATORIUM_OPTIONS } from "@/types/calculator";
import { formatCurrency, formatIndianCompact } from "@/lib/utils";
import type { CalculatorInputs } from "@/types/calculator";

export interface CalculatorPanelProps {
  initialInputs: CalculatorInputs;
  schemeName?: string | null;
}

export function CalculatorPanel({ initialInputs, schemeName }: CalculatorPanelProps) {
  const [loanAmount, setLoanAmount] = React.useState<number | null>(initialInputs.loanAmount);
  const [interestRate, setInterestRate] = React.useState<string>(String(initialInputs.interestRate));
  const [tenureYears, setTenureYears] = React.useState<string>(String(initialInputs.tenureYears));
  const [moratoriumMonths, setMoratoriumMonths] = React.useState<string>(
    String(initialInputs.moratoriumMonths)
  );

  const outputs = React.useMemo(() => {
    const parsedRate = parseFloat(interestRate);
    return calculateEMILocal({
      loanAmount: loanAmount ?? 0,
      interestRate: Number.isFinite(parsedRate) ? parsedRate : 0,
      tenureYears: Number(tenureYears),
      moratoriumMonths: Number(moratoriumMonths),
    });
  }, [loanAmount, interestRate, tenureYears, moratoriumMonths]);

  return (
    <PageContainer maxWidth="lg">
      <PageHeader
        badge={
          schemeName ? <Badge variant="info">Prefilled for {schemeName}</Badge> : undefined
        }
        title="Estimate your repayment"
        subtitle="Adjust the loan amount, interest rate, tenure and moratorium period to see an estimated monthly EMI."
      />

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-base">Loan parameters</CardTitle>
            <CardDescription>Enter the amount you plan to borrow.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <CurrencyInput
              label="Loan amount"
              value={loanAmount}
              onChange={setLoanAmount}
              placeholder="e.g. 2,70,000"
              suggestions={[100000, 270000, 500000, 1000000]}
            />
            <Input
              label="Interest rate (per annum)"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              suffix={<span className="font-medium">% p.a.</span>}
              value={interestRate}
              onChange={(event) => setInterestRate(event.target.value)}
              placeholder="e.g. 7.5"
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <SelectField
                label="Repayment tenure"
                placeholder="Select tenure"
                defaultValue={tenureYears}
                onValueChange={setTenureYears}
                options={TENURE_OPTIONS.map((option) => ({
                  value: String(option.value),
                  label: option.label,
                }))}
              />
              <SelectField
                label="Moratorium period"
                placeholder="Select moratorium"
                defaultValue={moratoriumMonths}
                onValueChange={setMoratoriumMonths}
                options={MORATORIUM_OPTIONS.map((option) => ({
                  value: String(option.value),
                  label: option.label,
                }))}
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4 lg:col-span-2">
          <EMIResultCard
            monthlyEMI={outputs.monthlyEMI}
            repaymentMonths={outputs.repaymentMonths}
            moratoriumMonths={outputs.moratoriumMonths}
          />
          <FinancialSummary
            title="Estimated repayment"
            items={[
              {
                label: "Total interest",
                value: formatCurrency(outputs.totalInterest),
                hint: `On a loan of ${formatIndianCompact(outputs.principalAmount)}`,
                highlight: true,
              },
              {
                label: "Total repayment",
                value: formatCurrency(outputs.totalRepayment),
                hint: `${outputs.repaymentMonths} monthly installments`,
              },
            ]}
          />
          <EstimateNotice />
        </div>
      </div>
    </PageContainer>
  );
}