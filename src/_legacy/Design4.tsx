import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

// Design 4: MONOCHROME CONSTRUCTIVIST
// Bold geometric shapes, stark black/white with single accent color
// Inspired by Russian Constructivism, Bauhaus, and Swiss design

const projects = [
  { name: 'GoSH', num: '01', desc: 'Shell written in Go' },
  { name: 'Moji', num: '02', desc: 'Note taking app' },
  { name: 'LoreKeeper', num: '03', desc: 'RPG marketplace' },
  { name: 'Midnight Moon', num: '04', desc: 'VSCode themes' },
]

const skills = ['Python', 'Go', 'Java', 'JavaScript', 'TypeScript', 'C', 'Flask', 'React']

function GeometricShape({ className }: { className: string }) {
  return <div className={className} />
}

export default function Design4() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const circleScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.5])
  const circleX = useTransform(scrollYProgress, [0, 0.3], ['0%', '50%'])

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-black overflow-x-hidden selection:bg-red-600 selection:text-white">
      {/* Fixed geometric elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Large red circle */}
        <motion.div
          style={{ scale: circleScale, x: circleX }}
          className="absolute -top-[20vw] -right-[20vw] w-[70vw] h-[70vw] rounded-full bg-red-600"
        />

        {/* Black diagonal */}
        <div className="absolute bottom-0 left-0 w-[50vw] h-[30vh] bg-black origin-bottom-left -skew-x-12" />

        {/* Grid lines */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(black 1px, transparent 1px), linear-gradient(90deg, black 1px, transparent 1px)',
          backgroundSize: '100px 100px',
          opacity: 0.03
        }} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 md:p-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-sm tracking-widest hover:text-red-600 transition-colors">
            ← BACK
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-4 h-4 bg-red-600" />
            <span className="text-sm tracking-widest">2025</span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen relative flex items-center px-6 md:px-12">
        <div className="relative z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Overline with geometric accent */}
            <div className="flex items-center gap-4 mb-8">
              <GeometricShape className="w-8 h-8 bg-red-600" />
              <span className="text-sm tracking-[0.3em] font-mono">DEVELOPER</span>
            </div>

            {/* Name - Constructivist style */}
            <h1 className="text-[16vw] md:text-[12vw] leading-[0.85] font-black tracking-tighter">
              <span className="block">SINA</span>
              <span className="block flex items-center gap-4">
                <span>DILEK</span>
                <GeometricShape className="w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-black" />
              </span>
            </h1>

            {/* Info strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-12 flex flex-wrap items-center gap-6"
            >
              <span className="px-4 py-2 bg-black text-white text-sm tracking-widest">
                UNIVERSITY OF ESSEX
              </span>
              <span className="px-4 py-2 bg-red-600 text-white text-sm tracking-widest">
                96/100
              </span>
              <span className="px-4 py-2 border-2 border-black text-sm tracking-widest">
                OPEN TO WORK
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About - Split layout */}
      <section className="relative z-10 bg-white">
        <div className="grid md:grid-cols-2">
          <div className="bg-black text-white p-12 md:p-20">
            <h2 className="text-5xl md:text-6xl font-black mb-8">
              ABOUT
            </h2>
            <p className="text-lg text-neutral-300 leading-relaxed">
              CS student at the University of Essex. Building small tools
              and learning systems. Started with Python, now exploring Go,
              Java, JavaScript, and C.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <GeometricShape className="w-4 h-4 bg-red-600" />
              <span className="text-sm tracking-widest text-neutral-400">FIRST CLASS HONOURS</span>
            </div>
          </div>

          <div className="p-12 md:p-20 flex items-center justify-center">
            <div className="relative w-full aspect-square max-w-sm">
              <GeometricShape className="absolute inset-0 border-4 border-black" />
              <GeometricShape className="absolute top-4 left-4 right-4 bottom-4 bg-red-600" />
              <GeometricShape className="absolute top-8 left-8 right-8 bottom-8 rounded-full bg-white" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl font-black">SD</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills - Horizontal scroll effect */}
      <section className="relative z-10 py-24 bg-white overflow-hidden">
        <div className="px-6 md:px-12 mb-8">
          <div className="flex items-center gap-4">
            <GeometricShape className="w-4 h-4 bg-red-600" />
            <h2 className="text-sm tracking-[0.3em] font-mono">CAPABILITIES</h2>
          </div>
        </div>

        {/* Skills marquee */}
        <div className="border-y-4 border-black py-8 overflow-hidden">
          <motion.div
            animate={{ x: '-50%' }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="flex whitespace-nowrap"
          >
            {[...skills, ...skills].map((skill, i) => (
              <span key={i} className="text-6xl md:text-8xl font-black mx-8">
                {skill}
                <span className="text-red-600 mx-8">●</span>
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects - Grid */}
      <section className="relative z-10 bg-white px-6 md:px-12 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <GeometricShape className="w-4 h-4 bg-red-600" />
            <h2 className="text-sm tracking-[0.3em] font-mono">SELECTED WORK</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-0 border-4 border-black">
            {projects.map((project, i) => (
              <motion.article
                key={project.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`group p-8 md:p-12 border-black cursor-pointer hover:bg-black hover:text-white transition-colors ${
                  i === 0 ? 'border-b-4 md:border-r-4 md:border-b-0' :
                  i === 1 ? 'border-b-4' :
                  i === 2 ? 'md:border-r-4' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="text-6xl font-black text-neutral-200 group-hover:text-neutral-700 transition-colors">
                    {project.num}
                  </span>
                  <GeometricShape className="w-6 h-6 bg-red-600 group-hover:rotate-45 transition-transform" />
                </div>

                <h3 className="text-3xl md:text-4xl font-black mb-2">
                  {project.name}
                </h3>
                <p className="text-neutral-500 group-hover:text-neutral-300 transition-colors">
                  {project.desc}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="relative z-10 bg-black text-white px-6 md:px-12 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-6xl md:text-8xl font-black leading-none mb-8">
                LET'S
                <br />
                <span className="text-red-600">CONNECT</span>
              </h2>
            </div>

            <div className="space-y-4">
              <motion.a
                href="https://github.com/noxire-dev"
                target="_blank"
                rel="noopener"
                whileHover={{ x: 10 }}
                className="group flex items-center justify-between p-6 border-2 border-white hover:bg-white hover:text-black transition-colors"
              >
                <span className="text-xl font-black">GITHUB</span>
                <span className="text-2xl">→</span>
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/sina-dilek-0b1b3b1b9"
                target="_blank"
                rel="noopener"
                whileHover={{ x: 10 }}
                className="group flex items-center justify-between p-6 border-2 border-white hover:bg-red-600 transition-colors"
              >
                <span className="text-xl font-black">LINKEDIN</span>
                <span className="text-2xl">→</span>
              </motion.a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-white px-6 md:px-12 py-8 border-t-4 border-black">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-4">
            <GeometricShape className="w-4 h-4 bg-red-600" />
            <span className="text-sm tracking-widest font-mono">© {new Date().getFullYear()} SINA DILEK</span>
          </div>
          <span className="text-sm tracking-widest font-mono text-neutral-500">
            FORM FOLLOWS FUNCTION
          </span>
        </div>
      </footer>
    </div>
  )
}
