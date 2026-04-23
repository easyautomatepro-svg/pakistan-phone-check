import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/context/LanguageContext";
import { strings } from "@/i18n/strings";

interface Props {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export default function TopBar({ title, showBack, onBack }: Props) {
  const { lang, toggleLang } = useLanguage();
  const t = strings[lang];

  return (
    <header
      className="sticky top-0 z-50 bg-white border-b h-[52px] px-[18px] flex items-center justify-between"
      style={{ borderColor: "#E5E5E3" }}
    >
      {showBack ? (
        <button
          onClick={onBack}
          className="flex items-center justify-center w-9 h-9 -ml-2 rounded-lg transition-colors hover:bg-[#F4F4F2]"
          aria-label="Back"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#141413" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      ) : (
        <Link to="/" className="flex items-center gap-2">
          <svg width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden>
            <path
              d="M16 2 L28 9 L28 23 L16 30 L4 23 L4 9 Z"
              stroke="#00A651"
              strokeWidth="2.2"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <span
            className="text-[16px] tracking-tight"
            style={{ fontFamily: "Bricolage Grotesque", fontWeight: 700, color: "#141413" }}
          >
            5GCheck<span style={{ color: "#00A651" }}>.pk</span>
          </span>
        </Link>
      )}

      {title && showBack && (
        <span
          className="absolute left-1/2 -translate-x-1/2 text-[14px]"
          style={{ fontFamily: "Bricolage Grotesque", fontWeight: 700, color: "#141413" }}
        >
          {title}
        </span>
      )}

      <button
        onClick={toggleLang}
        className="rounded-full px-[10px] py-[5px] text-[11px] font-semibold border bg-transparent transition-colors hover:bg-[#F4F4F2]"
        style={{ borderColor: "#D0D0CC", color: "#6B6B68" }}
        aria-label="Toggle language"
      >
        {t.langToggle}
      </button>
    </header>
  );
}
