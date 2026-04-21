import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useRef, useEffect } from 'react'
import phones from '../data/phones.json'

export const Route = createFileRoute('/')({
  component: HomePage,
})

type Phone = typeof phones[0]

function CarrierAvatar({ carrier }: { carrier: 'jazz' | 'zong' | 'ufone' }) {
  const config = {
    jazz:  { letter: 'J', src: '/assets/jazz.png',  bg: 'bg-red-50',    text: 'text-red-600'    },
    zong:  { letter: 'Z', src: '/assets/zong.png',  bg: 'bg-blue-50',   text: 'text-blue-600'   },
    ufone: { letter: 'U', src: '/assets/ufone.png', bg: 'bg-purple-50', text: 'text-purple-600' },
  }
  const c = config[carrier]
  return (
    <div className="relative w-8 h-8 rounded-xl overflow-hidden flex-shrink-0">
      <img
        src={c.src}
        alt={carrier}
        className="w-full h-full object-contain"
        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
      />
      <div className={`absolute inset-0 flex items-center justify-center ${c.bg} ${c.text} font-bold text-sm`}>
        {c.letter}
      </div>
    </div>
  )
}

function HomePage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<Phone[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isUrdu, setIsUrdu] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target as Node) &&
        !inputRef.current?.contains(e.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleInput(val: string) {
    setQuery(val)
    if (val.length >= 2) {
      const matches = phones
        .filter(p => p.name.toLowerCase().includes(val.toLowerCase()))
        .slice(0, 6)
      setSuggestions(matches)
      setShowSuggestions(matches.length > 0)
    } else {
      setShowSuggestions(false)
    }
  }

  function handleSelect(phone: Phone) {
    setQuery(phone.name)
    setShowSuggestions(false)
    navigate({ to: '/result/$slug', params: { slug: phone.slug } })
  }

  function handleCheck() {
    const match = phones.find(
      p => p.name.toLowerCase() === query.toLowerCase()
    ) ?? phones.find(
      p => p.name.toLowerCase().includes(query.toLowerCase())
    )
    if (match) {
      navigate({ to: '/result/$slug', params: { slug: match.slug } })
    }
  }

  const carrierBands = [
    {
      key: 'jazz' as const,
      name: 'Jazz 5G',
      bands: 'n28 (700MHz) + n7/n38/n41 (2600MHz)',
    },
    {
      key: 'zong' as const,
      name: 'Zong 5G',
      bands: 'n28 (700MHz) + n40/n78 (2300/3500MHz)',
    },
    {
      key: 'ufone' as const,
      name: 'Ufone 5G',
      bands: 'n7/n38/n41 (2600MHz)',
    },
  ]

  return (
    <div className="min-h-screen bg-brand-bg font-sans" dir={isUrdu ? 'rtl' : 'ltr'}>

      {/* ── TOP BAR ── */}
      <header className="sticky top-0 z-50 bg-brand-surface border-b border-brand-border">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M14 2L25 8.5V21.5L14 28L3 21.5V8.5L14 2Z"
                    fill="#00A65112" stroke="#00A651" strokeWidth="1.5"/>
              <circle cx="14" cy="14" r="2.5" fill="#00A651"/>
              <path d="M10 11.5Q14 9 18 11.5" stroke="#00A651" strokeWidth="1.2"
                    fill="none" strokeLinecap="round"/>
              <path d="M7.5 9Q14 5.5 20.5 9" stroke="#00A651" strokeWidth="1"
                    fill="none" strokeLinecap="round" opacity="0.5"/>
            </svg>
            <span className="text-[16px] font-bold text-brand-textPrimary tracking-tight">
              5GCheck<span className="text-brand-primary">.pk</span>
            </span>
          </div>
          <button
            onClick={() => setIsUrdu(v => !v)}
            className="text-xs px-3 py-1.5 rounded-full border border-brand-border
                       bg-brand-surfaceAlt text-brand-textSecondary
                       hover:border-brand-primary hover:text-brand-primary
                       transition-all duration-150 cursor-pointer font-medium"
          >
            {isUrdu ? 'English' : 'اردو'}
          </button>
        </div>
      </header>

      <main className="max-w-lg mx-auto pb-24">

        {/* ── HERO CARD ── */}
        <div className="mx-4 mt-4 rounded-3xl overflow-hidden relative"
             style={{ background: 'linear-gradient(140deg, #00A651 0%, #007A3D 100%)' }}>

          {/* Subtle hexagon pattern overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='46' viewBox='0 0 40 46' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 2L38 12V34L20 44L2 34V12L20 2Z' fill='none' stroke='white' stroke-width='0.8'/%3E%3C/svg%3E")`,
            backgroundSize: '40px 46px',
          }}/>

          <div className="relative z-10 p-5">
            {/* Device Intelligence pill */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 mb-4">
              <span className="text-[10px] font-semibold tracking-wider text-white uppercase">
                {isUrdu ? 'ڈیوائس انٹیلیجنس' : 'Device Intelligence'}
              </span>
            </div>

            <div className="flex items-start justify-between gap-3 mb-5">
              <div className="flex-1 min-w-0">
                <h1 className="text-[24px] font-bold text-white leading-[1.15] mb-2 whitespace-pre-line">
                  {isUrdu ? 'کیا میرا فون\n5G سپورٹ کرتا ہے؟' : 'Will My Phone\nSupport 5G?'}
                </h1>
                <p className="text-[12.5px] text-white/80 leading-snug whitespace-pre-line">
                  {isUrdu
                    ? 'Jazz، Zong اور Ufone —\nتینوں ابھی چیک کریں۔'
                    : 'Jazz, Zong & Ufone —\nall three checked instantly.'}
                </p>
              </div>

              {/* Phone + 5G illustration */}
              <div className="relative flex-shrink-0 pointer-events-none" aria-hidden>
                <svg width="78" height="100" viewBox="0 0 78 100" fill="none">
                  <rect x="14" y="4" width="50" height="78" rx="8" stroke="white" strokeWidth="2" fill="white" fillOpacity="0.08"/>
                  <rect x="20" y="12" width="38" height="56" rx="3" stroke="white" strokeWidth="1.2" strokeOpacity="0.5"/>
                  <circle cx="39" cy="76" r="2.5" fill="white" fillOpacity="0.7"/>
                  <path d="M50 30Q56 22 50 14" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
                  <path d="M55 33Q63 22 55 11" stroke="white" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.65"/>
                  <path d="M60 36Q70 22 60 8" stroke="white" strokeWidth="1.1" fill="none" strokeLinecap="round" opacity="0.4"/>
                  <rect x="22" y="86" width="34" height="14" rx="7" fill="white"/>
                  <text x="39" y="96" textAnchor="middle" fontSize="9" fontWeight="800" fill="#00A651" fontFamily="Sora, sans-serif">5G</text>
                </svg>
              </div>
            </div>

            {/* Search input */}
            <div className="relative">
              <div className="relative">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                     width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="7" cy="7" r="4.5" stroke="#8FA99A" strokeWidth="1.3"/>
                  <path d="M10.5 10.5L13 13" stroke="#8FA99A" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => handleInput(e.target.value)}
                  onFocus={() => query.length >= 2 && setShowSuggestions(suggestions.length > 0)}
                  placeholder={isUrdu ? 'مثال: Samsung Galaxy S25، iPhone 16...' : 'e.g. Samsung Galaxy S25, iPhone 16...'}
                  className="w-full h-12 bg-white rounded-xl pl-10 pr-4 text-[13.5px]
                             text-brand-textPrimary placeholder-brand-textMuted
                             border-0 outline-none focus:ring-2 focus:ring-white/60
                             transition-all duration-150"
                />
              </div>

              {showSuggestions && (
                <div ref={suggestionsRef}
                     className="absolute top-full left-0 right-0 mt-1.5 bg-white
                                rounded-xl border border-brand-border shadow-lg z-50
                                overflow-hidden animate-slide-down">
                  {suggestions.map((p, i) => (
                    <button
                      key={p.slug}
                      onClick={() => handleSelect(p)}
                      className={`w-full text-left px-4 py-2.5 text-[13px]
                                  text-brand-textPrimary hover:bg-brand-primaryLight
                                  transition-colors duration-100 cursor-pointer
                                  ${i < suggestions.length - 1 ? 'border-b border-brand-border' : ''}`}
                    >
                      <span className="font-medium">{p.name}</span>
                      <span className="ml-2 text-brand-textMuted text-[11px]">{p.brand}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleCheck}
              className="w-full h-12 mt-2.5 bg-white text-brand-primary font-bold
                         text-[13px] tracking-wide rounded-xl border-0 cursor-pointer
                         hover:bg-brand-primaryLight active:scale-[0.97]
                         transition-all duration-150"
            >
              {isUrdu ? 'مطابقت چیک کریں' : 'CHECK 5G COMPATIBILITY'}
            </button>
          </div>
        </div>

        {/* ── QUICK CHECK ── */}
        <div className="px-4 mt-6">
          <h2 className="text-[18px] font-bold text-brand-textPrimary mb-3">
            {isUrdu ? 'فوری چیک' : 'Quick Check'}
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                label: isUrdu ? 'میرا فون' : 'My Phone',
                tint: 'bg-emerald-50 text-emerald-600',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="6" y="2" width="12" height="20" rx="3" stroke="currentColor" strokeWidth="1.6"/>
                    <path d="M10 18h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  </svg>
                ),
                action: () => inputRef.current?.focus(),
              },
              {
                label: isUrdu ? '5G پیکجز' : '5G Packages',
                tint: 'bg-violet-50 text-violet-600',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.6"/>
                    <path d="M3 11h18" stroke="currentColor" strokeWidth="1.6"/>
                    <circle cx="7" cy="15" r="1" fill="currentColor"/>
                    <circle cx="11" cy="15" r="1" fill="currentColor"/>
                    <circle cx="15" cy="15" r="1" fill="currentColor"/>
                  </svg>
                ),
                action: () => navigate({ to: '/packages' }),
              },
              {
                label: isUrdu ? '5G کوریج' : '5G Coverage',
                tint: 'bg-amber-50 text-amber-600',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 22s-7-7-7-12a7 7 0 1114 0c0 5-7 12-7 12z" stroke="currentColor" strokeWidth="1.6"/>
                    <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6"/>
                  </svg>
                ),
                action: () => navigate({ to: '/coverage' }),
              },
              {
                label: isUrdu ? 'اسپیڈ ٹیسٹ' : 'Speed Test',
                tint: 'bg-rose-50 text-rose-600',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
                    <path d="M14 4L9 13h5l-2 7 8-11h-6l2-5z" fill="currentColor"/>
                  </svg>
                ),
                action: () => navigate({ to: '/speedtest' }),
              },
              {
                label: isUrdu ? 'IMEI چیک' : 'IMEI Check',
                tint: 'bg-violet-50 text-violet-600',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.6"/>
                    <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  </svg>
                ),
                action: () => inputRef.current?.focus(),
              },
              {
                label: isUrdu ? 'موازنہ' : 'Compare',
                tint: 'bg-orange-50 text-orange-600',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.6"/>
                    <path d="M7 16l3-4 3 3 4-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                action: () => navigate({ to: '/packages' }),
              },
            ].map((item, i) => (
              <button
                key={i}
                onClick={item.action}
                className="bg-brand-surface border border-brand-border rounded-2xl
                           p-3.5 flex flex-col items-start gap-3 cursor-pointer
                           hover:border-brand-primary/40 active:scale-[0.97]
                           transition-all duration-150"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${item.tint}`}>
                  {item.icon}
                </div>
                <span className="text-[12.5px] font-semibold text-brand-textPrimary text-left leading-tight">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── HOW IT WORKS ── */}
        <div className="px-4 mt-7">
          <h2 className="text-[18px] font-bold text-brand-textPrimary mb-3">
            {isUrdu ? 'یہ کیسے کام کرتا ہے' : 'How It Works'}
          </h2>

          <div className="bg-brand-surface border border-brand-border rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-2 h-2 rounded-full bg-brand-primary"/>
              <p className="text-[14px] font-semibold text-brand-textPrimary">
                {isUrdu ? '5G مطابقت کیسے طے ہوتی ہے' : 'How 5G compatibility is determined'}
              </p>
            </div>
            <p className="text-[13px] text-brand-textSecondary leading-[1.6] mb-4">
              {isUrdu ? (
                <>ہر 5G نیٹ ورک مخصوص <span className="font-semibold text-brand-primary">ریڈیو فریکوئنسی بینڈز</span> پر چلتا ہے۔ آپ کے فون کو وہی بینڈز سپورٹ کرنے چاہئیں جو آپ کا کیریئر استعمال کرتا ہے — ورنہ یہ 5G سے کنیکٹ نہیں ہو سکتا، چاہے فون اور نیٹ ورک دونوں "5G قابل" ہوں۔ پاکستان کے تینوں کیریئرز مختلف بینڈز استعمال کرتے ہیں، اور یہاں بکنے والے بہت سے فون انٹرنیشنل ویرینٹس ہیں جن میں ایک یا زیادہ بینڈ غائب ہو سکتے ہیں۔</>
              ) : (
                <>Every 5G network runs on specific <span className="font-semibold text-brand-primary">radio frequency bands</span>. Your phone must support the exact bands your carrier uses — otherwise it cannot connect to 5G even if both the phone and network are "5G capable". Pakistan's three carriers each use different bands, and many phones sold here are international variants that may be missing one or more of these bands.</>
              )}
            </p>

            <div className="flex flex-col gap-2">
              {carrierBands.map((c) => (
                <div key={c.key}
                     className="flex items-center gap-3 bg-brand-surfaceAlt
                                border border-brand-border rounded-xl px-3 py-2.5">
                  <CarrierAvatar carrier={c.key}/>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-semibold text-brand-textPrimary leading-tight">
                      {c.name}
                    </p>
                    <p className="text-[11.5px] text-brand-textMuted font-mono leading-tight mt-0.5 truncate">
                      {c.bands}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* ── BOTTOM TAB BAR ── */}
      <BottomTabBar isUrdu={isUrdu} active="home" />
    </div>
  )
}

export function BottomTabBar({ isUrdu, active }: { isUrdu: boolean; active: string }) {
  const navigate = useNavigate()
  const tabs = [
    {
      id: 'home',
      label: isUrdu ? 'ہوم' : 'Home',
      route: '/',
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M3 10L11 3l8 7v9a1 1 0 01-1 1H14v-5H8v5H4a1 1 0 01-1-1V10z"
                stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      id: 'packages',
      label: isUrdu ? 'پیکجز' : 'Packages',
      route: '/packages',
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <rect x="3" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M3 10h16" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M8 6V4M14 6V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      id: 'coverage',
      label: isUrdu ? 'کوریج' : 'Coverage',
      route: '/coverage',
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M11 20s-7-6.5-7-11a7 7 0 1114 0c0 4.5-7 11-7 11z"
                stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="11" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      ),
    },
    {
      id: 'speedtest',
      label: isUrdu ? 'اسپیڈ' : 'Speed',
      route: '/speedtest',
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M13 3L5 13h7l-3 6 10-10h-7l3-6z"
                stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-brand-surface
                    border-t border-brand-border max-w-lg mx-auto">
      <div className="flex h-16">
        {tabs.map(tab => {
          const isActive = tab.id === active
          return (
            <button
              key={tab.id}
              onClick={() => navigate({ to: tab.route as '/' })}
              className={`flex-1 flex flex-col items-center justify-center gap-1 cursor-pointer
                          transition-all duration-150
                          ${isActive ? 'text-brand-primary' : 'text-brand-textMuted hover:text-brand-textSecondary'}`}
            >
              {tab.icon}
              <span className="text-[10px] font-medium">{tab.label}</span>
              {isActive && (
                <div className="absolute bottom-1 w-1 h-1 rounded-full bg-brand-primary"/>
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
