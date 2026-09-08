import { apiClient } from "./client";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  quickActions?: string[];
}

export interface ChatRequest {
  message: string;
  conversationHistory?: ChatMessage[];
  context?: {
    schemeId?: string;
    partnerId?: string;
    assessmentData?: Record<string, unknown>;
  };
}

export interface ChatResponse {
  message: string;
  quickActions?: string[];
  relatedSchemes?: string[];
  relatedPartners?: string[];
}

export async function sendChatMessage(data: ChatRequest): Promise<ChatResponse> {
  try {
    return await apiClient.post<ChatResponse>("/api/chat", data);
  } catch {
    return {
      message:
        "I'm here to help you understand government schemes, eligibility, financing, and application steps. You can ask me about specific schemes, calculate EMIs, or find required documents.",
      quickActions: [
        "Find a scheme",
        "Check eligibility",
        "Calculate EMI",
        "Required documents",
      ],
    };
  }
}