import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// Design 5: WARM MAXIMALIST
// Bold, chaotic energy but with a cohesive warm color palette
// Oranges, corals, terracotta, cream - inspired by 70s design and Memphis

const projects = [
  { name: 'GoSH', tag: 'SHELL' },
  { name: 'Moji', tag: 'APP' },
  { name: 'LoreKeeper', tag: 'WEB' },
  { name: 'Midnight Moon', tag: 'THEME' },
]

const skills = ['PYTHON', 'GO', 'JAVA', 'JS', 'TS', 'C', 'FLASK', 'REACT']

function WavyText({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span className={`inline-flex ${className}`}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 0.5, delay: i * 0.05, repeat: Infinity, repeatDelay: 2 }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

function FloatingShape({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      className={`absolute ${className}`}
    />
  )
}

function MarqueeStrip({ children, reverse = false, className = '' }: { children: React.ReactNode; reverse?: boolean; className?: string }) {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        animate={{ x: reverse ? '0%' : '-50%' }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="inline-flex"
      >
        {[...Array(8)].map((_, i) => (
          <span key={i} className="inline-flex">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default function Design5() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      cursorX.set(e.clientX - 30)
      cursorY.set(e.clientY - 30)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [cursorX, cursorY])

  const cursorRotate = useTransform(cursorX, [0, window.innerWidth], [0, 360])

  return (
    <div className="min-h-screen text-neutral-900 overflow-x-hidden selection:bg-orange-600 selection:text-white" style={{ backgroundColor: '#FFF5EB' }}>
      {/* Custom cursor */}
      <motion.div
        style={{ x: cursorX, y: cursorY, rotate: cursorRotate }}
        className="fixed w-16 h-16 pointer-events-none z-50 mix-blend-difference hidden md:block"
      >
        <div className="w-full h-full rounded-full border-4 border-white" />
      </motion.div>

      {/* Decorative shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <FloatingShape className="w-64 h-64 rounded-full top-20 -left-20 opacity-40" style={{ backgroundColor: '#FF6B35' }} delay={0} />
        <FloatingShape className="w-96 h-96 rounded-full -top-32 right-10 opacity-30" style={{ backgroundColor: '#F7C59F' }} delay={0.2} />
        <FloatingShape className="w-48 h-48 top-1/2 -right-10 opacity-50" style={{ backgroundColor: '#2EC4B6', borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }} delay={0.4} />
        <FloatingShape className="w-32 h-32 bottom-40 left-1/4 opacity-40" style={{ backgroundColor: '#E84855' }} delay={0.6} />
        <FloatingShape className="w-72 h-72 rounded-full bottom-0 right-1/4 opacity-20" style={{ backgroundColor: '#FF9F1C' }} delay={0.3} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <Link 
            to="/"
            className="px-4 py-2 rounded-full font-bold text-sm transition-colors hover:text-white"
            style={{ backgroundColor: '#FF6B35' }}
          >
            ← BACK
          </Link>
          <div 
            className="px-4 py-2 rounded-full font-bold text-sm text-white"
            style={{ backgroundColor: '#E84855' }}
          >
            DESIGN 05
          </div>
        </div>
      </nav>

      {/* Floating labels */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed left-[8%] top-[25%] z-20 px-4 py-2 rounded-full text-white font-bold text-sm"
        style={{ backgroundColor: '#2EC4B6', transform: 'rotate(-12deg)' }}
      >
        STUDENT
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="fixed right-[12%] top-[30%] z-20 px-4 py-2 rounded-full text-white font-bold text-sm"
        style={{ backgroundColor: '#E84855', transform: 'rotate(8deg)' }}
      >
        CODER
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="fixed left-[15%] top-[55%] z-20 px-4 py-2 rounded-full text-white font-bold text-sm"
        style={{ backgroundColor: '#FF9F1C', transform: 'rotate(-5deg)' }}
      >
        BUILDER
      </motion.div>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="relative z-10 text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div 
              className="inline-block px-6 py-2 rounded-full mb-6 font-bold text-sm"
              style={{ backgroundColor: '#2EC4B6', color: 'white' }}
            >
              UNIVERSITY OF ESSEX — FIRST CLASS — 96/100
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-[15vw] md:text-[12vw] leading-[0.9] font-archivo tracking-tight"
            style={{ 
              transform: `translate(${mousePos.x * 0.005}px, ${mousePos.y * 0.005}px)` 
            }}
          >
            <span className="block" style={{ color: '#FF6B35' }}>SINA</span>
            <span className="block" style={{ 
              WebkitTextStroke: '3px #E84855',
              WebkitTextFillColor: 'transparent'
            }}>
              DILEK
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-xl md:text-2xl font-sans max-w-lg mx-auto"
            style={{ color: '#5C5C5C' }}
          >
            Building small tools and learning systems. 
            CS student who codes for the joy of it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-10"
          >
            <span 
              className="inline-block px-8 py-4 rounded-full font-bold text-lg text-white shadow-lg"
              style={{ backgroundColor: '#FF6B35' }}
            >
              <WavyText text="OPEN TO OPPORTUNITIES" />
            </span>
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <section className="py-4 text-white" style={{ backgroundColor: '#E84855' }}>
        <MarqueeStrip>
          <span className="text-3xl md:text-4xl font-archivo mx-6">PYTHON</span>
          <span className="text-3xl md:text-4xl mx-6">◆</span>
          <span className="text-3xl md:text-4xl font-archivo mx-6">GO</span>
          <span className="text-3xl md:text-4xl mx-6">◆</span>
          <span className="text-3xl md:text-4xl font-archivo mx-6">JAVA</span>
          <span className="text-3xl md:text-4xl mx-6">◆</span>
          <span className="text-3xl md:text-4xl font-archivo mx-6">JAVASCRIPT</span>
          <span className="text-3xl md:text-4xl mx-6">◆</span>
        </MarqueeStrip>
      </section>

      {/* Skills - Bubble layout */}
      <section className="py-32 px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-7xl font-archivo mb-16"
            style={{ color: '#FF6B35' }}
          >
            SKILLS
          </motion.h2>

          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill, i) => {
              const colors = ['#FF6B35', '#2EC4B6', '#E84855', '#FF9F1C', '#FF6B35', '#2EC4B6', '#E84855', '#FF9F1C']
              const sizes = ['text-2xl', 'text-3xl', 'text-4xl', 'text-2xl', 'text-3xl', 'text-2xl', 'text-4xl', 'text-3xl']
              
              return (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.15, rotate: Math.random() * 10 - 5 }}
                  transition={{ delay: i * 0.05 }}
                  className={`px-6 py-3 rounded-full text-white font-bold cursor-default shadow-lg ${sizes[i]}`}
                  style={{ backgroundColor: colors[i] }}
                >
                  {skill}
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Projects - Stacked cards */}
      <section className="py-32 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-7xl font-archivo mb-16 text-right"
            style={{ color: '#E84855' }}
          >
            PROJECTS
          </motion.h2>

          <div className="space-y-[-10px]">
            {projects.map((project, i) => {
              const colors = ['#FF6B35', '#2EC4B6', '#E84855', '#FF9F1C']
              const rotations = [-2, 1.5, -1, 2]
              
              return (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.02, zIndex: 50, rotate: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative p-8 rounded-3xl text-white cursor-pointer shadow-xl"
                  style={{ 
                    backgroundColor: colors[i],
                    transform: `rotate(${rotations[i]}deg)`,
                    zIndex: projects.length - i
                  }}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-4xl md:text-5xl font-archivo">{project.name}</h3>
                    <span 
                      className="px-4 py-2 rounded-full text-sm font-bold"
                      style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                    >
                      {project.tag}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-32 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="p-12 md:p-20 rounded-[40px] text-white text-center"
            style={{ backgroundColor: '#2EC4B6' }}
          >
            <h2 className="text-5xl md:text-8xl font-archivo mb-8">
              LET'S CHAT!
            </h2>
            <p className="text-xl opacity-80 mb-12 max-w-md mx-auto">
              Always open to new opportunities, collaborations, and interesting conversations.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.a
                href="https://github.com/noxire-dev"
                target="_blank"
                rel="noopener"
                whileHover={{ scale: 1.05, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full font-bold text-lg shadow-lg"
                style={{ backgroundColor: '#FF6B35' }}
              >
                GITHUB →
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/sina-dilek-0b1b3b1b9"
                target="_blank"
                rel="noopener"
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full font-bold text-lg shadow-lg"
                style={{ backgroundColor: '#E84855' }}
              >
                LINKEDIN →
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-white" style={{ backgroundColor: '#FF6B35' }}>
        <MarqueeStrip reverse>
          <span className="text-xl font-bold mx-6">© 2025 SINA DILEK</span>
          <span className="text-xl mx-6">◆</span>
          <span className="text-xl font-bold mx-6">MADE WITH JOY</span>
          <span className="text-xl mx-6">◆</span>
          <span className="text-xl font-bold mx-6">STAY CURIOUS</span>
          <span className="text-xl mx-6">◆</span>
        </MarqueeStrip>
      </footer>
    </div>
  )
}
