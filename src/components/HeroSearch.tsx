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
  const [inputFocused, setInputFocused] = useState(false);
  const [btnHover, setBtnHover] = useState(false);
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

  const phoneCount = (phones as Phone[]).length;

  return (
    <section className="relative z-10 px-4 pt-5 pb-4">
      {/* Deep green hero card — Easypaisa inspired */}
      <div
        className="hero-card relative rounded-[22px] p-5 overflow-hidden"
        dir={isRtl ? "rtl" : "ltr"}
      >
        {/* Decorative signal bars */}
        <div
          aria-hidden
          className="absolute"
          style={{
            right: isRtl ? "auto" : -20,
            left: isRtl ? -20 : "auto",
            top: -20,
            opacity: 0.18,
          }}
        >
          <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
            <path
              d="M30 110 Q80 50 130 110"
              stroke="white"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M40 100 Q80 65 120 100"
              stroke="white"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M55 90 Q80 75 105 90"
              stroke="white"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="80" cy="95" r="4" fill="white" />
          </svg>
        </div>

        <div className="relative">
          <span
            className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-widest text-white/85 px-2.5 py-1 rounded-full"
            style={{ background: "rgba(255,255,255,0.14)" }}
          >
            <span className="block w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            {t.label}
          </span>
          <h1 className="text-[26px] leading-[1.15] font-bold text-white mt-3 tracking-tight">
            {t.h1}
          </h1>
          <p className="text-[13px] text-white/85 mt-1.5 leading-relaxed">
            {t.sub}
          </p>

          <div className="mt-4 flex items-center gap-3 text-[11px] text-white/90">
            <div className="flex items-center gap-1.5">
              <span className="text-white font-bold text-[14px]">
                {phoneCount}
              </span>
              <span className="text-white/75">Phones</span>
            </div>
            <span className="text-white/30">•</span>
            <div className="flex items-center gap-1.5">
              <span className="text-white font-bold text-[14px]">3</span>
              <span className="text-white/75">Carriers</span>
            </div>
            <span className="text-white/30">•</span>
            <span className="text-white/75">Jazz · Zong · Ufone</span>
          </div>
        </div>
      </div>

      {/* Search card — floats below hero */}
      <div
        className="bg-brand-surface rounded-[18px] p-3 mt-3 tile-shadow"
        style={{ border: "1px solid var(--color-brand-border)" }}
      >
        <div className="relative">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-textMuted pointer-events-none"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              setFocused(true);
              setInputFocused(true);
            }}
            onBlur={() => {
              setTimeout(() => setFocused(false), 150);
              setInputFocused(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSearch(query);
            }}
            placeholder={t.placeholder}
            className="w-full h-12 rounded-xl outline-none pl-11 pr-4 text-[14px] text-brand-textPrimary placeholder:text-brand-textMuted bg-[#F7F9FB]"
            style={{
              border: inputFocused
                ? "1.5px solid var(--color-brand-accent)"
                : "1.5px solid transparent",
              boxShadow: inputFocused
                ? "0 0 0 4px rgba(0,135,90,0.10)"
                : "none",
              transition: "all 0.15s ease",
            }}
          />
          {focused && suggestions.length > 0 && (
            <ul
              className="absolute left-0 right-0 top-full mt-1.5 bg-brand-surface rounded-xl z-50 overflow-hidden tile-shadow"
              style={{ border: "1px solid var(--color-brand-border)" }}
            >
              {suggestions.map((s) => (
                <li
                  key={s.name}
                  onMouseDown={() => handlePick(s.name)}
                  className="h-11 px-4 flex items-center text-[13px] text-brand-textPrimary hover:bg-brand-hover cursor-pointer border-b border-brand-border last:border-0"
                >
                  {s.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          onClick={() => onSearch(query)}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          className="w-full h-12 mt-2.5 text-white font-bold text-[14px] tracking-wide rounded-xl border-0 cursor-pointer active:scale-[0.98]"
          style={{
            background:
              "linear-gradient(135deg, #00A06C 0%, #00875A 60%, #006644 100%)",
            boxShadow: btnHover
              ? "inset 0 1px 0 rgba(255,255,255,0.20), 0 8px 22px -6px rgba(0,135,90,0.55)"
              : "inset 0 1px 0 rgba(255,255,255,0.20), 0 4px 14px -4px rgba(0,135,90,0.40)",
            transform: btnHover ? "translateY(-1px)" : "translateY(0)",
            transition: "all 0.2s ease",
          }}
        >
          {t.cta}
        </button>
      </div>
    </section>
  );
}
