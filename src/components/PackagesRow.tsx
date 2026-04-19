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
  bg: string;
  hoverBg: string;
  border: string;
}[] = [
  {
    key: "jazz",
    label: "Jazz",
    color: "#E60028",
    bg: "#1A0002",
    hoverBg: "#220005",
    border: "#E8000D40",
  },
  {
    key: "zong",
    label: "Zong",
    color: "#00A0DC",
    bg: "#001525",
    hoverBg: "#001E35",
    border: "#00A0DC40",
  },
  {
    key: "ufone",
    label: "Ufone",
    color: "#9B1D8A",
    bg: "#180018",
    hoverBg: "#210021",
    border: "#9B1D8A40",
  },
];

export default function PackagesRow({ lang }: Props) {
  const t = strings[lang];

  return (
    <div
      className="mx-4 mb-4 bg-brand-surface rounded-[14px] border border-brand-border p-4 relative z-10"
      style={{ borderTop: "1px solid #ffffff08" }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="block w-[2px] h-3 bg-brand-accent rounded-sm" />
        <p className="text-[11px] text-brand-textMuted tracking-widest font-medium">
          {t.packages}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {carriers.map((c) => (
          <button
            key={c.key}
            className="h-11 rounded-xl text-[12px] font-semibold border flex items-center justify-center gap-2 active:scale-[0.97] cursor-pointer"
            style={{
              backgroundColor: c.bg,
              borderColor: c.border,
              color: c.color,
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = c.hoverBg)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = c.bg)
            }
          >
            <CarrierAvatar carrier={c.key} size={20} />
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}
