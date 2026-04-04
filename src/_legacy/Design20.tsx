import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'

// Design 20: THE FINAL PORTFOLIO
// Ultimate production-ready design combining best elements
// Bold brutalist with excellent readability and complete pages

type View = 'home' | 'project' | 'blog' | 'blog-post'

const projects = [
  { 
    id: 'gosh',
    num: '01',
    name: 'GoSH', 
    tagline: 'A toy shell written in Go',
    description: 'GoSH is a minimalist shell implementation written in Go for learning purposes. It demonstrates core systems programming concepts including process management, I/O redirection, and command parsing. This project was built to understand how shells work under the hood and to practice Go programming.',
    tech: ['Go', 'Systems Programming'],
    year: '2025',
    link: 'https://github.com/noxire-dev/GoSH',
    features: [
      'Full command parsing with pipes and redirects',
      'Process spawning and management',
      'I/O redirection (stdin, stdout, stderr)',
      'Built-in commands (cd, exit, history)'
    ],
    screenshots: ['Main terminal view', 'Command execution', 'Built-in help']
  },
  { 
    id: 'moji',
    num: '02',
    name: 'Moji', 
    tagline: 'Note taking & productivity suite',
    description: 'A note-taking and todo application with a strong focus on UI/UX design. Built with Flask and JavaScript, it offers a clean interface for managing daily tasks and notes with an emphasis on simplicity and productivity.',
    tech: ['Python', 'Flask', 'JavaScript', 'SQLite'],
    year: '2025',
    link: 'https://github.com/noxire-dev/moji',
    features: [
      'Rich text notes with markdown support',
      'Task management with priorities',
      'Tags and categories organization',
      'Dark mode and customizable themes'
    ],
    screenshots: ['Dashboard', 'Note editor', 'Task list']
  },
  { 
    id: 'lorekeeper',
    num: '03',
    name: 'LoreKeeper', 
    tagline: 'E-Commerce for Tabletop RPGs',
    description: 'An e-commerce platform dedicated to free tabletop RPG materials. Users can browse, download, and share game resources with the community. Built to serve the TTRPG community with accessible materials.',
    tech: ['Python', 'PostgreSQL', 'JavaScript'],
    year: '2025',
    link: 'https://github.com/noxire-dev/LoreKeeper',
    features: [
      'User accounts with profiles',
      'Resource library with search',
      'Community ratings and reviews',
      'Built-in PDF viewer'
    ],
    screenshots: ['Home page', 'Resource detail', 'User profile']
  },
  { 
    id: 'midnight',
    num: '04',
    name: 'Midnight Moon', 
    tagline: 'VSCode theme collection',
    description: 'A carefully crafted collection of dark themes for Visual Studio Code. Each theme is designed for long coding sessions with carefully chosen colors to reduce eye strain while maintaining excellent readability.',
    tech: ['Design', 'JSON'],
    year: '2024',
    link: 'https://github.com/noxire-dev/midnight-theme',
    features: [
      'Multiple theme variants',
      'Semantic token highlighting',
      'Integrated terminal colors',
      'Full UI theming'
    ],
    screenshots: ['Theme preview', 'Color palette', 'Terminal colors']
  },
]

const blogPosts = [
  {
    id: 'v2-rebuild',
    title: 'A Fresh Start with V2',
    date: '2025-11-19',
    readTime: '3 min read',
    excerpt: 'Rebuilding my portfolio with modern tools and a fresh perspective on web development.',
    content: `When I first started this project 3 years ago, I used Flask and some weird design choices. Knowing only Python at the time, Flask felt magical.

I've since learned a lot and I think it's time to give it a fresh start. I want to add more complex features like blog post capabilities.

I will be using React, TypeScript, and Tailwind CSS. It will be a great learning experience and hopefully make my website even better!

The new stack allows for much faster iteration and a more modern development workflow. With hot module replacement and type safety, I can move faster while catching errors early.

I'm particularly excited about implementing the blog functionality. Being able to share my thoughts and learnings with others is something I've wanted to do for a long time.`,
    tags: ['development', 'portfolio', 'react']
  },
  {
    id: 'first-year',
    title: 'Finished My First Year at University',
    date: '2025-08-28',
    readTime: '4 min read',
    excerpt: 'Reflecting on achieving 96/100 and First Class Honours at the University of Essex.',
    content: `I finished my first year at the University of Essex and couldn't be happier with the results — I achieved 96/100 overall and a First Class.

I'm proud of the work I put in, and grateful for the support and guidance I had along the way. Really excited to carry this momentum into my second year!

The coursework covered everything from algorithms to software engineering principles. Each module pushed me to think differently about problem-solving.

Some highlights from the year:
- Learned proper version control with Git
- Built my first full-stack application
- Collaborated on group projects with diverse teams
- Discovered my interest in systems programming

Looking forward to what year two brings. Planning to dive deeper into low-level programming and maybe contribute to some open source projects.`,
    tags: ['university', 'achievement', 'computer-science']
  },
  {
    id: 'learning-c',
    title: 'Started Learning C',
    date: '2025-02-23',
    readTime: '3 min read',
    excerpt: 'Diving into low-level programming to understand systems better.',
    content: `I wanted to dive into low-level programming so I started learning C not to be good at it but understand how C++, C# and Rust works.

It's hair pulling to implement the functions I am so used to using in high level languages but it's also a lot of fun.

I'm loving the simplicity and syntax of C. There's something satisfying about managing memory manually and understanding exactly what's happening at each step.

The biggest challenges so far:
- Pointer arithmetic (still wrapping my head around it)
- Manual memory management
- No built-in string type
- Debugging segmentation faults

Despite the challenges, I feel like I'm gaining a much deeper understanding of how computers actually work. This knowledge will definitely help me write better code in any language.`,
    tags: ['learning', 'C', 'low-level']
  },
]

function Navigation({ currentView, setView }: { currentView: View; setView: (v: View) => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b-2 border-black">
      <div className="max-w-6xl mx-auto px-8 py-5 flex items-center justify-between">
        <button onClick={() => setView('home')} className="font-black text-2xl tracking-tight hover:text-red-600 transition-colors">
          SD<span className="text-red-600">.</span>
        </button>
        <div className="flex items-center gap-8">
          <button 
            onClick={() => setView('home')}
            className={`text-sm font-medium tracking-wide transition-colors ${currentView === 'home' ? 'text-red-600' : 'text-gray-600 hover:text-black'}`}
          >
            Work
          </button>
          <button 
            onClick={() => setView('blog')}
            className={`text-sm font-medium tracking-wide transition-colors ${currentView === 'blog' || currentView === 'blog-post' ? 'text-red-600' : 'text-gray-600 hover:text-black'}`}
          >
            Blog
          </button>
          <a href="https://github.com/noxire-dev" target="_blank" rel="noopener" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
            GitHub
          </a>
          <Link to="/" className="px-4 py-2 bg-black text-white text-sm font-medium hover:bg-red-600 transition-colors">
            Exit
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
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        style={{ opacity: heroOpacity, y: heroY }}
        className="min-h-[85vh] flex items-center px-8"
      >
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-red-600" />
              <span className="text-sm font-medium text-gray-500 tracking-wide">DEVELOPER & STUDENT</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight max-w-4xl">
              Hi, I'm
              <span className="block text-red-600">Sina Dilek</span>
            </h1>
            
            <p className="mt-8 text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
              I build thoughtful tools and learn systems programming. Computer Science student at the University of Essex, where I achieved <span className="font-semibold text-black">96/100</span> and First Class Honours.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-10">
              <a 
                href="https://github.com/noxire-dev" 
                target="_blank" 
                rel="noopener" 
                className="px-6 py-3 bg-black text-white font-bold hover:bg-red-600 transition-colors"
              >
                View GitHub →
              </a>
              <a 
                href="https://linkedin.com/in/sina-dilek-0b1b3b1b9" 
                target="_blank" 
                rel="noopener" 
                className="px-6 py-3 border-2 border-black font-bold hover:bg-black hover:text-white transition-colors"
              >
                Connect on LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <section className="py-24 px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-3 h-3 bg-red-600" />
            <span className="text-sm font-medium text-gray-500 tracking-wide">SELECTED WORK</span>
          </div>
          
          <div className="grid gap-6">
            {projects.map((project, i) => (
              <motion.button
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => { setSelectedProject(project.id); setView('project') }}
                className="group w-full bg-white p-8 md:p-10 border-2 border-black hover:border-red-600 text-left transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-6">
                    <span className="text-4xl md:text-5xl font-black text-gray-200 group-hover:text-red-600 transition-colors">
                      {project.num}
                    </span>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-black group-hover:text-red-600 transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-gray-600 mt-2">{project.tagline}</p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.tech.map(t => (
                          <span key={t} className="text-xs px-3 py-1 bg-gray-100 group-hover:bg-red-100 text-gray-600 group-hover:text-red-600 transition-colors">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 md:flex-shrink-0">
                    <span className="text-sm text-gray-400">{project.year}</span>
                    <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-red-600" />
              <span className="text-sm font-medium text-gray-500 tracking-wide">RECENT WRITING</span>
            </div>
            <button onClick={() => setView('blog')} className="text-red-600 font-medium hover:underline">
              View all posts →
            </button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <motion.button
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => { setSelectedPost(post.id); setView('blog-post') }}
                className="group text-left p-6 border-2 border-black hover:bg-black hover:text-white transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs text-gray-500 group-hover:text-gray-400">{post.date}</span>
                  <span className="text-xs text-gray-400 group-hover:text-gray-500">•</span>
                  <span className="text-xs text-gray-400 group-hover:text-gray-500">{post.readTime}</span>
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-white">{post.title}</h3>
                <p className="text-sm text-gray-600 group-hover:text-gray-300">{post.excerpt}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 px-8 bg-red-600 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6">Let's Build Something Together</h2>
            <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="https://github.com/noxire-dev" 
                target="_blank" 
                rel="noopener" 
                className="px-8 py-4 bg-white text-red-600 font-bold hover:bg-black hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a 
                href="https://linkedin.com/in/sina-dilek-0b1b3b1b9" 
                target="_blank" 
                rel="noopener" 
                className="px-8 py-4 bg-black text-white font-bold hover:bg-white hover:text-black transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

function ProjectPage({ projectId, setView }: { projectId: string; setView: (v: View) => void }) {
  const project = projects.find(p => p.id === projectId) || projects[0]
  
  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-8 py-12">
        <button onClick={() => setView('home')} className="text-sm text-gray-500 hover:text-black mb-12 flex items-center gap-2">
          ← Back to projects
        </button>
        
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header */}
          <div className="flex items-start gap-6 mb-8">
            <span className="text-6xl md:text-7xl font-black text-red-600">{project.num}</span>
            <div>
              <h1 className="text-4xl md:text-5xl font-black">{project.name}</h1>
              <p className="text-xl text-gray-600 mt-2">{project.tagline}</p>
            </div>
          </div>
          
          {/* Meta */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y-2 border-black mb-12">
            <div>
              <span className="text-xs text-gray-500 block mb-1">YEAR</span>
              <span className="font-bold">{project.year}</span>
            </div>
            <div>
              <span className="text-xs text-gray-500 block mb-1">STACK</span>
              <span className="font-bold">{project.tech.join(', ')}</span>
            </div>
            <div className="col-span-2">
              <span className="text-xs text-gray-500 block mb-1">LINK</span>
              <a href={project.link} target="_blank" rel="noopener" className="font-bold text-red-600 hover:underline">
                View on GitHub →
              </a>
            </div>
          </div>
          
          {/* Screenshots */}
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            {project.screenshots.map((caption, i) => (
              <div key={i} className="aspect-video bg-gray-100 border-2 border-black flex items-center justify-center">
                <span className="text-gray-400 text-sm">[ {caption} ]</span>
              </div>
            ))}
          </div>
          
          {/* Content */}
          <div className="grid md:grid-cols-5 gap-12">
            <div className="md:col-span-3">
              <h2 className="text-2xl font-black mb-4">About the Project</h2>
              <p className="text-gray-600 leading-relaxed">{project.description}</p>
            </div>
            
            <div className="md:col-span-2">
              <h2 className="text-2xl font-black mb-4">Key Features</h2>
              <ul className="space-y-3">
                {project.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-600 mt-2 flex-shrink-0" />
                    <span className="text-gray-600">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* CTA */}
          <div className="mt-16 p-8 bg-black text-white flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="font-bold text-lg">Interested in this project?</span>
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener" 
              className="px-6 py-3 bg-red-600 font-bold hover:bg-white hover:text-black transition-colors"
            >
              View Source Code →
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function BlogListPage({ setView, setSelectedPost }: { setView: (v: View) => void; setSelectedPost: (id: string) => void }) {
  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-red-600" />
              <span className="text-sm font-medium text-gray-500 tracking-wide">WRITING</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black">Blog</h1>
            <p className="text-gray-600 mt-4 max-w-xl">
              Thoughts on development, learning, and building things. Occasional updates on what I'm working on.
            </p>
          </div>
          
          <div className="space-y-6">
            {blogPosts.map((post, i) => (
              <motion.button
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => { setSelectedPost(post.id); setView('blog-post') }}
                className="group w-full text-left p-8 border-2 border-black hover:border-red-600 hover:bg-red-600 hover:text-white transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm text-gray-500 group-hover:text-white/70">{post.date}</span>
                      <span className="text-gray-400 group-hover:text-white/50">•</span>
                      <span className="text-sm text-gray-400 group-hover:text-white/50">{post.readTime}</span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold">{post.title}</h2>
                    <p className="text-gray-600 group-hover:text-white/80 mt-2">{post.excerpt}</p>
                    <div className="flex gap-2 mt-4">
                      {post.tags.map(tag => (
                        <span key={tag} className="text-xs px-2 py-1 bg-gray-100 group-hover:bg-white/20 text-gray-600 group-hover:text-white">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-2xl group-hover:translate-x-2 transition-transform flex-shrink-0">→</span>
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
      <div className="max-w-3xl mx-auto px-8 py-12">
        <button onClick={() => setView('blog')} className="text-sm text-gray-500 hover:text-black mb-12 flex items-center gap-2">
          ← Back to blog
        </button>
        
        <motion.article initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm text-gray-500">{post.date}</span>
              <span className="text-gray-400">•</span>
              <span className="text-sm text-gray-400">{post.readTime}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black mb-6">{post.title}</h1>
            <div className="flex gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="text-sm px-3 py-1 bg-red-600 text-white">#{tag}</span>
              ))}
            </div>
          </header>
          
          <div className="prose prose-lg max-w-none">
            {post.content.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-gray-700 leading-relaxed mb-6">{paragraph}</p>
            ))}
          </div>
          
          {/* Share CTA */}
          <div className="mt-16 pt-8 border-t-2 border-black">
            <p className="text-gray-600 mb-4">Thanks for reading! If you found this helpful, feel free to share it.</p>
            <button onClick={() => setView('blog')} className="text-red-600 font-bold hover:underline">
              ← Read more posts
            </button>
          </div>
        </motion.article>
      </div>
    </div>
  )
}

export default function Design20() {
  const [view, setView] = useState<View>('home')
  const [selectedProject, setSelectedProject] = useState('gosh')
  const [selectedPost, setSelectedPost] = useState('v2-rebuild')

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-red-600 selection:text-white">
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
      
      {/* Footer */}
      <footer className="py-8 px-8 border-t-2 border-black mt-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <span className="text-gray-500">© {new Date().getFullYear()} Sina Dilek. All rights reserved.</span>
          <span className="font-medium">Built with intention <span className="text-red-600">♦</span></span>
        </div>
      </footer>
    </div>
  )
}
