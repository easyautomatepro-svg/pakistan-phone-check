import { useEffect, useState } from "react";
import type { Lang } from "@/i18n/strings";
import { strings } from "@/i18n/strings";
import CarrierAvatar, { type CarrierKey } from "./CarrierAvatar";

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

const carriers: { key: CarrierKey; label: string }[] = [
  { key: "jazz", label: "Jazz" },
  { key: "zong", label: "Zong" },
  { key: "ufone", label: "Ufone" },
];

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
    if (s === "YES")
      return {
        text: t.supported,
        cls: "text-status-yes bg-status-yesBg",
        glow: "0 0 8px rgba(0,200,83,0.25)",
      };
    if (s === "PARTIAL")
      return {
        text: t.partialPill,
        cls: "text-status-partial bg-status-partialBg",
        glow: "0 0 8px rgba(255,183,0,0.25)",
      };
    return {
      text: t.notSupported,
      cls: "text-status-no bg-status-noBg",
      glow: "0 0 8px rgba(255,68,68,0.25)",
    };
  };

  return (
    <div
      className={`mx-4 mb-4 bg-brand-surface rounded-[14px] border border-brand-border overflow-hidden relative z-10`}
      style={{
        borderTop: "1px solid #ffffff08",
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 300ms ease, transform 300ms ease",
      }}
    >
      <div className="px-4 py-3 border-b border-brand-border flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="block w-[2px] h-3 bg-brand-accent rounded-sm" />
          <div>
            <p className="text-[10px] text-brand-textMuted tracking-widest">{t.resultFor}</p>
            <p className="text-[14px] font-semibold text-brand-textPrimary">{phone.name}</p>
          </div>
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
              <tr
                key={c.key}
                className="border-t border-brand-border carrier-row"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <CarrierAvatar carrier={c.key} size={28} />
                    <span className="ml-2 text-[13px] font-medium text-[#C8DCF0]">{c.label}</span>
                  </div>
                </td>
                <td className="text-center py-3">
                  <span
                    className={`inline-flex items-center gap-1 text-[12px] font-semibold rounded-full px-2.5 py-0.5 ${pill.cls}`}
                    style={{ boxShadow: pill.glow }}
                  >
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
