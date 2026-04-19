import { useState } from "react";

export type CarrierKey = "jazz" | "zong" | "ufone";

const styles: Record<
  CarrierKey,
  { letter: string; gradient: string; border: string; iconSrc: string }
> = {
  jazz: {
    letter: "J",
    gradient: "linear-gradient(135deg, #C8001A, #E8000D)",
    border: "#E8000D40",
    iconSrc: "/assets/jazz.png",
  },
  zong: {
    letter: "Z",
    gradient: "linear-gradient(135deg, #007AB8, #00A0DC)",
    border: "#00A0DC40",
    iconSrc: "/assets/zong.png",
  },
  ufone: {
    letter: "U",
    gradient: "linear-gradient(135deg, #7A1570, #9B1D8A)",
    border: "#9B1D8A40",
    iconSrc: "/assets/ufone.png",
  },
};

interface Props {
  carrier: CarrierKey;
  size?: number;
}

export default function CarrierAvatar({ carrier, size = 28 }: Props) {
  const [failed, setFailed] = useState(false);
  const s = styles[carrier];
  const radius = Math.round(size * 0.28);
  const fontSize = Math.max(10, Math.round(size * 0.46));

  if (!failed) {
    return (
      <img
        src={s.iconSrc}
        alt={carrier}
        width={size}
        height={size}
        onError={() => setFailed(true)}
        style={{
          width: size,
          height: size,
          borderRadius: radius,
          objectFit: "contain",
          background: "#FFFFFF",
          border: "1px solid var(--color-brand-border)",
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
        background: s.gradient,
        border: `1px solid ${s.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: 700,
        fontSize,
        lineHeight: 1,
      }}
    >
      {s.letter}
    </div>
  );
}
