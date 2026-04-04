import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Design 15: THE MASTERPIECE
// The ultimate fusion - terminal brutalism meets constructivist geometry meets punk energy
// Dark, warm, bold, raw, beautiful

const projects = [
  { name: 'GoSH', desc: 'Shell implementation', tech: 'Go', num: '01' },
  { name: 'Moji', desc: 'Productivity suite', tech: 'Python/Flask', num: '02' },
  { name: 'LoreKeeper', desc: 'RPG platform', tech: 'Full Stack', num: '03' },
  { name: 'Midnight Moon', desc: 'Theme collection', tech: 'Design', num: '04' },
]

const skills = ['Python', 'Go', 'Java', 'JavaScript', 'TypeScript', 'C', 'Flask', 'React']

function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const handler = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])
  
  return pos
}

function MasterBackground() {
  const mousePos = useMousePosition()
  const gradientX = (mousePos.x / window.innerWidth) * 100
  const gradientY = (mousePos.y / window.innerHeight) * 100

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Base dark */}
      <div className="absolute inset-0 bg-neutral-950" />
      
      {/* Interactive gradient orb */}
      <div 
        className="absolute w-[800px] h-[800px] rounded-full opacity-30 blur-3xl transition-all duration-1000"
        style={{
          background: 'radial-gradient(circle, rgba(239,68,68,0.3) 0%, transparent 70%)',
          left: `calc(${gradientX}% - 400px)`,
          top: `calc(${gradientY}% - 400px)`,
        }}
      />
      
      {/* Grid lines */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />
      
      {/* Noise texture */}
      <div 
        className="absolute inset-0 opacity-30 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }}
      />
      
      {/* Accent line */}
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-red-500 via-red-500/50 to-transparent" />
    </div>
  )
}

function GlitchReveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [glitch, setGlitch] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      onViewportEnter={() => {
        setGlitch(true)
        setTimeout(() => setGlitch(false), 300)
      }}
      className={`relative ${className}`}
    >
      {glitch && (
        <>
          <span className="absolute inset-0 text-red-500 translate-x-[2px] opacity-70">{children}</span>
          <span className="absolute inset-0 text-cyan-500 -translate-x-[2px] opacity-70">{children}</span>
        </>
      )}
      {children}
    </motion.div>
  )
}

function SkillBar({ name, index }: { name: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group flex items-center gap-4 py-3 border-b border-neutral-800/50 hover:border-red-500/50 transition-colors cursor-default"
    >
      <span className="text-neutral-600 text-xs w-8">{String(index + 1).padStart(2, '0')}</span>
      <span className="text-lg font-bold text-neutral-300 group-hover:text-white transition-colors flex-1">
        {name}
      </span>
      <div className="w-32 h-1 bg-neutral-800 relative overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          transition={{ delay: index * 0.1, duration: 0.8 }}
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-500 to-red-600"
        />
      </div>
    </motion.div>
  )
}

export default function Design15() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  
  const heroOpacity = useTransform(smoothScroll, [0, 0.15], [1, 0])
  const heroScale = useTransform(smoothScroll, [0, 0.15], [1, 0.95])
  const heroY = useTransform(smoothScroll, [0, 0.15], [0, -50])

  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen text-white font-mono selection:bg-red-500 selection:text-white">
      <MasterBackground />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-neutral-500 hover:text-white transition-colors text-sm tracking-widest">
            ← EXIT
          </Link>
          <div className="flex items-center gap-6">
            <span className="text-neutral-600 text-xs hidden md:inline">PORTFOLIO.2025</span>
            <span className="text-red-500 text-xs tabular-nums">{time.toLocaleTimeString()}</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <motion.section 
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="min-h-screen flex items-center px-6 md:px-12 sticky top-0"
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-8">
              {/* Status bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-4 mb-8"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-neutral-500 tracking-widest">AVAILABLE FOR WORK</span>
              </motion.div>

              {/* Name */}
              <GlitchReveal>
                <h1 className="text-[14vw] md:text-[10vw] font-black leading-[0.85] tracking-tighter">
                  <span className="block text-white">SINA</span>
                  <span className="block text-red-500">DILEK</span>
                </h1>
              </GlitchReveal>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8 text-lg md:text-xl text-neutral-400 max-w-md leading-relaxed"
              >
                Building small tools and learning systems. 
                CS student who codes for the pure joy of it.
              </motion.p>
            </div>

            <div className="md:col-span-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="space-y-4 text-right"
              >
                <div>
                  <div className="text-xs text-neutral-600 mb-1">INSTITUTION</div>
                  <div className="text-neutral-300">University of Essex</div>
                </div>
                <div>
                  <div className="text-xs text-neutral-600 mb-1">PROGRAM</div>
                  <div className="text-neutral-300">BSc Computer Science</div>
                </div>
                <div>
                  <div className="text-xs text-neutral-600 mb-1">ACHIEVEMENT</div>
                  <div className="text-red-500 font-bold">96/100 — First Class</div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Geometric accent */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-16 h-px bg-gradient-to-r from-red-500 via-red-500/50 to-transparent origin-left"
          />
        </div>
      </motion.section>

      {/* Skills Section */}
      <section className="relative z-10 bg-neutral-950/80 backdrop-blur-sm py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <div className="sticky top-32">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-4 h-4 bg-red-500" />
                  <span className="text-xs text-neutral-500 tracking-widest">01 / CAPABILITIES</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black">
                  TECH
                  <br />
                  <span className="text-neutral-600">STACK</span>
                </h2>
              </div>
            </div>
            
            <div className="md:col-span-8">
              {skills.map((skill, i) => (
                <SkillBar key={skill} name={skill} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="relative z-10 py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <div className="w-4 h-4 bg-red-500" />
            <span className="text-xs text-neutral-500 tracking-widest">02 / SELECTED WORK</span>
          </div>

          <div className="space-y-8">
            {projects.map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 10 }}
                className="group grid md:grid-cols-12 gap-4 py-8 border-b border-neutral-800 hover:border-red-500/50 transition-all cursor-pointer"
              >
                <div className="md:col-span-1 text-neutral-700 text-4xl font-black">
                  {project.num}
                </div>
                <div className="md:col-span-5">
                  <h3 className="text-3xl md:text-4xl font-black text-white group-hover:text-red-500 transition-colors">
                    {project.name}
                  </h3>
                </div>
                <div className="md:col-span-3 text-neutral-500">
                  {project.desc}
                </div>
                <div className="md:col-span-2 text-neutral-600 text-sm">
                  {project.tech}
                </div>
                <div className="md:col-span-1 text-right">
                  <span className="text-neutral-700 group-hover:text-red-500 transition-colors text-2xl">
                    →
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative p-12 md:p-20 border border-neutral-800 bg-neutral-900/50 backdrop-blur"
          >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-red-500" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-red-500" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-red-500" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-red-500" />

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-4 h-4 bg-red-500" />
                  <span className="text-xs text-neutral-500 tracking-widest">03 / CONNECT</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black leading-none">
                  LET'S
                  <br />
                  <span className="text-red-500">BUILD</span>
                </h2>
              </div>
              
              <div className="space-y-4">
                <motion.a
                  href="https://github.com/noxire-dev"
                  target="_blank"
                  rel="noopener"
                  whileHover={{ x: 10 }}
                  className="group flex items-center justify-between p-6 border border-neutral-700 hover:border-red-500 bg-neutral-900/50 transition-all"
                >
                  <div>
                    <div className="text-xs text-neutral-600 mb-1">GITHUB</div>
                    <div className="text-lg text-white group-hover:text-red-500 transition-colors">noxire-dev</div>
                  </div>
                  <span className="text-neutral-600 group-hover:text-red-500 transition-colors">→</span>
                </motion.a>
                
                <motion.a
                  href="https://linkedin.com/in/sina-dilek-0b1b3b1b9"
                  target="_blank"
                  rel="noopener"
                  whileHover={{ x: 10 }}
                  className="group flex items-center justify-between p-6 border border-neutral-700 hover:border-red-500 bg-neutral-900/50 transition-all"
                >
                  <div>
                    <div className="text-xs text-neutral-600 mb-1">LINKEDIN</div>
                    <div className="text-lg text-white group-hover:text-red-500 transition-colors">sina-dilek</div>
                  </div>
                  <span className="text-neutral-600 group-hover:text-red-500 transition-colors">→</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 md:px-12 border-t border-neutral-900">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-neutral-600 text-xs tracking-widest">
          <span>© {new Date().getFullYear()} SINA DILEK</span>
          <span className="text-red-500/50">CRAFTED WITH INTENTION</span>
        </div>
      </footer>
    </div>
  )
}
