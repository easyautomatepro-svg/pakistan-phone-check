import type { Lang } from "@/i18n/strings";
import { strings } from "@/i18n/strings";

export default function DarazCTA({ lang }: { lang: Lang }) {
  const t = strings[lang];
  return (
    <div className="mx-4 mb-4 bg-brand-surface rounded-[14px] border border-brand-border p-4">
      <p className="text-[11px] text-brand-textMuted tracking-widest font-medium">
        {t.upgrade}
      </p>
      <p className="text-[12px] text-brand-textMuted mb-3">{t.upgradeSub}</p>
      <a
        href="https://www.daraz.pk/smartphones/?spm=a2a0e.home.cate_1.1"
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center w-full h-10 leading-10 rounded-xl bg-transparent border border-brand-accent text-brand-accent text-[13px] font-semibold hover:bg-brand-accent/10 transition-colors"
      >
        {t.darazBtn}
      </a>
    </div>
  );
}
