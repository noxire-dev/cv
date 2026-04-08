import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Design 28: Y2K SWISS BRUTALIST — FROM SCRATCH
// Systematic Swiss grid + Y2K digital optimism + Brutalist raw structure
// Lime #C3FF00 on near-black, pixel grid, data-driven layout
// Full case study + blog system

type View = 'home' | 'project' | 'blog' | 'blog-post'

const LIME = '#C3FF00'
const BG = '#0A0A0A'
const SURFACE = '#111111'
const BORDER = '#1E1E1E'
const TEXT = '#E8E8E8'
const TEXT2 = '#888888'
const MUTED = '#555555'

const projects = [
  {
    id: 'gosh', name: 'GoSH', num: '01', tags: ['Go', 'Systems', 'CLI'],
    impact: 'Built a fully functional shell from scratch — process management, pipes, and I/O redirection.',
    overview: 'GoSH is a minimalist shell implementation demonstrating core systems programming concepts. Built entirely in Go.',
    problem: 'Most developers use shells daily without understanding internals — process forking, signal handling, I/O redirection.',
    strategy: 'Incremental implementation: lexer → parser → executor. Chose Go for clean concurrency and strong stdlib.',
    stack: ['Go', 'Systems Programming'],
    decisions: ['Hand-written lexer', 'Tree-based pipe chains', 'OS-level syscalls', 'Built-in commands'],
    results: 'Handles pipes, redirects, background processes, and built-in commands.',
    reflection: 'Would add job control and improve error messages.',
    year: '2025', link: 'https://github.com/noxire-dev/GoSH',
  },
  {
    id: 'moji', name: 'Moji', num: '02', tags: ['Python', 'Flask', 'SQLite'],
    impact: 'Designed and shipped a full productivity app with focus on clean UI and fast interactions.',
    overview: 'A note-taking and task management app built with Flask. Focused on a polished user experience.',
    problem: 'Existing note apps are bloated. Needed something fast, clean, and opinionated.',
    strategy: 'Prioritized UI/UX over feature count. Designed interface first, then built backend to serve it.',
    stack: ['Python', 'Flask', 'JavaScript', 'SQLite'],
    decisions: ['Server-rendered with JS enhancement', 'SQLite for zero-config', 'Custom markdown parser', 'CSS custom properties'],
    results: 'Clean, fast app under 2MB. Markdown notes, task lists, tags, categories.',
    reflection: 'Would rebuild with React for richer interactions.',
    year: '2025', link: 'https://github.com/noxire-dev/moji',
  },
  {
    id: 'lorekeeper', name: 'LoreKeeper', num: '03', tags: ['Python', 'PostgreSQL', 'Full Stack'],
    impact: 'Architected a community-driven platform for tabletop RPG resources.',
    overview: 'An e-commerce platform for free tabletop RPG materials with community curation.',
    problem: 'TTRPG resources are scattered across forums, Discord, and random blogs. No central hub.',
    strategy: 'Marketplace-style platform without payment — focused on discovery, ratings, and community.',
    stack: ['Python', 'PostgreSQL', 'JavaScript'],
    decisions: ['PostgreSQL for full-text search', 'Session-based auth', 'File upload validation', 'Rating system'],
    results: 'Functional platform with user accounts, resource library, ratings, and PDF viewer.',
    reflection: 'Would add API layer for future mobile app.',
    year: '2025', link: 'https://github.com/noxire-dev/LoreKeeper',
  },
]

const blogPosts = [
  {
    id: 'v2-rebuild', title: 'Rebuilding My Portfolio', date: '2025-11-19', readTime: '3 min',
    excerpt: 'Why I scrapped everything and started over with React, TypeScript, and a new design philosophy.',
    content: `When I first started this project 3 years ago, I used Flask and some questionable design choices. Knowing only Python at the time, Flask felt magical.\n\nI've since learned a lot — new languages, new frameworks, new design thinking. It was time for a clean slate.\n\nThe new stack: React, TypeScript, Tailwind CSS, Vite. The new goal: a portfolio that communicates value in under 10 seconds.`,
    tags: ['dev', 'design'],
  },
  {
    id: 'first-year', title: 'First Year: 96/100', date: '2025-08-28', readTime: '2 min',
    excerpt: 'Finished my first year at Essex with First Class Honours.',
    content: `I finished my first year at the University of Essex — 96/100 overall, First Class Honours.\n\nThe biggest lesson wasn't technical. It was learning how to break complex problems into smaller pieces and manage time across multiple projects.\n\nSecond year starts with a clearer sense of what I want to build.`,
    tags: ['uni', 'growth'],
  },
  {
    id: 'learning-c', title: 'Why I Started Learning C', date: '2025-02-23', readTime: '2 min',
    excerpt: 'Not to master it — but to understand everything built on top of it.',
    content: `I started learning C not to become a C developer, but to understand how higher-level languages work.\n\nWhen you implement your own string functions, your own linked list — suddenly C++, Rust, and Go make so much more sense.\n\nDebugging segfaults is not fun. But every hour in C makes me better in every other language.`,
    tags: ['learning', 'systems'],
  },
]

const skills = ['Python', 'Go', 'Java', 'JavaScript', 'TypeScript', 'C', 'React', 'Flask']

function PixelCorner({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const pos = {
    tl: 'top-0 left-0',
    tr: 'top-0 right-0',
    bl: 'bottom-0 left-0',
    br: 'bottom-0 right-0',
  }[position]
  return <div className={`absolute ${pos} w-2 h-2`} style={{ background: LIME }} />
}

function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-4 mb-12">
      <span className="text-xs font-mono" style={{ color: LIME }}>{num}</span>
      <div className="w-8 h-px" style={{ background: BORDER }} />
      <span className="text-xs tracking-[0.25em] font-medium" style={{ color: MUTED }}>{label}</span>
    </div>
  )
}

function Nav({ currentView, setView }: { currentView: View; setView: (v: View) => void }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300" style={{
      background: scrolled ? `${BG}ee` : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? `1px solid ${BORDER}` : '1px solid transparent',
    }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
        <button onClick={() => setView('home')} className="group flex items-center gap-2">
          <div className="w-6 h-6 flex items-center justify-center text-[10px] font-black" style={{ background: LIME, color: BG }}>
            SD
          </div>
        </button>
        <div className="flex items-center gap-6 text-xs tracking-widest">
          <button onClick={() => setView('home')} style={{ color: currentView === 'home' ? LIME : MUTED }}>WORK</button>
          <button onClick={() => setView('blog')} style={{ color: currentView === 'blog' || currentView === 'blog-post' ? LIME : MUTED }}>BLOG</button>
          <a href="mailto:contact@sinadilek.com" className="px-3 py-1" style={{ background: LIME, color: BG, fontWeight: 700 }}>CONTACT</a>
          <Link to="/" style={{ color: MUTED }}>←</Link>
        </div>
      </div>
    </nav>
  )
}

function ProjectPage({ projectId, setView }: { projectId: string; setView: (v: View) => void }) {
  const p = projects.find(x => x.id === projectId) || projects[0]
  const Section = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="mb-14">
      <span className="text-[10px] tracking-[0.3em] block mb-4" style={{ color: LIME }}>{label}</span>
      {children}
    </div>
  )

  return (
    <div className="pt-24 pb-24 min-h-screen" style={{ background: BG }}>
      <div className="max-w-[720px] mx-auto px-6 md:px-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <button onClick={() => setView('home')} className="text-xs mb-12 flex items-center gap-2" style={{ color: MUTED }}>
            <span style={{ color: LIME }}>←</span> BACK
          </button>

          <div className="flex flex-wrap gap-2 mb-4">
            {p.tags.map(t => <span key={t} className="text-[10px] px-2 py-0.5 tracking-wider" style={{ background: SURFACE, color: TEXT2 }}>{t}</span>)}
          </div>
          <h1 className="text-5xl font-black mb-3" style={{ color: TEXT }}>{p.name}</h1>
          <p className="text-base mb-10" style={{ color: TEXT2, lineHeight: 1.7 }}>{p.impact}</p>

          <div className="aspect-video mb-14 flex items-center justify-center relative" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
            <PixelCorner position="tl" /><PixelCorner position="tr" /><PixelCorner position="bl" /><PixelCorner position="br" />
            <span className="text-xs" style={{ color: MUTED }}>[ SCREENSHOT ]</span>
          </div>

          <Section label="OVERVIEW"><p style={{ color: TEXT2, lineHeight: 1.8 }}>{p.overview}</p></Section>
          <Section label="PROBLEM"><p style={{ color: TEXT2, lineHeight: 1.8 }}>{p.problem}</p></Section>
          <Section label="STRATEGY"><p style={{ color: TEXT2, lineHeight: 1.8 }}>{p.strategy}</p></Section>
          <Section label="IMPLEMENTATION">
            <div className="flex flex-wrap gap-2 mb-5">
              {p.stack.map(t => <span key={t} className="text-xs px-3 py-1 font-bold" style={{ background: LIME, color: BG }}>{t}</span>)}
            </div>
            <ul className="space-y-3">
              {p.decisions.map((d, i) => (
                <li key={i} className="flex items-start gap-3 text-sm" style={{ color: TEXT2 }}>
                  <span className="font-mono text-[10px] mt-1" style={{ color: LIME }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ lineHeight: 1.7 }}>{d}</span>
                </li>
              ))}
            </ul>
          </Section>
          <Section label="RESULTS"><p style={{ color: TEXT2, lineHeight: 1.8 }}>{p.results}</p></Section>
          <Section label="REFLECTION"><p style={{ color: TEXT2, lineHeight: 1.8 }}>{p.reflection}</p></Section>

          <a href={p.link} target="_blank" rel="noopener" className="text-sm font-bold" style={{ color: LIME }}>View on GitHub →</a>
        </motion.div>
      </div>
    </div>
  )
}

function BlogListPage({ setView, setSelectedPost }: { setView: (v: View) => void; setSelectedPost: (s: string) => void }) {
  return (
    <div className="pt-24 pb-24 min-h-screen" style={{ background: BG }}>
      <div className="max-w-[720px] mx-auto px-6 md:px-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-black mb-10" style={{ color: TEXT }}>Blog</h1>
          <div className="space-y-2">
            {blogPosts.map((post, i) => (
              <motion.button key={post.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                onClick={() => { setSelectedPost(post.id); setView('blog-post') }}
                className="group w-full text-left p-5 transition-colors" style={{ background: SURFACE }}
                onMouseEnter={e => { e.currentTarget.style.background = '#161616' }}
                onMouseLeave={e => { e.currentTarget.style.background = SURFACE }}
              >
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[10px]" style={{ color: MUTED }}>{post.date}</span>
                  <span className="text-[10px]" style={{ color: MUTED }}>·</span>
                  <span className="text-[10px]" style={{ color: MUTED }}>{post.readTime}</span>
                </div>
                <h2 className="text-base font-bold mb-1 transition-colors" style={{ color: TEXT }}>{post.title}</h2>
                <p className="text-sm" style={{ color: TEXT2 }}>{post.excerpt}</p>
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
    <div className="pt-24 pb-24 min-h-screen" style={{ background: BG }}>
      <div className="max-w-[620px] mx-auto px-6 md:px-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <button onClick={() => setView('blog')} className="text-xs mb-10 flex items-center gap-2" style={{ color: MUTED }}>
            <span style={{ color: LIME }}>←</span> Blog
          </button>
          <time className="text-xs" style={{ color: MUTED }}>{post.date} · {post.readTime}</time>
          <h1 className="text-3xl font-black mt-2 mb-4" style={{ color: TEXT }}>{post.title}</h1>
          <div className="flex gap-2 mb-10">
            {post.tags.map(t => <span key={t} className="text-[10px] px-2 py-0.5" style={{ background: SURFACE, color: TEXT2 }}>#{t}</span>)}
          </div>
          <div className="space-y-5">
            {post.content.split('\n\n').map((p, i) => <p key={i} className="text-base" style={{ color: TEXT2, lineHeight: 1.8 }}>{p}</p>)}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function Design28() {
  const [view, setView] = useState<View>('home')
  const [selectedProject, setSelectedProject] = useState('gosh')
  const [selectedPost, setSelectedPost] = useState('v2-rebuild')
  const [time, setTime] = useState(new Date())
  useEffect(() => { const i = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(i) }, [])

  return (
    <div className="min-h-screen" style={{ background: BG, color: TEXT }}>
      <style>{`
        ::selection { background: ${LIME}; color: ${BG}; }
        @keyframes scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }
      `}</style>

      {/* Grid background */}
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(${LIME}06 1px, transparent 1px), linear-gradient(90deg, ${LIME}06 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
      }} />

      {/* Scan line */}
      <div className="fixed inset-0 pointer-events-none z-[90] overflow-hidden">
        <div className="w-full h-px opacity-10" style={{ background: LIME, animation: 'scan 4s linear infinite' }} />
      </div>

      <Nav currentView={view} setView={setView} />

      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

            {/* HERO */}
            <section className="min-h-screen flex items-center px-6 md:px-10">
              <div className="max-w-[1200px] mx-auto w-full">
                <div className="grid md:grid-cols-12 gap-8">
                  <div className="md:col-span-8">
                    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                      {/* Status */}
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: LIME }} />
                        <span className="text-[10px] tracking-[0.3em]" style={{ color: MUTED }}>AVAILABLE FOR WORK</span>
                      </div>

                      {/* Name */}
                      <h1 className="font-black tracking-tighter leading-[0.88]" style={{ fontSize: 'clamp(56px, 10vw, 120px)' }}>
                        <span className="block" style={{ color: TEXT }}>SINA</span>
                        <span className="block" style={{ color: LIME }}>DILEK</span>
                      </h1>

                      {/* Tagline */}
                      <p className="mt-8 text-base max-w-md" style={{ color: TEXT2, lineHeight: 1.7 }}>
                        Product-minded developer. I design and build web experiences that are fast, clear, and intentional.
                      </p>

                      {/* CTAs */}
                      <div className="flex flex-wrap gap-3 mt-8">
                        <button onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                          className="px-6 py-2.5 text-xs tracking-wider font-bold" style={{ background: LIME, color: BG }}>
                          VIEW WORK
                        </button>
                        <a href="mailto:contact@sinadilek.com" className="px-6 py-2.5 text-xs tracking-wider font-bold border"
                          style={{ borderColor: BORDER, color: TEXT2 }}>
                          CONTACT
                        </a>
                      </div>
                    </motion.div>
                  </div>

                  {/* Right side data panel */}
                  <div className="md:col-span-4">
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
                      className="p-6 relative" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
                      <PixelCorner position="tl" /><PixelCorner position="tr" /><PixelCorner position="bl" /><PixelCorner position="br" />

                      <div className="space-y-5 text-xs">
                        <div>
                          <span className="tracking-[0.2em] block mb-1" style={{ color: MUTED }}>SYS.TIME</span>
                          <span className="font-mono text-sm tabular-nums" style={{ color: LIME }}>{time.toLocaleTimeString()}</span>
                        </div>
                        <div>
                          <span className="tracking-[0.2em] block mb-1" style={{ color: MUTED }}>INSTITUTION</span>
                          <span style={{ color: TEXT }}>University of Essex</span>
                        </div>
                        <div>
                          <span className="tracking-[0.2em] block mb-1" style={{ color: MUTED }}>RESULT</span>
                          <span className="font-bold" style={{ color: LIME }}>96/100 — First Class</span>
                        </div>
                        <div>
                          <span className="tracking-[0.2em] block mb-1" style={{ color: MUTED }}>FOCUS</span>
                          <span style={{ color: TEXT }}>Frontend · Systems · Design</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>

            {/* SKILLS STRIP */}
            <section className="overflow-hidden py-6 border-y" style={{ borderColor: BORDER }}>
              <motion.div animate={{ x: '-50%' }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} className="flex whitespace-nowrap">
                {[...skills, ...skills, ...skills].map((s, i) => (
                  <span key={i} className="text-4xl md:text-5xl font-black mx-6" style={{ color: `${LIME}12` }}>
                    {s}<span className="mx-6" style={{ color: `${LIME}30` }}>×</span>
                  </span>
                ))}
              </motion.div>
            </section>

            {/* PROJECTS */}
            <section id="work" className="px-6 md:px-10 py-24">
              <div className="max-w-[1200px] mx-auto">
                <SectionLabel num="01" label="FEATURED WORK" />

                <div className="space-y-4">
                  {projects.map((project, i) => (
                    <motion.button key={project.id}
                      initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                      onClick={() => { setSelectedProject(project.id); setView('project') }}
                      className="group w-full text-left relative overflow-hidden transition-colors"
                      style={{ background: SURFACE, border: `1px solid ${BORDER}` }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = LIME }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER }}
                    >
                      <PixelCorner position="tl" /><PixelCorner position="tr" /><PixelCorner position="bl" /><PixelCorner position="br" />
                      <div className="grid md:grid-cols-[1fr,1.2fr]">
                        <div className="aspect-video md:aspect-auto flex items-center justify-center" style={{ background: '#0E0E0E' }}>
                          <span className="text-xs" style={{ color: MUTED }}>[ PREVIEW ]</span>
                        </div>
                        <div className="p-6 md:p-8">
                          <div className="flex flex-wrap gap-2 mb-3">
                            {project.tags.map(t => (
                              <span key={t} className="text-[10px] px-2 py-0.5 tracking-wider" style={{ background: `${LIME}10`, color: LIME }}>
                                {t}
                              </span>
                            ))}
                          </div>
                          <h3 className="text-2xl font-black mb-2 transition-colors" style={{ color: TEXT }}>
                            {project.name}
                          </h3>
                          <p className="text-sm mb-4" style={{ color: TEXT2, lineHeight: 1.6 }}>{project.impact}</p>
                          <span className="text-xs font-bold" style={{ color: LIME }}>VIEW CASE STUDY →</span>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </section>

            {/* ABOUT */}
            <section className="px-6 md:px-10 py-24" style={{ background: SURFACE }}>
              <div className="max-w-[1200px] mx-auto">
                <SectionLabel num="02" label="ABOUT" />
                <div className="grid md:grid-cols-2 gap-14">
                  <div>
                    <h2 className="text-3xl font-black mb-5" style={{ color: TEXT, lineHeight: 1.15 }}>
                      I care about how things
                      <span style={{ color: LIME }}> work</span> and
                      how they<span style={{ color: LIME }}> feel</span>.
                    </h2>
                    <p className="text-base" style={{ color: TEXT2, lineHeight: 1.8 }}>
                      CS student at Essex. I build tools, explore systems programming, and think about design
                      as a way to solve problems. Currently working across Python, Go, TypeScript, Java, and C.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {skills.map((s, i) => (
                      <motion.div key={s} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.04 }} viewport={{ once: true }}
                        className="p-4 text-center text-sm font-bold transition-colors cursor-default"
                        style={{ background: BG, border: `1px solid ${BORDER}`, color: TEXT2 }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = LIME; e.currentTarget.style.color = LIME }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = TEXT2 }}
                      >
                        {s}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* BLOG PREVIEW */}
            <section className="px-6 md:px-10 py-24">
              <div className="max-w-[1200px] mx-auto">
                <div className="flex items-center justify-between mb-12">
                  <SectionLabel num="03" label="WRITING" />
                  <button onClick={() => setView('blog')} className="text-xs font-bold" style={{ color: LIME }}>VIEW ALL →</button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {blogPosts.slice(0, 2).map((post, i) => (
                    <motion.button key={post.id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                      onClick={() => { setSelectedPost(post.id); setView('blog-post') }}
                      className="group text-left p-5 transition-colors relative"
                      style={{ background: SURFACE, border: `1px solid ${BORDER}` }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = LIME }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER }}
                    >
                      <PixelCorner position="tl" /><PixelCorner position="tr" />
                      <span className="text-[10px]" style={{ color: MUTED }}>{post.date} · {post.readTime}</span>
                      <h3 className="text-base font-bold mt-1 mb-1 transition-colors" style={{ color: TEXT }}>{post.title}</h3>
                      <p className="text-sm" style={{ color: TEXT2 }}>{post.excerpt}</p>
                    </motion.button>
                  ))}
                </div>
              </div>
            </section>

            {/* CONTACT */}
            <section className="px-6 md:px-10 py-28">
              <div className="max-w-[1200px] mx-auto text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <span className="text-[10px] tracking-[0.3em] block mb-4" style={{ color: LIME }}>04 / CONNECT</span>
                  <h2 className="font-black mb-4" style={{ fontSize: 'clamp(32px, 5vw, 56px)', color: TEXT, lineHeight: 1.1 }}>
                    Got a project in mind?
                  </h2>
                  <p className="text-base mb-8 max-w-md mx-auto" style={{ color: TEXT2 }}>
                    Open to internships, freelance, and collaboration.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <a href="mailto:contact@sinadilek.com" className="px-7 py-3 text-xs tracking-wider font-bold"
                      style={{ background: LIME, color: BG }}>SEND EMAIL</a>
                    <a href="https://github.com/noxire-dev" target="_blank" rel="noopener"
                      className="px-7 py-3 text-xs tracking-wider font-bold border" style={{ borderColor: BORDER, color: TEXT2 }}>GITHUB</a>
                    <a href="https://linkedin.com/in/sina-dilek-0b1b3b1b9" target="_blank" rel="noopener"
                      className="px-7 py-3 text-xs tracking-wider font-bold border" style={{ borderColor: BORDER, color: TEXT2 }}>LINKEDIN</a>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* FOOTER */}
            <footer className="px-6 md:px-10 py-6" style={{ borderTop: `1px solid ${BORDER}` }}>
              <div className="max-w-[1200px] mx-auto flex justify-between items-center text-[10px] tracking-widest" style={{ color: MUTED }}>
                <span>© {new Date().getFullYear()} SINA DILEK</span>
                <span style={{ color: `${LIME}40` }}>Y2K SWISS BRUTALIST</span>
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
