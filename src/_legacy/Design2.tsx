import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

// Design 2: DARK EDITORIAL
// Sophisticated typography with a dark, moody palette
// High-fashion magazine aesthetic but in deep blacks and warm accents

const projects = [
  { name: 'GoSH', year: '2025', category: 'Systems', desc: 'A toy shell written in Go for learning purposes' },
  { name: 'Moji', year: '2025', category: 'Productivity', desc: 'Note taking and todo app with focus on UI/UX' },
  { name: 'LoreKeeper', year: '2025', category: 'E-Commerce', desc: 'Platform for free tabletop RPGs' },
  { name: 'Midnight Moon', year: '2024', category: 'Tools', desc: 'VSCode theme collection' },
]

const skills = ['Python', 'Go', 'Java', 'JavaScript', 'TypeScript', 'C', 'Flask', 'React']

export default function Design2() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95])

  return (
    <div ref={containerRef} className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-amber-400 selection:text-neutral-950">
      {/* Subtle grain */}
      <div 
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 px-6 md:px-12 py-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-neutral-500 hover:text-neutral-100 transition-colors text-sm tracking-widest">
            ← RETURN
          </Link>
          <div className="flex items-center gap-8">
            <span className="text-neutral-600 text-sm tracking-widest">MMXXV</span>
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <motion.section 
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="min-h-screen flex items-end px-6 md:px-12 pb-24 relative"
      >
        {/* Large background letter */}
        <div className="absolute top-0 right-0 text-[50vw] leading-none font-editorial text-neutral-900 select-none pointer-events-none opacity-50">
          S
        </div>

        <div className="relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <p className="text-amber-400 text-sm tracking-[0.4em] mb-6">
              DEVELOPER / STUDENT / CREATOR
            </p>
            
            <h1 className="text-[15vw] md:text-[12vw] leading-[0.85] font-editorial tracking-tight">
              <span className="block text-neutral-100">Sina</span>
              <span className="block italic text-neutral-400">Dilek</span>
            </h1>

            <div className="mt-12 max-w-xl">
              <p className="text-xl md:text-2xl text-neutral-400 font-editorial italic leading-relaxed">
                "Building small tools and learning systems — 
                one line of code at a time."
              </p>
            </div>

            <div className="mt-12 flex items-center gap-6">
              <span className="text-sm tracking-widest text-neutral-500">
                UNIVERSITY OF ESSEX
              </span>
              <div className="w-8 h-px bg-neutral-700" />
              <span className="text-sm tracking-widest text-amber-400">
                FIRST CLASS — 96/100
              </span>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-neutral-600 text-xs tracking-widest"
          >
            SCROLL
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Horizontal line */}
      <div className="relative">
        <div className="h-px bg-neutral-800" />
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-neutral-950 px-6">
          <div className="w-3 h-3 border border-amber-400 rotate-45" />
        </div>
      </div>

      {/* About */}
      <section className="px-6 md:px-12 py-32">
        <div className="max-w-6xl mx-auto grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-2">
            <span className="text-xs tracking-[0.3em] text-neutral-600">01</span>
          </div>
          
          <div className="col-span-12 md:col-span-5">
            <h2 className="text-5xl md:text-6xl font-editorial mb-8">
              About <span className="italic text-neutral-500">me</span>
            </h2>
          </div>
          
          <div className="col-span-12 md:col-span-5">
            <p className="text-neutral-400 text-lg leading-relaxed mb-6">
              Currently pursuing a BSc in Computer Science at the University of Essex. 
              My journey started with Python and has since expanded to Go, Java, 
              JavaScript, and recently C.
            </p>
            <p className="text-neutral-500 leading-relaxed">
              Always seeking to understand systems at a deeper level. Building tools 
              that solve real problems with clean, purposeful code.
            </p>
            
            <div className="mt-8 pt-8 border-t border-neutral-800">
              <span className="text-amber-400 text-sm tracking-widest">
                OPEN TO OPPORTUNITIES
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="px-6 md:px-12 py-32 bg-neutral-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-12 gap-8 mb-16">
            <div className="col-span-12 md:col-span-2">
              <span className="text-xs tracking-[0.3em] text-neutral-600">02</span>
            </div>
            <div className="col-span-12 md:col-span-10">
              <h2 className="text-5xl md:text-6xl font-editorial">
                Expertise
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
            {skills.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="text-4xl md:text-6xl font-editorial text-neutral-700 hover:text-neutral-100 hover:italic transition-all cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="px-6 md:px-12 py-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-12 gap-8 mb-16">
            <div className="col-span-12 md:col-span-2">
              <span className="text-xs tracking-[0.3em] text-neutral-600">03</span>
            </div>
            <div className="col-span-12 md:col-span-10">
              <h2 className="text-5xl md:text-6xl font-editorial">
                Selected <span className="italic text-neutral-500">work</span>
              </h2>
            </div>
          </div>

          <div className="space-y-0">
            {projects.map((project, i) => (
              <motion.article
                key={project.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="group grid grid-cols-12 gap-4 py-8 border-t border-neutral-800 hover:bg-neutral-900/50 transition-colors cursor-pointer"
              >
                <div className="col-span-1">
                  <span className="text-xs text-neutral-700">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="col-span-11 md:col-span-4">
                  <h3 className="text-3xl md:text-4xl font-editorial group-hover:italic group-hover:text-amber-400 transition-all">
                    {project.name}
                  </h3>
                </div>
                <div className="col-span-6 md:col-span-2 text-neutral-600 text-sm">
                  {project.category}
                </div>
                <div className="col-span-6 md:col-span-3 text-neutral-500 text-sm">
                  {project.desc}
                </div>
                <div className="hidden md:block col-span-2 text-right text-neutral-600 text-sm">
                  {project.year}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="px-6 md:px-12 py-32 border-t border-neutral-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-2">
              <span className="text-xs tracking-[0.3em] text-neutral-600">04</span>
            </div>
            
            <div className="col-span-12 md:col-span-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-6xl md:text-8xl font-editorial leading-tight mb-16"
              >
                Let's create
                <br />
                <span className="italic text-neutral-500">something meaningful</span>
              </motion.h2>

              <div className="flex flex-col md:flex-row gap-12">
                <a 
                  href="https://github.com/noxire-dev" 
                  target="_blank" 
                  rel="noopener"
                  className="group flex items-center gap-6"
                >
                  <span className="w-12 h-px bg-neutral-700 group-hover:w-20 group-hover:bg-amber-400 transition-all" />
                  <span className="text-xl text-neutral-400 group-hover:text-neutral-100 transition-colors">
                    GitHub
                  </span>
                </a>
                <a 
                  href="https://linkedin.com/in/sina-dilek-0b1b3b1b9" 
                  target="_blank" 
                  rel="noopener"
                  className="group flex items-center gap-6"
                >
                  <span className="w-12 h-px bg-neutral-700 group-hover:w-20 group-hover:bg-amber-400 transition-all" />
                  <span className="text-xl text-neutral-400 group-hover:text-neutral-100 transition-colors">
                    LinkedIn
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-8 border-t border-neutral-900">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-neutral-600 tracking-widest">
          <p>© {new Date().getFullYear()} SINA DILEK</p>
          <p>CRAFTED WITH CARE</p>
        </div>
      </footer>
    </div>
  )
}
