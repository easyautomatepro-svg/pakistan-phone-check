import type { Lang } from "@/i18n/strings";
import { strings } from "@/i18n/strings";

export default function HowItWorks({ lang }: { lang: Lang }) {
  const t = strings[lang];
  const steps = [
    {
      n: 1,
      title: t.step1Title,
      desc: t.step1Desc,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      ),
    },
    {
      n: 2,
      title: t.step2Title,
      desc: t.step2Desc,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M7 10h4M7 14h10" />
        </svg>
      ),
    },
    {
      n: 3,
      title: t.step3Title,
      desc: t.step3Desc,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
        </svg>
      ),
    },
  ];
  return (
    <section className="relative z-10 px-4 py-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[11px] text-brand-textMuted tracking-[0.2em] font-semibold">
          {t.how}
        </p>
        <span className="text-[11px] text-brand-accent font-semibold">3 steps</span>
      </div>

      <div className="flex flex-col gap-2.5">
        {steps.map((s) => (
          <div
            key={s.n}
            className="bg-brand-surface rounded-2xl p-4 flex items-center gap-3.5 tile-shadow transition-all"
            style={{ border: "1px solid var(--color-brand-border)" }}
          >
            <div
              className="w-11 h-11 rounded-xl shrink-0 flex items-center justify-center text-brand-accent"
              style={{
                background: "var(--color-brand-hover)",
                border: "1px solid rgba(0,135,90,0.18)",
              }}
            >
              {s.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-semibold text-brand-textPrimary leading-tight">
                {s.title}
              </p>
              <p className="text-[12px] text-brand-textMuted mt-0.5">
                {s.desc}
              </p>
            </div>
            <span className="text-[11px] font-bold text-brand-textMuted/60 shrink-0">
              0{s.n}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
