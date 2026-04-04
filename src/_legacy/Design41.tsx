import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

// Design 41: NEON FLORA — Hot pink punk glitch
// Aggressive, loud, raw. Hot pink #FF2D8A on pitch black.
// Punk zine energy + glitch noir + kinetic scroll.
// Marquee text, diagonal slashes, massive type, mouse-reactive gradient.
// Full system with project + blog pages.

type View = 'home' | 'project' | 'blog' | 'blog-post'

const PINK = '#FF2D8A'
const PINK_DIM = '#CC2470'
const BG = '#0A0A0A'
const SURFACE = '#111114'
const BORDER = '#1A1A20'
const TEXT = '#F0E8F0'
const MUTED = '#6A5A6A'

const projects = [
  { id: 'gosh', name: 'GoSH', num: '01', tags: ['Go', 'Systems'], impact: 'Shell from scratch — pipes, redirects, process management.', overview: 'Lexer → parser → executor, all in Go. Systems programming deep dive.', problem: 'Shells are black boxes. I opened the box.', approach: 'Go for concurrency. Hand-written tokenizer for full control.', year: '2025', link: 'https://github.com/noxire-dev/GoSH', features: ['Pipe chains', 'I/O redirection', 'Process spawning', 'Built-in cmds'] },
  { id: 'moji', name: 'Moji', num: '02', tags: ['Python', 'Flask'], impact: 'Productivity app. UI-first, fast, opinionated.', overview: 'Notes + tasks with Flask. Every interaction instant.', problem: 'Every note app is bloated. I built the opposite.', approach: 'Designed the UI. Built the backend to serve it.', year: '2025', link: 'https://github.com/noxire-dev/moji', features: ['Markdown notes', 'Task lists', 'Tags', 'Dark mode'] },
  { id: 'lorekeeper', name: 'LoreKeeper', num: '03', tags: ['Python', 'PostgreSQL'], impact: 'Community TTRPG resource platform.', overview: 'E-commerce for free tabletop RPG materials.', problem: 'TTRPG content is everywhere except one good place.', approach: 'Marketplace without payments. Community curation.', year: '2025', link: 'https://github.com/noxire-dev/LoreKeeper', features: ['User accounts', 'Search', 'Ratings', 'PDF viewer'] },
  { id: 'midnight', name: 'Midnight Moon', num: '04', tags: ['Design'], impact: 'VS Code themes that don\'t hurt your eyes.', overview: 'Multiple variants. Semantic highlighting. Full theming.', problem: 'Dark themes ≠ good themes. Most are wrong.', approach: 'Color science. Contrast ratios. Weeks of iteration.', year: '2024', link: 'https://github.com/noxire-dev/midnight-theme', features: ['Variants', 'Semantic tokens', 'Terminal', 'UI theming'] },
]

const blogPosts = [
  { id: 'v2-rebuild', title: 'SCRAPPED EVERYTHING', date: 'NOV 2025', readTime: '3m', excerpt: 'Rebuilt from scratch. React + TypeScript + new brain.', content: '3 years ago, Flask was magic. Now it\'s history.\n\nNew stack: React, TypeScript, Tailwind, Vite.\n\nEvery pixel is intentional. Every decision is earned.', tags: ['DEV'] },
  { id: 'first-year', title: '96 OUT OF 100', date: 'AUG 2025', readTime: '2m', excerpt: 'First Class. University of Essex. Year one done.', content: 'Essex, year one — 96/100. First Class Honours.\n\nBiggest lesson: decomposition. Break it down. Ship it.\n\nYear two begins with fire.', tags: ['EDU'] },
  { id: 'learning-c', title: 'C IS PAIN', date: 'FEB 2025', readTime: '2m', excerpt: 'Segfaults. Manual memory. Understanding everything.', content: 'Started C to understand how everything works underneath.\n\nMy own malloc. My own linked list. Pure clarity through suffering.\n\nEvery hour in C makes every other language easier.', tags: ['SYS'] },
]

const skills = ['PYTHON', 'GO', 'JAVA', 'JAVASCRIPT', 'TYPESCRIPT', 'C', 'REACT', 'FLASK']

function GlitchText({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [glitch, setGlitch] = useState(false)
  return (
    <motion.span
      className={`relative inline-block ${className}`}
      onViewportEnter={() => { setGlitch(true); setTimeout(() => setGlitch(false), 300) }}
    >
      {glitch && (
        <>
          <span className="absolute inset-0 text-cyan-400 translate-x-[2px] opacity-70">{children}</span>
          <span className="absolute inset-0 translate-x-[-2px] opacity-70" style={{ color: PINK }}>{children}</span>
        </>
      )}
      {children}
    </motion.span>
  )
}

function Nav({ currentView, setView }: { currentView: View; setView: (v: View) => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b mix-blend-difference" style={{ borderColor: `${PINK}30` }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
        <button onClick={() => setView('home')} className="text-2xl font-black" style={{ color: PINK }}>SD</button>
        <div className="flex items-center gap-6 text-xs font-black tracking-widest text-white uppercase">
          <button onClick={() => setView('home')} style={{ color: currentView === 'home' ? PINK : 'inherit' }}>WORK</button>
          <button onClick={() => setView('blog')} style={{ color: (currentView === 'blog' || currentView === 'blog-post') ? PINK : 'inherit' }}>BLOG</button>
          <Link to="/" className="opacity-50">EXIT</Link>
        </div>
      </div>
    </nav>
  )
}

function ProjectPage({ projectId, setView }: { projectId: string; setView: (v: View) => void }) {
  const p = projects.find(x => x.id === projectId) || projects[0]
  return (
    <div className="pt-24 min-h-screen font-mono" style={{ background: BG }}>
      <div className="max-w-3xl mx-auto px-6 md:px-12 pb-24">
        <button onClick={() => setView('home')} className="text-xs font-bold mb-10 tracking-widest" style={{ color: MUTED }}><span style={{ color: PINK }}>←</span> BACK</button>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-8xl font-black" style={{ color: PINK, opacity: 0.15 }}>{p.num}</span>
          <h1 className="text-5xl font-black -mt-6 mb-2 uppercase tracking-tight" style={{ color: TEXT }}>{p.name}</h1>
          <div className="flex gap-2 mb-8">{p.tags.map(t => <span key={t} className="text-[10px] px-2 py-1 font-bold tracking-widest" style={{ background: PINK, color: BG }}>{t}</span>)}</div>
          <div className="aspect-video mb-10 flex items-center justify-center border-2" style={{ borderColor: BORDER, background: SURFACE }}>
            <span className="text-sm font-bold tracking-widest" style={{ color: MUTED }}>[ SCREENSHOT ]</span>
          </div>
          {[{ l: 'IMPACT', t: p.impact }, { l: 'OVERVIEW', t: p.overview }, { l: 'PROBLEM', t: p.problem }, { l: 'APPROACH', t: p.approach }].map(s => (
            <div key={s.l} className="mb-6 border-l-4 pl-4" style={{ borderColor: PINK }}>
              <span className="text-[10px] tracking-[0.3em] font-bold block mb-1" style={{ color: PINK }}>{s.l}</span>
              <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{s.t}</p>
            </div>
          ))}
          <div className="mt-8 space-y-1">{p.features.map((f, i) => <div key={f} className="flex gap-3 text-sm"><span style={{ color: PINK }}>→</span><span style={{ color: MUTED }}>{f}</span></div>)}</div>
          <a href={p.link} target="_blank" rel="noopener" className="inline-block mt-8 px-6 py-3 text-sm font-black tracking-widest" style={{ background: PINK, color: BG }}>GITHUB →</a>
        </motion.div>
      </div>
    </div>
  )
}

function BlogPage({ setView, setPost }: { setView: (v: View) => void; setPost: (s: string) => void }) {
  return (
    <div className="pt-24 min-h-screen font-mono" style={{ background: BG }}>
      <div className="max-w-3xl mx-auto px-6 md:px-12 pb-24">
        <h2 className="text-5xl font-black uppercase mb-12" style={{ color: TEXT }}>BLOG</h2>
        {blogPosts.map((post, i) => (
          <motion.button key={post.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
            onClick={() => { setPost(post.id); setView('blog-post') }}
            className="group w-full text-left py-8 border-b-2 transition-colors" style={{ borderColor: BORDER }}
            onMouseEnter={e => e.currentTarget.style.borderColor = PINK} onMouseLeave={e => e.currentTarget.style.borderColor = BORDER}>
            <span className="text-xs font-bold" style={{ color: MUTED }}>{post.date} · {post.readTime}</span>
            <h3 className="text-2xl font-black uppercase mt-2 group-hover:text-[#FF2D8A] transition-colors">{post.title}</h3>
            <p className="text-sm mt-1" style={{ color: MUTED }}>{post.excerpt}</p>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

function BlogPostPage({ postId, setView }: { postId: string; setView: (v: View) => void }) {
  const post = blogPosts.find(p => p.id === postId) || blogPosts[0]
  return (
    <div className="pt-24 min-h-screen font-mono" style={{ background: BG }}>
      <div className="max-w-2xl mx-auto px-6 md:px-12 pb-24">
        <button onClick={() => setView('blog')} className="text-xs font-bold mb-8 tracking-widest" style={{ color: MUTED }}><span style={{ color: PINK }}>←</span> BLOG</button>
        <motion.article initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <span className="text-xs font-bold" style={{ color: MUTED }}>{post.date} · {post.readTime}</span>
          <h1 className="text-3xl font-black uppercase mt-2 mb-8">{post.title}</h1>
          {post.content.split('\n\n').map((p, i) => <p key={i} className="text-sm leading-relaxed mb-4" style={{ color: MUTED }}>{p}</p>)}
        </motion.article>
      </div>
    </div>
  )
}

export default function Design41() {
  const [view, setView] = useState<View>('home')
  const [selectedProject, setSelectedProject] = useState('gosh')
  const [selectedPost, setSelectedPost] = useState('v2-rebuild')
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll()
  const marqueeX = useTransform(scrollYProgress, [0, 1], [0, -500])

  useEffect(() => {
    const h = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', h)
    return () => window.removeEventListener('mousemove', h)
  }, [])

  const gradX = typeof window !== 'undefined' ? (mousePos.x / window.innerWidth) * 100 : 50
  const gradY = typeof window !== 'undefined' ? (mousePos.y / window.innerHeight) * 100 : 50

  return (
    <div className="min-h-screen font-mono" style={{ background: BG, color: TEXT }}>
      <style>{`::selection { background: ${PINK}; color: ${BG}; }`}</style>

      {/* Mouse-reactive background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0" style={{ background: BG }} />
        <div className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[120px] transition-all duration-1000" style={{ background: `radial-gradient(circle, ${PINK}40, transparent 70%)`, left: `calc(${gradX}% - 300px)`, top: `calc(${gradY}% - 300px)` }} />
        <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        <div className="absolute top-0 left-0 w-1 h-full" style={{ background: `linear-gradient(to bottom, ${PINK}, ${PINK}50, transparent)` }} />
      </div>

      <Nav currentView={view} setView={setView} />

      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Hero — loud and aggressive */}
            <section className="min-h-screen relative flex flex-col justify-center px-6 md:px-12 z-10">
              <div className="max-w-7xl mx-auto w-full">
                <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-px flex-1" style={{ background: PINK }} />
                    <span className="text-xs font-black tracking-widest" style={{ color: PINK }}>AVAILABLE FOR WORK</span>
                    <div className="h-px flex-1" style={{ background: PINK }} />
                  </div>

                  <h1 className="text-[18vw] md:text-[14vw] font-black leading-[0.8] tracking-tighter uppercase">
                    <GlitchText><span className="block">SINA</span></GlitchText>
                    <GlitchText><span className="block" style={{ color: PINK }}>DILEK</span></GlitchText>
                  </h1>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <span className="px-4 py-2 text-xs font-black tracking-widest" style={{ background: PINK, color: BG }}>96/100 FIRST CLASS</span>
                    <span className="px-4 py-2 text-xs font-black tracking-widest border-2" style={{ borderColor: PINK, color: PINK }}>UNIVERSITY OF ESSEX</span>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Skills — scrolling marquee */}
            <section className="relative z-10 py-16 overflow-hidden border-y-2" style={{ borderColor: BORDER }}>
              <motion.div style={{ x: marqueeX }} className="flex whitespace-nowrap gap-12">
                {[...skills, ...skills, ...skills, ...skills].map((s, i) => (
                  <span key={i} className="text-5xl md:text-7xl font-black uppercase" style={{ color: i % 2 === 0 ? `${TEXT}15` : `${PINK}30` }}>{s}</span>
                ))}
              </motion.div>
            </section>

            {/* Projects — punk rows */}
            <section className="relative z-10 py-24 px-6 md:px-12">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-5xl md:text-7xl font-black uppercase mb-16">
                  <span style={{ color: PINK }}>SELECTED</span> WORK
                </h2>
                {projects.map((p, i) => (
                  <motion.button key={p.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}
                    onClick={() => { setSelectedProject(p.id); setView('project') }}
                    className="group w-full text-left py-10 border-b-2 flex flex-col md:flex-row justify-between items-start md:items-center transition-colors" style={{ borderColor: BORDER }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = PINK} onMouseLeave={e => e.currentTarget.style.borderColor = BORDER}>
                    <div>
                      <div className="flex gap-2 mb-3">{p.tags.map(t => <span key={t} className="text-[10px] font-bold tracking-widest" style={{ color: PINK }}>{t}</span>)}</div>
                      <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tight group-hover:text-[#FF2D8A] group-hover:translate-x-4 transition-all">{p.name}</h3>
                      <p className="text-sm mt-2" style={{ color: MUTED }}>{p.impact}</p>
                    </div>
                    <div className="flex items-center gap-6 mt-4 md:mt-0">
                      <span className="text-2xl font-black" style={{ color: MUTED }}>{p.year}</span>
                      <div className="w-14 h-14 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all font-black text-xl" style={{ background: PINK, color: BG }}>→</div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </section>

            {/* Blog teaser */}
            <section className="relative z-10 py-24 px-6 md:px-12" style={{ background: SURFACE }}>
              <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                  <h2 className="text-4xl font-black uppercase">BLOG</h2>
                  <button onClick={() => setView('blog')} className="text-sm font-black tracking-widest" style={{ color: PINK }}>ALL →</button>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  {blogPosts.map((post, i) => (
                    <motion.button key={post.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                      onClick={() => { setSelectedPost(post.id); setView('blog-post') }}
                      className="group text-left p-6 border-2 transition-colors" style={{ borderColor: BORDER, background: BG }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = PINK} onMouseLeave={e => e.currentTarget.style.borderColor = BORDER}>
                      <span className="text-[10px] font-bold" style={{ color: MUTED }}>{post.date}</span>
                      <h3 className="text-lg font-black uppercase mt-2 mb-2 group-hover:text-[#FF2D8A] transition-colors">{post.title}</h3>
                      <p className="text-xs" style={{ color: MUTED }}>{post.excerpt}</p>
                    </motion.button>
                  ))}
                </div>
              </div>
            </section>

            {/* Footer — inverted */}
            <footer className="relative z-10 py-24 px-6 md:px-12" style={{ background: PINK, color: BG }}>
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                <h2 className="text-[12vw] md:text-[8vw] font-black tracking-tighter leading-[0.8] uppercase">LET'S<br />GO.</h2>
                <div className="flex flex-col gap-4 text-lg font-black uppercase">
                  <a href="mailto:contact@sinadilek.com" className="border-b-4 pb-1 hover:opacity-70 transition-opacity" style={{ borderColor: BG }}>contact@sinadilek.com</a>
                  <div className="flex gap-4">
                    <a href="https://github.com/noxire-dev" target="_blank" rel="noopener" className="px-6 py-3 border-4 text-sm hover:bg-[#0A0A0A] hover:text-[#FF2D8A] transition-colors" style={{ borderColor: BG }}>GITHUB</a>
                    <a href="https://linkedin.com/in/sina-dilek-0b1b3b1b9" target="_blank" rel="noopener" className="px-6 py-3 border-4 text-sm hover:bg-[#0A0A0A] hover:text-[#FF2D8A] transition-colors" style={{ borderColor: BG }}>LINKEDIN</a>
                  </div>
                </div>
              </div>
              <div className="mt-16 pt-4 border-t-4 flex justify-between text-sm font-black" style={{ borderColor: BG }}>
                <span>© {new Date().getFullYear()} SINA DILEK</span>
                <span>NEON FLORA</span>
              </div>
            </footer>
          </motion.div>
        )}
        {view === 'project' && <motion.div key="p" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><ProjectPage projectId={selectedProject} setView={setView} /></motion.div>}
        {view === 'blog' && <motion.div key="b" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><BlogPage setView={setView} setPost={setSelectedPost} /></motion.div>}
        {view === 'blog-post' && <motion.div key="bp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><BlogPostPage postId={selectedPost} setView={setView} /></motion.div>}
      </AnimatePresence>
    </div>
  )
}
