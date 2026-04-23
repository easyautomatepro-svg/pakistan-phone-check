import { createFileRoute } from "@tanstack/react-router";
import AppLayout from "@/components/AppLayout";
import { useLanguage } from "@/context/LanguageContext";
import { strings } from "@/i18n/strings";

export const Route = createFileRoute("/coverage")({
  head: () => ({
    meta: [
      { title: "5G Coverage Map — Pakistan | 5GCheck.pk" },
      { name: "description", content: "Crowdsourced 5G coverage map for Jazz, Zong and Ufone across Pakistan." },
      { property: "og:title", content: "5G Coverage Map — Pakistan" },
      { property: "og:description", content: "Real 5G signal data from real users — coming soon." },
    ],
  }),
  component: CoveragePage,
});

function CoveragePage() {
  const { lang } = useLanguage();
  const t = strings[lang];

  return (
    <AppLayout>
      <div className="px-[18px] pt-12 flex flex-col items-center text-center">
        <div
          className="flex items-center justify-center mb-6"
          style={{
            width: 88,
            height: 88,
            borderRadius: 24,
            background: "#FFFBEB",
            color: "#D97706",
          }}
        >
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s-7-7.5-7-13a7 7 0 0 1 14 0 c0 5.5-7 13-7 13Z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
        </div>

        <span
          className="mb-4 uppercase"
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "#D97706",
            background: "#FFFBEB",
            border: "1px solid #FDE68A",
            borderRadius: 100,
            padding: "4px 12px",
            letterSpacing: "0.06em",
          }}
        >
          {t.coverageComingSoon}
        </span>

        <h1
          style={{
            fontFamily: "Bricolage Grotesque",
            fontWeight: 800,
            fontSize: 26,
            letterSpacing: "-0.5px",
            color: "#141413",
            lineHeight: 1.15,
          }}
        >
          {t.coverageTitle}
        </h1>
        <p
          className="mt-3 max-w-[320px]"
          style={{ fontSize: 14, color: "#6B6B68", lineHeight: 1.6 }}
        >
          {t.coverageSub}
        </p>

        <button
          className="mt-7 btn-press"
          style={{
            background: "#141413",
            color: "white",
            fontSize: 13,
            fontWeight: 700,
            padding: "12px 22px",
            borderRadius: 12,
            transition: "background 150ms ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#2A2A28")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#141413")}
        >
          {t.coverageBtn}
        </button>
      </div>
    </AppLayout>
  );
}
