"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import type { AssessmentState } from "@/types/assessment";

const STORAGE_KEY = "sih26092-assessment";

const initialState: AssessmentState = {
  applicantType: "individual",
  isSC: null,
  annualIncome: null,
  purpose: null,
  activity: null,
  course: null,
  projectCost: null,
  educationCost: null,
  location: null,
  currentStep: 1,
};

interface AssessmentContextType {
  state: AssessmentState;
  updateField: <K extends keyof AssessmentState>(field: K, value: AssessmentState[K]) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  reset: () => void;
  isComplete: boolean;
}

const AssessmentContext = createContext<AssessmentContextType | null>(null);

function loadInitialState(): AssessmentState {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...initialState, ...parsed };
      }
    } catch {
      // Ignore parse errors
    }
  }
  return initialState;
}

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AssessmentState>(loadInitialState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage errors (e.g. private mode)
    }
  }, [state]);

  const updateField = useCallback(<K extends keyof AssessmentState,>(
    field: K,
    value: AssessmentState[K]
  ) => {
    setState((prev) => ({ ...prev, [field]: value }));
  }, []);

  const nextStep = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, 6) as AssessmentState["currentStep"],
    }));
  }, []);

  const prevStep = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 1) as AssessmentState["currentStep"],
    }));
  }, []);

  const goToStep = useCallback((step: number) => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.max(1, Math.min(step, 6)) as AssessmentState["currentStep"],
    }));
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const isComplete = state.currentStep === 6 &&
    state.isSC !== null &&
    state.purpose !== null &&
    state.activity !== null &&
    ((state.purpose === "education" && state.educationCost !== null) ||
     (state.purpose !== "education" && state.projectCost !== null)) &&
    state.annualIncome !== null &&
    state.location !== null;

  return (
    <AssessmentContext.Provider value={{ state, updateField, nextStep, prevStep, goToStep, reset, isComplete }}>
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (!context) {
    return {
      state: initialState,
      updateField: () => {},
      nextStep: () => {},
      prevStep: () => {},
      goToStep: () => {},
      reset: () => {},
      isComplete: false,
    };
  }
  return context;
}