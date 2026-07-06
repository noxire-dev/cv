import { motion } from 'framer-motion'
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react'
import { Link, type LinkProps, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { LABELS, MECH_EASE, STAMP_DURATION, ZB, ZB_PRESETS } from '../zenBrutalism'

// ═══════════════════════════════════════════════════════════════════
// Design 51 / chrome — factory fixtures shared by every route:
// theme context, search-preserving router wrappers, TopBar nav,
// punch rail, stamp route transition, scroll restoration, dev picker.
// ═══════════════════════════════════════════════════════════════════

// ── Theme context (accent threaded from dev picker) ──

type AccentTheme = { accent: string }
export const ThemeCtx = createContext<AccentTheme>({ accent: ZB.accent })
export function useTheme() { return useContext(ThemeCtx) }

export const pad2 = (n: number) => String(n).padStart(2, '0')

// ── Static grain — ≤3% opacity, never animated ──

export const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E\")"

// ── Search-preserving navigation wrappers ──
// The prototype switcher lives on ?d=51 — every navigation MUST carry
// the current search string. Use these EXCLUSIVELY; never a raw
// <Link> or bare useNavigate() outside this module.

function toWithSearch(to: string, search: string) {
  const hashIdx = to.indexOf('#')
  const pathname = hashIdx === -1 ? to : to.slice(0, hashIdx)
  const hash = hashIdx === -1 ? '' : to.slice(hashIdx)
  return { pathname, search, hash }
}

type PlateLinkProps = Omit<LinkProps, 'to'> & { to: string }

export function PlateLink({ to, ...rest }: PlateLinkProps) {
  const { search } = useLocation()
  return <Link {...rest} to={toWithSearch(to, search)} />
}

export function useZbNavigate() {
  const navigate = useNavigate()
  const { search } = useLocation()
  return useCallback(
    (to: string, options?: { replace?: boolean; state?: unknown }) =>
      navigate(toWithSearch(to, search), options),
    [navigate, search],
  )
}

export function ZbRedirect({ to }: { to: string }) {
  const { search } = useLocation()
  return <Navigate to={toWithSearch(to, search)} replace />
}

// ── Scroll restoration — top on route change, hash targets honored ──

export function ScrollToTop() {
  const location = useLocation()
  const prevPathname = useRef<string | null>(null)

  useLayoutEffect(() => {
    const routeChanged = prevPathname.current !== location.pathname
    prevPathname.current = location.pathname

    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1))
      if (el) {
        // Same-page anchor: glide. Cross-route arrival: jump (under the stamp).
        el.scrollIntoView({ behavior: routeChanged ? 'auto' : 'smooth' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [location.pathname, location.hash, location.key])

  return null
}

// ── Stamp route transition — bgDeep shutter lifts off the new page ──
// Mounted inside the pathname-keyed shell, so each route change
// re-runs it: instant press-down to full cover, then a mechanical
// lift revealing the page top-first. Idempotent under StrictMode.

export function StampRouteTransition() {
  return (
    <motion.div
      className="fixed inset-0 z-[200] pointer-events-none"
      style={{ background: ZB.bgDeep, transformOrigin: '50% 100%' }}
      initial={{ scaleY: 1 }}
      animate={{ scaleY: 0 }}
      transition={{ duration: STAMP_DURATION, ease: MECH_EASE }}
      aria-hidden
    />
  )
}

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

// ── Factory chrome: fixed top status bar with route nav ──
// Indicator discipline: the bar carries exactly one lit (accent)
// element at rest — the power lamp when HOME is active, otherwise
// the active route's kanji.

const NAV_LINKS = [
  { to: '/projects', jp: LABELS.projects.jp, en: LABELS.projects.en, match: '/projects' },
  { to: '/log', jp: LABELS.log.jp, en: LABELS.log.en, match: '/log' },
  { to: '/#contact', jp: LABELS.contact.jp, en: LABELS.contact.en, match: null },
] as const

export function TopBar() {
  const { accent } = useTheme()
  const { pathname } = useLocation()
  const clock = useClock()
  const pct = useScrollProgress()
  const steps = Math.round(pct * 10)
  const gauge = '▮'.repeat(steps) + '▯'.repeat(10 - steps)
  const homeActive = pathname === '/'

  return (
    <header
      className="fixed top-0 inset-x-0 h-10 z-[100] flex items-center justify-between gap-3 px-4 sm:px-6 font-mono text-[10px] tracking-[0.15em] border-b-2"
      style={{ background: ZB.bgDeep, borderColor: ZB.edge, color: ZB.inkMid }}
    >
      <PlateLink to="/" className="flex items-center gap-3 min-w-0" aria-current={homeActive ? 'page' : undefined}>
        <span
          className="w-[7px] h-[7px] shrink-0 transition-colors duration-200"
          style={{ background: homeActive ? accent : ZB.inkDim }}
          aria-hidden
        />
        <span className="truncate" style={{ color: ZB.ink }}>
          SINA DILEK <span style={{ color: ZB.inkDim }}>—</span> <span className="font-jp tracking-normal">製造所</span>
        </span>
        <span className="hidden xl:inline" style={{ color: ZB.inkDim }}>MANIFEST v2</span>
      </PlateLink>

      <div className="flex items-center gap-4 sm:gap-5 shrink-0">
        <nav className="flex items-center gap-3.5 sm:gap-5" aria-label="Primary">
          {NAV_LINKS.map(l => {
            const active = l.match !== null && (pathname === l.match || pathname.startsWith(l.match + '/'))
            return (
              <PlateLink
                key={l.en}
                to={l.to}
                aria-current={active ? 'page' : undefined}
                className={`flex items-baseline gap-1.5 transition-opacity duration-200 ${active ? '' : 'opacity-60 hover:opacity-100'}`}
              >
                <span className="font-jp text-[12px] tracking-normal leading-none" style={{ color: active ? accent : ZB.inkMid }}>
                  {l.jp}
                </span>
                <span className="hidden sm:inline leading-none" style={{ color: active ? ZB.ink : ZB.inkMid }}>
                  {l.en}
                </span>
              </PlateLink>
            )
          })}
        </nav>
        <span className="hidden lg:inline tabular-nums select-none" style={{ color: ZB.inkDim }}>
          {gauge} {String(Math.round(pct * 100)).padStart(2, '0')}%
        </span>
        <span className="hidden md:inline tabular-nums" style={{ color: ZB.ink }}>{clock}</span>
      </div>
    </header>
  )
}

// ── Factory chrome: left punch-hole registration rail (desktop) ──

export function PunchRail() {
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

// ── Dev color picker (Ctrl+Shift+D) — vermillion presets ──

export function DevColorPicker({ accent, setAccent }: { accent: string; setAccent: (c: string) => void }) {
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
