import { useEffect, useRef, useState } from 'react'
import { projects } from './design49Data'

// ── Design 52: ZEN BRUTALISM v3 ──────────────────────────────────────────────
// Dark-only. Industrial brutalism × Japanese minimalism (Ma).
// Display: Syne · Body: Plus Jakarta Sans · Meta: JetBrains Mono
// One accent (live-swappable): iris / terracotta / wasabi.
// Details: 90° corners, hard (non-blurring) shadows that SHIFT on hover,
// exposed column grid, concrete noise, custom raw cursor.
//
// Components so far: HERO + SELECTED WORK. More to follow.
// ─────────────────────────────────────────────────────────────────────────────

const ACCENTS = [
  { id: 'iris', name: 'IRIS', hex: '#8F90C2' },
  { id: 'terra', name: 'TERRA', hex: '#C86B53' },
  { id: 'wasabi', name: 'WASABI', hex: '#7D8C6A' },
] as const

function hexToRgba(hex: string, a: number) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

const FOCUS = [
  { i: '01', t: 'Backend Systems', d: 'Python · Go · FastAPI' },
  { i: '02', t: 'Data Pipelines', d: 'Scraping · Caching · ETL' },
  { i: '03', t: 'Developer Tools', d: 'Shells · CLIs · DX' },
]

// Custom raw cursor: crisp square, tracks 1:1 (no lag = brutalist),
// swells to a ring over interactive elements. Off on touch.
function useRawCursor(rootRef: React.RefObject<HTMLDivElement>) {
  const dotRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const root = rootRef.current
    const dot = dotRef.current
    if (!root || !dot) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    root.classList.add('zb-cursor-on')
    let raf = 0
    const move = (e: MouseEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      })
    }
    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      dot.classList.toggle('is-active', !!el.closest('[data-cursor="active"]'))
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      root.classList.remove('zb-cursor-on')
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      cancelAnimationFrame(raf)
    }
  }, [rootRef])
  return dotRef
}

// Reveal-on-scroll for below-the-fold sections.
function useReveal(rootRef: React.RefObject<HTMLDivElement>) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const els = Array.from(root.querySelectorAll('.zb-reveal'))
    if (!('IntersectionObserver' in window)) {
      els.forEach((e) => e.classList.add('is-in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('is-in')
            io.unobserve(en.target)
          }
        }),
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' },
    )
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [rootRef])
}

function AccentToggle({
  accentId,
  setAccentId,
}: {
  accentId: string
  setAccentId: (id: string) => void
}) {
  return (
    <div className="zb52-accents" role="group" aria-label="Accent colour">
      <span className="lbl">ACCENT</span>
      {ACCENTS.map((a) => (
        <button
          key={a.id}
          type="button"
          data-cursor="active"
          className={`sw${accentId === a.id ? ' is-on' : ''}`}
          style={{ background: a.hex }}
          onClick={() => setAccentId(a.id)}
          aria-pressed={accentId === a.id}
          title={a.name}
        />
      ))}
    </div>
  )
}

function Hero({ clock }: { clock: string }) {
  return (
    <section className="zb52-hero" id="top">
      <div className="zb52-frame">
        <div className="zb52-cols" aria-hidden />
        <span className="zb52-tick tl" aria-hidden />
        <span className="zb52-tick tr" aria-hidden />
        <span className="zb52-tick bl" aria-hidden />
        <span className="zb52-tick br" aria-hidden />

        <header className="zb52-meta zb-in" style={{ animationDelay: '.05s' }}>
          <span className="zb52-meta-l">
            SINA&nbsp;DILEK<span className="sep">/</span>PORTFOLIO&nbsp;
            <span className="dim">v3</span>
          </span>
          <span className="zb52-meta-r">
            <span className="zb52-status">
              <i className="lamp" />
              OPEN&nbsp;TO&nbsp;2026&nbsp;INTERNSHIPS
            </span>
            <span className="zb52-clock">{clock}</span>
          </span>
        </header>

        <div className="zb52-main">
          <div className="zb52-namewrap">
            <span className="zb52-kicker zb-in" style={{ animationDelay: '.12s' }}>
              <span className="jp">制作</span>
              <span className="ln" />
              CS&nbsp;STUDENT · CTO · BUILDER
            </span>

            <h1 className="zb52-name">
              <span className="ln1 zb-in" style={{ animationDelay: '.18s' }}>
                SINA
              </span>
              <span className="ln2 zb-in" style={{ animationDelay: '.26s' }}>
                DILEK<b className="dot">.</b>
              </span>
            </h1>

            <p className="zb52-bio zb-in" style={{ animationDelay: '.34s' }}>
              Second-year Computer Science student at the University of Essex and
              CTO at <em>Price Lantern</em>. I build backend systems, data
              pipelines, and developer tools — engineered to ship, not to demo.
            </p>

            <div className="zb52-cta zb-in" style={{ animationDelay: '.42s' }}>
              <a className="btn" href="#work" data-cursor="active">
                VIEW&nbsp;WORK<span className="arw">→</span>
              </a>
              <a className="mail" href="mailto:hi@sinadilek.com" data-cursor="active">
                hi@sinadilek.com
              </a>
            </div>
          </div>

          <aside className="zb52-focus">
            <span className="zb52-focus-h zb-in" style={{ animationDelay: '.3s' }}>
              <span className="jp">現在</span>CURRENT&nbsp;FOCUS
            </span>
            <ul>
              {FOCUS.map((f, idx) => (
                <li
                  key={f.i}
                  className="cell zb-in"
                  data-cursor="active"
                  style={{ animationDelay: `${0.38 + idx * 0.08}s` }}
                >
                  <span className="i">{f.i}</span>
                  <span className="body">
                    <span className="t">{f.t}</span>
                    <span className="d">{f.d}</span>
                  </span>
                  <span className="arw">↗</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <footer className="zb52-foot zb-in" style={{ animationDelay: '.5s' }}>
          <a className="scroll" href="#work" data-cursor="active">
            <span className="ar">↓</span>&nbsp;&nbsp;SCROLL&nbsp;TO&nbsp;ENTER
          </a>
          <span className="sig">
            ESSEX,&nbsp;UK — DESIGNED&nbsp;&amp;&nbsp;BUILT&nbsp;BY&nbsp;HAND
          </span>
        </footer>
      </div>
    </section>
  )
}

// Scattered, asymmetric placement — each project rides a different column band.
const BANDS = ['b1', 'b2', 'b3', 'b4', 'b5']

function Work() {
  return (
    <section className="zb52-work" id="work">
      <div className="zb52-work-inner">
        <header className="zb52-work-head zb-reveal">
          <span className="kick">
            <span className="jp">仕事</span>SELECTED&nbsp;WORK
          </span>
          <h2 className="ttl">
            WORK<span className="ct">/ {String(projects.length).padStart(2, '0')}</span>
          </h2>
          <span className="note">
            Things I&apos;ve designed, built, and shipped. Hover a plate.
          </span>
        </header>

        <div className="zb52-work-list">
          {projects.map((p, idx) => (
            <div key={p.id} className="zb52-work-row">
              <a
                className={`zb52-card zb-reveal ${BANDS[idx % BANDS.length]}`}
                href={p.link}
                target="_blank"
                rel="noreferrer"
                data-cursor="active"
              >
                <div className="c-top">
                  <span className="idx">P/{String(idx + 1).padStart(2, '0')}</span>
                  <span className="glyph" aria-hidden>
                    {p.glyph}
                  </span>
                  <span className={`stat s-${p.status.toLowerCase()}`}>{p.status}</span>
                </div>

                <h3 className="c-name">{p.name}</h3>
                <p className="c-brief">{p.brief}</p>

                <div className="c-foot">
                  <ul className="tags">
                    {p.stack.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                  <span className="c-year">
                    {p.year}
                    <span className="arw">→</span>
                  </span>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Design52() {
  const rootRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRawCursor(rootRef)
  useReveal(rootRef)
  const [clock, setClock] = useState('')
  const [accentId, setAccentId] = useState('iris')
  const accent = ACCENTS.find((a) => a.id === accentId) ?? ACCENTS[0]

  useEffect(() => {
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }),
      )
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const rootStyle = {
    '--zb-accent': accent.hex,
    '--zb-accent-lo': hexToRgba(accent.hex, 0.14),
  } as React.CSSProperties

  return (
    <div className="zb52" ref={rootRef} style={rootStyle}>
      <style>{CSS}</style>
      <div className="zb52-noise" aria-hidden />
      <div className="zb52-cursor" ref={cursorRef} aria-hidden />
      <AccentToggle accentId={accentId} setAccentId={setAccentId} />

      <Hero clock={clock} />
      <Work />
    </div>
  )
}

const CSS = `
.zb52 {
  --zb-ink:      #0C0C0D;
  --zb-ink-2:    #131316;
  --zb-ink-3:    #191920;
  --zb-paper:    #ECECE4;
  --zb-grey:     #93938C;
  --zb-grey-dim: #55554F;
  --zb-line:     #2A2A30;
  --zb-line-2:   #3E3E46;
  --zb-accent:   #8F90C2;
  --zb-accent-lo: rgba(143,144,194,0.14);

  --zb-display: 'Syne', system-ui, sans-serif;
  --zb-body:    'Plus Jakarta Sans', system-ui, sans-serif;
  --zb-mono:    'JetBrains Mono', ui-monospace, monospace;
  --snap: 0.13s cubic-bezier(0.2, 0, 0, 1);

  position: relative;
  background: var(--zb-ink);
  color: var(--zb-paper);
  font-family: var(--zb-body);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}
.zb52 *, .zb52 *::before, .zb52 *::after { box-sizing: border-box; }
.zb52 ::selection { background: var(--zb-accent); color: var(--zb-ink); }

/* concrete noise */
.zb52-noise {
  position: fixed; inset: 0; z-index: 2; pointer-events: none;
  opacity: 0.05; mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 200px 200px;
}

/* custom raw cursor */
.zb52-cursor {
  position: fixed; top: 0; left: 0; z-index: 999;
  width: 11px; height: 11px; margin: -5.5px 0 0 -5.5px;
  border: 1.5px solid var(--zb-paper);
  mix-blend-mode: difference; pointer-events: none;
  transition: width var(--snap), height var(--snap), margin var(--snap),
              border-color var(--snap), background var(--snap);
  display: none;
}
.zb52.zb-cursor-on { cursor: none; }
.zb52.zb-cursor-on .zb52-cursor { display: block; }
.zb52-cursor.is-active {
  width: 34px; height: 34px; margin: -17px 0 0 -17px;
  border-color: var(--zb-accent); background: var(--zb-accent-lo);
}

/* accent toggle */
.zb52-accents {
  position: fixed; right: clamp(16px, 2vw, 30px); bottom: clamp(16px, 2vw, 30px);
  z-index: 40; display: flex; align-items: center; gap: 9px;
  padding: 9px 12px; background: rgba(12,12,13,0.72);
  border: 1px solid var(--zb-line); backdrop-filter: blur(9px);
}
.zb52-accents .lbl { font-family: var(--zb-mono); font-size: 9.5px; letter-spacing: 0.22em; color: var(--zb-grey-dim); margin-right: 2px; }
.zb52-accents .sw {
  width: 18px; height: 18px; padding: 0; border: 1.5px solid rgba(0,0,0,0.4);
  cursor: pointer; transition: transform var(--snap), box-shadow var(--snap);
}
.zb52-accents .sw:hover { transform: translateY(-2px); }
.zb52-accents .sw.is-on { box-shadow: 0 0 0 2px var(--zb-ink), 0 0 0 3.5px var(--zb-paper); }

/* hero shell + architectural frame */
.zb52-hero { position: relative; z-index: 1; min-height: 100vh; padding: clamp(14px, 1.6vw, 24px); }
.zb52-frame {
  position: relative;
  min-height: calc(100vh - clamp(28px, 3.2vw, 48px));
  border: 1px solid var(--zb-line);
  padding: clamp(26px, 4vw, 76px);
  display: flex; flex-direction: column; justify-content: space-between;
  gap: clamp(40px, 7vh, 96px);
}
.zb52-cols {
  position: absolute; inset: 0; pointer-events: none; z-index: 0;
  background-image: repeating-linear-gradient(
    to right,
    transparent, transparent calc(100% / 12 - 1px),
    rgba(236,236,228,0.028) calc(100% / 12 - 1px), rgba(236,236,228,0.028) calc(100% / 12)
  );
}
.zb52-frame > *:not(.zb52-cols):not(.zb52-tick) { position: relative; z-index: 1; }

.zb52-tick { position: absolute; width: 9px; height: 9px; pointer-events: none; }
.zb52-tick::before, .zb52-tick::after { content: ''; position: absolute; background: var(--zb-accent); }
.zb52-tick::before { width: 9px; height: 1.5px; top: 0; }
.zb52-tick::after  { width: 1.5px; height: 9px; left: 0; }
.zb52-tick.tl { top: -1px; left: -1px; }
.zb52-tick.tr { top: -1px; right: -1px; transform: scaleX(-1); }
.zb52-tick.bl { bottom: -1px; left: -1px; transform: scaleY(-1); }
.zb52-tick.br { bottom: -1px; right: -1px; transform: scale(-1); }

.zb52-meta {
  display: flex; justify-content: space-between; align-items: center;
  gap: 24px; flex-wrap: wrap;
  font-family: var(--zb-mono); font-size: 11px; letter-spacing: 0.18em; color: var(--zb-grey);
}
.zb52-meta .sep { color: var(--zb-grey-dim); margin: 0 10px; }
.zb52-meta .dim { color: var(--zb-grey-dim); }
.zb52-meta-r { display: flex; align-items: center; gap: 22px; }
.zb52-status { display: inline-flex; align-items: center; gap: 9px; color: var(--zb-paper); }
.zb52-status .lamp { width: 7px; height: 7px; background: var(--zb-accent); box-shadow: 0 0 0 3px var(--zb-accent-lo); }
.zb52-clock { color: var(--zb-grey-dim); font-variant-numeric: tabular-nums; }

.zb52-main {
  flex: 1 1 auto; display: grid; grid-template-columns: repeat(12, 1fr);
  align-items: end; column-gap: clamp(24px, 3vw, 56px); row-gap: clamp(48px, 8vh, 90px);
  padding: clamp(20px, 4vh, 56px) 0;
}
.zb52-namewrap { grid-column: 1 / 8; align-self: end; }
.zb52-focus    { grid-column: 8 / 13; align-self: start; }

.zb52-kicker {
  display: inline-flex; align-items: center; gap: 14px;
  font-family: var(--zb-mono); font-size: 11px; letter-spacing: 0.26em;
  color: var(--zb-grey); margin-bottom: clamp(20px, 3vh, 34px);
}
.zb52-kicker .jp { color: var(--zb-accent); letter-spacing: 0.1em; font-size: 12px; }
.zb52-kicker .ln { width: 44px; height: 1px; background: var(--zb-line-2); }

.zb52-name { font-family: var(--zb-display); font-weight: 800; line-height: 0.82; letter-spacing: -0.035em; text-transform: uppercase; margin: 0; }
.zb52-name span { display: block; }
.zb52-name .ln1 { font-size: clamp(3.6rem, 12.5vw, 12rem); color: var(--zb-paper); }
.zb52-name .ln2 {
  font-size: clamp(3.6rem, 12.5vw, 12rem); color: transparent;
  -webkit-text-stroke: 1.6px var(--zb-grey); text-stroke: 1.6px var(--zb-grey);
  margin-left: clamp(20px, 5vw, 96px);
}
.zb52-name .dot { -webkit-text-stroke: 0; color: var(--zb-accent); font-weight: 800; }

.zb52-bio { max-width: 46ch; margin: clamp(28px, 4vh, 44px) 0 0; font-size: clamp(0.95rem, 1.05vw, 1.12rem); line-height: 1.65; color: var(--zb-grey); }
.zb52-bio em { color: var(--zb-paper); font-style: normal; font-weight: 600; }

.zb52-cta { display: flex; align-items: center; gap: clamp(20px, 3vw, 40px); margin-top: clamp(30px, 4.5vh, 48px); flex-wrap: wrap; }
.zb52-cta .btn {
  display: inline-flex; align-items: center; gap: 14px;
  font-family: var(--zb-mono); font-size: 12px; letter-spacing: 0.2em; color: var(--zb-paper); text-decoration: none;
  padding: 16px 26px; background: var(--zb-ink-2); border: 2px solid var(--zb-paper);
  box-shadow: 5px 5px 0 0 var(--zb-line);
  transition: transform var(--snap), box-shadow var(--snap), border-color var(--snap), background var(--snap);
}
.zb52-cta .btn .arw { transition: transform var(--snap); }
.zb52-cta .btn:hover { transform: translate(-4px, -4px); box-shadow: 9px 9px 0 0 var(--zb-accent); border-color: var(--zb-accent); background: var(--zb-ink-3); }
.zb52-cta .btn:hover .arw { transform: translateX(5px); }
.zb52-cta .btn:active { transform: translate(0, 0); box-shadow: 3px 3px 0 0 var(--zb-accent); }
.zb52-cta .mail {
  font-family: var(--zb-mono); font-size: 12px; letter-spacing: 0.06em; color: var(--zb-grey); text-decoration: none;
  padding-bottom: 3px; border-bottom: 1px solid var(--zb-line-2); transition: color var(--snap), border-color var(--snap);
}
.zb52-cta .mail:hover { color: var(--zb-accent); border-color: var(--zb-accent); }

.zb52-focus-h { display: inline-flex; align-items: center; gap: 10px; font-family: var(--zb-mono); font-size: 11px; letter-spacing: 0.24em; color: var(--zb-grey); margin-bottom: 22px; }
.zb52-focus-h .jp { color: var(--zb-accent); letter-spacing: 0.12em; font-size: 12px; }
.zb52-focus ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; align-items: flex-end; gap: 16px; }
.zb52-focus .cell {
  width: min(100%, 366px); display: flex; align-items: center; gap: 16px; padding: 19px 20px;
  background: var(--zb-ink-2); border: 2px solid var(--zb-line); box-shadow: 4px 4px 0 0 rgba(0,0,0,0.35);
  transition: transform var(--snap), box-shadow var(--snap), border-color var(--snap), background var(--snap);
}
.zb52-focus .cell:nth-child(2) { margin-right: clamp(0px, 3vw, 48px); }
.zb52-focus .cell:nth-child(3) { margin-right: clamp(0px, 6vw, 96px); }
.zb52-focus .cell .i { font-family: var(--zb-mono); font-size: 11px; letter-spacing: 0.1em; color: var(--zb-grey-dim); padding-top: 2px; }
.zb52-focus .cell .body { display: flex; flex-direction: column; gap: 5px; flex: 1; }
.zb52-focus .cell .t { font-family: var(--zb-display); font-weight: 700; font-size: 1.02rem; letter-spacing: -0.01em; color: var(--zb-paper); }
.zb52-focus .cell .d { font-family: var(--zb-mono); font-size: 10.5px; letter-spacing: 0.08em; color: var(--zb-grey); }
.zb52-focus .cell .arw { color: var(--zb-grey-dim); font-size: 15px; transition: transform var(--snap), color var(--snap); }
.zb52-focus .cell:hover { transform: translate(-4px, -4px); box-shadow: 8px 8px 0 0 var(--zb-accent); border-color: var(--zb-accent); background: var(--zb-ink-3); }
.zb52-focus .cell:hover .arw { transform: translate(3px, -3px); color: var(--zb-accent); }

.zb52-foot { display: flex; justify-content: space-between; align-items: center; gap: 20px; font-family: var(--zb-mono); font-size: 10.5px; letter-spacing: 0.2em; color: var(--zb-grey-dim); flex-wrap: wrap; }
.zb52-foot .scroll { display: inline-flex; align-items: center; color: var(--zb-grey); text-decoration: none; }
.zb52-foot .scroll:hover { color: var(--zb-accent); }
.zb52-foot .scroll .ar { display: inline-block; color: var(--zb-accent); animation: zb-bob 1.9s var(--snap) infinite; }

/* ── SELECTED WORK ─────────────────────────────────────────── */
.zb52-work { position: relative; z-index: 1; padding: clamp(60px, 12vh, 160px) clamp(14px, 1.6vw, 24px); }
.zb52-work-inner {
  position: relative; max-width: 1440px; margin: 0 auto;
  border-top: 1px solid var(--zb-line); padding: clamp(40px, 7vh, 96px) clamp(12px, 3vw, 60px) 0;
}
.zb52-work-head { display: grid; grid-template-columns: 1fr auto; align-items: end; gap: 20px 40px; margin-bottom: clamp(48px, 9vh, 110px); }
.zb52-work-head .kick { grid-column: 1; display: inline-flex; align-items: center; gap: 12px; font-family: var(--zb-mono); font-size: 11px; letter-spacing: 0.26em; color: var(--zb-grey); }
.zb52-work-head .kick .jp { color: var(--zb-accent); letter-spacing: 0.12em; font-size: 12px; }
.zb52-work-head .ttl { grid-column: 1; grid-row: 2; margin: 10px 0 0; font-family: var(--zb-display); font-weight: 800; font-size: clamp(2.8rem, 8vw, 7rem); line-height: 0.85; letter-spacing: -0.03em; text-transform: uppercase; }
.zb52-work-head .ttl .ct { font-size: 0.24em; letter-spacing: 0.1em; color: var(--zb-accent); vertical-align: super; margin-left: 14px; -webkit-text-stroke: 0; }
.zb52-work-head .note { grid-column: 2; grid-row: 2; align-self: end; max-width: 30ch; text-align: right; font-size: 0.92rem; line-height: 1.6; color: var(--zb-grey); }

.zb52-work-list { display: flex; flex-direction: column; gap: clamp(30px, 5vh, 64px); }
.zb52-work-row { display: grid; grid-template-columns: repeat(12, 1fr); }
/* scattered column bands */
.zb52-work-row:nth-child(1) .zb52-card { grid-column: 1 / 8; }
.zb52-work-row:nth-child(2) .zb52-card { grid-column: 6 / 13; }
.zb52-work-row:nth-child(3) .zb52-card { grid-column: 3 / 10; }
.zb52-work-row:nth-child(4) .zb52-card { grid-column: 7 / 13; }
.zb52-work-row:nth-child(5) .zb52-card { grid-column: 1 / 7; }

.zb52-card {
  position: relative; display: flex; flex-direction: column; gap: 18px;
  padding: clamp(24px, 2.6vw, 40px); text-decoration: none;
  background: var(--zb-ink-2); border: 2px solid var(--zb-line);
  box-shadow: 5px 5px 0 0 rgba(0,0,0,0.4);
  transition: transform var(--snap), box-shadow var(--snap), border-color var(--snap), background var(--snap);
}
.zb52-card:hover { transform: translate(-4px, -4px); box-shadow: 10px 10px 0 0 var(--zb-accent); border-color: var(--zb-accent); background: var(--zb-ink-3); }
.zb52-card .c-top { display: flex; align-items: center; gap: 16px; }
.zb52-card .idx { font-family: var(--zb-mono); font-size: 11px; letter-spacing: 0.14em; color: var(--zb-grey-dim); }
.zb52-card .glyph { font-size: 18px; line-height: 1; filter: grayscale(0.2); }
.zb52-card .stat { margin-left: auto; font-family: var(--zb-mono); font-size: 10px; letter-spacing: 0.16em; padding: 4px 9px; border: 1px solid var(--zb-line-2); color: var(--zb-grey); }
.zb52-card .stat.s-live, .zb52-card .stat.s-active { color: var(--zb-accent); border-color: var(--zb-accent); }
.zb52-card .c-name { margin: 0; font-family: var(--zb-display); font-weight: 800; font-size: clamp(1.9rem, 3.4vw, 3.2rem); line-height: 0.95; letter-spacing: -0.02em; color: var(--zb-paper); }
.zb52-card .c-brief { margin: 0; font-size: clamp(0.95rem, 1vw, 1.08rem); line-height: 1.55; color: var(--zb-grey); max-width: 42ch; }
.zb52-card .c-foot { display: flex; justify-content: space-between; align-items: flex-end; gap: 20px; margin-top: 6px; flex-wrap: wrap; }
.zb52-card .tags { list-style: none; display: flex; flex-wrap: wrap; gap: 8px; margin: 0; padding: 0; }
.zb52-card .tags li { font-family: var(--zb-mono); font-size: 10px; letter-spacing: 0.08em; color: var(--zb-grey); padding: 5px 10px; border: 1px solid var(--zb-line); }
.zb52-card .c-year { display: inline-flex; align-items: center; gap: 10px; font-family: var(--zb-mono); font-size: 12px; letter-spacing: 0.1em; color: var(--zb-grey-dim); }
.zb52-card .c-year .arw { transition: transform var(--snap), color var(--snap); }
.zb52-card:hover .c-year .arw { transform: translateX(5px); color: var(--zb-accent); }

/* entrance / reveal */
.zb-in { opacity: 0; transform: translateY(14px); animation: zb-rise 0.62s cubic-bezier(0.2, 0, 0, 1) forwards; }
.zb-reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.6s cubic-bezier(0.2,0,0,1), transform 0.6s cubic-bezier(0.2,0,0,1); }
.zb-reveal.is-in { opacity: 1; transform: none; }
@keyframes zb-rise { to { opacity: 1; transform: none; } }
@keyframes zb-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(3px); } }

/* responsive */
@media (max-width: 920px) {
  .zb52-main { grid-template-columns: 1fr; align-items: start; }
  .zb52-namewrap, .zb52-focus { grid-column: 1 / -1; }
  .zb52-name .ln2 { margin-left: clamp(16px, 8vw, 48px); }
  .zb52-focus .cell:nth-child(2), .zb52-focus .cell:nth-child(3) { margin-right: 0; }
  .zb52-work-head { grid-template-columns: 1fr; }
  .zb52-work-head .note { grid-column: 1; grid-row: 3; text-align: left; }
  .zb52-work-row .zb52-card { grid-column: 1 / -1 !important; }
}
@media (max-width: 520px) {
  .zb52-meta { font-size: 10px; }
  .zb52-meta-r { width: 100%; justify-content: space-between; }
  .zb52-accents { padding: 7px 10px; gap: 7px; }
}
@media (prefers-reduced-motion: reduce) {
  .zb-in, .zb-reveal { animation: none; opacity: 1; transform: none; transition: none; }
  .zb52-foot .scroll .ar { animation: none; }
}
`
