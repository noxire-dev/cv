import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'

// Design 17: MODULAR GRID BRUTALIST
// Card-based layout with geometric accents
// Dark theme with red highlights

type View = 'home' | 'project' | 'blog' | 'blog-post'

const projects = [
  { 
    id: 'gosh',
    name: 'GoSH', 
    tagline: 'A toy shell written in Go',
    description: 'GoSH is a minimalist shell implementation written in Go for learning purposes. It demonstrates core systems programming concepts including process management, I/O redirection, and command parsing.',
    tech: ['Go', 'Systems'],
    year: '2025',
    link: 'https://github.com/noxire-dev/GoSH',
    features: ['Command parsing', 'Process spawning', 'I/O redirection', 'Built-in commands'],
    color: 'bg-red-500'
  },
  { 
    id: 'moji',
    name: 'Moji', 
    tagline: 'Note taking & productivity',
    description: 'Moji is a note-taking and todo application with a strong focus on UI/UX design. Built with Flask and JavaScript, it offers a clean interface for managing daily tasks and notes.',
    tech: ['Python', 'Flask', 'JS'],
    year: '2025',
    link: 'https://github.com/noxire-dev/moji',
    features: ['Rich text notes', 'Task management', 'Tags & categories', 'Dark mode'],
    color: 'bg-orange-500'
  },
  { 
    id: 'lorekeeper',
    name: 'LoreKeeper', 
    tagline: 'E-Commerce for TTRPGs',
    description: 'An e-commerce platform dedicated to free tabletop RPG materials. Users can browse, download, and share game resources with the community.',
    tech: ['Python', 'PostgreSQL'],
    year: '2025',
    link: 'https://github.com/noxire-dev/LoreKeeper',
    features: ['User accounts', 'Resource library', 'Community ratings', 'PDF viewer'],
    color: 'bg-purple-500'
  },
  { 
    id: 'midnight',
    name: 'Midnight Moon', 
    tagline: 'VSCode theme collection',
    description: 'A carefully crafted collection of dark themes for Visual Studio Code designed for long coding sessions.',
    tech: ['Design', 'JSON'],
    year: '2024',
    link: 'https://github.com/noxire-dev/midnight-theme',
    features: ['Multiple variants', 'Semantic highlighting', 'Terminal colors', 'UI theming'],
    color: 'bg-blue-500'
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

function Sidebar({ currentView, setView }: { currentView: View; setView: (v: View) => void }) {
  return (
    <aside className="fixed left-0 top-0 h-full w-20 bg-black flex flex-col items-center py-8 z-50">
      <button onClick={() => setView('home')} className="text-white font-black text-2xl mb-12 hover:text-red-500 transition-colors">
        SD
      </button>
      
      <nav className="flex flex-col gap-6 flex-1">
        <button 
          onClick={() => setView('home')} 
          className={`w-10 h-10 border-2 transition-all ${currentView === 'home' ? 'bg-red-500 border-red-500' : 'border-gray-700 hover:border-white'}`}
          title="Home"
        />
        <button 
          onClick={() => setView('blog')} 
          className={`w-10 h-10 border-2 transition-all rotate-45 ${currentView === 'blog' || currentView === 'blog-post' ? 'bg-red-500 border-red-500' : 'border-gray-700 hover:border-white'}`}
          title="Blog"
        />
      </nav>
      
      <Link to="/" className="text-gray-500 hover:text-white text-sm rotate-[-90deg] whitespace-nowrap">
        EXIT →
      </Link>
    </aside>
  )
}

function HomePage({ setView, setSelectedProject, setSelectedPost }: { 
  setView: (v: View) => void
  setSelectedProject: (id: string) => void
  setSelectedPost: (id: string) => void
}) {
  return (
    <div className="ml-20 min-h-screen p-8">
      {/* Hero Grid */}
      <section className="grid grid-cols-12 gap-4 mb-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="col-span-12 md:col-span-8 bg-white p-12 min-h-[400px] flex flex-col justify-end"
        >
          <span className="text-sm text-gray-500 mb-4">DEVELOPER / STUDENT</span>
          <h1 className="text-6xl md:text-8xl font-black text-black leading-none">
            SINA<br/>DILEK
          </h1>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="col-span-6 md:col-span-2 bg-red-500 p-6 flex flex-col justify-between"
        >
          <span className="text-5xl font-black text-white">96</span>
          <span className="text-xs text-white/70">FIRST CLASS</span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-6 md:col-span-2 bg-gray-900 p-6 flex flex-col justify-between"
        >
          <span className="text-5xl font-black text-white">{projects.length}</span>
          <span className="text-xs text-gray-500">PROJECTS</span>
        </motion.div>
      </section>

      {/* Projects Grid */}
      <section className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-4 h-4 bg-red-500" />
          <h2 className="text-sm tracking-widest text-gray-500">PROJECTS</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {projects.map((project, i) => (
            <motion.button
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => { setSelectedProject(project.id); setView('project') }}
              className="group bg-gray-900 p-6 text-left hover:bg-white transition-all duration-300"
            >
              <div className={`w-full h-2 ${project.color} mb-6`} />
              <h3 className="text-xl font-black text-white group-hover:text-black mb-2">{project.name}</h3>
              <p className="text-sm text-gray-500 group-hover:text-gray-600 mb-4">{project.tagline}</p>
              <div className="flex flex-wrap gap-1">
                {project.tech.map(t => (
                  <span key={t} className="text-xs px-2 py-1 bg-black/50 text-gray-400 group-hover:bg-gray-200 group-hover:text-gray-600">
                    {t}
                  </span>
                ))}
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Blog Grid */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-4 h-4 bg-red-500 rotate-45" />
            <h2 className="text-sm tracking-widest text-gray-500">LATEST POSTS</h2>
          </div>
          <button onClick={() => setView('blog')} className="text-red-500 text-sm hover:underline">
            All posts →
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {blogPosts.map((post, i) => (
            <motion.button
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              onClick={() => { setSelectedPost(post.id); setView('blog-post') }}
              className="group bg-gray-900 p-6 text-left hover:bg-red-500 transition-all duration-300"
            >
              <span className="text-xs text-gray-600 group-hover:text-white/70">{post.date}</span>
              <h3 className="text-lg font-bold text-white mt-2 mb-3">{post.title}</h3>
              <p className="text-sm text-gray-500 group-hover:text-white/80">{post.excerpt}</p>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-8 bg-white p-8 flex items-center justify-between">
          <span className="text-black font-black text-2xl">Let's build something</span>
          <a href="https://github.com/noxire-dev" target="_blank" rel="noopener" className="px-6 py-3 bg-black text-white font-bold hover:bg-red-500 transition-colors">
            GitHub →
          </a>
        </div>
        <div className="col-span-12 md:col-span-4 bg-red-500 p-8 flex items-center justify-center">
          <a href="https://linkedin.com/in/sina-dilek-0b1b3b1b9" target="_blank" rel="noopener" className="text-white font-black hover:underline">
            CONNECT ON LINKEDIN
          </a>
        </div>
      </section>
    </div>
  )
}

function ProjectPage({ projectId, setView }: { projectId: string; setView: (v: View) => void }) {
  const project = projects.find(p => p.id === projectId) || projects[0]
  
  return (
    <div className="ml-20 min-h-screen p-8">
      <button onClick={() => setView('home')} className="text-gray-500 hover:text-white mb-8 text-sm">
        ← Back
      </button>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-12 gap-4"
      >
        {/* Main content */}
        <div className="col-span-12 md:col-span-8 bg-white p-12 text-black">
          <div className={`w-20 h-2 ${project.color} mb-8`} />
          <h1 className="text-5xl md:text-6xl font-black mb-4">{project.name}</h1>
          <p className="text-xl text-gray-600 mb-8">{project.tagline}</p>
          
          {/* Mock screenshot */}
          <div className="aspect-video bg-gray-100 border-2 border-black mb-8 flex items-center justify-center">
            <span className="text-gray-400">[ Screenshot ]</span>
          </div>
          
          <div className="prose max-w-none">
            <h2 className="text-2xl font-black mb-4">About</h2>
            <p className="text-gray-600 leading-relaxed mb-8">{project.description}</p>
            
            <h2 className="text-2xl font-black mb-4">Features</h2>
            <div className="grid grid-cols-2 gap-3">
              {project.features.map(f => (
                <div key={f} className="flex items-center gap-3 p-3 bg-gray-100">
                  <div className={`w-2 h-2 ${project.color}`} />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="col-span-12 md:col-span-4 space-y-4">
          <div className="bg-gray-900 p-6">
            <span className="text-xs text-gray-500 block mb-2">YEAR</span>
            <span className="text-3xl font-black text-white">{project.year}</span>
          </div>
          <div className="bg-gray-900 p-6">
            <span className="text-xs text-gray-500 block mb-3">STACK</span>
            <div className="flex flex-wrap gap-2">
              {project.tech.map(t => (
                <span key={t} className="px-3 py-1 bg-black text-white text-sm">{t}</span>
              ))}
            </div>
          </div>
          <a 
            href={project.link} 
            target="_blank" 
            rel="noopener" 
            className={`block ${project.color} p-6 text-center text-white font-black hover:opacity-90 transition-opacity`}
          >
            VIEW ON GITHUB →
          </a>
        </div>
      </motion.div>
    </div>
  )
}

function BlogListPage({ setView, setSelectedPost }: { setView: (v: View) => void; setSelectedPost: (id: string) => void }) {
  return (
    <div className="ml-20 min-h-screen p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-4 mb-12">
          <div className="w-4 h-4 bg-red-500 rotate-45" />
          <h1 className="text-4xl font-black text-white">BLOG</h1>
        </div>
        
        <div className="space-y-4">
          {blogPosts.map((post, i) => (
            <motion.button
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => { setSelectedPost(post.id); setView('blog-post') }}
              className="group w-full bg-gray-900 p-8 text-left hover:bg-white transition-all"
            >
              <span className="text-xs text-gray-600 group-hover:text-gray-500">{post.date}</span>
              <h2 className="text-2xl font-black text-white group-hover:text-black mt-2">{post.title}</h2>
              <p className="text-gray-500 group-hover:text-gray-600 mt-3">{post.excerpt}</p>
              <div className="flex gap-2 mt-4">
                {post.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-1 bg-black/50 text-gray-400 group-hover:bg-gray-200 group-hover:text-gray-600">
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

function BlogPostPage({ postId, setView }: { postId: string; setView: (v: View) => void }) {
  const post = blogPosts.find(p => p.id === postId) || blogPosts[0]
  
  return (
    <div className="ml-20 min-h-screen p-8">
      <button onClick={() => setView('blog')} className="text-gray-500 hover:text-white mb-8 text-sm">
        ← Back to blog
      </button>
      
      <motion.article 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl"
      >
        <div className="bg-white p-12 text-black">
          <span className="text-sm text-gray-500">{post.date}</span>
          <h1 className="text-4xl md:text-5xl font-black mt-2 mb-6">{post.title}</h1>
          
          <div className="flex gap-2 mb-8">
            {post.tags.map(tag => (
              <span key={tag} className="text-xs px-2 py-1 bg-red-500 text-white">#{tag}</span>
            ))}
          </div>
          
          <div className="prose max-w-none">
            {post.content.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-gray-700 leading-relaxed mb-6">{paragraph}</p>
            ))}
          </div>
        </div>
      </motion.article>
    </div>
  )
}

export default function Design17() {
  const [view, setView] = useState<View>('home')
  const [selectedProject, setSelectedProject] = useState('gosh')
  const [selectedPost, setSelectedPost] = useState('v2-rebuild')

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-red-500 selection:text-white">
      <Sidebar currentView={view} setView={setView} />
      
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
