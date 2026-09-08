export interface SchemeDetail {
  schemeId: string;
  description: string;
  eligibility: string[];
  documents: { name: string; mandatory: boolean; note?: string }[];
  howToApply: string[];
  sources: string[];
}

export const mockSchemeDetails: Record<string, SchemeDetail> = {
  "NSFDC-TL": {
    schemeId: "NSFDC-TL",
    description:
      "Term financing designed to help you establish or expand a micro, small or medium enterprise. The loan supports fixed capital like machinery, equipment, and working capital, with repayment spread over a longer period.",
    eligibility: [
      "The applicant belongs to a Scheduled Caste (SC) community.",
      "Annual family income is within the limit applicable for NSFDC schemes.",
      "The project is viable and to be set up in a qualified enterprise category.",
      "The activity is included in the list of eligible activities under the scheme.",
    ],
    documents: [
      { name: "Filled application form with photograph", mandatory: true },
      { name: "SC caste certificate", mandatory: true },
      { name: "Income certificate", mandatory: true },
      { name: "Project report with cost estimate", mandatory: true },
      { name: "Address proof (Aadhaar / Voter ID / Ration card)", mandatory: true },
      { name: "Bank account details", mandatory: false },
      { name: "Existing business registration (for expansion)", mandatory: false },
    ],
    howToApply: [
      "Contact an authorized channel partner or bank branch near you.",
      "Submit the filled application along with the required documents.",
      "The partner verifies your details and the project estimate.",
      "The application is forwarded for sanction and disbursement upon approval.",
    ],
    sources: [
      "NSFDC — Scheme Guidelines",
      "Official Gazette notification for the scheme",
      "Authorized channel partner institution",
    ],
  },
  "NSFDC-MF": {
    schemeId: "NSFDC-MF",
    description:
      "Tiny loans for household-level income generating activities such as tailoring, food processing, handicrafts and small retail. Intended for low-cost projects with minimal collateral requirements.",
    eligibility: [
      "The applicant belongs to a Scheduled Caste (SC) community.",
      "Annual family income is within the limit applicable for NSFDC schemes.",
      "The activity is included in the list of eligible micro activities.",
      "The project cost is within the scheme limit.",
    ],
    documents: [
      { name: "Filled application form with photograph", mandatory: true },
      { name: "SC caste certificate", mandatory: true },
      { name: "Income certificate", mandatory: true },
      { name: "Brief activity / project description", mandatory: true },
      { name: "Address proof", mandatory: true },
      { name: "Bank account details", mandatory: false },
    ],
    howToApply: [
      "Approach an authorized partner near your location.",
      "Submit the application form with the required documents.",
      "The partner carries out verification of the activity and documents.",
      "After approval the loan is sanctioned and disbursed.",
    ],
    sources: [
      "NSFDC — Scheme Guidelines",
      "Authorized channel partner institution",
    ],
  },
  "NSFDC-AMY": {
    schemeId: "NSFDC-AMY",
    description:
      "A micro-finance scheme focused on women beneficiaries taking up small income generating activities. Supports low-cost ventures with a simple application process.",
    eligibility: [
      "The applicant is a Scheduled Caste (SC) woman.",
      "Annual family income is within the limit applicable for NSFDC schemes.",
      "The activity is taken up by the beneficiary herself.",
      "The project cost is within the scheme limit.",
    ],
    documents: [
      { name: "Filled application form with photograph", mandatory: true },
      { name: "SC caste certificate", mandatory: true },
      { name: "Income certificate", mandatory: true },
      { name: "Activity / project description", mandatory: true },
      { name: "Address proof", mandatory: true },
      { name: "Bank account details", mandatory: false },
    ],
    howToApply: [
      "Contact an authorized partner dealing with the scheme.",
      "Submit the application with the project details.",
      "The partner verifies your eligibility and activity.",
      "Upon approval, the loan amount is disbursed to your account.",
    ],
    sources: [
      "NSFDC — Scheme Guidelines",
      "Authorized channel partner institution",
    ],
  },
  "NSFDC-UNY": {
    schemeId: "NSFDC-UNY",
    description:
      "Larger financing for entrepreneurs looking to establish a new enterprise or modernize an existing one. Supports higher-value projects with extended repayment periods.",
    eligibility: [
      "The applicant is an SC entrepreneur.",
      "Annual family income is within the limit applicable for NSFDC schemes.",
      "The project is a qualified enterprise with a techno-economic feasibility.",
      "The activity is included in the list of eligible activities.",
    ],
    documents: [
      { name: "Filled application form with photograph", mandatory: true },
      { name: "SC caste certificate", mandatory: true },
      { name: "Income certificate", mandatory: true },
      { name: "Techno-economic feasibility report", mandatory: true },
      { name: "Project cost and financing plan", mandatory: true },
      { name: "Business registration and statutory approvals", mandatory: false },
    ],
    howToApply: [
      "Approach an authorized partner or bank for the enterprise loan.",
      "Submit the project report and financing plan.",
      "The partner and implementing agency assess the feasibility.",
      "On approval, funds are sanctioned and disbursed in stages.",
    ],
    sources: [
      "NSFDC — Scheme Guidelines",
      "Official Gazette notification for the scheme",
      "Authorized channel partner institution",
    ],
  },
  "NSFDC-ELS": {
    schemeId: "NSFDC-ELS",
    description:
      "Financial support to pursue higher education and professional courses. Covers tuition and allied education expenses for eligible SC students.",
    eligibility: [
      "The student belongs to a Scheduled Caste (SC) community.",
      "Annual family income is within the limit applicable for NSFDC schemes.",
      "The student has secured admission to a recognized course.",
      "The course is recognized by the relevant regulatory authority.",
    ],
    documents: [
      { name: "Filled application form with photograph", mandatory: true },
      { name: "SC caste certificate", mandatory: true },
      { name: "Income certificate of the family", mandatory: true },
      { name: "Admission letter / fee statement", mandatory: true },
      { name: "Previous academic records", mandatory: true },
      { name: "Address proof and bank account details", mandatory: false },
    ],
    howToApply: [
      "Apply to an authorized partner managing the education loan.",
      "Submit the admission documents along with the application.",
      "The partner verifies the course and fee structure.",
      "On approval, the fee is disbursed to the institution or your account.",
    ],
    sources: [
      "NSFDC — Scheme Guidelines",
      "Authorized channel partner institution",
    ],
  },
};

export function getSchemeDetailById(id: string): SchemeDetail | undefined {
  return mockSchemeDetails[id];
}