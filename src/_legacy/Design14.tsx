import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Design 14: TYPOGRAPHIC MANIFESTO
// Pure typography power, kinetic text, experimental layouts
// Every element is text-driven, bold statements, editorial meets experimental

const manifesto = [
  "I BUILD",
  "SMALL TOOLS",
  "AND LEARN",
  "SYSTEMS"
]

const projects = ['GoSH', 'Moji', 'LoreKeeper', 'Midnight Moon']
const skills = ['Python', 'Go', 'Java', 'JavaScript', 'TypeScript', 'C', 'Flask', 'React']

function RotatingText({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(i => (i + 1) % words.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [words.length])

  return (
    <span className="inline-block relative h-[1.2em] overflow-hidden align-bottom">
      {words.map((word, i) => (
        <motion.span
          key={word}
          initial={{ y: '100%' }}
          animate={{ y: i === index ? '0%' : '-100%' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="absolute left-0 text-red-500"
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

function ScrollRevealText({ children, className = '' }: { children: string; className?: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`block ${className}`}
    >
      {children}
    </motion.span>
  )
}

export default function Design14() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  
  const marqueeX = useTransform(scrollYProgress, [0, 1], ['0%', '-50%'])
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  return (
    <div ref={containerRef} className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-white selection:text-black">
      {/* Minimal grid background */}
      <div 
        className="fixed inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(white 1px, transparent 1px)',
          backgroundSize: '100% 100px'
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 mix-blend-difference">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-sm tracking-widest hover:opacity-50 transition-opacity">
            ← BACK
          </Link>
          <span className="text-sm tracking-widest">MMXXV</span>
        </div>
      </nav>

      {/* Hero */}
      <motion.section 
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="h-screen flex items-center justify-center sticky top-0"
      >
        <div className="text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm tracking-[0.5em] text-neutral-500 mb-8"
          >
            DEVELOPER / STUDENT / CREATOR
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[18vw] md:text-[15vw] font-black leading-[0.85] tracking-tighter"
          >
            SINA
            <br />
            <span className="text-stroke-2 text-white">DILEK</span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 text-xl md:text-2xl tracking-wide"
          >
            I AM A <RotatingText words={['CODER', 'BUILDER', 'LEARNER', 'CREATOR']} />
          </motion.div>
        </div>
      </motion.section>

      {/* Manifesto Section */}
      <section className="min-h-screen relative z-10 bg-white text-black py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          {manifesto.map((line, i) => (
            <ScrollRevealText 
              key={i}
              className={`text-[12vw] md:text-[10vw] font-black leading-[0.9] tracking-tighter ${
                i % 2 === 0 ? '' : 'text-red-500'
              }`}
            >
              {line}
            </ScrollRevealText>
          ))}
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 max-w-xl"
          >
            <p className="text-xl leading-relaxed text-neutral-600">
              First year at the University of Essex completed with 96/100 — First Class Honours. 
              Driven by curiosity, fueled by code.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Skills Marquee */}
      <section className="py-20 overflow-hidden bg-neutral-950 border-y border-neutral-800">
        <motion.div
          style={{ x: marqueeX }}
          className="flex whitespace-nowrap"
        >
          {[...skills, ...skills, ...skills].map((skill, i) => (
            <span key={i} className="text-6xl md:text-8xl font-black mx-8 text-neutral-800 hover:text-white transition-colors">
              {skill}
            </span>
          ))}
        </motion.div>
      </section>

      {/* Projects - Typographic List */}
      <section className="min-h-screen bg-neutral-950 py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-sm tracking-[0.3em] text-neutral-500 mb-16"
          >
            SELECTED WORK
          </motion.p>
          
          {projects.map((project, i) => (
            <motion.div
              key={project}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group border-b border-neutral-800 py-8 cursor-pointer"
            >
              <div className="flex items-baseline justify-between">
                <span className="text-neutral-700 text-sm mr-8">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-5xl md:text-8xl font-black flex-1 group-hover:text-red-500 transition-colors">
                  {project}
                </h3>
                <span className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Big Statement */}
      <section className="min-h-screen flex items-center justify-center bg-red-500 text-white px-6">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="text-[15vw] md:text-[12vw] font-black text-center leading-[0.85] tracking-tighter"
        >
          OPEN
          <br />
          TO
          <br />
          <span className="text-stroke-2 text-white">WORK</span>
        </motion.h2>
      </section>

      {/* Contact */}
      <section className="py-32 px-6 md:px-12 bg-neutral-950">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10vw] font-black leading-none mb-16"
          >
            LET'S
            <br />
            <span className="text-neutral-700">CONNECT</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.a
              href="https://github.com/noxire-dev"
              target="_blank"
              rel="noopener"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ x: 20 }}
              className="group py-8 border-b border-neutral-800"
            >
              <span className="text-4xl md:text-6xl font-black group-hover:text-red-500 transition-colors">
                GitHub
              </span>
              <span className="block text-neutral-500 mt-2">@noxire-dev</span>
            </motion.a>
            
            <motion.a
              href="https://linkedin.com/in/sina-dilek-0b1b3b1b9"
              target="_blank"
              rel="noopener"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ x: 20 }}
              className="group py-8 border-b border-neutral-800"
            >
              <span className="text-4xl md:text-6xl font-black group-hover:text-red-500 transition-colors">
                LinkedIn
              </span>
              <span className="block text-neutral-500 mt-2">/sina-dilek</span>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 border-t border-neutral-900">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-neutral-600">
          <span className="text-sm tracking-widest">© {new Date().getFullYear()} SINA DILEK</span>
          <span className="text-sm tracking-widest">TYPE IS EVERYTHING</span>
        </div>
      </footer>
    </div>
  )
}
