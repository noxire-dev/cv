import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

// Design 22: KINETIC CONSTRUCTIVIST — REMASTERED
// Original: Design 12
// Added: Full blog & project pages, refined animations

type View = 'home' | 'project' | 'blog' | 'blog-post'

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
    excerpt: 'Reflecting on achieving 96/100 and First Class Honours.',
    content: `I finished my first year at the University of Essex and couldn't be happier with the results — I achieved 96/100 overall and a First Class.

I'm proud of the work I put in, and grateful for the support and guidance I had along the way. Really excited to carry this momentum into my second year!`,
    tags: ['university', 'achievement']
  },
  {
    id: 'learning-c',
    title: 'Started Learning C',
    date: '2025-02-23',
    excerpt: 'Diving into low-level programming to understand systems better.',
    content: `I wanted to dive into low-level programming so I started learning C not to be good at it but understand how C++, C# and Rust works.

It's hair pulling to implement the functions I am so used to using in high level languages but it's also a lot of fun.`,
    tags: ['learning', 'C']
  },
]

const skills = ['PYTHON', 'GO', 'JAVA', 'JAVASCRIPT', 'TYPESCRIPT', 'C', 'FLASK', 'REACT']

function Navigation({ currentView, setView }: { currentView: View; setView: (v: View) => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-6 mix-blend-difference">
      <div className="flex items-center justify-between text-white">
        <button onClick={() => setView('home')} className="flex items-center gap-3 hover:opacity-70 transition-opacity">
          <div className="w-4 h-4 bg-white" />
          <span className="font-black tracking-tight">SD</span>
        </button>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setView('home')}
            className={`text-sm tracking-widest transition-opacity ${currentView === 'home' ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
          >
            WORK
          </button>
          <button 
            onClick={() => setView('blog')}
            className={`text-sm tracking-widest transition-opacity ${currentView === 'blog' || currentView === 'blog-post' ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
          >
            BLOG
          </button>
          <Link to="/" className="text-sm tracking-widest opacity-60 hover:opacity-100 transition-opacity">
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
    <div className="pt-24 min-h-screen relative z-10 bg-white">
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-12">
        <button onClick={() => setView('home')} className="text-sm text-neutral-500 hover:text-black mb-10 flex items-center gap-2">
          ← Back to work
        </button>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-start gap-6 mb-6">
            <span className="text-7xl md:text-8xl font-black text-red-600">{project.num}</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-3">{project.name}</h1>
          <p className="text-xl text-neutral-600 mb-10">{project.tagline}</p>

          <div className="aspect-video bg-neutral-100 border-4 border-black mb-10 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent" />
            <span className="text-neutral-400 relative z-10">[ Project Screenshot ]</span>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12 pb-12 border-b-4 border-black">
            <div>
              <span className="text-xs tracking-widest text-neutral-500">YEAR</span>
              <p className="text-3xl font-black mt-2">{project.year}</p>
            </div>
            <div>
              <span className="text-xs tracking-widest text-neutral-500">TECHNOLOGIES</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.tech.map(t => (
                  <span key={t} className="px-3 py-1 bg-red-600 text-white text-sm font-bold">{t}</span>
                ))}
              </div>
            </div>
            <div>
              <span className="text-xs tracking-widest text-neutral-500">LINK</span>
              <a href={project.link} target="_blank" rel="noopener" className="block text-black font-black text-lg hover:text-red-600 transition-colors mt-2">
                GitHub →
              </a>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-black mb-4">About</h2>
              <p className="text-neutral-600 leading-relaxed">{project.description}</p>
            </div>
            <div>
              <h2 className="text-2xl font-black mb-4">Features</h2>
              <ul className="space-y-3">
                {project.features.map((f, i) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="text-red-600 font-black">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-neutral-600">{f}</span>
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
    <div className="pt-24 min-h-screen relative z-10 bg-white">
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-6xl md:text-8xl font-black mb-12">BLOG</h1>

          <div className="space-y-0 border-4 border-black">
            {blogPosts.map((post, i) => (
              <motion.button
                key={post.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => { setSelectedPost(post.id); setView('blog-post') }}
                className="group w-full text-left p-8 border-b-4 border-black last:border-b-0 hover:bg-black hover:text-white transition-colors"
              >
                <div className="flex items-center gap-6">
                  <span className="text-4xl font-black text-red-600 group-hover:text-red-400">{String(i + 1).padStart(2, '0')}</span>
                  <div className="flex-1">
                    <span className="text-xs text-neutral-500 group-hover:text-neutral-400 tracking-widest">{post.date}</span>
                    <h2 className="text-2xl font-black mt-1">{post.title}</h2>
                    <p className="text-neutral-600 group-hover:text-neutral-300 mt-2">{post.excerpt}</p>
                  </div>
                  <span className="text-3xl group-hover:translate-x-2 transition-transform">→</span>
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
    <div className="pt-24 min-h-screen relative z-10 bg-white">
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-12">
        <button onClick={() => setView('blog')} className="text-sm text-neutral-500 hover:text-black mb-10 flex items-center gap-2">
          ← Back to blog
        </button>

        <motion.article initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <time className="text-sm text-neutral-500 tracking-widest">{post.date}</time>
          <h1 className="text-4xl md:text-6xl font-black mt-2 mb-6">{post.title}</h1>

          <div className="flex gap-2 mb-10">
            {post.tags.map(tag => (
              <span key={tag} className="text-xs px-3 py-1 bg-red-600 text-white font-bold">#{tag}</span>
            ))}
          </div>

          <div className="prose prose-lg max-w-none">
            {post.content.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-neutral-700 leading-relaxed mb-6">{paragraph}</p>
            ))}
          </div>
        </motion.article>
      </div>
    </div>
  )
}

export default function Design22() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  
  const heroRotate = useTransform(smoothProgress, [0, 0.2], [0, -5])
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.9])
  const circleX = useTransform(smoothProgress, [0, 0.5], ['0%', '100%'])
  const circleScale = useTransform(smoothProgress, [0, 0.3], [1, 2])
  const diagonalRotate = useTransform(smoothProgress, [0, 1], [0, 180])
  const textX = useTransform(smoothProgress, [0.1, 0.3], ['-100%', '0%'])

  const [view, setView] = useState<View>('home')
  const [selectedProject, setSelectedProject] = useState('gosh')
  const [selectedPost, setSelectedPost] = useState('v2-rebuild')

  return (
    <div 
      ref={containerRef} 
      className={`bg-white text-black selection:bg-red-600 selection:text-white ${view === 'home' ? 'min-h-[400vh]' : 'min-h-screen'}`}
    >
      {/* Fixed background elements with scroll animations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          style={{ x: circleX, scale: circleScale }}
          className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-red-600"
        />
        <motion.div
          style={{ rotate: diagonalRotate }}
          className="absolute top-0 right-0 w-[200vw] h-32 bg-black origin-top-right"
        />
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(black 1px, transparent 1px), linear-gradient(90deg, black 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <Navigation currentView={view} setView={setView} />

      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Hero Section - Sticky */}
            <section className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
              <motion.div 
                style={{ rotate: heroRotate, scale: heroScale }}
                className="relative z-10 text-center"
              >
                <div className="absolute -inset-20 border-4 border-black" />
                <div className="absolute -inset-16 border-2 border-red-600" />
                
                <div className="p-12 md:p-20">
                  <motion.span 
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-sm tracking-[0.5em] text-red-600 block mb-6"
                  >
                    DEVELOPER
                  </motion.span>
                  
                  <motion.h1 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, type: 'spring' }}
                    className="text-[15vw] md:text-[10vw] font-black leading-[0.85] tracking-tighter"
                  >
                    SINA<br />DILEK
                  </motion.h1>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-8 flex flex-wrap justify-center gap-4"
                  >
                    <span className="px-4 py-2 bg-black text-white text-sm tracking-widest font-bold">
                      ESSEX
                    </span>
                    <span className="px-4 py-2 bg-red-600 text-white text-sm tracking-widest font-bold">
                      96/100
                    </span>
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-12 text-sm tracking-widest"
              >
                SCROLL ↓
              </motion.div>
            </section>

            {/* About Section */}
            <section className="min-h-screen relative z-10 bg-white flex items-center">
              <div className="w-full px-6 md:px-12 py-24">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                  <motion.div style={{ x: textX }}>
                    <span className="text-red-600 text-sm tracking-[0.3em] block mb-4">WHO</span>
                    <h2 className="text-6xl md:text-8xl font-black leading-none mb-8">
                      ABOUT<br />
                      <span className="text-red-600">ME</span>
                    </h2>
                    <p className="text-xl text-neutral-600 leading-relaxed">
                      CS student at the University of Essex. I build small tools 
                      and learn systems. Started with Python, now diving into 
                      Go, Java, JavaScript, and C.
                    </p>
                    <div className="mt-8 flex items-center gap-4">
                      <div className="w-8 h-1 bg-red-600" />
                      <span className="text-sm tracking-widest text-neutral-500">FIRST CLASS HONOURS</span>
                    </div>
                  </motion.div>
                  
                  <div className="relative aspect-square">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-0 border-4 border-black"
                    />
                    <div className="absolute inset-4 bg-red-600" />
                    <div className="absolute inset-8 bg-white flex items-center justify-center">
                      <span className="text-8xl font-black">SD</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Skills Marquee */}
            <section className="relative z-10 bg-black text-white py-16 overflow-hidden">
              <motion.div
                animate={{ x: '-50%' }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="flex whitespace-nowrap"
              >
                {[...skills, ...skills].map((skill, i) => (
                  <span key={i} className="text-6xl md:text-8xl font-black mx-8">
                    {skill}
                    <span className="text-red-600 mx-8">◆</span>
                  </span>
                ))}
              </motion.div>
            </section>

            {/* Projects Grid */}
            <section className="relative z-10 bg-white px-6 md:px-12 py-24">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-4 mb-16">
                  <div className="w-12 h-12 bg-red-600" />
                  <h2 className="text-5xl md:text-6xl font-black">WORK</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-0">
                  {projects.map((project, i) => (
                    <motion.button
                      key={project.id}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      onClick={() => { setSelectedProject(project.id); setView('project') }}
                      className={`group p-10 md:p-14 border-4 border-black text-left hover:bg-red-600 hover:text-white transition-colors ${
                        i % 2 === 0 ? 'md:-mr-1' : ''
                      } ${i < 2 ? 'md:-mb-1' : ''}`}
                    >
                      <span className="text-8xl font-black opacity-20 group-hover:opacity-40 transition-opacity block">
                        {project.num}
                      </span>
                      <h3 className="text-3xl md:text-4xl font-black -mt-8">{project.name}</h3>
                      <p className="text-neutral-500 group-hover:text-white/70 mt-2">{project.desc}</p>
                      <span className="inline-block mt-6 text-2xl group-hover:translate-x-4 transition-transform">→</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </section>

            {/* Blog Preview */}
            <section className="relative z-10 bg-neutral-100 px-6 md:px-12 py-24">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-12">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-black" />
                    <h2 className="text-4xl font-black">BLOG</h2>
                  </div>
                  <button onClick={() => setView('blog')} className="text-red-600 font-bold hover:underline">
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
                      className="group text-left p-8 bg-white border-4 border-black hover:bg-black hover:text-white transition-colors"
                    >
                      <span className="text-xs text-neutral-500 group-hover:text-neutral-400">{post.date}</span>
                      <h3 className="text-2xl font-black mt-2">{post.title}</h3>
                      <p className="text-neutral-600 group-hover:text-neutral-300 mt-3">{post.excerpt}</p>
                    </motion.button>
                  ))}
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="relative z-10 bg-red-600 text-white px-6 md:px-12 py-24">
              <div className="max-w-6xl mx-auto text-center">
                <motion.h2
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  className="text-[12vw] md:text-[8vw] font-black leading-none"
                >
                  LET'S<br />CONNECT
                </motion.h2>
                
                <div className="flex justify-center gap-6 mt-12">
                  <motion.a
                    href="https://github.com/noxire-dev"
                    target="_blank"
                    rel="noopener"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="px-8 py-4 bg-black text-white font-black text-lg"
                  >
                    GITHUB
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com/in/sina-dilek-0b1b3b1b9"
                    target="_blank"
                    rel="noopener"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    className="px-8 py-4 bg-white text-red-600 font-black text-lg"
                  >
                    LINKEDIN
                  </motion.a>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 bg-black text-white px-6 md:px-12 py-8">
              <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
                <span className="text-sm tracking-widest font-mono">© {new Date().getFullYear()} SINA DILEK</span>
                <span className="text-sm tracking-widest font-mono text-neutral-500">KINETIC CONSTRUCTIVIST</span>
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
