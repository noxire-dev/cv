import { useEffect, useRef, useState } from 'react'

const CONTACT_LINKS = [
  { label: 'EMAIL', value: 'hi@sinadilek.com', href: 'mailto:hi@sinadilek.com' },
  { label: 'GITHUB', value: 'noxire-dev', href: 'https://github.com/noxire-dev' },
  { label: 'LINKEDIN', value: 'sina-dilek', href: 'https://linkedin.com/in/sina-dilek-395501247' },
]

// ── Design 52: ZEN BRUTALISM v3 ──────────────────────────────────────────────
// Dark-only. Industrial brutalism × Japanese minimalism (Ma).
// Display: Syne · Body: Plus Jakarta Sans · Meta: JetBrains Mono
// One accent (live-swappable): iris / terracotta / wasabi.
// Details: 90° corners, hard (non-blurring) shadows that SHIFT on hover,
// exposed column grid, concrete noise, custom raw cursor.
//
// Components so far: HERO + SELECTED WORK. More to follow.
// ─────────────────────────────────────────────────────────────────────────────

const FOCUS = [
  { i: '01', t: 'Backend Systems', d: 'Python · Go · FastAPI' },
  { i: '02', t: 'Data Pipelines', d: 'Scraping · Caching · ETL' },
  { i: '03', t: 'Developer Tools', d: 'Shells · CLIs · DX' },
  { i: '04', t: 'Interface & UX', d: 'Design Systems · Motion · Type' },
]

const PROJECTS = [
  { id: 'tayf', name: 'Tayf', glyph: '◧', brief: 'A "Ground News" for Turkey — clusters 144 outlets by story in real time and surfaces the blind spots each side underreports.', stack: ['Next.js 16', 'React 19', 'Supabase'], year: '2026', status: 'LIVE', link: 'https://tayfhaber.com' },
  { id: 'toka', name: 'Toka', glyph: '◈', brief: 'Hands an AI model a REPL and lets it write its own tools — instead of cramming every task into mine.', stack: ['TypeScript', 'Claude Agent SDK'], year: '2026', status: 'DEV', link: 'https://github.com/noxire-dev/toka' },
  { id: 'pookie', name: 'Pookie', glyph: '💬', brief: 'Throws a million WhatsApp messages at your browser and analyzes every one locally — nothing ever leaves your device.', stack: ['React', 'TypeScript', 'Web Workers'], year: '2026', status: 'LIVE', link: 'https://pookie.sh' },
  { id: 'lumiko', name: 'Lumiko', glyph: '❋', brief: 'Points Claude at a repo and writes the docs you keep putting off — README, architecture, API, the lot.', stack: ['TypeScript', 'Claude', 'CLI'], year: '2026', status: 'STABLE', link: 'https://github.com/mirako-studio/lumiko' },
  { id: 'moji', name: 'Moji', glyph: '✦', brief: 'A productivity app that’s fast and opinionated — built because everything else felt bloated.', stack: ['FastAPI', 'Next.js', 'Supabase'], year: '2025', status: 'LIVE', link: 'https://usemoji.app' },
  { id: 'vello', name: 'Vello', glyph: '✉', brief: 'Cold email that scales without torching your sender reputation — the unglamorous plumbing, done right.', stack: ['Python', 'Modular Services'], year: '2025', status: 'DEV', link: 'https://github.com/noxire-dev/vello' },
  { id: 'gosh', name: 'GoSH', glyph: '>', brief: 'A Unix shell built from scratch in Go, because I wanted to know exactly how the thing I use all day works.', stack: ['Go', 'Systems'], year: '2025', status: 'ACTIVE', link: 'https://github.com/noxire-dev/GoSH' },
  { id: 'midnight', name: 'Midnight Moon', glyph: '◑', brief: 'A dark VS Code theme tuned by contrast ratios, not vibes — made for long nights.', stack: ['Design', 'JSON'], year: '2024', status: 'STABLE', link: 'https://github.com/noxire-dev/midnight-theme' },
]

// Custom raw cursor: crisp square, tracks 1:1 (no lag = brutalist),
// swells to a ring over interactive elements. Off on touch.
function useRawCursor(rootRef: React.RefObject<HTMLDivElement>) {
  const dotRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const root = rootRef.current
    const dot = dotRef.current
    if (!root || !dot) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    root.classList.add('zb-cursor-on')
    let raf = 0
    const move = (e: MouseEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      })
    }
    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      dot.classList.toggle('is-active', !!el.closest('[data-cursor="active"]'))
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      root.classList.remove('zb-cursor-on')
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      cancelAnimationFrame(raf)
    }
  }, [rootRef])
  return dotRef
}

// Reveal-on-scroll for below-the-fold sections.
function useReveal(rootRef: React.RefObject<HTMLDivElement>) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const els = Array.from(root.querySelectorAll('.zb-reveal'))
    if (!('IntersectionObserver' in window)) {
      els.forEach((e) => e.classList.add('is-in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('is-in')
            io.unobserve(en.target)
          }
        }),
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' },
    )
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [rootRef])
}

const NAV = [
  { id: 'about', label: 'ABOUT' },
  { id: 'work', label: 'WORK' },
  { id: 'contact', label: 'CONTACT' },
]

// Sticky nav — hidden over the hero (which has its own top rail), slides in
// once you scroll past it. Scroll-spy marks the section in view.
function Nav() {
  const [active, setActive] = useState('')
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.82)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    NAV.forEach((n) => {
      const el = document.getElementById(n.id)
      if (el) io.observe(el)
    })
    return () => {
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [])

  return (
    <nav className={`zb52-nav${shown ? ' is-shown' : ''}`} aria-label="Primary">
      <div className="nav-inner">
        <a className="nav-brand" href="#top" data-cursor="active">
          SINA&nbsp;DILEK<span className="reg">®</span>
        </a>
        <ul className="nav-links">
          {NAV.map((n) => (
            <li key={n.id}>
              <a className={active === n.id ? 'on' : ''} href={`#${n.id}`} data-cursor="active">
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <a className="nav-cta" href="mailto:hi@sinadilek.com" data-cursor="active">
          LET&apos;S TALK<span className="arw">→</span>
        </a>
      </div>
    </nav>
  )
}

function Hero({ clock }: { clock: string }) {
  return (
    <section className="zb52-hero" id="top">
      <div className="zb52-frame">
        <div className="zb52-cols" aria-hidden />
        <span className="zb52-tick tl" aria-hidden />
        <span className="zb52-tick tr" aria-hidden />
        <span className="zb52-tick bl" aria-hidden />
        <span className="zb52-tick br" aria-hidden />

        <header className="zb52-meta zb-in" style={{ animationDelay: '.05s' }}>
          <span className="zb52-meta-l">
            SINA&nbsp;DILEK<span className="sep">/</span>PORTFOLIO&nbsp;
            <span className="dim">v3</span>
          </span>
          <span className="zb52-meta-r">
            <span className="zb52-status">
              <i className="lamp" />
              OPEN&nbsp;TO&nbsp;2027&nbsp;ROLES
            </span>
            <span className="zb52-clock">{clock}</span>
          </span>
        </header>

        <div className="zb52-main">
          <div className="zb52-namewrap">
            <span className="zb52-kicker zb-in" style={{ animationDelay: '.12s' }}>
              <span className="jp">制作</span>
              <span className="ln" />
              CLOUDFLARE&nbsp;INTERN · CTO · CS&nbsp;STUDENT
            </span>

            <h1 className="zb52-name">
              <span className="ln1 zb-in" style={{ animationDelay: '.18s' }}>
                SINA
              </span>
              <span className="ln2 zb-in" style={{ animationDelay: '.26s' }}>
                DILEK<b className="dot">.</b>
              </span>
            </h1>

            <p className="zb52-bio zb-in" style={{ animationDelay: '.34s' }}>
              Second-year Computer Science student at the University of Essex —
              First-Class, top of cohort — currently a software engineer intern at
              <em>Cloudflare</em> (Foundational Engineering) and CTO at
              <em>Price Lantern</em>. I build backend systems, data pipelines, and
              developer tools — engineered to ship, not to demo.
            </p>

            <div className="zb52-cta zb-in" style={{ animationDelay: '.42s' }}>
              <a className="btn" href="#work" data-cursor="active">
                VIEW&nbsp;WORK<span className="arw">→</span>
              </a>
              <a className="btn ghost" href="/Sina_Dilek_CV.pdf" download data-cursor="active">
                DOWNLOAD&nbsp;CV<span className="arw">↓</span>
              </a>
              <a className="mail" href="mailto:hi@sinadilek.com" data-cursor="active">
                hi@sinadilek.com
              </a>
            </div>
          </div>

          <aside className="zb52-focus">
            <span className="zb52-focus-h zb-in" style={{ animationDelay: '.3s' }}>
              <span className="jp">現在</span>CURRENT&nbsp;FOCUS
            </span>
            <ul>
              {FOCUS.map((f, idx) => (
                <li
                  key={f.i}
                  className="cell zb-in"
                  style={{ animationDelay: `${0.38 + idx * 0.08}s` }}
                >
                  <span className="i">{f.i}</span>
                  <span className="body">
                    <span className="t">{f.t}</span>
                    <span className="d">{f.d}</span>
                  </span>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <footer className="zb52-foot zb-in" style={{ animationDelay: '.5s' }}>
          <a className="scroll" href="#about" data-cursor="active">
            <span className="ar">↓</span>&nbsp;&nbsp;SCROLL&nbsp;TO&nbsp;ENTER
          </a>
          <span className="sig">
            COLCHESTER,&nbsp;UK — DESIGNED&nbsp;&amp;&nbsp;BUILT&nbsp;BY&nbsp;HAND
          </span>
        </footer>
      </div>
    </section>
  )
}

const ROLES = [
  {
    y: '2026',
    role: 'Software Engineer Intern',
    org: 'Cloudflare · Foundational Engineering · London',
    now: true,
  },
  { y: '2025—', role: 'Chief Technology Officer', org: 'Price Lantern · Pre-seed AI', now: false },
  { y: '2024—', role: 'BSc Computer Science', org: 'University of Essex · Exp. 2027', now: false },
]

function About() {
  return (
    <section className="zb52-about" id="about">
      <div className="zb52-about-inner">
        <header className="zb52-sec-head zb-reveal">
          <span className="kick">
            <span className="jp">私</span>ABOUT
          </span>
          <h2 className="ttl">
            ABOUT<span className="ct">/ 01</span>
          </h2>
        </header>

        <div className="zb52-about-grid">
          <div className="zb52-about-body zb-reveal">
            <p className="lead">
              I&apos;m a second-year CS student at the University of Essex —
              first-class, and top of my cohort. Right now I&apos;m interning as a
              software engineer at <em>Cloudflare</em> (Foundational Engineering),
              and running the tech as CTO at <em>Price Lantern</em>.
            </p>
            <p>
              Honestly, most of what I&apos;m any good at came from building things,
              not from lectures. I keep picking problems that are a little out of my
              depth — a Turkish news-bias analyzer that clusters 144 outlets by
              story, an AI harness that lets a model write its own tools, a shell
              built from scratch in Go. The degree&apos;s gone well — top of my cohort
              two years running, a Dean&apos;s List for Excellence spot, first-class
              marks (94 in Web App Programming) — but I&apos;d rather be judged on what
              I actually ship. Hand me something real to build and I&apos;ll go deep
              on it until it&apos;s right.
            </p>
          </div>

          <aside className="zb52-about-side zb-reveal">
            <span className="side-label">
              <span className="jp">詳細</span>PROFILE
            </span>
            <dl className="facts">
              <div>
                <dt>LOCATION</dt>
                <dd>Colchester, UK · GMT+0</dd>
              </div>
              <div>
                <dt>DEGREE</dt>
                <dd>BSc CS · Exp. 2027</dd>
              </div>
              <div>
                <dt>STANDING</dt>
                <dd>First-Class · Top of Cohort</dd>
              </div>
              <div>
                <dt>HONOURS</dt>
                <dd>Dean&apos;s List for Excellence</dd>
              </div>
            </dl>
          </aside>
        </div>

        <div className="zb52-now zb-reveal">
          <span className="now-h">
            <span className="jp">現在</span>CURRENTLY
          </span>
          <ul>
            {ROLES.map((r) => (
              <li key={r.role}>
                <span className="y">{r.y}</span>
                <span className="role">
                  <b>{r.role}</b>
                  <span>{r.org}</span>
                </span>
                {r.now && <span className="badge">NOW</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Work() {
  return (
    <section className="zb52-work" id="work">
      <div className="zb52-work-inner">
        <header className="zb52-sec-head zb-reveal">
          <span className="kick">
            <span className="jp">仕事</span>SELECTED&nbsp;WORK
          </span>
          <h2 className="ttl">
            WORK<span className="ct">/ {String(PROJECTS.length).padStart(2, '0')}</span>
          </h2>
          <span className="note">Things I&apos;ve designed, built, and shipped.</span>
        </header>

        <ol className="zb52-reg">
          {PROJECTS.map((p, idx) => (
            <li key={p.id} className="zb52-reg-row zb-reveal">
              <a href={p.link} target="_blank" rel="noreferrer" data-cursor="active">
                <span className="rn">{String(idx + 1).padStart(2, '0')}</span>
                <span className="rmain">
                  <span className="rhead">
                    <span className="rname">{p.name}</span>
                    <span className="rglyph" aria-hidden>
                      {p.glyph}
                    </span>
                  </span>
                  <span className="rbrief">{p.brief}</span>
                  <ul className="rtags">
                    {p.stack.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </span>
                <span className="rmeta">
                  <span className={`stat s-${p.status.toLowerCase()}`}>{p.status}</span>
                  <span className="ryear">{p.year}</span>
                  <span className="rarw">↗</span>
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Contact() {
  const links = CONTACT_LINKS.filter((c) => c.label !== 'EMAIL')
  return (
    <section className="zb52-contact" id="contact">
      <div className="zb52-contact-inner">
        <header className="zb52-contact-head zb-reveal">
          <span className="kick">
            <span className="jp">連絡</span>CONTACT
          </span>
          <h2 className="big">
            LET&apos;S BUILD
            <br />
            <em>SOMETHING</em>
          </h2>
          <p className="sub">
            Open to graduate roles, internships, and collaboration — the fastest way
            to reach me is a direct email.
          </p>
        </header>

        <a className="zb52-mailcta zb-reveal" href="mailto:hi@sinadilek.com" data-cursor="active">
          <span className="l">
            <span className="jp">メール</span>DROP&nbsp;ME&nbsp;A&nbsp;LINE
          </span>
          <span className="addr">hi@sinadilek.com</span>
          <span className="send">
            SEND<span className="arw">→</span>
          </span>
        </a>

        <ul className="zb52-links zb-reveal">
          {links.map((c, i) => (
            <li key={c.label}>
              <a
                href={c.href}
                target={c.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noreferrer"
                data-cursor="active"
              >
                <span className="k">
                  {String(i + 1).padStart(2, '0')} / {c.label}
                </span>
                <span className="v">{c.value}</span>
                <span className="arw">↗</span>
              </a>
            </li>
          ))}
          <li>
            <a href="/zen-brutalism.html" target="_blank" rel="noreferrer" data-cursor="active">
              <span className="k">{String(links.length + 1).padStart(2, '0')} / SYSTEM</span>
              <span className="v">Zen Brutalism</span>
              <span className="arw">↗</span>
            </a>
          </li>
        </ul>

        <footer className="zb52-footer zb-reveal">
          <span className="c">© 2026 SINA DILEK</span>
          <span className="loc">COLCHESTER, UK · GMT+0 · BUILT BY HAND</span>
          <a className="totop" href="#top" data-cursor="active">
            <span className="ar">↑</span> BACK TO TOP
          </a>
        </footer>
      </div>
    </section>
  )
}

export default function Design52() {
  const rootRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRawCursor(rootRef)
  useReveal(rootRef)
  const [clock, setClock] = useState('')

  useEffect(() => {
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }),
      )
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="zb52" ref={rootRef}>
      <style>{CSS}</style>
      <div className="zb52-noise" aria-hidden />
      <div className="zb52-cursor" ref={cursorRef} aria-hidden />
      <Nav />

      <Hero clock={clock} />
      <About />
      <Work />
      <Contact />
    </div>
  )
}

const CSS = `
.zb52 {
  --zb-ink:      #0C0C0D;
  --zb-ink-2:    #131316;
  --zb-ink-3:    #191920;
  --zb-paper:    #ECECE4;
  --zb-grey:     #93938C;
  --zb-grey-dim: #55554F;
  --zb-line:     #2A2A30;
  --zb-line-2:   #3E3E46;
  --zb-accent:   #8F90C2;
  --zb-accent-lo: rgba(143,144,194,0.14);

  --zb-display: 'Archivo', system-ui, sans-serif;
  --zb-body:    'Plus Jakarta Sans', system-ui, sans-serif;
  --zb-mono:    'IBM Plex Mono', ui-monospace, monospace;
  --snap: 0.13s cubic-bezier(0.2, 0, 0, 1);

  position: relative;
  font-stretch: 125%;
  background: var(--zb-ink);
  color: var(--zb-paper);
  font-family: var(--zb-body);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}
.zb52 *, .zb52 *::before, .zb52 *::after { box-sizing: border-box; }
.zb52 ::selection { background: var(--zb-accent); color: var(--zb-ink); }

/* highlighter-pen emphasis — a fluorescent marker swipe behind the words */
.zb52 em {
  font-style: normal; color: var(--zb-ink);
  background-image: linear-gradient(101deg, transparent 0.4%, var(--zb-accent) 1.8%, var(--zb-accent) 98.2%, transparent 99.6%);
  background-repeat: no-repeat; background-size: 100% 100%; background-position: 0 0;
  padding: 0.05em 0.18em; margin: 0 -0.04em;
  -webkit-box-decoration-break: clone; box-decoration-break: clone;
}

/* sticky nav — hidden over hero, slides in on scroll */
.zb52-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 50;
  border-bottom: 1px solid var(--zb-line);
  background: rgba(12,12,13,0.72); backdrop-filter: blur(12px) saturate(1.1); -webkit-backdrop-filter: blur(12px) saturate(1.1);
  transform: translateY(-102%); transition: transform 0.42s cubic-bezier(0.2, 0, 0, 1);
}
.zb52-nav.is-shown { transform: translateY(0); }
.nav-inner { max-width: 1600px; margin: 0 auto; height: clamp(54px, 7vh, 64px); display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 0 clamp(16px, 3vw, 40px); }
.nav-brand { font-family: var(--zb-mono); font-size: 12px; letter-spacing: 0.22em; color: var(--zb-paper); text-decoration: none; display: inline-flex; align-items: center; gap: 3px; }
.nav-brand .reg { color: var(--zb-accent); font-size: 9px; vertical-align: super; }
.nav-links { list-style: none; display: flex; align-items: center; gap: clamp(18px, 3vw, 40px); margin: 0; padding: 0; }
.nav-links a { position: relative; font-family: var(--zb-mono); font-size: 11px; letter-spacing: 0.2em; color: var(--zb-grey); text-decoration: none; padding: 6px 0; transition: color var(--snap); }
.nav-links a::after { content: ''; position: absolute; left: 0; right: 100%; bottom: 0; height: 2px; background: var(--zb-accent); transition: right var(--snap); }
.nav-links a:hover { color: var(--zb-paper); }
.nav-links a.on { color: var(--zb-paper); }
.nav-links a.on::after { right: 0; }
.nav-cta { display: inline-flex; align-items: center; gap: 9px; font-family: var(--zb-mono); font-size: 11px; letter-spacing: 0.16em; color: var(--zb-paper); text-decoration: none; padding: 9px 16px; border: 1.5px solid var(--zb-line-2); transition: border-color var(--snap), color var(--snap); }
.nav-cta .arw { transition: transform var(--snap); }
.nav-cta:hover { border-color: var(--zb-accent); color: var(--zb-accent); }
.nav-cta:hover .arw { transform: translateX(4px); }
.zb52-about, .zb52-work, .zb52-contact { scroll-margin-top: clamp(66px, 9vh, 84px); }

/* concrete noise */
.zb52-noise {
  position: fixed; inset: 0; z-index: 2; pointer-events: none;
  opacity: 0.05; mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 200px 200px;
}

/* custom raw cursor */
.zb52-cursor {
  position: fixed; top: 0; left: 0; z-index: 999;
  width: 11px; height: 11px; margin: -5.5px 0 0 -5.5px;
  border: 1.5px solid var(--zb-paper);
  mix-blend-mode: difference; pointer-events: none;
  transition: width var(--snap), height var(--snap), margin var(--snap),
              border-color var(--snap), background var(--snap);
  display: none;
}
.zb52.zb-cursor-on, .zb52.zb-cursor-on * { cursor: none; }
.zb52.zb-cursor-on .zb52-cursor { display: block; }
.zb52-cursor.is-active {
  width: 34px; height: 34px; margin: -17px 0 0 -17px;
  border-color: var(--zb-accent); background: var(--zb-accent-lo);
}

/* hero shell + architectural frame */
.zb52-hero { position: relative; z-index: 1; min-height: 100vh; padding: clamp(14px, 1.6vw, 24px); }
.zb52-frame {
  position: relative;
  min-height: calc(100vh - clamp(28px, 3.2vw, 48px));
  border: 1px solid var(--zb-line);
  padding: clamp(26px, 4vw, 76px);
  display: flex; flex-direction: column; justify-content: space-between;
  gap: clamp(40px, 7vh, 96px);
}
.zb52-cols {
  position: absolute; inset: 0; pointer-events: none; z-index: 0;
  background-image: repeating-linear-gradient(
    to right,
    transparent, transparent calc(100% / 12 - 1px),
    rgba(236,236,228,0.028) calc(100% / 12 - 1px), rgba(236,236,228,0.028) calc(100% / 12)
  );
}
.zb52-frame > *:not(.zb52-cols):not(.zb52-tick) { position: relative; z-index: 1; }

.zb52-tick { position: absolute; width: 9px; height: 9px; pointer-events: none; }
.zb52-tick::before, .zb52-tick::after { content: ''; position: absolute; background: var(--zb-accent); }
.zb52-tick::before { width: 9px; height: 1.5px; top: 0; }
.zb52-tick::after  { width: 1.5px; height: 9px; left: 0; }
.zb52-tick.tl { top: -1px; left: -1px; }
.zb52-tick.tr { top: -1px; right: -1px; transform: scaleX(-1); }
.zb52-tick.bl { bottom: -1px; left: -1px; transform: scaleY(-1); }
.zb52-tick.br { bottom: -1px; right: -1px; transform: scale(-1); }

.zb52-meta {
  display: flex; justify-content: space-between; align-items: center;
  gap: 24px; flex-wrap: wrap;
  font-family: var(--zb-mono); font-size: 11px; letter-spacing: 0.18em; color: var(--zb-grey);
}
.zb52-meta .sep { color: var(--zb-grey-dim); margin: 0 10px; }
.zb52-meta .dim { color: var(--zb-grey-dim); }
.zb52-meta-r { display: flex; align-items: center; gap: 22px; }
.zb52-status { display: inline-flex; align-items: center; gap: 9px; color: var(--zb-paper); }
.zb52-status .lamp { width: 7px; height: 7px; background: var(--zb-accent); box-shadow: 0 0 0 3px var(--zb-accent-lo); }
.zb52-clock { color: var(--zb-grey-dim); font-variant-numeric: tabular-nums; }

.zb52-main {
  flex: 1 1 auto; display: grid; grid-template-columns: repeat(12, 1fr);
  align-items: end; column-gap: clamp(24px, 3vw, 56px); row-gap: clamp(48px, 8vh, 90px);
  padding: clamp(20px, 4vh, 56px) 0;
}
.zb52-namewrap { grid-column: 1 / 8; align-self: end; }
.zb52-focus    { grid-column: 8 / 13; align-self: start; }

.zb52-kicker {
  display: inline-flex; align-items: center; gap: 14px;
  font-family: var(--zb-mono); font-size: 11px; letter-spacing: 0.26em;
  color: var(--zb-grey); margin-bottom: clamp(20px, 3vh, 34px);
}
.zb52-kicker .jp { color: var(--zb-accent); letter-spacing: 0.1em; font-size: 12px; }
.zb52-kicker .ln { width: 44px; height: 1px; background: var(--zb-line-2); }

.zb52-name { font-family: var(--zb-display); font-weight: 800; line-height: 0.82; letter-spacing: -0.035em; text-transform: uppercase; margin: 0; }
.zb52-name span { display: block; }
.zb52-name .ln1 { font-size: clamp(3.6rem, 12.5vw, 12rem); color: var(--zb-paper); }
.zb52-name .ln2 {
  font-size: clamp(3.6rem, 12.5vw, 12rem); color: transparent;
  -webkit-text-stroke: 1.6px var(--zb-grey); text-stroke: 1.6px var(--zb-grey);
  margin-left: clamp(20px, 5vw, 96px);
}
.zb52-name .dot { -webkit-text-stroke: 0; color: var(--zb-accent); font-weight: 800; }

.zb52-bio { max-width: 46ch; margin: clamp(28px, 4vh, 44px) 0 0; font-size: clamp(0.95rem, 1.05vw, 1.12rem); line-height: 1.65; color: var(--zb-grey); }
.zb52-bio em { font-weight: 600; }

.zb52-cta { display: flex; align-items: center; gap: clamp(20px, 3vw, 40px); margin-top: clamp(30px, 4.5vh, 48px); flex-wrap: wrap; }
.zb52-cta .btn {
  display: inline-flex; align-items: center; gap: 14px;
  font-family: var(--zb-mono); font-size: 12px; letter-spacing: 0.2em; color: var(--zb-paper); text-decoration: none;
  padding: 16px 26px; background: var(--zb-ink-2); border: 2px solid var(--zb-paper);
  box-shadow: 5px 5px 0 0 var(--zb-line);
  transition: transform var(--snap), box-shadow var(--snap), border-color var(--snap), background var(--snap);
}
.zb52-cta .btn .arw { transition: transform var(--snap); }
.zb52-cta .btn:hover { transform: translate(-4px, -4px); box-shadow: 9px 9px 0 0 var(--zb-accent); border-color: var(--zb-accent); background: var(--zb-ink-3); }
.zb52-cta .btn:hover .arw { transform: translateX(5px); }
.zb52-cta .btn:active { transform: translate(0, 0); box-shadow: 3px 3px 0 0 var(--zb-accent); }
.zb52-cta .btn.ghost { border-color: var(--zb-line-2); color: var(--zb-grey); box-shadow: 5px 5px 0 0 transparent; }
.zb52-cta .btn.ghost:hover { color: var(--zb-paper); border-color: var(--zb-accent); box-shadow: 9px 9px 0 0 var(--zb-accent); }
.zb52-cta .btn.ghost:hover .arw { transform: translateY(4px); }
.zb52-cta .mail {
  font-family: var(--zb-mono); font-size: 12px; letter-spacing: 0.06em; color: var(--zb-grey); text-decoration: none;
  padding-bottom: 3px; border-bottom: 1px solid var(--zb-line-2); transition: color var(--snap), border-color var(--snap);
}
.zb52-cta .mail:hover { color: var(--zb-accent); border-color: var(--zb-accent); }

.zb52-focus-h { display: inline-flex; align-items: center; gap: 10px; font-family: var(--zb-mono); font-size: 11px; letter-spacing: 0.24em; color: var(--zb-grey); margin-bottom: 22px; }
.zb52-focus-h .jp { color: var(--zb-accent); letter-spacing: 0.12em; font-size: 12px; }
.zb52-focus ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; align-items: flex-end; gap: 16px; }
.zb52-focus .cell {
  width: min(100%, 366px); display: flex; align-items: center; gap: 16px; padding: 19px 20px;
  background: var(--zb-ink-2); border: 2px solid var(--zb-line); box-shadow: 4px 4px 0 0 rgba(0,0,0,0.35);
  transition: border-color var(--snap), background var(--snap);
}
.zb52-focus .cell:nth-child(2) { margin-right: clamp(0px, 2vw, 30px); }
.zb52-focus .cell:nth-child(3) { margin-right: clamp(0px, 4vw, 60px); }
.zb52-focus .cell:nth-child(4) { margin-right: clamp(0px, 6vw, 90px); }
.zb52-focus .cell .i { font-family: var(--zb-mono); font-size: 11px; letter-spacing: 0.1em; color: var(--zb-grey-dim); padding-top: 2px; }
.zb52-focus .cell .body { display: flex; flex-direction: column; gap: 5px; flex: 1; }
.zb52-focus .cell .t { font-family: var(--zb-display); font-weight: 700; font-size: 1.02rem; letter-spacing: -0.01em; color: var(--zb-paper); }
.zb52-focus .cell .d { font-family: var(--zb-mono); font-size: 10.5px; letter-spacing: 0.08em; color: var(--zb-grey); }
.zb52-focus .cell:hover { border-color: var(--zb-line-2); background: var(--zb-ink-3); }

.zb52-foot { display: flex; justify-content: space-between; align-items: center; gap: 20px; font-family: var(--zb-mono); font-size: 10.5px; letter-spacing: 0.2em; color: var(--zb-grey); flex-wrap: wrap; }
.zb52-foot .sig { color: #b4afa4; }
.zb52-foot .scroll { display: inline-flex; align-items: center; color: var(--zb-grey); text-decoration: none; }
.zb52-foot .scroll:hover { color: var(--zb-accent); }
.zb52-foot .scroll .ar { display: inline-block; color: var(--zb-accent); animation: zb-bob 1.9s var(--snap) infinite; }

/* ── SHARED SECTION HEADER ─────────────────────────────────── */
.zb52-sec-head { display: grid; grid-template-columns: 1fr auto; align-items: end; gap: 18px 40px; margin-bottom: clamp(44px, 8vh, 100px); }
.zb52-sec-head .kick { grid-column: 1; display: inline-flex; align-items: center; gap: 12px; font-family: var(--zb-mono); font-size: 11px; letter-spacing: 0.26em; color: var(--zb-grey); }
.zb52-sec-head .kick .jp { color: var(--zb-accent); letter-spacing: 0.12em; font-size: 13px; }
.zb52-sec-head .ttl { grid-column: 1; grid-row: 2; margin: 10px 0 0; font-family: var(--zb-display); font-weight: 800; font-size: clamp(2.6rem, 7.5vw, 6.4rem); line-height: 0.85; letter-spacing: -0.03em; text-transform: uppercase; }
.zb52-sec-head .ttl .ct { font-size: 0.22em; letter-spacing: 0.1em; color: var(--zb-accent); vertical-align: super; margin-left: 14px; -webkit-text-stroke: 0; }
.zb52-sec-head .note { grid-column: 2; grid-row: 2; align-self: end; max-width: 30ch; text-align: right; font-size: 0.92rem; line-height: 1.6; color: var(--zb-grey); }

/* ── ABOUT ─────────────────────────────────────────────────── */
.zb52-about { position: relative; z-index: 1; padding: clamp(70px, 13vh, 170px) clamp(14px, 1.6vw, 24px) 0; }
.zb52-about-inner { position: relative; max-width: 1440px; margin: 0 auto; border-top: 1px solid var(--zb-line); padding: clamp(40px, 7vh, 96px) clamp(12px, 3vw, 60px) 0; }
.zb52-about-grid { display: grid; grid-template-columns: 1.42fr minmax(268px, 0.86fr); gap: clamp(32px, 5vw, 80px); align-items: start; }
.zb52-about-side { display: flex; flex-direction: column; gap: 18px; }
.zb52-about-side .side-label { display: inline-flex; align-items: center; gap: 10px; font-family: var(--zb-mono); font-size: 10px; letter-spacing: 0.24em; color: var(--zb-grey-dim); }
.zb52-about-side .side-label .jp { color: var(--zb-accent); letter-spacing: 0.12em; font-size: 12px; }
.facts { margin: 0; display: flex; flex-direction: column; }
.facts > div { display: flex; justify-content: space-between; gap: 16px; padding: 13px 0; border-top: 1px solid var(--zb-line); }
.facts > div:last-child { border-bottom: 1px solid var(--zb-line); }
.facts dt { font-family: var(--zb-mono); font-size: 10px; letter-spacing: 0.16em; color: var(--zb-grey-dim); }
.facts dd { margin: 0; font-family: var(--zb-mono); font-size: 11.5px; color: var(--zb-paper); text-align: right; }
.zb52-about-body .lead { margin: 0 0 22px; font-family: var(--zb-display); font-weight: 500; font-size: clamp(1.3rem, 2.3vw, 2rem); line-height: 1.3; letter-spacing: -0.01em; color: var(--zb-paper); }
.zb52-about-body p { margin: 0 0 22px; font-size: clamp(0.98rem, 1.05vw, 1.12rem); line-height: 1.72; color: var(--zb-grey); max-width: 62ch; }
.zb52-now { margin-top: clamp(48px, 8vh, 92px); }
.zb52-now .now-h { display: inline-flex; align-items: center; gap: 10px; margin: 0 0 6px; font-family: var(--zb-mono); font-size: 11px; letter-spacing: 0.24em; color: var(--zb-grey); }
.zb52-now .now-h .jp { color: var(--zb-accent); letter-spacing: 0.12em; font-size: 12px; }
.zb52-now ul { list-style: none; margin: 0; padding: 0; border-top: 2px solid var(--zb-line-2); }
.zb52-now li { display: grid; grid-template-columns: 96px 1fr auto; align-items: center; gap: clamp(16px, 3vw, 40px); padding: clamp(20px, 2.4vw, 30px) clamp(6px, 1.4vw, 18px); border-bottom: 1px solid var(--zb-line); }
.zb52-now li .y { font-family: var(--zb-mono); font-size: 12px; letter-spacing: 0.06em; color: var(--zb-grey-dim); }
.zb52-now li .role { display: flex; flex-direction: column; gap: 4px; }
.zb52-now li .role b { font-family: var(--zb-display); font-weight: 700; font-size: clamp(1.15rem, 1.7vw, 1.5rem); letter-spacing: -0.01em; color: var(--zb-paper); }
.zb52-now li .role span { font-family: var(--zb-mono); font-size: 11px; letter-spacing: 0.04em; color: var(--zb-grey); }
.zb52-now li .badge { font-family: var(--zb-mono); font-size: 9.5px; letter-spacing: 0.16em; color: var(--zb-ink); background: var(--zb-accent); padding: 5px 9px; }

/* ── SELECTED WORK — readable register ─────────────────────── */
.zb52-work { position: relative; z-index: 1; padding: clamp(70px, 13vh, 170px) clamp(14px, 1.6vw, 24px); }
.zb52-work-inner { position: relative; max-width: 1440px; margin: 0 auto; border-top: 1px solid var(--zb-line); padding: clamp(40px, 7vh, 96px) clamp(12px, 3vw, 60px) 0; }
.zb52-reg { list-style: none; margin: 0; padding: 0; border-top: 2px solid var(--zb-line-2); }
.zb52-reg-row { border-bottom: 2px solid var(--zb-line); }
.zb52-reg-row a {
  display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: clamp(18px, 4vw, 64px);
  padding: clamp(26px, 3.2vw, 44px) clamp(12px, 2vw, 26px);
  text-decoration: none; position: relative;
  transition: padding var(--snap), background var(--snap);
}
.zb52-reg-row a::before { content: ''; position: absolute; left: 0; top: -2px; bottom: -2px; width: 3px; background: var(--zb-accent); transform: scaleY(0); transform-origin: center; transition: transform var(--snap); }
.zb52-reg-row a:hover { background: var(--zb-ink-2); padding-left: clamp(22px, 2.8vw, 42px); }
.zb52-reg-row a:hover::before { transform: scaleY(1); }
.zb52-reg-row .rn { font-family: var(--zb-mono); font-size: clamp(12px, 1vw, 14px); color: var(--zb-grey-dim); align-self: start; padding-top: 9px; transition: color var(--snap); }
.zb52-reg-row a:hover .rn { color: var(--zb-accent); }
.rmain { display: flex; flex-direction: column; gap: 9px; min-width: 0; }
.rhead { display: flex; align-items: baseline; gap: 14px; flex-wrap: wrap; }
.rname { font-family: var(--zb-display); font-weight: 800; font-size: clamp(1.6rem, 3.2vw, 2.7rem); line-height: 0.98; letter-spacing: -0.02em; color: var(--zb-paper); transition: color var(--snap); }
.zb52-reg-row a:hover .rname { color: var(--zb-accent); }
.rglyph { font-size: 15px; opacity: 0.6; }
.rbrief { font-size: clamp(0.92rem, 1vw, 1.05rem); color: var(--zb-grey); line-height: 1.5; max-width: 54ch; }
.rtags { display: flex; flex-wrap: wrap; gap: 7px; list-style: none; margin: 4px 0 0; padding: 0; }
.rtags li { font-family: var(--zb-mono); font-size: 10px; letter-spacing: 0.06em; color: var(--zb-grey); padding: 4px 9px; border: 1px solid var(--zb-line); }
.rmeta { display: flex; align-items: center; gap: clamp(14px, 2vw, 26px); justify-self: end; }
.rmeta .stat { font-family: var(--zb-mono); font-size: 10px; letter-spacing: 0.14em; padding: 4px 9px; border: 1px solid var(--zb-line-2); color: var(--zb-grey); }
.rmeta .stat.s-live, .rmeta .stat.s-active { color: var(--zb-accent); border-color: var(--zb-accent); }
.rmeta .ryear { font-family: var(--zb-mono); font-size: 12px; color: var(--zb-grey-dim); }
.rmeta .rarw { font-size: 17px; color: var(--zb-grey-dim); transition: transform var(--snap), color var(--snap); }
.zb52-reg-row a:hover .rarw { transform: translate(3px, -3px); color: var(--zb-accent); }

/* ── CONTACT / FOOTER ──────────────────────────────────────── */
.zb52-contact { position: relative; z-index: 1; padding: clamp(70px, 13vh, 170px) clamp(14px, 1.6vw, 24px) clamp(24px, 3vw, 44px); }
.zb52-contact-inner { position: relative; max-width: 1440px; margin: 0 auto; border-top: 1px solid var(--zb-line); padding: clamp(40px, 7vh, 96px) clamp(12px, 3vw, 60px) 0; }
.zb52-contact-head { max-width: 940px; margin-bottom: clamp(40px, 7vh, 72px); }
.zb52-contact-head .kick { display: inline-flex; align-items: center; gap: 12px; font-family: var(--zb-mono); font-size: 11px; letter-spacing: 0.26em; color: var(--zb-grey); margin-bottom: 26px; }
.zb52-contact-head .kick .jp { color: var(--zb-accent); letter-spacing: 0.12em; font-size: 13px; }
.zb52-contact-head .big { margin: 0; font-family: var(--zb-display); font-weight: 800; font-size: clamp(2.8rem, 9vw, 7.6rem); line-height: 0.86; letter-spacing: -0.035em; text-transform: uppercase; }
.zb52-contact-head .big em { padding: 0.02em 0.12em; }
.zb52-contact-head .sub { margin: clamp(24px, 3.5vh, 36px) 0 0; max-width: 52ch; font-size: clamp(1rem, 1.15vw, 1.2rem); line-height: 1.65; color: var(--zb-grey); }

.zb52-mailcta { display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 10px clamp(20px, 3vw, 44px); padding: clamp(26px, 3vw, 44px) clamp(24px, 3vw, 44px); margin-bottom: clamp(40px, 6vh, 64px); text-decoration: none; background: var(--zb-ink-2); border: 2px solid var(--zb-line); box-shadow: 6px 6px 0 0 rgba(0,0,0,0.4); transition: transform var(--snap), box-shadow var(--snap), border-color var(--snap), background var(--snap); }
.zb52-mailcta:hover { transform: translate(-5px, -5px); box-shadow: 12px 12px 0 0 var(--zb-accent); border-color: var(--zb-accent); background: var(--zb-ink-3); }
.zb52-mailcta .l { grid-column: 1; display: inline-flex; align-items: center; gap: 9px; font-family: var(--zb-mono); font-size: 10.5px; letter-spacing: 0.22em; color: var(--zb-grey-dim); }
.zb52-mailcta .l .jp { color: var(--zb-accent); font-size: 12px; letter-spacing: 0.12em; }
.zb52-mailcta .addr { grid-column: 1; grid-row: 2; font-family: var(--zb-display); font-weight: 700; font-size: clamp(1.5rem, 4vw, 2.9rem); letter-spacing: -0.015em; color: var(--zb-paper); word-break: break-word; line-height: 1; }
.zb52-mailcta .send { grid-column: 2; grid-row: 1 / 3; display: inline-flex; align-items: center; gap: 12px; font-family: var(--zb-mono); font-size: 12px; letter-spacing: 0.2em; color: var(--zb-grey); white-space: nowrap; }
.zb52-mailcta .send .arw { font-size: 20px; transition: transform var(--snap), color var(--snap); }
.zb52-mailcta:hover .send { color: var(--zb-accent); }
.zb52-mailcta:hover .send .arw { transform: translateX(6px); }

.zb52-links { list-style: none; margin: 0 0 clamp(48px, 8vh, 84px); padding: 0; border-top: 2px solid var(--zb-line-2); }
.zb52-links li { border-bottom: 2px solid var(--zb-line); }
.zb52-links a { position: relative; display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: clamp(16px, 3vw, 40px); padding: clamp(18px, 2.4vw, 30px) clamp(10px, 2vw, 22px); text-decoration: none; transition: padding var(--snap), background var(--snap); }
.zb52-links a::before { content: ''; position: absolute; left: 0; top: -2px; bottom: -2px; width: 3px; background: var(--zb-accent); transform: scaleY(0); transition: transform var(--snap); }
.zb52-links a:hover { background: var(--zb-ink-2); padding-left: clamp(18px, 2.6vw, 34px); }
.zb52-links a:hover::before { transform: scaleY(1); }
.zb52-links .k { font-family: var(--zb-mono); font-size: 11px; letter-spacing: 0.16em; color: var(--zb-grey-dim); }
.zb52-links .v { font-family: var(--zb-display); font-weight: 700; font-size: clamp(1.2rem, 2.2vw, 1.8rem); letter-spacing: -0.01em; color: var(--zb-paper); transition: color var(--snap); }
.zb52-links a:hover .v { color: var(--zb-accent); }
.zb52-links .arw { justify-self: end; font-size: 16px; color: var(--zb-grey-dim); transition: transform var(--snap), color var(--snap); }
.zb52-links a:hover .arw { transform: translate(3px, -3px); color: var(--zb-accent); }

.zb52-footer { display: flex; justify-content: space-between; align-items: center; gap: 18px; flex-wrap: wrap; padding: clamp(24px, 3vw, 34px) 0; border-top: 1px solid var(--zb-line); font-family: var(--zb-mono); font-size: 10.5px; letter-spacing: 0.18em; color: var(--zb-grey-dim); }
.zb52-footer .totop { color: var(--zb-grey); text-decoration: none; transition: color var(--snap); }
.zb52-footer .totop:hover { color: var(--zb-accent); }
.zb52-footer .totop .ar { color: var(--zb-accent); }

/* entrance / reveal */
.zb-in { opacity: 0; transform: translateY(14px); animation: zb-rise 0.62s cubic-bezier(0.2, 0, 0, 1) forwards; }
.zb-reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.6s cubic-bezier(0.2,0,0,1), transform 0.6s cubic-bezier(0.2,0,0,1); }
.zb-reveal.is-in { opacity: 1; transform: none; }
@keyframes zb-rise { to { opacity: 1; transform: none; } }
@keyframes zb-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(3px); } }

/* responsive */
@media (max-width: 920px) {
  .zb52-main { grid-template-columns: 1fr; align-items: start; }
  .zb52-namewrap, .zb52-focus { grid-column: 1 / -1; }
  .zb52-name .ln2 { margin-left: clamp(16px, 8vw, 48px); }
  .zb52-focus .cell:nth-child(2), .zb52-focus .cell:nth-child(3) { margin-right: 0; }
  .zb52-sec-head { grid-template-columns: 1fr; }
  .zb52-sec-head .note { grid-column: 1; grid-row: 3; text-align: left; }
  .zb52-about-grid { grid-template-columns: 1fr; }
  .zb52-reg-row a { grid-template-columns: auto 1fr; }
  .zb52-reg-row .rmeta { grid-column: 1 / -1; justify-self: start; margin-top: 14px; }
  .zb52-now li { grid-template-columns: 58px 1fr; }
  .zb52-now li .badge { grid-column: 2; justify-self: start; margin-top: 4px; }
}
@media (max-width: 520px) {
  .zb52-meta { font-size: 10px; }
  .zb52-meta-r { width: 100%; justify-content: space-between; }
  .zb52-contact-head .big { font-size: clamp(2rem, 11vw, 3.2rem); }
  .zb52-mailcta { grid-template-columns: 1fr; }
  .zb52-mailcta .send { grid-column: 1; grid-row: 3; justify-self: start; margin-top: 10px; }
  .zb52-links a { grid-template-columns: 1fr auto; }
  .zb52-links .k { grid-column: 1 / -1; }
  .zb52-nav .nav-cta { display: none; }
  .nav-links { gap: 18px; }
  .zb52-now li { grid-template-columns: 56px 1fr; }
  .zb52-now li .badge { grid-column: 2; justify-self: start; margin-top: 4px; }
}
@media (prefers-reduced-motion: reduce) {
  .zb-in, .zb-reveal { animation: none; opacity: 1; transform: none; transition: none; }
  .zb52-foot .scroll .ar { animation: none; }
}
`
