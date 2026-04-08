import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'

// Design 19: MINIMAL BRUTALIST
// Clean, readable, refined system
// Focus on typography and whitespace

type View = 'home' | 'project' | 'blog' | 'blog-post'

const projects = [
  { 
    id: 'gosh',
    name: 'GoSH', 
    tagline: 'A toy shell written in Go',
    description: 'GoSH is a minimalist shell implementation written in Go for learning purposes. It demonstrates core systems programming concepts including process management, I/O redirection, and command parsing. Built as an educational project to understand how shells work under the hood.',
    tech: ['Go', 'Systems Programming'],
    year: '2025',
    link: 'https://github.com/noxire-dev/GoSH',
    features: ['Command parsing', 'Process spawning', 'I/O redirection', 'Built-in commands']
  },
  { 
    id: 'moji',
    name: 'Moji', 
    tagline: 'Note taking & productivity suite',
    description: 'A note-taking and todo application with a strong focus on UI/UX design. Built with Flask and JavaScript, it offers a clean interface for managing daily tasks and notes with an emphasis on simplicity and ease of use.',
    tech: ['Python', 'Flask', 'JavaScript', 'SQLite'],
    year: '2025',
    link: 'https://github.com/noxire-dev/moji',
    features: ['Rich text notes', 'Task management', 'Tags & categories', 'Dark mode']
  },
  { 
    id: 'lorekeeper',
    name: 'LoreKeeper', 
    tagline: 'E-Commerce for Tabletop RPGs',
    description: 'An e-commerce platform dedicated to free tabletop RPG materials. Users can browse, download, and share game resources with the community. Built to serve the TTRPG community with accessible game materials.',
    tech: ['Python', 'PostgreSQL', 'JavaScript'],
    year: '2025',
    link: 'https://github.com/noxire-dev/LoreKeeper',
    features: ['User accounts', 'Resource library', 'Community ratings', 'PDF viewer']
  },
  { 
    id: 'midnight',
    name: 'Midnight Moon', 
    tagline: 'VSCode theme collection',
    description: 'A carefully crafted collection of dark themes for Visual Studio Code. Each theme is designed for long coding sessions with carefully chosen colors to reduce eye strain while maintaining excellent readability.',
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
    excerpt: 'Rebuilding my portfolio with modern tools and a fresh perspective on web development.',
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
    excerpt: 'Reflecting on achieving 96/100 and First Class Honours at Essex.',
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

function Header({ currentView, setView }: { currentView: View; setView: (v: View) => void }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-8 py-6 flex items-center justify-between">
        <button onClick={() => setView('home')} className="font-bold text-lg hover:text-red-600 transition-colors">
          Sina Dilek
        </button>
        <nav className="flex items-center gap-8">
          <button 
            onClick={() => setView('home')}
            className={`text-sm hover:text-red-600 transition-colors ${currentView === 'home' ? 'text-red-600' : 'text-gray-600'}`}
          >
            Work
          </button>
          <button 
            onClick={() => setView('blog')}
            className={`text-sm hover:text-red-600 transition-colors ${currentView === 'blog' || currentView === 'blog-post' ? 'text-red-600' : 'text-gray-600'}`}
          >
            Blog
          </button>
          <Link to="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
            Exit
          </Link>
        </nav>
      </div>
    </header>
  )
}

function HomePage({ setView, setSelectedProject, setSelectedPost }: { 
  setView: (v: View) => void
  setSelectedProject: (id: string) => void
  setSelectedPost: (id: string) => void
}) {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-8">
        {/* Hero */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-24 border-b border-gray-200"
        >
          <p className="text-sm text-red-600 mb-4">Developer & Student</p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 max-w-2xl">
            Building thoughtful tools and learning systems programming.
          </h1>
          <p className="text-gray-600 max-w-xl leading-relaxed">
            Computer Science student at the University of Essex. 
            Achieved First Class Honours with 96/100 in my first year. 
            Passionate about clean code and user-focused design.
          </p>
          <div className="flex gap-4 mt-8">
            <a 
              href="https://github.com/noxire-dev" 
              target="_blank" 
              rel="noopener" 
              className="px-5 py-2.5 bg-black text-white text-sm font-medium hover:bg-red-600 transition-colors"
            >
              GitHub
            </a>
            <a 
              href="https://linkedin.com/in/sina-dilek-0b1b3b1b9" 
              target="_blank" 
              rel="noopener" 
              className="px-5 py-2.5 border border-gray-300 text-sm font-medium hover:border-black transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </motion.section>

        {/* Projects */}
        <section className="py-16">
          <h2 className="text-sm font-medium text-gray-500 mb-8">Selected Work</h2>
          <div className="space-y-1">
            {projects.map((project, i) => (
              <motion.button
                key={project.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => { setSelectedProject(project.id); setView('project') }}
                className="group w-full flex items-center justify-between py-6 border-b border-gray-100 hover:border-red-600 text-left transition-colors"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-semibold group-hover:text-red-600 transition-colors">{project.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">{project.tagline}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-400">{project.year}</span>
                  <span className="text-gray-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all">→</span>
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Blog Preview */}
        <section className="py-16 border-t border-gray-200">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-sm font-medium text-gray-500">Recent Writing</h2>
            <button onClick={() => setView('blog')} className="text-sm text-red-600 hover:underline">
              All posts →
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.slice(0, 2).map((post, i) => (
              <motion.button
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                onClick={() => { setSelectedPost(post.id); setView('blog-post') }}
                className="group text-left p-6 bg-gray-50 hover:bg-red-600 hover:text-white transition-all"
              >
                <span className="text-xs text-gray-500 group-hover:text-white/70">{post.date}</span>
                <h3 className="font-semibold mt-2 group-hover:text-white">{post.title}</h3>
                <p className="text-sm text-gray-600 group-hover:text-white/80 mt-2">{post.excerpt}</p>
              </motion.button>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function ProjectPage({ projectId, setView }: { projectId: string; setView: (v: View) => void }) {
  const project = projects.find(p => p.id === projectId) || projects[0]
  
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-8">
        <button onClick={() => setView('home')} className="text-sm text-gray-500 hover:text-black mb-8">
          ← Back to work
        </button>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="border-b border-gray-200 pb-8 mb-8">
            <p className="text-sm text-red-600 mb-2">{project.year}</p>
            <h1 className="text-4xl font-bold mb-4">{project.name}</h1>
            <p className="text-xl text-gray-600">{project.tagline}</p>
          </div>
          
          {/* Mock screenshot */}
          <div className="aspect-video bg-gray-100 border border-gray-200 mb-12 flex items-center justify-center">
            <span className="text-gray-400">[ Project Screenshot ]</span>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map(t => (
                  <span key={t} className="px-3 py-1 bg-gray-100 text-sm">{t}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3">Link</h3>
              <a href={project.link} target="_blank" rel="noopener" className="text-red-600 hover:underline">
                View on GitHub →
              </a>
            </div>
          </div>
          
          <div className="max-w-2xl">
            <h2 className="text-xl font-semibold mb-4">About this project</h2>
            <p className="text-gray-600 leading-relaxed mb-8">{project.description}</p>
            
            <h2 className="text-xl font-semibold mb-4">Key features</h2>
            <ul className="space-y-3">
              {project.features.map(f => (
                <li key={f} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-red-600 mt-2 flex-shrink-0" />
                  <span className="text-gray-600">{f}</span>
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
    <div className="pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-gray-600 mb-12">Thoughts on development, learning, and building things.</p>
          
          <div className="space-y-4">
            {blogPosts.map((post, i) => (
              <motion.button
                key={post.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => { setSelectedPost(post.id); setView('blog-post') }}
                className="group w-full flex items-start justify-between py-6 border-b border-gray-100 hover:border-red-600 text-left transition-colors"
              >
                <div className="flex-1 max-w-xl">
                  <h2 className="text-lg font-semibold group-hover:text-red-600 transition-colors">{post.title}</h2>
                  <p className="text-gray-500 text-sm mt-2">{post.excerpt}</p>
                  <div className="flex gap-2 mt-3">
                    {post.tags.map(tag => (
                      <span key={tag} className="text-xs text-gray-400">#{tag}</span>
                    ))}
                  </div>
                </div>
                <span className="text-sm text-gray-400 flex-shrink-0 ml-8">{post.date}</span>
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
    <div className="pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-8">
        <button onClick={() => setView('blog')} className="text-sm text-gray-500 hover:text-black mb-8">
          ← Back to blog
        </button>
        
        <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <header className="mb-12 pb-8 border-b border-gray-200">
            <time className="text-sm text-gray-500">{post.date}</time>
            <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">{post.title}</h1>
            <div className="flex gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="text-xs px-2 py-1 bg-red-600 text-white">#{tag}</span>
              ))}
            </div>
          </header>
          
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

export default function Design19() {
  const [view, setView] = useState<View>('home')
  const [selectedProject, setSelectedProject] = useState('gosh')
  const [selectedPost, setSelectedPost] = useState('v2-rebuild')

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-red-600 selection:text-white">
      <Header currentView={view} setView={setView} />
      
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
      <footer className="border-t border-gray-200 py-8">
        <div className="max-w-5xl mx-auto px-8 flex justify-between items-center text-sm text-gray-500">
          <span>© {new Date().getFullYear()} Sina Dilek</span>
          <span>Built with intention</span>
        </div>
      </footer>
    </div>
  )
}
