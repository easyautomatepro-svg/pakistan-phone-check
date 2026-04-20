import type { ReactNode } from "react";
import TopBar from "./TopBar";
import BottomTabBar from "./BottomTabBar";
import { useLanguage } from "@/context/LanguageContext";

export default function AppLayout({ children }: { children: ReactNode }) {
  const { isRtl } = useLanguage();
  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="min-h-screen bg-brand-bg mx-auto max-w-[480px] relative"
    >
      <TopBar />
      <main className="pb-20">{children}</main>
      <BottomTabBar />
    </div>
  );
}
