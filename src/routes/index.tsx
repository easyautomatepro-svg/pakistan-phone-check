import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import phones from "../data/phones.json";
import AppLayout from "@/components/AppLayout";
import CarrierIcon, { type CarrierKey } from "@/components/CarrierIcon";
import { useLanguage } from "@/context/LanguageContext";
import { strings } from "@/i18n/strings";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "5GCheck.pk — Will my phone work on 5G in Pakistan?" },
      { name: "description", content: "Check Jazz, Zong & Ufone 5G band compatibility for any phone — instantly." },
      { property: "og:title", content: "5GCheck.pk — Pakistan's 5G Device Intelligence" },
      { property: "og:description", content: "Check Jazz, Zong & Ufone 5G band compatibility for any phone — instantly." },
    ],
  }),
  component: HomePage,
});

type Phone = typeof phones[number];

function HomePage() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const t = strings[lang];

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Phone[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleInput(val: string) {
    setQuery(val);
    if (val.length >= 2) {
      const matches = phones
        .filter((p) => p.name.toLowerCase().includes(val.toLowerCase()))
        .slice(0, 6);
      setSuggestions(matches);
      setShowSuggestions(matches.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }

  function handleSelect(phone: Phone) {
    setShowSuggestions(false);
    navigate({ to: "/result/$slug", params: { slug: phone.slug } });
  }

  function handleCheck() {
    const match =
      phones.find((p) => p.name.toLowerCase() === query.toLowerCase()) ??
      phones.find((p) => p.name.toLowerCase().includes(query.toLowerCase()));
    if (match) navigate({ to: "/result/$slug", params: { slug: match.slug } });
  }

  const carriers: { key: CarrierKey; name: string; bands: string }[] = [
    { key: "jazz", name: "Jazz 5G", bands: "n28 (700 MHz) · n41 (2.5 GHz)" },
    { key: "zong", name: "Zong 5G", bands: "n28 (700 MHz) · n78 (3.5 GHz)" },
    { key: "ufone", name: "Ufone 5G", bands: "n41 (2.5 GHz)" },
  ];

  const tiles = [
    {
      key: "phone",
      title: t.qaMyPhoneTitle,
      desc: t.qaMyPhoneDesc,
      iconBg: "#F0FAF4",
      stroke: "#00A651",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="6" y="2" width="12" height="20" rx="3" />
          <path d="M11 18h2" />
        </svg>
      ),
      onClick: () => inputRef.current?.focus(),
    },
    {
      key: "pkg",
      title: t.qaPackagesTitle,
      desc: t.qaPackagesDesc,
      iconBg: "#EFF6FF",
      stroke: "#1A56CC",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <path d="M9 11h6M9 14h6M9 17h4" />
        </svg>
      ),
      onClick: () => navigate({ to: "/packages" }),
    },
    {
      key: "cov",
      title: t.qaCoverageTitle,
      desc: t.qaCoverageDesc,
      iconBg: "#FFFBEB",
      stroke: "#D97706",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s-7-7.5-7-13a7 7 0 0 1 14 0c0 5.5-7 13-7 13Z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
      ),
      onClick: () => navigate({ to: "/coverage" }),
    },
    {
      key: "spd",
      title: t.qaSpeedTitle,
      desc: t.qaSpeedDesc,
      iconBg: "#FEF2F2",
      stroke: "#DC2626",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2L4 14h7l-1 8 10-12h-7l1-8z" />
        </svg>
      ),
      onClick: () => navigate({ to: "/speedtest" }),
    },
  ];

  return (
    <AppLayout>
      {/* HERO */}
      <section className="px-[18px] pt-8 pb-6">
        <p
          className="text-[11px] mb-3"
          style={{ color: "#00A651", fontWeight: 600, letterSpacing: "0.08em" }}
        >
          {t.eyebrow}
        </p>
        <h1
          className="mb-[10px]"
          style={{
            fontFamily: "Bricolage Grotesque",
            fontWeight: 800,
            fontSize: 36,
            lineHeight: 1.1,
            letterSpacing: "-0.8px",
            color: "#141413",
          }}
        >
          {t.h1}
        </h1>
        <p
          className="mb-7"
          style={{ fontSize: 15, lineHeight: 1.6, color: "#6B6B68" }}
        >
          {t.sub}
        </p>

        {/* stats row */}
        <div className="flex items-center gap-5 text-[14px]">
          <span>
            <span style={{ color: "#141413", fontWeight: 700 }}>{phones.length}</span>
            <span style={{ color: "#A3A3A0" }}> {t.statPhones}</span>
          </span>
          <span style={{ color: "#A3A3A0" }}>·</span>
          <span>
            <span style={{ color: "#141413", fontWeight: 700 }}>3</span>
            <span style={{ color: "#A3A3A0" }}> {t.statCarriers}</span>
          </span>
          <span style={{ color: "#A3A3A0" }}>·</span>
          <span style={{ color: "#A3A3A0", fontWeight: 400 }}>{t.statLive}</span>
        </div>
      </section>

      {/* SEARCH */}
      <div className="px-[18px] relative">
        <div
          ref={wrapRef}
          className="bg-white flex items-center gap-2 transition-all duration-150 relative"
          style={{
            border: `1px solid ${focused ? "#00A651" : "#E5E5E3"}`,
            borderRadius: 16,
            padding: "4px 4px 4px 16px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A3A3A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleInput(e.target.value)}
            onFocus={() => {
              setFocused(true);
              if (query.length >= 2) setShowSuggestions(suggestions.length > 0);
            }}
            onBlur={() => setFocused(false)}
            onKeyDown={(e) => e.key === "Enter" && handleCheck()}
            placeholder={t.placeholder}
            className="flex-1 bg-transparent border-0 outline-none py-3"
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "#141413",
            }}
          />
          <button
            onClick={handleCheck}
            className="btn-press"
            style={{
              background: "#141413",
              color: "white",
              fontSize: 13,
              fontWeight: 700,
              padding: "10px 18px",
              borderRadius: 12,
              margin: "4px 4px 4px 0",
              transition: "background 150ms ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#2A2A28")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#141413")}
          >
            {t.check}
          </button>

          {showSuggestions && (
            <div
              className="absolute left-0 right-0 bg-white animate-slide-down z-50 overflow-hidden"
              style={{
                top: "calc(100% + 10px)",
                border: "1px solid #E5E5E3",
                borderRadius: 14,
                boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
              }}
            >
              {suggestions.map((p, i) => (
                <button
                  key={p.slug}
                  onClick={() => handleSelect(p)}
                  className="w-full text-left flex items-center justify-between transition-colors"
                  style={{
                    height: 44,
                    padding: "0 16px",
                    borderTop: i === 0 ? "none" : "1px solid #F4F4F2",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#F4F4F2")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <span style={{ fontSize: 13, fontWeight: 500, color: "#141413" }}>{p.name}</span>
                  <span style={{ fontSize: 11, fontWeight: 500, color: "#A3A3A0" }}>{p.brand}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* QUICK ACCESS */}
      <section>
        <p
          className="px-[18px] mt-7 mb-3 uppercase"
          style={{ fontSize: 11, fontWeight: 600, color: "#A3A3A0", letterSpacing: "0.08em" }}
        >
          {t.quickAccess}
        </p>
        <div className="grid grid-cols-2 gap-[10px] px-[18px]">
          {tiles.map((tile) => (
            <button
              key={tile.key}
              onClick={tile.onClick}
              className="bg-white text-left tile-hover group"
              style={{
                border: "1px solid #E5E5E3",
                borderRadius: 16,
                padding: 18,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#00A651";
                e.currentTarget.style.background = "#F0FAF4";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#E5E5E3";
                e.currentTarget.style.background = "#FFFFFF";
              }}
            >
              <div
                className="flex items-center justify-center"
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 12,
                  background: tile.iconBg,
                  color: tile.stroke,
                }}
              >
                {tile.icon}
              </div>
              <p
                className="mt-3"
                style={{
                  fontFamily: "Bricolage Grotesque",
                  fontWeight: 700,
                  fontSize: 13,
                  color: "#141413",
                }}
              >
                {tile.title}
              </p>
              <p className="mt-1" style={{ fontSize: 11, fontWeight: 500, color: "#6B6B68" }}>
                {tile.desc}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section>
        <p
          className="px-[18px] mt-7 mb-[14px] uppercase"
          style={{ fontSize: 11, fontWeight: 600, color: "#A3A3A0", letterSpacing: "0.08em" }}
        >
          {t.howItWorks}
        </p>
        <div
          className="bg-white mx-[18px] overflow-hidden"
          style={{ border: "1px solid #E5E5E3", borderRadius: 16 }}
        >
          <div style={{ padding: "18px 18px 14px", borderBottom: "1px solid #E5E5E3" }}>
            <h3
              className="mb-2"
              style={{
                fontFamily: "Bricolage Grotesque",
                fontWeight: 700,
                fontSize: 16,
                color: "#141413",
              }}
            >
              {t.howTitle}
            </h3>
            <p style={{ fontSize: 13, lineHeight: 1.75, color: "#6B6B68" }}>
              {t.howBody}
            </p>
          </div>

          <div className="flex flex-col gap-2" style={{ padding: "14px 18px 16px" }}>
            {carriers.map((c) => (
              <div
                key={c.key}
                className="flex items-center gap-3"
                style={{
                  padding: "12px 14px",
                  background: "#FAFAF9",
                  border: "1px solid #E5E5E3",
                  borderRadius: 12,
                }}
              >
                <CarrierIcon carrier={c.key} size={34} />
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#141413" }}>{c.name}</p>
                  <p
                    className="mt-1 truncate"
                    style={{ fontSize: 11, color: "#A3A3A0", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
                  >
                    {c.bands}
                  </p>
                </div>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#007A3D",
                    background: "#F0FAF4",
                    borderRadius: 100,
                    padding: "3px 9px",
                  }}
                >
                  {t.active}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
