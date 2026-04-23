import { createFileRoute } from "@tanstack/react-router";
import AppLayout from "@/components/AppLayout";
import { useLanguage } from "@/context/LanguageContext";
import { strings } from "@/i18n/strings";

export const Route = createFileRoute("/speedtest")({
  head: () => ({
    meta: [
      { title: "5G Speed Test — Pakistan | 5GCheck.pk" },
      { name: "description", content: "Test your real 5G download, upload and ping speed across Jazz, Zong and Ufone." },
      { property: "og:title", content: "5G Speed Test — Pakistan" },
      { property: "og:description", content: "Measure your real 5G performance on Pakistani carriers." },
    ],
  }),
  component: SpeedTestPage,
});

function SpeedTestPage() {
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
            background: "#FEF2F2",
            color: "#DC2626",
          }}
        >
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2L4 14h7l-1 8 10-12h-7l1-8z" />
          </svg>
        </div>

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
          {t.speedTitle}
        </h1>
        <p
          className="mt-3 max-w-[320px]"
          style={{ fontSize: 14, color: "#6B6B68", lineHeight: 1.6 }}
        >
          {t.speedSub}
        </p>

        <a
          href="https://pakspeed.pk"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 btn-press inline-block"
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
          {t.speedBtn}
        </a>
      </div>
    </AppLayout>
  );
}
