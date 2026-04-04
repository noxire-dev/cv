import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

// Design 12: KINETIC CONSTRUCTIVIST
// Bold geometry with intense scroll-triggered animations
// Russian Constructivism meets modern motion design

const projects = [
  { name: 'GoSH', num: '01' },
  { name: 'Moji', num: '02' },
  { name: 'LoreKeeper', num: '03' },
  { name: 'Midnight Moon', num: '04' },
]

const skills = ['PYTHON', 'GO', 'JAVA', 'JAVASCRIPT', 'TYPESCRIPT', 'C', 'FLASK', 'REACT']

export default function Design12() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  
  // Smooth spring for scroll progress
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  
  // Hero transforms
  const heroRotate = useTransform(smoothProgress, [0, 0.2], [0, -5])
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.9])
  const circleX = useTransform(smoothProgress, [0, 0.5], ['0%', '100%'])
  const circleScale = useTransform(smoothProgress, [0, 0.3], [1, 2])
  const diagonalRotate = useTransform(smoothProgress, [0, 1], [0, 180])
  
  // Text reveals
  const textX = useTransform(smoothProgress, [0.1, 0.3], ['-100%', '0%'])

  return (
    <div ref={containerRef} className="min-h-[400vh] bg-white text-black selection:bg-red-600 selection:text-white">
      {/* Fixed background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Animated red circle */}
        <motion.div
          style={{ x: circleX, scale: circleScale }}
          className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-red-600"
        />
        
        {/* Rotating diagonal */}
        <motion.div
          style={{ rotate: diagonalRotate }}
          className="absolute top-0 right-0 w-[200vw] h-32 bg-black origin-top-right"
        />
        
        {/* Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(black 1px, transparent 1px), linear-gradient(90deg, black 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 mix-blend-difference">
        <div className="flex items-center justify-between text-white">
          <Link to="/" className="text-sm tracking-widest hover:opacity-60 transition-opacity">
            ← BACK
          </Link>
          <span className="text-sm tracking-widest">2025</span>
        </div>
      </nav>

      {/* Hero Section - Fixed while scrolling */}
      <section className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ rotate: heroRotate, scale: heroScale }}
          className="relative z-10 text-center"
        >
          {/* Geometric frame */}
          <div className="absolute -inset-20 border-4 border-black" />
          <div className="absolute -inset-16 border-2 border-red-600" />
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-8 h-8 bg-red-600" />
              <span className="text-sm tracking-[0.5em]">DEVELOPER</span>
              <div className="w-8 h-8 border-2 border-black" />
            </div>
            
            <h1 className="text-[15vw] font-black leading-[0.8] tracking-tighter">
              SINA
              <br />
              <span className="text-stroke-2 text-black">DILEK</span>
            </h1>
            
            <div className="mt-8 flex items-center justify-center gap-8">
              <span className="text-sm tracking-widest">ESSEX</span>
              <div className="w-16 h-1 bg-red-600" />
              <span className="text-sm tracking-widest">96/100</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section className="min-h-screen relative z-10 bg-black text-white py-32">
        <motion.div
          style={{ x: textX }}
          className="overflow-hidden"
        >
          <div className="text-[20vw] font-black leading-none whitespace-nowrap text-stroke-2 text-white opacity-20">
            CAPABILITIES CAPABILITIES
          </div>
        </motion.div>
        
        <div className="max-w-6xl mx-auto px-6 md:px-12 mt-[-10vh]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
            {skills.map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05, type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.1, zIndex: 10 }}
                className="aspect-square flex items-center justify-center bg-white text-black p-4 cursor-default group"
              >
                <span className="text-lg md:text-2xl font-black text-center group-hover:text-red-600 transition-colors">
                  {skill}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="min-h-screen relative z-10 bg-white py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-4 mb-20">
            <div className="w-12 h-12 bg-red-600" />
            <h2 className="text-6xl md:text-8xl font-black">WORK</h2>
          </div>
          
          <div className="space-y-0">
            {projects.map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                whileHover={{ x: i % 2 === 0 ? 20 : -20 }}
                className="group border-t-4 border-black py-8 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-8">
                    <span className="text-6xl md:text-8xl font-black text-red-600">
                      {project.num}
                    </span>
                    <span className="text-4xl md:text-6xl font-black group-hover:text-red-600 transition-colors">
                      {project.name}
                    </span>
                  </div>
                  <motion.div
                    whileHover={{ rotate: 45, scale: 1.2 }}
                    className="w-12 h-12 bg-black group-hover:bg-red-600 transition-colors"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="min-h-screen relative z-10 bg-red-600 text-white flex items-center">
        <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[12vw] font-black leading-[0.85] mb-12">
              LET'S
              <br />
              BUILD
            </h2>
            
            <div className="flex flex-col md:flex-row gap-6">
              <motion.a
                href="https://github.com/noxire-dev"
                target="_blank"
                rel="noopener"
                whileHover={{ scale: 1.05, x: 10 }}
                className="inline-block px-12 py-6 bg-white text-red-600 text-2xl font-black"
              >
                GITHUB →
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/sina-dilek-0b1b3b1b9"
                target="_blank"
                rel="noopener"
                whileHover={{ scale: 1.05, x: 10 }}
                className="inline-block px-12 py-6 bg-black text-white text-2xl font-black"
              >
                LINKEDIN →
              </motion.a>
            </div>
          </motion.div>
        </div>
        
        {/* Geometric accents */}
        <div className="absolute top-12 right-12 w-24 h-24 border-4 border-white opacity-50" />
        <div className="absolute bottom-12 left-12 w-16 h-16 bg-white opacity-30" />
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-black text-white py-8 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <span className="text-sm tracking-widest">© {new Date().getFullYear()} SINA DILEK</span>
          <span className="text-sm tracking-widest text-red-600">FORM + FUNCTION</span>
        </div>
      </footer>
    </div>
  )
}
