export type SupportedLanguage = "en" | "hi" | "te";

export interface LocalizedText {
  en: string;
  hi?: string;
  te?: string;
}

export type QuestionType =
  | "single_select"
  | "multi_select"
  | "yes_no_unknown"
  | "currency"
  | "income_range"
  | "search_select"
  | "location"
  | "text";

export interface QuestionOption {
  value: string;
  label: LocalizedText;
  description?: LocalizedText;
  icon?: string;
  badge?: LocalizedText;
  category?: string;
}

export interface QuestionDefinition {
  id: string;
  title: LocalizedText;
  subtitle?: LocalizedText;
  helpText?: LocalizedText;
  helpTitle?: LocalizedText;
  type: QuestionType;
  options?: QuestionOption[];
  placeholder?: LocalizedText;
  allowUnknown?: boolean;
  unknownLabel?: LocalizedText;
  required?: boolean;
  suggestions?: number[];
  dependsOn?: (answers: AssessmentAnswers) => boolean;
  category: "intent" | "profile" | "activity" | "finance" | "assets" | "loans" | "location";
  metadata?: Record<string, unknown>;
}

export type AssessmentAnswers = Record<string, any>;

/**
 * Helper to resolve localized text according to active language, falling back to English.
 */
export function getLocalized(text: LocalizedText | undefined, lang: SupportedLanguage = "en"): string {
  if (!text) return "";
  return text[lang] || text.en || "";
}
