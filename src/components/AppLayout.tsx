import type { ReactNode } from "react";
import TopBar from "./TopBar";
import BottomTabBar from "./BottomTabBar";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  children: ReactNode;
  topBarTitle?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export default function AppLayout({ children, topBarTitle, showBack, onBack }: Props) {
  const { isRtl } = useLanguage();
  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="min-h-screen mx-auto max-w-[480px] relative"
      style={{ background: "#FAFAF9" }}
    >
      <TopBar title={topBarTitle} showBack={showBack} onBack={onBack} />
      <main style={{ paddingBottom: 72 }}>{children}</main>
      <BottomTabBar />
    </div>
  );
}
