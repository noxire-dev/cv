import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'

// Design 37: PASTEL BRUTALIST DARK ★ NEW ★
// Brutalist geometry + dark mode by default + lime + lavender + mint pastels
// Inspired by favs: Pastel Brutalist Midnight (26), Y2K Swiss (28), Lunar Brutalism (36)
// Raw typography, exposed grid, bold shapes — but soft pastel accents

const LIME = '#C3FF00'
const LAVENDER = '#CDB4DB'
const MINT = '#98D8C8'
const BG = '#0A0A0A'
const SURFACE = '#111111'
const BORDER = '#1E1E1E'
const TEXT = '#E8E8E8'
const MUTED = '#666666'

const PROJECTS = [
  { title: 'GoSH', category: 'Systems', year: '2025', link: 'https://github.com/noxire-dev/GoSH', accent: LIME },
  { title: 'Moji', category: 'Web App', year: '2025', link: 'https://github.com/noxire-dev/moji', accent: LAVENDER },
  { title: 'LoreKeeper', category: 'Platform', year: '2025', link: 'https://github.com/noxire-dev/LoreKeeper', accent: MINT },
  { title: 'Midnight Moon', category: 'Design', year: '2024', link: 'https://github.com/noxire-dev/midnight-theme', accent: LAVENDER },
]

const SKILLS = ['Python', 'Go', 'Java', 'TypeScript', 'React', 'Flask', 'C', 'PostgreSQL']

export default function Design37() {
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 600], [0, 120])
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.3])

  return (
    <div className="min-h-screen font-mono selection:bg-[#C3FF00] selection:text-black" style={{ background: BG, color: TEXT }}>
      {/* Grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(${BORDER} 1px, transparent 1px), linear-gradient(90deg, ${BORDER} 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b" style={{ borderColor: BORDER, background: `${BG}ee`, backdropFilter: 'blur(12px)' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 border-2 flex items-center justify-center font-black text-xs transition-colors group-hover:bg-[#C3FF00] group-hover:border-[#C3FF00] group-hover:text-black" style={{ borderColor: LIME, color: LIME }}>
              SD
            </div>
            <span className="text-sm tracking-[0.2em] hidden md:block" style={{ color: MUTED }}>SINA DILEK</span>
          </Link>
          <div className="flex items-center gap-6 text-xs tracking-widest">
            <a href="#work" style={{ color: MUTED }} className="hover:text-[#C3FF00] transition-colors">WORK</a>
            <a href="#skills" style={{ color: MUTED }} className="hover:text-[#CDB4DB] transition-colors">SKILLS</a>
            <a href="#contact" style={{ color: MUTED }} className="hover:text-[#98D8C8] transition-colors">CONTACT</a>
            <Link to="/" style={{ color: MUTED }} className="hover:opacity-80">←</Link>
          </div>
        </div>
      </nav>

      {/* Hero — split with pastel blocks */}
      <section className="relative min-h-screen flex flex-col justify-end pb-24 overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            {/* Top bar */}
            <div className="flex justify-between items-center mb-12 pb-6 border-b" style={{ borderColor: BORDER }}>
              <span className="text-xs tracking-[0.3em]" style={{ color: MUTED }}>DEVELOPER</span>
              <span className="text-xs tracking-[0.3em]" style={{ color: LIME }}>AVAILABLE</span>
              <span className="text-xs tracking-[0.3em]" style={{ color: MUTED }}>2026</span>
            </div>

            {/* Name — brutalist blocks */}
            <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-12">
              <h1 className="text-[clamp(4rem,15vw,12rem)] font-black leading-[0.85] tracking-tighter uppercase">
                <span className="block">SINA</span>
                <span className="block">DILEK</span>
              </h1>
              <div className="flex gap-4">
                <div className="w-16 h-16 md:w-24 md:h-24 border-2 flex items-center justify-center" style={{ borderColor: LIME, background: `${LIME}15` }} />
                <div className="w-16 h-16 md:w-24 md:h-24 border-2 flex items-center justify-center" style={{ borderColor: LAVENDER, background: `${LAVENDER}15` }} />
                <div className="w-16 h-16 md:w-24 md:h-24 border-2 flex items-center justify-center" style={{ borderColor: MINT, background: `${MINT}15` }} />
              </div>
            </div>

            {/* Tagline */}
            <p className="mt-12 text-xl md:text-2xl max-w-2xl leading-relaxed" style={{ color: MUTED }}>
              Product-minded frontend developer. Systems programming. Building tools that ship.
            </p>
          </div>
        </motion.div>

        {/* Pastel diagonal blocks — decorative */}
        <div className="absolute top-1/4 right-0 w-[40vw] h-[40vw] -skew-x-12 opacity-20" style={{ background: LAVENDER }} />
        <div className="absolute bottom-1/4 left-0 w-[30vw] h-[30vw] skew-x-12 opacity-20" style={{ background: LIME }} />
      </section>

      {/* Projects */}
      <section id="work" className="relative py-32 px-6 md:px-12 border-t" style={{ borderColor: BORDER }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <span className="text-xs" style={{ color: LIME }}>01</span>
            <div className="w-12 h-px" style={{ background: BORDER }} />
            <span className="text-xs tracking-[0.3em]" style={{ color: MUTED }}>SELECTED WORK</span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {PROJECTS.map((project, i) => (
              <motion.a
                key={i}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5 }}
                className="group block p-8 border-2 transition-all duration-300 hover:translate-x-2"
                style={{
                  borderColor: BORDER,
                  background: SURFACE,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = project.accent
                  e.currentTarget.style.background = `${project.accent}08`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = BORDER
                  e.currentTarget.style.background = SURFACE
                }}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs tracking-widest" style={{ color: project.accent }}>[{project.category}]</span>
                  <span className="text-sm" style={{ color: MUTED }}>{project.year}</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-2 group-hover:translate-x-1 transition-transform">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 text-sm" style={{ color: project.accent }}>
                  <span>View on GitHub</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Skills — marquee-style */}
      <section id="skills" className="relative py-24 overflow-hidden border-t border-b" style={{ borderColor: BORDER }}>
        <div className="flex items-center gap-4 mb-12 px-6 md:px-12">
          <span className="text-xs" style={{ color: LAVENDER }}>02</span>
          <div className="w-12 h-px" style={{ background: BORDER }} />
          <span className="text-xs tracking-[0.3em]" style={{ color: MUTED }}>TECH STACK</span>
        </div>
        <div className="flex whitespace-nowrap gap-8 overflow-hidden">
          <motion.div
            animate={{ x: [0, -1200] }}
            transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
            className="flex gap-8"
          >
            {[...SKILLS, ...SKILLS, ...SKILLS].map((skill, i) => (
              <span
                key={i}
                className="text-4xl md:text-6xl font-black uppercase text-transparent"
                style={{ WebkitTextStroke: `2px ${BORDER}`, color: 'transparent' }}
              >
                {skill}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact — pastel CTA block */}
      <footer id="contact" className="relative py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <span className="text-xs" style={{ color: MINT }}>03</span>
            <div className="w-12 h-px" style={{ background: BORDER }} />
            <span className="text-xs tracking-[0.3em]" style={{ color: MUTED }}>GET IN TOUCH</span>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-12 border-2" style={{ borderColor: LIME, background: `${LIME}10` }}>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
                LET'S<br />TALK.
              </h2>
              <a
                href="mailto:contact@sinadilek.com"
                className="inline-block text-xl font-bold border-b-2 py-2 transition-colors hover:bg-[#C3FF00] hover:text-black hover:border-transparent"
                style={{ borderColor: LIME, color: LIME }}
              >
                contact@sinadilek.com
              </a>
            </div>
            <div className="p-12 border-2 flex flex-col justify-between" style={{ borderColor: LAVENDER, background: `${LAVENDER}10` }}>
              <div className="flex gap-6">
                <a
                  href="https://github.com/noxire-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 border-2 flex items-center justify-center transition-colors hover:bg-[#CDB4DB] hover:text-black"
                  style={{ borderColor: LAVENDER }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4" />
                    <path d="M9 20c-5 1.5-5-2.5-7-3" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/in/sina-dilek-0b1b3b1b9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 border-2 flex items-center justify-center transition-colors hover:bg-[#CDB4DB] hover:text-black"
                  style={{ borderColor: LAVENDER }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
              <p className="text-sm mt-8" style={{ color: MUTED }}>
                © {new Date().getFullYear()} Sina Dilek
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
