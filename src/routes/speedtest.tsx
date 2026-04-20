import { createFileRoute } from "@tanstack/react-router";
import AppLayout from "@/components/AppLayout";
import { useLanguage } from "@/context/LanguageContext";
import { strings } from "@/i18n/strings";

export const Route = createFileRoute("/speedtest")({
  component: SpeedTestPage,
  head: () => ({
    meta: [
      { title: "5G Speed Test — Pakistan | 5GCheck.pk" },
      { name: "description", content: "Test your real 5G speed in Pakistan. Powered by our network partner." },
      { property: "og:title", content: "5G Speed Test for Pakistan" },
      { property: "og:description", content: "Test your real 5G speed in Pakistan." },
    ],
  }),
});

function SpeedTestPage() {
  const { lang } = useLanguage();
  const t = strings[lang];

  return (
    <AppLayout>
      <div className="px-4 pt-12 flex flex-col items-center text-center">
        <div className="w-[100px] h-[100px] rounded-3xl bg-brand-primaryLight flex items-center justify-center">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#00A651" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2 L4 14 H11 L10 22 L20 10 H13 Z" />
          </svg>
        </div>
        <h1 className="text-[20px] font-bold text-brand-textPrimary mt-6">{t.speedTitle}</h1>
        <p className="text-[14px] text-brand-textMuted text-center mt-3 max-w-[320px] leading-relaxed">
          {t.speedSub}
        </p>
        <a
          href="https://pakspeed.pk"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-brand-primary text-white w-full max-w-[280px] h-12 rounded-xl mt-6 font-semibold text-[14px] hover:bg-brand-primaryDark transition-colors duration-150 btn-press flex items-center justify-center"
        >
          {t.speedBtn}
        </a>
      </div>
    </AppLayout>
  );
}
