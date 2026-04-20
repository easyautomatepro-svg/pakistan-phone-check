import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import phones from '../data/phones.json'
import { BottomTabBar } from './index'

export const Route = createFileRoute('/result/$slug')({
  component: ResultPage,
})

type StatusType = 'YES' | 'PARTIAL' | 'NO'

function StatusPill({ status }: { status: string }) {
  const map: Record<string, { label: string; classes: string; icon: string }> = {
    YES:     { label: 'Supported',     icon: '✓', classes: 'bg-status-yesBg text-status-yesText border border-status-yesBorder' },
    PARTIAL: { label: 'Partial',       icon: '~', classes: 'bg-status-partialBg text-status-partialText border border-status-partialBorder' },
    NO:      { label: 'Not Supported', icon: '✗', classes: 'bg-status-noBg text-status-noText border border-status-noBorder' },
  }
  const s = map[status] ?? map['NO']
  return (
    <span className={`inline-flex items-center gap-1.5 text-[12px] font-semibold
                      rounded-full px-3 py-1 ${s.classes}`}>
      <span className="text-[10px]">{s.icon}</span>
      {s.label}
    </span>
  )
}

function OverallBadge({ jazz, zong, ufone }: { jazz: string; zong: string; ufone: string }) {
  const allYes = jazz === 'YES' && zong === 'YES' && ufone === 'YES'
  const allNo  = jazz === 'NO'  && zong === 'NO'  && ufone === 'NO'
  if (allYes) return (
    <span className="inline-flex items-center gap-1.5 text-[12px] font-bold rounded-full
                     px-3 py-1.5 bg-status-yesBg text-status-yesText border border-status-yesBorder">
      ✓ 5G Ready
    </span>
  )
  if (allNo) return (
    <span className="inline-flex items-center gap-1.5 text-[12px] font-bold rounded-full
                     px-3 py-1.5 bg-status-noBg text-status-noText border border-status-noBorder">
      ✗ No 5G
    </span>
  )
  return (
    <span className="inline-flex items-center gap-1.5 text-[12px] font-bold rounded-full
                     px-3 py-1.5 bg-status-partialBg text-status-partialText border border-status-partialBorder">
      ~ Partial 5G
    </span>
  )
}

function CarrierRow({
  carrier, name, status, bands
}: {
  carrier: 'jazz' | 'zong' | 'ufone'
  name: string
  status: string
  bands: string
}) {
  const avatarConfig = {
    jazz:  { letter: 'J', bg: 'bg-red-50',    text: 'text-red-600',    src: '/assets/jazz.png'  },
    zong:  { letter: 'Z', bg: 'bg-blue-50',   text: 'text-blue-600',   src: '/assets/zong.png'  },
    ufone: { letter: 'U', bg: 'bg-purple-50', text: 'text-purple-600', src: '/assets/ufone.png' },
  }
  const c = avatarConfig[carrier]

  return (
    <tr className="border-t border-brand-border hover:bg-brand-primaryLight/30
                   transition-colors duration-100">
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-xl overflow-hidden flex-shrink-0">
            <img src={c.src} alt={name}
                 className="w-full h-full object-contain"
                 onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}/>
            <div className={`absolute inset-0 flex items-center justify-center
                             ${c.bg} ${c.text} font-bold text-sm`}>
              {c.letter}
            </div>
          </div>
          <span className="text-[14px] font-semibold text-brand-textPrimary">{name}</span>
        </div>
      </td>
      <td className="px-2 py-3.5 text-center">
        <StatusPill status={status} />
      </td>
      <td className="px-4 py-3.5 text-right">
        <span className="text-[11px] text-brand-textMuted font-mono">{bands}</span>
      </td>
    </tr>
  )
}

function ResultPage() {
  const { slug } = Route.useParams()
  const navigate  = useNavigate()
  const [isUrdu, setIsUrdu] = useState(false)

  const phone = phones.find(p => p.slug === slug)

  if (!phone) {
    return (
      <div className="min-h-screen bg-brand-bg font-sans flex flex-col items-center
                      justify-center gap-4 px-4">
        <p className="text-brand-textMuted text-center">Phone not found in database.</p>
        <button
          onClick={() => navigate({ to: '/' })}
          className="px-6 py-2.5 bg-brand-primary text-white rounded-xl
                     font-semibold text-[14px] cursor-pointer"
        >
          Go Back
        </button>
      </div>
    )
  }

  const carriers: Array<{
    id: 'jazz' | 'zong' | 'ufone'
    name: string
    status: string
    bands: string
    planUrl: string
  }> = [
    { id: 'jazz',  name: 'Jazz 5G',  status: phone.jazz,  bands: phone.jazzBands,  planUrl: 'https://jazz.com.pk/5g' },
    { id: 'zong',  name: 'Zong 5G',  status: phone.zong,  bands: phone.zongBands,  planUrl: 'https://zong.com.pk/5g' },
    { id: 'ufone', name: 'Ufone 5G', status: phone.ufone, bands: phone.ufoneBands, planUrl: 'https://ufone.com/5g' },
  ]

  return (
    <div className="min-h-screen bg-brand-bg font-sans" dir={isUrdu ? 'rtl' : 'ltr'}>

      {/* TOP BAR */}
      <header className="sticky top-0 z-50 bg-brand-surface border-b border-brand-border">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <button
            onClick={() => navigate({ to: '/' })}
            className="flex items-center gap-2 text-brand-textSecondary
                       hover:text-brand-primary transition-colors cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M11 4L6 9l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className="text-[14px] font-medium">
              {isUrdu ? 'واپس' : 'Search Results'}
            </span>
          </button>
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

      <main className="max-w-lg mx-auto px-4 pt-4 pb-28 animate-fade-up">

        {/* ── RESULT CARD ── */}
        <div className="bg-brand-surface border border-brand-border rounded-2xl
                        overflow-hidden mb-4">

          {/* Card Header */}
          <div className="px-4 pt-4 pb-3 border-b border-brand-border">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold tracking-widest text-brand-textMuted
                               uppercase mb-1">
                  {isUrdu ? 'مطابقت کا نتیجہ' : 'Compatibility Result'}
                </p>
                <h2 className="text-[17px] font-bold text-brand-textPrimary leading-tight">
                  {phone.name}
                </h2>
                <p className="text-[12px] text-brand-textMuted mt-0.5">
                  {phone.brand} · {phone.variant}
                </p>
              </div>
              <OverallBadge jazz={phone.jazz} zong={phone.zong} ufone={phone.ufone}/>
            </div>
          </div>

          {/* Compatibility Table */}
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-brand-surfaceAlt">
                <th className="px-4 py-2.5 text-left text-[10px] font-semibold
                               tracking-widest text-brand-textMuted uppercase">
                  {isUrdu ? 'کیریئر' : 'Carrier'}
                </th>
                <th className="px-2 py-2.5 text-center text-[10px] font-semibold
                               tracking-widest text-brand-textMuted uppercase">
                  {isUrdu ? '5G اسٹیٹس' : '5G Status'}
                </th>
                <th className="px-4 py-2.5 text-right text-[10px] font-semibold
                               tracking-widest text-brand-textMuted uppercase">
                  {isUrdu ? 'بینڈز' : 'Bands'}
                </th>
              </tr>
            </thead>
            <tbody>
              {carriers.map(c => (
                <CarrierRow
                  key={c.id}
                  carrier={c.id}
                  name={c.name}
                  status={c.status}
                  bands={c.bands}
                />
              ))}
            </tbody>
          </table>

          {/* Card Footer */}
          <div className="px-4 py-2.5 bg-brand-surfaceAlt border-t border-brand-border
                          flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="5.5" stroke="#7A9E8A" strokeWidth="1.2"/>
              <path d="M7 6v4M7 4.5v.5" stroke="#7A9E8A" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <p className="text-[11px] text-brand-textMuted">
              {isUrdu
                ? `اعتماد: ${phone.confidence} · ویریئنٹ: ${phone.variant} · ماخذ: GSMArena`
                : `Confidence: ${phone.confidence} · Variant: ${phone.variant} · Source: GSMArena`}
            </p>
          </div>
        </div>

        {/* ── PLAN COMPARISON ── */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-0.5 h-4 bg-brand-primary rounded-full"/>
            <p className="text-[11px] font-semibold tracking-widest text-brand-textMuted uppercase">
              {isUrdu ? '5G پلانز موازنہ' : 'Compare 5G Plans'}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {carriers.map((c, i) => (
              <div
                key={c.id}
                className="bg-brand-surface border border-brand-border rounded-2xl p-4
                           animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`relative w-8 h-8 rounded-xl overflow-hidden flex-shrink-0`}>
                    <img src={`/assets/${c.id}.png`} alt={c.name}
                         className="w-full h-full object-contain"
                         onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}/>
                    <div className={`absolute inset-0 flex items-center justify-center font-bold text-sm
                      ${c.id === 'jazz'  ? 'bg-red-50 text-red-600'    : ''}
                      ${c.id === 'zong'  ? 'bg-blue-50 text-blue-600'  : ''}
                      ${c.id === 'ufone' ? 'bg-purple-50 text-purple-600' : ''}`}>
                      {c.id === 'jazz' ? 'J' : c.id === 'zong' ? 'Z' : 'U'}
                    </div>
                  </div>
                  <span className="text-[14px] font-semibold text-brand-textPrimary flex-1">
                    {c.name}
                  </span>
                  <StatusPill status={c.status} />
                </div>
                {c.status !== 'NO' ? (
                  <a
                    href={c.planUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-9 bg-brand-primaryLight text-brand-primary
                               border border-brand-primary/20 rounded-xl
                               font-semibold text-[13px] text-center leading-9
                               hover:bg-brand-primary hover:text-white
                               transition-all duration-150 cursor-pointer"
                  >
                    {isUrdu ? 'پلانز دیکھیں ←' : 'View Plans →'}
                  </a>
                ) : (
                  <p className="text-center text-[12px] text-brand-textMuted py-1">
                    {isUrdu
                      ? `یہ فون ${c.name} 5G کے ساتھ مطابق نہیں ہے`
                      : `Phone not compatible with ${c.name}`}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── DARAZ CTA ── */}
        <a
          href="https://www.daraz.pk/5g-phones/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-brand-primaryLight border
                     border-brand-primary/20 rounded-2xl p-4 cursor-pointer
                     hover:bg-brand-primary group transition-all duration-200 mb-4"
        >
          <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center
                          justify-center text-brand-primary group-hover:bg-white/20
                          flex-shrink-0 transition-all">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <rect x="5" y="2" width="12" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M8 8h6M8 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M13 15l2 2 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-[14px] font-semibold text-brand-textPrimary
                          group-hover:text-white transition-colors">
              {isUrdu ? 'فون اپگریڈ کریں' : 'Upgrade Your Phone'}
            </p>
            <p className="text-[12px] text-brand-textMuted group-hover:text-white/70
                          transition-colors">
              {isUrdu ? 'Daraz پر مطابق 5G فونز دیکھیں' : 'See compatible 5G phones on Daraz'}
            </p>
          </div>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
               className="text-brand-primary group-hover:text-white transition-colors">
            <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </a>

      </main>

      <BottomTabBar isUrdu={isUrdu} active="home" />
    </div>
  )
}
