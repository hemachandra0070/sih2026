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
    return {
      answer_text:
        "I'm here to help you understand government schemes, eligibility, financing, and application steps. You can ask me about specific schemes, calculate EMIs, or find required documents.",
      message:
        "I'm here to help you understand government schemes, eligibility, financing, and application steps. You can ask me about specific schemes, calculate EMIs, or find required documents.",
      transcript: "Voice query",
      quickActions: [
        "Find a scheme",
        "Check eligibility",
        "Calculate EMI",
        "Required documents",
      ],
    };
  }
}