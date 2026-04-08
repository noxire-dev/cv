import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'

// Design 18: SPLIT CONSTRUCTIVIST
// Asymmetric layout with bold typography
// Inspired by Russian Constructivism with modern brutalist elements

type View = 'home' | 'project' | 'blog' | 'blog-post'

const projects = [
  { 
    id: 'gosh',
    name: 'GoSH', 
    tagline: 'A toy shell written in Go',
    description: 'GoSH is a minimalist shell implementation written in Go for learning purposes. Demonstrates core systems programming concepts including process management, I/O redirection, and command parsing.',
    tech: ['Go', 'Systems Programming'],
    year: '2025',
    link: 'https://github.com/noxire-dev/GoSH',
    features: ['Command parsing', 'Process spawning', 'I/O redirection', 'Built-in commands']
  },
  { 
    id: 'moji',
    name: 'Moji', 
    tagline: 'Note taking & productivity',
    description: 'A note-taking and todo application with a strong focus on UI/UX design. Built with Flask and JavaScript for managing daily tasks and notes.',
    tech: ['Python', 'Flask', 'JavaScript'],
    year: '2025',
    link: 'https://github.com/noxire-dev/moji',
    features: ['Rich text notes', 'Task management', 'Tags & categories', 'Dark mode']
  },
  { 
    id: 'lorekeeper',
    name: 'LoreKeeper', 
    tagline: 'E-Commerce for TTRPGs',
    description: 'An e-commerce platform for free tabletop RPG materials. Browse, download, and share game resources with the community.',
    tech: ['Python', 'PostgreSQL', 'JavaScript'],
    year: '2025',
    link: 'https://github.com/noxire-dev/LoreKeeper',
    features: ['User accounts', 'Resource library', 'Community ratings', 'PDF viewer']
  },
  { 
    id: 'midnight',
    name: 'Midnight Moon', 
    tagline: 'VSCode theme collection',
    description: 'A collection of dark themes for Visual Studio Code designed for long coding sessions with carefully chosen colors.',
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
    excerpt: 'Rebuilding my portfolio with modern tools.',
    content: `When I first started this project 3 years ago, I used Flask and some weird design choices. Knowing only Python at the time, Flask felt magical.

I've since learned a lot and I think it's time to give it a fresh start. I want to add more complex features like blog post capabilities.

I will be using React, TypeScript, and Tailwind CSS. It will be a great learning experience!`,
    tags: ['dev', 'portfolio']
  },
  {
    id: 'first-year',
    title: 'Finished First Year at Uni',
    date: '2025-08-28',
    excerpt: 'Achieved 96/100 and First Class Honours.',
    content: `I finished my first year at the University of Essex and couldn't be happier with the results — I achieved 96/100 overall and a First Class.

I'm proud of the work I put in, and grateful for the support I had along the way. Really excited for second year!`,
    tags: ['university', 'win']
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

function HomePage({ setView, setSelectedProject, setSelectedPost }: { 
  setView: (v: View) => void
  setSelectedProject: (id: string) => void
  setSelectedPost: (id: string) => void
}) {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6">
        <span className="text-5xl font-black">SD</span>
        <div className="flex items-center gap-8">
          <button onClick={() => setView('blog')} className="text-sm tracking-widest hover:text-red-600">BLOG</button>
          <Link to="/" className="text-sm tracking-widest text-gray-500 hover:text-black">EXIT</Link>
        </div>
      </nav>

      {/* Hero - Split Layout */}
      <section className="min-h-screen grid grid-cols-12">
        {/* Left - Red Panel */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="col-span-12 md:col-span-5 bg-red-600 text-white p-12 flex flex-col justify-center"
        >
          <span className="text-9xl font-black opacity-20 absolute top-20 left-8">96</span>
          <div className="relative z-10">
            <span className="text-sm tracking-widest opacity-70">FIRST CLASS HONOURS</span>
            <h2 className="text-4xl font-black mt-4">University of<br/>Essex</h2>
            <p className="mt-8 text-white/70 max-w-xs">
              Computer Science student passionate about building tools and learning systems.
            </p>
          </div>
        </motion.div>
        
        {/* Right - Main Content */}
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="col-span-12 md:col-span-7 p-12 flex flex-col justify-center"
        >
          <div className="max-w-lg">
            <h1 className="text-7xl md:text-9xl font-black leading-[0.85] tracking-tighter">
              SINA
              <span className="block text-transparent" style={{ WebkitTextStroke: '2px black' }}>DILEK</span>
            </h1>
            <p className="mt-8 text-gray-600 text-lg">
              Developer / Designer / Student
            </p>
            <div className="flex gap-4 mt-8">
              <a href="https://github.com/noxire-dev" target="_blank" rel="noopener" className="px-6 py-3 bg-black text-white font-bold hover:bg-red-600 transition-colors">
                GitHub
              </a>
              <a href="https://linkedin.com/in/sina-dilek-0b1b3b1b9" target="_blank" rel="noopener" className="px-6 py-3 border-2 border-black font-bold hover:bg-black hover:text-white transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section className="py-24 px-12">
        <div className="flex items-center gap-4 mb-16">
          <div className="w-16 h-1 bg-red-600" />
          <span className="text-sm tracking-[0.3em]">PROJECTS</span>
        </div>
        
        <div className="space-y-1">
          {projects.map((project, i) => (
            <motion.button
              key={project.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => { setSelectedProject(project.id); setView('project') }}
              className="group w-full grid grid-cols-12 gap-4 p-6 border-b-2 border-black/10 hover:border-red-600 hover:bg-red-600 text-left transition-all"
            >
              <span className="col-span-1 text-4xl font-black text-gray-300 group-hover:text-white/50">{String(i + 1).padStart(2, '0')}</span>
              <div className="col-span-4">
                <h3 className="text-2xl font-black group-hover:text-white">{project.name}</h3>
              </div>
              <div className="col-span-5">
                <p className="text-gray-500 group-hover:text-white/70">{project.tagline}</p>
              </div>
              <div className="col-span-2 text-right">
                <span className="text-xl group-hover:text-white transition-transform inline-block group-hover:translate-x-2">→</span>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Blog Preview */}
      <section className="grid grid-cols-12">
        {/* Blog List */}
        <div className="col-span-12 md:col-span-8 p-12 bg-gray-100">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <div className="w-16 h-1 bg-red-600" />
              <span className="text-sm tracking-[0.3em]">BLOG</span>
            </div>
            <button onClick={() => setView('blog')} className="text-red-600 hover:underline text-sm">
              View all →
            </button>
          </div>
          
          <div className="space-y-6">
            {blogPosts.slice(0, 2).map((post, i) => (
              <motion.button
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => { setSelectedPost(post.id); setView('blog-post') }}
                className="group w-full text-left p-6 bg-white hover:bg-black hover:text-white transition-all"
              >
                <span className="text-xs text-gray-500 group-hover:text-gray-400">{post.date}</span>
                <h3 className="text-xl font-bold mt-2">{post.title}</h3>
                <p className="text-gray-500 group-hover:text-gray-400 mt-2">{post.excerpt}</p>
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Stats Panel */}
        <div className="col-span-12 md:col-span-4 bg-black text-white p-12 flex flex-col justify-center">
          <div className="space-y-12">
            <div>
              <span className="text-6xl font-black text-red-600">{projects.length}</span>
              <p className="text-sm text-gray-500 mt-2">PROJECTS</p>
            </div>
            <div>
              <span className="text-6xl font-black text-red-600">{blogPosts.length}</span>
              <p className="text-sm text-gray-500 mt-2">BLOG POSTS</p>
            </div>
            <div>
              <span className="text-6xl font-black text-red-600">∞</span>
              <p className="text-sm text-gray-500 mt-2">IDEAS</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-12 flex justify-between items-center text-sm border-t-2 border-black">
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
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6 bg-white/90 backdrop-blur">
        <button onClick={() => setView('home')} className="text-5xl font-black hover:text-red-600">SD</button>
        <button onClick={() => setView('home')} className="text-sm text-gray-500 hover:text-black">← Back</button>
      </nav>

      <div className="pt-24 grid grid-cols-12">
        {/* Project Number */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="col-span-12 md:col-span-3 bg-red-600 text-white p-12 flex items-center justify-center"
        >
          <span className="text-[200px] font-black opacity-50">{String(idx + 1).padStart(2, '0')}</span>
        </motion.div>
        
        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="col-span-12 md:col-span-9 p-12"
        >
          <h1 className="text-6xl md:text-7xl font-black mb-4">{project.name}</h1>
          <p className="text-xl text-gray-600 mb-8">{project.tagline}</p>
          
          {/* Mock screenshot */}
          <div className="aspect-video bg-gray-100 border-2 border-black mb-12 flex items-center justify-center">
            <span className="text-gray-400">[ Project Screenshot ]</span>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
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
          
          <div className="prose max-w-none">
            <h2 className="text-2xl font-black mb-4">About</h2>
            <p className="text-gray-600 leading-relaxed mb-8">{project.description}</p>
            
            <h2 className="text-2xl font-black mb-4">Features</h2>
            <ul className="space-y-3">
              {project.features.map(f => (
                <li key={f} className="flex items-center gap-4">
                  <div className="w-4 h-1 bg-red-600" />
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
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6 bg-white/90 backdrop-blur">
        <button onClick={() => setView('home')} className="text-5xl font-black hover:text-red-600">SD</button>
        <button onClick={() => setView('home')} className="text-sm text-gray-500 hover:text-black">← Home</button>
      </nav>

      <div className="pt-24 p-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-4 mb-16">
            <div className="w-16 h-1 bg-red-600" />
            <h1 className="text-5xl font-black">BLOG</h1>
          </div>
          
          <div className="max-w-3xl space-y-6">
            {blogPosts.map((post, i) => (
              <motion.button
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => { setSelectedPost(post.id); setView('blog-post') }}
                className="group w-full text-left p-8 border-2 border-black hover:bg-black hover:text-white transition-all"
              >
                <span className="text-xs text-gray-500 group-hover:text-gray-400">{post.date}</span>
                <h2 className="text-2xl font-black mt-2">{post.title}</h2>
                <p className="text-gray-500 group-hover:text-gray-400 mt-3">{post.excerpt}</p>
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
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6 bg-white/90 backdrop-blur">
        <button onClick={() => setView('home')} className="text-5xl font-black hover:text-red-600">SD</button>
        <button onClick={() => setView('blog')} className="text-sm text-gray-500 hover:text-black">← Blog</button>
      </nav>

      <div className="pt-24 grid grid-cols-12">
        {/* Date sidebar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="col-span-12 md:col-span-3 bg-red-600 text-white p-12"
        >
          <span className="text-sm tracking-widest opacity-70">PUBLISHED</span>
          <p className="text-3xl font-black mt-4">{post.date}</p>
        </motion.div>
        
        {/* Content */}
        <motion.article 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="col-span-12 md:col-span-9 p-12"
        >
          <h1 className="text-4xl md:text-5xl font-black mb-6">{post.title}</h1>
          
          <div className="flex gap-2 mb-8">
            {post.tags.map(tag => (
              <span key={tag} className="text-xs px-2 py-1 bg-black text-white">#{tag}</span>
            ))}
          </div>
          
          <div className="prose max-w-none">
            {post.content.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-gray-700 leading-relaxed mb-6 text-lg">{paragraph}</p>
            ))}
          </div>
        </motion.article>
      </div>
    </div>
  )
}

export default function Design18() {
  const [view, setView] = useState<View>('home')
  const [selectedProject, setSelectedProject] = useState('gosh')
  const [selectedPost, setSelectedPost] = useState('v2-rebuild')

  return (
    <div className="min-h-screen bg-white text-black font-mono selection:bg-red-600 selection:text-white">
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
