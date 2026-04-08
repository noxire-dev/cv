import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'

// Design 16: COMPLETE BRUTALIST SYSTEM
// Full portfolio with blog, project detail pages, and navigation
// Based on designs 4, 12, 15 aesthetic

type View = 'home' | 'project' | 'blog' | 'blog-post'

const projects = [
  { 
    id: 'gosh',
    name: 'GoSH', 
    num: '01',
    tagline: 'A toy shell written in Go',
    description: 'GoSH is a minimalist shell implementation written in Go for learning purposes. It demonstrates core systems programming concepts including process management, I/O redirection, and command parsing.',
    tech: ['Go', 'Systems Programming'],
    year: '2025',
    link: 'https://github.com/noxire-dev/GoSH',
    features: ['Command parsing', 'Process spawning', 'I/O redirection', 'Built-in commands']
  },
  { 
    id: 'moji',
    name: 'Moji', 
    num: '02',
    tagline: 'Note taking & productivity suite',
    description: 'Moji is a note-taking and todo application with a strong focus on UI/UX design. Built with Flask and JavaScript, it offers a clean interface for managing daily tasks and notes.',
    tech: ['Python', 'Flask', 'JavaScript', 'SQLite'],
    year: '2025',
    link: 'https://github.com/noxire-dev/moji',
    features: ['Rich text notes', 'Task management', 'Tags & categories', 'Dark mode']
  },
  { 
    id: 'lorekeeper',
    name: 'LoreKeeper', 
    num: '03',
    tagline: 'E-Commerce for Tabletop RPGs',
    description: 'LoreKeeper is an e-commerce platform dedicated to free tabletop RPG materials. Users can browse, download, and share game resources with the community.',
    tech: ['Python', 'JavaScript', 'PostgreSQL'],
    year: '2025',
    link: 'https://github.com/noxire-dev/LoreKeeper',
    features: ['User accounts', 'Resource library', 'Community ratings', 'PDF viewer']
  },
  { 
    id: 'midnight',
    name: 'Midnight Moon', 
    num: '04',
    tagline: 'VSCode theme collection',
    description: 'A carefully crafted collection of dark themes for Visual Studio Code. Each theme is designed for long coding sessions with carefully chosen colors to reduce eye strain.',
    tech: ['JSON', 'Design'],
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

I will be using React, TypeScript, and Tailwind CSS. It will be a great learning experience and hopefully make my website even better!

The new stack allows for much faster iteration and a more modern development workflow. I'm excited to see where this takes me.`,
    tags: ['development', 'portfolio', 'react']
  },
  {
    id: 'first-year',
    title: 'Finished My First Year at University',
    date: '2025-08-28',
    excerpt: 'Reflecting on achieving 96/100 and First Class Honours.',
    content: `I finished my first year at the University of Essex and couldn't be happier with the results — I achieved 96/100 overall and a First Class.

I'm proud of the work I put in, and grateful for the support and guidance I had along the way. Really excited to carry this momentum into my second year!

The coursework covered everything from algorithms to software engineering principles. Each module pushed me to think differently about problem-solving.`,
    tags: ['university', 'achievement', 'computer-science']
  },
  {
    id: 'learning-c',
    title: 'Started Learning C',
    date: '2025-02-23',
    excerpt: 'Diving into low-level programming to understand systems better.',
    content: `I wanted to dive into low-level programming so I started learning C not to be good at it but understand how C++, C# and Rust works.

It's hair pulling to implement the functions I am so used to using in high level languages but it's also a lot of fun.

I'm loving the simplicity and syntax of C. There's something satisfying about managing memory manually and understanding exactly what's happening at each step.`,
    tags: ['learning', 'C', 'low-level']
  },
]

function NavBar({ currentView, setView }: { currentView: View; setView: (v: View) => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-black">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <button onClick={() => setView('home')} className="font-black text-xl hover:text-red-600 transition-colors">
          SD
        </button>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setView('home')} 
            className={`text-sm tracking-widest hover:text-red-600 transition-colors ${currentView === 'home' ? 'text-red-600' : ''}`}
          >
            HOME
          </button>
          <button 
            onClick={() => setView('blog')} 
            className={`text-sm tracking-widest hover:text-red-600 transition-colors ${currentView === 'blog' || currentView === 'blog-post' ? 'text-red-600' : ''}`}
          >
            BLOG
          </button>
          <Link to="/" className="text-sm tracking-widest text-gray-400 hover:text-black transition-colors">
            ← EXIT
          </Link>
        </div>
      </div>
    </nav>
  )
}

function HomePage({ setView, setSelectedProject, setSelectedPost }: { 
  setView: (v: View) => void
  setSelectedProject: (id: string) => void
  setSelectedPost: (id: string) => void
}) {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="min-h-[80vh] flex items-center px-6">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-12 gap-8"
          >
            <div className="md:col-span-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-4 h-4 bg-red-600" />
                <span className="text-sm tracking-widest text-gray-500">DEVELOPER / STUDENT</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter">
                SINA
                <br />
                <span className="text-stroke-2 text-black">DILEK</span>
              </h1>
              <p className="mt-8 text-lg text-gray-600 max-w-md">
                Building small tools and learning systems. 
                CS student at the University of Essex.
              </p>
            </div>
            <div className="md:col-span-4 flex flex-col justify-end">
              <div className="space-y-3 text-right">
                <div className="text-sm text-gray-400">ACHIEVEMENT</div>
                <div className="text-2xl font-black text-red-600">96/100</div>
                <div className="text-sm text-gray-500">First Class Honours</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-20 px-6 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-4 h-4 bg-red-600" />
            <h2 className="text-sm tracking-widest">SELECTED PROJECTS</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-1">
            {projects.map((project, i) => (
              <motion.button
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => { setSelectedProject(project.id); setView('project') }}
                className="group p-8 border border-gray-800 hover:border-red-600 hover:bg-red-600 text-left transition-all"
              >
                <span className="text-5xl font-black text-gray-700 group-hover:text-white/30">{project.num}</span>
                <h3 className="text-2xl font-black mt-4 group-hover:text-white">{project.name}</h3>
                <p className="text-gray-500 group-hover:text-white/70 mt-2">{project.tagline}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <div className="w-4 h-4 bg-red-600" />
              <h2 className="text-sm tracking-widest">RECENT POSTS</h2>
            </div>
            <button onClick={() => setView('blog')} className="text-sm text-red-600 hover:underline">
              VIEW ALL →
            </button>
          </div>
          
          <div className="space-y-4">
            {blogPosts.slice(0, 2).map((post, i) => (
              <motion.button
                key={post.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => { setSelectedPost(post.id); setView('blog-post') }}
                className="group w-full p-6 border-2 border-black hover:bg-black hover:text-white text-left transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-500 group-hover:text-gray-400">{post.date}</span>
                    <h3 className="text-xl font-bold mt-1">{post.title}</h3>
                    <p className="text-gray-600 group-hover:text-gray-300 mt-2">{post.excerpt}</p>
                  </div>
                  <span className="text-2xl">→</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 px-6 bg-red-600 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-8">LET'S CONNECT</h2>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <a href="https://github.com/noxire-dev" target="_blank" rel="noopener" className="px-8 py-4 bg-white text-red-600 font-black hover:bg-black hover:text-white transition-colors">
              GITHUB
            </a>
            <a href="https://linkedin.com/in/sina-dilek-0b1b3b1b9" target="_blank" rel="noopener" className="px-8 py-4 bg-black text-white font-black hover:bg-white hover:text-black transition-colors">
              LINKEDIN
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

function ProjectPage({ projectId, setView }: { projectId: string; setView: (v: View) => void }) {
  const project = projects.find(p => p.id === projectId) || projects[0]
  
  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <button onClick={() => setView('home')} className="text-sm text-gray-500 hover:text-black mb-8 flex items-center gap-2">
          ← Back to projects
        </button>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl font-black text-red-600">{project.num}</span>
            <div className="w-12 h-1 bg-red-600" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-4">{project.name}</h1>
          <p className="text-xl text-gray-600 mb-8">{project.tagline}</p>
          
          {/* Mock screenshot */}
          <div className="aspect-video bg-gray-100 border-2 border-black mb-8 flex items-center justify-center">
            <span className="text-gray-400">[ Project Screenshot ]</span>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div>
              <h3 className="text-xs tracking-widest text-gray-500 mb-2">YEAR</h3>
              <p className="font-bold">{project.year}</p>
            </div>
            <div>
              <h3 className="text-xs tracking-widest text-gray-500 mb-2">TECHNOLOGIES</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map(t => (
                  <span key={t} className="px-2 py-1 bg-black text-white text-xs">{t}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs tracking-widest text-gray-500 mb-2">LINK</h3>
              <a href={project.link} target="_blank" rel="noopener" className="text-red-600 hover:underline font-bold">
                View on GitHub →
              </a>
            </div>
          </div>
          
          <div className="prose max-w-none">
            <h2 className="text-2xl font-black mb-4">About the Project</h2>
            <p className="text-gray-600 leading-relaxed mb-8">{project.description}</p>
            
            <h2 className="text-2xl font-black mb-4">Key Features</h2>
            <ul className="space-y-2">
              {project.features.map(f => (
                <li key={f} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-600" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function BlogListPage({ setView, setSelectedPost }: { setView: (v: View) => void; setSelectedPost: (id: string) => void }) {
  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-4 mb-12">
            <div className="w-4 h-4 bg-red-600" />
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
                className="group w-full p-8 border-2 border-black hover:bg-black hover:text-white text-left transition-all"
              >
                <span className="text-xs text-gray-500 group-hover:text-gray-400">{post.date}</span>
                <h2 className="text-2xl font-black mt-2">{post.title}</h2>
                <p className="text-gray-600 group-hover:text-gray-300 mt-3">{post.excerpt}</p>
                <div className="flex gap-2 mt-4">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 bg-gray-100 group-hover:bg-gray-800 text-gray-600 group-hover:text-gray-300">
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
    <div className="pt-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <button onClick={() => setView('blog')} className="text-sm text-gray-500 hover:text-black mb-8 flex items-center gap-2">
          ← Back to blog
        </button>
        
        <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-sm text-gray-500">{post.date}</span>
          <h1 className="text-4xl md:text-5xl font-black mt-2 mb-6">{post.title}</h1>
          
          <div className="flex gap-2 mb-8">
            {post.tags.map(tag => (
              <span key={tag} className="text-xs px-2 py-1 bg-red-600 text-white">#{tag}</span>
            ))}
          </div>
          
          <div className="prose max-w-none">
            {post.content.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-gray-700 leading-relaxed mb-6">{paragraph}</p>
            ))}
          </div>
        </motion.article>
      </div>
    </div>
  )
}

export default function Design16() {
  const [view, setView] = useState<View>('home')
  const [selectedProject, setSelectedProject] = useState('gosh')
  const [selectedPost, setSelectedPost] = useState('v2-rebuild')

  return (
    <div className="min-h-screen bg-white text-black font-mono selection:bg-red-600 selection:text-white">
      <NavBar currentView={view} setView={setView} />
      
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
      
      {/* Footer */}
      <footer className="py-8 px-6 border-t-2 border-black mt-20">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-sm">
          <span>© {new Date().getFullYear()} Sina Dilek</span>
          <span className="text-red-600">Built with intention</span>
        </div>
      </footer>
    </div>
  )
}
