import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { blogPosts, contactLinks, profileFacts, projects, skills, type View } from './prototypeData'

const T = {
  bg: '#07070a',
  panel: '#0d0d11',
  edge: '#1c1c22',
  text: '#ededf1',
  muted: '#6f6f7d',
  lime: '#c3ff00',
  red: '#ff4d36',
}

function Coord({ label }: { label: string }) {
  return <span className="text-[9px] font-mono" style={{ color: T.muted }}>{label}</span>
}

function Nav({ currentView, setView }: { currentView: View; setView: (v: View) => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b font-mono" style={{ background: `${T.bg}ee`, borderColor: T.edge, backdropFilter: 'blur(10px)' }}>
      <div className="max-w-[1360px] mx-auto px-4 md:px-8 h-12 flex items-center justify-between">
        <button onClick={() => setView('home')} className="flex items-center gap-3">
          <span className="font-bold" style={{ color: T.lime }}>GRID</span>
          <span style={{ color: T.muted }}>/</span>
          <span style={{ color: T.red }}>FRAME</span>
        </button>
        <div className="flex items-center gap-5 text-[11px] tracking-[0.22em]">
          <button onClick={() => setView('home')} style={{ color: currentView === 'home' ? T.lime : T.muted }}>WORK</button>
          <button onClick={() => setView('blog')} style={{ color: currentView === 'blog' || currentView === 'blog-post' ? T.red : T.muted }}>LOG</button>
          <Link to="/" style={{ color: T.muted }}>EXIT</Link>
        </div>
      </div>
    </nav>
  )
}

function ProjectPage({ projectId, setView }: { projectId: string; setView: (v: View) => void }) {
  const project = projects.find((entry) => entry.id === projectId) ?? projects[0]

  return (
    <div className="pt-16 min-h-screen font-mono" style={{ background: T.bg, color: T.text }}>
      <div className="max-w-[920px] mx-auto px-4 md:px-8 pb-20">
        <button onClick={() => setView('home')} className="text-[11px] mb-8" style={{ color: T.muted }}>
          {'<-'} WORK
        </button>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="border mb-6" style={{ borderColor: T.edge, background: T.panel }}>
            <div className="flex items-center justify-between px-4 py-2 border-b text-[10px]" style={{ borderColor: T.edge, color: T.muted }}>
              <span>{project.code}</span>
              <span style={{ color: T.lime }}>{project.status}</span>
            </div>
            <div className="p-6">
              <h1 className="text-4xl md:text-5xl font-black mb-3" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>{project.name}</h1>
              <p style={{ color: T.muted }}>{project.impact}</p>
            </div>
          </div>
          <div className="aspect-video border mb-6 flex items-center justify-center" style={{ borderColor: T.edge, background: '#050507' }}>
            <span style={{ color: T.muted }}>[ output ]</span>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {[{ label: 'YEAR', value: project.year }, { label: 'STACK', value: project.stack.join(' / ') }, { label: 'STATUS', value: project.status }].map((item) => (
              <div key={item.label} className="border p-4" style={{ borderColor: T.edge, background: T.panel }}>
                <div className="text-[10px] tracking-[0.22em] mb-2" style={{ color: T.muted }}>{item.label}</div>
                <div>{item.value}</div>
              </div>
            ))}
          </div>
          <div className="space-y-6">
            {[{ label: 'OVERVIEW', text: project.description }, { label: 'PROBLEM', text: project.challenge }, { label: 'APPROACH', text: project.approach }].map((section) => (
              <div key={section.label}>
                <div className="text-[10px] tracking-[0.22em] mb-2" style={{ color: section.label === 'PROBLEM' ? T.red : T.lime }}>{section.label}</div>
                <p className="leading-relaxed" style={{ color: T.muted }}>{section.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function BlogListPage({ setView, setSelectedPost }: { setView: (v: View) => void; setSelectedPost: (id: string) => void }) {
  return (
    <div className="pt-16 min-h-screen font-mono" style={{ background: T.bg, color: T.text }}>
      <div className="max-w-[920px] mx-auto px-4 md:px-8 pb-20">
        <div className="flex items-center gap-3 mb-8">
          <Coord label="D0" />
          <h1 className="text-3xl font-black" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>LOG</h1>
        </div>
        <div className="space-y-3">
          {blogPosts.map((post, index) => (
            <motion.button
              key={post.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              onClick={() => {
                setSelectedPost(post.id)
                setView('blog-post')
              }}
              className="w-full text-left border p-4"
              style={{ borderColor: T.edge, background: T.panel }}
            >
              <div className="flex items-center gap-3 text-[10px]" style={{ color: T.muted }}>
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="text-lg font-bold mt-2">{post.title}</h2>
              <p className="text-sm mt-1" style={{ color: T.muted }}>{post.excerpt}</p>
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
    <div className="pt-16 min-h-screen font-mono" style={{ background: T.bg, color: T.text }}>
      <div className="max-w-[720px] mx-auto px-4 md:px-8 pb-20">
        <button onClick={() => setView('blog')} className="text-[11px] mb-8" style={{ color: T.muted }}>
          {'<-'} LOG
        </button>
        <motion.article initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-[10px] mb-3" style={{ color: T.muted }}>{post.date} / {post.readTime}</div>
          <h1 className="text-3xl md:text-4xl font-black mb-6" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>{post.title}</h1>
          <div className="space-y-4">
            {post.content.split('\n\n').map((paragraph) => (
              <p key={paragraph} className="leading-relaxed" style={{ color: T.muted }}>{paragraph}</p>
            ))}
          </div>
        </motion.article>
      </div>
    </div>
  )
}

export default function Design44() {
  const [view, setView] = useState<View>('home')
  const [selectedProject, setSelectedProject] = useState(projects[0].id)
  const [selectedPost, setSelectedPost] = useState(blogPosts[0].id)
  const [mouseGrid, setMouseGrid] = useState({ col: 0, row: 0 })
  const { scrollYProgress } = useScroll()
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      setMouseGrid({
        col: Math.floor(event.clientX / Math.max(window.innerWidth / 12, 1)),
        row: Math.floor(event.clientY / 80),
      })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div className="min-h-screen selection:bg-[#c3ff00] selection:text-[#07070a]" style={{ background: T.bg, color: T.text }}>
      <motion.div className="fixed top-0 left-0 h-px z-[60]" style={{ width: progressWidth, background: T.lime }} />
      <div className="fixed inset-0 pointer-events-none opacity-[0.08]" style={{ backgroundImage: `linear-gradient(${T.edge} 1px, transparent 1px), linear-gradient(90deg, ${T.edge} 1px, transparent 1px)`, backgroundSize: `${100 / 12}vw 80px` }} />
      <div className="fixed left-2 top-16 bottom-3 hidden md:flex flex-col justify-between pointer-events-none">
        {Array.from({ length: 10 }, (_, index) => <Coord key={index} label={String(index).padStart(2, '0')} />)}
      </div>
      <div className="fixed bottom-2 right-2 text-[9px] font-mono hidden md:block pointer-events-none" style={{ color: `${T.lime}70` }}>
        {String.fromCharCode(65 + Math.min(mouseGrid.col, 11))}{mouseGrid.row}
      </div>
      <Nav currentView={view} setView={setView} />

      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10">
            <section className="min-h-screen flex flex-col justify-center px-4 md:px-8 pt-14">
              <div className="max-w-[1360px] mx-auto w-full">
                <div className="flex items-center gap-4 mb-8 text-[10px] font-mono" style={{ color: T.muted }}>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: T.lime }} />
                  <span>SYSTEM HYBRID</span>
                  <span style={{ color: T.red }}>CONSTRUCT MODE</span>
                </div>
                <div className="grid grid-cols-12 gap-4 items-end">
                  <div className="col-span-12 md:col-span-8">
                    <div className="flex items-baseline gap-4 mb-2">
                      <Coord label="A0" />
                      <h1 className="text-[18vw] md:text-[10vw] font-black leading-[0.84] tracking-tighter" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>SINA</h1>
                    </div>
                    <div className="flex items-baseline gap-4">
                      <Coord label="A1" />
                      <h1 className="text-[18vw] md:text-[10vw] font-black leading-[0.84] tracking-tighter" style={{ color: T.lime, fontFamily: 'Inter, system-ui, sans-serif' }}>DILEK</h1>
                      <div className="w-12 h-12 md:w-16 md:h-16" style={{ background: T.red }} />
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-4">
                    <div className="border" style={{ borderColor: T.edge, background: T.panel }}>
                      <div className="flex items-center justify-between px-4 py-2 border-b text-[10px]" style={{ borderColor: T.edge, color: T.muted }}>
                        <span>PROFILE</span>
                        <span style={{ color: T.lime }}>READY</span>
                      </div>
                      <div className="p-4 space-y-3 text-sm">
                        {profileFacts.map((fact) => (
                          <div key={fact.label} className="flex items-center justify-between">
                            <span style={{ color: T.muted }}>{fact.label}</span>
                            <span>{fact.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-8 text-sm max-w-2xl leading-relaxed" style={{ color: T.muted }}>
                  This one takes the dashboard skeleton from 32, the geometric confidence from 21, and the stronger project readability from 23. It is more operational than atmospheric.
                </p>
              </div>
            </section>

            <section className="px-4 md:px-8 py-16">
              <div className="max-w-[1360px] mx-auto grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-3">
                  <Coord label="B0" />
                  <h2 className="text-2xl font-black mt-2" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>STACK</h2>
                </div>
                <div className="col-span-12 md:col-span-9 border p-4" style={{ borderColor: T.edge, background: T.panel }}>
                  <div className="space-y-2">
                    {skills.map((skill, index) => (
                      <div key={skill.name} className="grid grid-cols-[90px,1fr,48px] gap-3 items-center">
                        <span className="text-sm">{skill.name}</span>
                        <div className="h-4 relative" style={{ background: '#09090c' }}>
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.04, duration: 0.45 }}
                            className="absolute inset-y-0 left-0"
                            style={{ background: skill.kind === 'core' ? T.lime : skill.kind === 'framework' ? T.red : `${T.lime}66` }}
                          />
                        </div>
                        <span className="text-xs tabular-nums text-right" style={{ color: T.muted }}>{skill.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="py-10">
              <div className="max-w-[1360px] mx-auto px-4 md:px-8 mb-5 flex items-center justify-between">
                <div>
                  <Coord label="C0" />
                  <h2 className="text-2xl font-black mt-2" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>WORK</h2>
                </div>
                <span className="text-[10px]" style={{ color: T.muted }}>SCROLL -&gt;</span>
              </div>
              <div className="flex gap-4 overflow-x-auto px-4 md:px-8 pb-4" style={{ scrollbarWidth: 'none' }}>
                {projects.map((project, index) => (
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
                    className="flex-shrink-0 w-[86vw] md:w-[420px] text-left border"
                    style={{ borderColor: T.edge, background: T.panel }}
                  >
                    <div className="aspect-[16/10] flex items-center justify-center" style={{ background: '#050507' }}>
                      <span className="text-6xl font-black" style={{ color: `${index % 2 === 0 ? T.lime : T.red}33` }}>{project.code.slice(-3)}</span>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-3 text-[10px]" style={{ color: T.muted }}>
                        <span style={{ color: index % 2 === 0 ? T.lime : T.red }}>{project.code}</span>
                        <span>{project.year}</span>
                      </div>
                      <h3 className="text-2xl font-black mb-2" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>{project.name}</h3>
                      <p className="text-sm mb-4" style={{ color: T.muted }}>{project.short}</p>
                      <span className="text-[11px] font-bold" style={{ color: T.lime }}>OPEN CASE</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </section>

            <section className="px-4 md:px-8 py-16">
              <div className="max-w-[1360px] mx-auto grid md:grid-cols-2 gap-4">
                <div className="border p-6" style={{ borderColor: T.edge, background: T.panel }}>
                  <div className="text-[10px] tracking-[0.22em] mb-4" style={{ color: T.red }}>ABOUT</div>
                  <p className="leading-relaxed" style={{ color: T.muted }}>
                    This prototype favors system language and visible structure. It is more technical on purpose, but still keeps the value statements readable instead of hiding them in interface noise.
                  </p>
                </div>
                <div className="space-y-3">
                  {blogPosts.slice(0, 2).map((post) => (
                    <button
                      key={post.id}
                      onClick={() => {
                        setSelectedPost(post.id)
                        setView('blog-post')
                      }}
                      className="w-full text-left border p-5"
                      style={{ borderColor: T.edge, background: T.panel }}
                    >
                      <div className="text-[10px] mb-2" style={{ color: T.muted }}>{post.date}</div>
                      <h3 className="text-lg font-bold mb-1">{post.title}</h3>
                      <p className="text-sm" style={{ color: T.muted }}>{post.excerpt}</p>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <footer className="px-4 md:px-8 pb-20">
              <div className="max-w-[1360px] mx-auto grid md:grid-cols-[0.8fr,1.2fr] gap-4">
                <div className="border p-6" style={{ borderColor: T.edge, background: T.panel }}>
                  <div className="text-[10px] tracking-[0.22em] mb-4" style={{ color: T.lime }}>CONTACT</div>
                  <h2 className="text-3xl font-black" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Sharp edges, usable core.</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-3">
                  {contactLinks.map((link) => (
                    <a key={link.label} href={link.href} target={link.label !== 'Email' ? '_blank' : undefined} rel="noopener" className="border p-5" style={{ borderColor: T.edge, background: T.panel }}>
                      <div className="text-[10px] mb-2" style={{ color: T.muted }}>{link.label.toUpperCase()}</div>
                      <div>{link.value}</div>
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
