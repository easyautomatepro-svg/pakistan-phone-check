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

  const stats = [
    { value: '272', label: isUrdu ? 'فونز' : 'Phones' },
    { value: '3',   label: isUrdu ? 'کیریئرز' : 'Carriers' },
    { value: 'Jazz · Zong · Ufone', label: '' },
  ]

  const explainerCards = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <rect x="7" y="2" width="8" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M3 7h2M3 11h2M3 15h2M17 7h2M17 11h2M17 15h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      title: isUrdu ? 'ایک ہی فون، مختلف نتائج' : 'Same phone, different results',
      body: isUrdu
        ? 'UAE میں بکنے والے فون میں وہ فریکوئنسی نہیں ہوتی جو Jazz استعمال کرتا ہے۔ ایک ہی ماڈل نیم، اندر مختلف بینڈز۔'
        : 'A phone sold in UAE may miss the exact frequency Jazz uses. Same model name — different bands inside.',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M11 2v4M11 16v4M4.22 4.22l2.83 2.83M14.95 14.95l2.83 2.83M2 11h4M16 11h4M4.22 17.78l2.83-2.83M14.95 7.05l2.83-2.83" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="11" cy="11" r="3" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      ),
      title: isUrdu ? 'ہر کیریئر مختلف بینڈ استعمال کرتا ہے' : 'Each carrier uses different bands',
      body: isUrdu
        ? 'Jazz کو n28 چاہیے۔ Zong کو n78 چاہیے۔ Ufone کو n41 چاہیے۔ آپ کے فون کو میچ کرنا ضروری ہے — ہم تینوں چیک کرتے ہیں۔'
        : 'Jazz needs n28. Zong needs n78. Ufone needs n41. Your phone must match. We check all three for you.',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 3a9 9 0 100 18A9 9 0 0012 3z" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      ),
      title: isUrdu ? 'ہم 272 فونز چیک کرتے ہیں' : 'We check 272 phones',
      body: isUrdu
        ? 'ہمارا ڈیٹابیس پاکستان میں بکنے والے ہر بڑے برانڈ کو کور کرتا ہے — Samsung، Apple، Xiaomi، Vivo، Oppo، Realme اور مزید۔'
        : 'Our database covers every major brand sold in Pakistan — Samsung, Apple, Xiaomi, Vivo, Oppo, Realme and more.',
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

          {/* Floating phone+signal illustration */}
          <div className="absolute right-4 top-4 opacity-20 animate-pulse-soft pointer-events-none">
            <svg width="52" height="72" viewBox="0 0 52 72" fill="none">
              <rect x="8" y="4" width="36" height="64" rx="6" stroke="white" strokeWidth="2"/>
              <path d="M20 12h12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="26" cy="60" r="3" fill="white"/>
              <path d="M34 28Q38 22 34 16" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              <path d="M38 31Q44 22 38 13" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.6"/>
              <path d="M42 34Q50 22 42 10" stroke="white" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.35"/>
            </svg>
          </div>

          <div className="relative z-10 p-6 pb-5">
            <p className="text-[10px] font-semibold tracking-widest text-white/70 uppercase mb-2">
              {isUrdu ? 'پاکستان ڈیوائس انٹیلیجنس' : 'Pakistan Device Intelligence'}
            </p>
            <h1 className="text-[26px] font-bold text-white leading-tight mb-2">
              {isUrdu ? 'کیا میرا فون 5G سپورٹ کرتا ہے؟' : 'Will My Phone\nSupport 5G?'}
            </h1>
            <p className="text-[13px] text-white/75 mb-5 leading-relaxed">
              {isUrdu
                ? 'Jazz، Zong اور Ufone کی 5G مطابقت ابھی چیک کریں'
                : 'Check Jazz, Zong & Ufone compatibility instantly.'}
            </p>

            {/* Stats strip */}
            <div className="flex items-center gap-2 mb-5 flex-wrap">
              {stats.map((s, i) => (
                <span key={i} className="text-[12px] text-white/80">
                  <span className="font-bold text-white">{s.value}</span>
                  {s.label && <span> {s.label}</span>}
                  {i < stats.length - 1 && <span className="mx-1.5 opacity-40">·</span>}
                </span>
              ))}
            </div>

            {/* Search input */}
            <div className="relative">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
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
                  className="w-full h-12 bg-white/95 rounded-xl pl-10 pr-4 text-[14px]
                             text-brand-textPrimary placeholder-brand-textMuted
                             border-0 outline-none focus:ring-2 focus:ring-white/50
                             transition-all duration-150"
                />
              </div>

              {/* Autocomplete */}
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

            {/* CTA Button */}
            <button
              onClick={handleCheck}
              className="w-full h-12 mt-2.5 bg-white text-brand-primary font-bold
                         text-[14px] tracking-wide rounded-xl border-0 cursor-pointer
                         hover:bg-brand-primaryLight active:scale-[0.97]
                         transition-all duration-150"
            >
              {isUrdu ? 'مطابقت چیک کریں' : 'CHECK 5G COMPATIBILITY'}
            </button>
          </div>
        </div>

        {/* ── QUICK ACTIONS ── */}
        <div className="px-4 mt-5">
          <p className="text-[11px] font-semibold tracking-widest text-brand-textMuted uppercase mb-3">
            {isUrdu ? 'فوری اعمال' : 'Quick Actions'}
          </p>
          <div className="grid grid-cols-4 gap-3">
            {[
              {
                label: isUrdu ? 'میرا فون' : 'My Phone',
                icon: (
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <rect x="5" y="2" width="12" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="11" cy="16" r="1" fill="currentColor"/>
                  </svg>
                ),
                action: () => inputRef.current?.focus(),
              },
              {
                label: isUrdu ? 'پیکجز' : 'Packages',
                icon: (
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <rect x="3" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M3 10h16" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M8 6V4M14 6V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                ),
                action: () => navigate({ to: '/packages' }),
              },
              {
                label: isUrdu ? 'کوریج' : 'Coverage',
                icon: (
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M11 20s-7-6.5-7-11a7 7 0 1114 0c0 4.5-7 11-7 11z" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="11" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                ),
                action: () => navigate({ to: '/coverage' }),
              },
              {
                label: isUrdu ? 'اسپیڈ' : 'Speed Test',
                icon: (
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M13 3L5 13h7l-3 6 10-10h-7l3-6z" stroke="currentColor" strokeWidth="1.5"
                          strokeLinejoin="round"/>
                  </svg>
                ),
                action: () => navigate({ to: '/speedtest' }),
              },
            ].map((item, i) => (
              <button
                key={i}
                onClick={item.action}
                className="flex flex-col items-center gap-2 cursor-pointer group"
              >
                <div className="w-14 h-14 bg-brand-surface border border-brand-border
                                rounded-2xl flex items-center justify-center
                                text-brand-textMuted group-hover:border-brand-primary
                                group-hover:text-brand-primary group-hover:bg-brand-primaryLight
                                transition-all duration-150">
                  {item.icon}
                </div>
                <span className="text-[11px] font-medium text-brand-textSecondary
                                 text-center leading-tight group-hover:text-brand-primary
                                 transition-colors duration-150">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── WHY 5G BANDS MATTER ── */}
        <div className="px-4 mt-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-0.5 h-4 bg-brand-primary rounded-full"/>
            <p className="text-[11px] font-semibold tracking-widest text-brand-textMuted uppercase">
              {isUrdu ? '5G بینڈز کیوں اہم ہیں' : 'Why 5G Bands Matter'}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {explainerCards.map((card, i) => (
              <div
                key={i}
                className="bg-brand-surface border border-brand-border rounded-2xl p-4
                           hover:border-brand-primary/30 transition-all duration-200
                           animate-fade-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-brand-primaryLight rounded-xl flex items-center
                                  justify-center text-brand-primary flex-shrink-0">
                    {card.icon}
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-brand-textPrimary mb-1">
                      {card.title}
                    </p>
                    <p className="text-[13px] text-brand-textMuted leading-relaxed">
                      {card.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
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
