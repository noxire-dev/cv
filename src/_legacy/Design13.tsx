import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Design 13: DARK PUNK COLLAGE
// Punk zine chaos meets glitch noir darkness
// Cut-and-paste aesthetic on dark canvas, corrupted elements, rebellious energy

const projects = [
  { name: 'GoSH', tag: 'SYS' },
  { name: 'Moji', tag: 'APP' },
  { name: 'LoreKeeper', tag: 'WEB' },
  { name: 'Midnight Moon', tag: 'EXT' },
]

const skills = ['PYTHON', 'GO', 'JAVA', 'JS', 'TS', 'C', 'FLASK', 'REACT']

function GlitchImage({ className }: { className: string }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.9) {
        setOffset({ x: Math.random() * 10 - 5, y: Math.random() * 10 - 5 })
        setTimeout(() => setOffset({ x: 0, y: 0 }), 100)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`relative ${className}`}>
      <div 
        className="absolute inset-0 bg-red-500 mix-blend-multiply"
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      />
      <div 
        className="absolute inset-0 bg-cyan-500 mix-blend-multiply"
        style={{ transform: `translate(${-offset.x}px, ${-offset.y}px)` }}
      />
    </div>
  )
}

function TornPaper({ children, className = '', dark = false }: { children: React.ReactNode; className?: string; dark?: boolean }) {
  const clipPath = `polygon(
    ${Math.random() * 3}% ${Math.random() * 3}%, 
    ${97 + Math.random() * 3}% ${Math.random() * 5}%, 
    ${98 + Math.random() * 2}% ${95 + Math.random() * 5}%, 
    ${Math.random() * 5}% ${97 + Math.random() * 3}%
  )`
  
  return (
    <div 
      className={`${dark ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-black'} ${className}`}
      style={{ clipPath }}
    >
      {children}
    </div>
  )
}

function Sticker({ text, color, x, y, rotate }: { text: string; color: string; x: string; y: string; rotate: number }) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: rotate - 20 }}
      animate={{ scale: 1, rotate }}
      whileHover={{ scale: 1.2, rotate: rotate + 10 }}
      className={`absolute ${x} ${y} ${color} px-3 py-1 text-sm font-black z-30 cursor-default shadow-lg`}
    >
      {text}
    </motion.div>
  )
}

function NoiseLayer() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-50 opacity-[0.05] animate-noise"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
      }}
    />
  )
}

export default function Design13() {
  const [glitchText, setGlitchText] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        setGlitchText(true)
        setTimeout(() => setGlitchText(false), 150)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-neutral-950 text-white overflow-x-hidden selection:bg-red-500 selection:text-white">
      <NoiseLayer />
      
      {/* Scattered stickers */}
      <Sticker text="CODER" color="bg-red-500 text-white" x="left-[5%]" y="top-[15%]" rotate={-15} />
      <Sticker text="2025" color="bg-yellow-400 text-black" x="right-[8%]" y="top-[20%]" rotate={12} />
      <Sticker text="ESSEX" color="bg-cyan-400 text-black" x="left-[10%]" y="top-[50%]" rotate={-8} />
      <Sticker text="96%" color="bg-green-500 text-black" x="right-[15%]" y="top-[60%]" rotate={20} />
      <Sticker text="HIRE ME" color="bg-red-500 text-white" x="left-[20%]" y="top-[75%]" rotate={-5} />

      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <GlitchImage className="absolute top-20 right-20 w-40 h-40 rounded-full opacity-20" />
        <GlitchImage className="absolute bottom-40 left-10 w-60 h-60 opacity-10" />
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
        <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 p-4">
        <TornPaper className="inline-block px-4 py-2">
          <Link to="/" className="text-sm font-bold hover:line-through">← BACK</Link>
        </TornPaper>
      </nav>

      <main className="relative z-10 pt-24 px-4 md:px-8 max-w-6xl mx-auto">
        {/* Hero */}
        <section className="min-h-screen flex items-center justify-center py-20">
          <div className="relative">
            {/* Collage layers */}
            <motion.div
              initial={{ opacity: 0, rotate: -5 }}
              animate={{ opacity: 1, rotate: -3 }}
              className="absolute -top-10 -left-10 z-0"
            >
              <TornPaper className="p-6">
                <span className="text-xs">UNIVERSITY OF ESSEX</span>
              </TornPaper>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, rotate: 5 }}
              animate={{ opacity: 1, rotate: 8 }}
              transition={{ delay: 0.2 }}
              className="absolute -bottom-10 -right-10 z-0"
            >
              <TornPaper dark className="p-6">
                <span className="text-xs text-red-400">BSC COMPUTER SCIENCE</span>
              </TornPaper>
            </motion.div>

            {/* Main title */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative z-10"
            >
              <TornPaper className="p-8 md:p-12">
                <h1 className={`text-6xl md:text-[12rem] font-black leading-[0.8] tracking-tighter ${glitchText ? 'translate-x-1' : ''}`}>
                  <span className="block relative">
                    SINA
                    {glitchText && (
                      <>
                        <span className="absolute inset-0 text-red-500 translate-x-1">SINA</span>
                        <span className="absolute inset-0 text-cyan-500 -translate-x-1">SINA</span>
                      </>
                    )}
                  </span>
                  <span className="block text-red-500 relative">
                    DILEK
                    {glitchText && (
                      <>
                        <span className="absolute inset-0 text-cyan-500 translate-x-1">DILEK</span>
                        <span className="absolute inset-0 text-yellow-500 -translate-x-1">DILEK</span>
                      </>
                    )}
                  </span>
                </h1>
              </TornPaper>
            </motion.div>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute -right-4 top-1/2 z-20 max-w-xs"
            >
              <TornPaper dark className="p-4 rotate-3">
                <p className="text-sm italic">
                  "Building small tools and learning systems — 
                  for the joy of it."
                </p>
              </TornPaper>
            </motion.div>
          </div>
        </section>

        {/* Skills - Scattered */}
        <section className="py-32 relative">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-6xl font-black mb-16"
          >
            <TornPaper className="inline-block px-6 py-2 -rotate-2">
              SKILLS
            </TornPaper>
          </motion.h2>

          <div className="relative min-h-[400px]">
            {skills.map((skill, i) => {
              const positions = [
                { left: '0%', top: '0%', rotate: -8 },
                { left: '25%', top: '20%', rotate: 5 },
                { left: '50%', top: '5%', rotate: -3 },
                { left: '70%', top: '25%', rotate: 10 },
                { left: '5%', top: '55%', rotate: 6 },
                { left: '30%', top: '65%', rotate: -12 },
                { left: '55%', top: '55%', rotate: 4 },
                { left: '75%', top: '70%', rotate: -6 },
              ]
              const pos = positions[i]
              const colors = [
                'bg-red-500 text-white',
                'bg-yellow-400 text-black',
                'bg-cyan-400 text-black',
                'bg-green-500 text-black',
                'bg-neutral-100 text-black',
                'bg-red-500 text-white',
                'bg-yellow-400 text-black',
                'bg-cyan-400 text-black',
              ]
              
              return (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.2, zIndex: 50 }}
                  transition={{ delay: i * 0.05 }}
                  className="absolute"
                  style={{ left: pos.left, top: pos.top }}
                >
                  <TornPaper className={`px-4 py-3 ${colors[i]}`}>
                    <span 
                      className="text-xl md:text-2xl font-black"
                      style={{ transform: `rotate(${pos.rotate}deg)`, display: 'block' }}
                    >
                      {skill}
                    </span>
                  </TornPaper>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* Projects */}
        <section className="py-32">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-6xl font-black mb-16"
          >
            <TornPaper dark className="inline-block px-6 py-2 rotate-2">
              PROJECTS
            </TornPaper>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 30, rotate: i % 2 === 0 ? -2 : 2 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, rotate: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <TornPaper className="p-6 group cursor-pointer">
                  <div className="flex items-center justify-between">
                    <h3 className="text-3xl font-black group-hover:text-red-500 transition-colors">
                      {project.name}
                    </h3>
                    <span className="px-2 py-1 bg-black text-white text-xs font-bold">
                      {project.tag}
                    </span>
                  </div>
                </TornPaper>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="py-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <TornPaper dark className="p-12 md:p-20 text-center">
              <h2 className="text-5xl md:text-8xl font-black mb-8">
                <span className="text-red-500">LET'S</span> TALK
              </h2>
              
              <div className="flex flex-col md:flex-row justify-center gap-6">
                <motion.a
                  href="https://github.com/noxire-dev"
                  target="_blank"
                  rel="noopener"
                  whileHover={{ rotate: -3, scale: 1.05 }}
                >
                  <TornPaper className="px-8 py-4 text-xl font-black">
                    GITHUB →
                  </TornPaper>
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/sina-dilek-0b1b3b1b9"
                  target="_blank"
                  rel="noopener"
                  whileHover={{ rotate: 3, scale: 1.05 }}
                >
                  <TornPaper className="px-8 py-4 text-xl font-black bg-red-500 text-white">
                    LINKEDIN →
                  </TornPaper>
                </motion.a>
              </div>
            </TornPaper>

            {/* Decorative tape */}
            <div className="absolute -top-4 left-1/4 w-20 h-8 bg-yellow-400/80 rotate-12" />
            <div className="absolute -bottom-4 right-1/4 w-20 h-8 bg-cyan-400/80 -rotate-6" />
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-12 text-center">
          <TornPaper className="inline-block px-6 py-3">
            <p className="text-sm font-bold">
              © {new Date().getFullYear()} SINA DILEK / CUT + PASTE + CODE
            </p>
          </TornPaper>
        </footer>
      </main>
    </div>
  )
}
