import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

// Design 21: MONOCHROME CONSTRUCTIVIST — REMASTERED
// Original: Design 4
// Added: Full blog & project pages, refined spacing, improved readability

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

const skills = ['Python', 'Go', 'Java', 'JavaScript', 'TypeScript', 'C', 'Flask', 'React']

function GeometricShape({ className }: { className: string }) {
  return <div className={className} />
}

function Navigation({ currentView, setView }: { currentView: View; setView: (v: View) => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <button onClick={() => setView('home')} className="flex items-center gap-3 hover:opacity-70 transition-opacity">
          <GeometricShape className="w-4 h-4 bg-red-600" />
          <span className="font-black text-lg tracking-tight">SD</span>
        </button>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setView('home')}
            className={`text-sm tracking-widest transition-colors ${currentView === 'home' ? 'text-red-600' : 'hover:text-red-600'}`}
          >
            WORK
          </button>
          <button 
            onClick={() => setView('blog')}
            className={`text-sm tracking-widest transition-colors ${currentView === 'blog' || currentView === 'blog-post' ? 'text-red-600' : 'hover:text-red-600'}`}
          >
            BLOG
          </button>
          <Link to="/" className="text-sm tracking-widest text-neutral-400 hover:text-black transition-colors">
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
            <span className="text-6xl md:text-7xl font-black text-red-600">{project.num}</span>
            <GeometricShape className="w-6 h-6 bg-red-600 mt-4" />
          </div>

          <h1 className="text-5xl md:text-6xl font-black mb-3">{project.name}</h1>
          <p className="text-xl text-neutral-600 mb-10">{project.tagline}</p>

          <div className="aspect-video bg-neutral-100 border-4 border-black mb-10 flex items-center justify-center">
            <span className="text-neutral-400">[ Project Screenshot ]</span>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12 pb-12 border-b-4 border-black">
            <div>
              <span className="text-xs tracking-widest text-neutral-500">YEAR</span>
              <p className="text-2xl font-black mt-2">{project.year}</p>
            </div>
            <div>
              <span className="text-xs tracking-widest text-neutral-500">TECHNOLOGIES</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.tech.map(t => (
                  <span key={t} className="px-3 py-1 bg-black text-white text-sm">{t}</span>
                ))}
              </div>
            </div>
            <div>
              <span className="text-xs tracking-widest text-neutral-500">LINK</span>
              <a href={project.link} target="_blank" rel="noopener" className="block text-red-600 font-bold hover:underline mt-2">
                View on GitHub →
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
                {project.features.map(f => (
                  <li key={f} className="flex items-start gap-3">
                    <GeometricShape className="w-2 h-2 bg-red-600 mt-2 flex-shrink-0" />
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
          <div className="flex items-center gap-4 mb-12">
            <GeometricShape className="w-4 h-4 bg-red-600" />
            <h1 className="text-4xl font-black">BLOG</h1>
          </div>

          <div className="space-y-6">
            {blogPosts.map((post, i) => (
              <motion.button
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => { setSelectedPost(post.id); setView('blog-post') }}
                className="group w-full text-left p-8 border-4 border-black hover:bg-black hover:text-white transition-colors"
              >
                <span className="text-xs text-neutral-500 group-hover:text-neutral-400">{post.date}</span>
                <h2 className="text-2xl font-black mt-2">{post.title}</h2>
                <p className="text-neutral-600 group-hover:text-neutral-300 mt-3">{post.excerpt}</p>
                <div className="flex gap-2 mt-4">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 bg-neutral-100 group-hover:bg-neutral-800 text-neutral-600 group-hover:text-neutral-300">
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
    <div className="pt-24 min-h-screen relative z-10 bg-white">
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-12">
        <button onClick={() => setView('blog')} className="text-sm text-neutral-500 hover:text-black mb-10 flex items-center gap-2">
          ← Back to blog
        </button>

        <motion.article initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <time className="text-sm text-neutral-500">{post.date}</time>
          <h1 className="text-4xl md:text-5xl font-black mt-2 mb-6">{post.title}</h1>

          <div className="flex gap-2 mb-10">
            {post.tags.map(tag => (
              <span key={tag} className="text-xs px-3 py-1 bg-red-600 text-white">#{tag}</span>
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

export default function Design21() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const circleScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.5])
  const circleX = useTransform(scrollYProgress, [0, 0.3], ['0%', '50%'])

  const [view, setView] = useState<View>('home')
  const [selectedProject, setSelectedProject] = useState('gosh')
  const [selectedPost, setSelectedPost] = useState('v2-rebuild')

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-black overflow-x-hidden selection:bg-red-600 selection:text-white">
      {/* Fixed geometric elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          style={{ scale: circleScale, x: circleX }}
          className="absolute -top-[20vw] -right-[20vw] w-[70vw] h-[70vw] rounded-full bg-red-600"
        />
        <div className="absolute bottom-0 left-0 w-[50vw] h-[30vh] bg-black origin-bottom-left -skew-x-12" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(black 1px, transparent 1px), linear-gradient(90deg, black 1px, transparent 1px)',
          backgroundSize: '100px 100px',
          opacity: 0.03
        }} />
      </div>

      <Navigation currentView={view} setView={setView} />

      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Hero */}
            <section className="min-h-screen relative flex items-center px-6 md:px-12">
              <div className="relative z-10 max-w-4xl">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="flex items-center gap-4 mb-8">
                    <GeometricShape className="w-8 h-8 bg-red-600" />
                    <span className="text-sm tracking-[0.3em] font-mono">DEVELOPER</span>
                  </div>

                  <h1 className="text-[16vw] md:text-[12vw] leading-[0.85] font-black tracking-tighter">
                    <span className="block">SINA</span>
                    <span className="block flex items-center gap-4">
                      <span>DILEK</span>
                      <GeometricShape className="w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-black" />
                    </span>
                  </h1>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-12 flex flex-wrap items-center gap-6"
                  >
                    <span className="px-4 py-2 bg-black text-white text-sm tracking-widest">
                      UNIVERSITY OF ESSEX
                    </span>
                    <span className="px-4 py-2 bg-red-600 text-white text-sm tracking-widest">
                      96/100
                    </span>
                    <span className="px-4 py-2 border-2 border-black text-sm tracking-widest">
                      OPEN TO WORK
                    </span>
                  </motion.div>
                </motion.div>
              </div>
            </section>

            {/* About */}
            <section className="relative z-10 bg-white">
              <div className="grid md:grid-cols-2">
                <div className="bg-black text-white p-12 md:p-20">
                  <h2 className="text-5xl md:text-6xl font-black mb-8">ABOUT</h2>
                  <p className="text-lg text-neutral-300 leading-relaxed">
                    CS student at the University of Essex. Building small tools
                    and learning systems. Started with Python, now exploring Go,
                    Java, JavaScript, and C.
                  </p>
                  <div className="mt-8 flex items-center gap-4">
                    <GeometricShape className="w-4 h-4 bg-red-600" />
                    <span className="text-sm tracking-widest text-neutral-400">FIRST CLASS HONOURS</span>
                  </div>
                </div>
                <div className="p-12 md:p-20 flex items-center justify-center">
                  <div className="relative w-full aspect-square max-w-sm">
                    <GeometricShape className="absolute inset-0 border-4 border-black" />
                    <GeometricShape className="absolute top-4 left-4 right-4 bottom-4 bg-red-600" />
                    <GeometricShape className="absolute top-8 left-8 right-8 bottom-8 rounded-full bg-white" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl font-black">SD</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Skills */}
            <section className="relative z-10 py-24 bg-white overflow-hidden">
              <div className="px-6 md:px-12 mb-8">
                <div className="flex items-center gap-4">
                  <GeometricShape className="w-4 h-4 bg-red-600" />
                  <h2 className="text-sm tracking-[0.3em] font-mono">CAPABILITIES</h2>
                </div>
              </div>
              <div className="border-y-4 border-black py-8 overflow-hidden">
                <motion.div
                  animate={{ x: '-50%' }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="flex whitespace-nowrap"
                >
                  {[...skills, ...skills].map((skill, i) => (
                    <span key={i} className="text-6xl md:text-8xl font-black mx-8">
                      {skill}
                      <span className="text-red-600 mx-8">●</span>
                    </span>
                  ))}
                </motion.div>
              </div>
            </section>

            {/* Projects */}
            <section className="relative z-10 bg-white px-6 md:px-12 py-24">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-4 mb-16">
                  <GeometricShape className="w-4 h-4 bg-red-600" />
                  <h2 className="text-sm tracking-[0.3em] font-mono">SELECTED WORK</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-0 border-4 border-black">
                  {projects.map((project, i) => (
                    <motion.button
                      key={project.id}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => { setSelectedProject(project.id); setView('project') }}
                      className={`group p-8 md:p-12 border-black text-left hover:bg-black hover:text-white transition-colors ${
                        i === 0 ? 'border-b-4 md:border-r-4 md:border-b-0' :
                        i === 1 ? 'border-b-4' :
                        i === 2 ? 'md:border-r-4' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between mb-6">
                        <span className="text-6xl font-black text-neutral-200 group-hover:text-neutral-700 transition-colors">
                          {project.num}
                        </span>
                        <GeometricShape className="w-6 h-6 bg-red-600 group-hover:rotate-45 transition-transform" />
                      </div>
                      <h3 className="text-3xl md:text-4xl font-black mb-2">{project.name}</h3>
                      <p className="text-neutral-500 group-hover:text-neutral-300 transition-colors">{project.desc}</p>
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
                    <GeometricShape className="w-4 h-4 bg-red-600" />
                    <h2 className="text-sm tracking-[0.3em] font-mono">RECENT WRITING</h2>
                  </div>
                  <button onClick={() => setView('blog')} className="text-red-600 text-sm hover:underline">
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
                      <h3 className="text-xl font-bold mt-2">{post.title}</h3>
                      <p className="text-neutral-600 group-hover:text-neutral-300 mt-3">{post.excerpt}</p>
                    </motion.button>
                  ))}
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="relative z-10 bg-black text-white px-6 md:px-12 py-24">
              <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-6xl md:text-8xl font-black leading-none mb-8">
                      LET'S
                      <br />
                      <span className="text-red-600">CONNECT</span>
                    </h2>
                  </div>
                  <div className="space-y-4">
                    <motion.a
                      href="https://github.com/noxire-dev"
                      target="_blank"
                      rel="noopener"
                      whileHover={{ x: 10 }}
                      className="group flex items-center justify-between p-6 border-2 border-white hover:bg-white hover:text-black transition-colors"
                    >
                      <span className="text-xl font-black">GITHUB</span>
                      <span className="text-2xl">→</span>
                    </motion.a>
                    <motion.a
                      href="https://linkedin.com/in/sina-dilek-0b1b3b1b9"
                      target="_blank"
                      rel="noopener"
                      whileHover={{ x: 10 }}
                      className="group flex items-center justify-between p-6 border-2 border-white hover:bg-red-600 transition-colors"
                    >
                      <span className="text-xl font-black">LINKEDIN</span>
                      <span className="text-2xl">→</span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 bg-white px-6 md:px-12 py-8 border-t-4 border-black">
              <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center gap-4">
                  <GeometricShape className="w-4 h-4 bg-red-600" />
                  <span className="text-sm tracking-widest font-mono">© {new Date().getFullYear()} SINA DILEK</span>
                </div>
                <span className="text-sm tracking-widest font-mono text-neutral-500">FORM FOLLOWS FUNCTION</span>
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
