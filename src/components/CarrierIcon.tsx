export type CarrierKey = "jazz" | "zong" | "ufone";

const config: Record<CarrierKey, { letter: string; bg: string; fg: string; border: string }> = {
  jazz:  { letter: "J", bg: "#FFF5F5", fg: "#C0392B", border: "#FED7D7" },
  zong:  { letter: "Z", bg: "#EFF6FF", fg: "#1A56CC", border: "#BFDBFE" },
  ufone: { letter: "U", bg: "#F5F3FF", fg: "#7C3AED", border: "#DDD6FE" },
};

export const carrierConfig = config;

interface Props {
  carrier: CarrierKey;
  size?: number;
}

export default function CarrierIcon({ carrier, size = 32 }: Props) {
  const c = config[carrier];
  const radius = Math.round(size * 0.31);
  const fontSize = Math.max(11, Math.round(size * 0.42));
  return (
    <div
      aria-label={carrier}
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: c.bg,
        color: c.fg,
        border: `1px solid ${c.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Bricolage Grotesque",
        fontWeight: 800,
        fontSize,
        lineHeight: 1,
        flexShrink: 0,
      }}
    >
      {c.letter}
    </div>
  );
}
