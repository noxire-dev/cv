import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// Design 7: INDUSTRIAL MINIMAL
// Stark, utilitarian, exposed grid system, raw materials aesthetic
// Inspired by factories, warehouses, exposed infrastructure

const projects = [
  { id: 'PRJ-001', name: 'GoSH', desc: 'Shell written in Go', status: 'OPERATIONAL' },
  { id: 'PRJ-002', name: 'Moji', desc: 'Note taking app', status: 'OPERATIONAL' },
  { id: 'PRJ-003', name: 'LoreKeeper', desc: 'RPG marketplace', status: 'OPERATIONAL' },
  { id: 'PRJ-004', name: 'Midnight Moon', desc: 'VSCode themes', status: 'OPERATIONAL' },
]

const skills = [
  { name: 'Python', level: 90 },
  { name: 'Go', level: 75 },
  { name: 'Java', level: 70 },
  { name: 'JavaScript', level: 85 },
  { name: 'TypeScript', level: 80 },
  { name: 'C', level: 60 },
]

function GridOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Main grid */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />
      {/* Major grid lines */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }}
      />
    </div>
  )
}

function DataLabel({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div className="border-l-2 border-neutral-900 pl-3">
      <div className="text-[10px] tracking-widest text-neutral-400 uppercase">{label}</div>
      <div className="text-lg font-bold text-neutral-900">
        {value}
        {unit && <span className="text-sm font-normal text-neutral-500 ml-1">{unit}</span>}
      </div>
    </div>
  )
}

function ProgressBar({ value, label }: { value: number; label: string }) {
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-mono">{label}</span>
        <span className="text-xs text-neutral-400 font-mono">{value}%</span>
      </div>
      <div className="h-2 bg-neutral-200 relative overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="absolute inset-y-0 left-0 bg-neutral-900 group-hover:bg-red-600 transition-colors"
        />
        {/* Grid marks */}
        <div className="absolute inset-0 flex">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex-1 border-r border-white/50 last:border-0" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Design7() {
  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900 font-mono selection:bg-neutral-900 selection:text-neutral-100">
      <GridOverlay />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-neutral-100/90 backdrop-blur border-b border-neutral-300">
        <div className="flex items-center justify-between px-4 md:px-8 py-4">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-sm hover:text-red-600 transition-colors">
              ← BACK
            </Link>
            <div className="hidden md:block h-4 w-px bg-neutral-300" />
            <span className="hidden md:block text-xs text-neutral-400">REF: PORTFOLIO-2025</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-xs text-neutral-400">DESIGN 07</span>
            <div className="w-3 h-3 bg-red-600" />
          </div>
        </div>
      </header>

      <main className="relative z-10 pt-20">
        {/* Hero */}
        <section className="px-4 md:px-8 py-20 border-b border-neutral-300">
          <div className="max-w-6xl mx-auto">
            {/* Reference number */}
            <div className="text-xs text-neutral-400 mb-8">
              UNIT: SD-001 | CLASS: DEVELOPER | STATUS: ACTIVE
            </div>

            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 md:col-span-8">
                <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tighter mb-8">
                  SINA
                  <br />
                  DILEK
                </h1>
                
                <p className="text-lg text-neutral-600 max-w-md leading-relaxed">
                  Building small tools and learning systems. 
                  Computer Science student focused on practical, 
                  purposeful code.
                </p>
              </div>
              
              <div className="col-span-12 md:col-span-4 space-y-6">
                <DataLabel label="Institution" value="University of Essex" />
                <DataLabel label="Program" value="BSc Computer Science" />
                <DataLabel label="Performance" value="96" unit="/ 100" />
                <DataLabel label="Status" value="Open to Work" />
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="px-4 md:px-8 py-20 border-b border-neutral-300 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 md:col-span-3">
                <div className="text-xs text-neutral-400 mb-2">SECTION 01</div>
                <h2 className="text-2xl font-bold">CAPABILITIES</h2>
              </div>
              
              <div className="col-span-12 md:col-span-9">
                <div className="grid gap-4">
                  {skills.map((skill, i) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <ProgressBar value={skill.level} label={skill.name} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="px-4 md:px-8 py-20 border-b border-neutral-300">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-12 gap-8 mb-12">
              <div className="col-span-12 md:col-span-3">
                <div className="text-xs text-neutral-400 mb-2">SECTION 02</div>
                <h2 className="text-2xl font-bold">PROJECTS</h2>
              </div>
            </div>

            <div className="border border-neutral-300">
              {/* Table header */}
              <div className="grid grid-cols-12 gap-4 p-4 bg-neutral-200 text-xs font-bold border-b border-neutral-300">
                <div className="col-span-2">REF</div>
                <div className="col-span-3">NAME</div>
                <div className="col-span-4">DESCRIPTION</div>
                <div className="col-span-3">STATUS</div>
              </div>
              
              {/* Table rows */}
              {projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="grid grid-cols-12 gap-4 p-4 border-b border-neutral-200 last:border-0 hover:bg-neutral-50 cursor-pointer group"
                >
                  <div className="col-span-2 text-xs text-neutral-400">{project.id}</div>
                  <div className="col-span-3 font-bold group-hover:text-red-600 transition-colors">{project.name}</div>
                  <div className="col-span-4 text-neutral-600 text-sm">{project.desc}</div>
                  <div className="col-span-3">
                    <span className="inline-flex items-center gap-2 text-xs">
                      <span className="w-2 h-2 bg-green-500 rounded-full" />
                      {project.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="px-4 md:px-8 py-20 bg-neutral-900 text-neutral-100">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 md:col-span-6">
                <div className="text-xs text-neutral-500 mb-2">SECTION 03</div>
                <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-8">
                  ESTABLISH
                  <br />
                  <span className="text-neutral-500">CONNECTION</span>
                </h2>
              </div>
              
              <div className="col-span-12 md:col-span-6 md:flex md:items-end">
                <div className="space-y-4 w-full">
                  <motion.a
                    href="https://github.com/noxire-dev"
                    target="_blank"
                    rel="noopener"
                    whileHover={{ x: 10 }}
                    className="group flex items-center justify-between p-4 border border-neutral-700 hover:border-neutral-500 hover:bg-neutral-800 transition-all"
                  >
                    <span className="text-sm">GITHUB</span>
                    <span className="text-neutral-500 group-hover:text-white transition-colors">→</span>
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com/in/sina-dilek-0b1b3b1b9"
                    target="_blank"
                    rel="noopener"
                    whileHover={{ x: 10 }}
                    className="group flex items-center justify-between p-4 border border-neutral-700 hover:border-neutral-500 hover:bg-neutral-800 transition-all"
                  >
                    <span className="text-sm">LINKEDIN</span>
                    <span className="text-neutral-500 group-hover:text-white transition-colors">→</span>
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-4 md:px-8 py-6 bg-neutral-900 border-t border-neutral-800">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500">
            <span>© {new Date().getFullYear()} SINA DILEK</span>
            <span>MANUFACTURED WITH PRECISION</span>
          </div>
        </footer>
      </main>
    </div>
  )
}
