import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// Design 9: NEWSPAPER BROADSHEET
// Old newspaper layout, multiple columns, serif headlines, newsprint texture
// Inspired by The New York Times, classic broadsheets, Victorian typography

const projects = [
  { name: 'GoSH', desc: 'A remarkable new shell implementation written entirely in the Go programming language, designed for educational purposes and demonstrating core systems programming concepts.' },
  { name: 'Moji', desc: 'An innovative note-taking and task management application with particular emphasis on user interface and experience design principles.' },
  { name: 'LoreKeeper', desc: 'A comprehensive e-commerce platform dedicated to the distribution of free tabletop role-playing game materials.' },
  { name: 'Midnight Moon', desc: 'A curated collection of carefully crafted visual themes for the Visual Studio Code editor.' },
]

const skills = ['Python', 'Go', 'Java', 'JavaScript', 'TypeScript', 'C', 'Flask', 'React']

function NewsprintTexture() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Paper color */}
      <div className="absolute inset-0" style={{ backgroundColor: '#f4f1ea' }} />
      
      {/* Newsprint texture */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  )
}

function Masthead() {
  const today = new Date()
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  const dateString = today.toLocaleDateString('en-US', options)

  return (
    <header className="border-b-2 border-black pt-4 pb-6">
      <div className="flex items-center justify-between text-xs mb-4">
        <span>"All the Code That's Fit to Ship"</span>
        <span>{dateString}</span>
        <span>VOL. MMXXV, No. 1</span>
      </div>
      
      <div className="text-center border-y-4 border-double border-black py-4">
        <h1 className="text-6xl md:text-8xl font-editorial tracking-tight">
          The Dilek Chronicle
        </h1>
      </div>
      
      <div className="flex items-center justify-between text-xs mt-4">
        <span>ESSEX EDITION</span>
        <span>PRICE: FREE</span>
      </div>
    </header>
  )
}

function DropCap({ children }: { children: string }) {
  const firstLetter = children[0]
  const rest = children.slice(1)
  
  return (
    <p className="text-justify leading-relaxed">
      <span className="float-left text-6xl font-editorial leading-none mr-2 mt-1">
        {firstLetter}
      </span>
      {rest}
    </p>
  )
}

export default function Design9() {
  return (
    <div className="min-h-screen text-neutral-900 font-serif selection:bg-neutral-900 selection:text-white">
      <NewsprintTexture />

      {/* Back link */}
      <nav className="fixed top-4 left-4 z-50">
        <Link 
          to="/" 
          className="text-sm hover:underline"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          ← Return to Index
        </Link>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-8">
        <Masthead />

        {/* Main headline */}
        <section className="py-8 border-b border-black">
          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-8">
              <motion.article
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl md:text-5xl font-editorial leading-tight mb-4">
                  SINA DILEK ACHIEVES FIRST CLASS HONOURS
                  IN COMPUTER SCIENCE STUDIES
                </h2>
                <p className="text-lg italic text-neutral-600 mb-6 border-l-2 border-black pl-4">
                  University of Essex student scores remarkable 96/100, 
                  demonstrates exceptional aptitude in systems programming
                </p>
                
                <div className="columns-1 md:columns-2 gap-8 text-sm leading-relaxed">
                  <DropCap>
                    {`COLCHESTER — In a remarkable display of academic excellence, Sina Dilek has completed the first year of studies at the University of Essex with an outstanding score of 96 out of 100, earning First Class Honours distinction. The Computer Science student has demonstrated particular proficiency in systems programming and software development.`}
                  </DropCap>
                  
                  <p className="text-justify mt-4">
                    "Building small tools and learning systems has always been my passion," 
                    Dilek remarked in a recent interview. "The journey started with Python 
                    and has since expanded to include Go, Java, JavaScript, and most 
                    recently, C programming."
                  </p>
                  
                  <p className="text-justify mt-4">
                    Industry observers note that Dilek's portfolio includes several 
                    notable projects, ranging from shell implementations to e-commerce 
                    platforms, demonstrating a versatile approach to software engineering.
                  </p>
                </div>
              </motion.article>
            </div>
            
            <div className="md:col-span-4 border-l border-black pl-8">
              <div className="text-xs uppercase tracking-widest mb-4">Employment Status</div>
              <div className="p-4 border-2 border-black bg-white mb-6">
                <div className="text-2xl font-editorial text-center">
                  OPEN TO
                  <br />
                  OPPORTUNITIES
                </div>
              </div>
              
              <div className="text-xs uppercase tracking-widest mb-4">Technical Proficiencies</div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span 
                    key={skill}
                    className="px-2 py-1 border border-black text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects section */}
        <section className="py-8">
          <h2 className="text-2xl font-editorial border-b-2 border-black pb-2 mb-6">
            FEATURED PROJECTS
          </h2>
          
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
            {projects.map((project, i) => (
              <motion.article
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="border-b border-neutral-300 pb-6"
              >
                <h3 className="text-xl font-editorial mb-2">{project.name}</h3>
                <p className="text-sm text-justify leading-relaxed text-neutral-700">
                  {project.desc}
                </p>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Classified ads style contact */}
        <section className="py-8 border-t-2 border-black">
          <h2 className="text-lg font-editorial border-b border-black pb-2 mb-6 text-center">
            — CLASSIFIEDS & CONNECTIONS —
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div className="border border-black p-4">
              <div className="font-bold mb-2 text-center border-b border-black pb-2">
                GITHUB
              </div>
              <p className="text-center text-xs leading-relaxed">
                View complete portfolio of work and contributions.
                Visit: github.com/noxire-dev
              </p>
              <motion.a
                href="https://github.com/noxire-dev"
                target="_blank"
                rel="noopener"
                whileHover={{ scale: 1.02 }}
                className="block mt-4 text-center py-2 bg-black text-white text-xs"
              >
                VISIT NOW →
              </motion.a>
            </div>
            
            <div className="border border-black p-4">
              <div className="font-bold mb-2 text-center border-b border-black pb-2">
                LINKEDIN
              </div>
              <p className="text-center text-xs leading-relaxed">
                Professional networking and career inquiries welcome.
                Connect for opportunities.
              </p>
              <motion.a
                href="https://linkedin.com/in/sina-dilek-0b1b3b1b9"
                target="_blank"
                rel="noopener"
                whileHover={{ scale: 1.02 }}
                className="block mt-4 text-center py-2 bg-black text-white text-xs"
              >
                CONNECT →
              </motion.a>
            </div>
            
            <div className="border border-black p-4">
              <div className="font-bold mb-2 text-center border-b border-black pb-2">
                HIRING?
              </div>
              <p className="text-center text-xs leading-relaxed">
                Currently seeking internships and junior developer positions.
                Eager to contribute and learn.
              </p>
              <div className="mt-4 text-center py-2 border border-black text-xs">
                AVAILABLE NOW
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-6 border-t-2 border-double border-black text-center">
          <p className="text-xs text-neutral-600 italic">
            "In the realm of code, clarity is king and bugs are but temporary setbacks."
          </p>
          <p className="text-xs mt-4">
            © {new Date().getFullYear()} The Dilek Chronicle. All Rights Reserved.
          </p>
        </footer>
      </main>
    </div>
  )
}
