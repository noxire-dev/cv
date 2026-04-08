import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Design 40: ARCTIC GRID — Ice blue Swiss minimal brutalist
// Cold, precise, clinical. Ice blue #7DD3FC on pure black.
// Extreme Swiss grid discipline. Minimal elements, maximum impact.
// Full system with project + blog pages.

type View = 'home' | 'project' | 'blog' | 'blog-post'

const ICE = '#7DD3FC'
const ICE_DIM = '#5AB4DE'
const BG = '#050508'
const SURFACE = '#0A0A0F'
const BORDER = '#151520'
const TEXT = '#E8EDF2'
const MUTED = '#5A6070'

const projects = [
  { id: 'gosh', name: 'GoSH', num: '01', tags: ['Go', 'Systems'], impact: 'Fully functional shell — pipes, redirects, process management.', overview: 'Minimalist shell: lexer → parser → executor, all in Go.', problem: 'Shells are used daily without understanding internals.', approach: 'Incremental. Go for concurrency. Hand-written tokenizer.', year: '2025', link: 'https://github.com/noxire-dev/GoSH', features: ['Pipe chains', 'I/O redirection', 'Process spawning', 'Built-in cmds'] },
  { id: 'moji', name: 'Moji', num: '02', tags: ['Python', 'Flask'], impact: 'Clean productivity app designed UI-first.', overview: 'Notes + tasks with Flask. Instant interactions.', problem: 'Note apps are bloated. Needed speed and opinion.', approach: 'UI-first. Server-rendered + progressive JS.', year: '2025', link: 'https://github.com/noxire-dev/moji', features: ['Markdown notes', 'Task lists', 'Tags', 'Dark mode'] },
  { id: 'lorekeeper', name: 'LoreKeeper', num: '03', tags: ['Python', 'PostgreSQL'], impact: 'Community platform for tabletop RPG resources.', overview: 'E-commerce for free TTRPG materials.', problem: 'Resources scattered across forums and Discord.', approach: 'Marketplace-style, no payments, community curation.', year: '2025', link: 'https://github.com/noxire-dev/LoreKeeper', features: ['User accounts', 'Search', 'Ratings', 'PDF viewer'] },
  { id: 'midnight', name: 'Midnight Moon', num: '04', tags: ['Design'], impact: 'Dark themes for VS Code. Reduced eye strain.', overview: 'Multiple variants. Semantic highlighting. Terminal colors.', problem: 'Dark themes lack ergonomic consideration.', approach: 'Color science. Daily iteration. Contrast testing.', year: '2024', link: 'https://github.com/noxire-dev/midnight-theme', features: ['Variants', 'Semantic tokens', 'Terminal', 'UI theming'] },
]

const blogPosts = [
  { id: 'v2-rebuild', title: 'Portfolio V2', date: '2025-11-19', readTime: '3 min', excerpt: 'Started over with React + TypeScript.', content: 'When I first started this 3 years ago, I used Flask. It felt magical.\n\nTime for a clean slate. React, TypeScript, Tailwind, Vite.\n\nEvery decision intentional.', tags: ['dev'] },
  { id: 'first-year', title: '96/100', date: '2025-08-28', readTime: '2 min', excerpt: 'First Class Honours at Essex.', content: 'First year at Essex — 96/100, First Class Honours.\n\nDecomposition: breaking problems into pieces.\n\nSecond year starts with momentum.', tags: ['uni'] },
  { id: 'learning-c', title: 'Learning C', date: '2025-02-23', readTime: '2 min', excerpt: 'Understanding everything built on top.', content: 'Started C to understand how Go, Rust, and C++ work.\n\nMy own string functions, my own linked list — clarity.\n\nEvery hour in C compounds.', tags: ['sys'] },
]

const skills = [
  { name: 'Python', pct: 95 }, { name: 'Go', pct: 80 }, { name: 'JavaScript', pct: 85 },
  { name: 'TypeScript', pct: 80 }, { name: 'Java', pct: 70 }, { name: 'C', pct: 45 },
  { name: 'React', pct: 75 }, { name: 'Flask', pct: 85 },
]

function Nav({ currentView, setView }: { currentView: View; setView: (v: View) => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b" style={{ background: `${BG}ee`, backdropFilter: 'blur(16px)', borderColor: BORDER }}>
      <div className="max-w-6xl mx-auto px-8 h-14 flex items-center justify-between">
        <button onClick={() => setView('home')} className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full" style={{ background: ICE }} />
          <span className="text-sm tracking-[0.3em] font-light" style={{ color: TEXT }}>SINA DILEK</span>
        </button>
        <div className="flex items-center gap-8 text-xs tracking-[0.2em]">
          <button onClick={() => setView('home')} className="transition-colors" style={{ color: currentView === 'home' ? ICE : MUTED }}>WORK</button>
          <button onClick={() => setView('blog')} className="transition-colors" style={{ color: (currentView === 'blog' || currentView === 'blog-post') ? ICE : MUTED }}>BLOG</button>
          <a href="mailto:contact@sinadilek.com" className="px-4 py-1.5 transition-colors" style={{ background: ICE, color: BG }}>CONTACT</a>
          <Link to="/" style={{ color: MUTED }}>←</Link>
        </div>
      </div>
    </nav>
  )
}

function ProjectPage({ projectId, setView }: { projectId: string; setView: (v: View) => void }) {
  const p = projects.find(x => x.id === projectId) || projects[0]
  return (
    <div className="pt-24 min-h-screen" style={{ background: BG }}>
      <div className="max-w-3xl mx-auto px-8 pb-24">
        <button onClick={() => setView('home')} className="text-xs mb-12 tracking-widest" style={{ color: MUTED }}><span style={{ color: ICE }}>←</span> WORK</button>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-4 mb-6"><span className="text-xs tracking-widest" style={{ color: ICE }}>{p.num}</span><span className="text-xs" style={{ color: MUTED }}>{p.year}</span></div>
          <h1 className="text-5xl font-light tracking-tight mb-4" style={{ color: TEXT }}>{p.name}</h1>
          <div className="flex gap-2 mb-8">{p.tags.map(t => <span key={t} className="text-[10px] px-2 py-1 tracking-widest" style={{ background: SURFACE, color: MUTED, border: `1px solid ${BORDER}` }}>{t}</span>)}</div>
          <div className="aspect-video mb-10 flex items-center justify-center" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
            <span className="text-xs tracking-widest" style={{ color: MUTED }}>PREVIEW</span>
          </div>
          {[{ l: 'IMPACT', t: p.impact }, { l: 'OVERVIEW', t: p.overview }, { l: 'PROBLEM', t: p.problem }, { l: 'APPROACH', t: p.approach }].map(s => (
            <div key={s.l} className="mb-8 pb-8 border-b" style={{ borderColor: BORDER }}>
              <span className="text-[10px] tracking-[0.3em] block mb-3" style={{ color: ICE }}>{s.l}</span>
              <p className="text-sm leading-relaxed font-light" style={{ color: MUTED }}>{s.t}</p>
            </div>
          ))}
          <div className="grid grid-cols-2 gap-px mb-8" style={{ background: BORDER }}>
            {p.features.map(f => <div key={f} className="p-4 text-sm font-light" style={{ background: SURFACE, color: MUTED }}>{f}</div>)}
          </div>
          <a href={p.link} target="_blank" rel="noopener" className="text-xs tracking-widest" style={{ color: ICE }}>GITHUB →</a>
        </motion.div>
      </div>
    </div>
  )
}

function BlogPage({ setView, setPost }: { setView: (v: View) => void; setPost: (s: string) => void }) {
  return (
    <div className="pt-24 min-h-screen" style={{ background: BG }}>
      <div className="max-w-3xl mx-auto px-8 pb-24">
        <h2 className="text-3xl font-light tracking-tight mb-12" style={{ color: TEXT }}>Blog</h2>
        {blogPosts.map((post, i) => (
          <motion.button key={post.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}
            onClick={() => { setPost(post.id); setView('blog-post') }}
            className="group w-full text-left py-8 border-b transition-colors" style={{ borderColor: BORDER }}
            onMouseEnter={e => e.currentTarget.style.borderColor = ICE} onMouseLeave={e => e.currentTarget.style.borderColor = BORDER}>
            <div className="flex justify-between items-start">
              <div><h3 className="text-lg font-light group-hover:text-[#7DD3FC] transition-colors" style={{ color: TEXT }}>{post.title}</h3><p className="text-xs mt-1 font-light" style={{ color: MUTED }}>{post.excerpt}</p></div>
              <span className="text-xs flex-shrink-0 ml-8" style={{ color: MUTED }}>{post.date}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

function BlogPostPage({ postId, setView }: { postId: string; setView: (v: View) => void }) {
  const post = blogPosts.find(p => p.id === postId) || blogPosts[0]
  return (
    <div className="pt-24 min-h-screen" style={{ background: BG }}>
      <div className="max-w-2xl mx-auto px-8 pb-24">
        <button onClick={() => setView('blog')} className="text-xs tracking-widest mb-8" style={{ color: MUTED }}><span style={{ color: ICE }}>←</span> BLOG</button>
        <motion.article initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <span className="text-xs" style={{ color: MUTED }}>{post.date} · {post.readTime}</span>
          <h1 className="text-3xl font-light tracking-tight mt-2 mb-10" style={{ color: TEXT }}>{post.title}</h1>
          {post.content.split('\n\n').map((p, i) => <p key={i} className="text-sm leading-relaxed font-light mb-4" style={{ color: MUTED }}>{p}</p>)}
        </motion.article>
      </div>
    </div>
  )
}

export default function Design40() {
  const [view, setView] = useState<View>('home')
  const [selectedProject, setSelectedProject] = useState('gosh')
  const [selectedPost, setSelectedPost] = useState('v2-rebuild')

  return (
    <div className="min-h-screen" style={{ background: BG, color: TEXT, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <style>{`::selection { background: ${ICE}; color: ${BG}; }`}</style>
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.025]" style={{ backgroundImage: `linear-gradient(${ICE} 1px, transparent 1px), linear-gradient(90deg, ${ICE} 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />

      <Nav currentView={view} setView={setView} />

      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Hero — ultra minimal */}
            <section className="min-h-screen flex items-center justify-center relative px-8">
              <div className="max-w-4xl w-full">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
                  <div className="flex items-center gap-4 mb-12">
                    <div className="w-16 h-px" style={{ background: ICE }} />
                    <span className="text-xs tracking-[0.4em] font-light" style={{ color: MUTED }}>DEVELOPER · ESSEX · 96/100</span>
                  </div>

                  <h1 className="text-[clamp(3rem,12vw,10rem)] font-extralight tracking-tight leading-[0.9] mb-12">
                    <span className="block" style={{ color: TEXT }}>Sina</span>
                    <span className="block" style={{ color: ICE }}>Dilek</span>
                  </h1>

                  <p className="text-lg font-light max-w-xl leading-relaxed mb-12" style={{ color: MUTED }}>
                    Product-minded developer. Clean code, clear design, things that work. Building tools and learning systems.
                  </p>

                  <div className="flex gap-4 text-xs tracking-widest">
                    <button onClick={() => document.getElementById('work-arctic')?.scrollIntoView({ behavior: 'smooth' })} className="px-6 py-3 transition-colors" style={{ background: ICE, color: BG }}>VIEW WORK</button>
                    <a href="mailto:contact@sinadilek.com" className="px-6 py-3 border transition-colors hover:border-[#7DD3FC]" style={{ borderColor: BORDER, color: MUTED }}>CONTACT</a>
                  </div>
                </motion.div>
              </div>

              <div className="absolute bottom-12 left-8 flex items-center gap-4">
                <div className="w-px h-12" style={{ background: `${ICE}40` }} />
                <span className="text-[10px] tracking-widest" style={{ color: MUTED }}>SCROLL</span>
              </div>
            </section>

            {/* Skills — horizontal bars */}
            <section className="py-24 px-8 border-t" style={{ borderColor: BORDER }}>
              <div className="max-w-4xl mx-auto">
                <span className="text-[10px] tracking-[0.3em] block mb-12" style={{ color: ICE }}>CAPABILITIES</span>
                <div className="space-y-3">
                  {skills.map((s, i) => (
                    <motion.div key={s.name} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: i * 0.05 }} viewport={{ once: true }}
                      className="flex items-center gap-6 group">
                      <span className="w-24 text-sm font-light text-right group-hover:text-[#7DD3FC] transition-colors" style={{ color: MUTED }}>{s.name}</span>
                      <div className="flex-1 h-px relative" style={{ background: BORDER }}>
                        <motion.div className="absolute inset-y-0 left-0 h-px" initial={{ width: 0 }} whileInView={{ width: `${s.pct}%` }} transition={{ delay: i * 0.08, duration: 0.8 }} viewport={{ once: true }} style={{ background: ICE, opacity: 0.6 }} />
                      </div>
                      <span className="text-[10px] tabular-nums w-8 text-right" style={{ color: MUTED }}>{s.pct}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Projects — clean cards */}
            <section id="work-arctic" className="py-24 px-8 border-t" style={{ borderColor: BORDER }}>
              <div className="max-w-4xl mx-auto">
                <span className="text-[10px] tracking-[0.3em] block mb-12" style={{ color: ICE }}>SELECTED WORK</span>
                <div className="grid md:grid-cols-2 gap-px" style={{ background: BORDER }}>
                  {projects.map((p, i) => (
                    <motion.button key={p.id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                      onClick={() => { setSelectedProject(p.id); setView('project') }}
                      className="group text-left p-8 transition-colors" style={{ background: SURFACE }}
                      onMouseEnter={e => e.currentTarget.style.background = `${ICE}08`} onMouseLeave={e => e.currentTarget.style.background = SURFACE}>
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-xs tracking-widest" style={{ color: ICE }}>{p.num}</span>
                        <span className="text-xs" style={{ color: MUTED }}>{p.year}</span>
                      </div>
                      <h3 className="text-2xl font-light tracking-tight mb-2 group-hover:text-[#7DD3FC] transition-colors">{p.name}</h3>
                      <div className="flex gap-2 mb-4">{p.tags.map(t => <span key={t} className="text-[9px] tracking-widest" style={{ color: MUTED }}>{t}</span>)}</div>
                      <span className="text-xs tracking-widest opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: ICE }}>VIEW →</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </section>

            {/* Blog preview */}
            <section className="py-24 px-8 border-t" style={{ borderColor: BORDER }}>
              <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                  <span className="text-[10px] tracking-[0.3em]" style={{ color: ICE }}>BLOG</span>
                  <button onClick={() => setView('blog')} className="text-xs tracking-widest" style={{ color: ICE }}>ALL →</button>
                </div>
                {blogPosts.map((post, i) => (
                  <motion.button key={post.id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                    onClick={() => { setSelectedPost(post.id); setView('blog-post') }}
                    className="group w-full text-left py-6 border-b flex justify-between items-center transition-colors" style={{ borderColor: BORDER }}>
                    <h3 className="text-lg font-light group-hover:text-[#7DD3FC] transition-colors">{post.title}</h3>
                    <span className="text-xs" style={{ color: MUTED }}>{post.date}</span>
                  </motion.button>
                ))}
              </div>
            </section>

            {/* Contact */}
            <footer className="py-24 px-8 border-t" style={{ borderColor: ICE }}>
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-extralight tracking-tight mb-12" style={{ color: TEXT }}>
                  Let's <span style={{ color: ICE }}>connect.</span>
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {[{ label: 'Email', value: 'contact@sinadilek.com', href: 'mailto:contact@sinadilek.com' }, { label: 'GitHub', value: 'noxire-dev', href: 'https://github.com/noxire-dev' }, { label: 'LinkedIn', value: 'sina-dilek', href: 'https://linkedin.com/in/sina-dilek-0b1b3b1b9' }].map(link => (
                    <a key={link.label} href={link.href} target={link.label !== 'Email' ? '_blank' : undefined} rel="noopener"
                      className="group py-4 border-b transition-colors" style={{ borderColor: BORDER }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = ICE} onMouseLeave={e => e.currentTarget.style.borderColor = BORDER}>
                      <span className="text-[10px] tracking-[0.3em] block mb-1" style={{ color: MUTED }}>{link.label.toUpperCase()}</span>
                      <span className="text-sm font-light group-hover:text-[#7DD3FC] transition-colors">{link.value}</span>
                    </a>
                  ))}
                </div>
                <div className="mt-16 text-xs" style={{ color: MUTED }}>© {new Date().getFullYear()} Sina Dilek · Arctic Grid</div>
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
