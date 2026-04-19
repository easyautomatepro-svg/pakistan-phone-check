import { useState } from "react";
import type { Lang } from "@/i18n/strings";
import { strings } from "@/i18n/strings";

interface Props {
  lang: Lang;
}

const carriers = [
  { key: "jazz", label: "Jazz", color: "#E60028", bg: "rgba(230,0,40,0.08)" },
  { key: "zong", label: "Zong", color: "#FFB700", bg: "rgba(255,183,0,0.08)" },
  { key: "ufone", label: "Ufone", color: "#00A5DC", bg: "rgba(0,165,220,0.08)" },
  { key: "telenor", label: "Telenor", color: "#00ADEF", bg: "rgba(0,173,239,0.08)" },
];

export default function PackagesRow({ lang }: Props) {
  const t = strings[lang];
  const [showTelenorNote, setShowTelenorNote] = useState(false);

  return (
    <div className="mx-4 mb-4 bg-brand-surface rounded-[14px] border border-brand-border p-4">
      <p className="text-[11px] text-brand-textMuted tracking-widest font-medium mb-3">
        {t.packages}
      </p>
      <div className="grid grid-cols-4 gap-2">
        {carriers.map((c) => (
          <button
            key={c.key}
            onClick={() => setShowTelenorNote(c.key === "telenor")}
            className="h-10 rounded-xl text-[12px] font-semibold border active:scale-[0.97] transition-all"
            style={{
              backgroundColor: c.bg,
              borderColor: `${c.color}40`,
              color: c.color,
            }}
          >
            {c.label}
          </button>
        ))}
      </div>
      {showTelenorNote && (
        <p className="text-[11px] text-brand-textMuted mt-2 text-center">
          {t.telenorNote}
        </p>
      )}
    </div>
  );
}
