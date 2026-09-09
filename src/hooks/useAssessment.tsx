"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import type { AssessmentState } from "@/types/assessment";
import type {
  AssessmentAnswers,
  QuestionDefinition,
  SupportedLanguage,
} from "@/lib/assessment/schema";
import {
  ASSESSMENT_QUESTIONS,
  getActiveQuestions,
} from "@/lib/assessment/questions";

const STORAGE_KEY = "sih26092-assessment-v2";

const initialAnswers: AssessmentAnswers = {};

const initialState: AssessmentState = {
  // Legacy / convenience
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

  // Dynamic state
  answers: initialAnswers,
  currentQuestionId: ASSESSMENT_QUESTIONS[0].id,
  inReview: false,
  language: "en",
};

interface AssessmentContextType {
  state: AssessmentState;
  activeQuestions: QuestionDefinition[];
  currentQuestionIndex: number;
  totalQuestions: number;
  currentQuestion: QuestionDefinition | undefined;
  setAnswer: (questionId: string, value: any) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  jumpToQuestion: (questionId: string) => void;
  enterReview: () => void;
  exitReview: () => void;
  setLanguage: (lang: SupportedLanguage) => void;
  reset: () => void;
  isComplete: boolean;

  // Legacy compat
  updateField: <K extends keyof AssessmentState>(
    field: K,
    value: AssessmentState[K]
  ) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
}

const AssessmentContext = createContext<AssessmentContextType | null>(null);

function deriveLegacyFields(answers: AssessmentAnswers): Partial<AssessmentState> {
  const isSC =
    answers.is_sc === "yes"
      ? true
      : answers.is_sc === "no"
      ? false
      : null;

  let purpose: AssessmentState["purpose"] = null;
  if (answers.intent === "education") {
    purpose = "education";
  } else if (answers.intent === "expand_business") {
    purpose = "expand_business";
  } else if (
    answers.intent === "new_business" ||
    answers.intent === "equipment_vehicle" ||
    answers.intent === "unsure"
  ) {
    purpose = "business";
  }

  const activity =
    answers.activity === "other"
      ? answers.custom_activity || "other"
      : answers.activity || null;

  const course =
    answers.course === "other"
      ? answers.custom_activity || "other"
      : answers.course || null;

  let annualIncome: number | null = null;
  if (typeof answers.annual_income === "number") {
    annualIncome = answers.annual_income;
  } else if (answers.annual_income_range) {
    switch (answers.annual_income_range) {
      case "under_1l":
        annualIncome = 80000;
        break;
      case "1l_to_2l":
        annualIncome = 150000;
        break;
      case "2l_to_5l":
        annualIncome = 350000;
        break;
      case "5l_to_10l":
        annualIncome = 650000;
        break;
      case "above_10l":
        annualIncome = 1200000;
        break;
      case "unknown":
        annualIncome =
          answers.income_below_5l === "yes"
            ? 250000
            : answers.income_below_5l === "no"
            ? 600000
            : 300000;
        break;
    }
  }

  const cost =
    typeof answers.amount_needed === "number"
      ? answers.amount_needed
      : answers.amount_needed === "unknown"
      ? 140000
      : null;

  const location = answers.location || null;

  return {
    isSC,
    purpose,
    activity,
    course,
    annualIncome,
    projectCost: purpose !== "education" ? cost : null,
    educationCost: purpose === "education" ? cost : null,
    location,
  };
}

function loadInitialState(): AssessmentState {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const answers = parsed.answers || {};
        const legacy = deriveLegacyFields(answers);
        return {
          ...initialState,
          ...parsed,
          ...legacy,
          answers,
          currentQuestionId:
            parsed.currentQuestionId || ASSESSMENT_QUESTIONS[0].id,
          inReview: Boolean(parsed.inReview),
          language: parsed.language || "en",
        };
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
      // Ignore storage errors (e.g. private browsing)
    }
  }, [state]);

  const activeQuestions = useMemo(() => {
    return getActiveQuestions(state.answers);
  }, [state.answers]);

  const currentQuestionIndex = useMemo(() => {
    const idx = activeQuestions.findIndex(
      (q) => q.id === state.currentQuestionId
    );
    return idx >= 0 ? idx : 0;
  }, [activeQuestions, state.currentQuestionId]);

  const totalQuestions = activeQuestions.length;
  const currentQuestion = activeQuestions[currentQuestionIndex];

  const setAnswer = useCallback((questionId: string, value: any) => {
    setState((prev) => {
      const nextAnswers = { ...prev.answers, [questionId]: value };
      const legacy = deriveLegacyFields(nextAnswers);
      return {
        ...prev,
        answers: nextAnswers,
        ...legacy,
      };
    });
  }, []);

  const nextQuestion = useCallback(() => {
    setState((prev) => {
      const currentActive = getActiveQuestions(prev.answers);
      const idx = currentActive.findIndex(
        (q) => q.id === prev.currentQuestionId
      );
      if (idx >= 0 && idx < currentActive.length - 1) {
        const nextId = currentActive[idx + 1].id;
        const legacyStep = Math.min(
          6,
          Math.max(1, Math.round(((idx + 2) / currentActive.length) * 6))
        ) as AssessmentState["currentStep"];
        return {
          ...prev,
          currentQuestionId: nextId,
          currentStep: legacyStep,
        };
      }
      // If at last question, go to review screen
      return {
        ...prev,
        inReview: true,
      };
    });
  }, []);

  const prevQuestion = useCallback(() => {
    setState((prev) => {
      if (prev.inReview) {
        return { ...prev, inReview: false };
      }
      const currentActive = getActiveQuestions(prev.answers);
      const idx = currentActive.findIndex(
        (q) => q.id === prev.currentQuestionId
      );
      if (idx > 0) {
        const prevId = currentActive[idx - 1].id;
        const legacyStep = Math.min(
          6,
          Math.max(1, Math.round((idx / currentActive.length) * 6))
        ) as AssessmentState["currentStep"];
        return {
          ...prev,
          currentQuestionId: prevId,
          currentStep: legacyStep,
        };
      }
      return prev;
    });
  }, []);

  const jumpToQuestion = useCallback((questionId: string) => {
    setState((prev) => {
      const currentActive = getActiveQuestions(prev.answers);
      const idx = currentActive.findIndex((q) => q.id === questionId);
      const legacyStep =
        idx >= 0
          ? (Math.min(
              6,
              Math.max(1, Math.round(((idx + 1) / currentActive.length) * 6))
            ) as AssessmentState["currentStep"])
          : prev.currentStep;
      return {
        ...prev,
        currentQuestionId: questionId,
        inReview: false,
        currentStep: legacyStep,
      };
    });
  }, []);

  const enterReview = useCallback(() => {
    setState((prev) => ({ ...prev, inReview: true }));
  }, []);

  const exitReview = useCallback(() => {
    setState((prev) => ({ ...prev, inReview: false }));
  }, []);

  const setLanguage = useCallback((lang: SupportedLanguage) => {
    setState((prev) => ({ ...prev, language: lang }));
  }, []);

  const updateField = useCallback(
    <K extends keyof AssessmentState>(
      field: K,
      value: AssessmentState[K]
    ) => {
      setState((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const nextStep = useCallback(() => {
    nextQuestion();
  }, [nextQuestion]);

  const prevStep = useCallback(() => {
    prevQuestion();
  }, [prevQuestion]);

  const goToStep = useCallback(
    (step: number) => {
      const currentActive = getActiveQuestions(state.answers);
      const targetIdx = Math.min(
        currentActive.length - 1,
        Math.max(0, Math.floor(((step - 1) / 5) * (currentActive.length - 1)))
      );
      if (currentActive[targetIdx]) {
        jumpToQuestion(currentActive[targetIdx].id);
      }
    },
    [state.answers, jumpToQuestion]
  );

  const reset = useCallback(() => {
    setState({
      ...initialState,
      currentQuestionId: ASSESSMENT_QUESTIONS[0].id,
    });
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  }, []);

  const isComplete = Boolean(
    state.answers.intent &&
      state.answers.is_sc !== undefined &&
      (state.answers.activity || state.answers.course) &&
      state.answers.location
  );

  return (
    <AssessmentContext.Provider
      value={{
        state,
        activeQuestions,
        currentQuestionIndex,
        totalQuestions,
        currentQuestion,
        setAnswer,
        nextQuestion,
        prevQuestion,
        jumpToQuestion,
        enterReview,
        exitReview,
        setLanguage,
        reset,
        isComplete,
        updateField,
        nextStep,
        prevStep,
        goToStep,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (!context) {
    const defaultActive = getActiveQuestions(initialAnswers);
    return {
      state: initialState,
      activeQuestions: defaultActive,
      currentQuestionIndex: 0,
      totalQuestions: defaultActive.length,
      currentQuestion: defaultActive[0],
      setAnswer: () => {},
      nextQuestion: () => {},
      prevQuestion: () => {},
      jumpToQuestion: () => {},
      enterReview: () => {},
      exitReview: () => {},
      setLanguage: () => {},
      reset: () => {},
      isComplete: false,
      updateField: () => {},
      nextStep: () => {},
      prevStep: () => {},
      goToStep: () => {},
    };
  }
  return context;
}