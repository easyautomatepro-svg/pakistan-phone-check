import { createFileRoute } from "@tanstack/react-router";
import AppLayout from "@/components/AppLayout";
import { useLanguage } from "@/context/LanguageContext";
import { strings } from "@/i18n/strings";

export const Route = createFileRoute("/coverage")({
  component: CoveragePage,
  head: () => ({
    meta: [
      { title: "5G Coverage Map — Coming Soon | 5GCheck.pk" },
      { name: "description", content: "Pakistan's first crowdsourced 5G coverage map. Coming soon." },
      { property: "og:title", content: "5G Coverage Map for Pakistan" },
      { property: "og:description", content: "Crowdsourced 5G coverage map — coming soon." },
    ],
  }),
});

function CoveragePage() {
  const { lang } = useLanguage();
  const t = strings[lang];

  return (
    <AppLayout>
      <div className="px-4 pt-10 flex flex-col items-center text-center">
        {/* Pakistan map outline (simplified) */}
        <svg width="220" height="220" viewBox="0 0 240 240" fill="none" style={{ opacity: 0.35 }} aria-hidden>
          <path
            d="M60 50 L100 35 L140 40 L170 30 L200 55 L195 95 L210 130 L185 165 L165 175 L150 200 L120 210 L95 195 L75 200 L55 175 L40 145 L50 110 L40 80 Z"
            stroke="#00A651"
            strokeWidth="2.5"
            strokeLinejoin="round"
            fill="none"
          />
          <circle cx="115" cy="100" r="4" fill="#00A651" />
          <circle cx="145" cy="130" r="4" fill="#00A651" />
          <circle cx="90" cy="160" r="4" fill="#00A651" />
        </svg>

        <h1 className="text-[20px] font-bold text-brand-textPrimary mt-2">{t.coverageTitle}</h1>
        <p className="text-[14px] text-brand-textMuted text-center mt-3 max-w-[320px] leading-relaxed">
          {t.coverageSub}
        </p>
        <button className="bg-brand-primary text-white w-full max-w-[280px] h-12 rounded-xl mt-6 font-semibold text-[14px] hover:bg-brand-primaryDark transition-colors duration-150 btn-press">
          {t.coverageBtn}
        </button>
      </div>
    </AppLayout>
  );
}
