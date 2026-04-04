import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

// Design 6: BRUTALIST TERMINAL
// Inspired by the original Flask design - CRT monitor, terminal aesthetic
// JetBrains Mono, command prompts, ASCII art, scanlines, green/amber phosphor

const projects = [
  { name: 'GoSH', status: 'Active', desc: 'Toy shell written in Go for learning', tech: ['Go'] },
  { name: 'Moji', status: 'Active', desc: 'Note taking & todo app with focus on UI/X', tech: ['Python', 'Flask', 'JS'] },
  { name: 'LoreKeeper', status: 'Active', desc: 'E-Commerce Website for Free Tabletop RPGs', tech: ['Python', 'JS'] },
  { name: 'Midnight Moon', status: 'Active', desc: 'VSCode theme collection', tech: ['JSON'] },
  { name: 'UzmanParaScraper', status: 'Active', desc: 'Website Scraper for BIST100', tech: ['Python', 'Flask'] },
]

const updates = [
  { date: '2025-11-19', title: 'A fresh start with V2', content: 'Rebuilding the portfolio with Next.js, React, and Supabase.' },
  { date: '2025-08-28', title: 'Finished first year', content: 'Achieved 96/100 overall and First Class at University of Essex.' },
  { date: '2025-07-15', title: 'Working on Moji', content: 'Building a note taking app with focus on UI/X design.' },
]

const badges = ['Python', 'Go', 'Java', 'JavaScript']

function TypingEffect({ text, delay = 0, speed = 30 }: { text: string; delay?: number; speed?: number }) {
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
      }, speed)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timeout)
  }, [text, delay, speed])

  useEffect(() => {
    const interval = setInterval(() => setShowCursor(s => !s), 530)
    return () => clearInterval(interval)
  }, [])

  return (
    <span>
      {displayed}
      <span className={`${showCursor ? 'opacity-100' : 'opacity-0'}`}>▊</span>
    </span>
  )
}

function TerminalWindow({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="border border-green-500/30 bg-black/80 backdrop-blur">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-green-500/30 bg-green-500/5">
        <div className="flex gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-xs text-green-500/60 ml-4 font-mono">{title}</span>
      </div>
      <div className="p-4 md:p-6">
        {children}
      </div>
    </div>
  )
}

function ScanLines() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <div 
        className="absolute inset-0"
        style={{
          background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 2px)',
          backgroundSize: '100% 2px'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/[0.02] to-transparent animate-scanline" />
    </div>
  )
}

function CRTEffect() {
  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {/* Vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 60%, rgba(0,0,0,0.4) 100%)'
        }}
      />
      {/* Slight curve effect via box shadow */}
      <div 
        className="absolute inset-4 rounded-lg"
        style={{
          boxShadow: 'inset 0 0 100px rgba(0,255,0,0.03)'
        }}
      />
    </div>
  )
}

export default function Design6() {
  const [time, setTime] = useState(new Date())
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-green-400 font-mono selection:bg-green-400 selection:text-black">
      <ScanLines />
      <CRTEffect />
      
      {/* Grid background */}
      <div 
        className="fixed inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,255,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,0,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-30 border-b border-green-500/30 bg-black/90 backdrop-blur">
        <div className="flex items-center justify-between px-4 md:px-8 py-3">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-green-400 hover:text-green-300 text-sm">← EXIT</Link>
            <span className="text-green-500/50 text-xs hidden md:inline">sina.dilek@portfolio:~$</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-green-500/50">PID: 1337</span>
            <span className="text-green-400 tabular-nums">{time.toLocaleTimeString()}</span>
          </div>
        </div>
      </header>

      <main className="relative z-10 pt-20 px-4 md:px-8 pb-20 max-w-6xl mx-auto">
        {/* ASCII Art Header */}
        <section className="py-12">
          <motion.pre 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-green-500 text-[6px] md:text-[10px] leading-none overflow-x-auto"
          >
{`
███████╗██╗███╗   ██╗ █████╗     ██████╗ ██╗██╗     ███████╗██╗  ██╗
██╔════╝██║████╗  ██║██╔══██╗    ██╔══██╗██║██║     ██╔════╝██║ ██╔╝
███████╗██║██╔██╗ ██║███████║    ██║  ██║██║██║     █████╗  █████╔╝ 
╚════██║██║██║╚██╗██║██╔══██║    ██║  ██║██║██║     ██╔══╝  ██╔═██╗ 
███████║██║██║ ╚████║██║  ██║    ██████╔╝██║███████╗███████╗██║  ██╗
╚══════╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝    ╚═════╝ ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝
`}
          </motion.pre>
        </section>

        {/* Hero Terminal */}
        <section className="py-8">
          <TerminalWindow title="about.sh">
            <div className="space-y-4 text-sm md:text-base">
              <div>
                <span className="text-green-500/60">$</span>{' '}
                <TypingEffect text="whoami" delay={500} />
              </div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="pl-4 border-l-2 border-green-500/30"
              >
                <p className="text-green-300">Sina Dilek</p>
                <p className="text-green-500/70">BSc Computer Science @ University of Essex</p>
                <p className="text-green-500/70">Building small tools and learning systems</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="flex flex-wrap gap-2 mt-4"
              >
                <span className="px-2 py-1 bg-green-500/20 border border-green-500/50 text-xs">
                  OPEN TO OPPORTUNITIES
                </span>
                {badges.map((badge, i) => (
                  <motion.span
                    key={badge}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.2 + i * 0.1 }}
                    className="px-2 py-1 bg-green-500/10 border border-green-500/30 text-xs text-green-500/80"
                  >
                    {badge}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </TerminalWindow>
        </section>

        {/* Projects Section */}
        <section className="py-8">
          <h2 className="text-lg mb-6 flex items-center gap-2">
            <span className="text-green-500/60">$</span>
            <span>ls -la ./projects</span>
          </h2>
          
          <div className="space-y-2">
            <div className="text-green-500/50 text-xs mb-4">
              total {projects.length} | drwxr-xr-x
            </div>
            
            {projects.map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col md:flex-row md:items-center gap-2 md:gap-4 p-3 hover:bg-green-500/5 border-l-2 border-transparent hover:border-green-500 transition-all cursor-pointer"
              >
                <span className="text-green-500/50 text-xs shrink-0">drwxr-xr-x</span>
                <span className={`text-xs px-2 py-0.5 shrink-0 ${
                  project.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  [{project.status.toUpperCase()}]
                </span>
                <span className="text-green-300 font-bold">{project.name}</span>
                <span className="text-green-500/60 flex-1">{project.desc}</span>
                <div className="flex gap-2 shrink-0">
                  {project.tech.map(t => (
                    <span key={t} className="text-xs text-cyan-400">{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Updates Section */}
        <section className="py-8">
          <h2 className="text-lg mb-6 flex items-center gap-2">
            <span className="text-green-500/60">$</span>
            <span>cat ./updates.log</span>
          </h2>
          
          <div className="space-y-4">
            {updates.map((update, i) => (
              <motion.div
                key={update.date}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="p-4 border border-green-500/20 bg-green-500/5"
              >
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-green-500/50 text-xs tabular-nums">{update.date}</span>
                  <span className="text-green-300">{update.title}</span>
                </div>
                <p className="text-green-500/70 text-sm pl-4 border-l border-green-500/30">
                  {update.content}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="py-8">
          <h2 className="text-lg mb-6 flex items-center gap-2">
            <span className="text-green-500/60">$</span>
            <span>./connect.sh</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <motion.a
              href="https://github.com/noxire-dev"
              target="_blank"
              rel="noopener"
              whileHover={{ x: 5 }}
              className="group p-4 border border-green-500/30 hover:border-green-400 hover:bg-green-500/10 transition-all"
            >
              <div className="text-green-500/50 text-xs mb-1">// GitHub</div>
              <div className="text-green-300 group-hover:text-green-200">
                github.com/noxire-dev <span className="text-green-500">→</span>
              </div>
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/sina-dilek-0b1b3b1b9"
              target="_blank"
              rel="noopener"
              whileHover={{ x: 5 }}
              className="group p-4 border border-green-500/30 hover:border-green-400 hover:bg-green-500/10 transition-all"
            >
              <div className="text-green-500/50 text-xs mb-1">// LinkedIn</div>
              <div className="text-green-300 group-hover:text-green-200">
                linkedin.com/sina-dilek <span className="text-green-500">→</span>
              </div>
            </motion.a>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 text-center border-t border-green-500/20">
          <p className="text-green-500/50 text-xs">
            /* Built with caffeine and curiosity */
          </p>
          <p className="text-green-500/30 text-xs mt-2">
            © {new Date().getFullYear()} Sina Dilek | Process terminated successfully
          </p>
        </footer>
      </main>
    </div>
  )
}
