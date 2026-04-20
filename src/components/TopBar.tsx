import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/context/LanguageContext";
import { strings } from "@/i18n/strings";

export default function TopBar() {
  const { lang, toggleLang } = useLanguage();
  const t = strings[lang];

  return (
    <header className="sticky top-0 z-50 bg-brand-surface border-b border-brand-border h-14 px-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden>
          <path
            d="M16 2 L28 9 L28 23 L16 30 L4 23 L4 9 Z"
            stroke="#00A651"
            strokeWidth="2.2"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M10 18 Q16 10 22 18"
            stroke="#00A651"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="16" cy="20" r="1.8" fill="#00A651" />
        </svg>
        <span className="font-bold text-brand-textPrimary text-[16px] tracking-tight">
          5GCheck<span className="text-brand-primary">.pk</span>
        </span>
      </Link>

      <button
        onClick={toggleLang}
        className="rounded-full px-3 py-1 text-xs font-medium text-brand-textSecondary bg-brand-surfaceAlt border border-brand-border hover:border-brand-primary hover:text-brand-primary transition-all duration-150"
        aria-label="Toggle language"
      >
        {t.langToggle} / {lang === "en" ? "EN" : "UR"}
      </button>
    </header>
  );
}
