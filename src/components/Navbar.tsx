import type { Lang } from "@/i18n/strings";
import { strings } from "@/i18n/strings";

interface Props {
  lang: Lang;
  onToggleLang: () => void;
}

export default function Navbar({ lang, onToggleLang }: Props) {
  const t = strings[lang];
  return (
    <nav className="bg-brand-surface border-b border-brand-border h-14 px-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#00C853" aria-hidden>
          <path d="M12 2L21 7v10l-9 5-9-5V7l9-5z" />
        </svg>
        <span className="font-bold text-brand-textPrimary text-[15px]">
          5GCheck<span className="text-brand-accent">.pk</span>
        </span>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleLang}
          className="border border-brand-hover rounded-full px-3 py-1 text-xs text-brand-textSecondary hover:bg-brand-hover transition-colors"
        >
          {t.langToggle}
        </button>
        <button aria-label="menu" className="p-1">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7DA8D4" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
