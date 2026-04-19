import type { Lang } from "@/i18n/strings";
import { strings } from "@/i18n/strings";

export default function HowItWorks({ lang }: { lang: Lang }) {
  const t = strings[lang];
  const steps = [
    { n: 1, title: t.step1Title, desc: t.step1Desc },
    { n: 2, title: t.step2Title, desc: t.step2Desc },
    { n: 3, title: t.step3Title, desc: t.step3Desc },
  ];
  return (
    <section className="relative z-10 px-4 py-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="block w-[2px] h-3 bg-brand-accent rounded-sm" />
        <p className="text-[11px] text-brand-textMuted tracking-widest">{t.how}</p>
      </div>
      <div className="relative flex flex-col gap-3">
        {/* Vertical dashed connector */}
        <div
          aria-hidden
          className="absolute"
          style={{
            left: 13.5,
            top: 28,
            bottom: 28,
            borderLeft: "1.5px dashed rgba(0,200,83,0.20)",
          }}
        />
        {steps.map((s) => (
          <div key={s.n} className="flex items-start gap-3 relative">
            <div
              className="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center bg-[#001A08]"
              style={{
                boxShadow:
                  "inset 0 0 8px rgba(0,200,83,0.10), 0 0 0 1px rgba(0,200,83,0.25)",
              }}
            >
              <span className="text-[13px] font-bold text-brand-accent">{s.n}</span>
            </div>
            <div>
              <p className="text-[13px] font-medium text-[#C8DCF0]">{s.title}</p>
              <p className="text-[12px] text-brand-textMuted">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
