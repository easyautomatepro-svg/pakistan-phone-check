import { createContext, useContext, useState, type ReactNode } from "react";
import type { Lang } from "@/i18n/strings";

interface Ctx {
  lang: Lang;
  toggleLang: () => void;
  isRtl: boolean;
}

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const value: Ctx = {
    lang,
    toggleLang: () => setLang((l) => (l === "en" ? "ur" : "en")),
    isRtl: lang === "ur",
  };
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): Ctx {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
