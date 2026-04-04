import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

// Design 29: Y2K CONSTRUCTIVIST — from Design 4
// Design 4's DNA: Bold geometric shapes, constructivist layout, large circle, split about, marquee skills
// Re-themed: Lime #C3FF00 on dark, Y2K digital grid, pixel accents

type View = 'home' | 'project' | 'blog' | 'blog-post'
const LIME = '#C3FF00'
const BG = '#0A0A0A'

const projects = [
  { id: 'gosh', name: 'GoSH', num: '01', desc: 'Shell written in Go', tags: ['Go', 'Systems'], impact: 'Built a shell from scratch with process management and I/O piping.', year: '2025', link: 'https://github.com/noxire-dev/GoSH', features: ['Command parsing', 'Process spawning', 'I/O redirection', 'Built-in commands'] },
  { id: 'moji', name: 'Moji', num: '02', desc: 'Note taking app', tags: ['Python', 'Flask'], impact: 'Shipped a productivity app focused on clean UI and fast interactions.', year: '2025', link: 'https://github.com/noxire-dev/moji', features: ['Rich text notes', 'Task management', 'Tags & categories', 'Dark mode'] },
  { id: 'lorekeeper', name: 'LoreKeeper', num: '03', desc: 'RPG marketplace', tags: ['Python', 'PostgreSQL'], impact: 'Architected a community-driven platform for tabletop RPG resources.', year: '2025', link: 'https://github.com/noxire-dev/LoreKeeper', features: ['User accounts', 'Resource library', 'Community ratings', 'PDF viewer'] },
  { id: 'midnight', name: 'Midnight Moon', num: '04', desc: 'VSCode themes', tags: ['Design', 'JSON'], impact: 'Crafted dark themes for VS Code designed for long coding sessions.', year: '2024', link: 'https://github.com/noxire-dev/midnight-theme', features: ['Multiple variants', 'Semantic highlighting', 'Terminal colors', 'UI theming'] },
]

const blogPosts = [
  { id: 'v2-rebuild', title: 'Rebuilding My Portfolio', date: '2025-11-19', excerpt: 'Fresh start with React, TypeScript, and new design philosophy.', content: `When I first started this project 3 years ago, I used Flask. Knowing only Python at the time, Flask felt magical.\n\nI've learned a lot since. Time for a clean slate — React, TypeScript, Tailwind CSS.\n\nEvery decision here is intentional. The color palette, the spacing, the hierarchy.`, tags: ['dev', 'design'] },
  { id: 'first-year', title: 'First Year: 96/100', date: '2025-08-28', excerpt: 'First Class Honours at the University of Essex.', content: `I finished my first year at Essex — 96/100, First Class Honours.\n\nThe biggest lesson was learning to break complex problems into smaller pieces.\n\nSecond year starts with clearer goals.`, tags: ['uni'] },
  { id: 'learning-c', title: 'Why I Started Learning C', date: '2025-02-23', excerpt: 'Understanding everything built on top of it.', content: `I started learning C to understand how higher-level languages work.\n\nImplementing my own string functions, linked lists — suddenly Go and Rust make more sense.\n\nEvery hour in C makes me better everywhere else.`, tags: ['learning'] },
]

const skills = ['Python', 'Go', 'Java', 'JavaScript', 'TypeScript', 'C', 'Flask', 'React']

function Geo({ className }: { className: string }) { return <div className={className} /> }

function Nav({ currentView, setView }: { currentView: View; setView: (v: View) => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <button onClick={() => setView('home')} className="flex items-center gap-3 group">
          <Geo className="w-5 h-5 transition-colors" style={{ background: LIME }} />
          <span className="font-black text-lg tracking-tight" style={{ color: '#E8E8E8' }}>SD</span>
        </button>
        <div className="flex items-center gap-6 text-sm tracking-widest">
          <button onClick={() => setView('home')} style={{ color: currentView === 'home' ? LIME : '#555' }}>WORK</button>
          <button onClick={() => setView('blog')} style={{ color: currentView === 'blog' || currentView === 'blog-post' ? LIME : '#555' }}>BLOG</button>
          <Link to="/" style={{ color: '#555' }}>EXIT</Link>
        </div>
      </div>
    </nav>
  )
}

function ProjectPage({ projectId, setView }: { projectId: string; setView: (v: View) => void }) {
  const p = projects.find(x => x.id === projectId) || projects[0]
  return (
    <div className="pt-24 min-h-screen relative z-10" style={{ background: BG }}>
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-12">
        <button onClick={() => setView('home')} className="text-sm mb-10 flex items-center gap-2" style={{ color: '#555' }}>
          <span style={{ color: LIME }}>←</span> Back
        </button>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-7xl font-black" style={{ color: LIME, opacity: 0.3 }}>{p.num}</span>
          <h1 className="text-5xl font-black mb-3" style={{ color: '#E8E8E8' }}>{p.name}</h1>
          <p className="text-lg mb-10" style={{ color: '#888' }}>{p.impact}</p>
          <div className="aspect-video mb-10 flex items-center justify-center" style={{ background: '#111', border: `3px solid ${LIME}30` }}>
            <span style={{ color: '#555' }}>[ Screenshot ]</span>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12 pb-12" style={{ borderBottom: `3px solid ${LIME}20` }}>
            <div><span className="text-xs tracking-widest" style={{ color: '#555' }}>YEAR</span><p className="text-2xl font-black mt-2" style={{ color: LIME }}>{p.year}</p></div>
            <div><span className="text-xs tracking-widest" style={{ color: '#555' }}>STACK</span><div className="flex flex-wrap gap-2 mt-2">{p.tags.map(t => <span key={t} className="px-3 py-1 text-sm font-bold" style={{ background: LIME, color: BG }}>{t}</span>)}</div></div>
            <div><span className="text-xs tracking-widest" style={{ color: '#555' }}>LINK</span><a href={p.link} target="_blank" rel="noopener" className="block font-bold mt-2" style={{ color: LIME }}>GitHub →</a></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div><h2 className="text-2xl font-black mb-4" style={{ color: '#E8E8E8' }}>About</h2><p style={{ color: '#888', lineHeight: 1.7 }}>{p.impact}</p></div>
            <div><h2 className="text-2xl font-black mb-4" style={{ color: '#E8E8E8' }}>Features</h2><ul className="space-y-3">{p.features.map((f, i) => <li key={f} className="flex items-start gap-3"><span className="font-mono text-xs mt-1" style={{ color: LIME }}>{String(i+1).padStart(2,'0')}</span><span style={{ color: '#888' }}>{f}</span></li>)}</ul></div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function BlogListPage({ setView, setSelectedPost }: { setView: (v: View) => void; setSelectedPost: (s: string) => void }) {
  return (
    <div className="pt-24 min-h-screen relative z-10" style={{ background: BG }}>
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-12">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="flex items-center gap-4 mb-12"><Geo className="w-4 h-4" style={{ background: LIME }} /><h1 className="text-4xl font-black" style={{ color: '#E8E8E8' }}>BLOG</h1></div>
          <div className="space-y-4">{blogPosts.map((post, i) => (
            <motion.button key={post.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              onClick={() => { setSelectedPost(post.id); setView('blog-post') }}
              className="group w-full text-left p-7 border-[3px] transition-colors" style={{ borderColor: '#1E1E1E' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = LIME; e.currentTarget.style.background = '#111' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#1E1E1E'; e.currentTarget.style.background = 'transparent' }}>
              <span className="text-xs" style={{ color: '#555' }}>{post.date}</span>
              <h2 className="text-xl font-black mt-1 transition-colors" style={{ color: '#E8E8E8' }}>{post.title}</h2>
              <p className="mt-2" style={{ color: '#888' }}>{post.excerpt}</p>
            </motion.button>
          ))}</div>
        </motion.div>
      </div>
    </div>
  )
}

function BlogPostPage({ postId, setView }: { postId: string; setView: (v: View) => void }) {
  const post = blogPosts.find(p => p.id === postId) || blogPosts[0]
  return (
    <div className="pt-24 min-h-screen relative z-10" style={{ background: BG }}>
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-12">
        <button onClick={() => setView('blog')} className="text-sm mb-10" style={{ color: '#555' }}><span style={{ color: LIME }}>←</span> Blog</button>
        <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <time className="text-sm" style={{ color: '#555' }}>{post.date}</time>
          <h1 className="text-4xl font-black mt-2 mb-6" style={{ color: '#E8E8E8' }}>{post.title}</h1>
          <div className="flex gap-2 mb-10">{post.tags.map(t => <span key={t} className="text-xs px-3 py-1 font-bold" style={{ background: LIME, color: BG }}>#{t}</span>)}</div>
          <div className="space-y-5">{post.content.split('\n\n').map((p, i) => <p key={i} style={{ color: '#888', lineHeight: 1.8 }}>{p}</p>)}</div>
        </motion.article>
      </div>
    </div>
  )
}

export default function Design29() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const circleScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.5])
  const circleX = useTransform(scrollYProgress, [0, 0.3], ['0%', '50%'])
  const [view, setView] = useState<View>('home')
  const [selectedProject, setSelectedProject] = useState('gosh')
  const [selectedPost, setSelectedPost] = useState('v2-rebuild')

  return (
    <div ref={containerRef} className="min-h-screen overflow-x-hidden" style={{ background: BG, color: '#E8E8E8' }}>
      <style>{`::selection { background: ${LIME}; color: ${BG}; }`}</style>

      {/* Fixed geometric bg — Design 4 DNA: large circle + diagonal + grid */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div style={{ scale: circleScale, x: circleX }}
          className="absolute -top-[20vw] -right-[20vw] w-[70vw] h-[70vw] rounded-full"
          // Lime circle with low opacity — not solid like the red was
        >
          <div className="w-full h-full rounded-full" style={{ background: `radial-gradient(circle, ${LIME}20 0%, ${LIME}08 50%, transparent 70%)` }} />
        </motion.div>
        <div className="absolute bottom-0 left-0 w-[50vw] h-[30vh] origin-bottom-left -skew-x-12" style={{ background: '#111' }} />
        <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(${LIME}08 1px, transparent 1px), linear-gradient(90deg, ${LIME}08 1px, transparent 1px)`, backgroundSize: '100px 100px' }} />
      </div>

      <Nav currentView={view} setView={setView} />

      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Hero — Design 4 layout: left-aligned massive name */}
            <section className="min-h-screen relative flex items-center px-6 md:px-12">
              <div className="relative z-10 max-w-4xl">
                <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                  <div className="flex items-center gap-4 mb-8">
                    <Geo className="w-8 h-8" style={{ background: LIME }} />
                    <span className="text-sm tracking-[0.3em] font-mono" style={{ color: '#888' }}>DEVELOPER</span>
                  </div>
                  <h1 className="text-[16vw] md:text-[12vw] leading-[0.85] font-black tracking-tighter">
                    <span className="block" style={{ color: '#E8E8E8' }}>SINA</span>
                    <span className="block flex items-center gap-4">
                      <span style={{ color: LIME }}>DILEK</span>
                      <Geo className="w-16 h-16 md:w-24 md:h-24 rounded-full border-[3px]" style={{ borderColor: LIME }} />
                    </span>
                  </h1>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-12 flex flex-wrap items-center gap-4">
                    <span className="px-4 py-2 text-sm tracking-widest font-bold" style={{ background: LIME, color: BG }}>UNIVERSITY OF ESSEX</span>
                    <span className="px-4 py-2 text-sm tracking-widest font-bold border-2" style={{ borderColor: LIME, color: LIME }}>96/100</span>
                    <span className="px-4 py-2 text-sm tracking-widest" style={{ background: '#111', color: '#888' }}>OPEN TO WORK</span>
                  </motion.div>
                </motion.div>
              </div>
            </section>

            {/* About — Design 4 split layout */}
            <section className="relative z-10">
              <div className="grid md:grid-cols-2">
                <div className="p-12 md:p-20" style={{ background: '#111' }}>
                  <h2 className="text-5xl font-black mb-8" style={{ color: '#E8E8E8' }}>ABOUT</h2>
                  <p className="text-lg leading-relaxed" style={{ color: '#888' }}>
                    CS student at Essex. Building tools and learning systems. Started with Python, now exploring Go, Java, JavaScript, and C.
                  </p>
                  <div className="mt-8 flex items-center gap-4">
                    <Geo className="w-4 h-4" style={{ background: LIME }} />
                    <span className="text-sm tracking-widest" style={{ color: '#555' }}>FIRST CLASS HONOURS</span>
                  </div>
                </div>
                <div className="p-12 md:p-20 flex items-center justify-center" style={{ background: BG }}>
                  <div className="relative w-full aspect-square max-w-sm">
                    <Geo className="absolute inset-0 border-[3px]" style={{ borderColor: '#1E1E1E' }} />
                    <Geo className="absolute top-4 left-4 right-4 bottom-4" style={{ background: LIME, opacity: 0.15 }} />
                    <Geo className="absolute top-8 left-8 right-8 bottom-8 rounded-full border-[3px]" style={{ borderColor: LIME }} />
                    <div className="absolute inset-0 flex items-center justify-center"><span className="text-6xl font-black" style={{ color: LIME }}>SD</span></div>
                  </div>
                </div>
              </div>
            </section>

            {/* Skills marquee — Design 4 DNA */}
            <section className="relative z-10 py-20 overflow-hidden" style={{ borderTop: `3px solid ${LIME}15`, borderBottom: `3px solid ${LIME}15` }}>
              <div className="px-6 md:px-12 mb-6">
                <div className="flex items-center gap-4"><Geo className="w-4 h-4" style={{ background: LIME }} /><span className="text-xs tracking-[0.3em]" style={{ color: '#555' }}>CAPABILITIES</span></div>
              </div>
              <div className="overflow-hidden">
                <motion.div animate={{ x: '-50%' }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} className="flex whitespace-nowrap">
                  {[...skills, ...skills].map((s, i) => (
                    <span key={i} className="text-6xl md:text-8xl font-black mx-8" style={{ color: `${LIME}15` }}>
                      {s}<span className="mx-8" style={{ color: LIME }}>●</span>
                    </span>
                  ))}
                </motion.div>
              </div>
            </section>

            {/* Projects — Design 4 2x2 grid */}
            <section className="relative z-10 px-6 md:px-12 py-24">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-4 mb-16"><Geo className="w-4 h-4" style={{ background: LIME }} /><span className="text-xs tracking-[0.3em]" style={{ color: '#555' }}>SELECTED WORK</span></div>
                <div className="grid md:grid-cols-2 gap-0 border-[3px]" style={{ borderColor: '#1E1E1E' }}>
                  {projects.map((project, i) => (
                    <motion.button key={project.id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: i * 0.1 }}
                      onClick={() => { setSelectedProject(project.id); setView('project') }}
                      className={`group p-8 md:p-12 text-left transition-colors ${i === 0 ? 'border-b-[3px] md:border-r-[3px] md:border-b-0' : i === 1 ? 'border-b-[3px]' : i === 2 ? 'md:border-r-[3px]' : ''}`}
                      style={{ borderColor: '#1E1E1E' }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#111' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}>
                      <div className="flex items-start justify-between mb-6">
                        <span className="text-6xl font-black" style={{ color: `${LIME}15` }}>{project.num}</span>
                        <Geo className="w-6 h-6 group-hover:rotate-45 transition-transform" style={{ background: LIME }} />
                      </div>
                      <h3 className="text-3xl font-black mb-2 transition-colors" style={{ color: '#E8E8E8' }}>{project.name}</h3>
                      <p style={{ color: '#888' }}>{project.desc}</p>
                    </motion.button>
                  ))}
                </div>
              </div>
            </section>

            {/* Blog Preview */}
            <section className="relative z-10 px-6 md:px-12 py-24" style={{ background: '#111' }}>
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-12">
                  <div className="flex items-center gap-4"><Geo className="w-4 h-4" style={{ background: LIME }} /><span className="text-xs tracking-[0.3em]" style={{ color: '#555' }}>WRITING</span></div>
                  <button onClick={() => setView('blog')} className="text-sm font-bold" style={{ color: LIME }}>All →</button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">{blogPosts.slice(0, 2).map((post, i) => (
                  <motion.button key={post.id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    onClick={() => { setSelectedPost(post.id); setView('blog-post') }}
                    className="group text-left p-7 border-[3px] transition-colors" style={{ borderColor: '#1E1E1E', background: BG }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = LIME }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#1E1E1E' }}>
                    <span className="text-xs" style={{ color: '#555' }}>{post.date}</span>
                    <h3 className="text-lg font-bold mt-1" style={{ color: '#E8E8E8' }}>{post.title}</h3>
                    <p className="text-sm mt-2" style={{ color: '#888' }}>{post.excerpt}</p>
                  </motion.button>
                ))}</div>
              </div>
            </section>

            {/* Contact — Design 4 split CTA */}
            <section className="relative z-10 px-6 md:px-12 py-24" style={{ background: LIME }}>
              <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-6xl md:text-8xl font-black leading-none" style={{ color: BG }}>
                    LET'S<br /><span>CONNECT</span>
                  </h2>
                </div>
                <div className="space-y-4">
                  <motion.a href="https://github.com/noxire-dev" target="_blank" rel="noopener" whileHover={{ x: 10 }}
                    className="group flex items-center justify-between p-6 border-[3px] transition-colors" style={{ borderColor: BG, color: BG }}>
                    <span className="text-xl font-black">GITHUB</span><span className="text-2xl">→</span>
                  </motion.a>
                  <motion.a href="https://linkedin.com/in/sina-dilek-0b1b3b1b9" target="_blank" rel="noopener" whileHover={{ x: 10 }}
                    className="group flex items-center justify-between p-6 transition-colors" style={{ background: BG, color: LIME }}>
                    <span className="text-xl font-black">LINKEDIN</span><span className="text-2xl">→</span>
                  </motion.a>
                </div>
              </div>
            </section>

            <footer className="relative z-10 px-6 md:px-12 py-8" style={{ borderTop: `3px solid #1E1E1E` }}>
              <div className="max-w-6xl mx-auto flex justify-between items-center">
                <div className="flex items-center gap-4"><Geo className="w-4 h-4" style={{ background: LIME }} /><span className="text-sm tracking-widest font-mono" style={{ color: '#555' }}>© {new Date().getFullYear()} SINA DILEK</span></div>
                <span className="text-sm tracking-widest font-mono" style={{ color: `${LIME}40` }}>Y2K CONSTRUCTIVIST</span>
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
