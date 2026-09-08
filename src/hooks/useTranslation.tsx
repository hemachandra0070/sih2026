"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import enDict from "@/translations/en.json";

type Language = "en" | "hi" | "te";

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const TranslationContext = createContext<TranslationContextType | null>(null);

const translations: Record<Language, Record<string, unknown>> = {
  en: enDict as Record<string, unknown>,
  hi: {},
  te: {},
};

async function loadTranslation(lang: Language): Promise<Record<string, unknown>> {
  if (Object.keys(translations[lang]).length > 0) {
    return translations[lang];
  }
  try {
    const translationModule = await import(`@/translations/${lang}.json`);
    translations[lang] = (translationModule.default || translationModule) as Record<string, unknown>;
    return translations[lang];
  } catch {
    return enDict as Record<string, unknown>;
  }
}

function getNestedValue(obj: Record<string, unknown>, key: string): unknown {
  let current: unknown = obj;
  for (const part of key.split(".")) {
    if (current && typeof current === "object") {
      current = (current as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  return current;
}

function getInitialLanguage(): Language {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("language") as Language | null;
      if (stored && ["en", "hi", "te"].includes(stored)) {
        return stored;
      }
    } catch {
      // Ignore storage errors
    }
  }
  return "en";
}

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);
  const [dict, setDict] = useState<Record<string, unknown>>({});

  useEffect(() => {
    if (language === "en") return;

    let cancelled = false;
    loadTranslation(language).then((nextDict) => {
      if (!cancelled) {
        setDict(nextDict);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("language", lang);
    } catch {
      // Ignore storage errors
    }
  };

  const effectiveDict =
    language === "en" ? (enDict as Record<string, unknown>) : dict;

  const t = (key: string, params?: Record<string, string | number>): string => {
    let value = getNestedValue(effectiveDict, key) as string;

    if (!value) {
      value = (getNestedValue(enDict as Record<string, unknown>, key) as string) || key;
    }

    if (params && value) {
      Object.entries(params).forEach(([k, v]) => {
        value = value.replace(new RegExp(`{{${k}}}`, "g"), String(v));
      });
    }

    return value || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    return {
      language: "en" as Language,
      setLanguage: () => {},
      t: (key: string) => key,
    };
  }
  return context;
}