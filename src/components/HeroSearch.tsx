import { useMemo, useState } from "react";
import type { Lang } from "@/i18n/strings";
import { strings } from "@/i18n/strings";
import phones from "@/data/phones.json";

interface Phone {
  name: string;
  brand: string;
}

interface Props {
  lang: Lang;
  onSearch: (query: string) => void;
}

export default function HeroSearch({ lang, onSearch }: Props) {
  const t = strings[lang];
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const isRtl = lang === "ur";

  const suggestions = useMemo(() => {
    if (query.length < 2) return [];
    const q = query.toLowerCase();
    return (phones as Phone[])
      .filter((p) => p.name.toLowerCase().includes(q))
      .slice(0, 5);
  }, [query]);

  const handlePick = (name: string) => {
    setQuery(name);
    setFocused(false);
    onSearch(name);
  };

  return (
    <section className="bg-brand-bg px-4 pt-7 pb-6">
      <div dir={isRtl ? "rtl" : "ltr"}>
        <p className="text-[11px] text-brand-accent tracking-widest font-medium mb-1.5">
          {t.label}
        </p>
        <h1 className="text-[24px] font-bold text-brand-textPrimary leading-tight mb-2">
          {t.h1}
        </h1>
        <p className="text-[14px] text-brand-textMuted leading-relaxed mb-6">
          {t.sub}
        </p>
      </div>

      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-textMuted pointer-events-none"
          width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder={t.placeholder}
          className="w-full h-12 bg-brand-surface border border-brand-border rounded-xl focus:border-brand-accent outline-none pl-10 pr-4 text-[14px] text-brand-textPrimary placeholder:text-brand-textMuted transition-colors"
        />
        {focused && suggestions.length > 0 && (
          <ul className="absolute left-0 right-0 top-full mt-1 bg-brand-surface border border-brand-border rounded-xl z-50 overflow-hidden">
            {suggestions.map((s) => (
              <li
                key={s.name}
                onMouseDown={() => handlePick(s.name)}
                className="h-11 px-4 flex items-center text-[13px] text-[#C8DCF0] hover:bg-brand-hover cursor-pointer border-b border-brand-border last:border-0"
              >
                {s.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        onClick={() => onSearch(query)}
        className="w-full h-12 mt-2.5 bg-brand-accent hover:bg-brand-accentHover text-brand-bg font-bold text-[14px] tracking-wide rounded-xl border-0 cursor-pointer transition-all active:scale-[0.97]"
      >
        {t.cta}
      </button>
    </section>
  );
}
