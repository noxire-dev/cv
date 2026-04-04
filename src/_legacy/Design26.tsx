import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Design 26: PASTEL BRUTALIST MIDNIGHT ★ THE NEW FAVORITE ★
// Bold constructivist shapes + lavender/pastel palette on deep midnight
// Same aggressive geometry as Design 4/12/21 but with a completely unique color story
// Recruiter-friendly: clear hierarchy, stunning visuals, shows real design taste

type View = 'home' | 'project' | 'blog' | 'blog-post'

// Palette
const C = {
  lavender: '#CDB4DB',
  lavenderLight: '#E8D5F0',
  lavenderDark: '#A78BBA',
  midnight: '#0D0D12',
  midnightLight: '#16161F',
  midnightSurface: '#1E1E2A',
  midnightBorder: '#2A2A3A',
  mauve: '#9B72B0',
  textPrimary: '#E8E0ED',
  textSecondary: '#8A8196',
  textMuted: '#5A5268',
}

const projects = [
  { 
    id: 'gosh',
    name: 'GoSH', 
    num: '01', 
    desc: 'Shell written in Go',
    tagline: 'A minimalist shell implementation',
    description: 'GoSH demonstrates core systems programming concepts including process management, I/O redirection, and command parsing. Built in Go for learning purposes.',
    tech: ['Go', 'Systems Programming'],
    year: '2025',
    link: 'https://github.com/noxire-dev/GoSH',
    features: ['Command parsing with pipes', 'Process spawning', 'I/O redirection', 'Built-in commands']
  },
  { 
    id: 'moji',
    name: 'Moji', 
    num: '02', 
    desc: 'Note taking app',
    tagline: 'Productivity suite with clean UI',
    description: 'A note-taking and todo application focused on UI/UX design. Built with Flask and JavaScript for managing daily tasks and notes.',
    tech: ['Python', 'Flask', 'JavaScript', 'SQLite'],
    year: '2025',
    link: 'https://github.com/noxire-dev/moji',
    features: ['Rich text notes', 'Task management', 'Tags & categories', 'Dark mode']
  },
  { 
    id: 'lorekeeper',
    name: 'LoreKeeper', 
    num: '03', 
    desc: 'RPG marketplace',
    tagline: 'E-commerce for tabletop RPGs',
    description: 'An e-commerce platform for free tabletop RPG materials. Browse, download, and share resources with the community.',
    tech: ['Python', 'PostgreSQL', 'JavaScript'],
    year: '2025',
    link: 'https://github.com/noxire-dev/LoreKeeper',
    features: ['User accounts', 'Resource library', 'Community ratings', 'PDF viewer']
  },
  { 
    id: 'midnight',
    name: 'Midnight Moon', 
    num: '04', 
    desc: 'VSCode themes',
    tagline: 'Dark theme collection',
    description: 'Carefully crafted dark themes for Visual Studio Code. Designed for long coding sessions with colors chosen to reduce eye strain.',
    tech: ['Design', 'JSON'],
    year: '2024',
    link: 'https://github.com/noxire-dev/midnight-theme',
    features: ['Multiple variants', 'Semantic highlighting', 'Terminal colors', 'UI theming']
  },
]

const blogPosts = [
  {
    id: 'v2-rebuild',
    title: 'A Fresh Start with V2',
    date: '2025-11-19',
    readTime: '3 min',
    excerpt: 'Rebuilding my portfolio with modern tools and a fresh perspective.',
    content: `When I first started this project 3 years ago, I used Flask and some weird design choices. Knowing only Python at the time, Flask felt magical.

I've since learned a lot and I think it's time to give it a fresh start. I want to add more complex features like blog post capabilities.

I will be using React, TypeScript, and Tailwind CSS. It will be a great learning experience and hopefully make my website even better!`,
    tags: ['development', 'portfolio']
  },
  {
    id: 'first-year',
    title: 'Finished My First Year at University',
    date: '2025-08-28',
    readTime: '2 min',
    excerpt: 'Reflecting on achieving 96/100 and First Class Honours.',
    content: `I finished my first year at the University of Essex and couldn't be happier with the results — I achieved 96/100 overall and a First Class.

I'm proud of the work I put in, and grateful for the support and guidance I had along the way. Really excited to carry this momentum into my second year!`,
    tags: ['university', 'achievement']
  },
  {
    id: 'learning-c',
    title: 'Started Learning C',
    date: '2025-02-23',
    readTime: '2 min',
    excerpt: 'Diving into low-level programming to understand systems better.',
    content: `I wanted to dive into low-level programming so I started learning C not to be good at it but understand how C++, C# and Rust works.

It's hair pulling to implement the functions I am so used to using in high level languages but it's also a lot of fun.`,
    tags: ['learning', 'C']
  },
]

const skills = ['Python', 'Go', 'Java', 'JavaScript', 'TypeScript', 'C', 'Flask', 'React']

function Navigation({ currentView, setView }: { currentView: View; setView: (v: View) => void }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'backdrop-blur-xl bg-[#0D0D12]/80' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
        <button 
          onClick={() => setView('home')} 
          className="group flex items-center gap-3"
        >
          <div className="w-8 h-8 border-2 flex items-center justify-center transition-colors group-hover:bg-[#CDB4DB] group-hover:border-[#CDB4DB]"
            style={{ borderColor: C.lavender }}
          >
            <span className="text-xs font-black group-hover:text-[#0D0D12]" style={{ color: C.lavender }}>SD</span>
          </div>
          <span className="text-sm tracking-[0.2em] font-medium hidden md:block" style={{ color: C.textSecondary }}>
            SINA DILEK
          </span>
        </button>

        <div className="flex items-center gap-8">
          <button 
            onClick={() => setView('home')}
            className="text-sm tracking-widest transition-colors"
            style={{ color: currentView === 'home' ? C.lavender : C.textMuted }}
          >
            WORK
          </button>
          <button 
            onClick={() => setView('blog')}
            className="text-sm tracking-widest transition-colors"
            style={{ color: (currentView === 'blog' || currentView === 'blog-post') ? C.lavender : C.textMuted }}
          >
            BLOG
          </button>
          <Link to="/" className="text-sm tracking-widest transition-colors hover:opacity-70" style={{ color: C.textMuted }}>
            EXIT
          </Link>
        </div>
      </div>
    </nav>
  )
}

function ProjectPage({ projectId, setView }: { projectId: string; setView: (v: View) => void }) {
  const project = projects.find(p => p.id === projectId) || projects[0]

  return (
    <div className="pt-28 min-h-screen relative z-10" style={{ background: C.midnight }}>
      <div className="max-w-5xl mx-auto px-6 md:px-12 pb-24">
        <motion.button 
          onClick={() => setView('home')} 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm mb-12 flex items-center gap-2 transition-colors hover:opacity-80"
          style={{ color: C.textMuted }}
        >
          <span style={{ color: C.lavender }}>←</span> Back to work
        </motion.button>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {/* Project header */}
          <div className="flex items-start gap-6 mb-4">
            <span className="text-7xl md:text-8xl font-black" style={{ color: C.lavender, opacity: 0.3 }}>
              {project.num}
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-3" style={{ color: C.textPrimary }}>
            {project.name}
          </h1>
          <p className="text-xl mb-10" style={{ color: C.textSecondary }}>{project.tagline}</p>

          {/* Screenshot placeholder */}
          <div className="aspect-video mb-12 border-2 flex items-center justify-center relative overflow-hidden"
            style={{ borderColor: C.midnightBorder, background: C.midnightLight }}
          >
            <div className="absolute inset-0 opacity-20" style={{
              background: `radial-gradient(circle at 30% 50%, ${C.lavender}22, transparent 60%)`
            }} />
            <span style={{ color: C.textMuted }}>[ Project Screenshot ]</span>
          </div>

          {/* Metadata grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-14 pb-14 border-b-2" style={{ borderColor: C.midnightBorder }}>
            <div>
              <span className="text-xs tracking-widest block mb-2" style={{ color: C.textMuted }}>YEAR</span>
              <p className="text-3xl font-black" style={{ color: C.lavender }}>{project.year}</p>
            </div>
            <div>
              <span className="text-xs tracking-widest block mb-3" style={{ color: C.textMuted }}>STACK</span>
              <div className="flex flex-wrap gap-2">
                {project.tech.map(t => (
                  <span key={t} className="px-3 py-1 text-sm font-medium" 
                    style={{ background: C.lavender, color: C.midnight }}
                  >{t}</span>
                ))}
              </div>
            </div>
            <div>
              <span className="text-xs tracking-widest block mb-2" style={{ color: C.textMuted }}>LINK</span>
              <a href={project.link} target="_blank" rel="noopener" 
                className="font-bold hover:underline"
                style={{ color: C.lavender }}
              >
                View on GitHub →
              </a>
            </div>
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-2 gap-14">
            <div>
              <h2 className="text-2xl font-black mb-5" style={{ color: C.textPrimary }}>About</h2>
              <p className="leading-relaxed" style={{ color: C.textSecondary }}>{project.description}</p>
            </div>
            <div>
              <h2 className="text-2xl font-black mb-5" style={{ color: C.textPrimary }}>Features</h2>
              <ul className="space-y-4">
                {project.features.map((f, i) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="text-sm font-mono mt-0.5" style={{ color: C.lavender }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span style={{ color: C.textSecondary }}>{f}</span>
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
    <div className="pt-28 min-h-screen relative z-10" style={{ background: C.midnight }}>
      <div className="max-w-5xl mx-auto px-6 md:px-12 pb-24">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center gap-5 mb-14">
            <div className="w-3 h-10" style={{ background: C.lavender }} />
            <h1 className="text-5xl font-black" style={{ color: C.textPrimary }}>BLOG</h1>
          </div>

          <div className="space-y-4">
            {blogPosts.map((post, i) => (
              <motion.button
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => { setSelectedPost(post.id); setView('blog-post') }}
                className="group w-full text-left p-8 border-2 transition-all duration-300"
                style={{ 
                  borderColor: C.midnightBorder,
                  background: C.midnightLight
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = C.lavender
                  e.currentTarget.style.background = C.midnightSurface
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = C.midnightBorder
                  e.currentTarget.style.background = C.midnightLight
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs" style={{ color: C.textMuted }}>{post.date}</span>
                  <span className="text-xs" style={{ color: C.textMuted }}>·</span>
                  <span className="text-xs" style={{ color: C.textMuted }}>{post.readTime}</span>
                </div>
                <h2 className="text-2xl font-black mb-2" style={{ color: C.textPrimary }}>{post.title}</h2>
                <p style={{ color: C.textSecondary }}>{post.excerpt}</p>
                <div className="flex gap-2 mt-4">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-1" style={{ background: `${C.lavender}15`, color: C.lavenderDark }}>
                      #{tag}
                    </span>
                  ))}
                </div>
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
    <div className="pt-28 min-h-screen relative z-10" style={{ background: C.midnight }}>
      <div className="max-w-3xl mx-auto px-6 md:px-12 pb-24">
        <motion.button 
          onClick={() => setView('blog')} 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm mb-12 flex items-center gap-2 hover:opacity-80 transition-opacity"
          style={{ color: C.textMuted }}
        >
          <span style={{ color: C.lavender }}>←</span> Back to blog
        </motion.button>

        <motion.article initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center gap-3 mb-4">
            <time className="text-sm" style={{ color: C.textMuted }}>{post.date}</time>
            <span style={{ color: C.textMuted }}>·</span>
            <span className="text-sm" style={{ color: C.textMuted }}>{post.readTime}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-6" style={{ color: C.textPrimary }}>
            {post.title}
          </h1>

          <div className="flex gap-2 mb-12">
            {post.tags.map(tag => (
              <span key={tag} className="text-xs px-3 py-1 font-medium" style={{ background: C.lavender, color: C.midnight }}>
                #{tag}
              </span>
            ))}
          </div>

          <div className="space-y-6">
            {post.content.split('\n\n').map((paragraph, i) => (
              <p key={i} className="leading-relaxed text-lg" style={{ color: C.textSecondary }}>
                {paragraph}
              </p>
            ))}
          </div>
        </motion.article>
      </div>
    </div>
  )
}

export default function Design26() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 30 })

  // Scroll-driven background transforms
  const circleScale = useTransform(smoothProgress, [0, 0.3], [1, 0.6])
  const circleX = useTransform(smoothProgress, [0, 0.4], ['0%', '40%'])
  const circleY = useTransform(smoothProgress, [0, 0.4], ['0%', '20%'])
  const diagonalSkew = useTransform(smoothProgress, [0, 0.5], [0, -8])
  const gridOpacity = useTransform(smoothProgress, [0, 0.2], [0.04, 0.02])

  // Mouse parallax for hero
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  const [view, setView] = useState<View>('home')
  const [selectedProject, setSelectedProject] = useState('gosh')
  const [selectedPost, setSelectedPost] = useState('v2-rebuild')

  return (
    <div 
      ref={containerRef}
      className="min-h-screen overflow-x-hidden"
      style={{ 
        background: C.midnight, 
        color: C.textPrimary,
        fontFamily: "'Inter', -apple-system, system-ui, sans-serif"
      }}
    >
      {/* Custom selection color */}
      <style>{`
        ::selection { background: ${C.lavender}; color: ${C.midnight}; }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px ${C.lavender}20; }
          50% { box-shadow: 0 0 40px ${C.lavender}40; }
        }

        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          20% { transform: translate(-15%, 5%); }
          30% { transform: translate(7%, -25%); }
          40% { transform: translate(-5%, 25%); }
          50% { transform: translate(-15%, 10%); }
          60% { transform: translate(15%, 0%); }
          70% { transform: translate(0%, 15%); }
          80% { transform: translate(3%, 35%); }
          90% { transform: translate(-10%, 10%); }
        }
      `}</style>

      {/* Film grain overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        animation: 'grain 8s steps(10) infinite',
      }} />

      {/* Fixed geometric background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Large lavender circle */}
        <motion.div
          style={{ 
            scale: circleScale, 
            x: circleX,
            y: circleY,
          }}
          className="absolute -top-[15vw] -right-[15vw] w-[60vw] h-[60vw] rounded-full"
          animate={{
            x: mousePos.x * 0.3,
            y: mousePos.y * 0.3,
          }}
          transition={{ type: 'spring', stiffness: 50, damping: 30 }}
        >
          <div className="w-full h-full rounded-full" style={{ 
            background: `radial-gradient(circle, ${C.lavender}18 0%, ${C.lavender}08 40%, transparent 70%)`,
          }} />
        </motion.div>

        {/* Dark diagonal block */}
        <motion.div
          style={{ skewX: diagonalSkew }}
          className="absolute bottom-0 left-0 w-[45vw] h-[25vh] origin-bottom-left"
          animate={{
            x: mousePos.x * -0.1,
          }}
          transition={{ type: 'spring', stiffness: 50, damping: 30 }}
        >
          <div className="w-full h-full" style={{ background: C.midnightLight }} />
        </motion.div>

        {/* Subtle lavender accent bar */}
        <div className="absolute top-0 left-[8vw] w-[2px] h-full" style={{ 
          background: `linear-gradient(to bottom, transparent, ${C.lavender}15, transparent)` 
        }} />
        <div className="absolute top-0 right-[12vw] w-[1px] h-full" style={{ 
          background: `linear-gradient(to bottom, transparent, ${C.lavender}08, transparent)` 
        }} />

        {/* Grid lines */}
        <motion.div 
          className="absolute inset-0"
          style={{
            opacity: gridOpacity,
            backgroundImage: `linear-gradient(${C.lavender}40 1px, transparent 1px), linear-gradient(90deg, ${C.lavender}40 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      <Navigation currentView={view} setView={setView} />

      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* ============ HERO ============ */}
            <section className="min-h-screen relative flex items-center px-6 md:px-12">
              <div className="relative z-10 max-w-5xl w-full">
                <motion.div
                  initial={{ opacity: 0, x: -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Overline */}
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-10 h-[3px]" style={{ background: C.lavender }} />
                    <span className="text-sm tracking-[0.4em] font-medium" style={{ color: C.lavenderDark }}>
                      DEVELOPER & DESIGNER
                    </span>
                  </div>

                  {/* Name */}
                  <h1 className="text-[14vw] md:text-[10vw] leading-[0.88] font-black tracking-tighter">
                    <motion.span 
                      className="block"
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.7 }}
                      style={{ color: C.textPrimary }}
                    >
                      SINA
                    </motion.span>
                    <motion.span 
                      className="block flex items-center gap-4 md:gap-6"
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35, duration: 0.7 }}
                    >
                      <span style={{ color: C.lavender }}>DILEK</span>
                      <motion.div 
                        className="w-14 h-14 md:w-20 md:h-20 rounded-full border-[3px]"
                        style={{ borderColor: C.lavender }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      >
                        <div className="w-full h-full rounded-full border-[3px] border-dashed" 
                          style={{ borderColor: `${C.lavender}40` }} 
                        />
                      </motion.div>
                    </motion.span>
                  </h1>

                  {/* Tags */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-12 flex flex-wrap items-center gap-3"
                  >
                    <span className="px-5 py-2.5 text-sm tracking-widest font-medium"
                      style={{ background: C.lavender, color: C.midnight }}
                    >
                      UNIVERSITY OF ESSEX
                    </span>
                    <span className="px-5 py-2.5 text-sm tracking-widest font-bold border-2"
                      style={{ borderColor: C.lavender, color: C.lavender }}
                    >
                      96 / 100
                    </span>
                    <span className="px-5 py-2.5 text-sm tracking-widest"
                      style={{ background: C.midnightSurface, color: C.textSecondary }}
                    >
                      OPEN TO WORK
                    </span>
                  </motion.div>

                  {/* Scroll indicator */}
                  <motion.div 
                    className="absolute bottom-12 left-0"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-[1px] h-16" style={{ background: `linear-gradient(to bottom, ${C.lavender}, transparent)` }} />
                      <span className="text-xs tracking-widest" style={{ color: C.textMuted }}>SCROLL</span>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </section>

            {/* ============ ABOUT ============ */}
            <section className="relative z-10">
              <div className="grid md:grid-cols-2">
                <div className="p-12 md:p-20" style={{ background: C.midnightLight }}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-3 h-8" style={{ background: C.lavender }} />
                      <span className="text-xs tracking-[0.3em]" style={{ color: C.textMuted }}>ABOUT</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black mb-8" style={{ color: C.textPrimary }}>
                      Building things<br />
                      <span style={{ color: C.lavender }}>that matter.</span>
                    </h2>
                    <p className="text-lg leading-relaxed" style={{ color: C.textSecondary }}>
                      CS student at the University of Essex. I build tools, explore systems programming,
                      and care deeply about design. Started with Python — now working across Go, Java,
                      JavaScript, TypeScript, and C.
                    </p>
                    <div className="mt-8 flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ background: C.lavender }} />
                      <span className="text-sm tracking-widest" style={{ color: C.textMuted }}>
                        FIRST CLASS HONOURS
                      </span>
                    </div>
                  </motion.div>
                </div>

                <div className="p-12 md:p-20 flex items-center justify-center" style={{ background: C.midnight }}>
                  <motion.div 
                    className="relative w-full aspect-square max-w-xs"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* Geometric portrait placeholder */}
                    <div className="absolute inset-0 border-2" style={{ borderColor: C.midnightBorder }} />
                    <div className="absolute inset-4" style={{ background: C.lavender, opacity: 0.1 }} />
                    <motion.div 
                      className="absolute inset-8 rounded-full border-2" 
                      style={{ borderColor: C.lavender }}
                      animate={{ rotate: -360 }}
                      transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl font-black" style={{ color: C.lavender }}>SD</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* ============ SKILLS MARQUEE ============ */}
            <section className="relative z-10 py-16 overflow-hidden border-y-2" style={{ borderColor: C.midnightBorder }}>
              <motion.div
                animate={{ x: '-50%' }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="flex whitespace-nowrap"
              >
                {[...skills, ...skills, ...skills].map((skill, i) => (
                  <span key={i} className="text-5xl md:text-7xl font-black mx-6" style={{ color: `${C.lavender}18` }}>
                    {skill}
                    <span className="mx-6" style={{ color: C.lavender }}>·</span>
                  </span>
                ))}
              </motion.div>
              {/* Second row going opposite direction */}
              <motion.div
                animate={{ x: '0%' }}
                initial={{ x: '-50%' }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="flex whitespace-nowrap mt-4"
              >
                {[...skills, ...skills, ...skills].map((skill, i) => (
                  <span key={i} className="text-3xl md:text-5xl font-black mx-6" style={{ color: `${C.lavender}0D` }}>
                    {skill}
                    <span className="mx-6" style={{ color: `${C.lavender}30` }}>◆</span>
                  </span>
                ))}
              </motion.div>
            </section>

            {/* ============ PROJECTS ============ */}
            <section className="relative z-10 px-6 md:px-12 py-24">
              <div className="max-w-6xl mx-auto">
                <motion.div 
                  className="flex items-center gap-4 mb-16"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-3 h-8" style={{ background: C.lavender }} />
                  <span className="text-xs tracking-[0.3em]" style={{ color: C.textMuted }}>SELECTED WORK</span>
                </motion.div>

                <div className="space-y-4">
                  {projects.map((project, i) => (
                    <motion.button
                      key={project.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      viewport={{ once: true }}
                      onClick={() => { setSelectedProject(project.id); setView('project') }}
                      className="group w-full text-left p-8 md:p-10 border-2 transition-all duration-300"
                      style={{ 
                        borderColor: C.midnightBorder,
                        background: C.midnightLight,
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = C.lavender
                        e.currentTarget.style.background = C.midnightSurface
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = C.midnightBorder
                        e.currentTarget.style.background = C.midnightLight
                      }}
                    >
                      <div className="flex flex-col md:flex-row md:items-center gap-6">
                        <span className="text-6xl md:text-7xl font-black transition-colors duration-300"
                          style={{ color: `${C.lavender}15` }}
                          ref={el => {
                            if (el) {
                              el.parentElement?.parentElement?.addEventListener('mouseenter', () => {
                                el.style.color = `${C.lavender}50`
                              })
                              el.parentElement?.parentElement?.addEventListener('mouseleave', () => {
                                el.style.color = `${C.lavender}15`
                              })
                            }
                          }}
                        >
                          {project.num}
                        </span>
                        <div className="flex-1">
                          <h3 className="text-2xl md:text-3xl font-black mb-1 transition-colors duration-300" 
                            style={{ color: C.textPrimary }}
                          >
                            {project.name}
                          </h3>
                          <p className="text-base" style={{ color: C.textSecondary }}>{project.desc}</p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {project.tech.map(t => (
                              <span key={t} className="text-xs px-2 py-1" 
                                style={{ background: `${C.lavender}10`, color: C.lavenderDark }}
                              >{t}</span>
                            ))}
                          </div>
                        </div>
                        <span className="text-3xl transition-transform duration-300 group-hover:translate-x-3" style={{ color: C.lavender }}>
                          →
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </section>

            {/* ============ BLOG PREVIEW ============ */}
            <section className="relative z-10 px-6 md:px-12 py-24" style={{ background: C.midnightLight }}>
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-12">
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-8" style={{ background: C.lavender }} />
                    <span className="text-xs tracking-[0.3em]" style={{ color: C.textMuted }}>RECENT WRITING</span>
                  </div>
                  <button onClick={() => setView('blog')} className="text-sm font-medium hover:underline"
                    style={{ color: C.lavender }}
                  >
                    View all →
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {blogPosts.slice(0, 2).map((post, i) => (
                    <motion.button
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      onClick={() => { setSelectedPost(post.id); setView('blog-post') }}
                      className="group text-left p-8 border-2 transition-all duration-300"
                      style={{ borderColor: C.midnightBorder, background: C.midnight }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = C.lavender }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = C.midnightBorder }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs" style={{ color: C.textMuted }}>{post.date}</span>
                        <span className="text-xs" style={{ color: C.textMuted }}>·</span>
                        <span className="text-xs" style={{ color: C.textMuted }}>{post.readTime}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 transition-colors duration-300 group-hover:!text-[#CDB4DB]" 
                        style={{ color: C.textPrimary }}
                      >
                        {post.title}
                      </h3>
                      <p className="text-sm" style={{ color: C.textSecondary }}>{post.excerpt}</p>
                    </motion.button>
                  ))}
                </div>
              </div>
            </section>

            {/* ============ CONTACT ============ */}
            <section className="relative z-10 px-6 md:px-12 py-24">
              <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="text-6xl md:text-8xl font-black leading-[0.9]">
                      <span style={{ color: C.textPrimary }}>LET'S</span>
                      <br />
                      <span style={{ color: C.lavender }}>CONNECT</span>
                    </h2>
                    <p className="mt-6 text-lg" style={{ color: C.textSecondary }}>
                      Looking for internships and collaboration opportunities.
                    </p>
                  </motion.div>

                  <div className="space-y-4">
                    <motion.a
                      href="https://github.com/noxire-dev"
                      target="_blank"
                      rel="noopener"
                      whileHover={{ x: 8 }}
                      className="group flex items-center justify-between p-6 border-2 transition-colors duration-300"
                      style={{ borderColor: C.midnightBorder }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = C.lavender
                        e.currentTarget.style.background = C.lavender
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = C.midnightBorder
                        e.currentTarget.style.background = 'transparent'
                      }}
                    >
                      <span className="text-xl font-black group-hover:!text-[#0D0D12]" style={{ color: C.textPrimary }}>
                        GITHUB
                      </span>
                      <span className="text-2xl group-hover:!text-[#0D0D12]" style={{ color: C.lavender }}>→</span>
                    </motion.a>
                    <motion.a
                      href="https://linkedin.com/in/sina-dilek-0b1b3b1b9"
                      target="_blank"
                      rel="noopener"
                      whileHover={{ x: 8 }}
                      className="group flex items-center justify-between p-6 border-2 transition-colors duration-300"
                      style={{ borderColor: C.midnightBorder }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = C.lavender
                        e.currentTarget.style.background = `${C.lavender}15`
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = C.midnightBorder
                        e.currentTarget.style.background = 'transparent'
                      }}
                    >
                      <span className="text-xl font-black" style={{ color: C.textPrimary }}>LINKEDIN</span>
                      <span className="text-2xl" style={{ color: C.lavender }}>→</span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </section>

            {/* ============ FOOTER ============ */}
            <footer className="relative z-10 px-6 md:px-12 py-8 border-t-2" style={{ borderColor: C.midnightBorder }}>
              <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{ background: C.lavender }} />
                  <span className="text-sm tracking-widest" style={{ color: C.textMuted }}>
                    © {new Date().getFullYear()} SINA DILEK
                  </span>
                </div>
                <span className="text-sm tracking-widest" style={{ color: C.textMuted }}>
                  PASTEL BRUTALIST
                </span>
              </div>
            </footer>
          </motion.div>
        )}

        {view === 'project' && (
          <motion.div key="project" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ProjectPage projectId={selectedProject} setView={setView} />
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
