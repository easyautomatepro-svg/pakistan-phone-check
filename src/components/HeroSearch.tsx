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
    <section className="relative z-10 px-4 pt-7 pb-6">
      {/* Floating phone signal icon */}
      <div
        aria-hidden
        className="absolute"
        style={{
          right: 16,
          top: 20,
          opacity: 0.5,
          animation: "pulse-glow 3s ease-in-out infinite",
        }}
      >
        <svg width="40" height="60" viewBox="0 0 40 60" fill="none">
          <rect
            x="6"
            y="10"
            width="22"
            height="42"
            rx="4"
            stroke="#00C853"
            strokeWidth="1.5"
            fill="none"
            opacity="0.6"
          />
          <path
            d="M30 18 Q34 14 38 18"
            stroke="#00C853"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
            opacity="0.4"
          />
          <path
            d="M30 14 Q35 9 40 14"
            stroke="#00C853"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
            opacity="0.6"
          />
          <path
            d="M30 10 Q36 4 42 10"
            stroke="#00C853"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
            opacity="0.8"
          />
        </svg>
      </div>

      <div dir={isRtl ? "rtl" : "ltr"}>
        <p className="text-[11px] text-brand-accent tracking-widest font-medium mb-1.5">
          {t.label}
        </p>
        <h1 className="text-[24px] font-bold text-brand-textPrimary leading-tight mb-2">
          {t.h1}
        </h1>
        <p className="text-[14px] text-brand-textMuted leading-relaxed mb-4">
          {t.sub}
        </p>
      </div>

      {/* Stat strip */}
      <div className="bg-[#0D1A2E] border border-[#1A2D47] rounded-xl px-4 py-2 mb-5 text-[12px] text-[#4E6A8A] text-center"
        style={{ borderTop: "1px solid #ffffff08" }}
      >
        <span className="text-[#00C853] font-semibold">{phoneCount} Phones</span>
        {" · "}
        <span className="text-[#00C853] font-semibold">3 Carriers</span>
        <div className="text-[11px] mt-0.5">Jazz · Zong · Ufone 5G</div>
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
          onFocus={() => {
            setFocused(true);
            setInputFocused(true);
          }}
          onBlur={() => {
            setTimeout(() => setFocused(false), 150);
            setInputFocused(false);
          }}
          placeholder={t.placeholder}
          className="w-full h-12 bg-brand-surface border border-brand-border rounded-xl outline-none pl-10 pr-4 text-[14px] text-brand-textPrimary placeholder:text-brand-textMuted"
          style={{
            boxShadow: inputFocused
              ? "0 0 0 2px rgba(0,200,83,0.15), inset 0 1px 3px rgba(0,0,0,0.4)"
              : "inset 0 1px 3px rgba(0,0,0,0.4)",
            borderColor: inputFocused ? "#00C853" : undefined,
            transition: "box-shadow 0.15s ease, border-color 0.15s ease",
          }}
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
        onMouseEnter={() => setBtnHover(true)}
        onMouseLeave={() => setBtnHover(false)}
        className="w-full h-12 mt-2.5 text-brand-bg font-bold text-[14px] tracking-wide rounded-xl border-0 cursor-pointer active:scale-[0.97]"
        style={{
          background: "#00C853",
          boxShadow: btnHover
            ? "inset 0 1px 0 rgba(255,255,255,0.15), 0 6px 20px rgba(0,200,83,0.4)"
            : "inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 15px rgba(0,200,83,0.3)",
          transform: btnHover ? "translateY(-1px)" : "translateY(0)",
          transition: "all 0.2s ease",
        }}
      >
        {t.cta}
      </button>
    </section>
  );
}
