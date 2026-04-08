import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

// Design 47: SYSTEM_052 LAVENDER — Dashboard OS + Pastel Brutalist Midnight
// Structure & details from Design 38 (panel UI, live clock, scroll %, grid coords, bar chart)
// Palette from Design 26 (lavender #CDB4DB on midnight #0D0D12)
// Readability fixed throughout: DIM/MID bumped, tiny text sizes increased, tag contrast fixed

type View = 'home' | 'project' | 'blog' | 'blog-post' | 'experience'

const LAVENDER = '#CDB4DB'
const LAVENDER_SOFT = '#9B72B0'
const BG = '#0D0D12'
const PANEL = '#16161F'
const PANEL_DARK = '#111018'
const EDGE = '#2A2A3A'
const DIM = '#6B6480'      // was #3A3A44 — bumped for readability
const MID = '#9B96AA'      // was #7A7A88 — bumped for readability
const BRIGHT = '#E8E0ED'

const projects = [
  {
    id: 'pookie', name: 'Pookie', idx: 'PRJ_001', brief: 'WhatsApp chat analyzer',
    impact: 'Analyze 10k+ lines of chat in under 8 seconds — entirely in your browser.',
    overview: 'Privacy-first WhatsApp chat analyzer. Upload your exported chat (.txt or .zip) and get deep relationship insights: message patterns, emoji stats, romantic keywords, response times. Zero data ever leaves your device.',
    problem: 'Chat analyzers either require uploading your private data to a server or are too slow to be useful.',
    approach: 'All processing runs in a Web Worker on the client — no server, no storage, no privacy risk. React 19 + Vite 7 keeps the bundle lean and fast.',
    stack: ['React 19', 'TypeScript', 'Vite'], features: ['Client-side Web Worker processing', '10k+ lines in < 8 seconds', 'Emoji & keyword analytics', 'Export as PNG, PDF, HTML'],
    year: '2026', status: 'LIVE', link: 'https://pookie.sh',
  },
  {
    id: 'gosh', name: 'GoSH', idx: 'PRJ_002', brief: 'Shell written in Go',
    impact: 'Fully functional Unix shell — pipes, redirects, process management from scratch.',
    overview: 'Minimalist shell demonstrating core systems programming: process forking, I/O redirection, command parsing — built entirely in Go.',
    problem: 'Developers use shells daily without understanding how they actually work under the hood.',
    approach: 'Incremental build: lexer → parser → executor. Go for clean concurrency and a strong stdlib.',
    stack: ['Go', 'Systems'], features: ['Pipe chains', 'I/O redirection', 'Process spawning', 'Built-in cmds'],
    year: '2025', status: 'ACTIVE', link: 'https://github.com/noxire-dev/GoSH',
  },
  {
    id: 'moji', name: 'Moji', idx: 'PRJ_003', brief: 'Productivity app',
    impact: 'Note-taking and task management designed UI-first — fast, opinionated, zero bloat.',
    overview: 'Workspace-centric todo + notepad app. Every interaction feels instant. Built with Flask and TypeScript, focused on clean UX over feature count.',
    problem: 'Most note apps are bloated with features nobody uses. Needed something fast and opinionated.',
    approach: 'UI-first design. Server-rendered with progressive JS enhancement. SQLite for zero-config deployment.',
    stack: ['TypeScript', 'Flask', 'SQLite'], features: ['Markdown notes', 'Task management', 'Tags & categories', 'Dark mode'],
    year: '2025', status: 'ACTIVE', link: 'https://github.com/noxire-dev/moji',
  },
  {
    id: 'lorekeeper', name: 'LoreKeeper', idx: 'PRJ_004', brief: 'RPG marketplace',
    impact: 'Community platform for discovering and sharing free tabletop RPG resources.',
    overview: 'E-commerce platform for free TTRPG materials. Browse, download, and share game resources — no paywalls.',
    problem: 'TTRPG resources are scattered across forums, Discord servers, and random Google Drive links.',
    approach: 'Marketplace without payments. PostgreSQL full-text search for fast discovery.',
    stack: ['Python', 'PostgreSQL', 'JavaScript'], features: ['User accounts', 'Full-text search', 'Community ratings', 'PDF viewer'],
    year: '2025', status: 'DEV', link: 'https://github.com/noxire-dev/LoreKeeper',
  },
  {
    id: 'midnight', name: 'Midnight Moon', idx: 'PRJ_005', brief: 'VSCode theme collection',
    impact: 'Dark themes built for long sessions — contrast ratios chosen by color science, not aesthetics.',
    overview: 'Carefully crafted VS Code theme collection with multiple variants and full semantic token coverage.',
    problem: 'Most dark themes look good in screenshots but cause eye strain after two hours of coding.',
    approach: 'Color science first. Tested contrast ratios against WCAG. Iterated based on daily use.',
    stack: ['Design', 'JSON'], features: ['Multiple variants', 'Semantic highlighting', 'Terminal colors', 'Full UI theming'],
    year: '2024', status: 'STABLE', link: 'https://github.com/noxire-dev/midnight-theme',
  },
  {
    id: 'vello', name: 'Vello', idx: 'PRJ_006', brief: 'Email outreach automation',
    impact: 'Enterprise cold outreach at scale — BYOE model, AI response classification, inbox warmup built in.',
    overview: 'Automation-first email campaign platform. Multi-step sequences, inbox rotation, send-time timezone optimization, and intent-based response classification — built to scale without burning sender reputation.',
    problem: 'Cold email at scale either destroys deliverability or requires expensive managed services that lock you in.',
    approach: 'Bring-your-own-email model with protocol-based provider abstraction. SQLAlchemy + Jinja2 keeps it modular and self-hostable.',
    stack: ['Python', 'SQLAlchemy', 'Jinja2'], features: ['Multi-step sequences', 'Inbox rotation & warmup', 'AI intent classification', 'SMTP / SendGrid support'],
    year: '2025', status: 'DEV', link: 'https://github.com/noxire-dev/vello',
  },
]

const experience = [
  {
    id: 'pricelantern',
    role: 'Lead Software Developer',
    company: 'PriceLantern',
    tagline: 'AI-Powered Quote Analysis Platform · Startup',
    period: 'Nov 2025 – Present',
    location: 'Remote',
    summary: 'Paid engineering role at an early-stage startup. Led core engine development and production deployment of a B2B AI quote analysis platform.',
    highlights: [
      { stat: '60%', label: 'Speed increase', detail: 'Rewrote and optimised the core analysis engine (+1k lines) — delivering a 60% performance improvement through algorithmic improvements and smarter data processing.' },
      { stat: '40%+', label: 'False match reduction', detail: 'Architected category-based product matching with 16 standardised categories and multi-algorithm fuzzy matching, significantly improving price comparison accuracy.' },
      { stat: '+957 ln', label: 'Test & docs', detail: 'Built a comprehensive test suite covering normalisation, matching, and edge cases — plus 724 lines of architecture documentation and developer onboarding guides.' },
      { stat: 'AI', label: 'LLM integration', detail: 'Optimised LLM prompting for PDF invoice and quote extraction — improved data consistency and reduced manual entry errors across document types.' },
      { stat: 'OPS', label: 'Deployment', detail: 'Led production deployment — environment configuration, infrastructure setup, and release coordination for the live service.' },
    ],
  },
]

const blogPosts = [
  { id: 'v2-rebuild', title: 'Portfolio V2', date: '2025.11.19', readTime: '3m', excerpt: 'Scrapped everything. Started over with React + TypeScript.', content: 'When I first started this 3 years ago, I used Flask and questionable design choices. Knowing only Python, Flask felt magical.\n\nI\'ve since learned a lot — new languages, new frameworks, new design thinking. Time for a clean slate.\n\nReact, TypeScript, Tailwind, Vite. Every decision intentional.', tags: ['SYS', 'DSN'] },
  { id: 'first-year', title: 'Year 1 Complete', date: '2025.08.28', readTime: '2m', excerpt: '96/100. First Class Honours. University of Essex.', content: 'First year at Essex — 96/100, First Class Honours.\n\nThe biggest lesson wasn\'t technical. It was decomposition: breaking complex problems into manageable pieces, managing time.\n\nSecond year starts with momentum.', tags: ['EDU', 'LOG'] },
  { id: 'learning-c', title: 'Learning C', date: '2025.02.23', readTime: '2m', excerpt: 'Not to master it. To understand everything built on top.', content: 'Started C not to become a C developer, but to understand how Go, Rust, and C++ work underneath.\n\nImplementing my own string functions, my own linked list — suddenly everything makes sense.\n\nSegfaults aren\'t fun. But every hour in C compounds.', tags: ['SYS', 'LOG'] },
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

function Coord({ label }: { label: string }) {
  return <span className="text-[10px] font-mono select-none" style={{ color: DIM }}>{label}</span>
}

function PanelHeader({ title, status }: { title: string; status?: string }) {
  return (
    <div className="flex items-center justify-between px-3 py-2 border-b" style={{ borderColor: EDGE, background: PANEL_DARK }}>
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: LAVENDER }} />
        <span className="text-[11px] tracking-[0.18em] font-mono" style={{ color: MID }}>{title}</span>
      </div>
      {status && <span className="text-[10px] font-mono" style={{ color: LAVENDER }}>{status}</span>}
    </div>
  )
}

function Divider() {
  return (
    <div className="py-8 font-mono text-[11px] flex items-center gap-4 select-none" style={{ color: DIM }}>
      <span>◆</span>
      <div className="flex-1 h-px" style={{ background: EDGE }} />
      <span>◆</span>
      <div className="flex-1 h-px" style={{ background: EDGE }} />
      <span>◆</span>
    </div>
  )
}

type ExperienceJob = typeof experience[number]

function ExperienceCard({ job, onClick }: { job: ExperienceJob; onClick: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <button
        onClick={onClick}
        className="group w-full text-left border transition-colors"
        style={{ borderColor: EDGE, background: PANEL }}
        onMouseEnter={e => e.currentTarget.style.borderColor = `${LAVENDER}60`}
        onMouseLeave={e => e.currentTarget.style.borderColor = EDGE}
      >
        <PanelHeader title={job.company.toUpperCase()} status={job.location} />
        <div className="p-5 flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
              <span className="text-base font-black" style={{ color: BRIGHT }}>{job.role}</span>
              <span className="text-[11px]" style={{ color: LAVENDER }}>{job.tagline}</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: MID }}>{job.summary}</p>
            <div className="flex gap-3 mt-3">
              {job.highlights.map(h => (
                <span key={h.stat} className="text-[11px] font-black" style={{ color: LAVENDER }}>{h.stat}</span>
              ))}
            </div>
          </div>
          <span className="text-sm flex-shrink-0 transition-transform group-hover:translate-x-1" style={{ color: DIM }}>→</span>
        </div>
      </button>
    </motion.div>
  )
}

function ExperiencePage({ job, setView }: { job: ExperienceJob; setView: (v: View) => void }) {
  return (
    <div className="pt-14 min-h-screen font-mono" style={{ background: BG }}>
      <div className="max-w-[860px] mx-auto px-4 md:px-8 py-10">
        <button onClick={() => setView('home')} className="text-[12px] mb-10 flex items-center gap-2" style={{ color: DIM }}>
          <span style={{ color: LAVENDER }}>←</span> BACK
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header */}
          <div className="border mb-8" style={{ borderColor: EDGE, background: PANEL }}>
            <PanelHeader title="EXPERIENCE" status={job.location} />
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-black mb-1" style={{ color: BRIGHT }}>{job.role}</h1>
                  <p className="text-base" style={{ color: LAVENDER }}>{job.company} · {job.tagline}</p>
                </div>
                <span className="text-sm tabular-nums flex-shrink-0 border px-3 py-1 self-start" style={{ borderColor: EDGE, color: MID }}>{job.period}</span>
              </div>
              <p className="mt-5 text-base leading-relaxed" style={{ color: MID }}>{job.summary}</p>
            </div>
          </div>

          {/* Highlights */}
          <div className="space-y-4">
            {job.highlights.map((h, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                className="border p-6 md:p-8" style={{ borderColor: EDGE, background: PANEL }}>
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-4xl font-black leading-none" style={{ color: LAVENDER }}>{h.stat}</span>
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
    <nav className="fixed top-0 left-0 right-0 z-50 border-b font-mono" style={{ background: `${BG}ee`, backdropFilter: 'blur(14px)', borderColor: EDGE }}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-11 flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-6">
          <button onClick={() => setView('home')} className="flex items-center gap-1.5">
            <span className="font-bold" style={{ color: LAVENDER }}>SYS</span>
            <span style={{ color: DIM }}>/</span>
            <span style={{ color: MID }}>052</span>
          </button>
          <span className="hidden md:inline" style={{ color: DIM }}>── SINA DILEK ──</span>
        </div>
        <div className="flex items-center gap-5">
          {(['home', 'blog'] as const).map(v => (
            <button key={v} onClick={() => setView(v)} className="tracking-wider transition-colors"
              style={{ color: (currentView === v || (v === 'blog' && currentView === 'blog-post')) ? LAVENDER : DIM }}>
              {v === 'home' ? 'WORK' : 'LOG'}
            </button>
          ))}
          <span style={{ color: EDGE }}>|</span>
          <span className="tabular-nums hidden md:inline" style={{ color: `${LAVENDER}80` }}>{time.toLocaleTimeString('en-GB', { hour12: false })}</span>
          <span className="tabular-nums" style={{ color: DIM }}>{scrollPct}%</span>
          <Link to="/" style={{ color: DIM }}>EXIT</Link>
        </div>
      </div>
    </nav>
  )
}

function ProjectPage({ projectId, setView }: { projectId: string; setView: (v: View) => void }) {
  const p = projects.find(x => x.id === projectId) || projects[0]
  return (
    <div className="pt-14 min-h-screen font-mono" style={{ background: BG }}>
      <div className="max-w-[900px] mx-auto px-4 md:px-8 py-10">
        <button onClick={() => setView('home')} className="text-[12px] mb-8 flex items-center gap-2" style={{ color: DIM }}>
          <span style={{ color: LAVENDER }}>←</span> WORK
        </button>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="border mb-6" style={{ borderColor: EDGE, background: PANEL }}>
            <PanelHeader title={p.idx} status={p.status} />
            <div className="p-6">
              <h1 className="text-4xl md:text-5xl font-black mb-2" style={{ color: BRIGHT }}>{p.name}</h1>
              <p className="text-sm leading-relaxed" style={{ color: MID }}>{p.impact}</p>
            </div>
          </div>
          <div className="border mb-6" style={{ borderColor: EDGE }}>
            <PanelHeader title="PREVIEW" status="IMG" />
            <div className="aspect-video flex items-center justify-center" style={{ background: PANEL_DARK }}>
              <span className="text-[11px]" style={{ color: DIM }}>[ RENDER_OUTPUT ]</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {[{ label: 'YEAR', value: p.year }, { label: 'STACK', value: p.stack.join(' · ') }, { label: 'STATUS', value: p.status }].map(item => (
              <div key={item.label} className="border p-4" style={{ borderColor: EDGE, background: PANEL }}>
                <span className="text-[11px] tracking-[0.18em] block mb-1" style={{ color: DIM }}>{item.label}</span>
                <span className="text-sm font-bold" style={{ color: item.label === 'STATUS' ? LAVENDER : BRIGHT }}>{item.value}</span>
              </div>
            ))}
          </div>
          {[{ label: 'OVERVIEW', text: p.overview }, { label: 'PROBLEM', text: p.problem }, { label: 'APPROACH', text: p.approach }].map(s => (
            <div key={s.label} className="mb-6">
              <span className="text-[11px] tracking-[0.18em] block mb-2" style={{ color: LAVENDER }}>{s.label}</span>
              <p className="text-sm leading-relaxed" style={{ color: MID }}>{s.text}</p>
            </div>
          ))}
          <div className="border mb-6" style={{ borderColor: EDGE, background: PANEL }}>
            <PanelHeader title="FEATURES" status={`${p.features.length}`} />
            <div className="p-4 space-y-2">
              {p.features.map((f, i) => (
                <div key={f} className="flex items-center gap-3 text-sm">
                  <span className="text-[11px]" style={{ color: LAVENDER }}>{String(i).padStart(2, '0')}</span>
                  <span style={{ color: MID }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
          <a href={p.link} target="_blank" rel="noopener" className="text-[12px] font-bold" style={{ color: LAVENDER }}>OPEN_REMOTE → {p.link}</a>
        </motion.div>
      </div>
    </div>
  )
}

function BlogListPage({ setView, setSelectedPost }: { setView: (v: View) => void; setSelectedPost: (s: string) => void }) {
  return (
    <div className="pt-14 min-h-screen font-mono" style={{ background: BG }}>
      <div className="max-w-[900px] mx-auto px-4 md:px-8 py-10">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-[11px] tracking-[0.18em]" style={{ color: LAVENDER }}>LOG</span>
          <div className="flex-1 h-px" style={{ background: EDGE }} />
          <span className="text-[11px]" style={{ color: DIM }}>{blogPosts.length} ENTRIES</span>
        </div>
        <div className="space-y-3">
          {blogPosts.map((post, i) => (
            <motion.button key={post.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
              onClick={() => { setSelectedPost(post.id); setView('blog-post') }}
              className="group w-full text-left border transition-colors" style={{ borderColor: EDGE, background: PANEL }}
              onMouseEnter={e => e.currentTarget.style.borderColor = `${LAVENDER}60`}
              onMouseLeave={e => e.currentTarget.style.borderColor = EDGE}>
              <div className="p-4 flex gap-4">
                <span className="text-[11px] mt-1 flex-shrink-0 tabular-nums" style={{ color: DIM }}>{post.date}</span>
                <div className="flex-1 min-w-0">
                  <h2 className="text-sm font-bold mb-0.5" style={{ color: BRIGHT }}>{post.title}</h2>
                  <p className="text-xs truncate" style={{ color: MID }}>{post.excerpt}</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {post.tags.map(t => (
                    <span key={t} className="text-[10px] px-1.5 py-0.5" style={{ background: `${LAVENDER}18`, color: LAVENDER_SOFT }}>{t}</span>
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

function BlogPostPage({ postId, setView }: { postId: string; setView: (v: View) => void }) {
  const post = blogPosts.find(p => p.id === postId) || blogPosts[0]
  return (
    <div className="pt-14 min-h-screen font-mono" style={{ background: BG }}>
      <div className="max-w-[680px] mx-auto px-4 md:px-8 py-10">
        <button onClick={() => setView('blog')} className="text-[12px] mb-8" style={{ color: DIM }}><span style={{ color: LAVENDER }}>←</span> LOG</button>
        <motion.article initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[11px] tabular-nums" style={{ color: DIM }}>{post.date}</span>
            <span style={{ color: DIM }}>·</span>
            <span className="text-[11px]" style={{ color: DIM }}>{post.readTime}</span>
            {post.tags.map(t => (
              <span key={t} className="text-[10px] px-1.5 py-0.5" style={{ background: LAVENDER, color: BG }}>{t}</span>
            ))}
          </div>
          <h1 className="text-2xl md:text-3xl font-black mb-8" style={{ color: BRIGHT }}>{post.title}</h1>
          <div className="space-y-4">
            {post.content.split('\n\n').map((p, i) => <p key={i} className="text-sm leading-relaxed" style={{ color: MID }}>{p}</p>)}
          </div>
        </motion.article>
      </div>
    </div>
  )
}

export default function Design47() {
  const [view, setView] = useState<View>('home')
  const [selectedProject, setSelectedProject] = useState('gosh')
  const [selectedPost, setSelectedPost] = useState('v2-rebuild')
  const [mouseGrid, setMouseGrid] = useState({ col: 0, row: 0 })
  const scrollRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useEffect(() => {
    const h = (e: MouseEvent) => setMouseGrid({ col: Math.floor(e.clientX / (window.innerWidth / 12)), row: Math.floor(e.clientY / 80) })
    window.addEventListener('mousemove', h)
    return () => window.removeEventListener('mousemove', h)
  }, [])

  return (
    <div className="min-h-screen font-mono" style={{ background: BG, color: BRIGHT }}>
      <style>{`
        ::selection { background: ${LAVENDER}; color: ${BG}; }
        .hide-sb::-webkit-scrollbar { display: none; }
        .hide-sb { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Scroll progress bar */}
      <motion.div className="fixed top-0 left-0 h-px z-[60]" style={{ width: progressWidth, background: LAVENDER }} />

      {/* Subtle static noise texture — no animation, no cheap jitter */}
      <div className="fixed inset-0 pointer-events-none z-[100]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
        opacity: 0.35,
        mixBlendMode: 'overlay',
      }} />

      {/* Atmospheric lavender glow — from Design 26 */}
      <div className="fixed -top-[20vw] -right-[10vw] w-[55vw] h-[55vw] rounded-full pointer-events-none" style={{
        background: `radial-gradient(circle, ${LAVENDER}10 0%, ${LAVENDER}05 40%, transparent 70%)`,
      }} />

      {/* Subtle grid */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        backgroundImage: `linear-gradient(${LAVENDER}04 1px, transparent 1px), linear-gradient(90deg, ${LAVENDER}04 1px, transparent 1px)`,
        backgroundSize: `${100 / 12}vw 80px`,
      }} />

      {/* Left coordinate rail */}
      <div className="fixed left-2 top-14 bottom-0 z-40 pointer-events-none hidden md:flex flex-col justify-between py-4">
        {Array.from({ length: 12 }, (_, i) => <Coord key={i} label={String(i).padStart(2, '0')} />)}
      </div>
      {/* Bottom coordinate rail */}
      <div className="fixed bottom-2 left-8 right-8 z-40 pointer-events-none hidden md:flex justify-between">
        {Array.from({ length: 12 }, (_, i) => <Coord key={i} label={String.fromCharCode(65 + i)} />)}
      </div>
      {/* Mouse grid tracker */}
      <div className="fixed bottom-2 right-2 z-40 pointer-events-none hidden md:block">
        <span className="text-[10px] font-mono tabular-nums" style={{ color: `${LAVENDER}50` }}>
          {String.fromCharCode(65 + mouseGrid.col)}{mouseGrid.row}
        </span>
      </div>

      <Nav currentView={view} setView={setView} />

      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

            {/* ── HERO ── */}
            <section className="min-h-screen flex flex-col justify-center px-4 md:px-8 pt-14">
              <div className="max-w-[1400px] mx-auto w-full">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
                  className="flex items-center gap-4 mb-10 text-[11px]" style={{ color: DIM }}>
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: LAVENDER }} />
                  <span>SYS_READY</span><span>·</span><span>ESSEX.UK</span><span>·</span>
                  <span style={{ color: LAVENDER }}>OPEN_FOR_WORK</span>
                </motion.div>

                <div className="grid grid-cols-12 gap-x-4 mb-8">
                  <motion.div className="col-span-12 md:col-span-9"
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
                    <div className="flex items-baseline gap-4 mb-2">
                      <Coord label="A0" />
                      <h1 className="text-[18vw] md:text-[11vw] font-black leading-[0.82] tracking-tighter" style={{ color: BRIGHT }}>SINA</h1>
                    </div>
                    <div className="flex items-baseline gap-4">
                      <Coord label="A1" />
                      <h1 className="text-[18vw] md:text-[11vw] font-black leading-[0.82] tracking-tighter" style={{ color: LAVENDER }}>DILEK</h1>
                    </div>
                  </motion.div>

                  <motion.div className="col-span-12 md:col-span-3 mt-8 md:mt-0 flex items-end"
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                    <div className="w-full border" style={{ borderColor: EDGE, background: PANEL }}>
                      <PanelHeader title="PROFILE" status="v2.0" />
                      <div className="p-3 space-y-3 text-[12px]">
                        {[
                          { k: 'ROLE', v: 'Developer' },
                          { k: 'INST', v: 'Univ. of Essex' },
                          { k: 'YEAR', v: 'Y1 → Y2' },
                          { k: 'SCORE', v: '96 / 100' },
                          { k: 'CLASS', v: 'First' },
                        ].map(d => (
                          <div key={d.k} className="flex justify-between">
                            <span style={{ color: DIM }}>{d.k}</span>
                            <span style={{ color: d.k === 'SCORE' ? LAVENDER : BRIGHT }}>{d.v}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>

                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
                  className="text-sm max-w-lg leading-relaxed mb-10" style={{ color: MID }}>
                  Product-minded developer. I build tools and learn systems. Clean code, clear design, things that work.
                </motion.p>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
                  className="flex flex-wrap gap-3 text-[12px]">
                  <button onClick={() => document.getElementById('projects47')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-5 py-2 font-bold tracking-wider" style={{ background: LAVENDER, color: BG }}>
                    VIEW_WORK
                  </button>
                  <a href="mailto:contact@sinadilek.com" className="px-5 py-2 font-bold tracking-wider border" style={{ borderColor: EDGE, color: MID }}>
                    CONTACT
                  </a>
                  <a href="https://github.com/noxire-dev" target="_blank" rel="noopener" className="px-5 py-2 font-bold tracking-wider border" style={{ borderColor: EDGE, color: MID }}>
                    GITHUB
                  </a>
                </motion.div>
              </div>
            </section>

            <Divider />

            {/* ── EXPERIENCE ── */}
            <section className="px-4 md:px-8 py-16">
              <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-3">
                  <Coord label="B0" />
                  <h2 className="text-2xl font-black mt-2 mb-1">EXPERIENCE</h2>
                  <p className="text-[12px]" style={{ color: DIM }}>Professional work</p>
                </div>
                <div className="col-span-12 md:col-span-9 space-y-4">
                  {experience.map(job => (
                    <ExperienceCard key={job.id} job={job} onClick={() => setView('experience')} />
                  ))}
                </div>
              </div>
            </section>

            <Divider />

            {/* ── STACK / CAPABILITIES ── */}
            <section className="px-4 md:px-8 py-16">
              <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-3">
                  <Coord label="C0" />
                  <h2 className="text-2xl font-black mt-2 mb-1">STACK</h2>
                  <p className="text-[12px]" style={{ color: DIM }}>{capabilities.length} technologies</p>
                </div>
                <div className="col-span-12 md:col-span-9">
                  <div className="border" style={{ borderColor: EDGE, background: PANEL }}>
                    <PanelHeader title="CAPABILITIES" status="RUNTIME" />
                    <div className="p-4 space-y-2">
                      {capabilities.map((cap, i) => (
                        <motion.div key={cap.name} className="group flex items-center gap-3"
                          initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04 }} viewport={{ once: true }}>
                          <span className="w-24 text-[12px] text-right flex-shrink-0 transition-colors"
                            style={{ color: MID }}
                            onMouseEnter={e => (e.currentTarget.style.color = LAVENDER)}
                            onMouseLeave={e => (e.currentTarget.style.color = MID)}>
                            {cap.name}
                          </span>
                          <div className="flex-1 h-5 relative" style={{ background: PANEL_DARK }}>
                            <motion.div className="absolute inset-y-0 left-0"
                              initial={{ width: 0 }} whileInView={{ width: `${cap.pct}%` }}
                              transition={{ delay: i * 0.06, duration: 0.6 }} viewport={{ once: true }}
                              style={{ background: `${LAVENDER}${cap.level === 'PRIMARY' ? 'CC' : cap.level === 'FRAMEWORK' ? '80' : '50'}` }} />
                            <div className="absolute inset-0 flex items-center justify-end pr-2">
                              <span className="text-[10px] font-mono" style={{ color: DIM }}>{cap.pct}</span>
                            </div>
                          </div>
                          <span className="text-[10px] w-24 flex-shrink-0 tracking-wider" style={{ color: DIM }}>{cap.level}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <Divider />

            {/* ── PROJECTS ── */}
            <section id="projects47" className="py-16">
              <div className="max-w-[1400px] mx-auto px-4 md:px-8 mb-6 flex items-center justify-between">
                <div>
                  <Coord label="D0" />
                  <h2 className="text-2xl font-black mt-2">WORK</h2>
                </div>
                <span className="text-[11px]" style={{ color: DIM }}>{projects.length} PROJECTS · SCROLL →</span>
              </div>
              <div ref={scrollRef} className="flex gap-4 overflow-x-auto hide-sb px-4 md:px-8 pb-4 snap-x snap-mandatory">
                {projects.map((project, i) => (
                  <motion.button key={project.id}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                    onClick={() => { setSelectedProject(project.id); setView('project') }}
                    className="group flex-shrink-0 w-[85vw] md:w-[420px] text-left snap-start border transition-colors"
                    style={{ borderColor: EDGE, background: PANEL }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = `${LAVENDER}60`}
                    onMouseLeave={e => e.currentTarget.style.borderColor = EDGE}>
                    <div className="aspect-[16/10] flex items-center justify-center relative" style={{ background: PANEL_DARK }}>
                      <span className="text-[60px] font-black opacity-[0.04]" style={{ color: LAVENDER }}>{project.idx.split('_')[1]}</span>
                      <div className="absolute top-3 right-3 flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full" style={{
                          background: project.status === 'ACTIVE' ? '#4ADE80' : project.status === 'STABLE' ? '#60A5FA' : '#FACC15',
                        }} />
                        <span className="text-[10px]" style={{ color: DIM }}>{project.status}</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px]" style={{ color: LAVENDER }}>{project.idx}</span>
                        <div className="flex gap-1.5">
                          {project.stack.map(t => (
                            <span key={t} className="text-[10px] px-1.5 py-0.5" style={{ background: `${LAVENDER}15`, color: LAVENDER_SOFT }}>{t}</span>
                          ))}
                        </div>
                      </div>
                      <h3 className="text-xl font-black mb-1 transition-colors" style={{ color: BRIGHT }}
                        onMouseEnter={e => (e.currentTarget.style.color = LAVENDER)}
                        onMouseLeave={e => (e.currentTarget.style.color = BRIGHT)}>
                        {project.name}
                      </h3>
                      <p className="text-xs mb-4" style={{ color: MID }}>{project.brief}</p>
                      <span className="text-[11px] font-bold" style={{ color: LAVENDER }}>OPEN_CASE →</span>
                    </div>
                  </motion.button>
                ))}
                <div className="flex-shrink-0 w-[85vw] md:w-[420px] flex items-center justify-center snap-start border border-dashed" style={{ borderColor: EDGE }}>
                  <div className="text-center">
                    <span className="text-[11px] block mb-2" style={{ color: DIM }}>MORE_INCOMING</span>
                    <a href="https://github.com/noxire-dev" target="_blank" rel="noopener" className="text-[12px] font-bold" style={{ color: LAVENDER }}>SEE_ALL →</a>
                  </div>
                </div>
              </div>
            </section>

            <Divider />

            {/* ── LOG / BLOG ── */}
            <section className="px-4 md:px-8 py-16">
              <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-3">
                  <Coord label="E0" />
                  <h2 className="text-2xl font-black mt-2 mb-1">LOG</h2>
                  <button onClick={() => setView('blog')} className="text-[11px] font-bold" style={{ color: LAVENDER }}>VIEW_ALL →</button>
                </div>
                <div className="col-span-12 md:col-span-9 space-y-3">
                  {blogPosts.map((post, i) => (
                    <motion.button key={post.id}
                      initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                      onClick={() => { setSelectedPost(post.id); setView('blog-post') }}
                      className="group w-full text-left border transition-colors" style={{ borderColor: EDGE, background: PANEL }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = `${LAVENDER}50`}
                      onMouseLeave={e => e.currentTarget.style.borderColor = EDGE}>
                      <div className="p-4 flex items-center gap-4">
                        <span className="text-[11px] tabular-nums flex-shrink-0" style={{ color: DIM }}>{post.date}</span>
                        <h3 className="text-sm font-bold flex-1 truncate transition-colors" style={{ color: BRIGHT }}
                          onMouseEnter={e => (e.currentTarget.style.color = LAVENDER)}
                          onMouseLeave={e => (e.currentTarget.style.color = BRIGHT)}>
                          {post.title}
                        </h3>
                        <span className="text-[11px] flex-shrink-0" style={{ color: DIM }}>{post.readTime}</span>
                        <span className="text-sm flex-shrink-0 transition-transform group-hover:translate-x-1" style={{ color: DIM }}>→</span>
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
                  <Coord label="F0" />
                  <h2 className="text-4xl md:text-6xl font-black mt-2 leading-tight">
                    LET'S<br /><span style={{ color: LAVENDER }}>BUILD</span>
                  </h2>
                  <p className="text-sm mt-4 max-w-sm" style={{ color: MID }}>Open to internships, freelance, and collaboration.</p>
                </div>
                <div className="col-span-12 md:col-span-6 flex items-end">
                  <div className="w-full space-y-3">
                    {[
                      { label: 'EMAIL', value: 'contact@sinadilek.com', href: 'mailto:contact@sinadilek.com' },
                      { label: 'GITHUB', value: 'noxire-dev', href: 'https://github.com/noxire-dev' },
                      { label: 'LINKEDIN', value: 'sina-dilek', href: 'https://linkedin.com/in/sina-dilek-0b1b3b1b9' },
                    ].map(link => (
                      <motion.a key={link.label} href={link.href}
                        target={link.label !== 'EMAIL' ? '_blank' : undefined} rel="noopener"
                        whileHover={{ x: 6 }}
                        className="group flex items-center justify-between p-4 border transition-colors"
                        style={{ borderColor: EDGE, background: PANEL }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = `${LAVENDER}60`}
                        onMouseLeave={e => e.currentTarget.style.borderColor = EDGE}>
                        <div>
                          <span className="text-[11px] tracking-[0.18em] block mb-0.5" style={{ color: DIM }}>{link.label}</span>
                          <span className="text-sm" style={{ color: BRIGHT }}>{link.value}</span>
                        </div>
                        <span style={{ color: DIM }}>→</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <footer className="px-4 md:px-8 py-4 border-t" style={{ borderColor: EDGE }}>
              <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-2 text-[10px]" style={{ color: DIM }}>
                <span>© {new Date().getFullYear()} SINA_DILEK</span>
                <div className="flex items-center gap-4">
                  <span>SYSTEM_052</span><span>·</span>
                  <span style={{ color: `${LAVENDER}60` }}>LAVENDER_BRUTALIST</span>
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
          <motion.div key="bp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <BlogPostPage postId={selectedPost} setView={setView} />
          </motion.div>
        )}
        {view === 'experience' && (
          <motion.div key="exp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ExperiencePage job={experience[0]} setView={setView} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
