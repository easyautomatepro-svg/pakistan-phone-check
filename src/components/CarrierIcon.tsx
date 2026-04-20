import { useState } from "react";

export type CarrierKey = "jazz" | "zong" | "ufone";

const fallback: Record<CarrierKey, { letter: string; bg: string; fg: string }> = {
  jazz: { letter: "J", bg: "#FEE2E2", fg: "#DC2626" },
  zong: { letter: "Z", bg: "#DBEAFE", fg: "#2563EB" },
  ufone: { letter: "U", bg: "#F3E8FF", fg: "#9333EA" },
};

interface Props {
  carrier: CarrierKey;
  size?: number;
}

export default function CarrierIcon({ carrier, size = 32 }: Props) {
  const [failed, setFailed] = useState(false);
  const f = fallback[carrier];
  const radius = Math.round(size * 0.28);

  if (!failed) {
    return (
      <img
        src={`/assets/${carrier}.png`}
        alt={carrier}
        width={size}
        height={size}
        loading="lazy"
        onError={() => setFailed(true)}
        style={{
          width: size,
          height: size,
          borderRadius: radius,
          objectFit: "contain",
        }}
      />
    );
  }

  return (
    <div
      aria-label={carrier}
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: f.bg,
        color: f.fg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: Math.max(12, Math.round(size * 0.46)),
        lineHeight: 1,
      }}
    >
      {f.letter}
    </div>
  );
}
