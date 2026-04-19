import type { Lang } from "@/i18n/strings";
import { strings } from "@/i18n/strings";

export default function Footer({ lang }: { lang: Lang }) {
  const t = strings[lang];
  return (
    <footer
      className="bg-brand-surface px-4 py-5 relative z-10 mt-2"
      style={{ borderTop: "1px solid var(--color-brand-border)" }}
    >
      <div className="flex justify-between items-center mb-3">
        <span className="text-[12px] font-bold text-brand-textPrimary">
          🇵🇰 5GCheck<span className="text-brand-accent">.pk</span>
        </span>
        <div className="flex gap-4">
          {t.footerLinks.map((l) => (
            <a
              key={l}
              href="#"
              className="text-[11px] font-medium text-brand-textSecondary hover:text-brand-accent transition-colors"
            >
              {l}
            </a>
          ))}
        </div>
      </div>
      <p className="text-[10px] text-brand-textMuted text-center leading-relaxed">
        {t.footerNote}
      </p>
    </footer>
  );
}
