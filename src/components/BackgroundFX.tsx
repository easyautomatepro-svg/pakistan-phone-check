export default function BackgroundFX() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {/* Hexagonal grid */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="hexPattern"
            width="40"
            height="34.64"
            patternUnits="userSpaceOnUse"
            patternTransform="translate(0,0)"
          >
            {/* Hexagon ~ 40px wide */}
            <path
              d="M10 0 L30 0 L40 17.32 L30 34.64 L10 34.64 L0 17.32 Z"
              fill="none"
              stroke="#00C853"
              strokeWidth="0.5"
              opacity="0.04"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexPattern)" />
      </svg>

      {/* Glow 1 — top-left green */}
      <div
        className="absolute"
        style={{
          left: "10%",
          top: "20%",
          width: 400,
          height: 400,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(0,200,83,0.10) 0%, transparent 70%)",
          filter: "blur(8px)",
        }}
      />
      {/* Glow 2 — bottom-right blue */}
      <div
        className="absolute"
        style={{
          left: "80%",
          top: "75%",
          width: 300,
          height: 300,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(0,160,220,0.08) 0%, transparent 70%)",
          filter: "blur(8px)",
        }}
      />
    </div>
  );
}
