import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { blogPosts, contactLinks, profileFacts, projects, type BlogPost, type Project } from './prototypeData'

type View = 'home' | 'project' | 'blog-post'

const C = {
  bg: '#060606',
  panel: '#111111',
  panelSoft: '#171717',
  edge: 'rgba(255,255,255,0.12)',
  edgeStrong: 'rgba(255,255,255,0.2)',
  text: '#f5f5f0',
  muted: '#a3a39b',
  dim: '#6b6b65',
  accent: '#d6ff72',
}

const bootLines = [
  '$ whoami',
  'sina_dilek',
  '$ status',
  'cs student // frontend + systems // open to internships',
  '$ motto',
  'i like building small tools and learning systems.',
]

function Intro({ onEnter }: { onEnter: () => void }) {
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setVisibleLines((count) => {
        if (count >= bootLines.length) {
          window.clearInterval(interval)
          return count
        }
        return count + 1
      })
    }, 240)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-center justify-center px-5"
      style={{ background: C.bg }}
    >
      <div
        className="w-full max-w-3xl overflow-hidden rounded-2xl border shadow-[0_24px_80px_rgba(0,0,0,0.5)]"
        style={{ borderColor: C.edgeStrong, background: C.panel }}
      >
        <div className="flex items-center justify-between border-b px-4 py-3 text-xs" style={{ borderColor: C.edge, color: C.muted }}>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span>sina.dilek@portfolio ~</span>
          <button onClick={onEnter} className="transition-colors" style={{ color: C.dim }}>
            skip
          </button>
        </div>

        <div className="min-h-[320px] p-6 font-mono text-sm leading-7" style={{ color: C.text }}>
          {bootLines.slice(0, visibleLines).map((line, index) => (
            <motion.div key={line + index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              {line}
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: visibleLines >= bootLines.length ? 1 : 0 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <button
              onClick={onEnter}
              className="px-4 py-2 text-xs tracking-[0.2em]"
              style={{ background: C.text, color: C.bg }}
            >
              ENTER
            </button>
            <span className="text-xs" style={{ color: C.muted }}>
              press enter or click to continue
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

function Nav({ setView }: { setView: (view: View) => void }) {
  return (
    <div className="sticky top-0 z-40 border-b backdrop-blur-xl" style={{ background: 'rgba(6,6,6,0.82)', borderColor: C.edge }}>
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 text-xs tracking-[0.2em] md:px-8">
        <button onClick={() => setView('home')} style={{ color: C.text }}>
          ~/sina
        </button>
        <div className="flex items-center gap-5" style={{ color: C.muted }}>
          <button onClick={() => document.getElementById('legacy-work')?.scrollIntoView({ behavior: 'smooth' })}>WORK</button>
          <button onClick={() => document.getElementById('legacy-notes')?.scrollIntoView({ behavior: 'smooth' })}>NOTES</button>
          <Link to="/">EXIT</Link>
        </div>
      </div>
    </div>
  )
}

function LayeredHero() {
  return (
    <div className="relative">
      <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[28px] border" style={{ borderColor: 'rgba(255,255,255,0.05)' }} />
      <div className="absolute inset-0 translate-x-6 translate-y-6 rounded-[28px] border" style={{ borderColor: 'rgba(255,255,255,0.03)' }} />
      <div
        className="relative overflow-hidden rounded-[28px] border p-7 md:p-10"
        style={{ borderColor: C.edgeStrong, background: 'linear-gradient(180deg, rgba(20,20,20,0.96), rgba(10,10,10,0.96))' }}
      >
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px)', backgroundSize: '100% 4px' }} />
        <div className="relative grid gap-8 lg:grid-cols-[1.15fr,0.85fr] lg:items-end">
          <div>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border px-4 py-2 text-[11px] tracking-[0.22em]" style={{ borderColor: C.edge, background: C.panelSoft, color: C.muted }}>
              <span className="h-2 w-2 rounded-full" style={{ background: C.accent }} />
              PERSONAL TERMINAL
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-[18vw] font-semibold uppercase leading-[0.86] tracking-[-0.06em] md:text-[7.8rem]"
            >
              Sina
              <br />
              Dilek
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24 }}
              className="mt-6 max-w-xl text-lg leading-relaxed md:text-xl"
              style={{ color: C.muted }}
            >
              CS student who builds for the joy of it. I like making fast interfaces, small tools, and systems that feel simple on the surface because the hard part was handled properly underneath.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <button onClick={() => document.getElementById('legacy-work')?.scrollIntoView({ behavior: 'smooth' })} className="px-5 py-3 text-sm font-medium" style={{ background: C.text, color: C.bg }}>
                View projects
              </button>
              <a href="mailto:contact@sinadilek.com" className="border px-5 py-3 text-sm font-medium" style={{ borderColor: C.edgeStrong, color: C.text }}>
                contact@sinadilek.com
              </a>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.26 }} className="grid gap-3">
            {profileFacts.map((fact) => (
              <div key={fact.label} className="border px-4 py-4" style={{ borderColor: C.edge, background: C.panelSoft }}>
                <div className="text-[11px] tracking-[0.2em]" style={{ color: C.dim }}>
                  {fact.label.toUpperCase()}
                </div>
                <div className="mt-1 text-sm md:text-base" style={{ color: C.text }}>
                  {fact.value}
                </div>
              </div>
            ))}
            <div className="border px-4 py-4" style={{ borderColor: C.edge, background: C.panelSoft }}>
              <div className="text-[11px] tracking-[0.2em]" style={{ color: C.dim }}>
                CURRENTLY
              </div>
              <div className="mt-2 space-y-2 text-sm" style={{ color: C.muted }}>
                <div>{'>'} learning more lower-level programming through Go and C</div>
                <div>{'>'} refining portfolio systems instead of treating them like one-off pages</div>
                <div>{'>'} looking for internships where design and engineering both matter</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function ProjectList({ onOpen }: { onOpen: (project: Project) => void }) {
  return (
    <div className="space-y-4">
      {projects.map((project, index) => (
        <motion.button
          key={project.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.06 }}
          onClick={() => onOpen(project)}
          className="group w-full border text-left transition-transform hover:-translate-y-1"
          style={{ borderColor: C.edge, background: C.panel }}
        >
          <div className="grid gap-5 px-5 py-5 md:grid-cols-[36px,1fr,220px] md:items-center md:px-7">
            <div className="text-xl" style={{ color: C.accent }}>&gt;</div>
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-3 text-[11px] tracking-[0.18em]" style={{ color: C.dim }}>
                <span>{project.code}</span>
                <span>{project.year}</span>
                <span>{project.status}</span>
              </div>
              <h3 className="text-2xl font-semibold md:text-3xl">{project.name}</h3>
              <p className="mt-2 max-w-3xl leading-relaxed" style={{ color: C.muted }}>{project.impact}</p>
            </div>
            <div className="border px-4 py-4 text-sm" style={{ borderColor: C.edge, background: C.panelSoft, color: C.muted }}>
              <div className="mb-2 text-[11px] tracking-[0.2em]" style={{ color: C.dim }}>
                STACK
              </div>
              <div>{project.stack.slice(0, 3).join(' / ')}</div>
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  )
}

function NotesList({ onOpen }: { onOpen: (post: BlogPost) => void }) {
  return (
    <div className="space-y-3">
      {blogPosts.map((post, index) => (
        <motion.button
          key={post.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.06 }}
          onClick={() => onOpen(post)}
          className="w-full border px-5 py-5 text-left transition-transform hover:-translate-y-1 md:px-7"
          style={{ borderColor: C.edge, background: C.panel }}
        >
          <div className="mb-2 text-[11px] tracking-[0.18em]" style={{ color: C.dim }}>
            {post.date} / {post.readTime}
          </div>
          <h3 className="text-2xl font-semibold">{post.title}</h3>
          <p className="mt-2 leading-relaxed" style={{ color: C.muted }}>
            {post.excerpt}
          </p>
        </motion.button>
      ))}
    </div>
  )
}

function ProjectPage({ project, setView }: { project: Project; setView: (view: View) => void }) {
  return (
    <div className="mx-auto max-w-4xl px-5 pb-24 pt-10 md:px-8">
      <button onClick={() => setView('home')} className="mb-8 text-sm" style={{ color: C.muted }}>
        {'<-'} back
      </button>
      <div className="border" style={{ borderColor: C.edgeStrong, background: C.panel }}>
        <div className="border-b px-5 py-3 text-[11px] tracking-[0.2em] md:px-7" style={{ borderColor: C.edge, color: C.dim }}>
          {project.code} / PROJECT
        </div>
        <div className="px-5 py-7 md:px-7 md:py-8">
          <h1 className="text-4xl font-semibold md:text-6xl">{project.name}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed" style={{ color: C.muted }}>
            {project.impact}
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { label: 'Year', value: project.year },
              { label: 'Status', value: project.status },
              { label: 'Stack', value: project.stack.join(' / ') },
            ].map((item) => (
              <div key={item.label} className="border px-4 py-4" style={{ borderColor: C.edge, background: C.panelSoft }}>
                <div className="text-[11px] tracking-[0.2em]" style={{ color: C.dim }}>
                  {item.label.toUpperCase()}
                </div>
                <div className="mt-2 text-sm leading-relaxed" style={{ color: C.text }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div>
              <div className="mb-2 text-[11px] tracking-[0.2em]" style={{ color: C.accent }}>
                DESCRIPTION
              </div>
              <p className="leading-relaxed" style={{ color: C.muted }}>
                {project.description}
              </p>
            </div>
            <div>
              <div className="mb-2 text-[11px] tracking-[0.2em]" style={{ color: C.accent }}>
                APPROACH
              </div>
              <p className="leading-relaxed" style={{ color: C.muted }}>
                {project.approach}
              </p>
            </div>
          </div>

          <div className="mt-10">
            <div className="mb-3 text-[11px] tracking-[0.2em]" style={{ color: C.accent }}>
              FEATURES
            </div>
            <div className="space-y-2">
              {project.features.map((feature) => (
                <div key={feature} className="flex gap-3 text-sm" style={{ color: C.muted }}>
                  <span style={{ color: C.accent }}>&gt;</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function BlogPostPage({ post, setView }: { post: BlogPost; setView: (view: View) => void }) {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-10 md:px-8">
      <button onClick={() => setView('home')} className="mb-8 text-sm" style={{ color: C.muted }}>
        {'<-'} back
      </button>
      <div className="border" style={{ borderColor: C.edgeStrong, background: C.panel }}>
        <div className="border-b px-5 py-3 text-[11px] tracking-[0.2em] md:px-7" style={{ borderColor: C.edge, color: C.dim }}>
          {post.date} / NOTE
        </div>
        <article className="px-5 py-7 md:px-7 md:py-8">
          <h1 className="text-4xl font-semibold md:text-5xl">{post.title}</h1>
          <p className="mt-3 text-sm" style={{ color: C.dim }}>
            {post.readTime}
          </p>
          <div className="mt-8 space-y-5">
            {post.content.split('\n\n').map((paragraph) => (
              <p key={paragraph} className="leading-relaxed" style={{ color: C.muted }}>
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </div>
    </div>
  )
}

export default function Design48() {
  const [introOpen, setIntroOpen] = useState(true)
  const [view, setView] = useState<View>('home')
  const [selectedProject, setSelectedProject] = useState<Project>(projects[0])
  const [selectedPost, setSelectedPost] = useState<BlogPost>(blogPosts[0])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === 'Escape') {
        setIntroOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <div className="min-h-screen font-mono selection:bg-[#d6ff72] selection:text-[#060606]" style={{ background: C.bg, color: C.text }}>
      <div className="pointer-events-none fixed inset-0 opacity-[0.08]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '72px 72px' }} />
      <div className="pointer-events-none fixed inset-0 opacity-[0.05]" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)', backgroundSize: '100% 6px' }} />

      <AnimatePresence>{introOpen ? <Intro onEnter={() => setIntroOpen(false)} /> : null}</AnimatePresence>

      <Nav setView={setView} />

      {view === 'home' && (
        <div className="relative z-10">
          <section className="mx-auto max-w-6xl px-5 pb-16 pt-8 md:px-8 md:pb-24 md:pt-12">
            <LayeredHero />
          </section>

          <section id="legacy-work" className="mx-auto max-w-6xl px-5 pb-16 md:px-8 md:pb-24">
            <div className="mb-8 flex items-center gap-4">
              <div className="h-px flex-1" style={{ background: C.edge }} />
              <span className="text-[11px] tracking-[0.24em]" style={{ color: C.accent }}>
                $ PERSONAL PROJECTS
              </span>
            </div>
            <ProjectList onOpen={(project) => {
              setSelectedProject(project)
              setView('project')
            }} />
          </section>

          <section className="mx-auto grid max-w-6xl gap-6 px-5 pb-16 md:grid-cols-[1fr,0.9fr] md:px-8 md:pb-24">
            <div id="legacy-notes">
              <div className="mb-8 flex items-center gap-4">
                <div className="h-px flex-1" style={{ background: C.edge }} />
                <span className="text-[11px] tracking-[0.24em]" style={{ color: C.accent }}>
                  $ RECENT NOTES
                </span>
              </div>
              <NotesList onOpen={(post) => {
                setSelectedPost(post)
                setView('blog-post')
              }} />
            </div>

            <div className="border p-6 md:p-7" style={{ borderColor: C.edgeStrong, background: C.panel }}>
              <div className="mb-5 text-[11px] tracking-[0.24em]" style={{ color: C.accent }}>
                $ LINKS
              </div>
              <p className="max-w-md leading-relaxed" style={{ color: C.muted }}>
                The old version worked because it felt like a personal environment, not a branded performance. This direction keeps that intimacy but cleans up the structure.
              </p>

              <div className="mt-8 space-y-3">
                {contactLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.label === 'Email' ? undefined : '_blank'}
                    rel="noopener"
                    className="flex items-center justify-between border px-4 py-4 text-sm"
                    style={{ borderColor: C.edge, background: C.panelSoft }}
                  >
                    <span>{link.label}</span>
                    <span style={{ color: C.muted }}>{link.value}</span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {view === 'project' && <ProjectPage project={selectedProject} setView={setView} />}
      {view === 'blog-post' && <BlogPostPage post={selectedPost} setView={setView} />}
    </div>
  )
}
