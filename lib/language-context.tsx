"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from "react";
import { Language, translations } from "./translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [updateKey, setUpdateKey] = useState(0);

  useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("language") as Language;
      if (saved && (saved === "en" || saved === "es")) {
        setLanguageState(saved);
      }
    }
  }, []);

  const handleSetLanguage = useCallback((lang: Language) => {
    if (lang !== language) {
      setLanguageState(lang);
      setUpdateKey(prev => prev + 1); // Force update
      if (typeof window !== "undefined") {
        localStorage.setItem("language", lang);
      }
    }
  }, [language]);

  const t = useMemo(() => translations[language], [language, updateKey]);

  const contextValue = useMemo(() => ({
    language,
    setLanguage: handleSetLanguage,
    t
  }), [language, handleSetLanguage, t]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}

