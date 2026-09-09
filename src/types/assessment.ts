import type { AssessmentAnswers, SupportedLanguage } from "@/lib/assessment/schema";

export interface AssessmentState {
  // Legacy / convenience getters
  applicantType: "individual" | "student" | "business";
  isSC: boolean | null;
  annualIncome: number | null;
  purpose: "business" | "expand_business" | "education" | null;
  activity: string | null;
  course: string | null;
  projectCost: number | null;
  educationCost: number | null;
  location: {
    lat: number;
    lng: number;
    address: string;
  } | null;
  currentStep: 1 | 2 | 3 | 4 | 5 | 6;

  // Dynamic assessment state
  answers: AssessmentAnswers;
  currentQuestionId: string;
  inReview: boolean;
  language: SupportedLanguage;
}

export interface AssessmentStep {
  step: number;
  totalSteps: number;
  question: string;
  helpText?: string;
  type: "radio" | "select" | "currency" | "location";
  options?: { value: string; label: string; description?: string }[];
  required: boolean;
}

export const ASSESSMENT_STEPS: AssessmentStep[] = [
  {
    step: 1,
    totalSteps: 6,
    question: "Are you an SC beneficiary?",
    helpText: "This helps us check which schemes you may be eligible for.",
    type: "radio",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
    required: true,
  },
  {
    step: 2,
    totalSteps: 6,
    question: "What do you need support for?",
    helpText: "Select the purpose that best matches your need.",
    type: "radio",
    options: [
      { value: "business", label: "Start a business" },
      { value: "expand_business", label: "Expand an existing business" },
      { value: "education", label: "Education" },
    ],
    required: true,
  },
  {
    step: 3,
    totalSteps: 6,
    question: "What is your business activity or course?",
    helpText: "Enter your business activity (e.g., tailoring) or course name.",
    type: "select",
    options: [
      { value: "tailoring", label: "Tailoring" },
      { value: "food_processing", label: "Food Processing" },
      { value: "handicrafts", label: "Handicrafts" },
      { value: "retail", label: "Retail / Shop" },
      { value: "services", label: "Services" },
      { value: "btech", label: "B.Tech" },
      { value: "mba", label: "MBA" },
      { value: "medical", label: "Medical" },
      { value: "other", label: "Other" },
    ],
    required: true,
  },
  {
    step: 4,
    totalSteps: 6,
    question: "What is the project or education cost?",
    helpText: "Enter the total amount you need for your project or education.",
    type: "currency",
    required: true,
  },
  {
    step: 5,
    totalSteps: 6,
    question: "What is your annual family income?",
    helpText: "Your annual family income helps us check which schemes may be suitable for your circumstances.",
    type: "currency",
    required: true,
  },
  {
    step: 6,
    totalSteps: 6,
    question: "Where are you located?",
    helpText: "We use your location to find nearby authorized channel partners.",
    type: "location",
    required: true,
  },
];