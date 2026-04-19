import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSearch from "@/components/HeroSearch";
import ResultCard, { type PhoneResult } from "@/components/ResultCard";
import PackagesRow from "@/components/PackagesRow";
import DarazCTA from "@/components/DarazCTA";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import phones from "@/data/phones.json";
import { strings, type Lang } from "@/i18n/strings";
import { checkCompatibilityAI } from "@/services/gemini";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "5GCheck.pk — Pakistan's 5G Phone Compatibility Checker" },
      {
        name: "description",
        content:
          "Instantly check if your phone supports 5G on Jazz, Zong & Ufone in Pakistan. Free compatibility checker with band-level details.",
      },
      { property: "og:title", content: "5GCheck.pk — 5G Phone Compatibility for Pakistan" },
      {
        property: "og:description",
        content: "Check Jazz, Zong & Ufone 5G compatibility for any phone instantly.",
      },
    ],
  }),
});

function Index() {
  const [lang, setLang] = useState<Lang>("en");
  const [result, setResult] = useState<PhoneResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    const q = query.trim();
    if (!q) return;
    setError(null);

    // Try AI first (no-op placeholder for now)
    await checkCompatibilityAI(q);

    const match = (phones as PhoneResult[]).find((p) =>
      p.name.toLowerCase().includes(q.toLowerCase()),
    );
    if (match) {
      setResult(match);
    } else {
      setResult(null);
      setError(strings[lang].notFound);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg">
      <div className="mx-auto max-w-[480px] bg-brand-bg min-h-screen flex flex-col">
        <Navbar lang={lang} onToggleLang={() => setLang(lang === "en" ? "ur" : "en")} />
        <HeroSearch lang={lang} onSearch={handleSearch} />

        {error && (
          <div className="mx-4 mb-4 p-3 rounded-xl bg-status-noBg border border-status-no/30 text-[13px] text-status-no text-center">
            {error}
          </div>
        )}

        {result && (
          <>
            <ResultCard lang={lang} phone={result} />
            <PackagesRow lang={lang} />
            <DarazCTA lang={lang} />
          </>
        )}

        {!result && <HowItWorks lang={lang} />}

        <div className="flex-1" />
        <Footer lang={lang} />
      </div>
    </div>
  );
}
