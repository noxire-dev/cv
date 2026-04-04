import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Design 39: CONCRETE ROSE — Dusty rose constructivist
// Bold geometry from Design 4/12 DNA, but dusty rose #E0A8BE on deep charcoal.
// Split layouts, diagonal shapes, massive typography, scroll kinetics.
// Full system: project pages + blog.

type View = 'home' | 'project' | 'blog' | 'blog-post'

const ROSE = '#E0A8BE'
const ROSE_DIM = '#B88A9D'
const BG = '#0B0B0F'
const SURFACE = '#121218'
const BORDER = '#1C1C24'
const TEXT = '#E2DDE5'
const MUTED = '#6A6474'

const projects = [
  { id: 'gosh', name: 'GoSH', num: '01', desc: 'Shell written in Go', tags: ['Go', 'Systems'], impact: 'Built a shell from scratch — pipes, redirects, process management.', overview: 'Minimalist shell demonstrating systems programming. Lexer → parser → executor, all in Go.', problem: 'Developers use shells daily without understanding internals.', approach: 'Incremental implementation in Go for clean concurrency.', year: '2025', link: 'https://github.com/noxire-dev/GoSH', features: ['Pipe chains', 'I/O redirection', 'Process spawning', 'Built-in commands'] },
  { id: 'moji', name: 'Moji', num: '02', desc: 'Note taking app', tags: ['Python', 'Flask'], impact: 'Clean productivity app with UI-first design.', overview: 'Note-taking + task management with Flask. Every interaction feels instant.', problem: 'Note apps are bloated. Needed something fast and opinionated.', approach: 'Designed UI first, built backend to serve it.', year: '2025', link: 'https://github.com/noxire-dev/moji', features: ['Markdown notes', 'Task lists', 'Tags & categories', 'Dark mode'] },
  { id: 'lorekeeper', name: 'LoreKeeper', num: '03', desc: 'RPG marketplace', tags: ['Python', 'PostgreSQL'], impact: 'Community platform for free tabletop RPG resources.', overview: 'E-commerce for free TTRPG materials with community curation.', problem: 'TTRPG resources scattered across forums and Discord.', approach: 'Marketplace-style, no payments, focus on community.', year: '2025', link: 'https://github.com/noxire-dev/LoreKeeper', features: ['User accounts', 'Full-text search', 'Ratings', 'PDF viewer'] },
  { id: 'midnight', name: 'Midnight Moon', num: '04', desc: 'VSCode themes', tags: ['Design', 'JSON'], impact: 'Dark themes designed for long coding sessions.', overview: 'VS Code themes with multiple variants and semantic highlighting.', problem: 'Most dark themes prioritize aesthetics over ergonomics.', approach: 'Color science research and daily iteration.', year: '2024', link: 'https://github.com/noxire-dev/midnight-theme', features: ['Multiple variants', 'Semantic tokens', 'Terminal colors', 'Full UI'] },
]

const blogPosts = [
  { id: 'v2-rebuild', title: 'Portfolio V2', date: 'Nov 2025', readTime: '3 min', excerpt: 'Scrapped everything. Started over with React + TypeScript.', content: 'When I first started this 3 years ago, I used Flask. Knowing only Python, Flask felt magical.\n\nI\'ve since learned a lot. Time for a clean slate.\n\nReact, TypeScript, Tailwind, Vite. Every decision intentional.', tags: ['dev', 'design'] },
  { id: 'first-year', title: '96/100 — First Class', date: 'Aug 2025', readTime: '2 min', excerpt: 'First year at Essex. First Class Honours.', content: 'First year at Essex — 96/100, First Class Honours.\n\nThe biggest lesson: decomposition. Breaking problems into pieces, managing time.\n\nSecond year starts with momentum.', tags: ['uni'] },
  { id: 'learning-c', title: 'Why I Started Learning C', date: 'Feb 2025', readTime: '2 min', excerpt: 'Not to master it. To understand everything else.', content: 'Started C to understand how Go, Rust, and C++ work underneath.\n\nImplementing my own string functions, my own linked list — everything makes sense.\n\nSegfaults aren\'t fun. But every hour in C compounds.', tags: ['systems'] },
]

const skills = ['Python', 'Go', 'Java', 'JavaScript', 'TypeScript', 'C', 'React', 'Flask']

function Nav({ currentView, setView }: { currentView: View; setView: (v: View) => void }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500" style={{ background: scrolled ? `${BG}ee` : 'transparent', backdropFilter: scrolled ? 'blur(12px)' : 'none', borderBottom: scrolled ? `1px solid ${BORDER}` : '1px solid transparent' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
        <button onClick={() => setView('home')} className="group flex items-center gap-3">
          <div className="w-8 h-8 border-2 flex items-center justify-center transition-colors group-hover:bg-[#E0A8BE] group-hover:border-[#E0A8BE]" style={{ borderColor: ROSE }}>
            <span className="text-xs font-black group-hover:text-[#0B0B0F]" style={{ color: ROSE }}>SD</span>
          </div>
          <span className="text-sm tracking-[0.2em] hidden md:block" style={{ color: MUTED }}>SINA DILEK</span>
        </button>
        <div className="flex items-center gap-8 text-sm tracking-widest">
          <button onClick={() => setView('home')} style={{ color: currentView === 'home' ? ROSE : MUTED }}>WORK</button>
          <button onClick={() => setView('blog')} style={{ color: (currentView === 'blog' || currentView === 'blog-post') ? ROSE : MUTED }}>BLOG</button>
          <Link to="/" style={{ color: MUTED }}>←</Link>
        </div>
      </div>
    </nav>
  )
}

function ProjectPage({ projectId, setView }: { projectId: string; setView: (v: View) => void }) {
  const p = projects.find(x => x.id === projectId) || projects[0]
  return (
    <div className="pt-28 min-h-screen" style={{ background: BG }}>
      <div className="max-w-4xl mx-auto px-6 md:px-12 pb-24">
        <button onClick={() => setView('home')} className="text-sm mb-12" style={{ color: MUTED }}><span style={{ color: ROSE }}>←</span> Back</button>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-7xl font-black" style={{ color: ROSE, opacity: 0.2 }}>{p.num}</span>
          <h1 className="text-5xl font-black -mt-4 mb-3" style={{ color: TEXT }}>{p.name}</h1>
          <div className="flex flex-wrap gap-2 mb-8">{p.tags.map(t => <span key={t} className="text-xs px-3 py-1 border" style={{ borderColor: BORDER, color: MUTED }}>{t}</span>)}</div>
          <div className="aspect-video mb-10 border-2 flex items-center justify-center" style={{ borderColor: BORDER, background: SURFACE }}>
            <span className="text-sm" style={{ color: MUTED }}>[ Preview ]</span>
          </div>
          {[{ l: 'IMPACT', t: p.impact }, { l: 'OVERVIEW', t: p.overview }, { l: 'PROBLEM', t: p.problem }, { l: 'APPROACH', t: p.approach }].map(s => (
            <div key={s.l} className="mb-8"><span className="text-xs tracking-[0.2em] block mb-2" style={{ color: ROSE }}>{s.l}</span><p className="text-sm leading-relaxed" style={{ color: MUTED }}>{s.t}</p></div>
          ))}
          <div className="grid grid-cols-2 gap-3 mb-8">{p.features.map((f, i) => <div key={f} className="p-3 border" style={{ borderColor: BORDER, background: SURFACE }}><span className="text-xs" style={{ color: ROSE }}>{String(i + 1).padStart(2, '0')}</span><p className="text-sm mt-1" style={{ color: TEXT }}>{f}</p></div>)}</div>
          <a href={p.link} target="_blank" rel="noopener" className="text-sm font-bold" style={{ color: ROSE }}>View on GitHub →</a>
        </motion.div>
      </div>
    </div>
  )
}

function BlogPage({ setView, setPost }: { setView: (v: View) => void; setPost: (s: string) => void }) {
  return (
    <div className="pt-28 min-h-screen" style={{ background: BG }}>
      <div className="max-w-3xl mx-auto px-6 md:px-12 pb-24">
        <h2 className="text-4xl font-black mb-12" style={{ color: TEXT }}>Blog</h2>
        {blogPosts.map((post, i) => (
          <motion.button key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            onClick={() => { setPost(post.id); setView('blog-post') }}
            className="group w-full text-left mb-4 p-6 border-2 transition-colors" style={{ borderColor: BORDER, background: SURFACE }}
            onMouseEnter={e => e.currentTarget.style.borderColor = ROSE} onMouseLeave={e => e.currentTarget.style.borderColor = BORDER}>
            <div className="flex justify-between mb-2"><span className="text-xs" style={{ color: MUTED }}>{post.date}</span><span className="text-xs" style={{ color: MUTED }}>{post.readTime}</span></div>
            <h3 className="text-xl font-bold mb-1 group-hover:text-[#E0A8BE] transition-colors" style={{ color: TEXT }}>{post.title}</h3>
            <p className="text-sm" style={{ color: MUTED }}>{post.excerpt}</p>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

function BlogPostPage({ postId, setView }: { postId: string; setView: (v: View) => void }) {
  const post = blogPosts.find(p => p.id === postId) || blogPosts[0]
  return (
    <div className="pt-28 min-h-screen" style={{ background: BG }}>
      <div className="max-w-2xl mx-auto px-6 md:px-12 pb-24">
        <button onClick={() => setView('blog')} className="text-sm mb-8" style={{ color: MUTED }}><span style={{ color: ROSE }}>←</span> Blog</button>
        <motion.article initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-xs" style={{ color: MUTED }}>{post.date} · {post.readTime}</span>
          <h1 className="text-3xl font-black mt-2 mb-8" style={{ color: TEXT }}>{post.title}</h1>
          {post.content.split('\n\n').map((p, i) => <p key={i} className="text-sm leading-relaxed mb-4" style={{ color: MUTED }}>{p}</p>)}
        </motion.article>
      </div>
    </div>
  )
}

export default function Design39() {
  const [view, setView] = useState<View>('home')
  const [selectedProject, setSelectedProject] = useState('gosh')
  const [selectedPost, setSelectedPost] = useState('v2-rebuild')
  const { scrollYProgress } = useScroll()
  const diagonalRotate = useTransform(scrollYProgress, [0, 1], [0, 90])

  return (
    <div className="min-h-screen font-mono" style={{ background: BG, color: TEXT }}>
      <style>{`::selection { background: ${ROSE}; color: ${BG}; }`}</style>
      <Nav currentView={view} setView={setView} />

      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Decorative shapes */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
              <motion.div style={{ rotate: diagonalRotate }} className="absolute top-0 right-0 w-[200vw] h-24 origin-top-right" style={{ background: `${ROSE}08`, rotate: diagonalRotate as any }} />
              <div className="absolute bottom-0 left-0 w-[50vw] h-[30vh] origin-bottom-left -skew-x-12" style={{ background: `${ROSE}06` }} />
              <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `linear-gradient(${TEXT} 1px, transparent 1px), linear-gradient(90deg, ${TEXT} 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />
            </div>

            {/* Hero — split constructivist */}
            <section className="min-h-screen relative flex items-center px-6 md:px-12 z-10">
              <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
                <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-8 h-8" style={{ background: ROSE }} />
                    <span className="text-sm tracking-[0.3em]" style={{ color: MUTED }}>DEVELOPER</span>
                  </div>
                  <h1 className="text-[16vw] md:text-[9vw] leading-[0.85] font-black tracking-tighter">
                    <span className="block">SINA</span>
                    <span className="block" style={{ color: ROSE }}>DILEK</span>
                  </h1>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <span className="px-4 py-2 text-xs tracking-widest border-2" style={{ borderColor: ROSE, color: ROSE }}>OPEN TO WORK</span>
                    <span className="px-4 py-2 text-xs tracking-widest" style={{ background: ROSE, color: BG }}>96/100</span>
                    <span className="px-4 py-2 text-xs tracking-widest border" style={{ borderColor: BORDER, color: MUTED }}>ESSEX</span>
                  </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="hidden md:block">
                  <div className="border-2 p-8" style={{ borderColor: BORDER, background: SURFACE }}>
                    <p className="text-lg leading-relaxed" style={{ color: MUTED }}>
                      CS student at Essex. Product-minded developer building tools and learning systems. Started with Python, now exploring Go, Java, TypeScript, and C.
                    </p>
                    <div className="mt-6 pt-6 border-t flex items-center gap-6" style={{ borderColor: BORDER }}>
                      <a href="mailto:contact@sinadilek.com" className="text-xs font-bold" style={{ color: ROSE }}>EMAIL →</a>
                      <a href="https://github.com/noxire-dev" target="_blank" rel="noopener" className="text-xs font-bold" style={{ color: ROSE }}>GITHUB →</a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Skills — stacking grid */}
            <section className="relative z-10 py-24 px-6 md:px-12" style={{ background: SURFACE }}>
              <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-black mb-12" style={{ color: TEXT }}>STACK</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
                  {skills.map((skill, i) => (
                    <motion.div key={skill} initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05, type: 'spring', stiffness: 200 }} viewport={{ once: true }}
                      className="aspect-square flex items-center justify-center border-2 group cursor-default transition-colors" style={{ borderColor: BORDER, background: BG }}
                      onMouseEnter={e => { e.currentTarget.style.background = ROSE; e.currentTarget.style.borderColor = ROSE }}
                      onMouseLeave={e => { e.currentTarget.style.background = BG; e.currentTarget.style.borderColor = BORDER }}>
                      <span className="text-lg md:text-2xl font-black group-hover:text-[#0B0B0F] transition-colors" style={{ color: MUTED }}>{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Projects — rows */}
            <section className="relative z-10 py-24 px-6 md:px-12">
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-16">
                  <div className="w-12 h-12" style={{ background: ROSE }} />
                  <h2 className="text-5xl md:text-7xl font-black">WORK</h2>
                </div>
                {projects.map((project, i) => (
                  <motion.button key={project.id} initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
                    onClick={() => { setSelectedProject(project.id); setView('project') }}
                    className="group w-full flex flex-col md:flex-row justify-between items-start md:items-center py-10 border-b-2 hover:pl-6 transition-all text-left" style={{ borderColor: BORDER }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = ROSE} onMouseLeave={e => e.currentTarget.style.borderColor = BORDER}>
                    <div>
                      <span className="text-xs tracking-widest" style={{ color: ROSE }}>[{project.tags.join(' · ')}]</span>
                      <h3 className="text-4xl md:text-6xl font-black tracking-tight mt-2 group-hover:text-[#E0A8BE] transition-colors">{project.name}</h3>
                    </div>
                    <div className="flex items-center gap-6 mt-4 md:mt-0">
                      <span className="text-2xl font-bold" style={{ color: MUTED }}>{project.year}</span>
                      <div className="w-12 h-12 border-2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderColor: ROSE, color: ROSE }}>→</div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </section>

            {/* Blog preview */}
            <section className="relative z-10 py-24 px-6 md:px-12" style={{ background: SURFACE }}>
              <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                  <h2 className="text-4xl font-black">BLOG</h2>
                  <button onClick={() => setView('blog')} className="text-sm font-bold" style={{ color: ROSE }}>VIEW ALL →</button>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  {blogPosts.map((post, i) => (
                    <motion.button key={post.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                      onClick={() => { setSelectedPost(post.id); setView('blog-post') }}
                      className="group text-left p-6 border-2 transition-colors" style={{ borderColor: BORDER, background: BG }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = ROSE} onMouseLeave={e => e.currentTarget.style.borderColor = BORDER}>
                      <span className="text-xs" style={{ color: MUTED }}>{post.date}</span>
                      <h3 className="text-lg font-bold mt-2 mb-2 group-hover:text-[#E0A8BE] transition-colors">{post.title}</h3>
                      <p className="text-xs" style={{ color: MUTED }}>{post.excerpt}</p>
                    </motion.button>
                  ))}
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 py-24 px-6 md:px-12 border-t-2" style={{ borderColor: ROSE }}>
              <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-5xl md:text-7xl font-black mb-6">LET'S<br /><span style={{ color: ROSE }}>TALK.</span></h2>
                </div>
                <div className="flex flex-col justify-end gap-4">
                  <a href="mailto:contact@sinadilek.com" className="text-xl font-bold border-b-2 pb-2 inline-block w-fit hover:text-[#E0A8BE] transition-colors" style={{ borderColor: ROSE, color: TEXT }}>contact@sinadilek.com</a>
                  <div className="flex gap-4 mt-4">
                    <a href="https://github.com/noxire-dev" target="_blank" rel="noopener" className="px-6 py-3 border-2 text-sm font-bold hover:bg-[#E0A8BE] hover:text-[#0B0B0F] transition-colors" style={{ borderColor: ROSE, color: ROSE }}>GITHUB</a>
                    <a href="https://linkedin.com/in/sina-dilek-0b1b3b1b9" target="_blank" rel="noopener" className="px-6 py-3 border-2 text-sm font-bold hover:bg-[#E0A8BE] hover:text-[#0B0B0F] transition-colors" style={{ borderColor: ROSE, color: ROSE }}>LINKEDIN</a>
                  </div>
                  <span className="text-xs mt-8" style={{ color: MUTED }}>© {new Date().getFullYear()} Sina Dilek</span>
                </div>
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
