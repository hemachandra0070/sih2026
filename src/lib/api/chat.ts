import { apiClient } from "./client";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  quickActions?: string[];
  audioUrl?: string; // Data URL for TTS audio playback
  audioLanguage?: string; // Language code, e.g. "te", "hi", "en"
  isVoice?: boolean;
}

export interface ChatRequest {
  message?: string;
  audioBase64?: string; // Raw base64 audio for speech-to-text
  audioMimeType?: string; // e.g. "audio/webm", "audio/mp4"
  conversationHistory?: ChatMessage[];
  context?: {
    schemeId?: string;
    partnerId?: string;
    assessmentData?: Record<string, unknown>;
  };
}

export interface ChatResponse {
  // Existing text fields
  message?: string;
  quickActions?: string[];
  relatedSchemes?: string[];
  relatedPartners?: string[];
  // Voice fields
  answer_text?: string;
  answer_language?: string;
  audio_base64?: string;
  transcript?: string;
  sources_used?: string[];
}

/**
 * Formats a raw base64 audio payload or data URL into a valid browser data URL.
 */
export function formatAudioDataUrl(base64?: string): string | undefined {
  if (!base64 || !base64.trim()) return undefined;
  if (base64.startsWith("data:")) return base64;
  // Detect format header or default to mp3/wav
  const mime = base64.startsWith("UklGR") ? "audio/wav" : "audio/mp3";
  return `data:${mime};base64,${base64}`;
}

/**
 * Converts a Blob to a base64 string (without the data URL prefix).
 */
export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = (reader.result as string) || "";
      const base64 = result.includes(",") ? result.split(",")[1] : result;
      resolve(base64);
    };
    reader.onerror = () => reject(new Error("Failed to read audio blob"));
    reader.readAsDataURL(blob);
  });
}

/**
 * Provides authentic Knowledge-Base answers when backend is in offline/mock mode.
 */
function getKnowledgeBaseResponse(query: string = ""): ChatResponse {
  const q = query.toLowerCase();

  if (q.includes("income") || q.includes("eligib") || q.includes("who can apply") || q.includes("criteria")) {
    return {
      message:
        "Under NSFDC eligibility criteria (revised effective Jan 7, 2026):\n\n1. Community: Applicant must belong to the Scheduled Caste (SC) community (Rule E001).\n2. Income Limit: Annual family income must not exceed ₹5,00,000 for both rural and urban areas (Rule E002).\n3. Caste Certificate: Valid SC caste certificate from a competent revenue authority (Tahsildar/SDO) is mandatory (Rule E003).\n4. Entity Types: Eligible for individuals, partnership firms (all members SC), and cooperative societies (Rules E004–E006).",
      answer_text:
        "Under NSFDC rules, applicants must belong to the Scheduled Caste community with annual family income up to ₹5 lakh across rural and urban areas. A valid SC caste certificate is required.",
      answer_language: "en",
      quickActions: ["Find a scheme", "Calculate EMI", "Required documents", "How to apply"],
    };
  }

  if (q.includes("document") || q.includes("doc") || q.includes("proof") || q.includes("paper")) {
    return {
      message:
        "Mandatory documents required to apply for NSFDC schemes:\n\n• SC Community Certificate from competent authority (Tahsildar/SDO)\n• Family Income Certificate (proving annual income ≤ ₹5,00,000)\n• Identity & Address Proof (Aadhaar, Voter ID, Ration Card)\n• Detailed Project Report (DPR) or cost estimate with machinery quotations (for business loans)\n• Course Admission Confirmation & Fee Structure schedule (for Educational Loan ELS)\n• Bank Passbook copy / Bank account statement",
      answer_text:
        "The key documents needed are your SC caste certificate, income certificate showing annual income up to ₹5 lakh, Aadhaar card, project report or admission letter, and bank account details.",
      answer_language: "en",
      quickActions: ["Find a scheme", "Calculate EMI", "How to apply"],
    };
  }

  if (q.includes("how to apply") || q.includes("apply") || q.includes("portal") || q.includes("process")) {
    return {
      message:
        "You can apply for NSFDC schemes through two modes:\n\n1. Online via PM-SURAJ: Apply on the national credit portal at https://pmsuraj.dosje.gov.in under NSFDC schemes.\n2. Offline through Channel Partners: Submit your application through your State Channelizing Agency (SCA), designated Public Sector Banks, or empanelled NBFC-MFIs and Cooperative Banks in your district.",
      answer_text:
        "You can apply online through the national PM-SURAJ portal at pmsuraj.dosje.gov.in or offline through your State Channelizing Agency and authorized bank branches.",
      answer_language: "en",
      quickActions: ["Find a scheme", "Calculate EMI", "Required documents"],
    };
  }

  if (q.includes("education") || q.includes("student") || q.includes("study") || q.includes("college") || q.includes("els")) {
    return {
      message:
        "The Educational Loan Scheme (ELS) provides loans up to ₹40 lakh (or 90% of course fee, whichever is less) at a low 6.5% beneficiary interest rate. It covers regular full-time professional/technical courses (Engineering, Medical, MBA, MCA, Law, PhD, etc.) in India or abroad, with repayment up to 10–12 years and moratorium equal to course period plus 1 year.",
      answer_text:
        "The Educational Loan Scheme provides loans up to ₹40 lakh at 6.5% interest for professional and technical courses in India or abroad, with repayment up to 12 years and moratorium of course duration plus 1 year.",
      answer_language: "en",
      quickActions: ["Calculate EMI", "Check eligibility", "Required documents"],
    };
  }

  if (q.includes("term loan") || q.includes("large") || q.includes("50 lakh") || q.includes("tl")) {
    return {
      message:
        "The Term Loan (TL) scheme supports income-generating projects from ₹1.40 lakh up to ₹50 lakh (maximum loan of ₹45 lakh, up to 90% financing). Interest rate is 8% per annum with 7-year repayment period and a 6-month moratorium (12 months for plantation/construction).",
      answer_text:
        "NSFDC Term Loan provides up to ₹45 lakh for projects up to ₹50 lakh at 8% interest with 7 years repayment and 6 months moratorium.",
      answer_language: "en",
      quickActions: ["Calculate EMI", "Check eligibility", "Find a scheme"],
    };
  }

  if (q.includes("micro") || q.includes("small") || q.includes("mfs") || q.includes("amy")) {
    return {
      message:
        "NSFDC offers two micro-credit options for small business activities (projects up to ₹1.40 lakh, max loan ₹1.25 lakh):\n\n1. Micro Finance Scheme (MFS): Channeled through State Channelizing Agencies (SCAs) at 6.5% interest with 3 years repayment.\n2. Aajeevika Micro-Finance Yojana (AMY): Fast-track credit channeled through empanelled NBFC-MFIs at 15% interest with 3 years repayment.",
      answer_text:
        "For micro-enterprises up to ₹1.40 lakh, NSFDC offers the Micro Finance Scheme at 6.5% through state agencies and Aajeevika at 15% through NBFC-MFIs.",
      answer_language: "en",
      quickActions: ["Calculate EMI", "Check eligibility", "How to apply"],
    };
  }

  return {
    message:
      "I can help you understand the 5 NSFDC government schemes for Scheduled Caste entrepreneurs and students:\n\n1. Micro Finance Scheme (MFS) — up to ₹1.25 Lakh (6.5% interest)\n2. Term Loan (TL) — up to ₹45 Lakh (8% interest)\n3. Udyam Nidhi Yojana (UNY) — up to ₹4.50 Lakh (13–15% interest)\n4. Aajeevika Micro-Finance (AMY) — up to ₹1.25 Lakh (15% interest via NBFC-MFIs)\n5. Educational Loan Scheme (ELS) — up to ₹40 Lakh (6.5% interest)\n\nAsk me about eligibility, documents, application steps, or calculate your monthly EMI.",
    answer_text:
      "I'm here to help with NSFDC schemes including Micro Finance, Term Loan, Udyam Nidhi, Aajeevika, and Educational Loans. Feel free to ask about eligibility, documents, or financing.",
    answer_language: "en",
    quickActions: ["Find a scheme", "Check eligibility", "Calculate EMI", "Required documents"],
  };
}

export async function sendChatMessage(data: ChatRequest): Promise<ChatResponse> {
  try {
    return await apiClient.post<ChatResponse>("/api/chat", data);
  } catch {
    return getKnowledgeBaseResponse(data.message);
  }
}

export async function sendAudioMessage(
  audio: Blob,
  conversationHistory?: ChatMessage[],
  context?: ChatRequest["context"]
): Promise<ChatResponse> {
  try {
    const audioBase64 = await blobToBase64(audio);
    const audioMimeType = audio.type || "audio/webm";

    return await apiClient.post<ChatResponse>("/api/chat", {
      audioBase64,
      audioMimeType,
      conversationHistory,
      context,
    });
  } catch {
    const response = getKnowledgeBaseResponse();
    return {
      ...response,
      transcript: "Voice question about government schemes",
    };
  }
}