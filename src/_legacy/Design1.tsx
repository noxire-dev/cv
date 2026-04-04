import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Design 1: MUTED BRUTALIST
// Heavy brutalist design with earthy, muted color palette
// Raw concrete textures, harsh typography, but with olive, rust, sand, charcoal

const projects = [
  { name: 'GoSH', status: 'ACTIVE', tech: ['Go'], desc: 'Toy shell written in Go for learning' },
  { name: 'Moji', status: 'ACTIVE', tech: ['Python', 'Flask', 'JS'], desc: 'Note taking & todo app' },
  { name: 'LoreKeeper', status: 'ACTIVE', tech: ['Python', 'JS'], desc: 'E-Commerce for Tabletop RPGs' },
  { name: 'Midnight Moon', status: 'ACTIVE', tech: ['JSON'], desc: 'VSCode theme collection' },
]

const skills = ['Python', 'Go', 'Java', 'JavaScript', 'TypeScript', 'C', 'Flask', 'React']

function ConcreteTexture() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Base color */}
      <div className="absolute inset-0 bg-stone-200" />
      
      {/* Noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }}
      />
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-100/50 via-transparent to-stone-300/30" />
    </div>
  )
}

function BlockQuote({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative pl-6 border-l-4 border-stone-800">
      <span className="absolute -left-3 -top-2 text-6xl text-stone-400 font-serif">"</span>
      {children}
    </div>
  )
}

export default function Design1() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen text-stone-800 font-mono selection:bg-stone-800 selection:text-stone-100">
      <ConcreteTexture />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-stone-800 text-stone-100">
        <div className="flex items-center justify-between px-4 md:px-8 py-4">
          <Link to="/" className="hover:text-amber-200 transition-colors tracking-widest text-sm">
            ← BACK
          </Link>
          <div className="text-xs tracking-widest opacity-60 tabular-nums">
            {time.toLocaleTimeString()}
          </div>
        </div>
      </header>

      <main className="relative z-10 pt-20">
        {/* Hero */}
        <section className="min-h-[90vh] flex flex-col justify-end px-4 md:px-8 pb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="max-w-6xl"
          >
            {/* Overline */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 max-w-[100px] bg-stone-400" />
              <span className="text-xs tracking-[0.3em] text-stone-500">PORTFOLIO 2025</span>
            </div>

            {/* Name */}
            <h1 className="text-[12vw] md:text-[10vw] leading-[0.85] font-black tracking-tighter text-stone-900">
              SINA
              <br />
              DILEK
            </h1>

            {/* Tagline */}
            <div className="mt-12 max-w-xl">
              <BlockQuote>
                <p className="text-xl md:text-2xl text-stone-600 leading-relaxed">
                  Building small tools and learning systems. 
                  CS student who codes for the joy of it.
                </p>
              </BlockQuote>
            </div>

            {/* Tags */}
            <div className="mt-12 flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-olive-700 text-stone-100 text-sm tracking-wide" style={{ backgroundColor: '#4a5043' }}>
                UNIVERSITY OF ESSEX
              </span>
              <span className="px-4 py-2 bg-stone-800 text-stone-100 text-sm tracking-wide">
                BSC COMPUTER SCIENCE
              </span>
              <span className="px-4 py-2 text-sm tracking-wide" style={{ backgroundColor: '#8b5a2b', color: '#faf3eb' }}>
                OPEN TO OPPORTUNITIES
              </span>
            </div>
          </motion.div>
        </section>

        {/* Divider */}
        <div className="h-px bg-stone-400 mx-4 md:mx-8" />

        {/* Skills Section */}
        <section className="px-4 md:px-8 py-24">
          <div className="max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="grid grid-cols-12 gap-8"
            >
              <div className="col-span-12 md:col-span-3">
                <h2 className="text-xs tracking-[0.3em] text-stone-500 mb-4">CAPABILITIES</h2>
                <div className="w-12 h-1 bg-stone-800" />
              </div>
              
              <div className="col-span-12 md:col-span-9">
                <div className="flex flex-wrap gap-4">
                  {skills.map((skill, i) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="group"
                    >
                      <span className="block text-3xl md:text-5xl font-black text-stone-300 group-hover:text-stone-800 transition-colors cursor-default">
                        {skill}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Divider */}
        <div className="h-px bg-stone-400 mx-4 md:mx-8" />

        {/* Projects */}
        <section className="px-4 md:px-8 py-24">
          <div className="max-w-6xl">
            <div className="grid grid-cols-12 gap-8 mb-16">
              <div className="col-span-12 md:col-span-3">
                <h2 className="text-xs tracking-[0.3em] text-stone-500 mb-4">SELECTED WORK</h2>
                <div className="w-12 h-1 bg-stone-800" />
              </div>
            </div>

            <div className="space-y-0">
              {projects.map((project, i) => (
                <motion.article
                  key={project.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group grid grid-cols-12 gap-4 py-8 border-b border-stone-300 hover:bg-stone-300/50 transition-colors cursor-pointer -mx-4 px-4"
                >
                  <div className="col-span-1 text-stone-400 text-sm">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="col-span-11 md:col-span-4">
                    <h3 className="text-2xl md:text-3xl font-black group-hover:translate-x-2 transition-transform">
                      {project.name}
                    </h3>
                  </div>
                  <div className="col-span-12 md:col-span-4 md:col-start-6">
                    <p className="text-stone-500">{project.desc}</p>
                  </div>
                  <div className="col-span-12 md:col-span-3 flex flex-wrap gap-2">
                    {project.tech.map(t => (
                      <span 
                        key={t} 
                        className="text-xs px-2 py-1 bg-stone-300 text-stone-600"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Block */}
        <section className="bg-stone-800 text-stone-100">
          <div className="px-4 md:px-8 py-24">
            <div className="max-w-6xl">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="grid grid-cols-12 gap-8"
              >
                <div className="col-span-12 md:col-span-6">
                  <h2 className="text-4xl md:text-6xl font-black leading-tight mb-8">
                    LET'S BUILD
                    <br />
                    <span className="text-stone-500">SOMETHING.</span>
                  </h2>
                </div>
                
                <div className="col-span-12 md:col-span-6 md:flex md:flex-col md:justify-end">
                  <div className="space-y-4">
                    <a 
                      href="https://github.com/noxire-dev"
                      target="_blank"
                      rel="noopener"
                      className="group flex items-center justify-between py-4 border-b border-stone-600 hover:border-stone-400 transition-colors"
                    >
                      <span className="text-xl">GitHub</span>
                      <span className="group-hover:translate-x-2 transition-transform">→</span>
                    </a>
                    <a 
                      href="https://linkedin.com/in/sina-dilek-0b1b3b1b9"
                      target="_blank"
                      rel="noopener"
                      className="group flex items-center justify-between py-4 border-b border-stone-600 hover:border-stone-400 transition-colors"
                    >
                      <span className="text-xl">LinkedIn</span>
                      <span className="group-hover:translate-x-2 transition-transform">→</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-stone-900 text-stone-500 px-4 md:px-8 py-6">
          <div className="max-w-6xl flex flex-col md:flex-row justify-between items-center text-xs tracking-widest">
            <p>© {new Date().getFullYear()} SINA DILEK</p>
            <p>BUILT WITH CONCRETE AND CODE</p>
          </div>
        </footer>
      </main>
    </div>
  )
}
