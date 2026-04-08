import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

// Design 11: AMBER TERMINAL BRUTALIST
// Fusion of warm terminal aesthetics with muted brutalist design
// Amber/phosphor glow, concrete textures, raw typography, CRT warmth

const projects = [
  { name: 'GoSH', cmd: './gosh --init', desc: 'Shell implementation in Go', status: 'running' },
  { name: 'Moji', cmd: 'moji start', desc: 'Note taking & productivity', status: 'running' },
  { name: 'LoreKeeper', cmd: 'lore serve --port 3000', desc: 'Tabletop RPG platform', status: 'running' },
  { name: 'Midnight Moon', cmd: 'code --install-extension midnight', desc: 'VSCode theme pack', status: 'running' },
]

const skills = ['Python', 'Go', 'Java', 'JavaScript', 'TypeScript', 'C', 'Flask', 'React']

function AmberCRT() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Base - warm dark */}
      <div className="absolute inset-0 bg-stone-950" />
      
      {/* Subtle warm gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-950/20 via-transparent to-orange-950/10" />
      
      {/* Scanlines */}
      <div 
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
        }}
      />
      
      {/* Noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay'
        }}
      />
      
      {/* Vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0,0,0,0.5) 100%)'
        }}
      />
      
      {/* CRT curvature glow */}
      <div 
        className="absolute inset-8 rounded-3xl"
        style={{
          boxShadow: 'inset 0 0 150px rgba(251,191,36,0.03), inset 0 0 50px rgba(251,191,36,0.02)'
        }}
      />
    </div>
  )
}

function TypeWriter({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
  const [displayed, setDisplayed] = useState('')
  
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
      }, 40)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timeout)
  }, [text, delay])

  return <span className={className}>{displayed}<span className="animate-pulse">▌</span></span>
}

function CommandBlock({ prompt, output, delay }: { prompt: string; output: React.ReactNode; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay / 1000, duration: 0.5 }}
      className="mb-6"
    >
      <div className="flex items-center gap-2 text-amber-400/80 mb-2">
        <span className="text-amber-600">❯</span>
        <span className="font-mono">{prompt}</span>
      </div>
      <div className="pl-5 text-stone-400 border-l border-amber-900/30">
        {output}
      </div>
    </motion.div>
  )
}

export default function Design11() {
  const [time, setTime] = useState(new Date())
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.8])

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen text-amber-100 font-mono selection:bg-amber-400 selection:text-stone-950">
      <AmberCRT />

      {/* Header */}
      <motion.header 
        style={{ opacity: headerOpacity }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-amber-900/30 bg-stone-950/80 backdrop-blur-sm"
      >
        <div className="flex items-center justify-between px-6 md:px-12 py-4">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-amber-500 hover:text-amber-400 transition-colors text-sm">
              ← exit
            </Link>
            <div className="hidden md:flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-amber-600/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/60" />
              <span className="w-3 h-3 rounded-full bg-amber-400/40" />
            </div>
          </div>
          <div className="flex items-center gap-6 text-xs text-amber-600">
            <span className="hidden md:inline">sina@portfolio</span>
            <span className="tabular-nums">{time.toLocaleTimeString()}</span>
          </div>
        </div>
      </motion.header>

      <main className="relative z-10 pt-24 px-6 md:px-12 max-w-5xl mx-auto pb-20">
        {/* Hero */}
        <section className="min-h-[80vh] flex flex-col justify-center py-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* ASCII Logo */}
            <pre className="text-amber-500/60 text-[8px] md:text-xs leading-tight mb-12 overflow-hidden">
{`
   _____ _             ____  _ _      _    
  / ____(_)           |  _ \\(_) |    | |   
 | (___  _ _ __   __ _| |_) |_| | ___| | __
  \\___ \\| | '_ \\ / _\` |  _ <| | |/ _ \\ |/ /
  ____) | | | | | (_| | |_) | | |  __/   < 
 |_____/|_|_| |_|\\__,_|____/|_|_|\\___|_|\\_\\
`}
            </pre>

            <CommandBlock 
              prompt="whoami"
              delay={500}
              output={
                <div className="space-y-2">
                  <p className="text-2xl md:text-4xl font-bold text-amber-100">Sina Dilek</p>
                  <p className="text-amber-500/70">Computer Science @ University of Essex</p>
                </div>
              }
            />

            <CommandBlock
              prompt="cat about.txt"
              delay={1500}
              output={
                <p className="text-lg text-stone-300 leading-relaxed max-w-xl">
                  Building small tools and learning systems. First year completed 
                  with 96/100 — First Class Honours. Coding for the joy of it.
                </p>
              }
            />

            <CommandBlock
              prompt="echo $STATUS"
              delay={2500}
              output={
                <div className="flex flex-wrap gap-3 mt-2">
                  <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm">
                    OPEN_TO_OPPORTUNITIES
                  </span>
                  <span className="px-3 py-1 bg-stone-800 border border-stone-700 text-stone-400 text-sm">
                    SEEKING: Internships / Junior Roles
                  </span>
                </div>
              }
            />
          </motion.div>
        </section>

        {/* Skills */}
        <section className="py-20 border-t border-amber-900/20">
          <div className="text-xs text-amber-600 mb-8">❯ ls ./skills/</div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skills.map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(251,191,36,0.1)' }}
                className="p-4 border border-amber-900/30 bg-stone-900/30 cursor-default transition-all"
              >
                <div className="text-amber-400 text-lg font-bold">{skill}</div>
                <div className="text-xs text-amber-600/50 mt-1">installed</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="py-20 border-t border-amber-900/20">
          <div className="text-xs text-amber-600 mb-8">❯ ps aux | grep projects</div>
          
          <div className="space-y-4">
            {projects.map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group p-5 border border-amber-900/20 bg-stone-900/20 hover:border-amber-500/50 hover:bg-amber-500/5 transition-all cursor-pointer"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xl font-bold text-amber-100 group-hover:text-amber-400 transition-colors">
                      {project.name}
                    </span>
                  </div>
                  <code className="text-xs text-amber-600/60 bg-stone-900 px-2 py-1 rounded">
                    {project.cmd}
                  </code>
                  <span className="flex-1 text-stone-400 text-sm md:text-right">
                    {project.desc}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="py-20 border-t border-amber-900/20">
          <div className="text-xs text-amber-600 mb-8">❯ ./connect.sh</div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <motion.a
              href="https://github.com/noxire-dev"
              target="_blank"
              rel="noopener"
              whileHover={{ x: 5 }}
              className="group p-6 border border-amber-900/30 hover:border-amber-500 bg-stone-900/30 hover:bg-amber-500/10 transition-all"
            >
              <div className="text-xs text-amber-600/50 mb-2">github://</div>
              <div className="text-xl text-amber-100 group-hover:text-amber-400 transition-colors">
                noxire-dev <span className="text-amber-600">→</span>
              </div>
            </motion.a>
            
            <motion.a
              href="https://linkedin.com/in/sina-dilek-0b1b3b1b9"
              target="_blank"
              rel="noopener"
              whileHover={{ x: 5 }}
              className="group p-6 border border-amber-900/30 hover:border-amber-500 bg-stone-900/30 hover:bg-amber-500/10 transition-all"
            >
              <div className="text-xs text-amber-600/50 mb-2">linkedin://</div>
              <div className="text-xl text-amber-100 group-hover:text-amber-400 transition-colors">
                sina-dilek <span className="text-amber-600">→</span>
              </div>
            </motion.a>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-amber-900/20 text-center">
          <p className="text-xs text-amber-700">
            /* process completed with exit code 0 */
          </p>
          <p className="text-xs text-amber-900 mt-2">
            © {new Date().getFullYear()} Sina Dilek
          </p>
        </footer>
      </main>
    </div>
  )
}
