import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { blogPosts, contactLinks, profileFacts, projects, skills, type View } from './prototypeData'

const T = {
  bg: '#0e0d13',
  surface: '#17151f',
  panel: '#111018',
  edge: '#262233',
  text: '#f1edf7',
  muted: '#8d859b',
  accent: '#cdb4db',
  signal: '#c3ff00',
}

function Nav({ currentView, setView }: { currentView: View; setView: (v: View) => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b" style={{ background: `${T.bg}ee`, borderColor: T.edge, backdropFilter: 'blur(14px)' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <button onClick={() => setView('home')} className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm flex items-center justify-center text-xs font-black" style={{ background: T.accent, color: T.bg }}>SD</div>
          <span className="hidden md:block text-sm" style={{ color: T.muted }}>Operator Lavender</span>
        </button>
        <div className="flex items-center gap-7 text-sm tracking-[0.18em]">
          <button onClick={() => setView('home')} style={{ color: currentView === 'home' ? T.accent : T.muted }}>WORK</button>
          <button onClick={() => setView('blog')} style={{ color: currentView === 'blog' || currentView === 'blog-post' ? T.accent : T.muted }}>LOG</button>
          <Link to="/" style={{ color: T.muted }}>EXIT</Link>
        </div>
      </div>
    </nav>
  )
}

function ProjectPage({ projectId, setView }: { projectId: string; setView: (v: View) => void }) {
  const project = projects.find((entry) => entry.id === projectId) ?? projects[0]

  return (
    <div className="pt-24 min-h-screen" style={{ background: T.bg, color: T.text }}>
      <div className="max-w-4xl mx-auto px-6 md:px-10 pb-24">
        <button onClick={() => setView('home')} className="text-sm mb-10" style={{ color: T.muted }}>
          {'<-'} Back to work
        </button>

        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}>
          <div className="border mb-8" style={{ borderColor: T.edge, background: T.surface }}>
            <div className="flex items-center justify-between px-4 py-2 border-b text-xs tracking-[0.22em]" style={{ borderColor: T.edge, color: T.muted }}>
              <span>{project.code}</span>
              <span style={{ color: T.signal }}>{project.status}</span>
            </div>
            <div className="p-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-3">{project.name}</h1>
              <p className="text-lg leading-relaxed" style={{ color: T.muted }}>{project.impact}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-10">
            {profileFacts.slice(1).map((fact) => (
              <div key={fact.label} className="border p-4" style={{ borderColor: T.edge, background: T.panel }}>
                <div className="text-[11px] tracking-[0.22em] mb-2" style={{ color: T.muted }}>{fact.label.toUpperCase()}</div>
                <div className="font-semibold">{fact.value}</div>
              </div>
            ))}
          </div>

          <div className="aspect-video border mb-10 flex items-center justify-center" style={{ borderColor: T.edge, background: T.panel }}>
            <span style={{ color: T.muted }}>[ preview ]</span>
          </div>

          <div className="space-y-8">
            {[{ label: 'Overview', text: project.description }, { label: 'Problem', text: project.challenge }, { label: 'Approach', text: project.approach }].map((section) => (
              <div key={section.label} className="border p-6" style={{ borderColor: T.edge, background: T.surface }}>
                <div className="text-[11px] tracking-[0.22em] mb-3" style={{ color: T.accent }}>{section.label.toUpperCase()}</div>
                <p className="leading-relaxed" style={{ color: T.muted }}>{section.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 border p-6" style={{ borderColor: T.edge, background: T.panel }}>
            <div className="text-[11px] tracking-[0.22em] mb-4" style={{ color: T.signal }}>FEATURES</div>
            <ul className="space-y-3">
              {project.features.map((feature, index) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="font-mono text-xs mt-1" style={{ color: T.signal }}>{String(index + 1).padStart(2, '0')}</span>
                  <span style={{ color: T.muted }}>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function BlogListPage({ setView, setSelectedPost }: { setView: (v: View) => void; setSelectedPost: (id: string) => void }) {
  return (
    <div className="pt-24 min-h-screen" style={{ background: T.bg, color: T.text }}>
      <div className="max-w-4xl mx-auto px-6 md:px-10 pb-24">
        <h1 className="text-4xl font-bold mb-10">Log</h1>
        <div className="space-y-3">
          {blogPosts.map((post, index) => (
            <motion.button
              key={post.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              onClick={() => {
                setSelectedPost(post.id)
                setView('blog-post')
              }}
              className="w-full text-left border p-5 transition-colors"
              style={{ borderColor: T.edge, background: T.surface }}
            >
              <div className="flex items-center gap-3 text-xs tracking-[0.2em]" style={{ color: T.muted }}>
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="text-xl font-semibold mt-3 mb-2">{post.title}</h2>
              <p style={{ color: T.muted }}>{post.excerpt}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}

function BlogPostPage({ postId, setView }: { postId: string; setView: (v: View) => void }) {
  const post = blogPosts.find((entry) => entry.id === postId) ?? blogPosts[0]

  return (
    <div className="pt-24 min-h-screen" style={{ background: T.bg, color: T.text }}>
      <div className="max-w-3xl mx-auto px-6 md:px-10 pb-24">
        <button onClick={() => setView('blog')} className="text-sm mb-10" style={{ color: T.muted }}>
          {'<-'} Back to log
        </button>
        <motion.article initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-sm mb-3" style={{ color: T.muted }}>{post.date} / {post.readTime}</div>
          <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 text-xs border" style={{ borderColor: T.edge, background: T.surface }}>#{tag}</span>
            ))}
          </div>
          <div className="space-y-5">
            {post.content.split('\n\n').map((paragraph) => (
              <p key={paragraph} className="leading-relaxed" style={{ color: T.muted }}>{paragraph}</p>
            ))}
          </div>
        </motion.article>
      </div>
    </div>
  )
}

export default function Design43() {
  const [view, setView] = useState<View>('home')
  const [selectedProject, setSelectedProject] = useState(projects[0].id)
  const [selectedPost, setSelectedPost] = useState(blogPosts[0].id)
  const featuredProjects = useMemo(() => projects.slice(0, 3), [])

  return (
    <div className="min-h-screen selection:bg-[#cdb4db] selection:text-[#0e0d13]" style={{ background: T.bg, color: T.text }}>
      <div className="fixed inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(${T.edge} 1px, transparent 1px), linear-gradient(90deg, ${T.edge} 1px, transparent 1px)`, backgroundSize: '80px 80px', opacity: 0.18 }} />
      <Nav currentView={view} setView={setView} />

      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10">
            <section className="min-h-screen flex items-center px-6 md:px-10 pt-16">
              <div className="max-w-6xl mx-auto w-full grid md:grid-cols-[1.1fr,0.9fr] gap-8 items-end">
                <div>
                  <div className="inline-flex items-center gap-3 px-4 py-2 border mb-7 text-xs tracking-[0.22em]" style={{ borderColor: T.edge, background: T.surface, color: T.muted }}>
                    <div className="w-2 h-2 rounded-full" style={{ background: T.signal }} />
                    RECRUITER-FIRST HYBRID
                  </div>
                  <h1 className="text-[14vw] md:text-[7vw] font-bold leading-[0.9] tracking-tight">
                    Sina Dilek
                  </h1>
                  <p className="mt-6 text-xl max-w-2xl leading-relaxed" style={{ color: T.muted }}>
                    This version mixes the clarity of your strongest portfolio system with the panel logic of the dashboard designs, while keeping the atmosphere calmer than the louder concepts.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <button onClick={() => document.getElementById('operator-work')?.scrollIntoView({ behavior: 'smooth' })} className="px-6 py-3 font-semibold" style={{ background: T.accent, color: T.bg }}>
                      View work
                    </button>
                    <a href="mailto:contact@sinadilek.com" className="px-6 py-3 border font-semibold" style={{ borderColor: T.edge, color: T.text }}>
                      Contact
                    </a>
                  </div>
                </div>

                <div className="border" style={{ borderColor: T.edge, background: T.surface }}>
                  <div className="flex items-center justify-between px-4 py-2 border-b text-[11px] tracking-[0.22em]" style={{ borderColor: T.edge, color: T.muted }}>
                    <span>PROFILE</span>
                    <span style={{ color: T.signal }}>READY</span>
                  </div>
                  <div className="p-5 grid gap-3">
                    {profileFacts.map((fact) => (
                      <div key={fact.label} className="flex items-center justify-between border px-4 py-3" style={{ borderColor: T.edge, background: T.panel }}>
                        <span className="text-[11px] tracking-[0.22em]" style={{ color: T.muted }}>{fact.label.toUpperCase()}</span>
                        <span className="font-medium">{fact.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="px-6 md:px-10 pb-24">
              <div className="max-w-6xl mx-auto grid md:grid-cols-[0.7fr,1.3fr] gap-6">
                <div className="border p-6" style={{ borderColor: T.edge, background: T.surface }}>
                  <div className="text-[11px] tracking-[0.22em] mb-4" style={{ color: T.accent }}>POSITIONING</div>
                  <h2 className="text-3xl font-semibold leading-tight mb-4">Fast to scan. Strong enough to remember.</h2>
                  <p className="leading-relaxed" style={{ color: T.muted }}>
                    The point here is not maximum style. The point is that the style helps the content land faster.
                  </p>
                </div>
                <div className="border p-6" style={{ borderColor: T.edge, background: T.panel }}>
                  <div className="text-[11px] tracking-[0.22em] mb-5" style={{ color: T.signal }}>CAPABILITIES</div>
                  <div className="space-y-3">
                    {skills.map((skill, index) => (
                      <div key={skill.name} className="grid grid-cols-[90px,1fr,48px] gap-4 items-center">
                        <span className="text-sm" style={{ color: T.text }}>{skill.name}</span>
                        <div className="h-2 relative" style={{ background: T.edge }}>
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.04, duration: 0.5 }}
                            className="absolute inset-y-0 left-0"
                            style={{ background: skill.kind === 'core' ? T.accent : skill.kind === 'framework' ? T.signal : `${T.accent}88` }}
                          />
                        </div>
                        <span className="text-xs tabular-nums text-right" style={{ color: T.muted }}>{skill.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section id="operator-work" className="px-6 md:px-10 pb-24">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-2 h-2 rounded-full" style={{ background: T.accent }} />
                  <span className="text-[11px] tracking-[0.25em]" style={{ color: T.muted }}>FEATURED WORK</span>
                </div>
                <div className="space-y-4">
                  {featuredProjects.map((project, index) => (
                    <motion.button
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08 }}
                      onClick={() => {
                        setSelectedProject(project.id)
                        setView('project')
                      }}
                      className="group w-full text-left border overflow-hidden"
                      style={{ borderColor: T.edge, background: T.surface }}
                    >
                      <div className="grid md:grid-cols-[0.9fr,1.1fr]">
                        <div className="aspect-video md:aspect-auto flex items-center justify-center" style={{ background: T.panel }}>
                          <span className="text-6xl font-bold" style={{ color: `${T.accent}33` }}>{project.code.slice(-3)}</span>
                        </div>
                        <div className="p-8">
                          <div className="flex items-center gap-2 mb-4 text-xs tracking-[0.22em]" style={{ color: T.muted }}>
                            <span>{project.year}</span>
                            <span style={{ color: T.signal }}>{project.status}</span>
                          </div>
                          <h3 className="text-3xl font-semibold mb-3">{project.name}</h3>
                          <p className="mb-5 leading-relaxed" style={{ color: T.muted }}>{project.impact}</p>
                          <span className="font-semibold" style={{ color: T.accent }}>View case study</span>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </section>

            <section className="px-6 md:px-10 pb-24">
              <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-4">
                {blogPosts.slice(0, 2).map((post, index) => (
                  <motion.button
                    key={post.id}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    onClick={() => {
                      setSelectedPost(post.id)
                      setView('blog-post')
                    }}
                    className="text-left border p-6"
                    style={{ borderColor: T.edge, background: T.surface }}
                  >
                    <div className="text-xs tracking-[0.22em] mb-3" style={{ color: T.muted }}>{post.date}</div>
                    <h3 className="text-2xl font-semibold mb-2">{post.title}</h3>
                    <p style={{ color: T.muted }}>{post.excerpt}</p>
                  </motion.button>
                ))}
              </div>
            </section>

            <footer className="px-6 md:px-10 pb-24">
              <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr,1fr] gap-4">
                <div className="border p-8" style={{ borderColor: T.edge, background: T.panel }}>
                  <div className="text-[11px] tracking-[0.22em] mb-4" style={{ color: T.signal }}>CONTACT</div>
                  <h2 className="text-4xl font-semibold leading-tight">Clear enough for hiring managers. Distinct enough to feel like you.</h2>
                </div>
                <div className="space-y-3">
                  {contactLinks.map((link) => (
                    <a key={link.label} href={link.href} target={link.label !== 'Email' ? '_blank' : undefined} rel="noopener" className="flex items-center justify-between border p-5" style={{ borderColor: T.edge, background: T.surface }}>
                      <span>{link.label}</span>
                      <span style={{ color: T.muted }}>{link.value}</span>
                    </a>
                  ))}
                </div>
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
