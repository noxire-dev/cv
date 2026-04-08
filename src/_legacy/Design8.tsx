import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Design 8: GLITCH NOIR
// Dark corrupted aesthetics, data visualization, cyberpunk noir
// Inspired by glitch art, datamosh, corrupted files, dark web

const projects = [
  { name: 'GoSH', hex: '0x47534F48', status: 1 },
  { name: 'Moji', hex: '0x4D4F4A49', status: 1 },
  { name: 'LoreKeeper', hex: '0x4C4F5245', status: 1 },
  { name: 'Midnight Moon', hex: '0x4D494454', status: 1 },
]

const skills = ['Python', 'Go', 'Java', 'JavaScript', 'TypeScript', 'C', 'Flask', 'React']

function GlitchText({ children, className = '' }: { children: string; className?: string }) {
  const [glitch, setGlitch] = useState(false)
  const [offset, setOffset] = useState({ r: 0, b: 0 })

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        setGlitch(true)
        setOffset({
          r: Math.random() * 4 - 2,
          b: Math.random() * 4 - 2
        })
        setTimeout(() => setGlitch(false), 100 + Math.random() * 100)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className={`relative inline-block ${className}`}>
      {glitch && (
        <>
          <span 
            className="absolute inset-0 text-red-500 opacity-70"
            style={{ transform: `translate(${offset.r}px, 0)`, clipPath: 'inset(0 0 50% 0)' }}
          >
            {children}
          </span>
          <span 
            className="absolute inset-0 text-blue-500 opacity-70"
            style={{ transform: `translate(${offset.b}px, 0)`, clipPath: 'inset(50% 0 0 0)' }}
          >
            {children}
          </span>
        </>
      )}
      <span className={glitch ? 'opacity-80' : ''}>{children}</span>
    </span>
  )
}

function DataStream() {
  const [chars, setChars] = useState<string[]>([])
  
  useEffect(() => {
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ'
    const interval = setInterval(() => {
      setChars(prev => {
        const newChars = [...prev, characters[Math.floor(Math.random() * characters.length)]]
        return newChars.slice(-50)
      })
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed right-4 top-20 bottom-20 w-4 overflow-hidden opacity-20 text-green-400 text-xs font-mono hidden md:block">
      {chars.map((char, i) => (
        <div key={i} style={{ opacity: i / chars.length }}>{char}</div>
      ))}
    </div>
  )
}

function NoiseOverlay() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] animate-noise"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundSize: '128px 128px'
      }}
    />
  )
}

function CorruptedBar({ width }: { width: number }) {
  return (
    <div className="h-1 bg-neutral-800 relative overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${width}%` }}
        transition={{ duration: 0.8 }}
        className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-500 via-white to-blue-500"
        style={{
          clipPath: `polygon(
            0 0, 
            ${Math.random() * 5}% 100%, 
            ${20 + Math.random() * 10}% 0,
            ${40 + Math.random() * 10}% 100%,
            ${60 + Math.random() * 10}% 0,
            ${80 + Math.random() * 10}% 100%,
            100% 0,
            100% 100%,
            0 100%
          )`
        }}
      />
    </div>
  )
}

export default function Design8() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [scanPos, setScanPos] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  useEffect(() => {
    const interval = setInterval(() => {
      setScanPos(p => (p + 1) % 100)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const bgX = useTransform(mouseX, [0, window.innerWidth], [-20, 20])
  const bgY = useTransform(mouseY, [0, window.innerHeight], [-20, 20])

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-mono overflow-x-hidden selection:bg-red-500 selection:text-white">
      <NoiseOverlay />
      <DataStream />
      
      {/* Scan line */}
      <div 
        className="fixed left-0 right-0 h-px bg-white/10 pointer-events-none z-40"
        style={{ top: `${scanPos}%` }}
      />

      {/* Background grid distortion */}
      <motion.div 
        style={{ x: bgX, y: bgY }}
        className="fixed inset-0 pointer-events-none"
      >
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
      </motion.div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 bg-neutral-950/80 backdrop-blur border-b border-white/5">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-sm text-neutral-400 hover:text-white transition-colors">
            <GlitchText>← EXIT</GlitchText>
          </Link>
          <div className="flex items-center gap-4 text-xs text-neutral-500">
            <span>SYS.ERR</span>
            <span className="text-red-500">●</span>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-24 px-4 md:px-8 max-w-5xl mx-auto">
        {/* Hero */}
        <section className="py-20 relative">
          {/* Corrupted background text */}
          <div className="absolute top-0 left-0 text-[20vw] font-black text-white/[0.02] leading-none select-none pointer-events-none overflow-hidden whitespace-nowrap">
            CORRUPTED_DATA
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="text-xs text-neutral-500 mb-4 tracking-widest">
              [IDENTITY.RECOVERED]
            </div>

            <h1 className="text-6xl md:text-[10rem] font-black leading-[0.85] tracking-tighter">
              <GlitchText>SINA</GlitchText>
              <br />
              <span className="text-stroke-2 text-white">DILEK</span>
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 max-w-md"
            >
              <p className="text-neutral-400 leading-relaxed">
                <span className="text-red-500">&gt;</span> Building small tools and learning systems.
                <br />
                <span className="text-red-500">&gt;</span> CS student @ University of Essex
                <br />
                <span className="text-red-500">&gt;</span> Status: <span className="text-green-400">OPEN_TO_OPPORTUNITIES</span>
              </p>
            </motion.div>

            <div className="mt-8 flex gap-4">
              <span className="px-3 py-1 border border-white/20 text-xs text-neutral-400">
                FIRST_CLASS
              </span>
              <span className="px-3 py-1 border border-white/20 text-xs text-neutral-400">
                96/100
              </span>
            </div>
          </motion.div>
        </section>

        {/* Skills - Data visualization style */}
        <section className="py-20 border-t border-white/10">
          <div className="text-xs text-neutral-500 mb-8 tracking-widest">
            [SKILL.MATRIX]
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {skills.map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="group"
              >
                <div className="text-xs text-neutral-500 mb-2">0x{(i + 1).toString(16).padStart(2, '0').toUpperCase()}</div>
                <div className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                  <GlitchText>{skill}</GlitchText>
                </div>
                <CorruptedBar width={70 + Math.random() * 30} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="py-20 border-t border-white/10">
          <div className="text-xs text-neutral-500 mb-8 tracking-widest">
            [PROJECT.DATABASE]
          </div>

          <div className="space-y-4">
            {projects.map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group p-4 border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all cursor-pointer relative overflow-hidden"
              >
                {/* Glitch line on hover */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <span className="text-xs text-neutral-600 font-mono">{project.hex}</span>
                    <span className="text-xl font-bold group-hover:text-red-400 transition-colors">
                      <GlitchText>{project.name}</GlitchText>
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${project.status ? 'bg-green-500' : 'bg-red-500'}`} />
                    <span className="text-xs text-neutral-500">
                      {project.status ? 'ONLINE' : 'OFFLINE'}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="py-20 border-t border-white/10">
          <div className="text-xs text-neutral-500 mb-8 tracking-widest">
            [CONNECTION.PROTOCOL]
          </div>

          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-6xl font-black mb-12"
          >
            <GlitchText>ESTABLISH</GlitchText>
            <br />
            <span className="text-neutral-600">CONNECTION</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-4">
            <motion.a
              href="https://github.com/noxire-dev"
              target="_blank"
              rel="noopener"
              whileHover={{ x: 10 }}
              className="group p-6 border border-white/10 hover:border-red-500/50 hover:bg-red-500/5 transition-all"
            >
              <div className="text-xs text-neutral-600 mb-2">[LINK.GITHUB]</div>
              <div className="text-lg group-hover:text-red-400 transition-colors">
                github.com/noxire-dev →
              </div>
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/sina-dilek-0b1b3b1b9"
              target="_blank"
              rel="noopener"
              whileHover={{ x: 10 }}
              className="group p-6 border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all"
            >
              <div className="text-xs text-neutral-600 mb-2">[LINK.LINKEDIN]</div>
              <div className="text-lg group-hover:text-blue-400 transition-colors">
                linkedin.com/sina-dilek →
              </div>
            </motion.a>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-white/10 text-center">
          <p className="text-xs text-neutral-600">
            © {new Date().getFullYear()} SINA DILEK | DATA_CORRUPTED_SUCCESSFULLY
          </p>
        </footer>
      </main>
    </div>
  )
}
