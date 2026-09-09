"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { useAssessment } from "@/hooks/useAssessment";
import {
  QuestionCard,
  ChoiceCard,
  CurrencyInput,
  LocationInput,
  ProcessingStatus,
} from "@/components/assessment";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/Progress";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { getRecommendations, type RecommendationRequest } from "@/lib/api/recommendations";
import { PageContainer } from "@/components/layout/PageContainer";

const PROCESSING_STEPS = [
  "Understanding your requirements",
  "Checking eligibility",
  "Matching schemes",
  "Calculating financing",
  "Finding nearby partners",
];

const subscribe = () => () => void 0;

function useIsMounted() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}

const BUSINESS_OPTIONS = [
  { value: "agriculture_dairy", label: "Agriculture & Dairy", description: "Dairy farming, poultry, goat rearing, horticulture, fisheries" },
  { value: "tailoring_garments", label: "Tailoring & Garments", description: "Readymade garments, embroidery, fashion boutique" },
  { value: "food_processing", label: "Food & Agro Processing", description: "Bakery, flour mill, spices grinding, food packaging" },
  { value: "small_manufacturing", label: "Manufacturing & Crafts", description: "Handicrafts, furniture, fabrication, leather, pottery" },
  { value: "retail_shop", label: "Retail & General Store", description: "Departmental store, electrical, medical, provisions shop" },
  { value: "transport_services", label: "Transport & Commercial Vehicles", description: "Auto rickshaw, car/taxi, commercial pickup, tractor" },
  { value: "services_repair", label: "Services & IT Center", description: "Computer center, beauty salon, diagnostic clinic, repair shop" },
  { value: "other", label: "Other Eligible Business", description: "Any recognized NSFDC income-generating activity" },
];

const EDUCATION_OPTIONS = [
  { value: "engineering", label: "Engineering & Technology", description: "B.Tech, B.E, M.Tech, Polytechnic Diploma" },
  { value: "medical_nursing", label: "Medical & Healthcare", description: "MBBS, BDS, B.Sc Nursing, Pharmacy, Physiotherapy" },
  { value: "management", label: "Management & Commerce", description: "MBA, BBA, Hotel Management, Chartered Accountancy (CA)" },
  { value: "it_computer", label: "Information Technology", description: "MCA, BCA, Computer Applications" },
  { value: "law_higher", label: "Law & Higher Studies", description: "LLB, LLM, Journalism, Doctoral Studies (PhD/M.Phil)" },
  { value: "other", label: "Other Professional Course", description: "Any recognized technical/professional degree in India or abroad" },
];

export default function AssessPage() {
  const router = useRouter();
  const mounted = useIsMounted();
  const { state, updateField, nextStep, prevStep, reset, isComplete } = useAssessment();

  const [error, setError] = useState<string | null>(null);
  const [phase, setPhase] = useState<"questions" | "processing">("questions");
  const [statusIndex, setStatusIndex] = useState(0);

  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      if (state.currentStep === 6 && isComplete) {
        reset();
      }
    }
  }, [state.currentStep, isComplete, reset]);

  useEffect(() => {
    if (phase !== "processing") return;
    const id = window.setInterval(() => {
      setStatusIndex((i) => Math.min(i + 1, PROCESSING_STEPS.length));
    }, 750);
    return () => window.clearInterval(id);
  }, [phase]);

  useEffect(() => {
    if (phase !== "processing" || statusIndex < PROCESSING_STEPS.length) return;
    let cancelled = false;
    const request: RecommendationRequest = {
      is_sc: state.isSC === true,
      annual_income: state.annualIncome ?? 0,
      purpose: (state.purpose ?? "business") as RecommendationRequest["purpose"],
      activity: state.activity ?? "tailoring",
      project_cost: state.projectCost ?? state.educationCost ?? 0,
      education_cost: state.educationCost ?? undefined,
      location: state.location
        ? { lat: state.location.lat, lng: state.location.lng }
        : { lat: 17.385, lng: 78.4867 },
    };
    getRecommendations(request)
      .catch(() => null)
      .then(() => {
        if (!cancelled) router.push("/results");
      });
    return () => {
      cancelled = true;
    };
  }, [phase, statusIndex, router, state]);

  const totalSteps = 6;
  const isEducation = state.purpose === "education";
  const stepOptions = isEducation ? EDUCATION_OPTIONS : BUSINESS_OPTIONS;

  const stepConfig = useMemo<Record<number, { question: string; description: string; helpText: string }>>(
    () => ({
      1: {
        question: "Are you an SC beneficiary?",
        description: "We check eligibility for schemes available to Scheduled Caste beneficiaries.",
        helpText:
          "Your SC status determines which schemes and eligibility rules may apply to you.",
      },
      2: {
        question: "What do you need support for?",
        description: "Choose the purpose that best matches what you need to finance.",
        helpText:
          "Schemes are organised by purpose — starting a business, expanding one, or education — so this helps us narrow the right set.",
      },
      3: isEducation
        ? {
            question: "What course do you intend to pursue?",
            description: "Select the course you plan to take up.",
            helpText: "Your intended course helps us match schemes designed for education financing.",
          }
        : {
            question: "What type of business?",
            description: "Select the activity you wish to pursue.",
            helpText: "Eligible activities are defined in the scheme guidelines, so this helps us match you accurately.",
          },
      4: isEducation
        ? {
            question: "What is your estimated education cost?",
            description: "Enter the total cost of your course, including fees and other expenses.",
            helpText: "Education cost is used to check the financing limits available under each scheme.",
          }
        : {
            question: "What is your estimated project cost?",
            description: "Enter the total cost of setting up or expanding your business.",
            helpText: "Project cost is used to check the financing limits and maximum loan available under each scheme.",
          },
      5: {
        question: "What is your annual family income?",
        description: "This helps us match schemes based on your family's circumstances.",
        helpText:
          "Your annual family income helps us check which schemes may be suitable for your circumstances.",
      },
      6: {
        question: "Where are you located?",
        description: "We use your location to find authorized partners near you.",
        helpText: "Authorized partners serve specific areas. Your location lets us show the nearest ones.",
      },
    }),
    [isEducation]
  );

  const validateStep = (): string | null => {
    switch (state.currentStep) {
      case 1:
        return state.isSC === null ? "Please select an option to continue." : null;
      case 2:
        return state.purpose === null
          ? "Please tell us what you need support for so we can match you correctly."
          : null;
      case 3:
        return isEducation
          ? state.course === null
            ? "Please select the course you intend to pursue."
            : null
          : state.activity === null
          ? "Please select the activity that best matches your need."
          : null;
      case 4: {
        const cost = isEducation ? state.educationCost : state.projectCost;
        if (cost === null) return "Please enter the estimated cost — for example ₹3,00,000.";
        if (cost <= 0) return "Please enter a valid amount greater than zero.";
        return null;
      }
      case 5: {
        if (state.annualIncome === null)
          return "Please enter your annual family income — for example ₹3,50,000.";
        if (state.annualIncome <= 0) return "Please enter a valid amount greater than zero.";
        return null;
      }
      case 6:
        return state.location === null ? "Please share your location. You can use your current location or search for one." : null;
      default:
        return null;
    }
  };

  const handleBack = () => {
    setError(null);
    if (state.currentStep > 1) {
      prevStep();
    } else {
      router.push("/");
    }
  };

  const handleContinue = () => {
    const validationError = validateStep();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    if (state.currentStep < totalSteps) {
      nextStep();
    } else {
      setStatusIndex(0);
      setPhase("processing");
    }
  };

  const handleRestart = () => {
    reset();
    setError(null);
    setPhase("questions");
    setStatusIndex(0);
  };

  const renderControl = () => {
    switch (state.currentStep) {
      case 1:
        return (
          <ChoiceCard
            name="assess-isSC"
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
            value={state.isSC === null ? undefined : state.isSC ? "yes" : "no"}
            onChange={(value) => {
              updateField("isSC", value === "yes");
              setError(null);
            }}
          />
        );
      case 2:
        return (
          <ChoiceCard
            name="assess-purpose"
            options={[
              { value: "business", label: "Start a business", description: "For new business activity" },
              { value: "expand_business", label: "Expand an existing business", description: "For scaling up an existing unit" },
              { value: "education", label: "Education", description: "For courses and higher education" },
            ]}
            value={state.purpose ?? undefined}
            onChange={(value) => {
              updateField("purpose", value as typeof state.purpose);
              setError(null);
            }}
          />
        );
      case 3:
        return (
          <ChoiceCard
            name="assess-activity"
            options={stepOptions}
            value={isEducation ? state.course ?? undefined : state.activity ?? undefined}
            onChange={(value) => {
              updateField("activity", value);
              if (isEducation) updateField("course", value);
              setError(null);
            }}
          />
        );
      case 4: {
        const cost = isEducation ? state.educationCost : state.projectCost;
        return (
          <CurrencyInput
            value={cost}
            onChange={(value) => updateField(isEducation ? "educationCost" : "projectCost", value)}
            placeholder="e.g. 1,40,000"
            suggestions={isEducation ? [500000, 1000000, 2000000, 4000000] : [100000, 140000, 500000, 2500000]}
          />
        );
      }
      case 5:
        return (
          <CurrencyInput
            value={state.annualIncome}
            onChange={(value) => updateField("annualIncome", value)}
            placeholder="e.g. 3,50,000"
            suggestions={[150000, 250000, 350000, 500000]}
          />
        );
      case 6:
        return (
          <LocationInput
            value={state.location}
            onChange={(value) => {
              updateField("location", value);
              setError(null);
            }}
          />
        );
      default:
        return null;
    }
  };

  if (!mounted) {
    return (
      <PageContainer maxWidth="lg">
        <div className="mx-auto w-full max-w-2xl">
          <ProgressBar value={(1 / totalSteps) * 100} />
          <div className="mt-6 rounded-[var(--radius-card)] border border-border bg-surface p-5 sm:p-8">
            <span className="text-sm font-medium text-text-secondary">Step 1 of 6</span>
            <h2 className="mt-3 text-xl font-semibold text-text-primary sm:text-2xl">
              Are you an SC beneficiary?
            </h2>
          </div>
        </div>
      </PageContainer>
    );
  }

  if (phase === "processing") {
    return (
      <PageContainer maxWidth="lg">
        <div className="pt-8 sm:pt-14">
          <ProcessingStatus steps={PROCESSING_STEPS} activeIndex={statusIndex} />
          <div className="mx-auto mt-8 w-full max-w-2xl text-center">
            <button
              type="button"
              onClick={handleRestart}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Start a fresh assessment
            </button>
          </div>
        </div>
      </PageContainer>
    );
  }

  const config = stepConfig[state.currentStep];

  return (
    <PageContainer maxWidth="lg">
      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-6">
          <ProgressBar value={(state.currentStep / totalSteps) * 100} />
        </div>

        <QuestionCard
          step={state.currentStep}
          totalSteps={totalSteps}
          question={config.question}
          description={config.description}
          helpText={config.helpText}
          error={error ?? undefined}
        >
          {renderControl()}
        </QuestionCard>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <Button
            variant="secondary"
            onClick={handleBack}
            className="w-full sm:w-auto"
            aria-label="Go back to the previous question"
          >
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
            Back
          </Button>
          <Button onClick={handleContinue} className="w-full sm:w-auto">
            {state.currentStep === totalSteps ? "Find my schemes" : "Continue"}
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}