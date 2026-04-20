import { createFileRoute } from "@tanstack/react-router";
import AppLayout from "@/components/AppLayout";
import CarrierIcon, { type CarrierKey } from "@/components/CarrierIcon";
import { useLanguage } from "@/context/LanguageContext";
import { strings } from "@/i18n/strings";

interface Plan {
  name: string;
  price: number;
  data: string;
  validity: string;
}

const data: { key: CarrierKey; label: string; plans: Plan[] }[] = [
  {
    key: "jazz",
    label: "Jazz",
    plans: [
      { name: "Jazz Weekly 5G", price: 200, data: "10GB", validity: "7 days" },
      { name: "Jazz Monthly 5G", price: 600, data: "30GB", validity: "30 days" },
    ],
  },
  {
    key: "zong",
    label: "Zong",
    plans: [
      { name: "Zong Weekly 5G", price: 180, data: "8GB", validity: "7 days" },
      { name: "Zong Monthly 5G", price: 550, data: "25GB", validity: "30 days" },
    ],
  },
  {
    key: "ufone",
    label: "Ufone",
    plans: [
      { name: "Ufone Weekly 5G", price: 190, data: "9GB", validity: "7 days" },
      { name: "Ufone Monthly 5G", price: 580, data: "28GB", validity: "30 days" },
    ],
  },
];

export const Route = createFileRoute("/packages")({
  component: PackagesPage,
  head: () => ({
    meta: [
      { title: "5G Packages — Jazz, Zong & Ufone | 5GCheck.pk" },
      { name: "description", content: "Compare weekly and monthly 5G packages from Jazz, Zong & Ufone in Pakistan." },
      { property: "og:title", content: "5G Packages in Pakistan" },
      { property: "og:description", content: "Compare 5G plans from Jazz, Zong & Ufone." },
    ],
  }),
});

function PackagesPage() {
  const { lang, isRtl } = useLanguage();
  const t = strings[lang];

  return (
    <AppLayout>
      <div className="px-4" dir={isRtl ? "rtl" : "ltr"}>
        <h1 className="text-[20px] font-bold text-brand-textPrimary pt-4 pb-4">{t.pkgPageTitle}</h1>

        <div className="flex flex-col gap-5">
          {data.map((carrier) => (
            <section key={carrier.key}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <CarrierIcon carrier={carrier.key} size={28} />
                  <span className="text-[15px] font-semibold text-brand-textPrimary">{carrier.label}</span>
                </div>
                <button className="text-[12px] font-semibold text-brand-primary">{t.pkgViewAll}</button>
              </div>
              <div className="flex flex-col gap-3">
                {carrier.plans.map((p) => (
                  <div key={p.name} className="bg-white border border-brand-border rounded-2xl p-4 flex justify-between items-center">
                    <div className="min-w-0">
                      <p className="text-[14px] font-semibold text-brand-textPrimary truncate">{p.name}</p>
                      <p className="text-[12px] text-brand-textMuted mt-0.5">{p.data} · {p.validity}</p>
                    </div>
                    <div className="text-end shrink-0 ms-3">
                      <p className="text-[18px] font-bold text-brand-primary leading-none">Rs. {p.price}</p>
                      <button className="text-[11px] font-semibold text-brand-primary mt-1.5 hover:underline">
                        {t.pkgGet}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
