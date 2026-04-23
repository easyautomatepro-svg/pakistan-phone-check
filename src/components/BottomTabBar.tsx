import { Link, useLocation } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { strings } from "@/i18n/strings";

const HomeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 11 L12 3 L21 11 V20 a1 1 0 0 1 -1 1 h-5 v-7 h-4 v7 H4 a1 1 0 0 1 -1 -1 Z" />
  </svg>
);
const SimIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <path d="M9 14h6M9 17h6M9 11h6" />
  </svg>
);
const PinIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22 s-7 -7.5 -7 -13 a7 7 0 0 1 14 0 c0 5.5 -7 13 -7 13 Z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);
const BoltIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2 L4 14 H11 L10 22 L20 10 H13 Z" />
  </svg>
);

interface Tab {
  to: "/" | "/packages" | "/coverage" | "/speedtest";
  labelKey: "tabHome" | "tabPackages" | "tabCoverage" | "tabSpeed";
  icon: ReactNode;
}

const tabs: Tab[] = [
  { to: "/", labelKey: "tabHome", icon: <HomeIcon /> },
  { to: "/packages", labelKey: "tabPackages", icon: <SimIcon /> },
  { to: "/coverage", labelKey: "tabCoverage", icon: <PinIcon /> },
  { to: "/speedtest", labelKey: "tabSpeed", icon: <BoltIcon /> },
];

export default function BottomTabBar() {
  const { lang } = useLanguage();
  const t = strings[lang];
  const location = useLocation();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t h-16 mx-auto max-w-[480px] flex"
      style={{
        borderColor: "#E5E5E3",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {tabs.map((tab) => {
        const isActive =
          tab.to === "/"
            ? location.pathname === "/"
            : location.pathname.startsWith(tab.to);
        return (
          <Link
            key={tab.to}
            to={tab.to}
            className="flex-1 flex flex-col items-center justify-center gap-1 h-full relative transition-colors duration-150"
            style={{ color: isActive ? "#00A651" : "#A3A3A0" }}
          >
            {tab.icon}
            <span className="text-[10px] font-bold leading-none">{t[tab.labelKey]}</span>
            {isActive && (
              <span
                className="absolute bottom-1.5 w-3 h-[3px] rounded-full"
                style={{ background: "#00A651" }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
