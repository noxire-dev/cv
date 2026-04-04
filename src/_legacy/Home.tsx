import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Home() {
  const setOne = [
    { path: '/1', name: 'Muted Brutalist', desc: 'Earthy tones, concrete texture, raw typography', fav: true },
    { path: '/2', name: 'Dark Editorial', desc: 'Sophisticated typography, dark moody palette', fav: false },
    { path: '/3', name: 'Neo-Punk Zine', desc: 'Cut-and-paste chaos, editorial type', fav: true },
    { path: '/4', name: 'Monochrome Constructivist', desc: 'Bold geometric, black/white/red', fav: true },
    { path: '/5', name: 'Warm Maximalist', desc: 'Chaos with warm palette', fav: false },
  ]

  const setTwo = [
    { path: '/6', name: 'Brutalist Terminal', desc: 'CRT monitor, command line, hacker vibes', fav: true },
    { path: '/7', name: 'Industrial Minimal', desc: 'Stark, utilitarian, exposed grid', fav: false },
    { path: '/8', name: 'Glitch Noir', desc: 'Dark corrupted aesthetics, data viz', fav: true },
    { path: '/9', name: 'Newspaper Broadsheet', desc: 'Old newspaper columns, newsprint', fav: false },
    { path: '/10', name: 'Architectural Blueprint', desc: 'Technical drawings, annotations', fav: false },
  ]

  const setThree = [
    { path: '/11', name: 'Amber Terminal', desc: 'Warm terminal + brutalist fusion, phosphor glow', fav: false },
    { path: '/12', name: 'Kinetic Constructivist', desc: 'Bold geometry with intense scroll animations', fav: true },
    { path: '/13', name: 'Dark Punk Collage', desc: 'Punk zine chaos meets glitch noir darkness', fav: false },
    { path: '/14', name: 'Typographic Manifesto', desc: 'Pure typography power, kinetic text', fav: false },
    { path: '/15', name: 'The Masterpiece', desc: 'Best of everything - the final form', fav: true },
  ]

  const setFour = [
    { path: '/16', name: 'Complete Brutalist', desc: 'Full system with blog & project pages', fav: false },
    { path: '/17', name: 'Modular Grid', desc: 'Card-based layout with detail views', fav: false },
    { path: '/18', name: 'Split Constructivist', desc: 'Asymmetric with complete pages', fav: true },
    { path: '/19', name: 'Minimal Brutalist', desc: 'Refined, readable, complete system', fav: false },
    { path: '/20', name: 'The Portfolio', desc: 'Production-ready with all pages', fav: false },
  ]

  // REMASTERED - Based on feedback: 4, 12, 15, 18 with full pages + Joker
  const remastered = [
    { path: '/21', name: 'Monochrome Constructivist RM', desc: 'Remaster of #4 with full blog & project pages', fav: true, original: '4' },
    { path: '/22', name: 'Kinetic Constructivist RM', desc: 'Remaster of #12 with complete page system', fav: true, original: '12' },
    { path: '/23', name: 'The Masterpiece RM', desc: 'Remaster of #15 - RECOMMENDED ★', fav: true, original: '15' },
    { path: '/24', name: 'Split Constructivist RM', desc: 'Remaster of #18 with refined UI', fav: true, original: '18' },
    { path: '/25', name: 'Terminal Brutalist (Joker)', desc: 'NEW — Hacker aesthetic, terminal UI, glitch effects', fav: false, original: 'NEW' },
  ]

  // EXPERIMENTAL — New direction
  const experimental = [
    { path: '/26', name: 'Pastel Brutalist Midnight', desc: 'Lavender on midnight — bold shapes, soft palette, full pages', fav: true },
    { path: '/27', name: 'The Recruiter Killer', desc: 'Strict rulebook design — case studies, impact statements, 10-second clarity', fav: true },
  ]

  const y2k = [
    { path: '/28', name: 'Y2K Swiss Brutalist', desc: 'FROM SCRATCH — Swiss grid + Y2K digital + lime #C3FF00, pixel accents, scan line', fav: true, original: 'NEW' },
    { path: '/29', name: 'Y2K Constructivist', desc: 'Design 4 DNA — bold geometric shapes, lime circle, split layout, marquee', fav: true, original: '4' },
    { path: '/30', name: 'Y2K Kinetic', desc: 'Design 12 DNA — scroll animations, sticky hero, rotating diagonal, spring physics', fav: true, original: '12' },
    { path: '/31', name: 'Y2K Masterpiece', desc: 'Design 15 DNA — dark atmosphere, mouse gradient, glitch text, skill bars', fav: true, original: '15' },
    { path: '/32', name: 'SYSTEM_032', desc: 'TRUE ORIGINAL — Dashboard OS, grid coordinates, horizontal gallery, bar chart, panel UI', fav: true, original: 'NEW' },
  ]

  const cinematic = [
    { path: '/33', name: 'Obsidian Glass', desc: 'Apple/Linear aesthetic. Frosted glass, deep contrast, premium.', fav: true, original: 'NEW' },
    { path: '/34', name: 'Neon Void', desc: 'Vercel/Cyberpunk aesthetic. Matrix green, matte black, hacker vibes.', fav: true, original: 'NEW' },
    { path: '/35', name: 'Ethereal Nebula', desc: 'Web3/Creative aesthetic. Fluid glows, deep midnight blue, magical.', fav: true, original: 'NEW' },
    { path: '/36', name: 'Lunar Brutalism', desc: 'Awwwards Avant-Garde. Graphite, huge borders, blazing orange.', fav: true, original: 'NEW' },
  ]

  const pastelBrutalist = [
    { path: '/37', name: 'Pastel Brutalist Dark', desc: 'Brutalist + dark mode + lime + lavender + mint pastels. Raw geometry, soft accents.', fav: true, original: 'NEW' },
  ]

  const finalBatch = [
    { path: '/38', name: 'SYSTEM_052', desc: 'Dashboard OS with coral #FF6B6B — panels, bar charts, coordinates, horizontal gallery. Full system.', fav: true, accent: '#FF6B6B' },
    { path: '/39', name: 'Concrete Rose', desc: 'Constructivist brutalist with dusty rose #E0A8BE — split layouts, diagonal shapes, kinetic scroll.', fav: true, accent: '#E0A8BE' },
    { path: '/40', name: 'Arctic Grid', desc: 'Swiss minimal with ice blue #7DD3FC — ultra-clean, precise, cold. Light typography, thin bars.', fav: true, accent: '#7DD3FC' },
    { path: '/41', name: 'Neon Flora', desc: 'Punk glitch with hot pink #FF2D8A — mouse-reactive gradient, glitch text, marquee, loud.', fav: true, accent: '#FF2D8A' },
  ]

  const hybridBatch = [
    { path: '/42', name: 'Signal Brutalist', desc: '21 + 23 + 26 - constructivist shell, pastel midnight mood, clearer project framing.', accent: '#B48AC8' },
    { path: '/43', name: 'Operator Lavender', desc: '23 + 26 + 32 - recruiter-first layout with panel logic and restrained system styling.', accent: '#CDB4DB' },
    { path: '/44', name: 'Gridframe Construct', desc: '21 + 23 + 32 - dashboard coordinates, hard geometry, sharper technical tone.', accent: '#C3FF00' },
    { path: '/45', name: 'Midnight Orbit', desc: '23 + 26 + 32 - soft midnight palette, rounded system cards, premium but readable.', accent: '#E7D8F0' },
    { path: '/46', name: 'Runtime Slate', desc: 'zed.dev inspired - dark editor shell adapted into a more personal CV layout.', accent: '#D0FF71' },
    { path: '/47', name: 'SYSTEM_052 Lavender', desc: '38 + 26 — dashboard OS structure with lavender midnight palette. Fixed readability throughout.', accent: '#CDB4DB' },
    { path: '/48', name: 'Quiet Terminal Ritual', desc: 'legacy python DNA - terminal intro, layered mono hero, personal dev-space feel.', accent: '#D6FF72' },
    { path: '/49', name: 'MASTER — SYS_052 v2', desc: '47 evolved — scrolling coord rail, grid aligned to indicators, readability bumps throughout.', accent: '#CDB4DB' },
  ]

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 font-sans">
            Sina Dilek
          </h1>
          <p className="text-xl text-gray-400 mb-12">
            Portfolio Design Explorations
          </p>
        </motion.div>

        {/* Set One */}
        <div className="mb-16">
          <h2 className="text-sm tracking-widest text-gray-500 mb-6">SET ONE</h2>
          <div className="grid gap-3">
            {setOne.map((design, i) => (
              <motion.div
                key={design.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  to={design.path}
                  className={`group block p-5 border transition-all duration-300 hover:bg-white hover:text-black ${
                    design.fav ? 'border-green-500' : 'border-gray-800 hover:border-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-gray-500">0{i + 1}</span>
                      {design.fav && <span className="text-green-500 text-xs">★ FAV</span>}
                      <span className="text-lg font-bold">{design.name}</span>
                    </div>
                    <span className="text-xl group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1 group-hover:text-gray-600 pl-8">
                    {design.desc}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Set Two */}
        <div className="mb-16">
          <h2 className="text-sm tracking-widest text-gray-500 mb-6">SET TWO</h2>
          <div className="grid gap-3">
            {setTwo.map((design, i) => (
              <motion.div
                key={design.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: (i + 5) * 0.1 }}
              >
                <Link
                  to={design.path}
                  className={`group block p-5 border transition-all duration-300 hover:bg-white hover:text-black ${
                    design.fav ? 'border-green-500' : 'border-gray-800 hover:border-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-gray-500">{String(i + 6).padStart(2, '0')}</span>
                      {design.fav && <span className="text-green-500 text-xs">★ FAV</span>}
                      <span className="text-lg font-bold">{design.name}</span>
                    </div>
                    <span className="text-xl group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1 group-hover:text-gray-600 pl-8">
                    {design.desc}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Set Three */}
        <div className="mb-16">
          <h2 className="text-sm tracking-widest text-gray-500 mb-6">SET THREE</h2>
          <div className="grid gap-3">
            {setThree.map((design, i) => (
              <motion.div
                key={design.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: (i + 10) * 0.1 }}
              >
                <Link
                  to={design.path}
                  className={`group block p-5 border transition-all duration-300 hover:bg-white hover:text-black ${
                    design.fav ? 'border-green-500' : 'border-gray-800 hover:border-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-gray-500">{String(i + 11).padStart(2, '0')}</span>
                      {design.fav && <span className="text-green-500 text-xs">★ FAV</span>}
                      <span className="text-lg font-bold">{design.name}</span>
                    </div>
                    <span className="text-xl group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1 group-hover:text-gray-600 pl-8">
                    {design.desc}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Set Four - COMPLETE SYSTEMS */}
        <div className="mb-16">
          <h2 className="text-sm tracking-widest mb-6">
            <span className="text-red-500">★ SET FOUR — COMPLETE SYSTEMS ★</span>
          </h2>
          <p className="text-xs text-gray-600 mb-6">Full portfolio designs with blog posts, project detail pages, and complete navigation</p>
          <div className="grid gap-3">
            {setFour.map((design, i) => (
              <motion.div
                key={design.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: (i + 15) * 0.1 }}
              >
                <Link
                  to={design.path}
                  className={`group block p-5 border transition-all duration-300 hover:bg-red-500 hover:text-white ${
                    design.fav ? 'border-green-500' : 'border-red-500/50 hover:border-red-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-red-500/70">{String(i + 16).padStart(2, '0')}</span>
                      {design.fav && <span className="text-green-500 text-xs">★ FAV</span>}
                      <span className="text-lg font-bold">{design.name}</span>
                    </div>
                    <span className="text-xl group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1 group-hover:text-red-100 pl-8">
                    {design.desc}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* REMASTERED — The Final Four */}
        <div>
          <h2 className="text-sm tracking-widest mb-6">
            <span className="text-amber-400">★★★ REMASTERED — THE FINAL FOUR ★★★</span>
          </h2>
          <p className="text-xs text-gray-500 mb-6">
            Based on feedback: Designs 4, 12, 15, 18 remastered with full blog & project pages.
            <span className="text-amber-400 ml-2">Design 23 is my top recommendation for hiring managers.</span>
          </p>
          <div className="grid gap-3">
            {remastered.map((design, i) => (
              <motion.div
                key={design.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: (i + 20) * 0.1 }}
              >
                <Link
                  to={design.path}
                  className={`group block p-5 border-2 transition-all duration-300 hover:text-black ${
                    design.path === '/23'
                      ? 'border-amber-400 bg-amber-400/10 hover:bg-amber-400'
                      : 'border-amber-400/50 hover:border-amber-400 hover:bg-amber-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-amber-400/70">{String(i + 21).padStart(2, '0')}</span>
                      <span className="text-xs text-gray-600 group-hover:text-black/60">from #{design.original}</span>
                      <span className="text-lg font-bold">{design.name}</span>
                      {design.path === '/23' && <span className="text-amber-400 text-xs animate-pulse">★ TOP PICK</span>}
                    </div>
                    <span className="text-xl group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1 group-hover:text-black/70 pl-8">
                    {design.desc}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
        {/* EXPERIMENTAL — New Direction */}
        <div className="mt-16">
          <h2 className="text-sm tracking-widest mb-6">
            <span style={{ color: '#CDB4DB' }}>◆ EXPERIMENTAL — PASTEL BRUTALISM ◆</span>
          </h2>
          <p className="text-xs text-gray-500 mb-6">
            New direction: Same bold brutalist geometry, but with lavender/pastel palette on deep midnight.
            <span style={{ color: '#CDB4DB' }} className="ml-2">My current favorite — unique, recruiter-ready, shows real design taste.</span>
          </p>
          <div className="grid gap-3">
            {experimental.map((design, i) => (
              <motion.div
                key={design.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: (i + 26) * 0.1 }}
              >
                <Link
                  to={design.path}
                  className="group block p-6 border-2 transition-all duration-300"
                  style={{ borderColor: '#CDB4DB' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#CDB4DB'; e.currentTarget.style.color = '#0D0D12' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '' }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span style={{ color: '#CDB4DB' }} className="group-hover:text-black/60">{String(i + 26).padStart(2, '0')}</span>
                      <span className="text-lg font-bold">{design.name}</span>
                      <span style={{ color: '#CDB4DB' }} className="text-xs animate-pulse group-hover:text-black/60">★ NEW FAVORITE</span>
                    </div>
                    <span className="text-xl group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1 group-hover:text-black/70 pl-8">
                    {design.desc}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
        {/* Y2K SWISS BRUTALISM */}
        <div className="mt-16">
          <h2 className="text-sm tracking-widest mb-6">
            <span style={{ color: '#C3FF00' }}>× Y2K SWISS BRUTALISM — LIME EDITION ×</span>
          </h2>
          <p className="text-xs text-gray-500 mb-6">
            1 from scratch + 3 re-themed from favorites (4, 12, 15). Same bold DNA, lime <span style={{ color: '#C3FF00' }}>#C3FF00</span> accent.
          </p>
          <div className="grid gap-3">
            {y2k.map((design, i) => (
              <motion.div
                key={design.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: (i + 28) * 0.1 }}
              >
                <Link
                  to={design.path}
                  className="group block p-5 border-2 transition-all duration-300"
                  style={{ borderColor: '#C3FF0060' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#C3FF00'; e.currentTarget.style.color = '#0A0A0A'; e.currentTarget.style.borderColor = '#C3FF00' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = ''; e.currentTarget.style.borderColor = '#C3FF0060' }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span style={{ color: '#C3FF0090' }} className="group-hover:text-black/60">{String(i + 28).padStart(2, '0')}</span>
                      {design.original !== 'NEW' && <span className="text-xs text-gray-600 group-hover:text-black/50">from #{design.original}</span>}
                      <span className="text-lg font-bold">{design.name}</span>
                      {design.original === 'NEW' && <span className="text-xs animate-pulse" style={{ color: '#C3FF00' }}>★ NEW</span>}
                    </div>
                    <span className="text-xl group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1 group-hover:text-black/70 pl-8">
                    {design.desc}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
        {/* CINEMATIC AWARD-WINNING */}
        <div className="mt-16">
          <h2 className="text-sm tracking-widest mb-6">
            <span style={{ color: '#00E599' }}>● CINEMATIC AWARD-WINNING (NEW BATCH) ●</span>
          </h2>
          <p className="text-xs text-gray-500 mb-6">
            Premium, highly polished, smooth scroll experiences built for awwwards. Custom cursors, magnetic physics, and WebGL-like gradients.
          </p>
          <div className="grid gap-3">
            {cinematic.map((design, i) => (
              <motion.div
                key={design.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: (i + 33) * 0.1 }}
              >
                <Link
                  to={design.path}
                  className="group block p-5 border-2 transition-all duration-300"
                  style={{ borderColor: '#00E59960' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#00E599'; e.currentTarget.style.color = '#000000'; e.currentTarget.style.borderColor = '#00E599' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = ''; e.currentTarget.style.borderColor = '#00E59960' }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span style={{ color: '#00E59990' }} className="group-hover:text-black/60">{String(i + 33).padStart(2, '0')}</span>
                      <span className="text-lg font-bold">{design.name}</span>
                      {design.original === 'NEW' && <span className="text-xs animate-pulse" style={{ color: '#00E599' }}>★ NEW</span>}
                    </div>
                    <span className="text-xl group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1 group-hover:text-black/70 pl-8">
                    {design.desc}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
        {/* PASTEL BRUTALIST DARK — NEW TEST */}
        <div className="mt-16">
          <h2 className="text-sm tracking-widest mb-6">
            <span style={{ color: '#CDB4DB' }}>◆ PASTEL BRUTALIST DARK — NEW ◆</span>
          </h2>
          <p className="text-xs text-gray-500 mb-6">
            Brutalist + dark mode by default. Lime, lavender, mint pastels. Raw typography, exposed grid.
          </p>
          <div className="grid gap-3">
            {pastelBrutalist.map((design, i) => (
              <motion.div
                key={design.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: (i + 37) * 0.1 }}
              >
                <Link
                  to={design.path}
                  className="group block p-6 border-2 transition-all duration-300"
                  style={{ borderColor: '#CDB4DB60' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#CDB4DB'; e.currentTarget.style.color = '#0A0A0A'; e.currentTarget.style.borderColor = '#CDB4DB' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = ''; e.currentTarget.style.borderColor = '#CDB4DB60' }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span style={{ color: '#CDB4DB' }} className="group-hover:text-black/60">37</span>
                      <span className="text-lg font-bold">{design.name}</span>
                      <span style={{ color: '#C3FF00' }} className="text-xs animate-pulse group-hover:text-black/60">★ TEST</span>
                    </div>
                    <span className="text-xl group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1 group-hover:text-black/70 pl-8">
                    {design.desc}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
        {/* FINAL BATCH — 4 Original Brutalist Designs */}
        <div className="mt-16">
          <h2 className="text-sm tracking-widest mb-6">
            <span style={{ color: '#FF6B6B' }}>★ </span>
            <span style={{ color: '#E0A8BE' }}>FINAL </span>
            <span style={{ color: '#7DD3FC' }}>BATCH </span>
            <span style={{ color: '#FF2D8A' }}>★</span>
          </h2>
          <p className="text-xs text-gray-500 mb-6">
            4 original dark brutalist designs. Each with a unique color never used before. Full systems with project + blog pages.
          </p>
          <div className="grid gap-3">
            {finalBatch.map((design, i) => (
              <motion.div
                key={design.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: (i + 38) * 0.05 }}
              >
                <Link
                  to={design.path}
                  className="group block p-6 border-2 transition-all duration-300"
                  style={{ borderColor: `${design.accent}50` }}
                  onMouseEnter={e => { e.currentTarget.style.background = design.accent; e.currentTarget.style.color = '#0A0A0A'; e.currentTarget.style.borderColor = design.accent }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = ''; e.currentTarget.style.borderColor = `${design.accent}50` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span style={{ color: design.accent }} className="group-hover:text-black/60">{design.path.replace('/', '')}</span>
                      <span className="text-lg font-bold">{design.name}</span>
                      <span style={{ color: design.accent }} className="text-xs animate-pulse group-hover:text-black/60">★ NEW</span>
                    </div>
                    <span className="text-xl group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1 group-hover:text-black/70 pl-8">
                    {design.desc}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mt-16">
          <h2 className="text-sm tracking-widest mb-6">
            <span style={{ color: '#CDB4DB' }}>HYBRID FAVORITES</span>
          </h2>
          <p className="text-xs text-gray-500 mb-6">
            New prototypes built from your favorite systems: 21, 23, 26, and 32.
          </p>
          <div className="grid gap-3">
            {hybridBatch.map((design, i) => (
              <motion.div
                key={design.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: (i + 42) * 0.05 }}
              >
                <Link
                  to={design.path}
                  className="group block p-6 border-2 transition-all duration-300"
                  style={{ borderColor: `${design.accent}80` }}
                  onMouseEnter={e => { e.currentTarget.style.background = design.accent; e.currentTarget.style.color = '#0A0A0A'; e.currentTarget.style.borderColor = design.accent }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = ''; e.currentTarget.style.borderColor = `${design.accent}80` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span style={{ color: design.accent }} className="group-hover:text-black/60">{design.path.replace('/', '')}</span>
                      <span className="text-lg font-bold">{design.name}</span>
                      <span style={{ color: design.accent }} className="text-xs animate-pulse group-hover:text-black/60">NEW HYBRID</span>
                    </div>
                    <span className="text-xl group-hover:translate-x-2 transition-transform">â†’</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1 group-hover:text-black/70 pl-8">
                    {design.desc}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
