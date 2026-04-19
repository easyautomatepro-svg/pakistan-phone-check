import type { Lang } from "@/i18n/strings";
import { strings } from "@/i18n/strings";

export default function DarazCTA({ lang }: { lang: Lang }) {
  const t = strings[lang];
  return (
    <div
      className="mx-4 mb-4 bg-brand-surface rounded-2xl p-4 relative z-10 tile-shadow"
      style={{ border: "1px solid var(--color-brand-border)" }}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="block w-1.5 h-1.5 rounded-full bg-brand-accent" />
        <p className="text-[10px] text-brand-textMuted tracking-[0.2em] font-semibold">
          {t.upgrade}
        </p>
      </div>
      <p className="text-[13px] text-brand-textSecondary mb-3">
        {t.upgradeSub}
      </p>
      <a
        href="https://www.daraz.pk/smartphones/?spm=a2a0e.home.cate_1.1"
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center w-full h-11 leading-[44px] rounded-xl text-white text-[13px] font-bold transition-all active:scale-[0.98]"
        style={{
          background:
            "linear-gradient(135deg, #FF6A00 0%, #FF3D00 100%)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.20), 0 6px 18px -4px rgba(255,61,0,0.40)",
        }}
      >
        {t.darazBtn}
      </a>
    </div>
  );
}
