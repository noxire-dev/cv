import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Design 31: Y2K MASTERPIECE — from Design 15
// Design 15's DNA: Dark atmosphere, mouse gradient, glitch text, live clock, skill bars, corner accents, sticky hero
// Re-themed: Lime #C3FF00 on dark, Y2K digital atmosphere

type View = 'home' | 'project' | 'blog' | 'blog-post'
const LIME = '#C3FF00'
const BG = '#0A0A0C'

const projects = [
  { id: 'gosh', name: 'GoSH', desc: 'Shell implementation', tech: 'Go', num: '01', impact: 'Built a shell from scratch with process management and I/O piping.', year: '2025', link: 'https://github.com/noxire-dev/GoSH', features: ['Command parsing', 'Process spawning', 'I/O redirection', 'Built-in commands'] },
  { id: 'moji', name: 'Moji', desc: 'Productivity suite', tech: 'Python/Flask', num: '02', impact: 'Shipped a productivity app focused on clean UI.', year: '2025', link: 'https://github.com/noxire-dev/moji', features: ['Rich text notes', 'Task management', 'Tags & categories', 'Dark mode'] },
  { id: 'lorekeeper', name: 'LoreKeeper', desc: 'RPG platform', tech: 'Full Stack', num: '03', impact: 'Community-driven platform for tabletop RPG resources.', year: '2025', link: 'https://github.com/noxire-dev/LoreKeeper', features: ['User accounts', 'Resource library', 'Community ratings', 'PDF viewer'] },
  { id: 'midnight', name: 'Midnight Moon', desc: 'Theme collection', tech: 'Design', num: '04', impact: 'Dark themes for VS Code designed for long coding sessions.', year: '2024', link: 'https://github.com/noxire-dev/midnight-theme', features: ['Multiple variants', 'Semantic highlighting', 'Terminal colors', 'UI theming'] },
]

const blogPosts = [
  { id: 'v2-rebuild', title: 'Rebuilding My Portfolio', date: '2025-11-19', readTime: '3 min', excerpt: 'Fresh start with React and TypeScript.', content: `When I first started this 3 years ago, I used Flask. Flask felt magical back then.\n\nTime for a clean slate — React, TypeScript, Tailwind.\n\nEvery decision here is intentional.`, tags: ['dev', 'design'] },
  { id: 'first-year', title: 'First Year: 96/100', date: '2025-08-28', readTime: '2 min', excerpt: 'First Class Honours at Essex.', content: `96/100 overall, First Class Honours at Essex.\n\nBiggest lesson: breaking complex problems into smaller pieces.\n\nSecond year starts with clearer goals.`, tags: ['uni'] },
  { id: 'learning-c', title: 'Why I Started Learning C', date: '2025-02-23', readTime: '2 min', excerpt: 'Understanding what is built on top of it.', content: `I started learning C to understand how higher-level languages work.\n\nImplementing my own data structures — Go and Rust make more sense now.\n\nEvery hour in C makes me better everywhere.`, tags: ['learning'] },
]

const skills = ['Python', 'Go', 'Java', 'JavaScript', 'TypeScript', 'C', 'Flask', 'React']

function useMousePos() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const h = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', h)
    return () => window.removeEventListener('mousemove', h)
  }, [])
  return pos
}

function MasterBg() {
  const mouse = useMousePos()
  const gx = (mouse.x / (typeof window !== 'undefined' ? window.innerWidth : 1)) * 100
  const gy = (mouse.y / (typeof window !== 'undefined' ? window.innerHeight : 1)) * 100

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute inset-0" style={{ background: BG }} />
      <div className="absolute w-[800px] h-[800px] rounded-full opacity-25 blur-3xl transition-all duration-1000"
        style={{ background: `radial-gradient(circle, ${LIME}40 0%, transparent 70%)`, left: `calc(${gx}% - 400px)`, top: `calc(${gy}% - 400px)` }} />
      <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(rgba(195,255,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(195,255,0,0.02) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
      <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
      <div className="absolute top-0 left-0 w-[2px] h-full" style={{ background: `linear-gradient(to bottom, ${LIME}, ${LIME}50, transparent)` }} />
    </div>
  )
}

function GlitchReveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [glitch, setGlitch] = useState(false)
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      onViewportEnter={() => { setGlitch(true); setTimeout(() => setGlitch(false), 300) }}
      className={`relative ${className}`}>
      {glitch && (<><span className="absolute inset-0 opacity-70" style={{ color: LIME, transform: 'translate(2px, 0)' }}>{children}</span><span className="absolute inset-0 text-cyan-400 opacity-70" style={{ transform: 'translate(-2px, 0)' }}>{children}</span></>)}
      {children}
    </motion.div>
  )
}

function SkillBar({ name, index }: { name: string; index: number }) {
  return (
    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}
      className="group flex items-center gap-4 py-3 border-b transition-colors cursor-default"
      style={{ borderColor: '#1a1a1a' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = `${LIME}50` }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = '#1a1a1a' }}>
      <span className="text-xs w-8" style={{ color: '#444' }}>{String(index + 1).padStart(2, '0')}</span>
      <span className="text-lg font-bold flex-1 transition-colors" style={{ color: '#bbb' }}>{name}</span>
      <div className="w-32 h-1 relative overflow-hidden" style={{ background: '#1a1a1a' }}>
        <motion.div initial={{ width: 0 }} whileInView={{ width: '100%' }} transition={{ delay: index * 0.1, duration: 0.8 }}
          className="absolute inset-y-0 left-0" style={{ background: `linear-gradient(to right, ${LIME}, ${LIME}99)` }} />
      </div>
    </motion.div>
  )
}

function Nav({ currentView, setView }: { currentView: View; setView: (v: View) => void }) {
  const [time, setTime] = useState(new Date())
  useEffect(() => { const i = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(i) }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5">
      <div className="flex items-center justify-between">
        <button onClick={() => setView('home')} className="flex items-center gap-2">
          <div className="w-5 h-5 flex items-center justify-center text-[9px] font-black" style={{ background: LIME, color: BG }}>SD</div>
          <span className="text-sm tracking-widest hidden md:block" style={{ color: '#555' }}>PORTFOLIO</span>
        </button>
        <div className="flex items-center gap-6 text-xs tracking-widest">
          <button onClick={() => setView('home')} style={{ color: currentView === 'home' ? LIME : '#555' }}>WORK</button>
          <button onClick={() => setView('blog')} style={{ color: currentView === 'blog' || currentView === 'blog-post' ? LIME : '#555' }}>BLOG</button>
          <Link to="/" style={{ color: '#555' }}>EXIT</Link>
          <span className="tabular-nums hidden md:inline" style={{ color: LIME, opacity: 0.6 }}>{time.toLocaleTimeString()}</span>
        </div>
      </div>
    </header>
  )
}

function ProjectPage({ projectId, setView }: { projectId: string; setView: (v: View) => void }) {
  const p = projects.find(x => x.id === projectId) || projects[0]
  return (
    <div className="pt-24 min-h-screen relative z-10" style={{ background: BG }}>
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-12 font-mono">
        <button onClick={() => setView('home')} className="text-sm mb-10" style={{ color: '#555' }}><span style={{ color: LIME }}>←</span> Back</button>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-4 mb-4"><span className="text-xs tracking-widest" style={{ color: '#555' }}>PROJECT</span><div className="flex-1 h-px" style={{ background: '#1E1E1E' }} /><span className="text-xs" style={{ color: LIME }}>{p.num}</span></div>
          <h1 className="text-5xl font-black mb-2" style={{ color: '#E8E8E8' }}>{p.name}</h1>
          <p className="text-lg mb-10" style={{ color: '#888' }}>{p.impact}</p>
          <div className="aspect-video mb-10 flex items-center justify-center relative" style={{ background: '#111', border: `1px solid #1E1E1E` }}>
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2" style={{ borderColor: LIME }} />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2" style={{ borderColor: LIME }} />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2" style={{ borderColor: LIME }} />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2" style={{ borderColor: LIME }} />
            <span style={{ color: '#555' }}>[ Screenshot ]</span>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12 pb-12 border-b" style={{ borderColor: '#1E1E1E' }}>
            <div><span className="text-xs" style={{ color: '#555' }}>YEAR</span><p className="text-2xl font-black mt-1" style={{ color: LIME }}>{p.year}</p></div>
            <div><span className="text-xs" style={{ color: '#555' }}>TECH</span><p className="mt-1" style={{ color: '#bbb' }}>{p.tech}</p></div>
            <div><span className="text-xs" style={{ color: '#555' }}>LINK</span><a href={p.link} target="_blank" rel="noopener" className="block mt-1 font-bold" style={{ color: LIME }}>GitHub →</a></div>
          </div>
          <h2 className="text-xl font-black mb-4" style={{ color: '#E8E8E8' }}>Features</h2>
          <ul className="space-y-3 mb-12">{p.features.map((f, i) => <li key={f} className="flex items-start gap-3"><span className="text-xs mt-1" style={{ color: LIME }}>{String(i+1).padStart(2,'0')}</span><span style={{ color: '#888' }}>{f}</span></li>)}</ul>
        </motion.div>
      </div>
    </div>
  )
}

function BlogListPage({ setView, setSelectedPost }: { setView: (v: View) => void; setSelectedPost: (s: string) => void }) {
  return (
    <div className="pt-24 min-h-screen relative z-10" style={{ background: BG }}>
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-12 font-mono">
        <h1 className="text-4xl font-black mb-10" style={{ color: '#E8E8E8' }}>Blog</h1>
        <div className="space-y-4">{blogPosts.map((post, i) => (
          <motion.button key={post.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            onClick={() => { setSelectedPost(post.id); setView('blog-post') }}
            className="group w-full text-left p-6 border transition-colors" style={{ borderColor: '#1E1E1E', background: '#111' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = `${LIME}50` }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#1E1E1E' }}>
            <div className="flex items-center gap-3 mb-1"><span className="text-xs" style={{ color: '#555' }}>{post.date}</span><span className="text-xs" style={{ color: '#555' }}>·</span><span className="text-xs" style={{ color: '#555' }}>{post.readTime}</span></div>
            <h2 className="text-lg font-bold transition-colors" style={{ color: '#E8E8E8' }}>{post.title}</h2>
            <p className="text-sm mt-1" style={{ color: '#888' }}>{post.excerpt}</p>
          </motion.button>
        ))}</div>
      </div>
    </div>
  )
}

function BlogPostPage({ postId, setView }: { postId: string; setView: (v: View) => void }) {
  const post = blogPosts.find(p => p.id === postId) || blogPosts[0]
  return (
    <div className="pt-24 min-h-screen relative z-10" style={{ background: BG }}>
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-12 font-mono">
        <button onClick={() => setView('blog')} className="text-sm mb-10" style={{ color: '#555' }}><span style={{ color: LIME }}>←</span> Blog</button>
        <time className="text-xs" style={{ color: '#555' }}>{post.date} · {post.readTime}</time>
        <h1 className="text-3xl font-black mt-2 mb-4" style={{ color: '#E8E8E8' }}>{post.title}</h1>
        <div className="flex gap-2 mb-10">{post.tags.map(t => <span key={t} className="text-xs px-2 py-0.5 font-bold" style={{ background: LIME, color: BG }}>#{t}</span>)}</div>
        <div className="space-y-5">{post.content.split('\n\n').map((p, i) => <p key={i} style={{ color: '#888', lineHeight: 1.8 }}>{p}</p>)}</div>
      </div>
    </div>
  )
}

export default function Design31() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const heroOpacity = useTransform(smoothScroll, [0, 0.15], [1, 0])
  const heroScale = useTransform(smoothScroll, [0, 0.15], [1, 0.95])
  const heroY = useTransform(smoothScroll, [0, 0.15], [0, -50])

  const [view, setView] = useState<View>('home')
  const [selectedProject, setSelectedProject] = useState('gosh')
  const [selectedPost, setSelectedPost] = useState('v2-rebuild')

  return (
    <div ref={containerRef} className="min-h-screen text-white font-mono" style={{ background: BG }}>
      <style>{`::selection { background: ${LIME}; color: ${BG}; }`}</style>
      <MasterBg />
      <Nav currentView={view} setView={setView} />

      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Hero — Design 15: sticky with parallax, 12-col grid */}
            <motion.section style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
              className="min-h-screen flex items-center px-6 md:px-12 sticky top-0">
              <div className="max-w-6xl mx-auto w-full">
                <div className="grid md:grid-cols-12 gap-8 items-end">
                  <div className="md:col-span-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                      className="flex items-center gap-4 mb-8">
                      <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: LIME }} />
                      <span className="text-xs tracking-widest" style={{ color: '#555' }}>AVAILABLE FOR WORK</span>
                    </motion.div>
                    <GlitchReveal>
                      <h1 className="text-[14vw] md:text-[10vw] font-black leading-[0.85] tracking-tighter">
                        <span className="block" style={{ color: '#E8E8E8' }}>SINA</span>
                        <span className="block" style={{ color: LIME }}>DILEK</span>
                      </h1>
                    </GlitchReveal>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                      className="mt-8 text-lg max-w-md leading-relaxed" style={{ color: '#888' }}>
                      Building tools and learning systems. CS student who codes for the joy of it.
                    </motion.p>
                  </div>
                  <div className="md:col-span-4">
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }} className="space-y-4 text-right">
                      <div><div className="text-xs mb-1" style={{ color: '#444' }}>INSTITUTION</div><div style={{ color: '#bbb' }}>University of Essex</div></div>
                      <div><div className="text-xs mb-1" style={{ color: '#444' }}>PROGRAM</div><div style={{ color: '#bbb' }}>BSc Computer Science</div></div>
                      <div><div className="text-xs mb-1" style={{ color: '#444' }}>ACHIEVEMENT</div><div className="font-bold" style={{ color: LIME }}>96/100 — First Class</div></div>
                    </motion.div>
                  </div>
                </div>
                <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.2, duration: 1 }}
                  className="mt-16 h-px origin-left" style={{ background: `linear-gradient(to right, ${LIME}, ${LIME}50, transparent)` }} />
              </div>
            </motion.section>

            {/* Skills — Design 15: two-col with bars */}
            <section className="relative z-10 py-32 px-6 md:px-12" style={{ background: `${BG}dd`, backdropFilter: 'blur(8px)' }}>
              <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-12 gap-12">
                  <div className="md:col-span-4">
                    <div className="sticky top-32">
                      <div className="flex items-center gap-4 mb-4"><div className="w-4 h-4" style={{ background: LIME }} /><span className="text-xs tracking-widest" style={{ color: '#555' }}>01 / CAPABILITIES</span></div>
                      <h2 className="text-4xl md:text-5xl font-black">TECH<br /><span style={{ color: '#333' }}>STACK</span></h2>
                    </div>
                  </div>
                  <div className="md:col-span-8">{skills.map((s, i) => <SkillBar key={s} name={s} index={i} />)}</div>
                </div>
              </div>
            </section>

            {/* Projects — Design 15: 12-col grid rows */}
            <section className="relative z-10 py-32 px-6 md:px-12">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-4 mb-16"><div className="w-4 h-4" style={{ background: LIME }} /><span className="text-xs tracking-widest" style={{ color: '#555' }}>02 / SELECTED WORK</span></div>
                <div className="space-y-6">{projects.map((p, i) => (
                  <motion.button key={p.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    whileHover={{ x: 10 }} onClick={() => { setSelectedProject(p.id); setView('project') }}
                    className="group w-full text-left grid md:grid-cols-12 gap-4 py-8 border-b transition-colors cursor-pointer"
                    style={{ borderColor: '#1a1a1a' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${LIME}50` }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#1a1a1a' }}>
                    <div className="md:col-span-1 text-4xl font-black" style={{ color: '#222' }}>{p.num}</div>
                    <div className="md:col-span-5"><h3 className="text-3xl md:text-4xl font-black transition-colors" style={{ color: '#E8E8E8' }}>{p.name}</h3></div>
                    <div className="md:col-span-3" style={{ color: '#888' }}>{p.desc}</div>
                    <div className="md:col-span-2 text-sm" style={{ color: '#555' }}>{p.tech}</div>
                    <div className="md:col-span-1 text-right"><span className="text-2xl transition-colors" style={{ color: '#333' }}>→</span></div>
                  </motion.button>
                ))}</div>
              </div>
            </section>

            {/* Blog Preview */}
            <section className="relative z-10 py-24 px-6 md:px-12" style={{ background: '#0E0E10' }}>
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-4"><div className="w-4 h-4" style={{ background: LIME }} /><span className="text-xs tracking-widest" style={{ color: '#555' }}>03 / WRITING</span></div>
                  <button onClick={() => setView('blog')} className="text-sm font-bold" style={{ color: LIME }}>All →</button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">{blogPosts.slice(0, 2).map((post, i) => (
                  <motion.button key={post.id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                    onClick={() => { setSelectedPost(post.id); setView('blog-post') }}
                    className="group text-left p-6 border transition-colors" style={{ borderColor: '#1E1E1E', background: BG }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${LIME}50` }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#1E1E1E' }}>
                    <span className="text-xs" style={{ color: '#555' }}>{post.date}</span>
                    <h3 className="text-lg font-bold mt-1 transition-colors" style={{ color: '#E8E8E8' }}>{post.title}</h3>
                    <p className="text-sm mt-2" style={{ color: '#888' }}>{post.excerpt}</p>
                  </motion.button>
                ))}</div>
              </div>
            </section>

            {/* CTA — Design 15: bordered box with corner accents */}
            <section className="relative z-10 py-32 px-6 md:px-12">
              <div className="max-w-6xl mx-auto">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                  className="relative p-12 md:p-20 border" style={{ borderColor: '#1E1E1E', background: '#0E0E10' }}>
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2" style={{ borderColor: LIME }} />
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2" style={{ borderColor: LIME }} />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2" style={{ borderColor: LIME }} />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2" style={{ borderColor: LIME }} />
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                      <div className="flex items-center gap-4 mb-6"><div className="w-4 h-4" style={{ background: LIME }} /><span className="text-xs tracking-widest" style={{ color: '#555' }}>04 / CONNECT</span></div>
                      <h2 className="text-5xl md:text-7xl font-black leading-none">LET'S<br /><span style={{ color: LIME }}>BUILD</span></h2>
                    </div>
                    <div className="space-y-4">
                      <motion.a href="https://github.com/noxire-dev" target="_blank" rel="noopener" whileHover={{ x: 10 }}
                        className="group flex items-center justify-between p-6 border transition-colors" style={{ borderColor: '#1E1E1E', background: '#111' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = LIME }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = '#1E1E1E' }}>
                        <div><div className="text-xs mb-1" style={{ color: '#444' }}>GITHUB</div><div className="text-lg" style={{ color: '#E8E8E8' }}>noxire-dev</div></div>
                        <span style={{ color: '#444' }}>→</span>
                      </motion.a>
                      <motion.a href="https://linkedin.com/in/sina-dilek-0b1b3b1b9" target="_blank" rel="noopener" whileHover={{ x: 10 }}
                        className="group flex items-center justify-between p-6 border transition-colors" style={{ borderColor: '#1E1E1E', background: '#111' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = LIME }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = '#1E1E1E' }}>
                        <div><div className="text-xs mb-1" style={{ color: '#444' }}>LINKEDIN</div><div className="text-lg" style={{ color: '#E8E8E8' }}>sina-dilek</div></div>
                        <span style={{ color: '#444' }}>→</span>
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            <footer className="relative z-10 py-8 px-6 md:px-12 border-t" style={{ borderColor: '#1a1a1a' }}>
              <div className="max-w-6xl mx-auto flex justify-between items-center text-xs tracking-widest" style={{ color: '#444' }}>
                <span>© {new Date().getFullYear()} SINA DILEK</span>
                <span style={{ color: `${LIME}40` }}>Y2K MASTERPIECE</span>
              </div>
            </footer>
          </motion.div>
        )}
        {view === 'project' && <motion.div key="project" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><ProjectPage projectId={selectedProject} setView={setView} /></motion.div>}
        {view === 'blog' && <motion.div key="blog" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><BlogListPage setView={setView} setSelectedPost={setSelectedPost} /></motion.div>}
        {view === 'blog-post' && <motion.div key="blog-post" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><BlogPostPage postId={selectedPost} setView={setView} /></motion.div>}
      </AnimatePresence>
    </div>
  )
}
