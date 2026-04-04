import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// Design 10: ARCHITECTURAL BLUEPRINT
// Technical drawing aesthetic, blueprint blue, grid lines, annotations
// Inspired by architectural plans, engineering drawings, CAD software

const projects = [
  { id: 'A-101', name: 'GoSH', type: 'SYSTEMS', status: 'APPROVED' },
  { id: 'A-102', name: 'Moji', type: 'APPLICATION', status: 'APPROVED' },
  { id: 'A-103', name: 'LoreKeeper', type: 'PLATFORM', status: 'APPROVED' },
  { id: 'A-104', name: 'Midnight Moon', type: 'EXTENSION', status: 'APPROVED' },
]

const skills = [
  { name: 'Python', years: 4 },
  { name: 'Go', years: 2 },
  { name: 'Java', years: 2 },
  { name: 'JavaScript', years: 3 },
  { name: 'TypeScript', years: 2 },
  { name: 'C', years: 1 },
]

function BlueprintGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Blueprint blue background */}
      <div className="absolute inset-0" style={{ backgroundColor: '#1a365d' }} />
      
      {/* Fine grid */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '10px 10px'
        }}
      />
      
      {/* Major grid */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }}
      />
    </div>
  )
}

function Annotation({ children, x, y }: { children: string; x: string; y: string }) {
  return (
    <div 
      className={`absolute ${x} ${y} text-[10px] text-white/40 font-mono`}
      style={{ transform: 'rotate(-90deg)', transformOrigin: 'left top' }}
    >
      {children}
    </div>
  )
}

function DimensionLine({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 text-white/50">
      <div className="flex-1 h-px bg-white/30 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 border-l border-t border-white/30 -rotate-45" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-r border-b border-white/30 -rotate-45" />
      </div>
      <span className="text-xs font-mono shrink-0">{label}</span>
      <div className="flex-1 h-px bg-white/30 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 border-l border-t border-white/30 -rotate-45" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-r border-b border-white/30 -rotate-45" />
      </div>
    </div>
  )
}

function TechnicalBox({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="relative border border-white/30 p-6">
      {/* Corner marks */}
      <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-white/50" />
      <div className="absolute -top-1 -right-1 w-3 h-3 border-t border-r border-white/50" />
      <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b border-l border-white/50" />
      <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-white/50" />
      
      {/* Label */}
      <div className="absolute -top-3 left-4 bg-[#1a365d] px-2 text-xs text-white/50 font-mono">
        {label}
      </div>
      
      {children}
    </div>
  )
}

export default function Design10() {
  return (
    <div className="min-h-screen text-white font-mono selection:bg-white selection:text-blue-900">
      <BlueprintGrid />
      
      {/* Side annotations */}
      <Annotation x="left-4" y="top-1/4">REV. 2025.02</Annotation>
      <Annotation x="left-4" y="top-1/2">SCALE: 1:1</Annotation>
      <Annotation x="left-4" y="top-3/4">SHEET 1 OF 1</Annotation>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-12 py-4 bg-[#1a365d]/90 backdrop-blur border-b border-white/10">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-sm text-white/60 hover:text-white transition-colors">
            ← RETURN TO INDEX
          </Link>
          <div className="flex items-center gap-6 text-xs text-white/40">
            <span>DWG: PORTFOLIO-001</span>
            <span>DATE: {new Date().toISOString().split('T')[0]}</span>
          </div>
        </div>
      </header>

      <main className="relative z-10 pt-24 px-4 md:px-12 pb-20 max-w-6xl mx-auto">
        {/* Title block */}
        <section className="py-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <TechnicalBox label="TITLE BLOCK">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="text-xs text-white/40 mb-2">SUBJECT NAME</div>
                  <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                    SINA
                    <br />
                    DILEK
                  </h1>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-white/40 mb-1">CLASSIFICATION</div>
                    <div className="text-lg">COMPUTER SCIENCE STUDENT</div>
                  </div>
                  <div>
                    <div className="text-xs text-white/40 mb-1">INSTITUTION</div>
                    <div className="text-lg">UNIVERSITY OF ESSEX</div>
                  </div>
                  <div>
                    <div className="text-xs text-white/40 mb-1">PERFORMANCE RATING</div>
                    <div className="text-lg">96/100 — FIRST CLASS</div>
                  </div>
                  <div>
                    <div className="text-xs text-white/40 mb-1">STATUS</div>
                    <div className="text-lg text-green-400">● AVAILABLE FOR HIRE</div>
                  </div>
                </div>
              </div>
            </TechnicalBox>
          </motion.div>
        </section>

        {/* Dimension line */}
        <div className="py-4">
          <DimensionLine label="CAPABILITIES SECTION" />
        </div>

        {/* Skills */}
        <section className="py-8">
          <TechnicalBox label="SKILL SPECIFICATIONS">
            <div className="grid md:grid-cols-3 gap-6">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="relative"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/80">{skill.name}</span>
                    <span className="text-xs text-white/40">{skill.years}yr exp.</span>
                  </div>
                  <div className="h-2 bg-white/10 relative">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(skill.years / 4) * 100}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      className="absolute inset-y-0 left-0 bg-white/60"
                    />
                    {/* Tick marks */}
                    {[...Array(4)].map((_, j) => (
                      <div 
                        key={j} 
                        className="absolute top-full h-1 w-px bg-white/30"
                        style={{ left: `${(j + 1) * 25}%` }}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </TechnicalBox>
        </section>

        {/* Dimension line */}
        <div className="py-4">
          <DimensionLine label="PROJECT REGISTRY" />
        </div>

        {/* Projects */}
        <section className="py-8">
          <TechnicalBox label="PROJECT SCHEDULE">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20 text-left text-white/40">
                    <th className="pb-3 pr-4">DWG NO.</th>
                    <th className="pb-3 pr-4">PROJECT NAME</th>
                    <th className="pb-3 pr-4">TYPE</th>
                    <th className="pb-3">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project, i) => (
                    <motion.tr
                      key={project.id}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="border-b border-white/10 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-4 pr-4 text-white/50">{project.id}</td>
                      <td className="py-4 pr-4 text-white">{project.name}</td>
                      <td className="py-4 pr-4 text-white/60">{project.type}</td>
                      <td className="py-4">
                        <span className="inline-flex items-center gap-2 text-green-400">
                          <span className="w-2 h-2 bg-green-400" />
                          {project.status}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TechnicalBox>
        </section>

        {/* Dimension line */}
        <div className="py-4">
          <DimensionLine label="CONTACT DETAILS" />
        </div>

        {/* Contact */}
        <section className="py-8">
          <TechnicalBox label="COMMUNICATION PORTS">
            <div className="grid md:grid-cols-2 gap-6">
              <motion.a
                href="https://github.com/noxire-dev"
                target="_blank"
                rel="noopener"
                whileHover={{ x: 5 }}
                className="group p-4 border border-white/20 hover:border-white/50 transition-colors"
              >
                <div className="text-xs text-white/40 mb-2">PORT: GITHUB</div>
                <div className="text-lg text-white/80 group-hover:text-white transition-colors">
                  github.com/noxire-dev
                  <span className="ml-2 text-white/40 group-hover:text-white/60">→</span>
                </div>
              </motion.a>
              
              <motion.a
                href="https://linkedin.com/in/sina-dilek-0b1b3b1b9"
                target="_blank"
                rel="noopener"
                whileHover={{ x: 5 }}
                className="group p-4 border border-white/20 hover:border-white/50 transition-colors"
              >
                <div className="text-xs text-white/40 mb-2">PORT: LINKEDIN</div>
                <div className="text-lg text-white/80 group-hover:text-white transition-colors">
                  linkedin.com/sina-dilek
                  <span className="ml-2 text-white/40 group-hover:text-white/60">→</span>
                </div>
              </motion.a>
            </div>
          </TechnicalBox>
        </section>

        {/* Footer / Revision block */}
        <footer className="py-12">
          <div className="border border-white/20 p-4">
            <div className="grid grid-cols-4 gap-4 text-xs text-white/40">
              <div>
                <div className="mb-1">DRAWN BY</div>
                <div className="text-white/60">SINA DILEK</div>
              </div>
              <div>
                <div className="mb-1">CHECKED BY</div>
                <div className="text-white/60">—</div>
              </div>
              <div>
                <div className="mb-1">DATE</div>
                <div className="text-white/60">{new Date().toISOString().split('T')[0]}</div>
              </div>
              <div>
                <div className="mb-1">REVISION</div>
                <div className="text-white/60">R01</div>
              </div>
            </div>
          </div>
          
          <p className="text-center text-xs text-white/30 mt-8">
            © {new Date().getFullYear()} SINA DILEK | ALL DIMENSIONS IN PIXELS | DO NOT SCALE
          </p>
        </footer>
      </main>
    </div>
  )
}
