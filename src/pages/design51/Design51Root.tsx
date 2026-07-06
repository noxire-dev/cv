import { type CSSProperties, useMemo, useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { ZB } from '../zenBrutalism'
import {
    DevColorPicker,
    GRAIN,
    PunchRail,
    ScrollToTop,
    StampRouteTransition,
    ThemeCtx,
    TopBar,
    ZbRedirect,
} from './chrome'
import HomePage from './HomePage'
import LogPage from './LogPage'
import LogPostPage from './LogPostPage'
import ProjectDetailPage from './ProjectDetailPage'
import ProjectsPage from './ProjectsPage'

// ═══════════════════════════════════════════════════════════════════
// Design 51 v2: NAMEPLATE — 銘板 — routed multi-page manifest.
// The portfolio as a stack of Japanese machine nameplates, now with
// real URLs: home hub, unit register, spec sheets, shop log, entries.
// Zen Brutalism v0.1 — 2px borders, labeling density, ma, one
// vermillion element per plate at rest, mechanical motion only.
// ═══════════════════════════════════════════════════════════════════

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

function Shell() {
  const [accent, setAccent] = useState<string>(ZB.accent)
  const theme = useMemo(() => ({ accent }), [accent])
  const { pathname } = useLocation()

  return (
    <ThemeCtx.Provider value={theme}>
      <div
        className="min-h-screen antialiased"
        style={{ background: ZB.bg, color: ZB.ink, '--zb-accent': accent, '--zb-ink': ZB.ink } as CSSProperties}
      >
        <style>{`::selection { background: ${accent}; color: ${ZB.bgDeep}; }`}</style>

        <TopBar />
        <PunchRail />

        {/* static grain — never animated, ≤3% */}
        <div className="fixed inset-0 pointer-events-none z-[90]" style={{ backgroundImage: GRAIN, opacity: 0.025 }} aria-hidden />

        <ScrollToTop />

        {/* pathname-keyed: each route change remounts the page and
            replays the stamp transition + section reveals */}
        <div key={pathname} className="relative flex min-h-screen flex-col">
          <StampRouteTransition />
          <main className="relative flex-1 pb-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:id" element={<ProjectDetailPage />} />
              <Route path="/log" element={<LogPage />} />
              <Route path="/log/:id" element={<LogPostPage />} />
              <Route path="*" element={<ZbRedirect to="/" />} />
            </Routes>
          </main>
          <Footer />
        </div>

        <DevColorPicker accent={accent} setAccent={setAccent} />
      </div>
    </ThemeCtx.Provider>
  )
}

export default function Design51Root() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  )
}
