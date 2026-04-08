import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

// Design 32: SYSTEM_032 — TRUE Y2K SWISS BRUTALIST
// Not a re-theme. A new concept entirely.
// The portfolio as a Y2K system dashboard.
// Swiss grid with visible coordinates, panel-based layout,
// horizontal project gallery, ASCII dividers, status readouts.

type View = 'home' | 'project' | 'blog' | 'blog-post'

const LIME = '#C3FF00'
const BG = '#08080A'
const PANEL = '#0C0C0F'
const EDGE = '#151518'
const DIM = '#333338'
const MID = '#777780'
const BRIGHT = '#E0E0E4'

const projects = [
  {
    id: 'gosh', name: 'GoSH', idx: 'PRJ_001',
    brief: 'Shell written in Go',
    impact: 'Fully functional shell — pipes, redirects, process management, built-in commands.',
    overview: 'GoSH is a minimalist shell demonstrating core systems programming. Process forking, I/O redirection, command parsing — all built from scratch in Go.',
    problem: 'Developers use shells daily without understanding the internals. I wanted to demystify process management and I/O.',
    approach: 'Incremental: lexer → parser → executor. Go for clean concurrency. Hand-written tokenizer for full control.',
    stack: ['Go', 'Systems'],
    features: ['Pipe chains', 'I/O redirection', 'Process spawning', 'Built-in cmds'],
    year: '2025', status: 'ACTIVE',
    link: 'https://github.com/noxire-dev/GoSH',
  },
  {
    id: 'moji', name: 'Moji', idx: 'PRJ_002',
    brief: 'Productivity app',
    impact: 'Clean note-taking + task management. Designed UI-first, then built backend to serve it.',
    overview: 'Note-taking and todo app focused on UX. Flask backend, JS frontend, SQLite storage. Every interaction feels instant.',
    problem: 'Note apps are bloated. Needed something fast, opinionated, and designed for how I actually work.',
    approach: 'UI-first design. Server-rendered with progressive JS. Dark mode via CSS custom properties.',
    stack: ['Python', 'Flask', 'JS'],
    features: ['Markdown notes', 'Task lists', 'Tags', 'Dark mode'],
    year: '2025', status: 'ACTIVE',
    link: 'https://github.com/noxire-dev/moji',
  },
  {
    id: 'lorekeeper', name: 'LoreKeeper', idx: 'PRJ_003',
    brief: 'RPG marketplace',
    impact: 'Community platform for free tabletop RPG resources. Discovery, ratings, curation.',
    overview: 'E-commerce platform for free TTRPG materials. Browse, download, share with the community.',
    problem: 'TTRPG resources scattered across forums and Discord. No central, well-designed hub.',
    approach: 'Marketplace without payments. Focus on discovery and community rating. PostgreSQL for full-text search.',
    stack: ['Python', 'PostgreSQL'],
    features: ['User accounts', 'Full-text search', 'Ratings', 'PDF viewer'],
    year: '2025', status: 'DEV',
    link: 'https://github.com/noxire-dev/LoreKeeper',
  },
  {
    id: 'midnight', name: 'Midnight Moon', idx: 'PRJ_004',
    brief: 'VSCode themes',
    impact: 'Dark themes crafted for long sessions. Colors chosen to reduce eye strain.',
    overview: 'Theme collection for VS Code. Multiple variants, semantic highlighting, terminal + UI theming.',
    problem: 'Most dark themes prioritize aesthetics over ergonomics. Wanted both.',
    approach: 'Color science research. Tested contrast ratios. Iterated through weeks of daily use.',
    stack: ['Design', 'JSON'],
    features: ['Multiple variants', 'Semantic tokens', 'Terminal colors', 'Full UI'],
    year: '2024', status: 'STABLE',
    link: 'https://github.com/noxire-dev/midnight-theme',
  },
]

const blogPosts = [
  {
    id: 'v2-rebuild', title: 'Portfolio V2', date: '2025.11.19', readTime: '3m',
    excerpt: 'Scrapped everything. Started over with React, TypeScript, new design philosophy.',
    content: `When I first started this 3 years ago, I used Flask and some questionable design choices. Knowing only Python at the time, Flask felt magical.\n\nI've since learned a lot — new languages, new frameworks, new design thinking. Time for a clean slate.\n\nReact, TypeScript, Tailwind, Vite. Every decision intentional. The palette, the spacing, the hierarchy — all following a strict system.`,
    tags: ['SYS', 'DSN'],
  },
  {
    id: 'first-year', title: 'Year 1 Complete', date: '2025.08.28', readTime: '2m',
    excerpt: '96/100. First Class Honours. University of Essex.',
    content: `First year at Essex — 96/100, First Class Honours.\n\nThe biggest lesson wasn't technical. It was decomposition: breaking complex problems into manageable pieces, managing time across projects, knowing when to ask for help.\n\nSecond year starts with momentum and clearer goals.`,
    tags: ['EDU', 'LOG'],
  },
  {
    id: 'learning-c', title: 'Learning C', date: '2025.02.23', readTime: '2m',
    excerpt: 'Not to master it. To understand everything built on top of it.',
    content: `Started C not to become a C developer, but to understand how Go, Rust, and C++ actually work underneath.\n\nImplementing my own string functions, my own linked list — suddenly everything makes more sense.\n\nSegfaults aren't fun. But every hour in C compounds across every other language.`,
    tags: ['SYS', 'LOG'],
  },
]

const capabilities = [
  { name: 'Python', level: 'PRIMARY', pct: 95 },
  { name: 'Go', level: 'PRIMARY', pct: 80 },
  { name: 'JavaScript', level: 'PRIMARY', pct: 85 },
  { name: 'TypeScript', level: 'PRIMARY', pct: 80 },
  { name: 'Java', level: 'SECONDARY', pct: 70 },
  { name: 'C', level: 'LEARNING', pct: 45 },
  { name: 'React', level: 'FRAMEWORK', pct: 75 },
  { name: 'Flask', level: 'FRAMEWORK', pct: 85 },
]

// ─── UTILS ─────────────────────────────────────

function Coord({ label }: { label: string }) {
  return <span className="text-[9px] font-mono select-none" style={{ color: DIM }}>{label}</span>
}

function PanelHeader({ title, status }: { title: string; status?: string }) {
  return (
    <div className="flex items-center justify-between px-3 py-1.5 border-b" style={{ borderColor: EDGE, background: '#0A0A0D' }}>
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5" style={{ background: LIME }} />
        <span className="text-[10px] tracking-[0.2em] font-mono" style={{ color: MID }}>{title}</span>
      </div>
      {status && <span className="text-[9px] font-mono" style={{ color: LIME, opacity: 0.6 }}>{status}</span>}
    </div>
  )
}

function Divider() {
  return (
    <div className="py-8 font-mono text-[10px] flex items-center gap-4 select-none" style={{ color: DIM }}>
      <span>+</span>
      <div className="flex-1 h-px" style={{ background: EDGE }} />
      <span>×</span>
      <div className="flex-1 h-px" style={{ background: EDGE }} />
      <span>+</span>
    </div>
  )
}

// ─── NAVIGATION ────────────────────────────────

function Nav({ currentView, setView }: { currentView: View; setView: (v: View) => void }) {
  const [time, setTime] = useState(new Date())
  const [scrollPct, setScrollPct] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    const s = () => setScrollPct(Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100) || 0)
    window.addEventListener('scroll', s)
    return () => { clearInterval(t); window.removeEventListener('scroll', s) }
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b font-mono" style={{ background: `${BG}ee`, backdropFilter: 'blur(12px)', borderColor: EDGE }}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-10 flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-6">
          <button onClick={() => setView('home')} className="flex items-center gap-1.5 group">
            <span className="font-bold" style={{ color: LIME }}>SYS</span>
            <span style={{ color: DIM }}>/</span>
            <span style={{ color: MID }}>032</span>
          </button>
          <div className="hidden md:flex items-center gap-1" style={{ color: DIM }}>
            <span>──</span>
            <span style={{ color: MID }}>SINA DILEK</span>
            <span>──</span>
          </div>
        </div>

        <div className="flex items-center gap-5">
          {(['home', 'blog'] as const).map(v => (
            <button key={v} onClick={() => setView(v)} className="tracking-wider transition-colors"
              style={{ color: (currentView === v || (v === 'blog' && currentView === 'blog-post')) ? LIME : DIM }}>
              {v === 'home' ? 'WORK' : 'LOG'}
            </button>
          ))}
          <span style={{ color: DIM }}>|</span>
          <span className="tabular-nums hidden md:inline" style={{ color: `${LIME}60` }}>
            {time.toLocaleTimeString('en-GB', { hour12: false })}
          </span>
          <span className="tabular-nums" style={{ color: DIM }}>{scrollPct}%</span>
          <Link to="/" style={{ color: DIM }}>EXIT</Link>
        </div>
      </div>
    </nav>
  )
}

// ─── INNER PAGES ───────────────────────────────

function ProjectPage({ projectId, setView }: { projectId: string; setView: (v: View) => void }) {
  const p = projects.find(x => x.id === projectId) || projects[0]

  return (
    <div className="pt-14 min-h-screen font-mono" style={{ background: BG }}>
      <div className="max-w-[900px] mx-auto px-4 md:px-8 py-10">
        <button onClick={() => setView('home')} className="text-[11px] mb-8 flex items-center gap-2" style={{ color: DIM }}>
          <span style={{ color: LIME }}>←</span> WORK
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          {/* Header panel */}
          <div className="border mb-6" style={{ borderColor: EDGE, background: PANEL }}>
            <PanelHeader title={p.idx} status={p.status} />
            <div className="p-6">
              <h1 className="text-4xl md:text-5xl font-black mb-2" style={{ color: BRIGHT, fontFamily: 'Inter, system-ui, sans-serif' }}>{p.name}</h1>
              <p className="text-sm" style={{ color: MID }}>{p.impact}</p>
            </div>
          </div>

          {/* Screenshot */}
          <div className="border mb-6 relative" style={{ borderColor: EDGE }}>
            <PanelHeader title="PREVIEW" status="IMG" />
            <div className="aspect-video flex items-center justify-center" style={{ background: '#060608' }}>
              <span className="text-[10px]" style={{ color: DIM }}>[ RENDER_OUTPUT ]</span>
            </div>
          </div>

          {/* Info grid */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {[
              { label: 'YEAR', value: p.year },
              { label: 'STACK', value: p.stack.join(' · ') },
              { label: 'STATUS', value: p.status },
            ].map(item => (
              <div key={item.label} className="border p-4" style={{ borderColor: EDGE, background: PANEL }}>
                <span className="text-[9px] tracking-[0.2em] block mb-1" style={{ color: DIM }}>{item.label}</span>
                <span className="text-sm font-bold" style={{ color: item.label === 'STATUS' ? LIME : BRIGHT }}>{item.value}</span>
              </div>
            ))}
          </div>

          {/* Case study sections */}
          {[
            { label: 'OVERVIEW', text: p.overview },
            { label: 'PROBLEM', text: p.problem },
            { label: 'APPROACH', text: p.approach },
          ].map(section => (
            <div key={section.label} className="mb-6">
              <span className="text-[9px] tracking-[0.2em] block mb-2" style={{ color: LIME }}>{section.label}</span>
              <p className="text-sm leading-relaxed" style={{ color: MID }}>{section.text}</p>
            </div>
          ))}

          {/* Features */}
          <div className="border mb-6" style={{ borderColor: EDGE, background: PANEL }}>
            <PanelHeader title="FEATURES" status={`${p.features.length} ITEMS`} />
            <div className="p-4 space-y-2">
              {p.features.map((f, i) => (
                <div key={f} className="flex items-center gap-3 text-sm">
                  <span className="text-[9px] font-mono" style={{ color: LIME }}>{String(i).padStart(2, '0')}</span>
                  <span style={{ color: MID }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          <a href={p.link} target="_blank" rel="noopener" className="text-[11px] font-bold" style={{ color: LIME }}>
            OPEN_REMOTE → {p.link}
          </a>
        </motion.div>
      </div>
    </div>
  )
}

function BlogListPage({ setView, setSelectedPost }: { setView: (v: View) => void; setSelectedPost: (s: string) => void }) {
  return (
    <div className="pt-14 min-h-screen font-mono" style={{ background: BG }}>
      <div className="max-w-[900px] mx-auto px-4 md:px-8 py-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="flex items-center gap-3 mb-8">
            <span className="text-[9px] tracking-[0.2em]" style={{ color: LIME }}>LOG</span>
            <div className="flex-1 h-px" style={{ background: EDGE }} />
            <span className="text-[9px]" style={{ color: DIM }}>{blogPosts.length} ENTRIES</span>
          </div>

          <div className="space-y-3">
            {blogPosts.map((post, i) => (
              <motion.button key={post.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                onClick={() => { setSelectedPost(post.id); setView('blog-post') }}
                className="group w-full text-left border transition-colors" style={{ borderColor: EDGE, background: PANEL }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${LIME}50` }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = EDGE }}>
                <div className="p-4 flex gap-4">
                  <span className="text-[9px] mt-1 flex-shrink-0 tabular-nums" style={{ color: DIM }}>{post.date}</span>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-sm font-bold mb-0.5 transition-colors" style={{ color: BRIGHT }}>{post.title}</h2>
                    <p className="text-xs truncate" style={{ color: MID }}>{post.excerpt}</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {post.tags.map(t => <span key={t} className="text-[8px] px-1.5 py-0.5" style={{ background: EDGE, color: DIM }}>{t}</span>)}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function BlogPostPage({ postId, setView }: { postId: string; setView: (v: View) => void }) {
  const post = blogPosts.find(p => p.id === postId) || blogPosts[0]
  return (
    <div className="pt-14 min-h-screen font-mono" style={{ background: BG }}>
      <div className="max-w-[680px] mx-auto px-4 md:px-8 py-10">
        <button onClick={() => setView('blog')} className="text-[11px] mb-8" style={{ color: DIM }}>
          <span style={{ color: LIME }}>←</span> LOG
        </button>
        <motion.article initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[9px] tabular-nums" style={{ color: DIM }}>{post.date}</span>
            <span style={{ color: DIM }}>·</span>
            <span className="text-[9px]" style={{ color: DIM }}>{post.readTime}</span>
            {post.tags.map(t => <span key={t} className="text-[8px] px-1.5 py-0.5" style={{ background: LIME, color: BG }}>{t}</span>)}
          </div>
          <h1 className="text-2xl md:text-3xl font-black mb-8" style={{ color: BRIGHT, fontFamily: 'Inter, system-ui, sans-serif' }}>{post.title}</h1>
          <div className="space-y-4">
            {post.content.split('\n\n').map((p, i) => <p key={i} className="text-sm leading-relaxed" style={{ color: MID }}>{p}</p>)}
          </div>
        </motion.article>
      </div>
    </div>
  )
}

// ─── MAIN ──────────────────────────────────────

export default function Design32() {
  const [view, setView] = useState<View>('home')
  const [selectedProject, setSelectedProject] = useState('gosh')
  const [selectedPost, setSelectedPost] = useState('v2-rebuild')
  const [mouseGrid, setMouseGrid] = useState({ col: 0, row: 0 })
  const scrollRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useEffect(() => {
    const h = (e: MouseEvent) => {
      setMouseGrid({
        col: Math.floor(e.clientX / (window.innerWidth / 12)),
        row: Math.floor(e.clientY / 80),
      })
    }
    window.addEventListener('mousemove', h)
    return () => window.removeEventListener('mousemove', h)
  }, [])

  return (
    <div className="min-h-screen font-mono" style={{ background: BG, color: BRIGHT }}>
      <style>{`
        ::selection { background: ${LIME}; color: ${BG}; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Scroll progress bar */}
      <motion.div className="fixed top-0 left-0 h-px z-[60]" style={{ width: progressWidth, background: LIME }} />

      {/* Grid coordinate markers (left edge) */}
      <div className="fixed left-2 top-14 bottom-0 z-40 pointer-events-none hidden md:flex flex-col justify-between py-4">
        {Array.from({ length: 12 }, (_, i) => (
          <Coord key={i} label={`${String(i).padStart(2, '0')}`} />
        ))}
      </div>

      {/* Grid coordinate markers (bottom edge) */}
      <div className="fixed bottom-2 left-8 right-8 z-40 pointer-events-none hidden md:flex justify-between">
        {Array.from({ length: 12 }, (_, i) => (
          <Coord key={i} label={String.fromCharCode(65 + i)} />
        ))}
      </div>

      {/* Mouse grid readout */}
      <div className="fixed bottom-2 right-2 z-40 pointer-events-none hidden md:block">
        <span className="text-[9px] font-mono tabular-nums" style={{ color: `${LIME}40` }}>
          {String.fromCharCode(65 + mouseGrid.col)}{mouseGrid.row}
        </span>
      </div>

      {/* Faint grid overlay */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        backgroundImage: `linear-gradient(${LIME}04 1px, transparent 1px), linear-gradient(90deg, ${LIME}04 1px, transparent 1px)`,
        backgroundSize: `${100/12}vw 80px`,
      }} />

      <Nav currentView={view} setView={setView} />

      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

            {/* ═══════ HERO: System boot sequence ═══════ */}
            <section className="min-h-screen flex flex-col justify-center px-4 md:px-8 pt-14">
              <div className="max-w-[1400px] mx-auto w-full">
                {/* System status line */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
                  className="flex items-center gap-4 mb-10 text-[10px]" style={{ color: DIM }}>
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: LIME }} />
                  <span>SYS_READY</span>
                  <span>·</span>
                  <span>ESSEX.UK</span>
                  <span>·</span>
                  <span style={{ color: LIME }}>OPEN_FOR_WORK</span>
                </motion.div>

                {/* Name — massive, but structured in a grid */}
                <div className="grid grid-cols-12 gap-x-4 mb-8">
                  <motion.div className="col-span-12 md:col-span-9"
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
                    <div className="flex items-baseline gap-4 mb-2">
                      <Coord label="A0" />
                      <h1 className="text-[18vw] md:text-[11vw] font-black leading-[0.82] tracking-tighter"
                        style={{ color: BRIGHT, fontFamily: 'Inter, system-ui, sans-serif' }}>
                        SINA
                      </h1>
                    </div>
                    <div className="flex items-baseline gap-4">
                      <Coord label="A1" />
                      <h1 className="text-[18vw] md:text-[11vw] font-black leading-[0.82] tracking-tighter"
                        style={{ color: LIME, fontFamily: 'Inter, system-ui, sans-serif' }}>
                        DILEK
                      </h1>
                    </div>
                  </motion.div>

                  {/* Right panel — profile data */}
                  <motion.div className="col-span-12 md:col-span-3 mt-8 md:mt-0 flex items-end"
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                    <div className="w-full border" style={{ borderColor: EDGE, background: PANEL }}>
                      <PanelHeader title="PROFILE" status="v2.0" />
                      <div className="p-3 space-y-3 text-[11px]">
                        {[
                          { k: 'ROLE', v: 'Developer' },
                          { k: 'INST', v: 'Univ. of Essex' },
                          { k: 'YEAR', v: 'Y1 → Y2' },
                          { k: 'SCORE', v: '96 / 100' },
                          { k: 'CLASS', v: 'First' },
                        ].map(d => (
                          <div key={d.k} className="flex justify-between">
                            <span style={{ color: DIM }}>{d.k}</span>
                            <span style={{ color: d.k === 'SCORE' ? LIME : BRIGHT }}>{d.v}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Tagline */}
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
                  className="text-sm max-w-lg leading-relaxed mb-10" style={{ color: MID }}>
                  I build tools and learn systems. Product-minded developer focused on clean code, clear design, and things that work.
                </motion.p>

                {/* CTA row */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
                  className="flex flex-wrap gap-3 text-[11px]">
                  <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-5 py-2 font-bold tracking-wider" style={{ background: LIME, color: BG }}>
                    VIEW_WORK
                  </button>
                  <a href="mailto:contact@sinadilek.com"
                    className="px-5 py-2 font-bold tracking-wider border" style={{ borderColor: EDGE, color: MID }}>
                    CONTACT
                  </a>
                  <a href="https://github.com/noxire-dev" target="_blank" rel="noopener"
                    className="px-5 py-2 font-bold tracking-wider border" style={{ borderColor: EDGE, color: MID }}>
                    GITHUB
                  </a>
                </motion.div>
              </div>
            </section>

            <Divider />

            {/* ═══════ CAPABILITIES: Horizontal bar chart ═══════ */}
            <section className="px-4 md:px-8 py-16">
              <div className="max-w-[1400px] mx-auto">
                <div className="grid grid-cols-12 gap-4">
                  {/* Label */}
                  <div className="col-span-12 md:col-span-3">
                    <div className="md:sticky md:top-20">
                      <Coord label="B0" />
                      <h2 className="text-2xl font-black mt-2 mb-1" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                        STACK
                      </h2>
                      <p className="text-[11px]" style={{ color: DIM }}>
                        {capabilities.length} technologies across 3 tiers
                      </p>
                    </div>
                  </div>

                  {/* Bar chart */}
                  <div className="col-span-12 md:col-span-9">
                    <div className="border" style={{ borderColor: EDGE, background: PANEL }}>
                      <PanelHeader title="CAPABILITIES" status="RUNTIME" />
                      <div className="p-4 space-y-2">
                        {capabilities.map((cap, i) => (
                          <motion.div key={cap.name} className="group flex items-center gap-3 cursor-default"
                            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.04 }} viewport={{ once: true }}>
                            <span className="w-20 text-[11px] text-right flex-shrink-0 transition-colors group-hover:!text-[#C3FF00]"
                              style={{ color: MID }}>{cap.name}</span>
                            <div className="flex-1 h-5 relative" style={{ background: '#0A0A0D' }}>
                              <motion.div className="absolute inset-y-0 left-0"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${cap.pct}%` }}
                                transition={{ delay: i * 0.06, duration: 0.6 }}
                                viewport={{ once: true }}
                                style={{ background: `${LIME}${cap.level === 'PRIMARY' ? 'CC' : cap.level === 'FRAMEWORK' ? '80' : '50'}` }}
                              />
                              <div className="absolute inset-0 flex items-center justify-end pr-2">
                                <span className="text-[8px] font-mono" style={{ color: DIM }}>{cap.pct}</span>
                              </div>
                            </div>
                            <span className="text-[8px] w-20 flex-shrink-0 tracking-wider" style={{ color: DIM }}>{cap.level}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <Divider />

            {/* ═══════ PROJECTS: Horizontal scroll gallery ═══════ */}
            <section id="projects" className="py-16">
              <div className="max-w-[1400px] mx-auto px-4 md:px-8 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Coord label="C0" />
                    <h2 className="text-2xl font-black mt-2" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      WORK
                    </h2>
                  </div>
                  <span className="text-[9px]" style={{ color: DIM }}>{projects.length} PROJECTS · SCROLL →</span>
                </div>
              </div>

              {/* Horizontal scroll */}
              <div ref={scrollRef} className="flex gap-4 overflow-x-auto hide-scrollbar px-4 md:px-8 pb-4 snap-x snap-mandatory">
                {projects.map((project, i) => (
                  <motion.button key={project.id}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                    onClick={() => { setSelectedProject(project.id); setView('project') }}
                    className="group flex-shrink-0 w-[85vw] md:w-[420px] text-left snap-start border transition-colors"
                    style={{ borderColor: EDGE, background: PANEL }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${LIME}60` }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = EDGE }}>

                    {/* Mini preview */}
                    <div className="aspect-[16/10] flex items-center justify-center relative" style={{ background: '#060608' }}>
                      <span className="text-[60px] font-black opacity-[0.04]" style={{ color: LIME, fontFamily: 'Inter, system-ui, sans-serif' }}>
                        {project.idx.split('_')[1]}
                      </span>
                      {/* Status badge */}
                      <div className="absolute top-3 right-3 flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full" style={{
                          background: project.status === 'ACTIVE' ? '#4ADE80' : project.status === 'STABLE' ? '#60A5FA' : '#FACC15'
                        }} />
                        <span className="text-[8px]" style={{ color: DIM }}>{project.status}</span>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[9px]" style={{ color: LIME }}>{project.idx}</span>
                        <div className="flex gap-1.5">
                          {project.stack.map(t => (
                            <span key={t} className="text-[8px] px-1.5 py-0.5" style={{ background: EDGE, color: MID }}>{t}</span>
                          ))}
                        </div>
                      </div>
                      <h3 className="text-xl font-black mb-1 transition-colors group-hover:!text-[#C3FF00]"
                        style={{ color: BRIGHT, fontFamily: 'Inter, system-ui, sans-serif' }}>
                        {project.name}
                      </h3>
                      <p className="text-xs mb-4" style={{ color: MID, lineHeight: 1.6 }}>{project.brief}</p>
                      <span className="text-[10px] font-bold" style={{ color: LIME }}>OPEN_CASE →</span>
                    </div>
                  </motion.button>
                ))}

                {/* End card */}
                <div className="flex-shrink-0 w-[85vw] md:w-[420px] flex items-center justify-center snap-start border border-dashed"
                  style={{ borderColor: EDGE }}>
                  <div className="text-center">
                    <span className="text-[10px] block mb-2" style={{ color: DIM }}>MORE_INCOMING</span>
                    <a href="https://github.com/noxire-dev" target="_blank" rel="noopener" className="text-[11px] font-bold" style={{ color: LIME }}>
                      SEE_ALL_ON_GITHUB →
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <Divider />

            {/* ═══════ LOG PREVIEW ═══════ */}
            <section className="px-4 md:px-8 py-16">
              <div className="max-w-[1400px] mx-auto">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-12 md:col-span-3">
                    <Coord label="D0" />
                    <h2 className="text-2xl font-black mt-2 mb-1" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>LOG</h2>
                    <p className="text-[11px] mb-4" style={{ color: DIM }}>Recent entries</p>
                    <button onClick={() => setView('blog')} className="text-[10px] font-bold" style={{ color: LIME }}>VIEW_ALL →</button>
                  </div>

                  <div className="col-span-12 md:col-span-9 space-y-3">
                    {blogPosts.map((post, i) => (
                      <motion.button key={post.id}
                        initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                        onClick={() => { setSelectedPost(post.id); setView('blog-post') }}
                        className="group w-full text-left border transition-colors"
                        style={{ borderColor: EDGE, background: PANEL }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = `${LIME}40` }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = EDGE }}>
                        <div className="p-4 flex items-center gap-4">
                          <span className="text-[9px] tabular-nums flex-shrink-0" style={{ color: DIM }}>{post.date}</span>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-bold truncate transition-colors group-hover:!text-[#C3FF00]" style={{ color: BRIGHT }}>{post.title}</h3>
                          </div>
                          <span className="text-[9px] flex-shrink-0" style={{ color: DIM }}>{post.readTime}</span>
                          <span className="text-sm flex-shrink-0 transition-transform group-hover:translate-x-1" style={{ color: DIM }}>→</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <Divider />

            {/* ═══════ CONTACT ═══════ */}
            <section className="px-4 md:px-8 py-20">
              <div className="max-w-[1400px] mx-auto">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-12 md:col-span-6">
                    <Coord label="E0" />
                    <h2 className="text-4xl md:text-6xl font-black mt-2 leading-tight"
                      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      LET'S<br /><span style={{ color: LIME }}>BUILD</span>
                    </h2>
                    <p className="text-sm mt-4 max-w-sm" style={{ color: MID }}>
                      Open to internships, freelance, and collaboration.
                    </p>
                  </div>

                  <div className="col-span-12 md:col-span-6 flex items-end">
                    <div className="w-full space-y-3">
                      {[
                        { label: 'EMAIL', value: 'contact@sinadilek.com', href: 'mailto:contact@sinadilek.com' },
                        { label: 'GITHUB', value: 'noxire-dev', href: 'https://github.com/noxire-dev' },
                        { label: 'LINKEDIN', value: 'sina-dilek', href: 'https://linkedin.com/in/sina-dilek-0b1b3b1b9' },
                      ].map(link => (
                        <motion.a key={link.label} href={link.href} target={link.label !== 'EMAIL' ? '_blank' : undefined}
                          rel="noopener" whileHover={{ x: 6 }}
                          className="group flex items-center justify-between p-4 border transition-colors"
                          style={{ borderColor: EDGE, background: PANEL }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = `${LIME}50` }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = EDGE }}>
                          <div>
                            <span className="text-[9px] tracking-[0.2em] block mb-0.5" style={{ color: DIM }}>{link.label}</span>
                            <span className="text-sm" style={{ color: BRIGHT }}>{link.value}</span>
                          </div>
                          <span className="transition-colors" style={{ color: DIM }}>→</span>
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ═══════ FOOTER ═══════ */}
            <footer className="px-4 md:px-8 py-4 border-t" style={{ borderColor: EDGE }}>
              <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-2 text-[9px]" style={{ color: DIM }}>
                <span>© {new Date().getFullYear()} SINA_DILEK</span>
                <div className="flex items-center gap-4">
                  <span>SYSTEM_032</span>
                  <span>·</span>
                  <span style={{ color: `${LIME}30` }}>Y2K_SWISS_BRUTALIST</span>
                </div>
              </div>
            </footer>
          </motion.div>
        )}

        {view === 'project' && (
          <motion.div key="project" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ProjectPage projectId={selectedProject} setView={setView} />
          </motion.div>
        )}
        {view === 'blog' && (
          <motion.div key="blog" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <BlogListPage setView={setView} setSelectedPost={setSelectedPost} />
          </motion.div>
        )}
        {view === 'blog-post' && (
          <motion.div key="blog-post" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <BlogPostPage postId={selectedPost} setView={setView} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
