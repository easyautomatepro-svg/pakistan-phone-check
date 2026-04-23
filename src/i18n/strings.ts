export type Lang = "en" | "ur";

export const strings = {
  en: {
    eyebrow: "PAKISTAN DEVICE INTELLIGENCE",
    h1: "Will My Phone Work on 5G?",
    sub: "Check Jazz, Zong & Ufone band compatibility — instantly.",
    statPhones: "phones",
    statCarriers: "carriers",
    statLive: "Live 2026",
    placeholder: "Samsung Galaxy S25, iPhone 16...",
    check: "Check",
    langToggle: "اردو",

    quickAccess: "QUICK ACCESS",
    qaMyPhoneTitle: "My Phone",
    qaMyPhoneDesc: "Check 5G compatibility",
    qaPackagesTitle: "5G Packages",
    qaPackagesDesc: "Jazz, Zong & Ufone plans",
    qaCoverageTitle: "Coverage Map",
    qaCoverageDesc: "5G signal across Pakistan",
    qaSpeedTitle: "Speed Test",
    qaSpeedDesc: "Test your live 5G speed",

    howItWorks: "HOW IT WORKS",
    howTitle: "How 5G compatibility is determined",
    howBody:
      "Every 5G network runs on specific radio frequency bands (NR bands). Your phone must support the exact bands your carrier uses — otherwise it cannot connect to 5G even if both the phone and network are '5G capable'. Pakistan's three carriers each use different allocated bands.",
    active: "Active",

    tabHome: "Home",
    tabPackages: "Packages",
    tabCoverage: "Coverage",
    tabSpeed: "Speed",

    results: "Results",
    ready: "5G Ready ✓",
    partialOverall: "Partial 5G ~",
    notSupportedOverall: "Not Supported ✗",
    colCarrier: "CARRIER",
    colStatus: "5G STATUS",
    colBands: "BANDS",
    pillSupported: "✓ Supported",
    pillPartial: "~ Partial",
    pillNo: "✗ No 5G",
    confidence: (c: string, v: string) =>
      `Confidence: ${c} · Variant: ${v} · GSMArena`,

    recommendedPlans: "RECOMMENDED PLANS",
    viewPlansFor: (c: string) => `View ${c} 5G Plans →`,
    notCompatible: (c: string) => `Not compatible with ${c} 5G`,
    upgrade: "Upgrade to a 5G-ready phone",
    upgradeSub: "See fully compatible phones on Daraz",

    notFound: "Phone not found in our database.",
    goBack: "Go back",

    pkgPageTitle: "5G Packages",
    pkgGet: "Get Plan →",

    coverageTitle: "Coverage Map",
    coverageComingSoon: "Coming soon",
    coverageSub:
      "We're building Pakistan's first crowdsourced 5G coverage map. Real signal data from real users.",
    coverageBtn: "Notify me when live",

    speedTitle: "5G Speed Test",
    speedSub:
      "Measure your real download, upload and ping on Pakistani 5G networks.",
    speedBtn: "Start Speed Test →",
  },
  ur: {
    eyebrow: "پاکستان ڈیوائس انٹیلیجنس",
    h1: "کیا میرا فون 5G پر چلے گا؟",
    sub: "Jazz، Zong اور Ufone بینڈ کی مطابقت — فوراً چیک کریں۔",
    statPhones: "فون",
    statCarriers: "کیریئرز",
    statLive: "2026 لائیو",
    placeholder: "مثلاً Samsung Galaxy S25, iPhone 16...",
    check: "چیک کریں",
    langToggle: "EN",

    quickAccess: "فوری رسائی",
    qaMyPhoneTitle: "میرا فون",
    qaMyPhoneDesc: "5G مطابقت چیک کریں",
    qaPackagesTitle: "5G پیکجز",
    qaPackagesDesc: "Jazz، Zong اور Ufone پلانز",
    qaCoverageTitle: "کوریج میپ",
    qaCoverageDesc: "پاکستان میں 5G سگنل",
    qaSpeedTitle: "اسپیڈ ٹیسٹ",
    qaSpeedDesc: "اپنی 5G اسپیڈ چیک کریں",

    howItWorks: "یہ کیسے کام کرتا ہے",
    howTitle: "5G مطابقت کیسے طے ہوتی ہے",
    howBody:
      "ہر 5G نیٹ ورک مخصوص ریڈیو فریکوئنسی بینڈز (NR bands) پر چلتا ہے۔ آپ کے فون کو وہی بینڈز سپورٹ کرنے چاہئیں جو آپ کا کیریئر استعمال کرتا ہے — ورنہ یہ 5G سے کنیکٹ نہیں ہو سکتا۔",
    active: "ایکٹو",

    tabHome: "ہوم",
    tabPackages: "پیکجز",
    tabCoverage: "کوریج",
    tabSpeed: "اسپیڈ",

    results: "نتائج",
    ready: "5G تیار ✓",
    partialOverall: "جزوی 5G ~",
    notSupportedOverall: "سپورٹ نہیں ✗",
    colCarrier: "کیریئر",
    colStatus: "5G حالت",
    colBands: "بینڈز",
    pillSupported: "✓ سپورٹڈ",
    pillPartial: "~ جزوی",
    pillNo: "✗ 5G نہیں",
    confidence: (c: string, v: string) =>
      `اعتماد: ${c} · ویرینٹ: ${v} · GSMArena`,

    recommendedPlans: "تجویز کردہ پلانز",
    viewPlansFor: (c: string) => `${c} 5G پلانز دیکھیں ←`,
    notCompatible: (c: string) => `${c} 5G کے ساتھ مطابقت نہیں`,
    upgrade: "5G فون پر اپ گریڈ کریں",
    upgradeSub: "Daraz پر مطابق فون دیکھیں",

    notFound: "یہ فون ہمارے ڈیٹابیس میں نہیں ملا۔",
    goBack: "واپس جائیں",

    pkgPageTitle: "5G پیکجز",
    pkgGet: "پلان لیں ←",

    coverageTitle: "کوریج میپ",
    coverageComingSoon: "جلد آرہا ہے",
    coverageSub:
      "ہم پاکستان کا پہلا کراؤڈ سورسڈ 5G کوریج میپ بنا رہے ہیں۔",
    coverageBtn: "لانچ پر مطلع کریں",

    speedTitle: "5G اسپیڈ ٹیسٹ",
    speedSub: "اپنی حقیقی 5G اسپیڈ پاکستان میں ٹیسٹ کریں۔",
    speedBtn: "اسپیڈ ٹیسٹ شروع کریں ←",
  },
} as const;
