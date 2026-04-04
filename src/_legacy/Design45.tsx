import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { blogPosts, contactLinks, profileFacts, projects, skills, type View } from './prototypeData'

const T = {
  bg: '#0b0b11',
  surface: '#13131d',
  edge: '#242432',
  text: '#f2edf7',
  muted: '#9389a3',
  lavender: '#cdb4db',
  lilac: '#e7d8f0',
  glow: '#c3ff00',
}

function Nav({ currentView, setView }: { currentView: View; setView: (v: View) => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b" style={{ background: `${T.bg}d9`, borderColor: T.edge, backdropFilter: 'blur(18px)' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <button onClick={() => setView('home')} className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-black" style={{ borderColor: T.lavender, color: T.lavender }}>SD</div>
          <span className="hidden md:block text-sm" style={{ color: T.muted }}>Midnight Orbit</span>
        </button>
        <div className="flex items-center gap-7 text-sm tracking-[0.18em]">
          <button onClick={() => setView('home')} style={{ color: currentView === 'home' ? T.lavender : T.muted }}>WORK</button>
          <button onClick={() => setView('blog')} style={{ color: currentView === 'blog' || currentView === 'blog-post' ? T.lavender : T.muted }}>BLOG</button>
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
      <div className="max-w-5xl mx-auto px-6 md:px-10 pb-24">
        <button onClick={() => setView('home')} className="text-sm mb-10" style={{ color: T.muted }}>
          {'<-'} Back to work
        </button>
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}>
          <div className="grid md:grid-cols-[1fr,320px] gap-8 mb-10">
            <div>
              <div className="text-xs tracking-[0.22em] mb-3" style={{ color: T.lavender }}>{project.code}</div>
              <h1 className="text-5xl md:text-6xl font-black leading-none mb-3">{project.name}</h1>
              <p className="text-lg leading-relaxed max-w-2xl" style={{ color: T.muted }}>{project.impact}</p>
            </div>
            <div className="border rounded-[2rem] p-6" style={{ borderColor: T.edge, background: T.surface }}>
              <div className="text-xs tracking-[0.22em] mb-4" style={{ color: T.glow }}>SUMMARY</div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span style={{ color: T.muted }}>Year</span><span>{project.year}</span></div>
                <div className="flex justify-between"><span style={{ color: T.muted }}>Status</span><span>{project.status}</span></div>
                <div className="flex justify-between"><span style={{ color: T.muted }}>Stack</span><span>{project.stack[0]}</span></div>
              </div>
            </div>
          </div>
          <div className="aspect-video rounded-[2rem] border mb-10 flex items-center justify-center" style={{ borderColor: T.edge, background: T.surface }}>
            <span style={{ color: T.muted }}>[ preview ]</span>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border rounded-[2rem] p-8" style={{ borderColor: T.edge, background: T.surface }}>
              <div className="text-xs tracking-[0.22em] mb-4" style={{ color: T.lavender }}>DESCRIPTION</div>
              <p className="leading-relaxed mb-6" style={{ color: T.muted }}>{project.description}</p>
              <div className="text-xs tracking-[0.22em] mb-3" style={{ color: T.glow }}>CHALLENGE</div>
              <p className="leading-relaxed" style={{ color: T.muted }}>{project.challenge}</p>
            </div>
            <div className="border rounded-[2rem] p-8" style={{ borderColor: T.edge, background: T.surface }}>
              <div className="text-xs tracking-[0.22em] mb-4" style={{ color: T.lavender }}>APPROACH</div>
              <p className="leading-relaxed mb-6" style={{ color: T.muted }}>{project.approach}</p>
              <ul className="space-y-3">
                {project.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <span style={{ color: T.lavender }}>o</span>
                    <span style={{ color: T.muted }}>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
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
        <h1 className="text-4xl font-black mb-10">Writing</h1>
        <div className="grid gap-4">
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
              className="text-left border rounded-[1.5rem] p-6"
              style={{ borderColor: T.edge, background: T.surface }}
            >
              <div className="text-xs tracking-[0.2em] mb-3" style={{ color: T.muted }}>{post.date} / {post.readTime}</div>
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
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
          {'<-'} Back to writing
        </button>
        <motion.article initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-sm mb-3" style={{ color: T.muted }}>{post.date} / {post.readTime}</div>
          <h1 className="text-4xl font-black mb-6">{post.title}</h1>
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full text-xs" style={{ background: `${T.lavender}20`, color: T.lavender }}>#{tag}</span>
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

export default function Design45() {
  const [view, setView] = useState<View>('home')
  const [selectedProject, setSelectedProject] = useState(projects[0].id)
  const [selectedPost, setSelectedPost] = useState(blogPosts[0].id)
  const shellRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: shellRef })
  const ringScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85])

  return (
    <div ref={shellRef} className="min-h-screen overflow-x-hidden selection:bg-[#cdb4db] selection:text-[#0b0b11]" style={{ background: T.bg, color: T.text }}>
      <div className="fixed inset-0 pointer-events-none">
        <motion.div style={{ scale: ringScale }} className="absolute top-20 right-[-10rem] w-[32rem] h-[32rem] rounded-full border opacity-50" />
        <div className="absolute top-20 right-[-10rem] w-[32rem] h-[32rem] rounded-full border opacity-50" style={{ borderColor: `${T.lavender}55` }} />
        <div className="absolute top-32 right-[-6rem] w-[24rem] h-[24rem] rounded-full border" style={{ borderColor: `${T.lilac}35` }} />
        <div className="absolute left-[-8rem] bottom-[-8rem] w-[28rem] h-[28rem] rounded-full blur-3xl opacity-20" style={{ background: T.lavender }} />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `linear-gradient(${T.edge} 1px, transparent 1px), linear-gradient(90deg, ${T.edge} 1px, transparent 1px)`, backgroundSize: '72px 72px' }} />
      </div>

      <Nav currentView={view} setView={setView} />

      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10">
            <section className="min-h-screen flex items-center px-6 md:px-10 pt-16">
              <div className="max-w-6xl mx-auto w-full grid md:grid-cols-[1.1fr,0.9fr] gap-10 items-center">
                <div>
                  <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border mb-8 text-xs tracking-[0.22em]" style={{ borderColor: T.edge, background: `${T.lavender}12`, color: T.lavender }}>
                    <div className="w-2 h-2 rounded-full" style={{ background: T.glow }} />
                    MIDNIGHT ORBIT
                  </div>
                  <h1 className="text-[16vw] md:text-[8vw] leading-[0.86] font-black tracking-tight">
                    Sina
                    <br />
                    <span style={{ color: T.lavender }}>Dilek</span>
                  </h1>
                  <p className="mt-7 text-xl max-w-2xl leading-relaxed" style={{ color: T.muted }}>
                    This hybrid leans into the mood and color confidence of design 26, but keeps the reading order and practical content pacing closer to 23 and 32.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <button onClick={() => document.getElementById('orbit-work')?.scrollIntoView({ behavior: 'smooth' })} className="px-6 py-3 rounded-full font-semibold" style={{ background: T.lavender, color: T.bg }}>
                      View work
                    </button>
                    <a href="mailto:contact@sinadilek.com" className="px-6 py-3 rounded-full border font-semibold" style={{ borderColor: T.edge }}>
                      Contact
                    </a>
                  </div>
                </div>

                <div className="grid gap-4">
                  {profileFacts.map((fact, index) => (
                    <motion.div
                      key={fact.label}
                      initial={{ opacity: 0, x: 18 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.07 }}
                      className="border rounded-[1.75rem] p-5"
                      style={{ borderColor: T.edge, background: T.surface }}
                    >
                      <div className="text-xs tracking-[0.22em] mb-2" style={{ color: T.muted }}>{fact.label.toUpperCase()}</div>
                      <div className="text-xl font-semibold">{fact.value}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            <section className="px-6 md:px-10 pb-24">
              <div className="max-w-6xl mx-auto grid md:grid-cols-[0.9fr,1.1fr] gap-6">
                <div className="border rounded-[2rem] p-8" style={{ borderColor: T.edge, background: T.surface }}>
                  <div className="text-xs tracking-[0.22em] mb-4" style={{ color: T.lavender }}>INTENT</div>
                  <h2 className="text-3xl font-semibold leading-tight mb-4">Atmosphere matters. Clarity still wins.</h2>
                  <p className="leading-relaxed" style={{ color: T.muted }}>
                    The visual system should feel considered, but it should not compete with the work. This version tries to hold both.
                  </p>
                </div>
                <div className="border rounded-[2rem] p-8" style={{ borderColor: T.edge, background: T.surface }}>
                  <div className="text-xs tracking-[0.22em] mb-4" style={{ color: T.glow }}>STACK SNAPSHOT</div>
                  <div className="flex flex-wrap gap-3">
                    {skills.map((skill) => (
                      <span key={skill.name} className="px-4 py-2 rounded-full text-sm" style={{ background: skill.kind === 'core' ? `${T.lavender}18` : `${T.glow}12`, color: skill.kind === 'core' ? T.lavender : T.text }}>
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section id="orbit-work" className="px-6 md:px-10 pb-24">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-3 h-3 rounded-full" style={{ background: T.lavender }} />
                  <span className="text-sm tracking-[0.25em]" style={{ color: T.muted }}>SELECTED WORK</span>
                </div>
                <div className="space-y-4">
                  {projects.map((project, index) => (
                    <motion.button
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.07 }}
                      onClick={() => {
                        setSelectedProject(project.id)
                        setView('project')
                      }}
                      className="group w-full text-left border rounded-[2rem] p-8 transition-colors"
                      style={{ borderColor: T.edge, background: T.surface }}
                    >
                      <div className="grid md:grid-cols-[120px,1fr,120px] gap-5 items-center">
                        <div className="text-5xl font-black" style={{ color: `${T.lavender}44` }}>{project.code.slice(-3)}</div>
                        <div>
                          <h3 className="text-3xl font-semibold mb-2">{project.name}</h3>
                          <p style={{ color: T.muted }}>{project.impact}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-xs tracking-[0.22em] mb-2" style={{ color: T.muted }}>{project.year}</div>
                          <div className="font-semibold" style={{ color: T.lavender }}>Open</div>
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
                    className="text-left border rounded-[2rem] p-7"
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
                <div className="border rounded-[2rem] p-8" style={{ borderColor: T.edge, background: T.surface }}>
                  <div className="text-xs tracking-[0.22em] mb-4" style={{ color: T.glow }}>CONTACT</div>
                  <h2 className="text-4xl font-semibold leading-tight">Soft palette. Hard edges where they matter.</h2>
                </div>
                <div className="space-y-3">
                  {contactLinks.map((link) => (
                    <a key={link.label} href={link.href} target={link.label !== 'Email' ? '_blank' : undefined} rel="noopener" className="flex items-center justify-between border rounded-[1.5rem] p-5" style={{ borderColor: T.edge, background: T.surface }}>
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
