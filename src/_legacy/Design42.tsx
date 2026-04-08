import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { blogPosts, contactLinks, profileFacts, projects, skills, type View } from './prototypeData'

const T = {
  bg: '#f5f0f7',
  panel: '#ffffff',
  ink: '#121018',
  accent: '#b48ac8',
  accentSoft: '#eadcf1',
  muted: '#6c6275',
  edge: '#1d1724',
}

function Nav({ currentView, setView }: { currentView: View; setView: (v: View) => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b-2" style={{ background: `${T.bg}ee`, borderColor: T.edge, backdropFilter: 'blur(10px)' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <button onClick={() => setView('home')} className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2" style={{ borderColor: T.accent, background: T.accentSoft }} />
          <span className="font-black tracking-tight" style={{ color: T.ink }}>SD</span>
        </button>
        <div className="flex items-center gap-6 text-sm tracking-[0.2em]">
          <button onClick={() => setView('home')} style={{ color: currentView === 'home' ? T.accent : T.muted }}>WORK</button>
          <button onClick={() => setView('blog')} style={{ color: currentView === 'blog' || currentView === 'blog-post' ? T.accent : T.muted }}>BLOG</button>
          <Link to="/" style={{ color: T.muted }}>EXIT</Link>
        </div>
      </div>
    </nav>
  )
}

function ProjectPage({ projectId, setView }: { projectId: string; setView: (v: View) => void }) {
  const project = projects.find((entry) => entry.id === projectId) ?? projects[0]

  return (
    <div className="pt-24 min-h-screen" style={{ background: T.bg, color: T.ink }}>
      <div className="max-w-5xl mx-auto px-6 md:px-10 pb-20">
        <button onClick={() => setView('home')} className="text-sm mb-10" style={{ color: T.muted }}>
          {'<-'} Back to work
        </button>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
          <div className="grid md:grid-cols-[120px,1fr] gap-6 items-start mb-8">
            <div className="text-7xl font-black" style={{ color: T.accent }}>{project.code.slice(-3)}</div>
            <div>
              <h1 className="text-5xl md:text-6xl font-black leading-none mb-3">{project.name}</h1>
              <p className="text-lg max-w-2xl" style={{ color: T.muted }}>{project.impact}</p>
            </div>
          </div>

          <div className="aspect-video border-2 mb-10 flex items-center justify-center" style={{ background: T.panel, borderColor: T.edge }}>
            <span style={{ color: T.muted }}>[ project preview ]</span>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-10">
            {[{ label: 'YEAR', value: project.year }, { label: 'STACK', value: project.stack.join(' / ') }, { label: 'STATUS', value: project.status }].map((item) => (
              <div key={item.label} className="border-2 p-4" style={{ background: T.panel, borderColor: T.edge }}>
                <div className="text-xs tracking-[0.2em] mb-2" style={{ color: T.muted }}>{item.label}</div>
                <div className="font-bold">{item.value}</div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-black mb-4">Context</h2>
              <p className="leading-relaxed mb-5" style={{ color: T.muted }}>{project.description}</p>
              <h3 className="text-lg font-bold mb-3">Challenge</h3>
              <p className="leading-relaxed" style={{ color: T.muted }}>{project.challenge}</p>
            </div>
            <div>
              <h2 className="text-2xl font-black mb-4">Approach</h2>
              <p className="leading-relaxed mb-5" style={{ color: T.muted }}>{project.approach}</p>
              <ul className="space-y-3">
                {project.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <span style={{ color: T.accent }}>[]</span>
                    <span style={{ color: T.muted }}>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <a href={project.link} target="_blank" rel="noopener" className="inline-block mt-10 px-6 py-3 font-bold border-2" style={{ borderColor: T.edge, background: T.accentSoft }}>
            View on GitHub
          </a>
        </motion.div>
      </div>
    </div>
  )
}

function BlogListPage({ setView, setSelectedPost }: { setView: (v: View) => void; setSelectedPost: (id: string) => void }) {
  return (
    <div className="pt-24 min-h-screen" style={{ background: T.bg, color: T.ink }}>
      <div className="max-w-5xl mx-auto px-6 md:px-10 pb-20">
        <h1 className="text-5xl font-black mb-10">Writing</h1>
        <div className="space-y-4">
          {blogPosts.map((post, index) => (
            <motion.button
              key={post.id}
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              onClick={() => {
                setSelectedPost(post.id)
                setView('blog-post')
              }}
              className="group w-full text-left border-2 p-6 transition-colors"
              style={{ borderColor: T.edge, background: T.panel }}
            >
              <div className="flex items-center gap-3 text-xs tracking-[0.2em]" style={{ color: T.muted }}>
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="text-2xl font-black mt-3 mb-2 group-hover:opacity-80">{post.title}</h2>
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
    <div className="pt-24 min-h-screen" style={{ background: T.bg, color: T.ink }}>
      <div className="max-w-3xl mx-auto px-6 md:px-10 pb-20">
        <button onClick={() => setView('blog')} className="text-sm mb-10" style={{ color: T.muted }}>
          {'<-'} Back to blog
        </button>
        <motion.article initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-sm mb-3" style={{ color: T.muted }}>{post.date} / {post.readTime}</div>
          <h1 className="text-4xl md:text-5xl font-black mb-6">{post.title}</h1>
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 text-xs border-2" style={{ borderColor: T.edge, background: T.panel }}>#{tag}</span>
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

export default function Design42() {
  const [view, setView] = useState<View>('home')
  const [selectedProject, setSelectedProject] = useState(projects[0].id)
  const [selectedPost, setSelectedPost] = useState(blogPosts[0].id)
  const shellRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: shellRef })
  const orbY = useTransform(scrollYProgress, [0, 0.4], [0, 120])

  return (
    <div ref={shellRef} className="min-h-screen overflow-x-hidden selection:bg-[#b48ac8] selection:text-[#121018]" style={{ background: T.bg, color: T.ink }}>
      <div className="fixed inset-0 pointer-events-none">
        <motion.div style={{ y: orbY }} className="absolute -top-24 -right-24 w-[42rem] h-[42rem] rounded-full" />
        <div className="absolute -top-24 -right-24 w-[42rem] h-[42rem] rounded-full opacity-70" style={{ background: `radial-gradient(circle, ${T.accentSoft} 0%, rgba(234,220,241,0) 70%)` }} />
        <div className="absolute bottom-0 left-0 w-[32rem] h-[12rem] -skew-x-12" style={{ background: T.edge }} />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `linear-gradient(${T.edge} 1px, transparent 1px), linear-gradient(90deg, ${T.edge} 1px, transparent 1px)`, backgroundSize: '72px 72px' }} />
      </div>

      <Nav currentView={view} setView={setView} />

      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10">
            <section className="min-h-screen flex items-center px-6 md:px-10 pt-16">
              <div className="max-w-6xl mx-auto w-full">
                <div className="grid md:grid-cols-[1.3fr,0.7fr] gap-10 items-end">
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-8 h-8 rounded-full border-2" style={{ borderColor: T.accent, background: T.accentSoft }} />
                      <span className="text-sm tracking-[0.35em]" style={{ color: T.muted }}>SIGNAL BRUTALIST</span>
                    </div>
                    <h1 className="text-[18vw] md:text-[10vw] leading-[0.82] font-black tracking-tighter">
                      <span className="block">SINA</span>
                      <span className="block" style={{ color: T.accent }}>DILEK</span>
                    </h1>
                    <p className="mt-8 text-lg md:text-xl max-w-2xl leading-relaxed" style={{ color: T.muted }}>
                      Bold structure from constructivist layouts, calmer atmosphere from pastel midnight systems, and clearer content framing for an actual portfolio.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <button onClick={() => document.getElementById('signal-work')?.scrollIntoView({ behavior: 'smooth' })} className="px-6 py-3 font-bold border-2" style={{ borderColor: T.edge, background: T.edge, color: T.bg }}>
                        View work
                      </button>
                      <a href="mailto:contact@sinadilek.com" className="px-6 py-3 font-bold border-2" style={{ borderColor: T.edge }}>
                        Contact
                      </a>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {profileFacts.map((fact) => (
                      <div key={fact.label} className="border-2 p-5" style={{ background: T.panel, borderColor: T.edge }}>
                        <div className="text-xs tracking-[0.25em] mb-2" style={{ color: T.muted }}>{fact.label.toUpperCase()}</div>
                        <div className="text-xl font-black">{fact.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="relative z-10 px-6 md:px-10 pb-24">
              <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-0 border-2" style={{ borderColor: T.edge }}>
                <div className="p-10 border-b-2 md:border-b-0 md:border-r-2" style={{ background: T.edge, borderColor: T.edge, color: T.bg }}>
                  <div className="text-xs tracking-[0.3em] mb-4">ABOUT</div>
                  <h2 className="text-4xl md:text-5xl font-black leading-none mb-5">
                    Geometry up front.
                    <br />
                    Readability underneath.
                  </h2>
                  <p className="leading-relaxed text-white/75">
                    This prototype mixes the exposed graphic confidence of your constructivist favorites with the softer palette and calmer pacing that made design 26 work.
                  </p>
                </div>
                <div className="p-10" style={{ background: T.panel }}>
                  <div className="text-xs tracking-[0.3em] mb-4" style={{ color: T.muted }}>STACK</div>
                  <div className="flex flex-wrap gap-3">
                    {skills.map((skill) => (
                      <span key={skill.name} className="px-4 py-2 border-2 text-sm font-medium" style={{ borderColor: T.edge, background: skill.kind === 'core' ? T.accentSoft : T.panel }}>
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section id="signal-work" className="relative z-10 px-6 md:px-10 pb-24">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-4 h-4 rounded-full" style={{ background: T.accent }} />
                  <span className="text-sm tracking-[0.3em]" style={{ color: T.muted }}>SELECTED WORK</span>
                </div>
                <div className="grid md:grid-cols-2 gap-0 border-2" style={{ borderColor: T.edge }}>
                  {projects.map((project, index) => (
                    <motion.button
                      key={project.id}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08 }}
                      onClick={() => {
                        setSelectedProject(project.id)
                        setView('project')
                      }}
                      className={`group p-8 text-left transition-colors ${
                        index % 2 === 0 ? 'md:border-r-2' : ''
                      } ${index < 2 ? 'border-b-2' : ''}`}
                      style={{ borderColor: T.edge, background: T.panel }}
                    >
                      <div className="flex justify-between items-start mb-5">
                        <span className="text-6xl font-black" style={{ color: T.accentSoft }}>{project.code.slice(-3)}</span>
                        <span className="text-xs tracking-[0.2em]" style={{ color: T.muted }}>{project.year}</span>
                      </div>
                      <h3 className="text-3xl font-black mb-2 group-hover:opacity-75">{project.name}</h3>
                      <p className="mb-4" style={{ color: T.muted }}>{project.short}</p>
                      <div className="text-sm font-bold" style={{ color: T.accent }}>Open case study</div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </section>

            <section className="relative z-10 px-6 md:px-10 pb-24">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 rounded-full" style={{ background: T.accent }} />
                    <span className="text-sm tracking-[0.3em]" style={{ color: T.muted }}>RECENT WRITING</span>
                  </div>
                  <button onClick={() => setView('blog')} className="font-bold" style={{ color: T.accent }}>View all</button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {blogPosts.slice(0, 2).map((post, index) => (
                    <motion.button
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08 }}
                      onClick={() => {
                        setSelectedPost(post.id)
                        setView('blog-post')
                      }}
                      className="group p-8 text-left border-2 transition-colors"
                      style={{ background: T.panel, borderColor: T.edge }}
                    >
                      <div className="text-xs tracking-[0.2em] mb-3" style={{ color: T.muted }}>{post.date} / {post.readTime}</div>
                      <h3 className="text-2xl font-black mb-2">{post.title}</h3>
                      <p style={{ color: T.muted }}>{post.excerpt}</p>
                    </motion.button>
                  ))}
                </div>
              </div>
            </section>

            <footer className="relative z-10 px-6 md:px-10 pb-24">
              <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr,0.9fr] gap-6 border-2" style={{ borderColor: T.edge }}>
                <div className="p-10" style={{ background: T.edge, color: T.bg }}>
                  <div className="text-xs tracking-[0.3em] mb-4">CONNECT</div>
                  <h2 className="text-5xl md:text-6xl font-black leading-none">Clear shape. Strong signal.</h2>
                </div>
                <div className="p-10 space-y-4" style={{ background: T.panel }}>
                  {contactLinks.map((link) => (
                    <a key={link.label} href={link.href} target={link.label !== 'Email' ? '_blank' : undefined} rel="noopener" className="flex items-center justify-between border-2 p-4 font-medium" style={{ borderColor: T.edge }}>
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
