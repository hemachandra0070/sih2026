export interface SchemeDetail {
  schemeId: string;
  description: string;
  eligibility: string[];
  documents: { name: string; mandatory: boolean; note?: string }[];
  howToApply: string[];
  sources: string[];
}

export const mockSchemeDetails: Record<string, SchemeDetail> = {
  "NSFDC-MFS": {
    schemeId: "NSFDC-MFS",
    description:
      "Micro-credit for small business and income-generating self-employment activities for eligible Scheduled Caste beneficiaries. Implemented through State Channelizing Agencies (SCAs) and Channelizing Agencies (CAs) with a project cost ceiling of ₹1.40 lakh and maximum loan amount of ₹1.25 lakh.",
    eligibility: [
      "Community: Applicant must belong to the Scheduled Caste (SC) community (Rule E001).",
      "Income Ceiling: Annual family income must not exceed ₹5,00,000 for both rural and urban areas (Rule E002; revised effective Jan 7, 2026).",
      "Caste Verification: Valid SC certificate issued by a competent government authority (Rule E003).",
      "Entity Type: Eligible for individuals, or SC self-help groups / partnership firms where all members are SC with income ≤ ₹5 lakh (Rules E004–E006).",
      "Project Limit: Total project cost up to ₹1.40 lakh; loan amount up to ₹1.25 lakh (90% financing).",
    ],
    documents: [
      { name: "Filled application form with passport-size photograph", mandatory: true },
      { name: "SC Community Certificate from competent authority (Tahsildar / SDO)", mandatory: true },
      { name: "Family Income Certificate (proving annual income ≤ ₹5,00,000)", mandatory: true },
      { name: "Identity & Address Proof (Aadhaar Card, Voter ID, or Ration Card)", mandatory: true },
      { name: "Brief project proposal / activity cost estimate", mandatory: true },
      { name: "Bank account details (Passbook copy or cancelled cheque)", mandatory: false },
    ],
    howToApply: [
      "Apply online directly on the national PM-SURAJ portal (https://pmsuraj.dosje.gov.in) under NSFDC credit schemes.",
      "Alternatively, submit an application offline through your State Channelizing Agency (SCA) or local CA branch.",
      "The agency verifies your SC caste certificate, income proof, and activity feasibility.",
      "Upon verification and sanction, loan funds are disbursed with a low 6.5% interest rate to the beneficiary.",
    ],
    sources: [
      "NSFDC Current Credit/Loan Schemes (https://nsfdc.nic.in/scheme)",
      "NSFDC Eligibility Requirements & FAQs (https://nsfdc.nic.in/faqs)",
      "PM-SURAJ National Portal (https://pmsuraj.dosje.gov.in)",
    ],
  },
  "NSFDC-TL": {
    schemeId: "NSFDC-TL",
    description:
      "Term loan financing designed to support larger income-generating projects and enterprise establishment/expansion for Scheduled Caste entrepreneurs. Covers project costs from ₹1.40 lakh up to ₹50 lakh (maximum loan of ₹45 lakh) with repayment up to 7 years.",
    eligibility: [
      "Community: Applicant must belong to the Scheduled Caste (SC) community (Rule E001).",
      "Income Ceiling: Annual family income must not exceed ₹5,00,000 for both rural and urban areas (Rule E002; revised effective Jan 7, 2026).",
      "Caste Verification: Valid SC certificate issued by a competent government authority (Rule E003).",
      "Project Cost: Project cost must be above ₹1.40 lakh and up to ₹50 lakh. Loan assistance up to 90% (max ₹45 lakh).",
      "Eligible Activities: Activity must fall under Agricultural & Allied, Small Industries, or Service & Transport sectors.",
      "Moratorium: Includes 6-month moratorium (extended up to 12 months for plantation and construction activities).",
    ],
    documents: [
      { name: "Filled Term Loan application form with passport-size photograph", mandatory: true },
      { name: "SC Community Certificate from competent authority", mandatory: true },
      { name: "Income Certificate (annual family income ≤ ₹5,00,000)", mandatory: true },
      { name: "Detailed Project Report (DPR) with technical & financial feasibility", mandatory: true },
      { name: "Proforma invoices / quotations for machinery, equipment or vehicles", mandatory: true },
      { name: "Identity & Address Proof (Aadhaar / Voter ID / Ration Card)", mandatory: true },
      { name: "Business registration / Udyam registration / statutory permits (if applicable)", mandatory: false },
      { name: "Bank statement (last 6 months)", mandatory: false },
    ],
    howToApply: [
      "Submit application on the official PM-SURAJ portal or through your designated State Channelizing Agency (SCA).",
      "Submit the DPR and machinery quotations along with required identity and eligibility proofs.",
      "Techno-economic appraisal is conducted by the SCA / Channelizing Agency.",
      "NSFDC sanctions refinance assistance at 4% to the agency, which disburses to the beneficiary at 8% interest per annum.",
    ],
    sources: [
      "NSFDC Current Credit/Loan Schemes (https://nsfdc.nic.in/scheme)",
      "NSFDC Indicative Activities Taxonomy (https://nsfdc.nic.in/indicative-activities)",
      "PIB Press Release: Provision of loans to SC entrepreneurs (PRID: 2223171)",
    ],
  },
  "NSFDC-AMY": {
    schemeId: "NSFDC-AMY",
    description:
      "Aajeevika Micro-Finance Yojana provides prompt and need-based micro-finance through selected NBFC-MFIs for small and micro business activities. Offers fast-track credit up to ₹1.25 lakh with 90% financing.",
    eligibility: [
      "Community: Applicant must belong to the Scheduled Caste (SC) community (Rule E001).",
      "Income Ceiling: Annual family income must not exceed ₹5,00,000 (Rule E002).",
      "Caste Verification: Valid SC certificate from a competent authority (Rule E003).",
      "Project Cost: Total project cost up to ₹1.40 lakh with maximum loan amount of ₹1.25 lakh.",
      "Channel Partner: Channeled through selected and empanelled NBFC-MFIs.",
    ],
    documents: [
      { name: "Filled AMY application form with photograph", mandatory: true },
      { name: "SC Caste Certificate from competent authority", mandatory: true },
      { name: "Income Certificate (annual family income ≤ ₹5,00,000)", mandatory: true },
      { name: "Activity description and cost breakdown", mandatory: true },
      { name: "Aadhaar Card and address proof", mandatory: true },
      { name: "Bank passbook copy or account details", mandatory: false },
    ],
    howToApply: [
      "Contact an authorized empanelled NBFC-MFI partner in your district or apply via PM-SURAJ.",
      "Submit simple application with KYC and SC certificate.",
      "Fast-track appraisal and verification by the NBFC-MFI field officers.",
      "Prompt loan sanction and disbursement with 3-year repayment and 3-month moratorium.",
    ],
    sources: [
      "NSFDC Current Scheme Master (https://nsfdc.nic.in/scheme)",
      "NSFDC NBFC-MFI Lending Policy (Ver-3)",
      "NSFDC Channel Partners Directory (https://nsfdc.nic.in/our-channel-partners)",
    ],
  },
  "NSFDC-UNY": {
    schemeId: "NSFDC-UNY",
    description:
      "Udyam Nidhi Yojana supports small and micro activities for SC beneficiaries, channeled through Cooperative Banks, Cooperative Societies, and Small Finance Banks (SFBs). Covers projects up to ₹5 lakh with up to ₹4.5 lakh loan assistance.",
    eligibility: [
      "Community: Applicant must belong to the Scheduled Caste (SC) community (Rule E001).",
      "Income Ceiling: Annual family income must not exceed ₹5,00,000 (Rule E002).",
      "Caste Verification: Valid SC certificate from a competent authority (Rule E003).",
      "Project Limit: Project cost up to ₹5,00,000; loan amount up to ₹4,50,000 (90% financing).",
      "Repayment: 5 years tenure including 3 months moratorium. Beneficiary rate: 13% through Co-op Banks/Societies, 15% through SFBs.",
    ],
    documents: [
      { name: "Filled UNY application form with photograph", mandatory: true },
      { name: "SC Community Certificate", mandatory: true },
      { name: "Family Income Certificate (≤ ₹5,00,000)", mandatory: true },
      { name: "Business / activity plan and itemized cost estimate", mandatory: true },
      { name: "Identity & Residence Proof (Aadhaar / Voter ID)", mandatory: true },
      { name: "Account details with the channelizing Cooperative Bank / SFB", mandatory: false },
    ],
    howToApply: [
      "Visit an authorized Cooperative Bank, Cooperative Society, or Small Finance Bank in your area.",
      "Submit application with project details and KYC proofs.",
      "Partner institution appraises the small/micro activity proposal.",
      "Loan disbursed in quarterly/half-yearly installments with 5-year repayment period.",
    ],
    sources: [
      "NSFDC Scheme Guidelines — Udyam Nidhi Yojana (https://nsfdc.nic.in/scheme)",
      "NSFDC Channel Partners Directory (https://nsfdc.nic.in/our-channel-partners)",
      "Cooperative Bank & SFB Lending Norms",
    ],
  },
  "NSFDC-ELS": {
    schemeId: "NSFDC-ELS",
    description:
      "Educational Loan Scheme provides financial assistance to eligible Scheduled Caste students pursuing recognized full-time professional and technical courses in India or abroad. Covers up to ₹40 lakh or 90% of course fee at a low 6.5% interest rate.",
    eligibility: [
      "Community: Student must belong to the Scheduled Caste (SC) community (Rule E001).",
      "Income Ceiling: Annual family income must not exceed ₹5,00,000 (Rule E002).",
      "Caste Verification: Valid SC certificate from a competent authority (Rule E003).",
      "Course Coverage: Admitted to recognized full-time professional/technical courses (Engineering, Medical, MBA, Pharmacy, Architecture, Law, CA/CS, PhD, etc.).",
      "Financing Limit: Maximum loan of ₹40,00,000 or 90% of course fee (whichever is less).",
      "Moratorium & Repayment: Repayment up to 10–12 years; moratorium period equals entire course duration plus 1 year.",
    ],
    documents: [
      { name: "Filled ELS application form with student & guardian photographs", mandatory: true },
      { name: "SC Community Certificate of the student/applicant", mandatory: true },
      { name: "Family Income Certificate (annual family income ≤ ₹5,00,000)", mandatory: true },
      { name: "Official admission confirmation letter from recognized institution/university", mandatory: true },
      { name: "Detailed course fee breakdown schedule from college/university", mandatory: true },
      { name: "Academic mark sheets & qualifying examination scores (10th, 12th, Degree)", mandatory: true },
      { name: "Valid Passport & Visa (for study abroad courses)", mandatory: false },
      { name: "Identity & Address Proof of student and parent/guarantor", mandatory: true },
    ],
    howToApply: [
      "Apply online via the PM-SURAJ portal or approach a State Channelizing Agency / participating bank under ELS refinance.",
      "Upload admission letter, fee structure schedule, and caste/income certificates.",
      "The agency verifies the student's admission status and accredited course recognition.",
      "Sanctioned loan funds are disbursed directly to the educational institution in installments according to the fee schedule.",
    ],
    sources: [
      "NSFDC Current Scheme Master — ELS Section (https://nsfdc.nic.in/scheme)",
      "ELS Refinance Policy for Banks (https://nsfdc.nic.in/storage/uploads-file/media/20260731_122156_6-1-2.pdf)",
      "PIB Press Release: Educational Loan assistance for SC students",
    ],
  },
};

// Aliasing legacy NSFDC-MF key
mockSchemeDetails["NSFDC-MF"] = mockSchemeDetails["NSFDC-MFS"];

export function getSchemeDetailById(id: string): SchemeDetail | undefined {
  const normalized = id === "NSFDC-MF" ? "NSFDC-MFS" : id;
  return mockSchemeDetails[normalized] || mockSchemeDetails[id];
}