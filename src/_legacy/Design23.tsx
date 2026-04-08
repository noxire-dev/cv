import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Design 23: THE MASTERPIECE — REMASTERED ★ MY FAVORITE ★
// Original: Design 15
// The ultimate fusion - terminal brutalism meets constructivist geometry
// Added: Full blog & project pages, refined readability, polished interactions
// As a hiring manager, this design stands out for its atmosphere and professionalism

type View = 'home' | 'project' | 'blog' | 'blog-post'

const projects = [
  { 
    id: 'gosh',
    name: 'GoSH', 
    num: '01',
    desc: 'Shell implementation',
    tech: 'Go',
    tagline: 'A minimalist shell written in Go',
    description: 'GoSH is a minimalist shell implementation demonstrating core systems programming concepts including process management, I/O redirection, and command parsing. Built for learning how shells work under the hood.',
    technologies: ['Go', 'Systems Programming'],
    year: '2025',
    link: 'https://github.com/noxire-dev/GoSH',
    features: ['Full command parsing with pipes', 'Process spawning and management', 'I/O redirection (stdin, stdout, stderr)', 'Built-in commands (cd, exit, history)']
  },
  { 
    id: 'moji',
    name: 'Moji', 
    num: '02',
    desc: 'Productivity suite',
    tech: 'Python/Flask',
    tagline: 'Note taking & productivity suite',
    description: 'A note-taking and todo application focused on UI/UX design. Built with Flask and JavaScript for managing daily tasks with clean, intuitive interface.',
    technologies: ['Python', 'Flask', 'JavaScript', 'SQLite'],
    year: '2025',
    link: 'https://github.com/noxire-dev/moji',
    features: ['Rich text notes with markdown', 'Task management with priorities', 'Tags & categories', 'Dark mode support']
  },
  { 
    id: 'lorekeeper',
    name: 'LoreKeeper', 
    num: '03',
    desc: 'RPG platform',
    tech: 'Full Stack',
    tagline: 'E-commerce for tabletop RPGs',
    description: 'An e-commerce platform for free tabletop RPG materials. Browse, download, and share game resources with the TTRPG community.',
    technologies: ['Python', 'PostgreSQL', 'JavaScript'],
    year: '2025',
    link: 'https://github.com/noxire-dev/LoreKeeper',
    features: ['User accounts & profiles', 'Resource library with search', 'Community ratings', 'Built-in PDF viewer']
  },
  { 
    id: 'midnight',
    name: 'Midnight Moon', 
    num: '04',
    desc: 'Theme collection',
    tech: 'Design',
    tagline: 'VSCode dark theme collection',
    description: 'Carefully crafted dark themes for Visual Studio Code. Each theme designed for long coding sessions with colors chosen to reduce eye strain.',
    technologies: ['Design', 'JSON'],
    year: '2024',
    link: 'https://github.com/noxire-dev/midnight-theme',
    features: ['Multiple theme variants', 'Semantic token highlighting', 'Terminal colors', 'Full UI theming']
  },
]

const blogPosts = [
  {
    id: 'v2-rebuild',
    title: 'A Fresh Start with V2',
    date: '2025-11-19',
    readTime: '3 min',
    excerpt: 'Rebuilding my portfolio with modern tools and fresh perspective.',
    content: `When I first started this project 3 years ago, I used Flask and some weird design choices. Knowing only Python at the time, Flask felt magical.

I've since learned a lot and I think it's time to give it a fresh start. I want to add more complex features like blog post capabilities.

I will be using React, TypeScript, and Tailwind CSS. It will be a great learning experience and hopefully make my website even better!

The new stack allows for much faster iteration and a more modern development workflow.`,
    tags: ['development', 'portfolio', 'react']
  },
  {
    id: 'first-year',
    title: 'Finished My First Year at University',
    date: '2025-08-28',
    readTime: '4 min',
    excerpt: 'Achieved 96/100 and First Class Honours at Essex.',
    content: `I finished my first year at the University of Essex and couldn't be happier with the results — I achieved 96/100 overall and a First Class.

I'm proud of the work I put in, and grateful for the support and guidance I had along the way. Really excited to carry this momentum into my second year!

The coursework covered everything from algorithms to software engineering principles.`,
    tags: ['university', 'achievement']
  },
  {
    id: 'learning-c',
    title: 'Started Learning C',
    date: '2025-02-23',
    readTime: '3 min',
    excerpt: 'Diving into low-level programming to understand systems.',
    content: `I wanted to dive into low-level programming so I started learning C not to be good at it but understand how C++, C# and Rust works.

It's hair pulling to implement the functions I am so used to using in high level languages but it's also a lot of fun.

I'm loving the simplicity and syntax of C. There's something satisfying about managing memory manually.`,
    tags: ['learning', 'C']
  },
]

const skills = ['Python', 'Go', 'Java', 'JavaScript', 'TypeScript', 'C', 'Flask', 'React']

function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const handler = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])
  
  return pos
}

function MasterBackground() {
  const mousePos = useMousePosition()
  const gradientX = typeof window !== 'undefined' ? (mousePos.x / window.innerWidth) * 100 : 50
  const gradientY = typeof window !== 'undefined' ? (mousePos.y / window.innerHeight) * 100 : 50

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute inset-0 bg-neutral-950" />
      <div 
        className="absolute w-[600px] h-[600px] rounded-full opacity-25 blur-3xl transition-all duration-700"
        style={{
          background: 'radial-gradient(circle, rgba(239,68,68,0.4) 0%, transparent 70%)',
          left: `calc(${gradientX}% - 300px)`,
          top: `calc(${gradientY}% - 300px)`,
        }}
      />
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-red-500 via-red-500/50 to-transparent" />
    </div>
  )
}

function Navigation({ currentView, setView }: { currentView: View; setView: (v: View) => void }) {
  const [time, setTime] = useState(new Date())
  
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-5 bg-neutral-950/80 backdrop-blur-sm border-b border-neutral-800/50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <button onClick={() => setView('home')} className="text-white font-black text-lg tracking-tight hover:text-red-500 transition-colors">
          SD<span className="text-red-500">.</span>
        </button>
        <div className="flex items-center gap-6 md:gap-8">
          <button 
            onClick={() => setView('home')}
            className={`text-xs tracking-widest transition-colors ${currentView === 'home' ? 'text-red-500' : 'text-neutral-500 hover:text-white'}`}
          >
            WORK
          </button>
          <button 
            onClick={() => setView('blog')}
            className={`text-xs tracking-widest transition-colors ${currentView === 'blog' || currentView === 'blog-post' ? 'text-red-500' : 'text-neutral-500 hover:text-white'}`}
          >
            BLOG
          </button>
          <span className="text-red-500 text-xs tabular-nums hidden md:inline">{time.toLocaleTimeString()}</span>
          <Link to="/" className="text-neutral-600 text-xs tracking-widest hover:text-white transition-colors">
            EXIT
          </Link>
        </div>
      </div>
    </header>
  )
}

function GlitchReveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [glitch, setGlitch] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      onViewportEnter={() => {
        setGlitch(true)
        setTimeout(() => setGlitch(false), 200)
      }}
      className={`relative ${className}`}
    >
      {glitch && (
        <>
          <span className="absolute inset-0 text-red-500 translate-x-[2px] opacity-60">{children}</span>
          <span className="absolute inset-0 text-cyan-500 -translate-x-[2px] opacity-60">{children}</span>
        </>
      )}
      {children}
    </motion.div>
  )
}

function SkillBar({ name, index }: { name: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04 }}
      className="group flex items-center gap-4 py-3 border-b border-neutral-800/50 hover:border-red-500/50 transition-colors cursor-default"
    >
      <span className="text-neutral-600 text-xs w-6">{String(index + 1).padStart(2, '0')}</span>
      <span className="text-base text-neutral-300 group-hover:text-white transition-colors flex-1">
        {name}
      </span>
      <div className="w-24 h-0.5 bg-neutral-800 relative overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          transition={{ delay: index * 0.08, duration: 0.6 }}
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-500 to-red-600"
        />
      </div>
    </motion.div>
  )
}

function HomePage({ setView, setSelectedProject, setSelectedPost }: { 
  setView: (v: View) => void
  setSelectedProject: (id: string) => void
  setSelectedPost: (id: string) => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  
  const heroOpacity = useTransform(smoothScroll, [0, 0.12], [1, 0])
  const heroScale = useTransform(smoothScroll, [0, 0.12], [1, 0.97])
  const heroY = useTransform(smoothScroll, [0, 0.12], [0, -30])

  return (
    <div ref={containerRef} className="pt-16">
      {/* Hero */}
      <motion.section 
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="min-h-[90vh] flex items-center px-6 md:px-10 sticky top-0"
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-neutral-500 tracking-widest">AVAILABLE FOR WORK</span>
              </motion.div>

              <GlitchReveal>
                <h1 className="text-[12vw] md:text-[8vw] font-black leading-[0.9] tracking-tighter">
                  <span className="block text-white">SINA</span>
                  <span className="block text-red-500">DILEK</span>
                </h1>
              </GlitchReveal>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 text-lg text-neutral-400 max-w-lg leading-relaxed"
              >
                Building small tools and learning systems. 
                CS student who codes for the pure joy of it.
              </motion.p>
            </div>

            <div className="md:col-span-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="space-y-4 md:text-right"
              >
                <div>
                  <div className="text-xs text-neutral-600 mb-1">INSTITUTION</div>
                  <div className="text-neutral-300">University of Essex</div>
                </div>
                <div>
                  <div className="text-xs text-neutral-600 mb-1">PROGRAM</div>
                  <div className="text-neutral-300">BSc Computer Science</div>
                </div>
                <div>
                  <div className="text-xs text-neutral-600 mb-1">ACHIEVEMENT</div>
                  <div className="text-red-500 font-bold">96/100 — First Class</div>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-12 h-px bg-gradient-to-r from-red-500 via-red-500/50 to-transparent origin-left"
          />
        </div>
      </motion.section>

      {/* Skills Section */}
      <section className="relative z-10 bg-neutral-950/80 backdrop-blur-sm py-24 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <div className="md:sticky md:top-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-red-500" />
                  <span className="text-xs text-neutral-500 tracking-widest">01 / CAPABILITIES</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white">
                  TECH
                  <br />
                  <span className="text-neutral-600">STACK</span>
                </h2>
              </div>
            </div>
            
            <div className="md:col-span-8">
              {skills.map((skill, i) => (
                <SkillBar key={skill} name={skill} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="relative z-10 py-24 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-3 h-3 bg-red-500" />
            <span className="text-xs text-neutral-500 tracking-widest">02 / SELECTED WORK</span>
          </div>

          <div className="space-y-6">
            {projects.map((project, i) => (
              <motion.button
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ x: 8 }}
                onClick={() => { setSelectedProject(project.id); setView('project') }}
                className="group w-full grid md:grid-cols-12 gap-4 py-6 border-b border-neutral-800 hover:border-red-500/50 transition-all text-left"
              >
                <div className="md:col-span-1 text-neutral-700 text-3xl font-black">
                  {project.num}
                </div>
                <div className="md:col-span-4">
                  <h3 className="text-2xl md:text-3xl font-black text-white group-hover:text-red-500 transition-colors">
                    {project.name}
                  </h3>
                </div>
                <div className="md:col-span-4 text-neutral-500">
                  {project.desc}
                </div>
                <div className="md:col-span-2 text-neutral-600 text-sm">
                  {project.tech}
                </div>
                <div className="md:col-span-1 text-right">
                  <span className="text-neutral-700 group-hover:text-red-500 transition-colors text-xl">
                    →
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="relative z-10 py-24 px-6 md:px-10 bg-neutral-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-red-500" />
              <span className="text-xs text-neutral-500 tracking-widest">03 / RECENT WRITING</span>
            </div>
            <button onClick={() => setView('blog')} className="text-red-500 text-sm hover:underline">
              View all →
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {blogPosts.slice(0, 2).map((post, i) => (
              <motion.button
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => { setSelectedPost(post.id); setView('blog-post') }}
                className="group text-left p-6 border border-neutral-800 hover:border-red-500 bg-neutral-900/50 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs text-neutral-600">{post.date}</span>
                  <span className="text-neutral-700">•</span>
                  <span className="text-xs text-neutral-600">{post.readTime}</span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-red-500 transition-colors">{post.title}</h3>
                <p className="text-neutral-500 mt-2 text-sm">{post.excerpt}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative p-10 md:p-16 border border-neutral-800 bg-neutral-900/50 backdrop-blur"
          >
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-red-500" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-red-500" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-red-500" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-red-500" />

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-red-500" />
                  <span className="text-xs text-neutral-500 tracking-widest">04 / CONNECT</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white leading-none">
                  LET'S
                  <br />
                  <span className="text-red-500">BUILD</span>
                </h2>
              </div>
              
              <div className="space-y-4">
                <motion.a
                  href="https://github.com/noxire-dev"
                  target="_blank"
                  rel="noopener"
                  whileHover={{ x: 8 }}
                  className="group flex items-center justify-between p-5 border border-neutral-700 hover:border-red-500 bg-neutral-900/50 transition-all"
                >
                  <div>
                    <div className="text-xs text-neutral-600 mb-1">GITHUB</div>
                    <div className="text-white group-hover:text-red-500 transition-colors">noxire-dev</div>
                  </div>
                  <span className="text-neutral-600 group-hover:text-red-500 transition-colors">→</span>
                </motion.a>
                
                <motion.a
                  href="https://linkedin.com/in/sina-dilek-0b1b3b1b9"
                  target="_blank"
                  rel="noopener"
                  whileHover={{ x: 8 }}
                  className="group flex items-center justify-between p-5 border border-neutral-700 hover:border-red-500 bg-neutral-900/50 transition-all"
                >
                  <div>
                    <div className="text-xs text-neutral-600 mb-1">LINKEDIN</div>
                    <div className="text-white group-hover:text-red-500 transition-colors">sina-dilek</div>
                  </div>
                  <span className="text-neutral-600 group-hover:text-red-500 transition-colors">→</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 md:px-10 border-t border-neutral-900">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-neutral-600 text-xs tracking-widest">
          <span>© {new Date().getFullYear()} SINA DILEK</span>
          <span className="text-red-500/50">CRAFTED WITH INTENTION</span>
        </div>
      </footer>
    </div>
  )
}

function ProjectPage({ projectId, setView }: { projectId: string; setView: (v: View) => void }) {
  const project = projects.find(p => p.id === projectId) || projects[0]

  return (
    <div className="pt-20 min-h-screen relative z-10">
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-12">
        <button onClick={() => setView('home')} className="text-sm text-neutral-500 hover:text-white mb-10 transition-colors">
          ← Back to work
        </button>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl md:text-6xl font-black text-red-500">{project.num}</span>
            <div className="w-8 h-0.5 bg-red-500" />
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">{project.name}</h1>
          <p className="text-lg text-neutral-400 mb-10">{project.tagline}</p>

          {/* Screenshot */}
          <div className="aspect-video bg-neutral-900 border border-neutral-800 mb-10 flex items-center justify-center">
            <span className="text-neutral-600">[ Project Screenshot ]</span>
          </div>

          {/* Meta */}
          <div className="grid md:grid-cols-3 gap-8 mb-12 pb-12 border-b border-neutral-800">
            <div>
              <span className="text-xs tracking-widest text-neutral-600">YEAR</span>
              <p className="text-xl font-bold text-white mt-2">{project.year}</p>
            </div>
            <div>
              <span className="text-xs tracking-widest text-neutral-600">TECHNOLOGIES</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.technologies.map(t => (
                  <span key={t} className="px-3 py-1 bg-neutral-800 text-neutral-300 text-sm">{t}</span>
                ))}
              </div>
            </div>
            <div>
              <span className="text-xs tracking-widest text-neutral-600">LINK</span>
              <a href={project.link} target="_blank" rel="noopener" className="block text-red-500 font-bold hover:underline mt-2">
                View on GitHub →
              </a>
            </div>
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-xl font-black text-white mb-4">About</h2>
              <p className="text-neutral-400 leading-relaxed">{project.description}</p>
            </div>
            <div>
              <h2 className="text-xl font-black text-white mb-4">Features</h2>
              <ul className="space-y-3">
                {project.features.map(f => (
                  <li key={f} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 mt-2 flex-shrink-0" />
                    <span className="text-neutral-400">{f}</span>
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
    <div className="pt-20 min-h-screen relative z-10">
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-12">
            <div className="w-3 h-3 bg-red-500" />
            <h1 className="text-3xl font-black text-white">BLOG</h1>
          </div>

          <div className="space-y-6">
            {blogPosts.map((post, i) => (
              <motion.button
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => { setSelectedPost(post.id); setView('blog-post') }}
                className="group w-full text-left p-6 border border-neutral-800 hover:border-red-500 bg-neutral-900/50 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs text-neutral-600">{post.date}</span>
                  <span className="text-neutral-700">•</span>
                  <span className="text-xs text-neutral-600">{post.readTime}</span>
                </div>
                <h2 className="text-xl font-bold text-white group-hover:text-red-500 transition-colors">{post.title}</h2>
                <p className="text-neutral-500 mt-2">{post.excerpt}</p>
                <div className="flex gap-2 mt-4">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 bg-neutral-800 text-neutral-400">
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
    <div className="pt-20 min-h-screen relative z-10">
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-12">
        <button onClick={() => setView('blog')} className="text-sm text-neutral-500 hover:text-white mb-10 transition-colors">
          ← Back to blog
        </button>

        <motion.article initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm text-neutral-600">{post.date}</span>
            <span className="text-neutral-700">•</span>
            <span className="text-sm text-neutral-600">{post.readTime}</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-black text-white mb-6">{post.title}</h1>

          <div className="flex gap-2 mb-10">
            {post.tags.map(tag => (
              <span key={tag} className="text-xs px-3 py-1 bg-red-500 text-white">#{tag}</span>
            ))}
          </div>

          <div className="prose prose-lg prose-invert max-w-none">
            {post.content.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-neutral-300 leading-relaxed mb-6">{paragraph}</p>
            ))}
          </div>
        </motion.article>
      </div>
    </div>
  )
}

export default function Design23() {
  const [view, setView] = useState<View>('home')
  const [selectedProject, setSelectedProject] = useState('gosh')
  const [selectedPost, setSelectedPost] = useState('v2-rebuild')

  return (
    <div className="min-h-screen text-white font-mono selection:bg-red-500 selection:text-white">
      <MasterBackground />
      <Navigation currentView={view} setView={setView} />

      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <HomePage setView={setView} setSelectedProject={setSelectedProject} setSelectedPost={setSelectedPost} />
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
