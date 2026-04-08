import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

// Design 30: Y2K KINETIC — from Design 12
// Design 12's DNA: Scroll-driven transforms, sticky hero, rotating diagonal, spring physics, skill grid
// Re-themed: Lime #C3FF00 on dark, Y2K digital energy

type View = 'home' | 'project' | 'blog' | 'blog-post'
const LIME = '#C3FF00'
const BG = '#0A0A0A'

const projects = [
  { id: 'gosh', name: 'GoSH', num: '01', desc: 'Shell written in Go', tags: ['Go', 'Systems'], impact: 'Built a shell from scratch with process management and I/O piping.', year: '2025', link: 'https://github.com/noxire-dev/GoSH', features: ['Command parsing', 'Process spawning', 'I/O redirection', 'Built-in commands'] },
  { id: 'moji', name: 'Moji', num: '02', desc: 'Note taking app', tags: ['Python', 'Flask'], impact: 'Shipped a productivity app focused on clean UI.', year: '2025', link: 'https://github.com/noxire-dev/moji', features: ['Rich text notes', 'Task management', 'Tags & categories', 'Dark mode'] },
  { id: 'lorekeeper', name: 'LoreKeeper', num: '03', desc: 'RPG marketplace', tags: ['Python', 'PostgreSQL'], impact: 'Community-driven platform for tabletop RPG resources.', year: '2025', link: 'https://github.com/noxire-dev/LoreKeeper', features: ['User accounts', 'Resource library', 'Community ratings', 'PDF viewer'] },
  { id: 'midnight', name: 'Midnight Moon', num: '04', desc: 'VSCode themes', tags: ['Design', 'JSON'], impact: 'Dark themes for VS Code designed for long sessions.', year: '2024', link: 'https://github.com/noxire-dev/midnight-theme', features: ['Multiple variants', 'Semantic highlighting', 'Terminal colors', 'UI theming'] },
]

const blogPosts = [
  { id: 'v2-rebuild', title: 'Rebuilding My Portfolio', date: '2025-11-19', excerpt: 'Fresh start with React and TypeScript.', content: `When I first started this 3 years ago, I used Flask. Knowing only Python, Flask felt magical.\n\nTime for a clean slate — React, TypeScript, Tailwind CSS.\n\nEvery decision here is intentional.`, tags: ['dev'] },
  { id: 'first-year', title: 'First Year: 96/100', date: '2025-08-28', excerpt: 'First Class Honours at Essex.', content: `96/100 overall, First Class Honours at Essex.\n\nThe biggest lesson was breaking complex problems into smaller pieces.\n\nSecond year starts with clearer goals.`, tags: ['uni'] },
  { id: 'learning-c', title: 'Why I Started Learning C', date: '2025-02-23', excerpt: 'Understanding what is built on top of it.', content: `I started learning C to understand how higher-level languages work.\n\nImplementing my own data structures — suddenly Go and Rust make more sense.\n\nEvery hour in C makes me better everywhere.`, tags: ['learning'] },
]

const skills = ['PYTHON', 'GO', 'JAVA', 'JAVASCRIPT', 'TYPESCRIPT', 'C', 'FLASK', 'REACT']

function Nav({ currentView, setView }: { currentView: View; setView: (v: View) => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-6 mix-blend-difference">
      <div className="flex items-center justify-between text-white">
        <button onClick={() => setView('home')} className="flex items-center gap-2">
          <div className="w-4 h-4" style={{ background: LIME }} />
          <span className="font-black tracking-tight text-sm">SD</span>
        </button>
        <div className="flex items-center gap-6 text-xs tracking-widest">
          <button onClick={() => setView('home')} className={currentView === 'home' ? 'opacity-100' : 'opacity-50'}>WORK</button>
          <button onClick={() => setView('blog')} className={currentView === 'blog' || currentView === 'blog-post' ? 'opacity-100' : 'opacity-50'}>BLOG</button>
          <Link to="/" className="opacity-50">EXIT</Link>
        </div>
      </div>
    </nav>
  )
}

function ProjectPage({ projectId, setView }: { projectId: string; setView: (v: View) => void }) {
  const p = projects.find(x => x.id === projectId) || projects[0]
  return (
    <div className="pt-24 min-h-screen relative z-10" style={{ background: '#FFF', color: '#000' }}>
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-12">
        <button onClick={() => setView('home')} className="text-sm text-neutral-500 mb-10">← Back</button>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-8xl font-black" style={{ color: LIME }}>{p.num}</span>
          <h1 className="text-5xl md:text-7xl font-black mb-3">{p.name}</h1>
          <p className="text-xl text-neutral-600 mb-10">{p.impact}</p>
          <div className="aspect-video mb-10 flex items-center justify-center" style={{ background: '#F0F0F0', border: `4px solid ${LIME}` }}>
            <span className="text-neutral-400">[ Screenshot ]</span>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12 pb-12" style={{ borderBottom: `4px solid ${LIME}30` }}>
            <div><span className="text-xs tracking-widest text-neutral-500">YEAR</span><p className="text-3xl font-black mt-2" style={{ color: LIME }}>{p.year}</p></div>
            <div><span className="text-xs tracking-widest text-neutral-500">STACK</span><div className="flex flex-wrap gap-2 mt-2">{p.tags.map(t => <span key={t} className="px-3 py-1 text-sm font-bold text-white" style={{ background: LIME.replace('FF', 'CC'), color: '#000' }}>{t}</span>)}</div></div>
            <div><span className="text-xs tracking-widest text-neutral-500">LINK</span><a href={p.link} target="_blank" rel="noopener" className="block font-black text-lg mt-2" style={{ color: LIME.replace('FF', 'AA') }}>GitHub →</a></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div><h2 className="text-2xl font-black mb-4">About</h2><p className="text-neutral-600 leading-relaxed">{p.impact}</p></div>
            <div><h2 className="text-2xl font-black mb-4">Features</h2><ul className="space-y-3">{p.features.map((f, i) => <li key={f} className="flex items-start gap-3"><span className="font-bold" style={{ color: LIME.replace('FF', 'AA') }}>{String(i+1).padStart(2,'0')}</span><span className="text-neutral-600">{f}</span></li>)}</ul></div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function BlogListPage({ setView, setSelectedPost }: { setView: (v: View) => void; setSelectedPost: (s: string) => void }) {
  return (
    <div className="pt-24 min-h-screen relative z-10" style={{ background: '#FFF', color: '#000' }}>
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-12">
        <h1 className="text-6xl md:text-8xl font-black mb-12">BLOG</h1>
        <div className="space-y-0 border-4" style={{ borderColor: '#000' }}>
          {blogPosts.map((post, i) => (
            <motion.button key={post.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
              onClick={() => { setSelectedPost(post.id); setView('blog-post') }}
              className="group w-full text-left p-8 border-b-4 last:border-b-0 transition-colors hover:text-white" style={{ borderColor: '#000' }}
              onMouseEnter={e => { e.currentTarget.style.background = LIME }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}>
              <span className="text-xs text-neutral-500 group-hover:text-black/60">{post.date}</span>
              <h2 className="text-2xl font-black mt-1">{post.title}</h2>
              <p className="text-neutral-600 group-hover:text-black/70 mt-2">{post.excerpt}</p>
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
    <div className="pt-24 min-h-screen relative z-10" style={{ background: '#FFF', color: '#000' }}>
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-12">
        <button onClick={() => setView('blog')} className="text-sm text-neutral-500 mb-10">← Blog</button>
        <time className="text-sm text-neutral-500">{post.date}</time>
        <h1 className="text-4xl md:text-6xl font-black mt-2 mb-6">{post.title}</h1>
        <div className="flex gap-2 mb-10">{post.tags.map(t => <span key={t} className="text-xs px-3 py-1 font-bold" style={{ background: LIME, color: '#000' }}>#{t}</span>)}</div>
        <div className="space-y-5">{post.content.split('\n\n').map((p, i) => <p key={i} className="text-neutral-700 leading-relaxed">{p}</p>)}</div>
      </div>
    </div>
  )
}

export default function Design30() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  const heroRotate = useTransform(smoothProgress, [0, 0.2], [0, -5])
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.9])
  const circleX = useTransform(smoothProgress, [0, 0.5], ['0%', '100%'])
  const circleScale = useTransform(smoothProgress, [0, 0.3], [1, 2])
  const diagonalRotate = useTransform(smoothProgress, [0, 1], [0, 180])
  const textX = useTransform(smoothProgress, [0.1, 0.3], ['-100%', '0%'])

  const [view, setView] = useState<View>('home')
  const [selectedProject, setSelectedProject] = useState('gosh')
  const [selectedPost, setSelectedPost] = useState('v2-rebuild')

  return (
    <div ref={containerRef}
      className={`bg-white text-black ${view === 'home' ? 'min-h-[400vh]' : 'min-h-screen'}`}
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{`::selection { background: ${LIME}; color: #000; }`}</style>

      {/* Fixed bg — Design 12 DNA: animated circle + rotating diagonal */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div style={{ x: circleX, scale: circleScale }} className="absolute top-1/4 -left-32 w-64 h-64 rounded-full" >
          <div className="w-full h-full rounded-full" style={{ background: LIME, opacity: 0.7 }} />
        </motion.div>
        <motion.div style={{ rotate: diagonalRotate }} className="absolute top-0 right-0 w-[200vw] h-32 origin-top-right">
          <div className="w-full h-full" style={{ background: '#000' }} />
        </motion.div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
      </div>

      <Nav currentView={view} setView={setView} />

      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Hero — Design 12: sticky, rotating, scaling */}
            <section className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
              <motion.div style={{ rotate: heroRotate, scale: heroScale }} className="relative z-10 text-center">
                <div className="absolute -inset-20 border-4 border-black" />
                <div className="absolute -inset-16 border-2" style={{ borderColor: LIME }} />
                <div className="p-12 md:p-20">
                  <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                    <div className="flex items-center justify-center gap-4 mb-6">
                      <div className="w-8 h-8" style={{ background: LIME }} />
                      <span className="text-sm tracking-[0.5em]">DEVELOPER</span>
                      <div className="w-8 h-8 border-2 border-black" />
                    </div>
                    <h1 className="text-[15vw] md:text-[10vw] font-black leading-[0.8] tracking-tighter">
                      SINA<br /><span style={{ color: LIME }}>DILEK</span>
                    </h1>
                    <div className="mt-8 flex items-center justify-center gap-8">
                      <span className="text-sm tracking-widest">ESSEX</span>
                      <div className="w-16 h-1" style={{ background: LIME }} />
                      <span className="text-sm tracking-widest">96/100</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-12 text-sm tracking-widest">
                SCROLL ↓
              </motion.div>
            </section>

            {/* Skills — Design 12: giant text reveal + grid tiles */}
            <section className="min-h-screen relative z-10 bg-black text-white py-32">
              <motion.div style={{ x: textX }} className="overflow-hidden">
                <div className="text-[20vw] font-black leading-none whitespace-nowrap opacity-10" style={{ color: LIME }}>
                  CAPABILITIES CAPABILITIES
                </div>
              </motion.div>
              <div className="max-w-6xl mx-auto px-6 md:px-12 mt-[-10vh]">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
                  {skills.map((skill, i) => (
                    <motion.div key={skill} initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05, type: 'spring', stiffness: 200 }} whileHover={{ scale: 1.1, zIndex: 10 }}
                      className="aspect-square flex items-center justify-center bg-white text-black p-4 cursor-default group">
                      <span className="text-lg md:text-2xl font-black text-center transition-colors" style={{ color: '#000' }}
                        onMouseEnter={e => { e.currentTarget.style.color = LIME.replace('FF', 'AA') }}
                        onMouseLeave={e => { e.currentTarget.style.color = '#000' }}>
                        {skill}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Projects — Design 12: horizontal sliding rows */}
            <section className="min-h-screen relative z-10 bg-white py-32">
              <div className="max-w-6xl mx-auto px-6 md:px-12">
                <div className="flex items-center gap-4 mb-20">
                  <div className="w-12 h-12" style={{ background: LIME }} />
                  <h2 className="text-6xl md:text-8xl font-black">WORK</h2>
                </div>
                <div className="space-y-0">
                  {projects.map((project, i) => (
                    <motion.button key={project.id}
                      initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }} whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8 }} whileHover={{ x: i % 2 === 0 ? 20 : -20 }}
                      onClick={() => { setSelectedProject(project.id); setView('project') }}
                      className="group w-full text-left border-t-4 border-black py-8 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-8">
                          <span className="text-6xl md:text-8xl font-black" style={{ color: LIME }}>{project.num}</span>
                          <span className="text-4xl md:text-6xl font-black transition-colors" style={{ color: '#000' }}
                            onMouseEnter={e => { e.currentTarget.style.color = LIME.replace('FF', 'AA') }}
                            onMouseLeave={e => { e.currentTarget.style.color = '#000' }}>
                            {project.name}
                          </span>
                        </div>
                        <motion.div whileHover={{ rotate: 45, scale: 1.2 }} className="w-12 h-12 transition-colors"
                          style={{ background: '#000' }}
                          onMouseEnter={e => { e.currentTarget.style.background = LIME }}
                          onMouseLeave={e => { e.currentTarget.style.background = '#000' }} />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </section>

            {/* Blog Preview */}
            <section className="relative z-10 bg-neutral-100 px-6 md:px-12 py-24">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-12">
                  <div className="flex items-center gap-4"><div className="w-8 h-8 bg-black" /><h2 className="text-4xl font-black">BLOG</h2></div>
                  <button onClick={() => setView('blog')} className="font-bold" style={{ color: LIME.replace('FF', 'AA') }}>All →</button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">{blogPosts.slice(0, 2).map((post, i) => (
                  <motion.button key={post.id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    onClick={() => { setSelectedPost(post.id); setView('blog-post') }}
                    className="group text-left p-7 bg-white border-4 border-black transition-colors"
                    onMouseEnter={e => { e.currentTarget.style.background = LIME }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#FFF' }}>
                    <span className="text-xs text-neutral-500 group-hover:text-black/60">{post.date}</span>
                    <h3 className="text-lg font-bold mt-1">{post.title}</h3>
                    <p className="text-neutral-600 group-hover:text-black/70 mt-2 text-sm">{post.excerpt}</p>
                  </motion.button>
                ))}</div>
              </div>
            </section>

            {/* Contact — Design 12: full-color CTA section */}
            <section className="min-h-screen relative z-10 flex items-center" style={{ background: LIME }}>
              <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">
                <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}>
                  <h2 className="text-[12vw] font-black leading-[0.85] mb-12" style={{ color: '#000' }}>
                    LET'S<br />BUILD
                  </h2>
                  <div className="flex flex-col md:flex-row gap-6">
                    <motion.a href="https://github.com/noxire-dev" target="_blank" rel="noopener" whileHover={{ scale: 1.05, x: 10 }}
                      className="inline-block px-12 py-6 bg-black text-2xl font-black" style={{ color: LIME }}>GITHUB →</motion.a>
                    <motion.a href="https://linkedin.com/in/sina-dilek-0b1b3b1b9" target="_blank" rel="noopener" whileHover={{ scale: 1.05, x: 10 }}
                      className="inline-block px-12 py-6 bg-white text-2xl font-black text-black">LINKEDIN →</motion.a>
                  </div>
                </motion.div>
              </div>
              <div className="absolute top-12 right-12 w-24 h-24 border-4 border-black opacity-30" />
              <div className="absolute bottom-12 left-12 w-16 h-16 bg-black opacity-20" />
            </section>

            <footer className="relative z-10 bg-black text-white py-8 px-6 md:px-12">
              <div className="max-w-6xl mx-auto flex justify-between items-center">
                <span className="text-sm tracking-widest">© {new Date().getFullYear()} SINA DILEK</span>
                <span className="text-sm tracking-widest" style={{ color: LIME }}>Y2K KINETIC</span>
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
