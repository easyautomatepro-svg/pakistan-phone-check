import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import AppLayout from "@/components/AppLayout";
import { useLanguage } from "@/context/LanguageContext";
import { strings } from "@/i18n/strings";
import phones from "@/data/phones.json";
import { checkCompatibilityAI } from "@/services/gemini";

interface Phone {
  name: string;
  slug: string;
  brand: string;
}

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "5GCheck.pk — Pakistan's 5G Phone Compatibility Checker" },
      { name: "description", content: "Check if your phone supports Jazz, Zong & Ufone 5G in Pakistan. Free band-level compatibility check." },
    ],
  }),
});

function HomePage() {
  const { lang, isRtl } = useLanguage();
  const t = strings[lang];
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const suggestions = useMemo(() => {
    if (query.length < 2) return [];
    const q = query.toLowerCase();
    return (phones as Phone[]).filter((p) => p.name.toLowerCase().includes(q)).slice(0, 5);
  }, [query]);

  const phoneCount = (phones as Phone[]).length;

  const handleSearch = async (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    setError(null);
    await checkCompatibilityAI(trimmed);
    const match = (phones as Phone[]).find((p) =>
      p.name.toLowerCase().includes(trimmed.toLowerCase()),
    );
    if (match) {
      navigate({ to: "/result/$slug", params: { slug: match.slug } });
    } else {
      setError(t.notFound);
    }
  };

  const handlePick = (slug: string) => {
    setFocused(false);
    navigate({ to: "/result/$slug", params: { slug } });
  };

  return (
    <AppLayout>
      {/* HERO */}
      <section className="px-4 pt-3" dir={isRtl ? "rtl" : "ltr"}>
        <div className="hero-gradient rounded-2xl p-5 relative overflow-hidden">
          {/* Decorative signal */}
          <div
            aria-hidden
            className="absolute opacity-15 pointer-events-none"
            style={{ top: -16, [isRtl ? "left" : "right"]: -16 }}
          >
            <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
              <path d="M30 110 Q80 50 130 110" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M40 100 Q80 65 120 100" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M55 90 Q80 75 105 90" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
              <circle cx="80" cy="95" r="4" fill="white" />
            </svg>
          </div>

          <p className="text-[10px] font-medium tracking-widest text-white/70 mb-2">{t.label}</p>
          <h1 className="text-[26px] leading-[1.2] font-bold text-white mb-1.5 tracking-tight">{t.h1}</h1>
          <p className="text-[13px] text-white/75 mb-5 leading-relaxed">{t.sub}</p>

          {/* Stats */}
          <div className="flex items-center gap-3 mb-5 text-[12px] text-white/85">
            <span><span className="font-bold text-white">{phoneCount}</span> {t.statPhones}</span>
            <span className="text-white/40">·</span>
            <span><span className="font-bold text-white">3</span> {t.statCarriers}</span>
            <span className="text-white/40">·</span>
            <span>Jazz · Zong · Ufone</span>
          </div>

          {/* Search */}
          <div className="relative">
            <svg
              className="absolute top-1/2 -translate-y-1/2 text-brand-textMuted pointer-events-none"
              style={{ [isRtl ? "right" : "left"]: 12 }}
              width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 150)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSearch(query); }}
              placeholder={t.placeholder}
              className="w-full h-12 rounded-xl outline-none text-[14px] text-brand-textPrimary placeholder:text-brand-textMuted bg-white/95 border-0"
              style={{ paddingLeft: isRtl ? 16 : 40, paddingRight: isRtl ? 40 : 16 }}
            />
            {focused && suggestions.length > 0 && (
              <ul className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-xl border border-brand-border z-50 overflow-hidden">
                {suggestions.map((s) => (
                  <li
                    key={s.slug}
                    onMouseDown={() => handlePick(s.slug)}
                    className="h-11 px-4 flex items-center text-[13px] text-brand-textPrimary hover:bg-brand-primaryLight cursor-pointer border-b border-brand-border last:border-0 transition-colors duration-150"
                  >
                    {s.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            onClick={() => handleSearch(query)}
            className="w-full h-12 mt-2.5 bg-white text-brand-primary font-bold text-[14px] rounded-xl border-0 hover:bg-brand-primaryLight btn-press"
          >
            {t.cta}
          </button>
        </div>

        {error && (
          <div className="mt-3 p-3 rounded-xl bg-status-noBg border border-status-noBorder text-[13px] text-status-no text-center">
            {error}
          </div>
        )}
      </section>

      {/* QUICK ACTIONS */}
      <section className="px-4 mt-5">
        <p className="text-[11px] text-brand-textMuted tracking-widest font-medium mb-3">{t.quickActions}</p>
        <div className="grid grid-cols-4 gap-3">
          <QuickAction label={t.qaMyPhone} onClick={() => inputRef.current?.focus()} icon={<PhoneIcon />} />
          <QuickAction label={t.qaPackages} onClick={() => navigate({ to: "/packages" })} icon={<SimIconLg />} />
          <QuickAction label={t.qaCoverage} onClick={() => navigate({ to: "/coverage" })} icon={<MapIcon />} />
          <QuickAction label={t.qaSpeedTest} onClick={() => navigate({ to: "/speedtest" })} icon={<BoltIconLg />} />
        </div>
      </section>

      {/* WHY BANDS MATTER */}
      <section className="px-4 mt-6">
        <p className="text-[11px] text-brand-textMuted tracking-widest font-medium mb-3">{t.whyTitle}</p>
        <div className="flex flex-col gap-3">
          <WhyCard icon={<BarsIcon />} title={t.why1Title} body={t.why1Desc} />
          <WhyCard icon={<TowerIcon />} title={t.why2Title} body={t.why2Desc} />
          <WhyCard icon={<ShieldCheckIcon />} title={t.why3Title} body={t.why3Desc} />
        </div>
      </section>
    </AppLayout>
  );
}

function QuickAction({ label, onClick, icon }: { label: string; onClick: () => void; icon: React.ReactNode }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-2 group">
      <div className="w-14 h-14 bg-white border border-brand-border rounded-2xl flex items-center justify-center text-brand-primary group-hover:bg-brand-primaryLight group-hover:border-brand-primary transition-all duration-150 btn-press">
        {icon}
      </div>
      <span className="text-[11px] font-medium text-brand-textSecondary text-center leading-tight">{label}</span>
    </button>
  );
}

function WhyCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="bg-white border border-brand-border rounded-2xl p-4 flex gap-3">
      <div className="w-10 h-10 shrink-0 bg-brand-primaryLight rounded-xl flex items-center justify-center text-brand-primary">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="text-[14px] font-semibold text-brand-textPrimary leading-snug">{title}</h3>
        <p className="text-[13px] text-brand-textSecondary mt-1 leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

/* Icons */
const PhoneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="2" width="12" height="20" rx="3" /><line x1="11" y1="18" x2="13" y2="18" />
  </svg>
);
const SimIconLg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 3 H15 L20 8 V20 a1 1 0 0 1 -1 1 H7 a1 1 0 0 1 -1 -1 V4 a1 1 0 0 1 1 -1 Z" />
    <rect x="9" y="11" width="8" height="6" rx="1" />
  </svg>
);
const MapIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22 s-7 -7.5 -7 -13 a7 7 0 0 1 14 0 c0 5.5 -7 13 -7 13 Z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);
const BoltIconLg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2 L4 14 H11 L10 22 L20 10 H13 Z" />
  </svg>
);
const BarsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="5" y1="20" x2="5" y2="16" /><line x1="10" y1="20" x2="10" y2="13" /><line x1="15" y1="20" x2="15" y2="9" /><line x1="20" y1="20" x2="20" y2="5" />
  </svg>
);
const TowerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 4 Q12 -2 19 4" /><path d="M7 7 Q12 3 17 7" /><line x1="12" y1="9" x2="12" y2="22" /><path d="M9 22 L12 14 L15 22" />
  </svg>
);
const ShieldCheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2 L20 5 V12 c0 5 -4 8 -8 10 c-4 -2 -8 -5 -8 -10 V5 Z" /><path d="M9 12 L11 14 L15 10" />
  </svg>
);
