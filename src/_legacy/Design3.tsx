import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

// Design 3: NEO-PUNK ZINE
// Chaotic cut-and-paste aesthetic meets sophisticated typography
// Inspired by punk zines, Raygun magazine, and David Carson's deconstructivism

const projects = [
  { name: 'GoSH', desc: 'Shell in Go' },
  { name: 'Moji', desc: 'Note taking app' },
  { name: 'LoreKeeper', desc: 'RPG marketplace' },
  { name: 'Midnight Moon', desc: 'VSCode themes' },
]

const skills = ['PYTHON', 'GO', 'JAVA', 'JS', 'TS', 'C', 'FLASK', 'REACT']

function TornPaper({ children, className = '', rotate = 0 }: { children: React.ReactNode; className?: string; rotate?: number }) {
  return (
    <div 
      className={`relative ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div 
        className="absolute inset-0 bg-neutral-100"
        style={{
          clipPath: 'polygon(2% 0%, 98% 2%, 100% 97%, 3% 100%, 0% 3%)'
        }}
      />
      <div className="relative p-6 text-neutral-900">
        {children}
      </div>
    </div>
  )
}

function Sticker({ text, color, rotate, x, y }: { text: string; color: string; rotate: number; x: string; y: string }) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: rotate - 20 }}
      animate={{ scale: 1, rotate }}
      whileHover={{ scale: 1.1, rotate: rotate + 5 }}
      className={`absolute ${x} ${y} ${color} px-4 py-2 font-black text-sm cursor-default shadow-lg z-30`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {text}
    </motion.div>
  )
}

function ScribbleUnderline() {
  return (
    <svg className="absolute -bottom-2 left-0 w-full h-4" viewBox="0 0 200 20" preserveAspectRatio="none">
      <path
        d="M0 10 Q 25 0, 50 10 T 100 10 T 150 10 T 200 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        className="text-red-500"
      />
    </svg>
  )
}

export default function Design3() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-neutral-200 text-neutral-900 overflow-x-hidden selection:bg-red-500 selection:text-white">
      {/* Paper texture */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Random scattered elements */}
      <Sticker text="CODER" color="bg-red-500 text-white" rotate={-12} x="left-[5%]" y="top-[15%]" />
      <Sticker text="2025" color="bg-black text-white" rotate={8} x="right-[10%]" y="top-[20%]" />
      <Sticker text="ESSEX" color="bg-yellow-400 text-black" rotate={-5} x="left-[15%]" y="top-[60%]" />
      <Sticker text="96%" color="bg-green-500 text-white" rotate={15} x="right-[20%]" y="top-[45%]" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-4 mix-blend-difference">
        <div className="flex items-center justify-between text-white">
          <Link to="/" className="font-mono text-sm hover:line-through">
            ← BACK
          </Link>
          <span className="font-mono text-sm">ISSUE #03</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen relative flex items-center justify-center px-4 pt-20">
        <div className="relative z-10 text-center max-w-5xl">
          {/* Cut-out style header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block bg-black text-white px-6 py-2 mb-6 transform -rotate-2 text-sm tracking-widest">
              PORTFOLIO / DEVELOPER / STUDENT
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <span 
              className="block text-[18vw] md:text-[14vw] font-editorial leading-[0.8] tracking-tighter"
              style={{ 
                transform: `translate(${mousePos.x * 0.01}px, ${mousePos.y * 0.01}px)` 
              }}
            >
              SINA
            </span>
            <span 
              className="block text-[18vw] md:text-[14vw] font-editorial italic leading-[0.8] tracking-tighter text-red-500 relative"
              style={{ 
                transform: `translate(${-mousePos.x * 0.01}px, ${-mousePos.y * 0.01}px)` 
              }}
            >
              DILEK
              <ScribbleUnderline />
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 relative inline-block"
          >
            <TornPaper rotate={-1}>
              <p className="text-xl md:text-2xl font-editorial italic max-w-md">
                "Building small tools and learning systems. 
                CS student who codes for the joy of it."
              </p>
            </TornPaper>
          </motion.div>
        </div>
      </section>

      {/* Skills - Scattered newspaper clippings */}
      <section className="py-32 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-6xl md:text-8xl font-editorial mb-16 relative inline-block"
          >
            Skills
            <span className="absolute -right-8 -top-4 text-red-500 text-2xl rotate-12">★</span>
          </motion.h2>

          <div className="relative min-h-[500px]">
            {skills.map((skill, i) => {
              const positions = [
                { left: '0%', top: '0%', rotate: -8 },
                { left: '25%', top: '15%', rotate: 5 },
                { left: '55%', top: '5%', rotate: -3 },
                { left: '75%', top: '20%', rotate: 10 },
                { left: '5%', top: '55%', rotate: 6 },
                { left: '35%', top: '60%', rotate: -12 },
                { left: '60%', top: '50%', rotate: 4 },
                { left: '80%', top: '65%', rotate: -6 },
              ]
              const pos = positions[i] || positions[0]
              const bgColors = ['bg-neutral-100', 'bg-yellow-100', 'bg-red-100', 'bg-blue-100']
              const bgColor = bgColors[i % bgColors.length]
              
              return (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1, zIndex: 50 }}
                  transition={{ delay: i * 0.05 }}
                  className={`absolute ${bgColor} p-4 md:p-6 shadow-md cursor-default`}
                  style={{ 
                    left: pos.left, 
                    top: pos.top, 
                    transform: `rotate(${pos.rotate}deg)`,
                    clipPath: 'polygon(0% 2%, 98% 0%, 100% 98%, 2% 100%)'
                  }}
                >
                  <span className="text-2xl md:text-4xl font-black">{skill}</span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Projects - Magazine spread */}
      <section className="py-32 px-4 bg-neutral-900 text-neutral-100 relative overflow-hidden">
        {/* Diagonal stripe */}
        <div className="absolute top-0 left-0 right-0 h-4 bg-red-500 transform -skew-y-1" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-6xl md:text-8xl font-editorial mb-16"
          >
            Work<span className="text-red-500">.</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <motion.article
                key={project.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ rotate: i % 2 === 0 ? 2 : -2 }}
                className="group relative bg-neutral-100 text-neutral-900 p-8 cursor-pointer"
                style={{
                  transform: `rotate(${i % 2 === 0 ? -1 : 1}deg)`,
                  clipPath: 'polygon(1% 0%, 100% 2%, 99% 100%, 0% 98%)'
                }}
              >
                <span className="absolute top-4 right-4 text-6xl font-editorial text-neutral-200 group-hover:text-red-200 transition-colors">
                  {String(i + 1).padStart(2, '0')}
                </span>
                
                <h3 className="text-4xl md:text-5xl font-black mb-2 relative z-10">
                  {project.name}
                </h3>
                <p className="text-neutral-500 relative z-10">{project.desc}</p>
                
                <div className="mt-6 flex items-center gap-2 text-sm text-red-500 group-hover:gap-4 transition-all">
                  <span>VIEW</span>
                  <span>→</span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact - Ransom note style */}
      <section className="py-32 px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-5xl md:text-7xl font-editorial mb-12"
          >
            <span className="inline-block bg-black text-white px-4 py-2 rotate-1">LET'S</span>
            {' '}
            <span className="inline-block bg-red-500 text-white px-4 py-2 -rotate-2">TALK</span>
          </motion.h2>

          <div className="flex flex-col md:flex-row justify-center gap-6">
            <motion.a
              href="https://github.com/noxire-dev"
              target="_blank"
              rel="noopener"
              whileHover={{ rotate: -3, scale: 1.05 }}
              className="inline-block bg-neutral-900 text-white px-8 py-4 text-xl font-black shadow-lg"
              style={{ clipPath: 'polygon(2% 0%, 100% 3%, 98% 100%, 0% 97%)' }}
            >
              GITHUB →
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/sina-dilek-0b1b3b1b9"
              target="_blank"
              rel="noopener"
              whileHover={{ rotate: 3, scale: 1.05 }}
              className="inline-block bg-red-500 text-white px-8 py-4 text-xl font-black shadow-lg"
              style={{ clipPath: 'polygon(0% 3%, 98% 0%, 100% 97%, 2% 100%)' }}
            >
              LINKEDIN →
            </motion.a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t-4 border-black">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="font-mono text-sm">© {new Date().getFullYear()} SINA DILEK</p>
          <p className="font-mono text-sm">CUT / PASTE / CODE</p>
        </div>
      </footer>
    </div>
  )
}
