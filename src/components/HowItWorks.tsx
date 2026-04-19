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
    <section className="bg-brand-bg px-4 py-6">
      <p className="text-[11px] text-brand-textMuted tracking-widest mb-4">{t.how}</p>
      <div className="flex flex-col gap-3">
        {steps.map((s) => (
          <div key={s.n} className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#001A08] border border-brand-accent/25 shrink-0 flex items-center justify-center">
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
