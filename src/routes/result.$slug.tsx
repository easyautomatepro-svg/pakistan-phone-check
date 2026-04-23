import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import phones from "../data/phones.json";
import AppLayout from "@/components/AppLayout";
import CarrierIcon, { type CarrierKey } from "@/components/CarrierIcon";
import { useLanguage } from "@/context/LanguageContext";
import { strings } from "@/i18n/strings";

export const Route = createFileRoute("/result/$slug")({
  head: ({ params }) => {
    const phone = phones.find((p) => p.slug === params.slug);
    const title = phone
      ? `${phone.name} 5G compatibility — Jazz, Zong, Ufone | 5GCheck.pk`
      : "Phone not found | 5GCheck.pk";
    const desc = phone
      ? `Does ${phone.name} support 5G in Pakistan? Jazz: ${phone.jazz} · Zong: ${phone.zong} · Ufone: ${phone.ufone}.`
      : "This phone is not in our database yet.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: ResultPage,
});

type Status = "YES" | "PARTIAL" | "NO";

function statusStyle(s: Status) {
  if (s === "YES")
    return { bg: "#F0FDF4", color: "#16A34A", border: "#BBF7D0" };
  if (s === "PARTIAL")
    return { bg: "#FFFBEB", color: "#D97706", border: "#FDE68A" };
  return { bg: "#FEF2F2", color: "#DC2626", border: "#FECACA" };
}

function StatusPill({ status, lang }: { status: Status; lang: "en" | "ur" }) {
  const t = strings[lang];
  const s = statusStyle(status);
  const label =
    status === "YES" ? t.pillSupported : status === "PARTIAL" ? t.pillPartial : t.pillNo;
  return (
    <span
      style={{
        background: s.bg,
        color: s.color,
        fontSize: 11,
        fontWeight: 700,
        borderRadius: 100,
        padding: "4px 10px",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

function OverallBadge({ status, lang }: { status: Status; lang: "en" | "ur" }) {
  const t = strings[lang];
  const s = statusStyle(status);
  const label =
    status === "YES" ? t.ready : status === "PARTIAL" ? t.partialOverall : t.notSupportedOverall;
  return (
    <span
      style={{
        background: s.bg,
        color: s.color,
        border: `1px solid ${s.border}`,
        fontFamily: "Bricolage Grotesque",
        fontWeight: 800,
        fontSize: 13,
        padding: "8px 16px",
        borderRadius: 100,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

const PLAN_LINKS: Record<CarrierKey, string> = {
  jazz: "https://jazz.com.pk/",
  zong: "https://www.zong.com.pk/",
  ufone: "https://ufone.com/",
};

function ResultPage() {
  const { slug } = Route.useParams();
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const t = strings[lang];

  const phone = phones.find((p) => p.slug === slug);

  if (!phone) {
    return (
      <AppLayout topBarTitle={t.results} showBack onBack={() => navigate({ to: "/" })}>
        <div className="px-[18px] pt-12 text-center animate-float-up">
          <p style={{ fontSize: 15, color: "#6B6B68" }}>{t.notFound}</p>
          <Link
            to="/"
            className="inline-block mt-4 px-4 py-2 rounded-xl text-white font-bold text-[13px]"
            style={{ background: "#141413" }}
          >
            {t.goBack}
          </Link>
        </div>
      </AppLayout>
    );
  }

  const carriers: { key: CarrierKey; name: string; status: Status; bands: string }[] = [
    { key: "jazz", name: "Jazz", status: phone.jazz as Status, bands: phone.jazzBands },
    { key: "zong", name: "Zong", status: phone.zong as Status, bands: phone.zongBands },
    { key: "ufone", name: "Ufone", status: phone.ufone as Status, bands: phone.ufoneBands },
  ];

  const allYes = carriers.every((c) => c.status === "YES");
  const allNo = carriers.every((c) => c.status === "NO");
  const overall: Status = allYes ? "YES" : allNo ? "NO" : "PARTIAL";

  return (
    <AppLayout topBarTitle={t.results} showBack onBack={() => navigate({ to: "/" })}>
      <div className="animate-float-up">
        {/* VERDICT HERO */}
        <section
          className="bg-white"
          style={{ borderBottom: "1px solid #E5E5E3", padding: "24px 18px 20px" }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h1
                style={{
                  fontFamily: "Bricolage Grotesque",
                  fontWeight: 800,
                  fontSize: 22,
                  lineHeight: 1.15,
                  letterSpacing: "-0.4px",
                  color: "#141413",
                }}
              >
                {phone.name}
              </h1>
              <p className="mt-1" style={{ fontSize: 13, fontWeight: 500, color: "#A3A3A0" }}>
                {phone.brand} · {phone.variant}
              </p>
            </div>
            <OverallBadge status={overall} lang={lang} />
          </div>
        </section>

        {/* CARRIER TABLE */}
        <div
          className="bg-white mx-[18px] mt-4 overflow-hidden"
          style={{ border: "1px solid #E5E5E3", borderRadius: 16 }}
        >
          <div
            className="grid"
            style={{
              gridTemplateColumns: "40% 34% 26%",
              padding: "10px 18px",
              background: "#FAFAF9",
              borderBottom: "1px solid #E5E5E3",
              fontSize: 11,
              fontWeight: 700,
              color: "#A3A3A0",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            <div>{t.colCarrier}</div>
            <div className="text-center">{t.colStatus}</div>
            <div className="text-right">{t.colBands}</div>
          </div>

          {carriers.map((c, i) => (
            <div
              key={c.key}
              className="grid items-center transition-colors"
              style={{
                gridTemplateColumns: "40% 34% 26%",
                padding: "14px 18px",
                borderTop: i === 0 ? "none" : "1px solid #F4F4F2",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#FAFAF9")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <div className="flex items-center gap-[10px] min-w-0">
                <CarrierIcon carrier={c.key} size={32} />
                <span style={{ fontSize: 13, fontWeight: 600, color: "#141413" }}>{c.name}</span>
              </div>
              <div className="flex justify-center">
                <StatusPill status={c.status} lang={lang} />
              </div>
              <div
                className="text-right truncate"
                style={{
                  fontSize: 11,
                  color: "#A3A3A0",
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                }}
              >
                {c.bands}
              </div>
            </div>
          ))}

          <div
            style={{
              padding: "10px 18px",
              background: "#FAFAF9",
              borderTop: "1px solid #E5E5E3",
              fontSize: 13,
              color: "#A3A3A0",
            }}
          >
            {t.confidence(phone.confidence, phone.variant)}
          </div>
        </div>

        {/* PLANS */}
        <p
          className="px-[18px] mt-7 mb-3 uppercase"
          style={{ fontSize: 11, fontWeight: 600, color: "#A3A3A0", letterSpacing: "0.08em" }}
        >
          {t.recommendedPlans}
        </p>
        <div className="flex flex-col gap-[10px] px-[18px]">
          {carriers.map((c) => (
            <div
              key={c.key}
              className="bg-white"
              style={{ border: "1px solid #E5E5E3", borderRadius: 16, padding: 16 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-[10px]">
                  <CarrierIcon carrier={c.key} size={32} />
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#141413" }}>{c.name}</span>
                </div>
                <StatusPill status={c.status} lang={lang} />
              </div>
              {c.status !== "NO" ? (
                <a
                  href={PLAN_LINKS[c.key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center btn-press transition-colors"
                  style={{
                    height: 40,
                    lineHeight: "40px",
                    background: "#F0FAF4",
                    color: "#007A3D",
                    border: "1px solid #B8E6CC",
                    borderRadius: 10,
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#D4EDDF")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#F0FAF4")}
                >
                  {t.viewPlansFor(c.name)}
                </a>
              ) : (
                <div
                  className="text-center"
                  style={{ fontSize: 13, color: "#A3A3A0", padding: "8px 0" }}
                >
                  {t.notCompatible(c.name)}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* UPGRADE CTA */}
        <a
          href="https://www.daraz.pk/catalog/?q=5G+phone"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-[14px] mx-[18px] mt-4 transition-colors btn-press"
          style={{
            background: "#F0FAF4",
            border: "1px solid #B8E6CC",
            borderRadius: 16,
            padding: 16,
          }}
        >
          <div
            className="flex items-center justify-center"
            style={{
              width: 44,
              height: 44,
              background: "white",
              borderRadius: 14,
              color: "#00A651",
              flexShrink: 0,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="6" y="2" width="12" height="20" rx="3" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p
              style={{
                fontFamily: "Bricolage Grotesque",
                fontWeight: 800,
                fontSize: 14,
                color: "#141413",
              }}
            >
              {t.upgrade}
            </p>
            <p style={{ fontSize: 12, fontWeight: 500, color: "#6B6B68", marginTop: 2 }}>
              {t.upgradeSub}
            </p>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00A651" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </AppLayout>
  );
}
