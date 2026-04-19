import { useEffect, useState } from "react";
import type { Lang } from "@/i18n/strings";
import { strings } from "@/i18n/strings";

export type Status = "YES" | "PARTIAL" | "NO";

export interface PhoneResult {
  name: string;
  variant: string;
  confidence: string;
  jazz: Status;
  zong: Status;
  ufone: Status;
  jazzBands: string;
  zongBands: string;
  ufoneBands: string;
}

interface Props {
  lang: Lang;
  phone: PhoneResult;
}

const carriers = [
  { key: "jazz", label: "Jazz", icon: "/assets/jazz.png" },
  { key: "zong", label: "Zong", icon: "/assets/zong.png" },
  { key: "ufone", label: "Ufone", icon: "/assets/ufone.png" },
] as const;

export default function ResultCard({ lang, phone }: Props) {
  const t = strings[lang];
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, [phone.name]);

  const statuses: Status[] = [phone.jazz, phone.zong, phone.ufone];
  const allYes = statuses.every((s) => s === "YES");
  const allNo = statuses.every((s) => s === "NO");
  const overall = allYes ? "ready" : allNo ? "no" : "partial";

  const overallPill =
    overall === "ready"
      ? { text: t.ready, cls: "bg-status-yesBg text-status-yes border border-status-yes/30" }
      : overall === "no"
        ? { text: t.no5g, cls: "bg-status-noBg text-status-no border border-status-no/30" }
        : { text: t.partial, cls: "bg-status-partialBg text-status-partial border border-status-partial/30" };

  const statusPill = (s: Status) => {
    if (s === "YES") return { text: t.supported, cls: "text-status-yes bg-status-yesBg" };
    if (s === "PARTIAL") return { text: t.partialPill, cls: "text-status-partial bg-status-partialBg" };
    return { text: t.notSupported, cls: "text-status-no bg-status-noBg" };
  };

  return (
    <div
      className={`mx-4 mb-4 bg-brand-surface rounded-[14px] border border-brand-border overflow-hidden transition-all duration-300 ${
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
      <div className="px-4 py-3 border-b border-brand-border flex justify-between items-center">
        <div>
          <p className="text-[10px] text-brand-textMuted tracking-widest">{t.resultFor}</p>
          <p className="text-[14px] font-semibold text-brand-textPrimary">{phone.name}</p>
        </div>
        <span className={`text-[11px] font-semibold rounded-full px-3 py-1 ${overallPill.cls}`}>
          {overallPill.text}
        </span>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#0A1628]">
            <th className="text-[11px] text-brand-textMuted tracking-widest font-medium px-4 py-2 text-left">
              {t.carrier}
            </th>
            <th className="text-[11px] text-brand-textMuted tracking-widest font-medium px-4 py-2 text-center">
              {t.status}
            </th>
            <th className="text-[11px] text-brand-textMuted tracking-widest font-medium px-4 py-2 text-right">
              {t.bands}
            </th>
          </tr>
        </thead>
        <tbody>
          {carriers.map((c) => {
            const s = phone[c.key] as Status;
            const bands = phone[`${c.key}Bands` as "jazzBands"] as string;
            const pill = statusPill(s);
            return (
              <tr key={c.key} className="border-t border-brand-border">
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <img
                      src={c.icon}
                      alt={c.label}
                      className="w-[26px] h-[26px] rounded-[7px] object-contain bg-brand-hover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.visibility = "hidden";
                      }}
                    />
                    <span className="ml-2 text-[13px] font-medium text-[#C8DCF0]">{c.label}</span>
                  </div>
                </td>
                <td className="text-center py-3">
                  <span className={`inline-flex items-center gap-1 text-[12px] font-semibold rounded-full px-2.5 py-0.5 ${pill.cls}`}>
                    {pill.text}
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-[11px] text-brand-textMuted">
                  {bands}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="px-4 py-2.5 border-t border-brand-border text-[11px] text-brand-textMuted">
        {t.confidence(phone.confidence, phone.variant)}
      </div>
    </div>
  );
}
