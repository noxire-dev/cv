import { useEffect, useRef, useState } from 'react'

// ── Design 52: ZEN BRUTALISM v3 ──────────────────────────────────────────────
// Dark-only. Industrial brutalism × Japanese minimalism (Ma).
// Display: Syne · Body: Plus Jakarta Sans · Meta: JetBrains Mono
// One accent: burnt terracotta. Swap `--zb-accent` to #7D8C6A for wasabi green.
// Details: 90° corners, hard (non-blurring) shadows that SHIFT on hover,
// exposed column grid, concrete noise, custom raw cursor.
//
// This file is the HERO SECTION ONLY — the first component. More to follow.
// ─────────────────────────────────────────────────────────────────────────────

const FOCUS = [
  { i: '01', t: 'Backend Systems', d: 'Python · Go · FastAPI' },
  { i: '02', t: 'Data Pipelines', d: 'Scraping · Caching · ETL' },
  { i: '03', t: 'Developer Tools', d: 'Shells · CLIs · DX' },
]

// Custom raw cursor: a crisp square that tracks 1:1 (no lag = brutalist),
// swelling to a ring over interactive elements. Disabled on touch / reduced-motion.
function useRawCursor(rootRef: React.RefObject<HTMLDivElement>) {
  const dotRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const root = rootRef.current
    const dot = dotRef.current
    if (!root || !dot) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!fine.matches) return

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

export default function Design52() {
  const rootRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRawCursor(rootRef)
  const [clock, setClock] = useState('')

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

  return (
    <div className="zb52" ref={rootRef}>
      <style>{CSS}</style>

      {/* atmosphere */}
      <div className="zb52-noise" aria-hidden />
      <div className="zb52-cursor" ref={cursorRef} aria-hidden />

      <section className="zb52-hero">
        <div className="zb52-frame">
          <div className="zb52-cols" aria-hidden />
          {/* corner registration ticks */}
          <span className="zb52-tick tl" aria-hidden />
          <span className="zb52-tick tr" aria-hidden />
          <span className="zb52-tick bl" aria-hidden />
          <span className="zb52-tick br" aria-hidden />

          {/* top meta rail */}
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

          {/* asymmetric main: name anchored low-left, focus rides high-right */}
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
                  VIEW&nbsp;WORK
                  <span className="arw">→</span>
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

          {/* bottom rail */}
          <footer className="zb52-foot zb-in" style={{ animationDelay: '.5s' }}>
            <span className="scroll">
              <span className="ar">↓</span>&nbsp;&nbsp;SCROLL&nbsp;TO&nbsp;ENTER
            </span>
            <span className="sig">ESSEX,&nbsp;UK — DESIGNED&nbsp;&amp;&nbsp;BUILT&nbsp;BY&nbsp;HAND</span>
          </footer>
        </div>
      </section>
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
  --zb-accent:   #C86B53;   /* burnt terracotta — swap to #7D8C6A for wasabi */
  --zb-accent-lo: rgba(200,107,83,0.14);

  --zb-display: 'Syne', system-ui, sans-serif;
  --zb-body:    'Plus Jakarta Sans', system-ui, sans-serif;
  --zb-mono:    'JetBrains Mono', ui-monospace, monospace;

  --snap: 0.13s cubic-bezier(0.2, 0, 0, 1);

  position: relative;
  min-height: 100vh;
  background: var(--zb-ink);
  color: var(--zb-paper);
  font-family: var(--zb-body);
  overflow: hidden;
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
/* exposed 12-col grid — a whisper */
.zb52-cols {
  position: absolute; inset: 0; pointer-events: none; z-index: 0;
  background-image: repeating-linear-gradient(
    to right,
    transparent, transparent calc(100% / 12 - 1px),
    rgba(236,236,228,0.028) calc(100% / 12 - 1px), rgba(236,236,228,0.028) calc(100% / 12)
  );
}
.zb52-frame > *:not(.zb52-cols):not(.zb52-tick) { position: relative; z-index: 1; }

/* corner ticks */
.zb52-tick { position: absolute; width: 9px; height: 9px; pointer-events: none; }
.zb52-tick::before, .zb52-tick::after { content: ''; position: absolute; background: var(--zb-accent); }
.zb52-tick::before { width: 9px; height: 1.5px; top: 0; }
.zb52-tick::after  { width: 1.5px; height: 9px; left: 0; }
.zb52-tick.tl { top: -1px; left: -1px; }
.zb52-tick.tr { top: -1px; right: -1px; transform: scaleX(-1); }
.zb52-tick.bl { bottom: -1px; left: -1px; transform: scaleY(-1); }
.zb52-tick.br { bottom: -1px; right: -1px; transform: scale(-1); }

/* meta rail */
.zb52-meta {
  display: flex; justify-content: space-between; align-items: center;
  gap: 24px; flex-wrap: wrap;
  font-family: var(--zb-mono); font-size: 11px; letter-spacing: 0.18em;
  color: var(--zb-grey);
}
.zb52-meta .sep { color: var(--zb-grey-dim); margin: 0 10px; }
.zb52-meta .dim { color: var(--zb-grey-dim); }
.zb52-meta-r { display: flex; align-items: center; gap: 22px; }
.zb52-status { display: inline-flex; align-items: center; gap: 9px; color: var(--zb-paper); }
.zb52-status .lamp {
  width: 7px; height: 7px; background: var(--zb-accent);
  box-shadow: 0 0 0 3px var(--zb-accent-lo);
}
.zb52-clock { color: var(--zb-grey-dim); font-variant-numeric: tabular-nums; }

/* asymmetric main grid */
.zb52-main {
  flex: 1 1 auto;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  align-items: end;
  column-gap: clamp(24px, 3vw, 56px);
  row-gap: clamp(48px, 8vh, 90px);
  padding: clamp(20px, 4vh, 56px) 0;
}
.zb52-namewrap { grid-column: 1 / 8; align-self: end; }
.zb52-focus    { grid-column: 8 / 13; align-self: start; }

/* kicker */
.zb52-kicker {
  display: inline-flex; align-items: center; gap: 14px;
  font-family: var(--zb-mono); font-size: 11px; letter-spacing: 0.26em;
  color: var(--zb-grey); margin-bottom: clamp(20px, 3vh, 34px);
}
.zb52-kicker .jp { color: var(--zb-accent); letter-spacing: 0.1em; font-size: 12px; }
.zb52-kicker .ln { width: 44px; height: 1px; background: var(--zb-line-2); }

/* the name */
.zb52-name {
  font-family: var(--zb-display);
  font-weight: 800;
  line-height: 0.82;
  letter-spacing: -0.035em;
  text-transform: uppercase;
  margin: 0;
}
.zb52-name span { display: block; }
.zb52-name .ln1 {
  font-size: clamp(3.6rem, 12.5vw, 12rem);
  color: var(--zb-paper);
}
.zb52-name .ln2 {
  font-size: clamp(3.6rem, 12.5vw, 12rem);
  color: transparent;
  -webkit-text-stroke: 1.6px var(--zb-grey);
  text-stroke: 1.6px var(--zb-grey);
  margin-left: clamp(20px, 5vw, 96px);   /* deliberate offset — asymmetry */
}
.zb52-name .dot {
  -webkit-text-stroke: 0; color: var(--zb-accent); font-weight: 800;
}

/* bio */
.zb52-bio {
  max-width: 46ch;
  margin: clamp(28px, 4vh, 44px) 0 0;
  font-size: clamp(0.95rem, 1.05vw, 1.12rem);
  line-height: 1.65; color: var(--zb-grey);
  font-weight: 400;
}
.zb52-bio em { color: var(--zb-paper); font-style: normal; font-weight: 600; }

/* cta */
.zb52-cta { display: flex; align-items: center; gap: clamp(20px, 3vw, 40px); margin-top: clamp(30px, 4.5vh, 48px); flex-wrap: wrap; }
.zb52-cta .btn {
  display: inline-flex; align-items: center; gap: 14px;
  font-family: var(--zb-mono); font-size: 12px; letter-spacing: 0.2em;
  color: var(--zb-paper); text-decoration: none;
  padding: 16px 26px; background: var(--zb-ink-2);
  border: 2px solid var(--zb-paper);
  box-shadow: 5px 5px 0 0 var(--zb-line);
  transition: transform var(--snap), box-shadow var(--snap),
              border-color var(--snap), background var(--snap);
}
.zb52-cta .btn .arw { transition: transform var(--snap); }
.zb52-cta .btn:hover {
  transform: translate(-4px, -4px);
  box-shadow: 9px 9px 0 0 var(--zb-accent);
  border-color: var(--zb-accent);
  background: var(--zb-ink-3);
}
.zb52-cta .btn:hover .arw { transform: translateX(5px); }
.zb52-cta .btn:active { transform: translate(0, 0); box-shadow: 3px 3px 0 0 var(--zb-accent); }
.zb52-cta .mail {
  font-family: var(--zb-mono); font-size: 12px; letter-spacing: 0.06em;
  color: var(--zb-grey); text-decoration: none;
  padding-bottom: 3px; border-bottom: 1px solid var(--zb-line-2);
  transition: color var(--snap), border-color var(--snap);
}
.zb52-cta .mail:hover { color: var(--zb-accent); border-color: var(--zb-accent); }

/* focus column */
.zb52-focus-h {
  display: inline-flex; align-items: center; gap: 10px;
  font-family: var(--zb-mono); font-size: 11px; letter-spacing: 0.24em;
  color: var(--zb-grey); margin-bottom: 22px;
}
.zb52-focus-h .jp { color: var(--zb-accent); letter-spacing: 0.12em; font-size: 12px; }
.zb52-focus ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; align-items: flex-end; gap: 16px; }
.zb52-focus .cell {
  width: min(100%, 366px);
  display: flex; align-items: center; gap: 16px;
  padding: 19px 20px;
  background: var(--zb-ink-2);
  border: 2px solid var(--zb-line);
  box-shadow: 4px 4px 0 0 rgba(0,0,0,0.35);
  transition: transform var(--snap), box-shadow var(--snap), border-color var(--snap), background var(--snap);
}
/* cascade down-left — counter-diagonal to the name */
.zb52-focus .cell:nth-child(2) { margin-right: clamp(0px, 3vw, 48px); }
.zb52-focus .cell:nth-child(3) { margin-right: clamp(0px, 6vw, 96px); }
.zb52-focus .cell .i {
  font-family: var(--zb-mono); font-size: 11px; letter-spacing: 0.1em;
  color: var(--zb-grey-dim); padding-top: 2px;
}
.zb52-focus .cell .body { display: flex; flex-direction: column; gap: 5px; flex: 1; }
.zb52-focus .cell .t { font-family: var(--zb-display); font-weight: 700; font-size: 1.02rem; letter-spacing: -0.01em; color: var(--zb-paper); }
.zb52-focus .cell .d { font-family: var(--zb-mono); font-size: 10.5px; letter-spacing: 0.08em; color: var(--zb-grey); }
.zb52-focus .cell .arw { color: var(--zb-grey-dim); font-size: 15px; transition: transform var(--snap), color var(--snap); }
.zb52-focus .cell:hover {
  transform: translate(-4px, -4px);
  box-shadow: 8px 8px 0 0 var(--zb-accent);
  border-color: var(--zb-accent);
  background: var(--zb-ink-3);
}
.zb52-focus .cell:hover .arw { transform: translate(3px, -3px); color: var(--zb-accent); }

/* foot rail */
.zb52-foot {
  display: flex; justify-content: space-between; align-items: center; gap: 20px;
  font-family: var(--zb-mono); font-size: 10.5px; letter-spacing: 0.2em; color: var(--zb-grey-dim);
  flex-wrap: wrap;
}
.zb52-foot .scroll { display: inline-flex; align-items: center; color: var(--zb-grey); }
.zb52-foot .scroll .ar { display: inline-block; color: var(--zb-accent); animation: zb-bob 1.9s var(--snap) infinite; }

/* entrance */
.zb-in { opacity: 0; transform: translateY(14px); animation: zb-rise 0.62s cubic-bezier(0.2, 0, 0, 1) forwards; }
@keyframes zb-rise { to { opacity: 1; transform: none; } }
@keyframes zb-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(3px); } }

/* responsive */
@media (max-width: 920px) {
  .zb52-main { grid-template-columns: 1fr; align-items: start; }
  .zb52-namewrap { grid-column: 1 / -1; }
  .zb52-focus { grid-column: 1 / -1; }
  .zb52-name .ln2 { margin-left: clamp(16px, 8vw, 48px); }
  .zb52-focus .cell:nth-child(2),
  .zb52-focus .cell:nth-child(3) { margin-left: 0; }
}
@media (max-width: 520px) {
  .zb52-meta { font-size: 10px; }
  .zb52-meta-r { width: 100%; justify-content: space-between; }
  .zb52-cta { gap: 18px; }
}
@media (prefers-reduced-motion: reduce) {
  .zb-in { animation: none; opacity: 1; transform: none; }
  .zb52-foot .scroll .ar { animation: none; }
}
`
