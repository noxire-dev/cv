import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'

// Design 24: SPLIT CONSTRUCTIVIST — REMASTERED
// Original: Design 18
// Refined: Better spacing, improved readability, polished interactions
// Asymmetric layout with bold typography, Russian Constructivism influence

type View = 'home' | 'project' | 'blog' | 'blog-post'

const projects = [
  { 
    id: 'gosh',
    name: 'GoSH', 
    tagline: 'A minimalist shell in Go',
    description: 'GoSH demonstrates core systems programming concepts including process management, I/O redirection, and command parsing. Built for learning how shells work under the hood.',
    tech: ['Go', 'Systems Programming'],
    year: '2025',
    link: 'https://github.com/noxire-dev/GoSH',
    features: ['Full command parsing with pipes', 'Process spawning', 'I/O redirection', 'Built-in commands']
  },
  { 
    id: 'moji',
    name: 'Moji', 
    tagline: 'Note taking & productivity',
    description: 'A note-taking and todo application focused on UI/UX design. Built with Flask and JavaScript for managing daily tasks and notes.',
    tech: ['Python', 'Flask', 'JavaScript'],
    year: '2025',
    link: 'https://github.com/noxire-dev/moji',
    features: ['Rich text notes', 'Task management', 'Tags & categories', 'Dark mode']
  },
  { 
    id: 'lorekeeper',
    name: 'LoreKeeper', 
    tagline: 'E-Commerce for TTRPGs',
    description: 'An e-commerce platform for free tabletop RPG materials. Browse, download, and share resources with the community.',
    tech: ['Python', 'PostgreSQL', 'JavaScript'],
    year: '2025',
    link: 'https://github.com/noxire-dev/LoreKeeper',
    features: ['User accounts', 'Resource library', 'Community ratings', 'PDF viewer']
  },
  { 
    id: 'midnight',
    name: 'Midnight Moon', 
    tagline: 'VSCode theme collection',
    description: 'Dark themes for Visual Studio Code designed for long coding sessions with carefully chosen colors to reduce eye strain.',
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
    excerpt: 'Rebuilding my portfolio with modern tools and fresh perspective.',
    content: `When I first started this project 3 years ago, I used Flask and some weird design choices. Knowing only Python at the time, Flask felt magical.

I've since learned a lot and I think it's time to give it a fresh start. I want to add more complex features like blog post capabilities.

I will be using React, TypeScript, and Tailwind CSS. It will be a great learning experience!`,
    tags: ['development', 'portfolio']
  },
  {
    id: 'first-year',
    title: 'Finished First Year at Uni',
    date: '2025-08-28',
    excerpt: 'Achieved 96/100 and First Class Honours at Essex.',
    content: `I finished my first year at the University of Essex and couldn't be happier with the results — I achieved 96/100 overall and a First Class.

I'm proud of the work I put in, and grateful for the support I had along the way. Really excited for second year!`,
    tags: ['university', 'achievement']
  },
  {
    id: 'learning-c',
    title: 'Started Learning C',
    date: '2025-02-23',
    excerpt: 'Understanding low-level programming.',
    content: `I wanted to dive into low-level programming so I started learning C to understand how C++, C# and Rust works.

It's hair pulling to implement functions I'm so used to in high level languages but it's also a lot of fun.`,
    tags: ['learning', 'C']
  },
]

function Navigation({ currentView, setView }: { currentView: View; setView: (v: View) => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b-2 border-black">
      <div className="flex justify-between items-center px-6 md:px-10 py-5">
        <button onClick={() => setView('home')} className="font-black text-3xl hover:text-red-600 transition-colors">
          SD
        </button>
        <div className="flex items-center gap-6 md:gap-8">
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
          <Link to="/" className="text-sm tracking-widest text-gray-400 hover:text-black transition-colors">
            EXIT
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
    <div className="pt-[70px]">
      {/* Hero - Split Layout */}
      <section className="min-h-[calc(100vh-70px)] grid grid-cols-12">
        {/* Left - Red Panel */}
        <motion.div 
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="col-span-12 md:col-span-5 bg-red-600 text-white p-8 md:p-12 flex flex-col justify-center relative overflow-hidden"
        >
          <span className="absolute top-16 left-6 text-[8rem] md:text-[10rem] font-black opacity-10 leading-none">96</span>
          <div className="relative z-10">
            <span className="text-sm tracking-widest opacity-80">FIRST CLASS HONOURS</span>
            <h2 className="text-3xl md:text-4xl font-black mt-4 leading-tight">
              University of<br/>Essex
            </h2>
            <p className="mt-6 text-white/80 max-w-sm leading-relaxed">
              Computer Science student passionate about building tools and learning systems programming.
            </p>
          </div>
        </motion.div>
        
        {/* Right - Main Content */}
        <motion.div 
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="col-span-12 md:col-span-7 p-8 md:p-12 flex flex-col justify-center"
        >
          <div className="max-w-lg">
            <h1 className="text-[15vw] md:text-[8vw] font-black leading-[0.9] tracking-tighter">
              SINA
              <span className="block text-transparent" style={{ WebkitTextStroke: '2px black' }}>DILEK</span>
            </h1>
            <p className="mt-6 text-gray-600 text-lg">
              Developer / Designer / Student
            </p>
            <div className="flex gap-4 mt-8">
              <a href="https://github.com/noxire-dev" target="_blank" rel="noopener" className="px-6 py-3 bg-black text-white font-bold hover:bg-red-600 transition-colors">
                GitHub →
              </a>
              <a href="https://linkedin.com/in/sina-dilek-0b1b3b1b9" target="_blank" rel="noopener" className="px-6 py-3 border-2 border-black font-bold hover:bg-black hover:text-white transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-1 bg-red-600" />
            <span className="text-sm tracking-[0.3em]">PROJECTS</span>
          </div>
          
          <div className="space-y-0">
            {projects.map((project, i) => (
              <motion.button
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => { setSelectedProject(project.id); setView('project') }}
                className="group w-full grid grid-cols-12 gap-4 py-6 border-b-2 border-black/10 hover:border-red-600 hover:bg-red-600 text-left transition-all px-4 -mx-4"
              >
                <span className="col-span-2 md:col-span-1 text-3xl md:text-4xl font-black text-gray-200 group-hover:text-white/40">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="col-span-10 md:col-span-4">
                  <h3 className="text-xl md:text-2xl font-black group-hover:text-white transition-colors">{project.name}</h3>
                </div>
                <div className="col-span-12 md:col-span-5 md:block">
                  <p className="text-gray-500 group-hover:text-white/80 transition-colors text-sm md:text-base">{project.tagline}</p>
                </div>
                <div className="hidden md:block md:col-span-2 text-right">
                  <span className="text-lg group-hover:text-white transition-transform inline-block group-hover:translate-x-2">→</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview - Split */}
      <section className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-8 p-8 md:p-12 bg-gray-50">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-1 bg-red-600" />
              <span className="text-sm tracking-[0.3em]">BLOG</span>
            </div>
            <button onClick={() => setView('blog')} className="text-red-600 hover:underline text-sm font-medium">
              View all →
            </button>
          </div>
          
          <div className="space-y-4">
            {blogPosts.slice(0, 2).map((post, i) => (
              <motion.button
                key={post.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => { setSelectedPost(post.id); setView('blog-post') }}
                className="group w-full text-left p-6 bg-white border-2 border-transparent hover:border-black hover:bg-black hover:text-white transition-all"
              >
                <span className="text-xs text-gray-500 group-hover:text-gray-400">{post.date}</span>
                <h3 className="text-lg font-bold mt-2">{post.title}</h3>
                <p className="text-gray-600 group-hover:text-gray-300 mt-2 text-sm">{post.excerpt}</p>
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Stats Panel */}
        <div className="col-span-12 md:col-span-4 bg-black text-white p-8 md:p-12 flex flex-col justify-center">
          <div className="space-y-10">
            <div>
              <span className="text-5xl md:text-6xl font-black text-red-600">{projects.length}</span>
              <p className="text-sm text-gray-500 mt-2 tracking-widest">PROJECTS</p>
            </div>
            <div>
              <span className="text-5xl md:text-6xl font-black text-red-600">{blogPosts.length}</span>
              <p className="text-sm text-gray-500 mt-2 tracking-widest">BLOG POSTS</p>
            </div>
            <div>
              <span className="text-5xl md:text-6xl font-black text-red-600">∞</span>
              <p className="text-sm text-gray-500 mt-2 tracking-widest">IDEAS</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-8 md:p-12 flex flex-col md:flex-row justify-between items-center text-sm border-t-2 border-black bg-white gap-4">
        <span>© {new Date().getFullYear()} Sina Dilek</span>
        <span className="text-red-600">Built with intention</span>
      </footer>
    </div>
  )
}

function ProjectPage({ projectId, setView }: { projectId: string; setView: (v: View) => void }) {
  const project = projects.find(p => p.id === projectId) || projects[0]
  const idx = projects.findIndex(p => p.id === projectId)
  
  return (
    <div className="pt-[70px] min-h-screen">
      {/* Split Header */}
      <div className="grid grid-cols-12">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="col-span-12 md:col-span-3 bg-red-600 text-white p-8 md:p-10 flex items-center justify-center min-h-[200px] md:min-h-[300px]"
        >
          <span className="text-[6rem] md:text-[8rem] font-black opacity-60">{String(idx + 1).padStart(2, '0')}</span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="col-span-12 md:col-span-9 p-8 md:p-10 flex flex-col justify-center"
        >
          <button onClick={() => setView('home')} className="text-sm text-gray-500 hover:text-black mb-6 self-start">
            ← Back to projects
          </button>
          <h1 className="text-4xl md:text-6xl font-black mb-3">{project.name}</h1>
          <p className="text-lg text-gray-600">{project.tagline}</p>
        </motion.div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          {/* Screenshot */}
          <div className="aspect-video bg-gray-100 border-2 border-black mb-10 flex items-center justify-center">
            <span className="text-gray-400">[ Project Screenshot ]</span>
          </div>
          
          {/* Meta */}
          <div className="grid md:grid-cols-3 gap-8 mb-12 pb-12 border-b-2 border-black">
            <div>
              <span className="text-xs tracking-widest text-gray-500">YEAR</span>
              <p className="text-2xl font-black mt-2">{project.year}</p>
            </div>
            <div>
              <span className="text-xs tracking-widest text-gray-500">STACK</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.tech.map(t => (
                  <span key={t} className="px-3 py-1 bg-black text-white text-sm">{t}</span>
                ))}
              </div>
            </div>
            <div>
              <span className="text-xs tracking-widest text-gray-500">LINK</span>
              <a href={project.link} target="_blank" rel="noopener" className="block text-red-600 font-bold hover:underline mt-2">
                GitHub →
              </a>
            </div>
          </div>
          
          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-black mb-4">About</h2>
              <p className="text-gray-600 leading-relaxed">{project.description}</p>
            </div>
            <div>
              <h2 className="text-2xl font-black mb-4">Features</h2>
              <ul className="space-y-3">
                {project.features.map(f => (
                  <li key={f} className="flex items-start gap-3">
                    <div className="w-3 h-0.5 bg-red-600 mt-3 flex-shrink-0" />
                    <span className="text-gray-600">{f}</span>
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
    <div className="pt-[70px] min-h-screen">
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-1 bg-red-600" />
            <h1 className="text-4xl font-black">BLOG</h1>
          </div>
          
          <div className="space-y-4">
            {blogPosts.map((post, i) => (
              <motion.button
                key={post.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => { setSelectedPost(post.id); setView('blog-post') }}
                className="group w-full text-left p-8 border-2 border-black hover:bg-black hover:text-white transition-all"
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
    <div className="pt-[70px] min-h-screen">
      {/* Split Header */}
      <div className="grid grid-cols-12">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="col-span-12 md:col-span-3 bg-red-600 text-white p-8 md:p-10"
        >
          <span className="text-sm tracking-widest opacity-80">PUBLISHED</span>
          <p className="text-2xl font-black mt-3">{post.date}</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="col-span-12 md:col-span-9 p-8 md:p-10"
        >
          <button onClick={() => setView('blog')} className="text-sm text-gray-500 hover:text-black mb-6">
            ← Back to blog
          </button>
          <h1 className="text-3xl md:text-4xl font-black mb-4">{post.title}</h1>
          <div className="flex gap-2">
            {post.tags.map(tag => (
              <span key={tag} className="text-xs px-2 py-1 bg-black text-white">#{tag}</span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-12">
        <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="prose prose-lg max-w-none">
            {post.content.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-gray-700 leading-relaxed mb-6">{paragraph}</p>
            ))}
          </div>
        </motion.article>
      </div>
    </div>
  )
}

export default function Design24() {
  const [view, setView] = useState<View>('home')
  const [selectedProject, setSelectedProject] = useState('gosh')
  const [selectedPost, setSelectedPost] = useState('v2-rebuild')

  return (
    <div className="min-h-screen bg-white text-black font-mono selection:bg-red-600 selection:text-white">
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
