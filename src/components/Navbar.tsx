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
      className="bg-brand-surface h-14 px-4 flex items-center justify-between relative z-20"
      style={{
        borderBottom: "1px solid var(--color-brand-border)",
      }}
    >
      <div className="flex items-center gap-2">
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, #00A06C 0%, #00875A 60%, #006644 100%)",
            boxShadow: "0 4px 10px -2px rgba(0,135,90,0.45)",
          }}
          aria-hidden
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M2 9 Q12 -1 22 9"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity="0.5"
            />
            <path
              d="M5 12 Q12 4 19 12"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity="0.8"
            />
            <circle cx="12" cy="17" r="2" fill="white" />
          </svg>
        </div>
        <span className="font-bold text-brand-textPrimary text-[16px] tracking-tight">
          5GCheck<span className="text-brand-accent">.pk</span>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleLang}
          className="rounded-full px-3 py-1.5 text-[12px] font-medium text-brand-textSecondary hover:text-brand-accent hover:bg-brand-hover transition-colors"
          style={{ border: "1px solid var(--color-brand-border)" }}
        >
          {t.langToggle}
        </button>
      </div>
    </nav>
  );
}
