import { createFileRoute } from "@tanstack/react-router";
import AppLayout from "@/components/AppLayout";
import CarrierIcon, { type CarrierKey } from "@/components/CarrierIcon";
import { useLanguage } from "@/context/LanguageContext";
import { strings } from "@/i18n/strings";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "5G Packages — Jazz, Zong & Ufone | 5GCheck.pk" },
      { name: "description", content: "Compare weekly and monthly 5G data plans from Jazz, Zong and Ufone in Pakistan." },
      { property: "og:title", content: "5G Packages — Jazz, Zong & Ufone" },
      { property: "og:description", content: "Compare weekly and monthly 5G data plans across Pakistan's three carriers." },
    ],
  }),
  component: PackagesPage,
});

interface Plan {
  name: string;
  price: number;
  data: string;
  validity: string;
}

const data: { key: CarrierKey; name: string; link: string; plans: Plan[] }[] = [
  {
    key: "jazz",
    name: "Jazz",
    link: "https://jazz.com.pk/",
    plans: [
      { name: "Weekly 5G", data: "10GB", validity: "7 days", price: 200 },
      { name: "Monthly 5G", data: "30GB", validity: "30 days", price: 600 },
    ],
  },
  {
    key: "zong",
    name: "Zong",
    link: "https://www.zong.com.pk/",
    plans: [
      { name: "Weekly 5G", data: "8GB", validity: "7 days", price: 180 },
      { name: "Monthly 5G", data: "25GB", validity: "30 days", price: 550 },
    ],
  },
  {
    key: "ufone",
    name: "Ufone",
    link: "https://ufone.com/",
    plans: [
      { name: "Weekly 5G", data: "9GB", validity: "7 days", price: 190 },
      { name: "Monthly 5G", data: "28GB", validity: "30 days", price: 580 },
    ],
  },
];

function PackagesPage() {
  const { lang } = useLanguage();
  const t = strings[lang];

  return (
    <AppLayout>
      <section className="px-[18px] pt-7 pb-2">
        <h1
          style={{
            fontFamily: "Bricolage Grotesque",
            fontWeight: 800,
            fontSize: 24,
            letterSpacing: "-0.5px",
            color: "#141413",
          }}
        >
          {t.pkgPageTitle}
        </h1>
      </section>

      <div className="flex flex-col gap-6 mt-4">
        {data.map((carrier) => (
          <div key={carrier.key}>
            <div className="flex items-center gap-3 px-[18px] mb-3">
              <CarrierIcon carrier={carrier.key} size={28} />
              <span
                style={{
                  fontFamily: "Bricolage Grotesque",
                  fontWeight: 700,
                  fontSize: 16,
                  color: "#141413",
                }}
              >
                {carrier.name}
              </span>
            </div>
            <div className="flex flex-col gap-[10px] px-[18px]">
              {carrier.plans.map((plan) => (
                <div
                  key={plan.name}
                  className="bg-white flex items-center justify-between"
                  style={{
                    border: "1px solid #E5E5E3",
                    borderRadius: 16,
                    padding: 16,
                  }}
                >
                  <div className="min-w-0">
                    <p style={{ fontSize: 14, fontWeight: 600, color: "#141413" }}>{plan.name}</p>
                    <p style={{ fontSize: 12, color: "#6B6B68", marginTop: 2 }}>
                      {plan.data} · {plan.validity}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span
                      style={{
                        fontFamily: "Bricolage Grotesque",
                        fontWeight: 800,
                        fontSize: 20,
                        color: "#00A651",
                        lineHeight: 1,
                      }}
                    >
                      Rs. {plan.price}
                    </span>
                    <a
                      href={carrier.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: "#007A3D",
                      }}
                    >
                      {t.pkgGet}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
