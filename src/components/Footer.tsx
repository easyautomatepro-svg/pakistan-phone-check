import type { Lang } from "@/i18n/strings";
import { strings } from "@/i18n/strings";

export default function Footer({ lang }: { lang: Lang }) {
  const t = strings[lang];
  return (
    <footer className="bg-[#060E1A] border-t border-brand-border px-4 py-4">
      <div className="flex justify-between items-center mb-3">
        <span className="text-[12px] font-semibold text-brand-accent">5GCheck.pk</span>
        <div className="flex gap-4">
          {t.footerLinks.map((l) => (
            <a key={l} href="#" className="text-[11px] text-brand-textMuted hover:text-brand-textSecondary">
              {l}
            </a>
          ))}
        </div>
      </div>
      <p className="text-[10px] text-[#2E4A6A] text-center leading-relaxed">
        {t.footerNote}
      </p>
    </footer>
  );
}
