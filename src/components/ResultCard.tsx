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
      ? { text: t.ready, cls: "bg-status-yesBg text-status-yes" }
      : overall === "no"
        ? { text: t.no5g, cls: "bg-status-noBg text-status-no" }
        : { text: t.partial, cls: "bg-status-partialBg text-status-partial" };

  const statusPill = (s: Status) => {
    if (s === "YES")
      return { text: t.supported, cls: "text-status-yes bg-status-yesBg" };
    if (s === "PARTIAL")
      return {
        text: t.partialPill,
        cls: "text-status-partial bg-status-partialBg",
      };
    return { text: t.notSupported, cls: "text-status-no bg-status-noBg" };
  };

  return (
    <div
      className="mx-4 mb-4 bg-brand-surface rounded-2xl overflow-hidden relative z-10 tile-shadow"
      style={{
        border: "1px solid var(--color-brand-border)",
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 300ms ease, transform 300ms ease",
      }}
    >
      <div
        className="px-4 py-3.5 flex justify-between items-center"
        style={{ borderBottom: "1px solid var(--color-brand-border)" }}
      >
        <div>
          <p className="text-[10px] text-brand-textMuted tracking-[0.2em] font-semibold">
            {t.resultFor}
          </p>
          <p className="text-[15px] font-bold text-brand-textPrimary mt-0.5">
            {phone.name}
          </p>
        </div>
        <span
          className={`text-[11px] font-bold rounded-full px-3 py-1.5 ${overallPill.cls}`}
        >
          {overallPill.text}
        </span>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr style={{ background: "#FAFBFC" }}>
            <th className="text-[10px] text-brand-textMuted tracking-[0.15em] font-semibold px-4 py-2.5 text-left">
              {t.carrier}
            </th>
            <th className="text-[10px] text-brand-textMuted tracking-[0.15em] font-semibold px-4 py-2.5 text-center">
              {t.status}
            </th>
            <th className="text-[10px] text-brand-textMuted tracking-[0.15em] font-semibold px-4 py-2.5 text-right">
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
                className="carrier-row"
                style={{ borderTop: "1px solid var(--color-brand-border)" }}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <CarrierAvatar carrier={c.key} size={28} />
                    <span className="ml-2.5 text-[13px] font-semibold text-brand-textPrimary">
                      {c.label}
                    </span>
                  </div>
                </td>
                <td className="text-center py-3">
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-bold rounded-full px-2.5 py-1 ${pill.cls}`}
                  >
                    {pill.text}
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-[11px] text-brand-textMuted font-medium">
                  {bands}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div
        className="px-4 py-2.5 text-[10px] text-brand-textMuted"
        style={{
          borderTop: "1px solid var(--color-brand-border)",
          background: "#FAFBFC",
        }}
      >
        {t.confidence(phone.confidence, phone.variant)}
      </div>
    </div>
  );
}
