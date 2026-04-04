import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { blogPosts, contactLinks, profileFacts, projects, skills, type View } from './prototypeData'

const T = {
  bg: '#09090b',
  surface: '#121216',
  surface2: '#17171c',
  edge: '#2a2a31',
  text: '#f3f3f0',
  muted: '#9a9a93',
  accent: '#d0ff71',
  accentSoft: '#252f18',
}

function Nav({ currentView, setView }: { currentView: View; setView: (v: View) => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b" style={{ background: `${T.bg}e6`, borderColor: T.edge, backdropFilter: 'blur(14px)' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <button onClick={() => setView('home')} className="flex items-center gap-3">
          <div className="w-8 h-8 border flex items-center justify-center text-xs font-bold" style={{ borderColor: T.edge, background: T.surface2 }}>SD</div>
          <span className="text-sm" style={{ color: T.muted }}>Sina Dilek</span>
        </button>
        <div className="flex items-center gap-7 text-sm tracking-[0.18em]">
          <button onClick={() => setView('home')} style={{ color: currentView === 'home' ? T.text : T.muted }}>WORK</button>
          <button onClick={() => setView('blog')} style={{ color: currentView === 'blog' || currentView === 'blog-post' ? T.text : T.muted }}>BLOG</button>
          <Link to="/" style={{ color: T.muted }}>EXIT</Link>
        </div>
      </div>
    </nav>
  )
}

function EditorPreview() {
  return (
    <div className="border overflow-hidden" style={{ borderColor: T.edge, background: T.surface }}>
      <div className="flex items-center justify-between px-4 py-2 border-b text-xs" style={{ borderColor: T.edge, color: T.muted }}>
        <div className="flex items-center gap-3">
          <span>sina-dilek.dev</span>
          <span style={{ color: T.accent }}>profile.tsx</span>
        </div>
        <span>noxire.dev</span>
      </div>

      <div className="grid md:grid-cols-[190px,1fr,220px] min-h-[420px]">
        <div className="border-r p-4 text-xs space-y-3" style={{ borderColor: T.edge, background: T.surface2, color: T.muted }}>
          <div className="uppercase tracking-[0.2em]">Explorer</div>
          <div className="space-y-2">
            <div>src</div>
            <div className="pl-4" style={{ color: T.text }}>home.tsx</div>
            <div className="pl-4">projects.tsx</div>
            <div className="pl-4">writing.tsx</div>
            <div>content</div>
            <div className="pl-4">about.ts</div>
            <div className="pl-4">case-studies.ts</div>
            <div className="pl-4">contact.ts</div>
          </div>
          <div className="pt-4 border-t" style={{ borderColor: T.edge }}>
            <div className="uppercase tracking-[0.2em] mb-2">Profile</div>
            {profileFacts.slice(0, 3).map((fact) => (
              <div key={fact.label} className="flex items-center justify-between py-1">
                <span>{fact.label}</span>
                <span style={{ color: T.text }}>{fact.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 font-mono text-sm leading-7" style={{ color: T.text }}>
          <div style={{ color: T.muted }}>01 export const profile = {'{'}</div>
          <div className="pl-8">name: <span style={{ color: T.accent }}>'Sina Dilek'</span>,</div>
          <div className="pl-8">focus: <span style={{ color: T.accent }}>'frontend + systems'</span>,</div>
          <div className="pl-8">belief: <span style={{ color: T.accent }}>'clear tools win'</span>,</div>
          <div className="pl-8">result: <span style={{ color: T.accent }}>'96/100, First Class'</span>,</div>
          <div style={{ color: T.muted }}>06 {'}'}</div>
            <div className="mt-6 border-t pt-5" style={{ borderColor: T.edge }}>
              <div style={{ color: T.muted }}>// current priorities</div>
              <div className="mt-3 space-y-2">
                <div>- building portfolio systems that feel intentional</div>
                <div>- studying lower-level programming through C and Go</div>
                <div>- shipping tools with clean interaction and clear edges</div>
              </div>
            </div>
        </div>

        <div className="border-l p-4 text-xs" style={{ borderColor: T.edge, background: T.surface2, color: T.muted }}>
          <div className="uppercase tracking-[0.2em] mb-4">Diagnostics</div>
          <div className="space-y-3">
            <div className="border p-3" style={{ borderColor: T.edge }}>
              <div style={{ color: T.text }}>Project signal</div>
              <div className="mt-1">Clear case-study language</div>
            </div>
            <div className="border p-3" style={{ borderColor: T.edge }}>
              <div style={{ color: T.text }}>Design goal</div>
              <div className="mt-1">Clear structure with product-grade polish</div>
            </div>
            <div className="border p-3" style={{ borderColor: T.edge }}>
              <div style={{ color: T.text }}>Status</div>
              <div className="mt-1" style={{ color: T.accent }}>Ready for internships</div>
            </div>
          </div>
          <div className="mt-6 border-t pt-4" style={{ borderColor: T.edge }}>
            <div className="uppercase tracking-[0.2em] mb-2">Terminal</div>
            <div>{'>'} profile build</div>
            <div style={{ color: T.accent }}>success</div>
          </div>
        </div>
      </div>
    </div>
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
          <div className="grid md:grid-cols-[1fr,280px] gap-8 mb-10">
            <div>
              <div className="text-xs tracking-[0.2em] mb-3" style={{ color: T.accent }}>{project.code}</div>
              <h1 className="text-5xl md:text-6xl font-bold leading-none mb-3">{project.name}</h1>
              <p className="text-lg leading-relaxed max-w-2xl" style={{ color: T.muted }}>{project.impact}</p>
            </div>
            <div className="border p-6" style={{ borderColor: T.edge, background: T.surface }}>
              <div className="text-xs tracking-[0.2em] mb-4" style={{ color: T.muted }}>DETAILS</div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span style={{ color: T.muted }}>Year</span><span>{project.year}</span></div>
                <div className="flex justify-between"><span style={{ color: T.muted }}>Status</span><span>{project.status}</span></div>
                <div className="flex justify-between"><span style={{ color: T.muted }}>Primary</span><span>{project.stack[0]}</span></div>
              </div>
            </div>
          </div>
          <div className="border mb-10" style={{ borderColor: T.edge }}>
            <EditorPreview />
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border p-8" style={{ borderColor: T.edge, background: T.surface }}>
              <div className="text-xs tracking-[0.2em] mb-4" style={{ color: T.accent }}>DESCRIPTION</div>
              <p className="leading-relaxed mb-5" style={{ color: T.muted }}>{project.description}</p>
              <div className="text-xs tracking-[0.2em] mb-3" style={{ color: T.text }}>CHALLENGE</div>
              <p className="leading-relaxed" style={{ color: T.muted }}>{project.challenge}</p>
            </div>
            <div className="border p-8" style={{ borderColor: T.edge, background: T.surface }}>
              <div className="text-xs tracking-[0.2em] mb-4" style={{ color: T.accent }}>APPROACH</div>
              <p className="leading-relaxed mb-5" style={{ color: T.muted }}>{project.approach}</p>
              <ul className="space-y-3">
                {project.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <span style={{ color: T.accent }}>{'>'}</span>
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
      <div className="max-w-5xl mx-auto px-6 md:px-10 pb-24">
        <h1 className="text-4xl font-bold mb-10">Writing</h1>
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
              className="text-left border p-6"
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
          <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 text-xs border" style={{ borderColor: T.edge, background: T.surface2 }}>#{tag}</span>
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

export default function Design46() {
  const [view, setView] = useState<View>('home')
  const [selectedProject, setSelectedProject] = useState(projects[0].id)
  const [selectedPost, setSelectedPost] = useState(blogPosts[0].id)

  return (
    <div className="min-h-screen selection:bg-[#d0ff71] selection:text-[#09090b]" style={{ background: T.bg, color: T.text }}>
      <div className="fixed inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(${T.edge} 1px, transparent 1px), linear-gradient(90deg, ${T.edge} 1px, transparent 1px)`, backgroundSize: '88px 88px', opacity: 0.08 }} />
      <Nav currentView={view} setView={setView} />

      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10">
            <section className="min-h-screen flex items-center px-6 md:px-10 pt-16">
              <div className="max-w-7xl mx-auto w-full">
                <div className="grid lg:grid-cols-[0.88fr,1.12fr] gap-8 items-start">
                  <div className="pt-6">
                    <div className="inline-flex items-center gap-3 px-4 py-2 border mb-8 text-xs tracking-[0.2em]" style={{ borderColor: T.edge, background: T.surface, color: T.muted }}>
                      <div className="w-2 h-2 rounded-full" style={{ background: T.accent }} />
                      PRODUCT-MINDED DEVELOPER
                    </div>
                    <h1 className="text-[16vw] md:text-[8vw] font-bold tracking-tight leading-[0.88]">
                      Sina
                      <br />
                      Dilek
                    </h1>
                    <p className="mt-6 text-xl max-w-2xl leading-relaxed" style={{ color: T.muted }}>
                      Computer Science student at the University of Essex building fast interfaces, sharp portfolio systems, and small tools that make complexity easier to work with.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <button onClick={() => document.getElementById('runtime-work')?.scrollIntoView({ behavior: 'smooth' })} className="px-6 py-3 font-semibold" style={{ background: T.text, color: T.bg }}>
                        See projects
                      </button>
                      <a href="mailto:contact@sinadilek.com" className="px-6 py-3 border font-semibold" style={{ borderColor: T.edge }}>
                        Get in touch
                      </a>
                    </div>
                    <div className="mt-8 grid sm:grid-cols-2 gap-3">
                      {profileFacts.map((fact) => (
                        <div key={fact.label} className="border p-4" style={{ borderColor: T.edge, background: T.surface }}>
                          <div className="text-xs tracking-[0.2em] mb-2" style={{ color: T.muted }}>{fact.label.toUpperCase()}</div>
                          <div className="font-medium">{fact.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:pt-6">
                    <EditorPreview />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mt-14">
                  {[
                    { title: 'Frontend', text: 'Focused on interfaces that are fast, legible, and intentionally structured.' },
                    { title: 'Systems', text: 'Using Go and C to understand lower-level mechanics instead of treating them as black boxes.' },
                    { title: 'Design', text: 'Brutalist taste, but with enough restraint that the content still leads the page.' },
                  ].map((item) => (
                    <div key={item.title} className="border p-5" style={{ borderColor: T.edge, background: T.surface }}>
                      <div className="text-lg font-semibold mb-2">{item.title}</div>
                      <p style={{ color: T.muted }}>{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="runtime-work" className="px-6 md:px-10 pb-24">
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-3 h-3 rounded-full" style={{ background: T.accent }} />
                  <span className="text-sm tracking-[0.2em]" style={{ color: T.muted }}>SELECTED WORK</span>
                </div>
                <div className="space-y-4">
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
                      className="group w-full text-left border"
                      style={{ borderColor: T.edge, background: T.surface }}
                    >
                      <div className="grid md:grid-cols-[1fr,220px] gap-6 items-center p-8">
                        <div>
                          <div className="flex items-center gap-3 mb-3 text-xs tracking-[0.2em]" style={{ color: T.muted }}>
                            <span style={{ color: T.accent }}>{project.code}</span>
                            <span>{project.year}</span>
                            <span>{project.status}</span>
                          </div>
                          <h3 className="text-3xl md:text-4xl font-semibold mb-2">{project.name}</h3>
                          <p className="max-w-3xl" style={{ color: T.muted }}>{project.impact}</p>
                        </div>
                        <div className="border p-4 text-sm" style={{ borderColor: T.edge, background: T.surface2 }}>
                          <div className="text-xs tracking-[0.2em] mb-3" style={{ color: T.muted }}>STACK</div>
                          <div className="flex flex-wrap gap-2">
                            {project.stack.slice(0, 3).map((item) => (
                              <span key={item} className="px-2 py-1 text-xs border" style={{ borderColor: T.edge }}>
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </section>

            <section className="px-6 md:px-10 pb-24">
              <div className="max-w-7xl mx-auto grid md:grid-cols-[0.9fr,1.1fr] gap-6">
                <div className="border p-8" style={{ borderColor: T.edge, background: T.surface }}>
                  <div className="text-xs tracking-[0.2em] mb-4" style={{ color: T.accent }}>CAPABILITIES</div>
                  <div className="space-y-3">
                    {skills.map((skill, index) => (
                      <div key={skill.name} className="grid grid-cols-[100px,1fr,48px] gap-4 items-center">
                        <span>{skill.name}</span>
                        <div className="h-2 relative" style={{ background: T.edge }}>
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.03, duration: 0.45 }}
                            className="absolute inset-y-0 left-0"
                            style={{ background: skill.kind === 'core' ? T.accent : T.text }}
                          />
                        </div>
                        <span className="text-xs text-right" style={{ color: T.muted }}>{skill.level}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4">
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
                      <div className="text-xs tracking-[0.2em] mb-3" style={{ color: T.muted }}>{post.date}</div>
                      <h3 className="text-2xl font-semibold mb-2">{post.title}</h3>
                      <p style={{ color: T.muted }}>{post.excerpt}</p>
                    </motion.button>
                  ))}
                </div>
              </div>
            </section>

            <footer className="px-6 md:px-10 pb-24">
              <div className="max-w-7xl mx-auto border p-8" style={{ borderColor: T.edge, background: T.surface }}>
                <div className="grid md:grid-cols-[1fr,1fr] gap-6 items-end">
                  <div>
                    <div className="text-xs tracking-[0.2em] mb-4" style={{ color: T.accent }}>CONTACT</div>
                    <h2 className="text-4xl md:text-5xl font-semibold leading-tight">
                      Open to internships,
                      <br />
                      freelance work,
                      <br />
                      and collaboration.
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {contactLinks.map((link) => (
                      <a key={link.label} href={link.href} target={link.label !== 'Email' ? '_blank' : undefined} rel="noopener" className="flex items-center justify-between border p-4" style={{ borderColor: T.edge, background: T.surface2 }}>
                        <span>{link.label}</span>
                        <span style={{ color: T.muted }}>{link.value}</span>
                      </a>
                    ))}
                  </div>
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
