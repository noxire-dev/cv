import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Design 25: TERMINAL BRUTALIST (JOKER)
// Hacker aesthetic meets Russian Constructivism
// Monospace everything, ASCII art, terminal output vibes

type View = 'home' | 'project' | 'blog' | 'blog-post'

const projects = [
  { 
    id: 'gosh',
    name: 'GoSH', 
    num: '001', 
    desc: 'Shell written in Go',
    tagline: 'A minimalist shell implementation',
    description: 'GoSH demonstrates core systems programming concepts including process management, I/O redirection, and command parsing. Built in Go for learning purposes.',
    tech: ['Go', 'Systems'],
    year: '2025',
    link: 'https://github.com/noxire-dev/GoSH',
    features: ['Command parsing with pipes', 'Process spawning', 'I/O redirection', 'Built-in commands'],
    status: 'ACTIVE'
  },
  { 
    id: 'moji',
    name: 'Moji', 
    num: '002', 
    desc: 'Note taking app',
    tagline: 'Productivity suite with clean UI',
    description: 'A note-taking and todo application focused on UI/UX design. Built with Flask and JavaScript for managing daily tasks and notes.',
    tech: ['Python', 'Flask', 'JS'],
    year: '2025',
    link: 'https://github.com/noxire-dev/moji',
    features: ['Rich text notes', 'Task management', 'Tags & categories', 'Dark mode'],
    status: 'ACTIVE'
  },
  { 
    id: 'lorekeeper',
    name: 'LoreKeeper', 
    num: '003', 
    desc: 'RPG marketplace',
    tagline: 'E-commerce for tabletop RPGs',
    description: 'An e-commerce platform for free tabletop RPG materials. Browse, download, and share resources with the community.',
    tech: ['Python', 'PostgreSQL'],
    year: '2025',
    link: 'https://github.com/noxire-dev/LoreKeeper',
    features: ['User accounts', 'Resource library', 'Community ratings', 'PDF viewer'],
    status: 'DEV'
  },
  { 
    id: 'midnight',
    name: 'Midnight Moon', 
    num: '004', 
    desc: 'VSCode themes',
    tagline: 'Dark theme collection',
    description: 'Carefully crafted dark themes for Visual Studio Code. Designed for long coding sessions with colors chosen to reduce eye strain.',
    tech: ['Design', 'JSON'],
    year: '2024',
    link: 'https://github.com/noxire-dev/midnight-theme',
    features: ['Multiple variants', 'Semantic highlighting', 'Terminal colors', 'UI theming'],
    status: 'STABLE'
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
    tags: ['dev', 'portfolio']
  },
  {
    id: 'first-year',
    title: 'First Year Complete',
    date: '2025-08-28',
    excerpt: 'Reflecting on achieving 96/100 and First Class Honours.',
    content: `I finished my first year at the University of Essex and couldn't be happier with the results — I achieved 96/100 overall and a First Class.

I'm proud of the work I put in, and grateful for the support and guidance I had along the way. Really excited to carry this momentum into my second year!`,
    tags: ['uni', 'life']
  },
  {
    id: 'learning-c',
    title: 'Learning C',
    date: '2025-02-23',
    excerpt: 'Diving into low-level programming to understand systems better.',
    content: `I wanted to dive into low-level programming so I started learning C not to be good at it but understand how C++, C# and Rust works.

It's hair pulling to implement the functions I am so used to using in high level languages but it's also a lot of fun.`,
    tags: ['learning', 'C']
  },
]

const skills = ['Python', 'Go', 'Java', 'JavaScript', 'TypeScript', 'C', 'Flask', 'React']

function TypeWriter({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState('')
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1))
          i++
        } else {
          clearInterval(interval)
        }
      }, 30)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timeout)
  }, [text, delay])

  useEffect(() => {
    const cursor = setInterval(() => setShowCursor(c => !c), 500)
    return () => clearInterval(cursor)
  }, [])

  return (
    <span>
      {displayed}
      <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} text-red-500`}>█</span>
    </span>
  )
}

function TerminalLine({ prefix = '>', children, delay = 0 }: { prefix?: string; children: React.ReactNode; delay?: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: delay / 1000 }}
      className="font-mono text-sm md:text-base flex gap-2"
    >
      <span className="text-red-500 flex-shrink-0">{prefix}</span>
      <span className="text-neutral-300">{children}</span>
    </motion.div>
  )
}

function GlitchText({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <span className="absolute top-0 left-0 text-red-500 animate-glitch-1 opacity-70" aria-hidden>{children}</span>
      <span className="absolute top-0 left-0 text-cyan-400 animate-glitch-2 opacity-70" aria-hidden>{children}</span>
    </span>
  )
}

function Navigation({ currentView, setView }: { currentView: View; setView: (v: View) => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-neutral-800">
      <div className="flex items-center justify-between px-4 md:px-8 py-3 font-mono text-sm">
        <button onClick={() => setView('home')} className="flex items-center gap-2 hover:text-red-500 transition-colors">
          <span className="text-red-500">■</span>
          <span className="hidden md:inline">sina@portfolio</span>
          <span className="md:hidden">SD</span>
          <span className="text-neutral-600">~</span>
        </button>
        <div className="flex items-center gap-4 md:gap-6">
          <button 
            onClick={() => setView('home')}
            className={`transition-colors ${currentView === 'home' ? 'text-red-500' : 'text-neutral-500 hover:text-white'}`}
          >
            ./work
          </button>
          <button 
            onClick={() => setView('blog')}
            className={`transition-colors ${currentView === 'blog' || currentView === 'blog-post' ? 'text-red-500' : 'text-neutral-500 hover:text-white'}`}
          >
            ./blog
          </button>
          <Link to="/" className="text-neutral-600 hover:text-neutral-400 transition-colors">
            exit
          </Link>
        </div>
      </div>
    </nav>
  )
}

function ProjectPage({ projectId, setView }: { projectId: string; setView: (v: View) => void }) {
  const project = projects.find(p => p.id === projectId) || projects[0]

  return (
    <div className="pt-20 min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 font-mono">
        <button onClick={() => setView('home')} className="text-neutral-500 hover:text-white mb-8 text-sm">
          {'<'} cd ..
        </button>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="border border-neutral-800 mb-8">
            <div className="bg-neutral-900 px-4 py-2 border-b border-neutral-800 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-4 text-neutral-500 text-sm">project://{project.id}</span>
            </div>
            <div className="p-6 space-y-4">
              <TerminalLine prefix="$">cat README.md</TerminalLine>
              
              <div className="border-l-2 border-red-500 pl-4 py-2">
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                  <GlitchText>{project.name}</GlitchText>
                </h1>
                <p className="text-neutral-400 mt-2">{project.tagline}</p>
              </div>

              <TerminalLine prefix="#">{project.description}</TerminalLine>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border border-neutral-800 p-4">
              <TerminalLine prefix="$">cat metadata.json</TerminalLine>
              <pre className="mt-4 text-sm text-neutral-400">
{`{
  "year": "${project.year}",
  "status": "${project.status}",
  "tech": [${project.tech.map(t => `"${t}"`).join(', ')}]
}`}
              </pre>
            </div>
            <div className="border border-neutral-800 p-4">
              <TerminalLine prefix="$">ls features/</TerminalLine>
              <div className="mt-4 space-y-2">
                {project.features.map((f, i) => (
                  <div key={i} className="text-sm text-neutral-400 flex gap-2">
                    <span className="text-neutral-600">{String(i + 1).padStart(2, '0')}.</span>
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border border-neutral-800 p-4">
            <TerminalLine prefix="$">git remote -v</TerminalLine>
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener"
              className="block mt-4 text-red-500 hover:text-red-400 transition-colors"
            >
              origin  {project.link} (fetch)
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function BlogListPage({ setView, setSelectedPost }: { setView: (v: View) => void; setSelectedPost: (id: string) => void }) {
  return (
    <div className="pt-20 min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 font-mono">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <TerminalLine prefix="$" delay={0}>ls -la ./posts/</TerminalLine>
          
          <div className="mt-6 border border-neutral-800">
            <div className="bg-neutral-900 px-4 py-2 border-b border-neutral-800 text-neutral-500 text-sm flex gap-8">
              <span className="w-24">DATE</span>
              <span className="flex-1">TITLE</span>
              <span className="w-20 text-right">TAGS</span>
            </div>
            
            {blogPosts.map((post, i) => (
              <motion.button
                key={post.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => { setSelectedPost(post.id); setView('blog-post') }}
                className="w-full text-left px-4 py-4 border-b border-neutral-800 last:border-b-0 hover:bg-neutral-900 transition-colors group flex gap-8"
              >
                <span className="w-24 text-neutral-600 text-sm">{post.date}</span>
                <span className="flex-1 text-white group-hover:text-red-500 transition-colors">{post.title}</span>
                <span className="w-20 text-right text-neutral-600 text-sm">
                  {post.tags.map(t => `#${t}`).join(' ')}
                </span>
              </motion.button>
            ))}
          </div>
          
          <TerminalLine prefix="$" delay={300}>
            <span className="text-neutral-600"># {blogPosts.length} entries found</span>
          </TerminalLine>
        </motion.div>
      </div>
    </div>
  )
}

function BlogPostPage({ postId, setView }: { postId: string; setView: (v: View) => void }) {
  const post = blogPosts.find(p => p.id === postId) || blogPosts[0]

  return (
    <div className="pt-20 min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-12 font-mono">
        <button onClick={() => setView('blog')} className="text-neutral-500 hover:text-white mb-8 text-sm">
          {'<'} cd ../posts
        </button>

        <motion.article initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="border border-neutral-800 mb-8">
            <div className="bg-neutral-900 px-4 py-2 border-b border-neutral-800 flex items-center justify-between">
              <span className="text-neutral-500 text-sm">{post.date}</span>
              <div className="flex gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-0.5 bg-red-500/20 text-red-500">#{tag}</span>
                ))}
              </div>
            </div>
            <div className="p-6">
              <h1 className="text-3xl md:text-4xl font-bold mb-6">
                <GlitchText>{post.title}</GlitchText>
              </h1>
              
              <div className="space-y-4 text-neutral-300 leading-relaxed">
                {post.content.split('\n\n').map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
          
          <TerminalLine prefix="#">end of file</TerminalLine>
        </motion.article>
      </div>
    </div>
  )
}

export default function Design25() {
  const [view, setView] = useState<View>('home')
  const [selectedProject, setSelectedProject] = useState('gosh')
  const [selectedPost, setSelectedPost] = useState('v2-rebuild')

  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-500 selection:text-white">
      {/* Scanline overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100]" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
      }} />
      
      {/* Grid background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,0,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,0,0.3) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

      {/* Glitch CSS */}
      <style>{`
        @keyframes glitch-1 {
          0%, 100% { clip-path: inset(0 0 0 0); transform: translate(0); }
          20% { clip-path: inset(20% 0 30% 0); transform: translate(-2px, 2px); }
          40% { clip-path: inset(50% 0 20% 0); transform: translate(2px, -2px); }
          60% { clip-path: inset(10% 0 60% 0); transform: translate(-1px, 1px); }
          80% { clip-path: inset(80% 0 5% 0); transform: translate(1px, -1px); }
        }
        @keyframes glitch-2 {
          0%, 100% { clip-path: inset(0 0 0 0); transform: translate(0); }
          20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -2px); }
          40% { clip-path: inset(10% 0 70% 0); transform: translate(-2px, 2px); }
          60% { clip-path: inset(40% 0 30% 0); transform: translate(1px, -1px); }
          80% { clip-path: inset(20% 0 50% 0); transform: translate(-1px, 1px); }
        }
        .animate-glitch-1 { animation: glitch-1 3s infinite; }
        .animate-glitch-2 { animation: glitch-2 3s infinite; animation-delay: 0.1s; }
      `}</style>

      <Navigation currentView={view} setView={setView} />

      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Hero Terminal */}
            <section className="min-h-screen flex items-center justify-center px-4 md:px-8 pt-16">
              <div className="w-full max-w-4xl">
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="border border-neutral-800 shadow-2xl shadow-red-500/10"
                >
                  {/* Terminal header */}
                  <div className="bg-neutral-900 px-4 py-3 border-b border-neutral-800 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="ml-4 font-mono text-neutral-500 text-sm">sina@portfolio ~ zsh</span>
                  </div>
                  
                  {/* Terminal content */}
                  <div className="p-6 md:p-10 font-mono space-y-6 bg-black">
                    <TerminalLine prefix="$" delay={0}>whoami</TerminalLine>
                    
                    <div className="text-red-500 text-5xl md:text-7xl font-bold leading-none">
                      <GlitchText>SINA</GlitchText>
                      <br />
                      <GlitchText>DILEK</GlitchText>
                    </div>

                    <TerminalLine prefix="$" delay={200}>cat ./about.txt</TerminalLine>
                    
                    <div className="text-neutral-400 leading-relaxed max-w-2xl">
                      CS student @ University of Essex. Building tools, learning systems.
                      <br />
                      <span className="text-red-500">96/100</span> · First Class Honours · Open to work
                    </div>

                    <TerminalLine prefix="$" delay={400}>cat ./skills.json | jq '.stack'</TerminalLine>
                    
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, i) => (
                        <motion.span 
                          key={skill}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + i * 0.05 }}
                          className="px-3 py-1 bg-neutral-900 border border-neutral-800 text-neutral-300 text-sm hover:border-red-500 hover:text-red-500 transition-colors cursor-default"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>

                    <TerminalLine prefix="$" delay={600}>
                      <span className="text-neutral-600"># scroll for more</span>
                    </TerminalLine>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Projects */}
            <section className="px-4 md:px-8 py-24">
              <div className="max-w-4xl mx-auto font-mono">
                <TerminalLine prefix="$">ls -la ./projects/</TerminalLine>
                
                <div className="mt-8 space-y-4">
                  {projects.map((project, i) => (
                    <motion.button
                      key={project.id}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      onClick={() => { setSelectedProject(project.id); setView('project') }}
                      className="group w-full text-left border border-neutral-800 hover:border-red-500 transition-colors"
                    >
                      <div className="p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-4">
                        <span className="text-4xl md:text-5xl font-bold text-neutral-800 group-hover:text-red-500 transition-colors">
                          {project.num}
                        </span>
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h3 className="text-xl font-bold text-white group-hover:text-red-500 transition-colors">
                              {project.name}
                            </h3>
                            <span className={`text-xs px-2 py-0.5 ${
                              project.status === 'ACTIVE' ? 'bg-green-500/20 text-green-500' :
                              project.status === 'STABLE' ? 'bg-blue-500/20 text-blue-500' :
                              'bg-yellow-500/20 text-yellow-500'
                            }`}>
                              {project.status}
                            </span>
                          </div>
                          <p className="text-neutral-500 mt-1">{project.desc}</p>
                        </div>
                        <span className="text-2xl text-neutral-600 group-hover:text-red-500 group-hover:translate-x-2 transition-all">
                          →
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </section>

            {/* Blog Preview */}
            <section className="px-4 md:px-8 py-24 bg-neutral-950">
              <div className="max-w-4xl mx-auto font-mono">
                <div className="flex items-center justify-between mb-8">
                  <TerminalLine prefix="$">head -n 2 ./posts/*</TerminalLine>
                  <button onClick={() => setView('blog')} className="text-red-500 text-sm hover:underline">
                    ls -a →
                  </button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {blogPosts.slice(0, 2).map((post, i) => (
                    <motion.button
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => { setSelectedPost(post.id); setView('blog-post') }}
                      className="group text-left border border-neutral-800 hover:border-red-500 p-4 transition-colors"
                    >
                      <span className="text-xs text-neutral-600">{post.date}</span>
                      <h3 className="text-lg font-bold text-white group-hover:text-red-500 mt-1 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-neutral-500 text-sm mt-2 line-clamp-2">{post.excerpt}</p>
                    </motion.button>
                  ))}
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="px-4 md:px-8 py-24">
              <div className="max-w-4xl mx-auto font-mono">
                <TerminalLine prefix="$">cat ./contact.sh</TerminalLine>
                
                <div className="mt-8 grid md:grid-cols-2 gap-4">
                  <motion.a
                    href="https://github.com/noxire-dev"
                    target="_blank"
                    rel="noopener"
                    whileHover={{ x: 10 }}
                    className="group flex items-center justify-between p-4 border border-neutral-800 hover:border-red-500 transition-colors"
                  >
                    <span className="text-white group-hover:text-red-500 transition-colors">github.com/noxire-dev</span>
                    <span className="text-red-500">→</span>
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com/in/sina-dilek-0b1b3b1b9"
                    target="_blank"
                    rel="noopener"
                    whileHover={{ x: 10 }}
                    className="group flex items-center justify-between p-4 border border-neutral-800 hover:border-red-500 transition-colors"
                  >
                    <span className="text-white group-hover:text-red-500 transition-colors">linkedin.com/in/sina-dilek</span>
                    <span className="text-red-500">→</span>
                  </motion.a>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-neutral-800 px-4 md:px-8 py-6">
              <div className="max-w-4xl mx-auto font-mono flex flex-col md:flex-row justify-between items-center text-sm text-neutral-600">
                <span>© {new Date().getFullYear()} sina_dilek</span>
                <span className="text-red-500/50">// TERMINAL BRUTALIST</span>
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
