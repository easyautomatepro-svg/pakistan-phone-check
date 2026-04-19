import type { Lang } from "@/i18n/strings";
import { strings } from "@/i18n/strings";

interface Props {
  lang: Lang;
  onToggleLang: () => void;
}

export default function Navbar({ lang, onToggleLang }: Props) {
  const t = strings[lang];
  return (
    <nav
      className="bg-brand-surface h-14 px-4 flex items-center justify-between relative z-10"
      style={{
        borderBottom: "1px solid rgba(0,200,83,0.20)",
        boxShadow: "0 1px 20px rgba(0,200,83,0.08)",
      }}
    >
      <div className="flex items-center gap-2">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
          <path
            d="M14 2L25 8.5V21.5L14 28L3 21.5V8.5L14 2Z"
            fill="#00C853"
            opacity="0.15"
          />
          <path
            d="M14 2L25 8.5V21.5L14 28L3 21.5V8.5L14 2Z"
            stroke="#00C853"
            strokeWidth="1.5"
            fill="none"
          />
          <circle cx="14" cy="15" r="2.5" fill="#00C853" />
          <path
            d="M10 12 Q14 9 18 12"
            stroke="#00C853"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M8 10 Q14 6 20 10"
            stroke="#00C853"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            opacity="0.5"
          />
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
