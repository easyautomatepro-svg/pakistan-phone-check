import type { Lang } from "@/i18n/strings";
import { strings } from "@/i18n/strings";
import CarrierAvatar, { type CarrierKey } from "./CarrierAvatar";

interface Props {
  lang: Lang;
}

const carriers: {
  key: CarrierKey;
  label: string;
  color: string;
  border: string;
}[] = [
  { key: "jazz", label: "Jazz", color: "#E60028", border: "#E6002820" },
  { key: "zong", label: "Zong", color: "#0072B5", border: "#0072B520" },
  { key: "ufone", label: "Ufone", color: "#9B1D8A", border: "#9B1D8A20" },
];

export default function PackagesRow({ lang }: Props) {
  const t = strings[lang];

  return (
    <div
      className="mx-4 mb-4 bg-brand-surface rounded-2xl border p-4 relative z-10 tile-shadow"
      style={{ borderColor: "var(--color-brand-border)" }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="block w-1.5 h-1.5 rounded-full bg-brand-accent" />
        <p className="text-[10px] text-brand-textMuted tracking-[0.2em] font-semibold">
          {t.packages}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {carriers.map((c) => (
          <button
            key={c.key}
            className="h-12 rounded-xl text-[12px] font-semibold flex items-center justify-center gap-2 active:scale-[0.97] cursor-pointer bg-white hover:bg-brand-hover transition-all"
            style={{
              border: `1px solid ${c.border}`,
              color: c.color,
            }}
          >
            <CarrierAvatar carrier={c.key} size={22} />
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}
