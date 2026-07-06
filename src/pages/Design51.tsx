import { AnimatePresence, motion } from 'framer-motion'
import {
    type CSSProperties,
    Fragment,
    type ReactNode,
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'
import {
    type BlogPost,
    type Capability,
    type Project,
    blogPosts,
    capabilities,
    contactLinks,
    experience,
    projects,
} from './design49Data'
import { LABELS, MECH_EASE, PLATE_TERMS, STAMP_DURATION, ZB, ZB_PRESETS, plateId, zbAccentSoft } from './zenBrutalism'

// ═══════════════════════════════════════════════════════════════════
// Design 51: NAMEPLATE — 銘板
// Single-scroll equipment manifest. The whole portfolio read as a
// stack of Japanese machine nameplates: model, serial, rating, status.
// Zen Brutalism v0.1 — weight from 2px borders and labeling density,
// silence from ma. One vermillion element per plate at rest.
// ═══════════════════════════════════════════════════════════════════

// ── Theme context (accent threaded from dev picker) ──

type AccentTheme = { accent: string; accentSoft: string }
const ThemeCtx = createContext<AccentTheme>({ accent: ZB.accent, accentSoft: zbAccentSoft(ZB.accent) })
function useTheme() { return useContext(ThemeCtx) }

const pad2 = (n: number) => String(n).padStart(2, '0')

// ── Static grain — ≤3% opacity, never animated ──

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E\")"

// ── Hooks: live clock + stepped scroll gauge ──

function useClock(): string {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return now.toLocaleTimeString('en-GB', { hour12: false })
}

function useScrollProgress(): number {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    let raf = 0
    const measure = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setPct(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0)
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(measure)
    }
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
  return pct
}

// ── Scroll reveal — 12px translate + opacity, MECH_EASE, 0.5s ──

function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: MECH_EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

// ── Dev color picker (Ctrl+Shift+D) — vermillion presets ──

function DevColorPicker({ accent, setAccent }: { accent: string; setAccent: (c: string) => void }) {
  const [open, setOpen] = useState(false)
  const [hex, setHex] = useState(accent)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault()
        setOpen(o => !o)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => { setHex(accent) }, [accent])

  if (!open) return null

  const applyHex = (v: string) => {
    if (/^#[0-9a-fA-F]{6}$/.test(v)) setAccent(v)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: STAMP_DURATION, ease: MECH_EASE }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] font-mono border-2 p-3"
      style={{ background: ZB.plate, borderColor: ZB.edge }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[11px] tracking-widest" style={{ color: ZB.inkDim }}>DEV_THEME</span>
        <button onClick={() => setOpen(false)} className="ml-auto text-[11px]" style={{ color: ZB.inkDim }}>✕</button>
      </div>
      <div className="flex items-center gap-1.5 mb-2">
        {ZB_PRESETS.map(p => (
          <button key={p.hex} onClick={() => { setAccent(p.hex); setHex(p.hex) }}
            className="w-7 h-7 border-2 transition-transform hover:scale-110"
            style={{
              background: p.hex,
              borderColor: accent === p.hex ? ZB.ink : 'transparent',
            }}
            title={p.name}
          />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[11px]" style={{ color: ZB.inkDim }}>#</span>
        <input
          value={hex.replace('#', '')}
          onChange={e => {
            const raw = e.target.value.replace(/[^0-9a-fA-F]/g, '').slice(0, 6)
            setHex('#' + raw)
          }}
          onKeyDown={e => { if (e.key === 'Enter') applyHex(hex) }}
          className="bg-transparent border-b text-[13px] w-[5.5rem] outline-none"
          style={{ color: ZB.ink, borderColor: ZB.edge }}
          maxLength={6}
          spellCheck={false}
          placeholder="D9402B"
        />
        <div className="w-4 h-4" style={{ background: accent }} />
      </div>
    </motion.div>
  )
}

// ── Factory chrome: fixed top status bar ──
// Single accent at rest: the power lamp square, far left.

function TopBar() {
  const { accent } = useTheme()
  const clock = useClock()
  const pct = useScrollProgress()
  const steps = Math.round(pct * 10)
  const gauge = '▮'.repeat(steps) + '▯'.repeat(10 - steps)

  return (
    <header
      className="fixed top-0 inset-x-0 h-10 z-[100] flex items-center justify-between px-4 sm:px-6 font-mono text-[10px] tracking-[0.15em] border-b-2"
      style={{ background: ZB.bgDeep, borderColor: ZB.edge, color: ZB.inkMid }}
    >
      <div className="flex items-center gap-3 min-w-0">
        <span className="w-[7px] h-[7px] shrink-0" style={{ background: accent }} aria-hidden />
        <span className="truncate" style={{ color: ZB.ink }}>
          SINA DILEK <span style={{ color: ZB.inkDim }}>—</span> <span className="font-jp tracking-normal">製造所</span>
        </span>
        <span className="hidden md:inline" style={{ color: ZB.inkDim }}>MANIFEST v1</span>
      </div>
      <div className="flex items-center gap-4 shrink-0">
        <span className="hidden sm:inline tabular-nums select-none" style={{ color: ZB.inkDim }}>
          {gauge} {String(Math.round(pct * 100)).padStart(2, '0')}%
        </span>
        <span className="tabular-nums" style={{ color: ZB.ink }}>{clock}</span>
      </div>
    </header>
  )
}

// ── Factory chrome: left punch-hole registration rail (desktop) ──

function PunchRail() {
  return (
    <div
      className="hidden lg:flex fixed left-0 top-10 bottom-0 w-10 flex-col items-center gap-[110px] pt-14 overflow-hidden z-[50] pointer-events-none"
      aria-hidden
    >
      {Array.from({ length: 14 }, (_, i) => (
        <span
          key={i}
          className="w-[10px] h-[10px] shrink-0 rounded-full border-2"
          style={{ borderColor: ZB.edge, background: ZB.bgDeep }}
        />
      ))}
    </div>
  )
}

// ── Shared plate anatomy ──

function PlateRow({ term, value, valueColor }: { term: { jp: string; en: string }; value: string; valueColor?: string }) {
  return (
    <div className="grid grid-cols-[110px_1fr] sm:grid-cols-[140px_1fr] gap-4 py-2.5 border-b" style={{ borderColor: ZB.edge }}>
      <span className="font-mono text-[10px] tracking-[0.2em] leading-5" style={{ color: ZB.inkDim }}>
        <span className="font-jp mr-2 tracking-normal" style={{ color: ZB.inkMid }}>{term.jp}</span>{term.en}
      </span>
      <span className="font-mono text-[13px] leading-5" style={{ color: valueColor ?? ZB.ink }}>{value}</span>
    </div>
  )
}

function SectionHead({ jp, en, tag, accentSquare }: { jp: string; en: string; tag?: string; accentSquare?: boolean }) {
  const { accent } = useTheme()
  return (
    <div className="flex items-center gap-3">
      {accentSquare && <span className="w-2 h-2 shrink-0" style={{ background: accent }} aria-hidden />}
      <span className="font-jp text-[13px] leading-none" style={{ color: ZB.inkMid }}>{jp}</span>
      <h2 className="font-mono text-[11px] tracking-[0.3em] leading-none" style={{ color: ZB.ink }}>{en}</h2>
      <span className="flex-1 h-px" style={{ background: ZB.edge }} aria-hidden />
      {tag && <span className="font-mono text-[10px] tracking-[0.15em] tabular-nums" style={{ color: ZB.inkDim }}>{tag}</span>}
    </div>
  )
}

function ScrewHole({ pos }: { pos: string }) {
  return (
    <span
      className={`absolute ${pos} w-[9px] h-[9px] rounded-full border-2 pointer-events-none`}
      style={{ borderColor: ZB.edge, background: ZB.bgDeep }}
      aria-hidden
    />
  )
}

function PunchDivider() {
  return (
    <div className="flex items-center justify-center gap-4 py-12 select-none" aria-hidden>
      <span className="w-[7px] h-[7px] rounded-full border-2" style={{ borderColor: ZB.edge }} />
      <span className="w-20 sm:w-28 h-px" style={{ background: ZB.edge }} />
      <span className="w-[7px] h-[7px] rounded-full border-2" style={{ borderColor: ZB.edge }} />
    </div>
  )
}

// ── NameplateHero — the machine's own 銘板 ──
// Single accent at rest: the vermillion hanko square in the header row.

function NameplateHero() {
  const { accent } = useTheme()
  return (
    <section className="px-5 pt-28 sm:pt-36">
      <Reveal className="mx-auto max-w-[880px]">
        <div className="relative border-2" style={{ borderColor: ZB.edge, background: ZB.plate }}>
          <ScrewHole pos="top-1.5 left-1.5" />
          <ScrewHole pos="top-1.5 right-1.5" />
          <ScrewHole pos="bottom-1.5 left-1.5" />
          <ScrewHole pos="bottom-1.5 right-1.5" />

          <div className="flex items-center justify-between px-5 sm:px-8 py-3.5 border-b-2" style={{ borderColor: ZB.edge }}>
            <span className="flex items-baseline gap-3">
              <span className="font-jp text-[14px] leading-none" style={{ color: ZB.inkMid }}>銘板</span>
              <span className="font-mono text-[11px] tracking-[0.35em] leading-none" style={{ color: ZB.ink }}>NAMEPLATE</span>
            </span>
            <span className="w-3.5 h-3.5" style={{ background: accent }} aria-hidden />
          </div>

          <div className="px-5 sm:px-8 pt-7 pb-6 border-b" style={{ borderColor: ZB.edge }}>
            <div className="font-mono text-[10px] tracking-[0.2em] mb-3" style={{ color: ZB.inkDim }}>
              <span className="font-jp mr-2 tracking-normal" style={{ color: ZB.inkMid }}>{PLATE_TERMS.model.jp}</span>{PLATE_TERMS.model.en}
            </div>
            <h1
              className="font-archivo leading-[0.95] tracking-tight"
              style={{ fontSize: 'clamp(40px, 8vw, 96px)', color: ZB.ink }}
            >
              SINA DILEK
            </h1>
          </div>

          <div className="px-5 sm:px-8 py-4 [&>*:last-child]:border-b-0">
            <PlateRow term={PLATE_TERMS.serial} value="NX-2003-UK" />
            <PlateRow term={PLATE_TERMS.rated} value="CTO @ PRICE LANTERN / CS @ ESSEX" />
            <PlateRow term={PLATE_TERMS.year} value="2003" />
            <PlateRow term={PLATE_TERMS.status} value="OPERATIONAL" />
          </div>
        </div>
      </Reveal>
    </section>
  )
}

// ── ManifestIndex — table of contents, factory-issue ──

function ManifestIndex() {
  const rows = [
    { id: 'plates', jp: LABELS.projects.jp, en: 'DATA PLATES', count: `${pad2(projects.length)} UNITS` },
    { id: 'inspection', jp: '検査記録', en: 'INSPECTION LOG', count: `${pad2(experience.length)} RECORD` },
    { id: 'ratings', jp: LABELS.capabilities.jp, en: 'CAPABILITIES', count: `${pad2(capabilities.length)} RATED` },
    { id: 'log', jp: LABELS.log.jp, en: 'LOG', count: `${pad2(blogPosts.length)} ENTRIES` },
    { id: 'contact', jp: LABELS.contact.jp, en: 'CONTACT', count: `${pad2(contactLinks.length)} CHANNELS` },
  ]

  return (
    <section className="px-5 pt-24 sm:pt-32">
      <div className="mx-auto max-w-[880px]">
        <Reveal>
          <SectionHead jp="目録" en="MANIFEST INDEX" tag="SEC-00" accentSquare />
        </Reveal>
        <div className="mt-8">
          {rows.map((r, i) => (
            <Reveal key={r.id} delay={i * 0.08}>
              <a
                href={`#${r.id}`}
                onClick={e => {
                  e.preventDefault()
                  document.getElementById(r.id)?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="group grid grid-cols-[32px_1fr_auto] items-baseline gap-4 py-3.5 border-b"
                style={{ borderColor: ZB.edge }}
              >
                <span className="font-mono text-[10px] tabular-nums" style={{ color: ZB.inkDim }}>{pad2(i + 1)}</span>
                <span className="flex items-baseline gap-2.5 min-w-0">
                  <span className="font-jp text-[12px]" style={{ color: ZB.inkMid }}>{r.jp}</span>
                  <span className="font-mono text-[12px] tracking-[0.2em] truncate transition-colors text-[#EAE4DA] group-hover:text-[color:var(--zb-accent)]">
                    {r.en}
                  </span>
                </span>
                <span className="font-mono text-[10px] tracking-[0.1em] tabular-nums" style={{ color: ZB.inkDim }}>{r.count}</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── DataPlates — each project stamped as an equipment plate ──
// Single accent per plate at rest: STATUS value, only when LIVE/ACTIVE.

function ExpandField({ jp, en, text }: { jp: string; en: string; text: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] tracking-[0.2em] mb-1.5" style={{ color: ZB.inkDim }}>
        <span className="font-jp mr-2 tracking-normal" style={{ color: ZB.inkMid }}>{jp}</span>{en}
      </div>
      <p className="font-mono text-[12px] leading-[1.7]" style={{ color: ZB.inkMid }}>{text}</p>
    </div>
  )
}

function DataPlate({ p, n, open, onToggle }: { p: Project; n: number; open: boolean; onToggle: () => void }) {
  const { accent } = useTheme()
  const hot = p.status === 'LIVE' || p.status === 'ACTIVE'

  return (
    <article className="border-2 transition-colors duration-200" style={{ borderColor: open ? ZB.edgeHi : ZB.edge, background: ZB.plate }}>
      <button onClick={onToggle} aria-expanded={open} className="w-full text-left group">
        <div className="flex items-center justify-between gap-4 px-5 sm:px-7 py-4 border-b-2" style={{ borderColor: ZB.edge }}>
          <div className="flex items-baseline gap-3 min-w-0">
            <span className="font-mono text-[14px] select-none" style={{ color: ZB.inkMid }} aria-hidden>{p.glyph}</span>
            <h3 className="font-archivo text-xl sm:text-2xl leading-none truncate" style={{ color: ZB.ink }}>{p.name}</h3>
          </div>
          <div className="flex items-center gap-4 shrink-0 font-mono text-[10px] tracking-[0.15em]" style={{ color: ZB.inkDim }}>
            <span className="tabular-nums">{plateId(n)}</span>
            <span className="w-5 h-5 border flex items-center justify-center text-[12px] transition-colors group-hover:text-[color:var(--zb-accent)]" style={{ borderColor: ZB.edge }}>
              {open ? '−' : '+'}
            </span>
          </div>
        </div>

        <div className="px-5 sm:px-7 py-3">
          <PlateRow term={PLATE_TERMS.model} value={p.name.toUpperCase()} />
          <PlateRow term={PLATE_TERMS.serial} value={p.idx} />
          <PlateRow term={PLATE_TERMS.rated} value={p.stack.join(' / ')} />
          <PlateRow term={PLATE_TERMS.year} value={p.year} />
          <PlateRow term={PLATE_TERMS.status} value={p.status} valueColor={hot ? accent : ZB.inkMid} />
        </div>

        <p className="px-5 sm:px-7 pb-4 font-mono text-[11px] tracking-[0.05em]" style={{ color: ZB.inkDim }}>
          — {p.brief}
        </p>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="expand"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: MECH_EASE }}
            className="overflow-hidden"
          >
            <div className="border-t-2 px-5 sm:px-7 py-6 space-y-5" style={{ borderColor: ZB.edge, background: ZB.bgDeep }}>
              <ExpandField jp="効果" en="IMPACT" text={p.impact} />
              <ExpandField jp="概要" en="OVERVIEW" text={p.overview} />
              <ExpandField jp="課題" en="PROBLEM" text={p.problem} />
              <ExpandField jp="手法" en="APPROACH" text={p.approach} />

              <div>
                <div className="font-mono text-[10px] tracking-[0.2em] mb-2" style={{ color: ZB.inkDim }}>
                  <span className="font-jp mr-2 tracking-normal" style={{ color: ZB.inkMid }}>機能</span>FEATURES
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
                  {p.features.map(f => (
                    <li key={f} className="font-mono text-[11.5px] leading-5" style={{ color: ZB.ink }}>
                      <span className="mr-2 select-none" style={{ color: ZB.inkDim }} aria-hidden>▪</span>{f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-1">
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-baseline gap-2 font-mono text-[12px] tracking-[0.1em] underline underline-offset-4 transition-colors text-[#EAE4DA] hover:text-[color:var(--zb-accent)]"
                  style={{ textDecorationColor: ZB.edge }}
                >
                  {p.link.replace(/^https?:\/\//, '')}
                  <span aria-hidden>↗</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  )
}

function DataPlates() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section id="plates" className="px-5 pt-28 scroll-mt-16">
      <div className="mx-auto max-w-[880px]">
        <Reveal>
          <SectionHead jp={LABELS.projects.jp} en="DATA PLATES" tag={`${pad2(projects.length)} UNITS`} />
        </Reveal>
        <div className="mt-12">
          {projects.map((p, i) => (
            <Fragment key={p.id}>
              {i > 0 && <PunchDivider />}
              <Reveal>
                <DataPlate
                  p={p}
                  n={i + 1}
                  open={openId === p.id}
                  onToggle={() => setOpenId(cur => (cur === p.id ? null : p.id))}
                />
              </Reveal>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── InspectionLog — experience as an inspection record ──
// Single accent at rest: the rotated vermillion PASS stamp.

function InspectionLog() {
  const { accent } = useTheme()
  return (
    <section id="inspection" className="px-5 pt-28 scroll-mt-16">
      <div className="mx-auto max-w-[880px]">
        <Reveal>
          <SectionHead jp="検査記録" en="INSPECTION LOG" tag={`${pad2(experience.length)} RECORD`} />
        </Reveal>

        {experience.map(job => (
          <Reveal key={job.id} className="mt-12">
            <div className="relative border-2" style={{ borderColor: ZB.edge, background: ZB.plate }}>
              <div
                className="absolute top-5 right-4 sm:top-7 sm:right-8 -rotate-6 border-2 px-2.5 py-1 font-mono text-[11px] tracking-[0.3em] leading-none select-none pointer-events-none"
                style={{ borderColor: accent, color: accent }}
                aria-hidden
              >
                <span className="font-jp mr-1.5 tracking-normal">検</span>PASS
              </div>

              <div className="px-5 sm:px-7 pt-7 pb-5 border-b-2" style={{ borderColor: ZB.edge }}>
                <h3 className="font-archivo text-2xl sm:text-3xl leading-tight pr-24" style={{ color: ZB.ink }}>{job.role}</h3>
                <div className="mt-2 font-mono text-[12px] tracking-[0.08em]" style={{ color: ZB.inkMid }}>{job.company} · {job.tagline}</div>
                <div className="mt-1 font-mono text-[10px] tracking-[0.15em]" style={{ color: ZB.inkDim }}>{job.period} · {job.location.toUpperCase()}</div>
                <p className="mt-4 font-mono text-[12px] leading-[1.7] max-w-[640px]" style={{ color: ZB.inkMid }}>{job.summary}</p>
              </div>

              <div className="[&>div:last-child_.insp-row]:border-b-0">
                {job.highlights.map((h, i) => (
                  <Reveal key={h.label} delay={i * 0.08}>
                    <div
                      className="insp-row grid grid-cols-[84px_1fr] sm:grid-cols-[110px_1fr] gap-4 px-5 sm:px-7 py-4 border-b"
                      style={{ borderColor: ZB.edge }}
                    >
                      <span className="font-mono text-[15px] tabular-nums leading-5" style={{ color: ZB.ink }}>{h.stat}</span>
                      <div>
                        <div className="font-mono text-[11px] tracking-[0.2em] uppercase" style={{ color: ZB.inkMid }}>{h.label}</div>
                        <p className="mt-1 font-mono text-[11.5px] leading-[1.65]" style={{ color: ZB.inkDim }}>{h.detail}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

// ── RatingsPlate — capabilities as electrical ratings ──
// Stepped 10-cell bars; the current-level cell carries accent only on
// PRIMARY entries (per spec — the plate's indicator system).

const CATEGORY_ORDER: Capability['category'][] = ['LANGUAGES', 'FRAMEWORKS', 'SYSTEMS', 'TOOLS']
const CATEGORY_JP: Record<Capability['category'], string> = {
  LANGUAGES: '言語',
  FRAMEWORKS: '枠組',
  SYSTEMS: '系統',
  TOOLS: '工具',
}

function SteppedBar({ pct, level }: { pct: number; level: Capability['level'] }) {
  const { accent } = useTheme()
  const filled = Math.max(0, Math.min(10, Math.round(pct / 10)))
  return (
    <div className="flex gap-[3px]" role="img" aria-label={`${pct}%`}>
      {Array.from({ length: 10 }, (_, i) => {
        const isFilled = i < filled
        const isCurrent = i === filled - 1
        return (
          <span
            key={i}
            className="h-[9px] flex-1 max-w-[22px] border"
            style={{
              background: isFilled ? (isCurrent && level === 'PRIMARY' ? accent : ZB.inkMid) : 'transparent',
              borderColor: isFilled ? 'transparent' : ZB.edge,
            }}
          />
        )
      })}
    </div>
  )
}

function RatingsPlate() {
  const groups = CATEGORY_ORDER
    .map(c => ({ category: c, items: capabilities.filter(k => k.category === c) }))
    .filter(g => g.items.length > 0)

  return (
    <section id="ratings" className="px-5 pt-28 scroll-mt-16">
      <div className="mx-auto max-w-[880px]">
        <Reveal>
          <SectionHead jp={LABELS.capabilities.jp} en={LABELS.capabilities.en} tag={`${pad2(capabilities.length)} RATED`} />
        </Reveal>

        <Reveal className="mt-12">
          <div className="border-2" style={{ borderColor: ZB.edge, background: ZB.plate }}>
            {groups.map((g, gi) => (
              <div key={g.category}>
                <div
                  className={`flex items-center justify-between px-5 sm:px-7 py-2.5 border-b-2 ${gi > 0 ? 'border-t-2' : ''}`}
                  style={{ borderColor: ZB.edge, background: ZB.bgDeep }}
                >
                  <span className="font-mono text-[10px] tracking-[0.25em]" style={{ color: ZB.inkDim }}>
                    <span className="font-jp mr-2 tracking-normal" style={{ color: ZB.inkMid }}>{CATEGORY_JP[g.category]}</span>
                    {g.category}
                  </span>
                  <span className="font-mono text-[10px] tabular-nums" style={{ color: ZB.inkDim }}>{pad2(g.items.length)}</span>
                </div>
                <div className="[&>div:last-child]:border-b-0">
                  {g.items.map(cap => (
                    <div
                      key={cap.name}
                      className="grid grid-cols-[1fr_auto] sm:grid-cols-[170px_92px_1fr_48px] items-center gap-x-4 gap-y-2 px-5 sm:px-7 py-3 border-b"
                      style={{ borderColor: ZB.edge }}
                    >
                      <span className="font-mono text-[13px] leading-none" style={{ color: ZB.ink }}>{cap.name}</span>
                      <span className="hidden sm:block font-mono text-[9px] tracking-[0.2em]" style={{ color: ZB.inkDim }}>{cap.level}</span>
                      <div className="col-span-2 sm:col-span-1 sm:order-none order-last">
                        <SteppedBar pct={cap.pct} level={cap.level} />
                      </div>
                      <span className="font-mono text-[11px] tabular-nums text-right" style={{ color: ZB.inkDim }}>{cap.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ── LogSection — blog posts as date-stamped log entries ──
// Single accent at rest: the section-head square.

function LogEntry({ post, open, onToggle }: { post: BlogPost; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-b" style={{ borderColor: ZB.edge }}>
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="w-full text-left group grid grid-cols-[auto_1fr_auto] sm:grid-cols-[96px_1fr_auto_auto_auto] items-baseline gap-x-4 py-4"
      >
        <span className="font-mono text-[11px] tabular-nums" style={{ color: ZB.inkDim }}>{post.date}</span>
        <span className="font-mono text-[13px] tracking-[0.08em] truncate transition-colors text-[#EAE4DA] group-hover:text-[color:var(--zb-accent)]">
          {post.title}
        </span>
        <span className="hidden sm:inline font-mono text-[10px] tracking-[0.1em]" style={{ color: ZB.inkDim }}>
          {post.tags.join(' · ')}
        </span>
        <span className="hidden sm:inline font-mono text-[10px] tabular-nums" style={{ color: ZB.inkDim }}>{post.readTime}</span>
        <span className="font-mono text-[12px] justify-self-end" style={{ color: ZB.inkDim }} aria-hidden>{open ? '−' : '+'}</span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="expand"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: MECH_EASE }}
            className="overflow-hidden"
          >
            <div className="pb-6 pl-0 sm:pl-[112px] max-w-[620px]">
              <p className="font-mono text-[12px] leading-[1.7]" style={{ color: ZB.inkMid }}>{post.excerpt}</p>
              <div className="mt-3 space-y-3">
                {post.content.split('\n\n').map((para, i) => (
                  <p key={i} className="font-mono text-[12px] leading-[1.7]" style={{ color: ZB.inkDim }}>{para}</p>
                ))}
              </div>
              <div className="mt-4 font-mono text-[10px] tracking-[0.15em] sm:hidden" style={{ color: ZB.inkDim }}>
                {post.tags.join(' · ')} · {post.readTime}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function LogSection() {
  const [openId, setOpenId] = useState<string | null>(null)
  return (
    <section id="log" className="px-5 pt-28 scroll-mt-16">
      <div className="mx-auto max-w-[880px]">
        <Reveal>
          <SectionHead jp={LABELS.log.jp} en={LABELS.log.en} tag={`${pad2(blogPosts.length)} ENTRIES`} accentSquare />
        </Reveal>
        <div className="mt-8">
          {blogPosts.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.08}>
              <LogEntry
                post={post}
                open={openId === post.id}
                onToggle={() => setOpenId(cur => (cur === post.id ? null : post.id))}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── ContactPlate — three channels stamped on one plate ──
// Single accent at rest: the email row's value.

const CONTACT_JP: Record<string, string> = {
  EMAIL: 'メール',
  GITHUB: 'ギットハブ',
  LINKEDIN: 'リンクトイン',
}

function ContactPlate() {
  const { accent } = useTheme()
  return (
    <section id="contact" className="px-5 pt-28 scroll-mt-16">
      <div className="mx-auto max-w-[880px]">
        <Reveal>
          <SectionHead jp={LABELS.contact.jp} en={LABELS.contact.en} tag={`${pad2(contactLinks.length)} CHANNELS`} />
        </Reveal>

        <Reveal className="mt-12">
          <div className="border-2 px-5 sm:px-8 py-4 [&>a:last-child>div]:border-b-0" style={{ borderColor: ZB.edge, background: ZB.plate }}>
            {contactLinks.map(c => {
              const isEmail = c.label === 'EMAIL'
              return (
                <a
                  key={c.label}
                  href={c.href}
                  target={isEmail ? undefined : '_blank'}
                  rel={isEmail ? undefined : 'noreferrer'}
                  className="block group"
                >
                  <div className="grid grid-cols-[110px_1fr] sm:grid-cols-[140px_1fr] gap-4 py-3 border-b" style={{ borderColor: ZB.edge }}>
                    <span className="font-mono text-[10px] tracking-[0.2em] leading-5" style={{ color: ZB.inkDim }}>
                      <span className="font-jp mr-2 tracking-normal" style={{ color: ZB.inkMid }}>{CONTACT_JP[c.label] ?? '連絡'}</span>{c.label}
                    </span>
                    <span
                      className={`font-mono text-[13px] leading-5 transition-colors group-hover:text-[color:var(--zb-accent)] ${isEmail ? '' : 'text-[#EAE4DA]'}`}
                      style={isEmail ? { color: accent } : undefined}
                    >
                      {c.value} <span style={{ color: ZB.inkDim }} aria-hidden>↗</span>
                    </span>
                  </div>
                </a>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ── Footer ──

function Footer() {
  return (
    <footer className="mt-28 border-t-2 px-5 py-10" style={{ borderColor: ZB.edge, background: ZB.bgDeep }}>
      <p
        className="mx-auto max-w-[880px] text-center font-mono text-[10px] tracking-[0.2em] leading-[1.9]"
        style={{ color: ZB.inkDim }}
      >
        ESSEX, UK · GMT+0 · <span className="font-jp tracking-normal" style={{ color: ZB.inkMid }}>手作業で設計・製造</span> / DESIGNED &amp; BUILT BY HAND · © 2026
      </p>
    </footer>
  )
}

// ── Page ──

export default function Design51() {
  const [accent, setAccent] = useState<string>(ZB.accent)
  const theme = useMemo<AccentTheme>(() => ({ accent, accentSoft: zbAccentSoft(accent) }), [accent])

  return (
    <ThemeCtx.Provider value={theme}>
      <div
        className="min-h-screen antialiased"
        style={{ background: ZB.bg, color: ZB.ink, '--zb-accent': accent } as CSSProperties}
      >
        <style>{`::selection { background: ${accent}; color: ${ZB.bgDeep}; }`}</style>

        <TopBar />
        <PunchRail />

        {/* static grain — never animated, ≤3% */}
        <div className="fixed inset-0 pointer-events-none z-[90]" style={{ backgroundImage: GRAIN, opacity: 0.025 }} aria-hidden />

        <main className="relative pb-8">
          <NameplateHero />
          <ManifestIndex />
          <DataPlates />
          <InspectionLog />
          <RatingsPlate />
          <LogSection />
          <ContactPlate />
        </main>

        <Footer />
        <DevColorPicker accent={accent} setAccent={setAccent} />
      </div>
    </ThemeCtx.Provider>
  )
}
