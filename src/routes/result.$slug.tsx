import { createFileRoute, useNavigate, notFound, Link } from "@tanstack/react-router";
import AppLayout from "@/components/AppLayout";
import CarrierIcon, { type CarrierKey } from "@/components/CarrierIcon";
import { useLanguage } from "@/context/LanguageContext";
import { strings } from "@/i18n/strings";
import phones from "@/data/phones.json";

type Status = "YES" | "PARTIAL" | "NO";

interface Phone {
  name: string;
  slug: string;
  brand: string;
  variant: string;
  confidence: string;
  jazz: Status;
  zong: Status;
  ufone: Status;
  jazzBands: string;
  zongBands: string;
  ufoneBands: string;
}

export const Route = createFileRoute("/result/$slug")({
  loader: ({ params }) => {
    const phone = (phones as Phone[]).find((p) => p.slug === params.slug);
    if (!phone) throw notFound();
    return { phone };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.phone.name} 5G Compatibility — 5GCheck.pk` },
          { name: "description", content: `Is the ${loaderData.phone.name} compatible with Jazz, Zong & Ufone 5G in Pakistan? See band-level details.` },
          { property: "og:title", content: `${loaderData.phone.name} — 5G Compatibility` },
          { property: "og:description", content: `Jazz, Zong & Ufone 5G band check for ${loaderData.phone.name}.` },
        ]
      : [],
  }),
  component: ResultPage,
  notFoundComponent: () => (
    <AppLayout>
      <div className="px-4 pt-10 text-center">
        <p className="text-brand-textMuted">Phone not found.</p>
        <Link to="/" className="inline-block mt-4 text-brand-primary font-semibold">← Back to home</Link>
      </div>
    </AppLayout>
  ),
});

const carriers: { key: CarrierKey; label: string }[] = [
  { key: "jazz", label: "Jazz" },
  { key: "zong", label: "Zong" },
  { key: "ufone", label: "Ufone" },
];

function ResultPage() {
  const { lang, isRtl } = useLanguage();
  const t = strings[lang];
  const navigate = useNavigate();
  const { phone } = Route.useLoaderData();

  const all: Status[] = [phone.jazz, phone.zong, phone.ufone];
  const allYes = all.every((s) => s === "YES");
  const allNo = all.every((s) => s === "NO");
  const overall = allYes ? "ready" : allNo ? "no" : "partial";

  const overallPill =
    overall === "ready"
      ? { text: t.ready, cls: "bg-status-yesBg text-status-yes border-status-yesBorder" }
      : overall === "no"
        ? { text: t.no5g, cls: "bg-status-noBg text-status-no border-status-noBorder" }
        : { text: t.partial, cls: "bg-status-partialBg text-status-partial border-status-partialBorder" };

  const statusPill = (s: Status) => {
    if (s === "YES") return { text: t.supported, cls: "bg-status-yesBg text-status-yes" };
    if (s === "PARTIAL") return { text: t.partialPill, cls: "bg-status-partialBg text-status-partial" };
    return { text: t.notSupported, cls: "bg-status-noBg text-status-no" };
  };

  return (
    <AppLayout>
      <div className="animate-float-up" dir={isRtl ? "rtl" : "ltr"}>
        {/* Back */}
        <button
          onClick={() => navigate({ to: "/" })}
          className="px-4 pt-4 pb-2 flex items-center gap-2 text-[14px] font-medium text-brand-textPrimary hover:text-brand-primary transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isRtl ? "scaleX(-1)" : undefined }}>
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
          {t.backResults}
        </button>

        {/* Result hero */}
        <div className="mx-4 mt-2 bg-white border border-brand-border rounded-2xl overflow-hidden">
          <div className="px-4 pt-4 pb-3 border-b border-brand-border flex justify-between items-start gap-3">
            <div className="min-w-0">
              <p className="text-[10px] text-brand-textMuted tracking-widest font-medium">{t.resultLabel}</p>
              <p className="text-[16px] font-bold text-brand-textPrimary mt-0.5 truncate">{phone.name}</p>
              <p className="text-[12px] text-brand-textMuted mt-0.5">{phone.brand} · {phone.variant}</p>
            </div>
            <span className={`shrink-0 text-[12px] font-semibold rounded-full px-3 py-1.5 border ${overallPill.cls}`}>
              {overallPill.text}
            </span>
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-brand-surfaceAlt">
                <th className="text-[10px] text-brand-textMuted tracking-widest font-medium px-4 py-2.5 text-start">{t.carrier}</th>
                <th className="text-[10px] text-brand-textMuted tracking-widest font-medium px-4 py-2.5 text-center">{t.status}</th>
                <th className="text-[10px] text-brand-textMuted tracking-widest font-medium px-4 py-2.5 text-end">{t.bands}</th>
              </tr>
            </thead>
            <tbody>
              {carriers.map((c) => {
                const s = phone[c.key] as Status;
                const bands = phone[`${c.key}Bands` as "jazzBands"] as string;
                const pill = statusPill(s);
                return (
                  <tr key={c.key} className="border-t border-brand-border">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <CarrierIcon carrier={c.key} size={32} />
                        <span className="text-[14px] font-semibold text-brand-textPrimary">{c.label}</span>
                      </div>
                    </td>
                    <td className="text-center py-3.5">
                      <span className={`inline-flex items-center gap-1.5 text-[13px] font-semibold rounded-full px-3 py-1 ${pill.cls}`}>
                        {pill.text}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-end text-[11px] text-brand-textMuted font-mono">{bands}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="px-4 py-3 bg-brand-surfaceAlt border-t border-brand-border flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8FA99A" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <p className="text-[11px] text-brand-textMuted">{t.confidence(phone.confidence, phone.variant)}</p>
          </div>
        </div>

        {/* Plan comparison */}
        <section className="px-4 mt-5">
          <p className="text-[11px] text-brand-textMuted tracking-widest font-medium mb-3">{t.comparePlans}</p>
          <div className="flex flex-col gap-3">
            {carriers.map((c) => {
              const s = phone[c.key] as Status;
              const supported = s !== "NO";
              return (
                <div key={c.key} className="bg-white border border-brand-border rounded-2xl p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <CarrierIcon carrier={c.key} size={32} />
                      <span className="text-[15px] font-semibold text-brand-textPrimary">{c.label}</span>
                    </div>
                    <span className={`text-[11px] font-semibold rounded-full px-2.5 py-1 ${statusPill(s).cls}`}>
                      {statusPill(s).text}
                    </span>
                  </div>
                  {supported ? (
                    <button
                      onClick={() => navigate({ to: "/packages" })}
                      className="w-full h-10 mt-3 rounded-xl bg-brand-primaryLight text-brand-primary font-semibold text-[13px] border border-brand-primary/20 hover:bg-brand-primary hover:text-white transition-all duration-150 btn-press"
                    >
                      {t.viewPlans}
                    </button>
                  ) : (
                    <p className="text-[12px] text-brand-textMuted text-center py-2 mt-1">
                      {t.notCompatible(c.label)}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Daraz CTA */}
        <a
          href="https://www.daraz.pk/catalog/?q=5g+phone"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-4 mt-5 mb-4 bg-brand-primaryLight border border-brand-primary/20 rounded-2xl p-4 flex items-center gap-3 hover:bg-brand-primary/15 transition-all duration-150 btn-press"
          style={{ display: "flex" }}
        >
          <div className="w-10 h-10 shrink-0 rounded-xl bg-white border border-brand-primary/20 flex items-center justify-center text-brand-primary">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="6" y="2" width="12" height="20" rx="3" /><line x1="11" y1="18" x2="13" y2="18" /><polyline points="9 7 12 4 15 7" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-semibold text-brand-textPrimary">{t.upgrade}</p>
            <p className="text-[12px] text-brand-textMuted truncate">{t.upgradeSub}</p>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00A651" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isRtl ? "scaleX(-1)" : undefined }}>
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>
    </AppLayout>
  );
}
