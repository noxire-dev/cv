import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import {
    type Capability,
    type ExperienceJob,
    GRID_COLS,
    GRID_COL_W,
    GRID_ROW_H,
    RAIL_LEFT_W,
    type View,
    blogPosts,
    capabilities,
    contactLinks,
    experience,
    projects,
} from './design49Data'
import { LABELS, MECH_EASE, STAMP_DURATION, ZB, ZB_PRESETS, plateId, zbAccentSoft } from './zenBrutalism'

// Zen-Brutalism material remap — alias ZB tokens to the old names so the
// re-plated body needs minimal edits.
const BG = ZB.bg, PANEL = ZB.plate, PANEL_DARK = ZB.bgDeep, EDGE = ZB.edge
const DIM = ZB.inkDim, MID = ZB.inkMid, BRIGHT = ZB.ink
const ACCENT_DEFAULT = ZB.accent

type AccentTheme = { accent: string; accentSoft: string }
const ThemeCtx = createContext<AccentTheme>({ accent: ACCENT_DEFAULT, accentSoft: zbAccentSoft(ACCENT_DEFAULT) })
function useTheme() { return useContext(ThemeCtx) }


// Design 50: RE-PLATE — SYSTEM_053 SHU
// Zen-Brutalism re-materialization of Design 49:
//   - Soft sci-fi terminal → Japanese factory machine-plate
//   - Visible 2px plate borders, plate ID tags, corner index marks
//   - Bilingual kanji / EN section labels, Archivo Black display type
//   - Vermillion (shu) accent instead of lavender
//   - Mechanical stamp motion (MECH_EASE) instead of smooth eases
//   - Restraint: one vermillion element per plate at rest; no grain / grunge

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
      style={{ background: PANEL, borderColor: EDGE, backdropFilter: 'blur(16px)' }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[11px] tracking-widest" style={{ color: DIM }}>DEV_THEME</span>
        <button onClick={() => setOpen(false)} className="ml-auto text-[11px]" style={{ color: DIM }}>✕</button>
      </div>
      <div className="flex items-center gap-1.5 mb-2">
        {ZB_PRESETS.map(p => (
          <button key={p.hex} onClick={() => { setAccent(p.hex); setHex(p.hex) }}
            className="w-7 h-7 border-2 transition-transform hover:scale-110"
            style={{
              background: p.hex,
              borderColor: accent === p.hex ? BRIGHT : 'transparent',
            }}
            title={p.name}
          />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[11px]" style={{ color: DIM }}>#</span>
        <input
          value={hex.replace('#', '')}
          onChange={e => {
            const raw = e.target.value.replace(/[^0-9a-fA-F]/g, '').slice(0, 6)
            setHex('#' + raw)
          }}
          onKeyDown={e => { if (e.key === 'Enter') applyHex(hex) }}
          className="bg-transparent border-b text-[13px] w-[5.5rem] outline-none"
          style={{ color: BRIGHT, borderColor: EDGE }}
          maxLength={6}
          spellCheck={false}
          placeholder="D9402B"
        />
        <div className="w-4 h-4" style={{ background: accent }} />
      </div>
    </motion.div>
  )
}

// ── Stamp transition overlay (press-down shutter) ──

function StampTransition({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[200] pointer-events-none"
          style={{ background: ZB.bgDeep, transformOrigin: 'top' }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          exit={{ scaleY: 0, transformOrigin: 'bottom' }}
          transition={{ duration: STAMP_DURATION, ease: MECH_EASE }}
        />
      )}
    </AnimatePresence>
  )
}

// ── Bilingual section label (kanji / EN) ──

function BilingualLabel({ k, accent, active }: { k: keyof typeof LABELS; accent: string; active?: boolean }) {
  const l = LABELS[k]
  return (
    <span className="inline-flex items-baseline gap-2">
      <span className="font-jp text-[11px] font-medium" style={{ color: accent }}>{l.jp}</span>
      <span className="font-mono text-[11px] tracking-[0.25em]" style={{ color: active ? ZB.ink : ZB.inkDim }}>{l.en}</span>
    </span>
  )
}

// ── Plate identity tag + corner index marks ──

function PlateTag({ n }: { n: number }) {
  return <span className="font-mono text-[10px] select-none tabular-nums" style={{ color: ZB.inkDim }}>{plateId(n)}</span>
}

function CornerMarks() {
  const marks = ['top-1 left-1', 'top-1 right-1', 'bottom-1 left-1', 'bottom-1 right-1']
  return (
    <>
      {marks.map(m => (
        <span key={m} className={`absolute ${m} text-[8px] leading-none select-none pointer-events-none`} style={{ color: ZB.inkDim }}>+</span>
      ))}
    </>
  )
}

// ── Shared UI components ──

function Coord({ label }: { label: string }) {
  return <span className="text-[11px] font-mono select-none" style={{ color: DIM }}>{label}</span>
}

function PanelHeader({ title, status }: { title: string; status?: string }) {
  const { accent } = useTheme()
  return (
    <div className="flex items-center justify-between px-3 py-2 border-b" style={{ borderColor: EDGE, background: PANEL_DARK }}>
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5" style={{ background: accent }} />
        <span className="text-[11px] tracking-[0.18em] font-mono" style={{ color: MID }}>{title}</span>
      </div>
      {status && <span className="text-[11px] font-mono" style={{ color: MID }}>{status}</span>}
    </div>
  )
}

function Divider() {
  return (
    <div className="py-8 font-mono text-[11px] flex items-center gap-4 select-none" style={{ color: DIM }}>
      <span>+</span>
      <div className="flex-1 h-px" style={{ background: EDGE }} />
      <span>+</span>
      <div className="flex-1 h-px" style={{ background: EDGE }} />
      <span>+</span>
    </div>
  )
}

function StatusDot({ status }: { status: string }) {
  const color = status === 'ACTIVE' || status === 'LIVE' ? '#4ADE80' : status === 'STABLE' ? '#60A5FA' : '#FACC15'
  return <div className="w-1.5 h-1.5 flex-shrink-0" style={{ background: color }} />
}

function BackToHome({ onClick }: { onClick: () => void }) {
  const { accent } = useTheme()
  return (
    <button onClick={onClick} className="text-[12px] mb-10 flex items-center gap-2 group" style={{ color: DIM }}>
      <span className="transition-transform group-hover:-translate-x-1" style={{ color: accent }}>←</span> HOME
    </button>
  )
}

// ── Experience ──

function ExperienceCard({ job, onClick }: { job: ExperienceJob; onClick: () => void }) {
  const { accent } = useTheme()
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ ease: MECH_EASE }}>
      <button
        onClick={onClick}
        className="group w-full text-left border-2 transition-colors"
        style={{ borderColor: EDGE, background: PANEL }}
        onMouseEnter={e => e.currentTarget.style.borderColor = `${accent}60`}
        onMouseLeave={e => e.currentTarget.style.borderColor = EDGE}
      >
        <PanelHeader title={job.company.toUpperCase()} status={job.location} />
        <div className="p-5 flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
              <span className="text-base font-archivo uppercase" style={{ color: BRIGHT }}>{job.role}</span>
              <span className="text-[12px]" style={{ color: MID }}>{job.tagline}</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: MID }}>{job.summary}</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
              {job.highlights.slice(0, 3).map(h => (
                <span key={h.stat} className="text-[12px]">
                  <span className="font-black" style={{ color: BRIGHT }}>{h.stat}</span>
                  <span style={{ color: DIM }}> {h.label}</span>
                </span>
              ))}
            </div>
          </div>
          <span className="text-sm flex-shrink-0 transition-transform group-hover:translate-x-1" style={{ color: DIM }}>→</span>
        </div>
      </button>
    </motion.div>
  )
}

function ExperiencePage({ job, goHome }: { job: ExperienceJob; goHome: () => void }) {
  const { accent } = useTheme()
  return (
    <div className="pt-14 min-h-screen font-mono" style={{ background: BG }}>
      <div className="max-w-[860px] mx-auto px-4 md:px-8 py-10">
        <BackToHome onClick={goHome} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ease: MECH_EASE }}>
          <div className="border-2 mb-8" style={{ borderColor: EDGE, background: PANEL }}>
            <PanelHeader title="EXPERIENCE" status={job.location} />
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-archivo uppercase mb-1" style={{ color: BRIGHT }}>{job.role}</h1>
                  <p className="text-base" style={{ color: MID }}>{job.company} · {job.tagline}</p>
                </div>
                <span className="text-sm tabular-nums flex-shrink-0 border px-3 py-1 self-start" style={{ borderColor: EDGE, color: MID }}>{job.period}</span>
              </div>
              <p className="mt-5 text-base leading-relaxed" style={{ color: MID }}>{job.summary}</p>
            </div>
          </div>
          <div className="space-y-4">
            {job.highlights.map((h, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07, ease: MECH_EASE }}
                className="border-2 p-6 md:p-8" style={{ borderColor: EDGE, background: PANEL }}>
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-4xl font-black leading-none" style={{ color: accent }}>{h.stat}</span>
                  <span className="text-sm font-bold tracking-wider" style={{ color: MID }}>{h.label}</span>
                </div>
                <p className="text-base leading-relaxed" style={{ color: BRIGHT }}>{h.detail}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// ── Nav ──

function Nav({ currentView, navigate }: { currentView: View; navigate: (v: View) => void }) {
  const { accent } = useTheme()
  const [time, setTime] = useState(new Date())
  const [scrollPct, setScrollPct] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    const s = () => {
      const max = document.body.scrollHeight - window.innerHeight
      setScrollPct(max > 0 ? Math.round((window.scrollY / max) * 100) : 0)
    }
    window.addEventListener('scroll', s)
    return () => { clearInterval(t); window.removeEventListener('scroll', s) }
  }, [])

  const navItems: { view: View; k: keyof typeof LABELS; matchAlso?: View[] }[] = [
    { view: 'home', k: 'work', matchAlso: ['experience'] },
    { view: 'projects', k: 'projects', matchAlso: ['project'] },
    { view: 'blog', k: 'log', matchAlso: ['blog-post'] },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b-2 font-mono" style={{ background: `${BG}ee`, backdropFilter: 'blur(14px)', borderColor: EDGE }}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-11 flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-6">
          <button onClick={() => navigate('home')} className="flex items-center gap-1.5">
            <span className="font-bold" style={{ color: MID }}>SYS</span>
            <span style={{ color: DIM }}>/</span>
            <span style={{ color: MID }}>053</span>
          </button>
          <span className="hidden md:inline" style={{ color: DIM }}>── SINA DILEK ──</span>
        </div>
        <div className="flex items-center gap-5">
          {navItems.map(item => {
            const isActive = currentView === item.view || item.matchAlso?.includes(currentView)
            return (
              <button key={item.view} onClick={() => navigate(item.view)} className="tracking-wider">
                <BilingualLabel k={item.k} accent={isActive ? accent : ZB.inkMid} active={isActive} />
              </button>
            )
          })}
          <span style={{ color: EDGE }}>|</span>
          <span className="tabular-nums hidden md:inline" style={{ color: DIM }}>{time.toLocaleTimeString('en-GB', { hour12: false })}</span>
          <span className="tabular-nums" style={{ color: DIM }}>{scrollPct}%</span>
        </div>
      </div>
    </nav>
  )
}

// ── Project detail page ──

function ProjectPage({ projectId, goHome }: { projectId: string; goHome: () => void }) {
  const { accent } = useTheme()
  const p = projects.find(x => x.id === projectId) || projects[0]
  return (
    <div className="pt-14 min-h-screen font-mono" style={{ background: BG }}>
      <div className="max-w-[900px] mx-auto px-4 md:px-8 py-10">
        <BackToHome onClick={goHome} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ease: MECH_EASE }}>
          <div className="border-2 mb-6" style={{ borderColor: EDGE, background: PANEL }}>
            <PanelHeader title={p.idx} status={p.status} />
            <div className="p-6">
              <h1 className="text-4xl md:text-5xl font-archivo uppercase mb-2" style={{ color: BRIGHT }}>{p.name}</h1>
              <p className="text-[15px] leading-relaxed" style={{ color: MID }}>{p.impact}</p>
            </div>
          </div>

          <div className="border-2 mb-6 overflow-hidden" style={{ borderColor: EDGE }}>
            <PanelHeader title="PREVIEW" status="IMG" />
            <div className="aspect-video flex items-center justify-center relative" style={{ background: PANEL_DARK }}>
              <span className="text-[120px] leading-none select-none" style={{ opacity: 0.08, color: MID }}>{p.glyph}</span>
              <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: EDGE }} />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {[{ label: 'YEAR', value: p.year }, { label: 'STACK', value: p.stack.join(' · ') }, { label: 'STATUS', value: p.status }].map(item => (
              <div key={item.label} className="border-2 p-4" style={{ borderColor: EDGE, background: PANEL }}>
                <span className="text-[12px] tracking-[0.18em] block mb-1" style={{ color: DIM }}>{item.label}</span>
                <span className="text-sm font-bold" style={{ color: item.label === 'STATUS' ? accent : BRIGHT }}>{item.value}</span>
              </div>
            ))}
          </div>

          {[{ label: 'OVERVIEW', text: p.overview }, { label: 'PROBLEM', text: p.problem }, { label: 'APPROACH', text: p.approach }].map(s => (
            <div key={s.label} className="mb-6">
              <span className="text-[12px] tracking-[0.18em] block mb-2" style={{ color: accent }}>{s.label}</span>
              <p className="text-[15px] leading-relaxed" style={{ color: MID }}>{s.text}</p>
            </div>
          ))}

          <div className="border-2 mb-6" style={{ borderColor: EDGE, background: PANEL }}>
            <PanelHeader title="FEATURES" status={`${p.features.length}`} />
            <div className="p-4 space-y-2">
              {p.features.map((f, i) => (
                <div key={f} className="flex items-center gap-3 text-sm">
                  <span className="text-[11px]" style={{ color: DIM }}>{String(i).padStart(2, '0')}</span>
                  <span style={{ color: MID }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          <a href={p.link} target="_blank" rel="noopener"
            className="inline-flex items-center gap-2 text-[12px] font-bold px-5 py-2.5 border-2 transition-colors"
            style={{ borderColor: accent, color: accent }}
            onMouseEnter={e => { e.currentTarget.style.background = accent; e.currentTarget.style.color = BG }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = accent }}>
            OPEN_REMOTE → {p.link}
          </a>
        </motion.div>
      </div>
    </div>
  )
}

// ── Projects list page ──

function ProjectsListPage({ navigate, goHome }: { navigate: (v: View, opts?: { projectId?: string; postId?: string }) => void; goHome: () => void }) {
  const { accent } = useTheme()
  return (
    <div className="pt-14 min-h-screen font-mono" style={{ background: BG }}>
      <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-10">
        <BackToHome onClick={goHome} />
        <div className="flex items-center gap-3 mb-10">
          <BilingualLabel k="projects" accent={accent} />
          <div className="flex-1 h-px" style={{ background: EDGE }} />
          <span className="text-[12px]" style={{ color: DIM }}>{projects.length} ENTRIES</span>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((project, i) => (
            <motion.button key={project.id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, ease: MECH_EASE }}
              onClick={() => navigate('project', { projectId: project.id })}
              className="group text-left border-2 transition-colors"
              style={{ borderColor: EDGE, background: PANEL }}
              onMouseEnter={e => e.currentTarget.style.borderColor = `${accent}60`}
              onMouseLeave={e => e.currentTarget.style.borderColor = EDGE}>

              <div className="aspect-[16/9] flex items-center justify-center relative overflow-hidden" style={{ background: PANEL_DARK }}>
                <span className="text-[80px] leading-none select-none" style={{ opacity: 0.12, color: MID }}>{project.glyph}</span>
                <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: EDGE }} />
                <div className="absolute top-3 left-3">
                  <span className="text-[11px] font-mono" style={{ color: accent }}>{project.idx}</span>
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <StatusDot status={project.status} />
                  <span className="text-[11px]" style={{ color: DIM }}>{project.status}</span>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[12px]" style={{ color: MID }}>{project.idx}</span>
                  <div className="flex gap-1.5">
                    {project.stack.map(t => (
                      <span key={t} className="text-[11px] px-1.5 py-0.5" style={{ background: ZB.plateUp, color: MID }}>{t}</span>
                    ))}
                  </div>
                </div>
                <h3 className="text-xl font-archivo uppercase mb-1 transition-colors" style={{ color: BRIGHT }}
                  onMouseEnter={e => e.currentTarget.style.color = accent}
                  onMouseLeave={e => e.currentTarget.style.color = BRIGHT}>
                  {project.name}
                </h3>
                <p className="text-[13px] mb-3" style={{ color: MID }}>{project.brief}</p>
                <p className="text-[12px] leading-relaxed mb-4" style={{ color: DIM }}>{project.impact}</p>
                <span className="text-[12px] font-bold transition-transform inline-block group-hover:translate-x-1" style={{ color: MID }}>OPEN_CASE →</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Blog list page ──

function BlogListPage({ navigate, goHome }: { navigate: (v: View, opts?: { projectId?: string; postId?: string }) => void; goHome: () => void }) {
  const { accent } = useTheme()
  return (
    <div className="pt-14 min-h-screen font-mono" style={{ background: BG }}>
      <div className="max-w-[900px] mx-auto px-4 md:px-8 py-10">
        <BackToHome onClick={goHome} />
        <div className="flex items-center gap-3 mb-10">
          <BilingualLabel k="log" accent={accent} />
          <div className="flex-1 h-px" style={{ background: EDGE }} />
          <span className="text-[12px]" style={{ color: DIM }}>{blogPosts.length} ENTRIES</span>
        </div>
        <div className="space-y-3">
          {blogPosts.map((post, i) => (
            <motion.button key={post.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08, ease: MECH_EASE }}
              onClick={() => navigate('blog-post', { postId: post.id })}
              className="group w-full text-left border-2 transition-colors" style={{ borderColor: EDGE, background: PANEL }}
              onMouseEnter={e => e.currentTarget.style.borderColor = `${accent}60`}
              onMouseLeave={e => e.currentTarget.style.borderColor = EDGE}>
              <div className="p-4 md:p-5 flex flex-col md:flex-row gap-2 md:gap-4">
                <span className="text-[12px] flex-shrink-0 tabular-nums" style={{ color: DIM }}>{post.date}</span>
                <div className="flex-1 min-w-0">
                  <h2 className="text-sm font-bold font-sans mb-1 transition-colors" style={{ color: BRIGHT }}
                    onMouseEnter={e => e.currentTarget.style.color = accent}
                    onMouseLeave={e => e.currentTarget.style.color = BRIGHT}>{post.title}</h2>
                  <p className="text-[13px]" style={{ color: MID }}>{post.excerpt}</p>
                  <div className="flex flex-wrap gap-1 mt-2 md:hidden">
                    {post.tags.map(t => (
                      <span key={t} className="text-[11px] px-1.5 py-0.5" style={{ background: ZB.plateUp, color: MID }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-1 flex-shrink-0">
                  {post.tags.map(t => (
                    <span key={t} className="text-[11px] px-1.5 py-0.5" style={{ background: ZB.plateUp, color: MID }}>{t}</span>
                  ))}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Blog post page ──

function BlogPostPage({ postId, goHome }: { postId: string; goHome: () => void }) {
  const post = blogPosts.find(p => p.id === postId) || blogPosts[0]
  return (
    <div className="pt-14 min-h-screen font-mono" style={{ background: BG }}>
      <div className="max-w-[680px] mx-auto px-4 md:px-8 py-10">
        <BackToHome onClick={goHome} />
        <motion.article initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ ease: MECH_EASE }}>
          <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4">
            <span className="text-[12px] tabular-nums" style={{ color: DIM }}>{post.date}</span>
            <span style={{ color: DIM }}>·</span>
            <span className="text-[12px]" style={{ color: DIM }}>{post.readTime}</span>
            {post.tags.map(t => (
              <span key={t} className="text-[11px] px-1.5 py-0.5" style={{ background: ZB.plateUp, color: MID }}>{t}</span>
            ))}
          </div>
          <h1 className="text-2xl md:text-3xl font-archivo mb-8" style={{ color: BRIGHT }}>{post.title}</h1>
          <div className="space-y-5">
            {post.content.split('\n\n').map((p, i) => <p key={i} className="text-[15px] leading-[1.8]" style={{ color: MID }}>{p}</p>)}
          </div>
        </motion.article>
      </div>
    </div>
  )
}

// ── Scrolling coordinate rails ──

function ScrollingLeftRail() {
  const [scrollRow, setScrollRow] = useState(0)
  const totalRows = 20

  useEffect(() => {
    const onScroll = () => {
      const row = Math.floor(window.scrollY / GRID_ROW_H)
      setScrollRow(row)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="fixed left-2 z-40 pointer-events-none hidden md:flex flex-col"
      style={{
        top: `${44 + 16}px`,
        gap: `${GRID_ROW_H - 14}px`,
      }}
    >
      {Array.from({ length: totalRows }, (_, i) => {
        const rowIdx = i + scrollRow
        return (
          <span key={i} className="text-[11px] font-mono select-none tabular-nums leading-none"
            style={{ color: i < 12 ? DIM : `${DIM}60`, transition: 'color 0.15s' }}>
            {String(rowIdx).padStart(2, '0')}
          </span>
        )
      })}
    </div>
  )
}

function BottomRail() {
  return (
    <div className="fixed bottom-2 z-40 pointer-events-none hidden md:flex justify-between"
      style={{ left: `${RAIL_LEFT_W + 8}px`, right: '48px' }}>
      {Array.from({ length: GRID_COLS }, (_, i) => (
        <span key={i} className="text-[11px] font-mono select-none" style={{ color: DIM }}>
          {String.fromCharCode(65 + i)}
        </span>
      ))}
    </div>
  )
}

// ── HOME sections (inline in main component) ──

function HeroSection({ navigate }: { navigate: (v: View) => void }) {
  const { accent } = useTheme()
  return (
    <section className="min-h-screen flex flex-col justify-center px-4 md:px-8 pt-14">
      <div className="max-w-[1400px] mx-auto w-full relative">
        <CornerMarks />
        <span className="absolute top-1 right-1"><PlateTag n={1} /></span>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, ease: MECH_EASE }}
          className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-10 text-[12px]" style={{ color: DIM }}>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 animate-pulse" style={{ background: MID }} />
            <span>SYS_READY</span>
          </div>
          <span>·</span><span>COLCHESTER.UK</span><span>·</span>
          <span style={{ color: MID }}>SEEKING_2026_INTERNSHIPS</span>
        </motion.div>

        <div className="grid grid-cols-12 gap-x-4 mb-8">
          <motion.div className="col-span-12 md:col-span-9"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6, ease: MECH_EASE }}>
            <div className="flex items-baseline gap-4 mb-2">
              <Coord label="A0" />
              <h1 className="text-[18vw] md:text-[11vw] font-archivo uppercase leading-[0.82] tracking-tighter" style={{ color: BRIGHT }}>SINA</h1>
            </div>
            <div className="flex items-baseline gap-4">
              <Coord label="A1" />
              <h1 className="text-[18vw] md:text-[11vw] font-archivo uppercase leading-[0.82] tracking-tighter" style={{ color: accent }}>DILEK</h1>
            </div>
          </motion.div>

          <motion.div className="col-span-12 md:col-span-3 mt-8 md:mt-0 flex items-end"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, ease: MECH_EASE }}>
            <div className="w-full border-2" style={{ borderColor: EDGE, background: PANEL }}>
              <PanelHeader title="PROFILE" status="v2.0" />
              <div className="p-3 space-y-3 text-[13px]">
                {[
                  { k: 'ROLE', v: 'CTO & Developer' },
                  { k: 'INST', v: 'Univ. of Essex' },
                  { k: 'YEAR', v: 'Y2 (BSc CS)' },
                  { k: 'GRAD', v: '2027' },
                  { k: 'CLASS', v: 'First Class' },
                ].map(d => (
                  <div key={d.k} className="flex justify-between">
                    <span style={{ color: DIM }}>{d.k}</span>
                    <span style={{ color: BRIGHT }}>{d.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, ease: MECH_EASE }}
          className="text-[15px] max-w-lg leading-relaxed mb-10" style={{ color: MID }}>
          CS student and startup CTO. I build backend systems, data pipelines, and developer tooling — things that ship.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, ease: MECH_EASE }}
          className="flex flex-wrap gap-3 text-[13px]">
          <button onClick={() => navigate('projects')}
            className="px-5 py-2 font-bold tracking-wider border-2 transition-colors"
            style={{ borderColor: ZB.edgeHi, color: BRIGHT, background: 'transparent' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.color = accent }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = ZB.edgeHi; e.currentTarget.style.color = BRIGHT }}>
            VIEW_WORK
          </button>
          <a href="/Sina_Dilek_CV.pdf" download className="px-5 py-2 font-bold tracking-wider border-2 transition-colors"
            style={{ borderColor: EDGE, color: MID }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.color = accent }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = EDGE; e.currentTarget.style.color = MID }}>
            DOWNLOAD_CV ↓
          </a>
          <a href="mailto:hi@sinadilek.com" className="px-5 py-2 font-bold tracking-wider border-2" style={{ borderColor: EDGE, color: MID }}>
            CONTACT
          </a>
          <a href="https://github.com/noxire-dev" target="_blank" rel="noopener" className="px-5 py-2 font-bold tracking-wider border-2" style={{ borderColor: EDGE, color: MID }}>
            GITHUB
          </a>
        </motion.div>
      </div>
    </section>
  )
}

// ── URL routing helpers ──

function viewToPath(v: View, projectId?: string, postId?: string): string {
  switch (v) {
    case 'projects': return '/projects'
    case 'project': return `/project/${projectId}`
    case 'blog': return '/blog'
    case 'blog-post': return `/blog/${postId}`
    case 'experience': return '/experience'
    default: return '/'
  }
}

function parseURL(pathname: string): { view: View; projectId?: string; postId?: string } {
  const parts = pathname.split('/').filter(Boolean)
  if (parts[0] === 'projects') return { view: 'projects' }
  if (parts[0] === 'project' && parts[1]) return { view: 'project', projectId: parts[1] }
  if (parts[0] === 'blog' && parts[1]) return { view: 'blog-post', postId: parts[1] }
  if (parts[0] === 'blog') return { view: 'blog' }
  if (parts[0] === 'experience') return { view: 'experience' }
  return { view: 'home' }
}

const INITIAL_ROUTE = parseURL(window.location.pathname)

// ── MAIN ──

export default function Design50() {
  const [accent, setAccent] = useState<string>(ACCENT_DEFAULT)
  const accentSoft = zbAccentSoft(accent)

  const [view, setView] = useState<View>(INITIAL_ROUTE.view)
  const [selectedProject, setSelectedProject] = useState(INITIAL_ROUTE.projectId || 'gosh')
  const [selectedPost, setSelectedPost] = useState(INITIAL_ROUTE.postId || 'v2-rebuild')
  const [mouseGrid, setMouseGrid] = useState({ col: 0, row: 0 })
  const [stampActive, setStampActive] = useState(false)
  const { scrollYProgress } = useScroll()
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  const isPopRef = useRef(false)

  const navigate = useCallback((v: View, opts?: { projectId?: string; postId?: string }) => {
    if (opts?.projectId) setSelectedProject(opts.projectId)
    if (opts?.postId) setSelectedPost(opts.postId)
    setView(v)
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    if (!isPopRef.current) {
      const pid = opts?.projectId ?? selectedProject
      const bid = opts?.postId ?? selectedPost
      const path = viewToPath(v, pid, bid)
      window.history.pushState({ view: v, projectId: pid, postId: bid }, '', path)
    }
    isPopRef.current = false
  }, [selectedProject, selectedPost])

  const goHome = useCallback(() => navigate('home'), [navigate])

  // Sync browser back/forward with view state
  useEffect(() => {
    // Stamp initial history entry with state so popstate can restore it
    window.history.replaceState(
      { view: INITIAL_ROUTE.view, projectId: INITIAL_ROUTE.projectId, postId: INITIAL_ROUTE.postId },
      '',
      window.location.pathname,
    )

    const onPopState = (e: PopStateEvent) => {
      const target = e.state?.view as View | undefined
      if (target) {
        isPopRef.current = true
        setView(target)
        if (e.state?.projectId) setSelectedProject(e.state.projectId)
        if (e.state?.postId) setSelectedPost(e.state.postId)
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
      }
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  // Stamp shutter on every view change
  useEffect(() => {
    setStampActive(true)
    const t = setTimeout(() => setStampActive(false), STAMP_DURATION * 1000 + 60)
    return () => clearTimeout(t)
  }, [view])

  useEffect(() => {
    const h = (e: MouseEvent) => setMouseGrid({ col: Math.floor(e.clientX / (window.innerWidth / GRID_COLS)), row: Math.floor(e.clientY / GRID_ROW_H) })
    window.addEventListener('mousemove', h)
    return () => window.removeEventListener('mousemove', h)
  }, [])

  return (
    <ThemeCtx.Provider value={{ accent, accentSoft }}>
    <div className="min-h-screen font-mono" style={{ background: BG, color: BRIGHT, '--accent': accent } as React.CSSProperties}>
      <style>{`
        ::selection { background: ${accent}; color: ${BG}; }
        .hide-sb::-webkit-scrollbar { display: none; }
        .hide-sb { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Scroll progress */}
      <motion.div className="fixed top-0 left-0 h-px z-[60]" style={{ width: progressWidth, background: accent }} />

      {/* Stamp shutter transition */}
      <StampTransition active={stampActive} />

      {/* Furnace glow */}
      <div className="fixed -top-[20vw] -right-[10vw] w-[55vw] h-[55vw] rounded-full pointer-events-none" style={{
        background: `radial-gradient(circle, ${accent}10 0%, ${accent}05 40%, transparent 70%)`,
      }} />

      {/* Blueprint grid aligned to rails */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        left: `${RAIL_LEFT_W}px`,
        backgroundImage: `linear-gradient(${accent}04 1px, transparent 1px), linear-gradient(90deg, ${accent}04 1px, transparent 1px)`,
        backgroundSize: `${GRID_COL_W} ${GRID_ROW_H}px`,
        backgroundPosition: '0 0',
      }} />

      <ScrollingLeftRail />
      <BottomRail />

      {/* Mouse grid tracker */}
      <div className="fixed bottom-2 right-3 z-50 pointer-events-none hidden md:block">
        <span className="text-[11px] font-mono tabular-nums px-1.5 py-0.5" style={{ color: accent, background: `${BG}CC` }}>
          {String.fromCharCode(65 + mouseGrid.col)}{mouseGrid.row}
        </span>
      </div>

      <Nav currentView={view} navigate={navigate} />
      <DevColorPicker accent={accent} setAccent={setAccent} />

      <AnimatePresence mode="wait">
        {/* ═══ HOME ═══ */}
        {view === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease: MECH_EASE }}>

            <HeroSection navigate={navigate} />
            <Divider />

            {/* ── EXPERIENCE ── */}
            <section className="px-4 md:px-8 py-16">
              <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-3">
                  <div className="flex items-center gap-3 mb-3">
                    <Coord label="B0" />
                    <PlateTag n={2} />
                  </div>
                  <BilingualLabel k="work" accent={accent} />
                  <h2 className="text-2xl font-archivo uppercase mt-2 mb-1" style={{ color: BRIGHT }}>EXPERIENCE</h2>
                  <p className="text-[13px]" style={{ color: DIM }}>Professional work</p>
                </div>
                <div className="col-span-12 md:col-span-9 space-y-4">
                  {experience.map(job => (
                    <ExperienceCard key={job.id} job={job} onClick={() => navigate('experience')} />
                  ))}
                </div>
              </div>
            </section>

            <Divider />

            {/* ── STACK / CAPABILITIES ── */}
            <section className="px-4 md:px-8 py-16">
              <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-3">
                  <div className="flex items-center gap-3 mb-3">
                    <Coord label="C0" />
                    <PlateTag n={3} />
                  </div>
                  <BilingualLabel k="capabilities" accent={accent} />
                  <h2 className="text-2xl font-archivo uppercase mt-2 mb-1" style={{ color: BRIGHT }}>STACK</h2>
                  <p className="text-[13px]" style={{ color: DIM }}>{capabilities.length} technologies</p>
                </div>
                <div className="col-span-12 md:col-span-9 space-y-4">
                  {(['LANGUAGES', 'FRAMEWORKS', 'SYSTEMS', 'TOOLS'] as const).map(category => {
                    const items = capabilities.filter((c: Capability) => c.category === category)
                    if (items.length === 0) return null
                    return (
                      <div key={category} className="border-2" style={{ borderColor: EDGE, background: PANEL }}>
                        <PanelHeader title={category} status={`${items.length}`} />
                        <div className="p-3 space-y-1.5">
                          {items.map((cap, i) => (
                            <motion.div key={cap.name} className="group flex items-center gap-2"
                              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.04, ease: MECH_EASE }} viewport={{ once: true }}>
                              <span className="w-20 text-[12px] text-right flex-shrink-0 transition-colors"
                                style={{ color: MID }}
                                onMouseEnter={e => (e.currentTarget.style.color = accent)}
                                onMouseLeave={e => (e.currentTarget.style.color = MID)}>
                                {cap.name}
                              </span>
                              <div className="flex-1 h-3.5 relative" style={{ background: PANEL_DARK }}>
                                <motion.div className="absolute inset-y-0 left-0"
                                  initial={{ width: 0 }} whileInView={{ width: `${cap.pct}%` }}
                                  transition={{ delay: i * 0.06, duration: 0.6, ease: MECH_EASE }} viewport={{ once: true }}
                                  style={{ background: `${MID}${cap.level === 'PRIMARY' ? 'CC' : cap.level === 'FRAMEWORK' ? '80' : '50'}` }} />
                                <div className="absolute inset-0 flex items-center justify-end pr-2">
                                  <span className="text-[10px] font-mono" style={{ color: DIM }}>{cap.pct}</span>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </section>

            <Divider />

            {/* ── PROJECTS (vertical grid, 3 featured) ── */}
            <section className="px-4 md:px-8 py-16">
              <div className="max-w-[1400px] mx-auto">
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <Coord label="D0" />
                      <PlateTag n={4} />
                    </div>
                    <BilingualLabel k="projects" accent={accent} />
                    <h2 className="text-2xl font-archivo uppercase mt-2">WORK</h2>
                  </div>
                  <button onClick={() => navigate('projects')} className="text-[12px] font-bold" style={{ color: MID }}>
                    VIEW_ALL ({projects.length}) →
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {projects.slice(0, 3).map((project, i) => (
                    <motion.button key={project.id}
                      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08, ease: MECH_EASE }} viewport={{ once: true }}
                      onClick={() => navigate('project', { projectId: project.id })}
                      className="group text-left border-2 transition-colors"
                      style={{ borderColor: EDGE, background: PANEL }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = `${accent}60`}
                      onMouseLeave={e => e.currentTarget.style.borderColor = EDGE}>
                      <div className="aspect-[16/10] flex items-center justify-center relative overflow-hidden" style={{ background: PANEL_DARK }}>
                        <span className="text-[72px] leading-none select-none" style={{ opacity: 0.12, color: MID }}>{project.glyph}</span>
                        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: EDGE }} />
                        <div className="absolute top-3 left-3">
                          <span className="text-[11px] font-mono" style={{ color: accent }}>{project.idx}</span>
                        </div>
                        <div className="absolute top-3 right-3 flex items-center gap-1.5">
                          <StatusDot status={project.status} />
                          <span className="text-[11px]" style={{ color: DIM }}>{project.status}</span>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[12px]" style={{ color: MID }}>{project.idx}</span>
                          <div className="flex gap-1">
                            {project.stack.slice(0, 2).map(t => (
                              <span key={t} className="text-[10px] px-1.5 py-0.5" style={{ background: ZB.plateUp, color: MID }}>{t}</span>
                            ))}
                          </div>
                        </div>
                        <h3 className="text-lg font-archivo uppercase mb-1 transition-colors group-hover:!text-[var(--accent)]" style={{ color: BRIGHT }}>
                          {project.name}
                        </h3>
                        <p className="text-[13px]" style={{ color: MID }}>{project.brief}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </section>

            <Divider />

            {/* ── LOG (3 recent) ── */}
            <section className="px-4 md:px-8 py-16">
              <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-3">
                  <div className="flex items-center gap-3 mb-3">
                    <Coord label="E0" />
                  </div>
                  <BilingualLabel k="log" accent={accent} />
                  <h2 className="text-2xl font-archivo uppercase mt-2 mb-1">LOG</h2>
                  <button onClick={() => navigate('blog')} className="text-[12px] font-bold" style={{ color: MID }}>VIEW_ALL →</button>
                </div>
                <div className="col-span-12 md:col-span-9 space-y-3">
                  {blogPosts.map((post, i) => (
                    <motion.button key={post.id}
                      initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08, ease: MECH_EASE }} viewport={{ once: true }}
                      onClick={() => navigate('blog-post', { postId: post.id })}
                      className="group w-full text-left border-2 transition-colors" style={{ borderColor: EDGE, background: PANEL }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = `${accent}50`}
                      onMouseLeave={e => e.currentTarget.style.borderColor = EDGE}>
                      <div className="p-3 md:p-4 flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                        <div className="flex items-center gap-3 md:contents">
                          <span className="text-[12px] tabular-nums flex-shrink-0" style={{ color: DIM }}>{post.date}</span>
                          <h3 className="text-sm font-bold font-sans flex-1 truncate transition-colors group-hover:!text-[var(--accent)]" style={{ color: BRIGHT }}>
                            {post.title}
                          </h3>
                          <span className="text-sm flex-shrink-0 transition-transform group-hover:translate-x-1 md:order-last" style={{ color: DIM }}>→</span>
                        </div>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          {post.tags.map(t => (
                            <span key={t} className="text-[10px] px-1.5 py-0.5" style={{ background: ZB.plateUp, color: MID }}>{t}</span>
                          ))}
                          <span className="text-[12px] flex-shrink-0 hidden md:inline" style={{ color: DIM }}>{post.readTime}</span>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </section>

            <Divider />

            {/* ── CONTACT ── */}
            <section className="px-4 md:px-8 py-20">
              <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Coord label="F0" />
                    <PlateTag n={5} />
                  </div>
                  <BilingualLabel k="contact" accent={accent} />
                  <h2 className="text-4xl md:text-6xl font-archivo uppercase mt-2 leading-tight" style={{ color: BRIGHT }}>
                    LET'S<br />BUILD
                  </h2>
                  <p className="text-[15px] mt-4 max-w-sm" style={{ color: MID }}>Open to internships, freelance, and collaboration.</p>
                </div>
                <div className="col-span-12 md:col-span-6 flex items-end">
                  <div className="w-full space-y-3">
                    {/* Primary email CTA */}
                    <motion.a href="mailto:hi@sinadilek.com"
                      whileHover={{ scale: 1.01 }}
                      className="group flex items-center justify-between p-5 border-2 transition-colors"
                      style={{ borderColor: accent, background: `${accent}10` }}
                      onMouseEnter={e => { e.currentTarget.style.background = accent; e.currentTarget.querySelector<HTMLElement>('[data-cta-label]')!.style.color = BG; e.currentTarget.querySelector<HTMLElement>('[data-cta-value]')!.style.color = BG; e.currentTarget.querySelector<HTMLElement>('[data-cta-arrow]')!.style.color = BG }}
                      onMouseLeave={e => { e.currentTarget.style.background = `${accent}10`; e.currentTarget.querySelector<HTMLElement>('[data-cta-label]')!.style.color = MID; e.currentTarget.querySelector<HTMLElement>('[data-cta-value]')!.style.color = BRIGHT; e.currentTarget.querySelector<HTMLElement>('[data-cta-arrow]')!.style.color = accent }}>
                      <div>
                        <span data-cta-label className="text-[12px] tracking-[0.18em] font-bold block mb-0.5" style={{ color: MID }}>GET IN TOUCH</span>
                        <span data-cta-value className="text-base font-bold" style={{ color: BRIGHT }}>hi@sinadilek.com</span>
                      </div>
                      <span data-cta-arrow className="text-lg" style={{ color: accent }}>→</span>
                    </motion.a>
                    {/* Secondary links */}
                    {contactLinks.filter(l => l.label !== 'EMAIL').map(link => (
                      <motion.a key={link.label} href={link.href}
                        target="_blank" rel="noopener"
                        whileHover={{ x: 6 }}
                        className="group flex items-center justify-between p-4 border-2 transition-colors"
                        style={{ borderColor: EDGE, background: PANEL }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = `${accent}60`}
                        onMouseLeave={e => e.currentTarget.style.borderColor = EDGE}>
                        <div>
                          <span className="text-[12px] tracking-[0.18em] block mb-0.5" style={{ color: DIM }}>{link.label}</span>
                          <span className="text-sm" style={{ color: BRIGHT }}>{link.value}</span>
                        </div>
                        <span style={{ color: DIM }}>→</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <footer className="px-4 md:px-8 py-4 border-t-2" style={{ borderColor: EDGE }}>
              <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-2 text-[11px]" style={{ color: DIM }}>
                <span>© {new Date().getFullYear()} SINA_DILEK</span>
                <div className="flex items-center gap-4">
                  <span>ESSEX, UK</span><span>·</span>
                  <span>GMT+0</span><span>·</span>
                  <span style={{ color: DIM }}>DESIGNED & BUILT FROM SCRATCH</span>
                </div>
              </div>
            </footer>
          </motion.div>
        )}

        {/* ═══ PROJECTS LIST ═══ */}
        {view === 'projects' && (
          <motion.div key="projects" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease: MECH_EASE }}>
            <ProjectsListPage navigate={navigate} goHome={goHome} />
          </motion.div>
        )}

        {/* ═══ PROJECT DETAIL ═══ */}
        {view === 'project' && (
          <motion.div key="project" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease: MECH_EASE }}>
            <ProjectPage projectId={selectedProject} goHome={goHome} />
          </motion.div>
        )}

        {/* ═══ BLOG LIST ═══ */}
        {view === 'blog' && (
          <motion.div key="blog" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease: MECH_EASE }}>
            <BlogListPage navigate={navigate} goHome={goHome} />
          </motion.div>
        )}

        {/* ═══ BLOG POST ═══ */}
        {view === 'blog-post' && (
          <motion.div key="bp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease: MECH_EASE }}>
            <BlogPostPage postId={selectedPost} goHome={goHome} />
          </motion.div>
        )}

        {/* ═══ EXPERIENCE ═══ */}
        {view === 'experience' && (
          <motion.div key="exp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease: MECH_EASE }}>
            <ExperiencePage job={experience[0]} goHome={goHome} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </ThemeCtx.Provider>
  )
}
