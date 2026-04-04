import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Design 27: RECRUITER-OPTIMIZED PORTFOLIO
// Follows the strict Portfolio Design Rulebook:
// - Value in 10 seconds
// - ONE accent color (lavender #CDB4DB)
// - Off-black background (#0E0E0E)
// - Strong typography hierarchy (88/36/17/14)
// - 80px+ vertical rhythm
// - F-pattern scannability
// - 3 featured projects MAX with impact statements
// - Full case study structure
// - Contact always 1 click away
// Positioning: Product-minded frontend developer

type View = 'home' | 'case-study' | 'blog' | 'blog-post'

// ─── PALETTE ───────────────────────────────────
const C = {
  bg: '#0E0E0E',
  surface: '#161616',
  surfaceHover: '#1C1C1C',
  border: '#222222',
  borderHover: '#CDB4DB',
  accent: '#CDB4DB',
  accentDark: '#A78BBA',
  text: '#F5F5F5',
  textSecondary: '#999999',
  textMuted: '#666666',
}

// ─── DATA ──────────────────────────────────────
const projects = [
  {
    id: 'gosh',
    name: 'GoSH',
    tags: ['Go', 'Systems', 'CLI'],
    impact: 'Built a fully functional shell from scratch, handling process management and I/O piping.',
    overview: 'GoSH is a minimalist shell implementation demonstrating core systems programming concepts. Built entirely in Go as a deep dive into how shells actually work.',
    problem: 'Most developers use shells daily but never understand the internals — process forking, signal handling, I/O redirection. I wanted to demystify this.',
    strategy: 'Started by reading the POSIX specification, then implemented incrementally: lexer → parser → executor. Chose Go for its clean concurrency model and strong stdlib.',
    implementation: {
      stack: ['Go', 'Systems Programming'],
      decisions: [
        'Hand-written lexer for maximum control over tokenization',
        'Tree-based command representation for pipe chains',
        'OS-level process management via syscalls',
        'Built-in commands bypass forking for performance',
      ],
    },
    results: 'Handles pipes, redirects, background processes, and built-in commands. Used as a teaching tool in study groups.',
    reflection: 'I would add job control (fg/bg) and improve error messages. This project taught me how much abstraction shells provide.',
    year: '2025',
    link: 'https://github.com/noxire-dev/GoSH',
  },
  {
    id: 'moji',
    name: 'Moji',
    tags: ['Python', 'Flask', 'SQLite'],
    impact: 'Designed and shipped a full productivity app with focus on clean UI and fast interactions.',
    overview: 'A note-taking and task management app built with Flask. Focused on delivering a polished user experience with minimal tech overhead.',
    problem: 'Existing note apps are bloated with features. I wanted something fast, clean, and opinionated — built for how I actually work.',
    strategy: 'Prioritized UI/UX over feature count. Designed the interface first, then built the backend to serve it. Every interaction should feel instant.',
    implementation: {
      stack: ['Python', 'Flask', 'JavaScript', 'SQLite'],
      decisions: [
        'Server-rendered with progressive JS enhancement',
        'SQLite for zero-config deployment',
        'Custom markdown parser for notes',
        'Dark mode with CSS custom properties',
      ],
    },
    results: 'Clean, fast app used daily. Markdown notes, task lists, tags, and categories — all under 2MB.',
    reflection: 'Would rebuild with React for richer interactions. Learned a lot about designing UX constraints that guide users.',
    year: '2025',
    link: 'https://github.com/noxire-dev/moji',
  },
  {
    id: 'lorekeeper',
    name: 'LoreKeeper',
    tags: ['Python', 'PostgreSQL', 'Full Stack'],
    impact: 'Architected a community-driven e-commerce platform for tabletop RPG resources.',
    overview: 'An e-commerce platform for free tabletop RPG materials. Browse, download, and share game resources with the TTRPG community.',
    problem: 'TTRPG resources are scattered across forums, Discord servers, and random blogs. There is no central, well-designed hub for free community content.',
    strategy: 'Built a marketplace-style platform without payment — focused on discovery, ratings, and community curation rather than transactions.',
    implementation: {
      stack: ['Python', 'PostgreSQL', 'JavaScript'],
      decisions: [
        'PostgreSQL for complex queries and full-text search',
        'User auth with session-based security',
        'File upload with type validation',
        'Community rating system with moderation',
      ],
    },
    results: 'Functional platform with user accounts, resource library, community ratings, and PDF viewer. Clean browsing experience.',
    reflection: 'Would add API layer for future mobile app. Learned about database design for user-generated content at scale.',
    year: '2025',
    link: 'https://github.com/noxire-dev/LoreKeeper',
  },
]

const blogPosts = [
  {
    id: 'v2-rebuild',
    title: 'Rebuilding My Portfolio from Scratch',
    date: '2025-11-19',
    readTime: '3 min',
    excerpt: 'Why I scrapped everything and started over with React, TypeScript, and a new design philosophy.',
    content: `When I first started this project 3 years ago, I used Flask and some questionable design choices. Knowing only Python at the time, Flask felt magical.

I've since learned a lot — new languages, new frameworks, new design thinking. It was time for a clean slate.

The new stack: React, TypeScript, Tailwind CSS, Vite. The new goal: a portfolio that communicates value in under 10 seconds and shows real design thinking.

Every decision here is intentional. The color palette, the spacing, the typography hierarchy — it all follows a strict design system built for scannability and impact.`,
    tags: ['development', 'design'],
  },
  {
    id: 'first-year',
    title: 'First Year: 96/100 and First Class',
    date: '2025-08-28',
    readTime: '2 min',
    excerpt: 'Finished my first year at the University of Essex with top marks. Here is what I learned.',
    content: `I finished my first year at the University of Essex and achieved 96/100 overall — First Class Honours.

The biggest lesson wasn't technical. It was learning how to break complex problems into smaller pieces, how to manage time across multiple projects, and how to ask for help when stuck.

I'm proud of the result, but more importantly, I'm excited about the momentum. Second year starts with a clearer sense of what I want to build and who I want to become as a developer.`,
    tags: ['university', 'growth'],
  },
  {
    id: 'learning-c',
    title: 'Why I Started Learning C',
    date: '2025-02-23',
    readTime: '2 min',
    excerpt: 'Not to master it — but to understand everything built on top of it.',
    content: `I started learning C not to become a C developer, but to understand how higher-level languages work under the hood.

When you implement your own string functions, your own memory allocation, your own linked list — suddenly C++, Rust, and Go make so much more sense.

It is frustrating. Debugging segfaults is not fun. But every hour spent in C makes me a better developer in every other language I use.`,
    tags: ['learning', 'systems'],
  },
]

// ─── COMPONENTS ────────────────────────────────

function Nav({ currentView, setView }: { currentView: View; setView: (v: View) => void }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? `${C.bg}ee` : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? `1px solid ${C.border}` : '1px solid transparent',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <button onClick={() => setView('home')} className="group flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-sm flex items-center justify-center text-xs font-bold transition-colors"
            style={{ background: C.accent, color: C.bg }}
          >
            SD
          </div>
          <span className="text-sm font-medium hidden md:block" style={{ color: C.textSecondary }}>
            Sina Dilek
          </span>
        </button>
        <div className="flex items-center gap-8">
          {[
            { label: 'Work', view: 'home' as View },
            { label: 'Blog', view: 'blog' as View },
          ].map(item => (
            <button
              key={item.label}
              onClick={() => setView(item.view)}
              className="text-sm transition-colors"
              style={{
                color: currentView === item.view || (item.view === 'blog' && currentView === 'blog-post')
                  ? C.accent
                  : C.textMuted,
              }}
            >
              {item.label}
            </button>
          ))}
          <a
            href="mailto:contact@sinadilek.com"
            className="text-sm px-4 py-1.5 rounded-sm transition-colors"
            style={{ background: C.accent, color: C.bg, fontWeight: 600 }}
          >
            Contact
          </a>
          <Link to="/" className="text-sm transition-colors" style={{ color: C.textMuted }}>
            ←
          </Link>
        </div>
      </div>
    </nav>
  )
}

function CaseStudyPage({ projectId, setView }: { projectId: string; setView: (v: View) => void }) {
  const p = projects.find(x => x.id === projectId) || projects[0]

  const Section = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="mb-16">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-2 h-2 rounded-full" style={{ background: C.accent }} />
        <span className="text-xs tracking-[0.2em] font-medium" style={{ color: C.textMuted }}>
          {label}
        </span>
      </div>
      {children}
    </div>
  )

  return (
    <div className="pt-28 pb-24 min-h-screen" style={{ background: C.bg }}>
      <div className="max-w-[760px] mx-auto px-6 md:px-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <button
            onClick={() => setView('home')}
            className="text-sm mb-14 flex items-center gap-2 transition-colors"
            style={{ color: C.textMuted }}
          >
            <span style={{ color: C.accent }}>←</span> Back to work
          </button>

          {/* Header */}
          <div className="mb-16">
            <div className="flex flex-wrap gap-2 mb-4">
              {p.tags.map(t => (
                <span key={t} className="text-xs px-2.5 py-1 rounded-sm" style={{ background: C.surface, color: C.textSecondary }}>
                  {t}
                </span>
              ))}
              <span className="text-xs px-2.5 py-1 rounded-sm" style={{ background: C.surface, color: C.textMuted }}>
                {p.year}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: C.text, lineHeight: 1.1 }}>
              {p.name}
            </h1>
            <p className="text-lg" style={{ color: C.textSecondary, lineHeight: 1.7 }}>{p.impact}</p>
          </div>

          {/* Screenshot */}
          <div
            className="aspect-video rounded-sm mb-20 flex items-center justify-center"
            style={{ background: C.surface, border: `1px solid ${C.border}` }}
          >
            <span style={{ color: C.textMuted }} className="text-sm">[ Project Screenshot ]</span>
          </div>

          {/* Case Study Sections */}
          <Section label="OVERVIEW">
            <p className="text-[17px] leading-relaxed" style={{ color: C.textSecondary }}>{p.overview}</p>
          </Section>

          <Section label="PROBLEM">
            <p className="text-[17px] leading-relaxed" style={{ color: C.textSecondary }}>{p.problem}</p>
          </Section>

          <Section label="STRATEGY">
            <p className="text-[17px] leading-relaxed" style={{ color: C.textSecondary }}>{p.strategy}</p>
          </Section>

          <Section label="IMPLEMENTATION">
            <div className="flex flex-wrap gap-2 mb-6">
              {p.implementation.stack.map(t => (
                <span key={t} className="text-sm px-3 py-1 font-medium rounded-sm" style={{ background: C.accent, color: C.bg }}>
                  {t}
                </span>
              ))}
            </div>
            <ul className="space-y-3">
              {p.implementation.decisions.map((d, i) => (
                <li key={i} className="flex items-start gap-3 text-[17px]" style={{ color: C.textSecondary }}>
                  <span className="text-xs mt-1.5 font-mono flex-shrink-0" style={{ color: C.accent }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{ lineHeight: 1.7 }}>{d}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section label="RESULTS">
            <p className="text-[17px] leading-relaxed" style={{ color: C.textSecondary }}>{p.results}</p>
          </Section>

          <Section label="REFLECTION">
            <p className="text-[17px] leading-relaxed" style={{ color: C.textSecondary }}>{p.reflection}</p>
          </Section>

          {/* Link */}
          <a
            href={p.link}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-80"
            style={{ color: C.accent }}
          >
            View on GitHub →
          </a>
        </motion.div>
      </div>
    </div>
  )
}

function BlogListPage({ setView, setSelectedPost }: { setView: (v: View) => void; setSelectedPost: (id: string) => void }) {
  return (
    <div className="pt-28 pb-24 min-h-screen" style={{ background: C.bg }}>
      <div className="max-w-[760px] mx-auto px-6 md:px-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl font-bold mb-12" style={{ color: C.text }}>Blog</h1>

          <div className="space-y-2">
            {blogPosts.map((post, i) => (
              <motion.button
                key={post.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => { setSelectedPost(post.id); setView('blog-post') }}
                className="group w-full text-left p-6 rounded-sm transition-colors"
                style={{ background: C.surface }}
                onMouseEnter={e => { e.currentTarget.style.background = C.surfaceHover }}
                onMouseLeave={e => { e.currentTarget.style.background = C.surface }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs" style={{ color: C.textMuted }}>{post.date}</span>
                  <span className="text-xs" style={{ color: C.textMuted }}>·</span>
                  <span className="text-xs" style={{ color: C.textMuted }}>{post.readTime}</span>
                </div>
                <h2 className="text-lg font-semibold mb-1 transition-colors group-hover:!text-[#CDB4DB]" style={{ color: C.text }}>
                  {post.title}
                </h2>
                <p className="text-sm" style={{ color: C.textSecondary, lineHeight: 1.6 }}>{post.excerpt}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function BlogPostPage({ postId, setView }: { postId: string; setView: (v: View) => void }) {
  const post = blogPosts.find(p => p.id === postId) || blogPosts[0]

  return (
    <div className="pt-28 pb-24 min-h-screen" style={{ background: C.bg }}>
      <div className="max-w-[660px] mx-auto px-6 md:px-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <button
            onClick={() => setView('blog')}
            className="text-sm mb-12 flex items-center gap-2"
            style={{ color: C.textMuted }}
          >
            <span style={{ color: C.accent }}>←</span> Blog
          </button>

          <div className="flex items-center gap-3 mb-4">
            <time className="text-sm" style={{ color: C.textMuted }}>{post.date}</time>
            <span style={{ color: C.textMuted }}>·</span>
            <span className="text-sm" style={{ color: C.textMuted }}>{post.readTime}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: C.text, lineHeight: 1.2 }}>
            {post.title}
          </h1>

          <div className="flex gap-2 mb-12">
            {post.tags.map(tag => (
              <span key={tag} className="text-xs px-2.5 py-1 rounded-sm" style={{ background: C.surface, color: C.textSecondary }}>
                #{tag}
              </span>
            ))}
          </div>

          <div className="space-y-6">
            {post.content.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-[17px]" style={{ color: C.textSecondary, lineHeight: 1.8 }}>
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// ─── MAIN ──────────────────────────────────────

export default function Design27() {
  const [view, setView] = useState<View>('home')
  const [selectedProject, setSelectedProject] = useState('gosh')
  const [selectedPost, setSelectedPost] = useState('v2-rebuild')

  return (
    <div className="min-h-screen" style={{ background: C.bg, color: C.text }}>
      {/* Selection color */}
      <style>{`::selection { background: ${C.accent}; color: ${C.bg}; }`}</style>

      <Nav currentView={view} setView={setView} />

      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

            {/* ══════════════ HERO ══════════════ */}
            <section className="min-h-screen flex items-center px-6 md:px-10">
              <div className="max-w-[1200px] mx-auto w-full">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-sm tracking-[0.15em] mb-6 font-medium" style={{ color: C.accent }}>
                    PRODUCT-MINDED DEVELOPER
                  </p>

                  <h1
                    className="font-bold tracking-tight mb-6"
                    style={{ fontSize: 'clamp(48px, 8vw, 88px)', lineHeight: 0.95, color: C.text }}
                  >
                    Sina Dilek
                  </h1>

                  <p
                    className="max-w-lg mb-10"
                    style={{ fontSize: '18px', lineHeight: 1.7, color: C.textSecondary }}
                  >
                    I design and build web experiences that are fast, clear, and intentional.
                    <br />
                    CS student at Essex — <strong style={{ color: C.text }}>96/100</strong>, First Class.
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => {
                        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
                      }}
                      className="px-6 py-3 text-sm font-semibold rounded-sm transition-opacity hover:opacity-90"
                      style={{ background: C.accent, color: C.bg }}
                    >
                      View Work
                    </button>
                    <a
                      href="mailto:contact@sinadilek.com"
                      className="px-6 py-3 text-sm font-semibold rounded-sm transition-colors"
                      style={{ border: `1.5px solid ${C.border}`, color: C.textSecondary }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = C.text }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textSecondary }}
                    >
                      Contact
                    </a>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* ══════════════ FEATURED PROJECTS (3 MAX) ══════════════ */}
            <section id="work" className="px-6 md:px-10 pt-24 pb-32">
              <div className="max-w-[1200px] mx-auto">
                <div className="flex items-center gap-3 mb-14">
                  <div className="w-2 h-2 rounded-full" style={{ background: C.accent }} />
                  <span className="text-xs tracking-[0.2em] font-medium" style={{ color: C.textMuted }}>
                    FEATURED WORK
                  </span>
                </div>

                <div className="space-y-6">
                  {projects.map((project, i) => (
                    <motion.button
                      key={project.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      viewport={{ once: true, margin: '-50px' }}
                      onClick={() => { setSelectedProject(project.id); setView('case-study') }}
                      className="group w-full text-left rounded-sm overflow-hidden transition-colors"
                      style={{ background: C.surface, border: `1px solid ${C.border}` }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = C.borderHover }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = C.border }}
                    >
                      <div className="grid md:grid-cols-[1fr,1.2fr] gap-0">
                        {/* Preview */}
                        <div
                          className="aspect-video md:aspect-auto flex items-center justify-center relative overflow-hidden"
                          style={{ background: C.surfaceHover }}
                        >
                          <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{ background: `radial-gradient(circle at 50% 50%, ${C.accent}08, transparent 70%)` }}
                          />
                          <span className="text-sm" style={{ color: C.textMuted }}>[ Screenshot ]</span>
                        </div>

                        {/* Content */}
                        <div className="p-8 md:p-10 flex flex-col justify-center">
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags.map(t => (
                              <span
                                key={t}
                                className="text-xs px-2 py-0.5 rounded-sm"
                                style={{ background: `${C.accent}12`, color: C.accentDark }}
                              >
                                {t}
                              </span>
                            ))}
                          </div>

                          <h3
                            className="text-2xl md:text-3xl font-bold mb-3 transition-colors group-hover:!text-[#CDB4DB]"
                            style={{ color: C.text }}
                          >
                            {project.name}
                          </h3>

                          <p className="text-[15px] mb-6" style={{ color: C.textSecondary, lineHeight: 1.7 }}>
                            {project.impact}
                          </p>

                          <span className="text-sm font-medium" style={{ color: C.accent }}>
                            View Case Study →
                          </span>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </section>

            {/* ══════════════ ABOUT (SHORT) ══════════════ */}
            <section className="px-6 md:px-10 py-24" style={{ background: C.surface }}>
              <div className="max-w-[1200px] mx-auto">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-2 h-2 rounded-full" style={{ background: C.accent }} />
                      <span className="text-xs tracking-[0.2em] font-medium" style={{ color: C.textMuted }}>ABOUT</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: C.text, lineHeight: 1.15 }}>
                      I care about<br />
                      <span style={{ color: C.accent }}>how things work</span><br />
                      and how they feel.
                    </h2>
                    <p className="text-[17px] mb-4" style={{ color: C.textSecondary, lineHeight: 1.8 }}>
                      CS student at the <strong style={{ color: C.text }}>University of Essex</strong> with
                      a focus on building tools that solve real problems. I think about
                      systems, design, and the gap between the two.
                    </p>
                    <p className="text-[17px]" style={{ color: C.textSecondary, lineHeight: 1.8 }}>
                      Currently working across <strong style={{ color: C.text }}>Python, Go, TypeScript, Java</strong>, and <strong style={{ color: C.text }}>C</strong>.
                      Always learning. Always building.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="space-y-4"
                  >
                    {[
                      { label: 'Education', value: 'University of Essex — CS' },
                      { label: 'Year 1 Result', value: '96/100 — First Class Honours' },
                      { label: 'Focus', value: 'Frontend, Systems, Design' },
                      { label: 'Status', value: 'Open to internships & collaboration' },
                    ].map(item => (
                      <div key={item.label} className="p-5 rounded-sm" style={{ background: C.bg }}>
                        <span className="text-xs tracking-[0.15em] block mb-1" style={{ color: C.textMuted }}>
                          {item.label.toUpperCase()}
                        </span>
                        <span className="text-[15px] font-medium" style={{ color: C.text }}>{item.value}</span>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </section>

            {/* ══════════════ SKILLS ══════════════ */}
            <section className="px-6 md:px-10 py-24">
              <div className="max-w-[1200px] mx-auto">
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-2 h-2 rounded-full" style={{ background: C.accent }} />
                  <span className="text-xs tracking-[0.2em] font-medium" style={{ color: C.textMuted }}>
                    CAPABILITIES
                  </span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {['Python', 'Go', 'Java', 'JavaScript', 'TypeScript', 'C', 'React', 'Flask', 'PostgreSQL', 'Git', 'Tailwind CSS', 'Figma'].map(
                    (skill, i) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                        viewport={{ once: true }}
                        className="px-4 py-2 text-sm rounded-sm transition-colors cursor-default"
                        style={{ background: C.surface, color: C.textSecondary, border: `1px solid ${C.border}` }}
                        onMouseEnter={e => {
                          e.currentTarget.style.borderColor = C.accent
                          e.currentTarget.style.color = C.accent
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.borderColor = C.border
                          e.currentTarget.style.color = C.textSecondary
                        }}
                      >
                        {skill}
                      </motion.span>
                    ),
                  )}
                </div>
              </div>
            </section>

            {/* ══════════════ BLOG PREVIEW ══════════════ */}
            <section className="px-6 md:px-10 py-24" style={{ background: C.surface }}>
              <div className="max-w-[1200px] mx-auto">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ background: C.accent }} />
                    <span className="text-xs tracking-[0.2em] font-medium" style={{ color: C.textMuted }}>
                      WRITING
                    </span>
                  </div>
                  <button onClick={() => setView('blog')} className="text-sm font-medium" style={{ color: C.accent }}>
                    View all →
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {blogPosts.slice(0, 2).map((post, i) => (
                    <motion.button
                      key={post.id}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      viewport={{ once: true }}
                      onClick={() => { setSelectedPost(post.id); setView('blog-post') }}
                      className="group text-left p-6 rounded-sm transition-colors"
                      style={{ background: C.bg, border: `1px solid ${C.border}` }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = C.borderHover }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = C.border }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs" style={{ color: C.textMuted }}>{post.date}</span>
                        <span className="text-xs" style={{ color: C.textMuted }}>·</span>
                        <span className="text-xs" style={{ color: C.textMuted }}>{post.readTime}</span>
                      </div>
                      <h3
                        className="text-base font-semibold mb-1 transition-colors group-hover:!text-[#CDB4DB]"
                        style={{ color: C.text }}
                      >
                        {post.title}
                      </h3>
                      <p className="text-sm" style={{ color: C.textSecondary, lineHeight: 1.6 }}>
                        {post.excerpt}
                      </p>
                    </motion.button>
                  ))}
                </div>
              </div>
            </section>

            {/* ══════════════ CONTACT ══════════════ */}
            <section className="px-6 md:px-10 py-32">
              <div className="max-w-[1200px] mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-sm tracking-[0.15em] mb-4 font-medium" style={{ color: C.accent }}>
                    LET'S WORK TOGETHER
                  </p>
                  <h2
                    className="font-bold mb-6"
                    style={{ fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: 1.1, color: C.text }}
                  >
                    Got a project in mind?
                  </h2>
                  <p className="text-lg mb-10 max-w-md mx-auto" style={{ color: C.textSecondary, lineHeight: 1.7 }}>
                    I'm open to internships, freelance work, and collaboration.
                  </p>

                  <div className="flex flex-wrap justify-center gap-4">
                    <a
                      href="mailto:contact@sinadilek.com"
                      className="px-8 py-3.5 text-sm font-semibold rounded-sm transition-opacity hover:opacity-90"
                      style={{ background: C.accent, color: C.bg }}
                    >
                      Send Email
                    </a>
                    <a
                      href="https://github.com/noxire-dev"
                      target="_blank"
                      rel="noopener"
                      className="px-8 py-3.5 text-sm font-semibold rounded-sm transition-colors"
                      style={{ border: `1.5px solid ${C.border}`, color: C.textSecondary }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = C.text }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textSecondary }}
                    >
                      GitHub
                    </a>
                    <a
                      href="https://linkedin.com/in/sina-dilek-0b1b3b1b9"
                      target="_blank"
                      rel="noopener"
                      className="px-8 py-3.5 text-sm font-semibold rounded-sm transition-colors"
                      style={{ border: `1.5px solid ${C.border}`, color: C.textSecondary }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = C.text }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textSecondary }}
                    >
                      LinkedIn
                    </a>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* ══════════════ FOOTER ══════════════ */}
            <footer className="px-6 md:px-10 py-8" style={{ borderTop: `1px solid ${C.border}` }}>
              <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                <span className="text-sm" style={{ color: C.textMuted }}>
                  © {new Date().getFullYear()} Sina Dilek
                </span>
                <div className="flex items-center gap-6">
                  <a href="https://github.com/noxire-dev" target="_blank" rel="noopener" className="text-sm transition-colors hover:!text-[#CDB4DB]" style={{ color: C.textMuted }}>
                    GitHub
                  </a>
                  <a href="https://linkedin.com/in/sina-dilek-0b1b3b1b9" target="_blank" rel="noopener" className="text-sm transition-colors hover:!text-[#CDB4DB]" style={{ color: C.textMuted }}>
                    LinkedIn
                  </a>
                  <a href="mailto:contact@sinadilek.com" className="text-sm transition-colors hover:!text-[#CDB4DB]" style={{ color: C.textMuted }}>
                    Email
                  </a>
                </div>
              </div>
            </footer>
          </motion.div>
        )}

        {view === 'case-study' && (
          <motion.div key="case-study" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <CaseStudyPage projectId={selectedProject} setView={setView} />
          </motion.div>
        )}
        {view === 'blog' && (
          <motion.div key="blog" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <BlogListPage setView={setView} setSelectedPost={setSelectedPost} />
          </motion.div>
        )}
        {view === 'blog-post' && (
          <motion.div key="blog-post" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <BlogPostPage postId={selectedPost} setView={setView} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
