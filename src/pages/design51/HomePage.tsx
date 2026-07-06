import {
    type Capability,
    blogPosts,
    capabilities,
    contactLinks,
    experience,
    projects,
} from '../design49Data'
import { LABELS, PLATE_TERMS, ZB } from '../zenBrutalism'
import { PlateLink, pad2, useTheme } from './chrome'
import { PlateRow, Reveal, ScrewHole, SectionHead } from './plates'

// ═══════════════════════════════════════════════════════════════════
// Design 51 / HomePage — the manifest hub. Nameplate hero, index of
// everything (routes + in-page sections), compact plate teasers,
// full inspection log, ratings, log teasers, contact.
// ═══════════════════════════════════════════════════════════════════

// ── NameplateHero — the machine's own 銘板 ──
// Single accent at rest: the vermillion hanko square in the header row.

function NameplateHero() {
  const { accent } = useTheme()
  return (
    <section className="px-5 pt-28 sm:pt-36">
      <Reveal className="mx-auto max-w-[880px]">
        <div className="relative border-2" style={{ borderColor: ZB.edge, background: ZB.plate }}>
          <ScrewHole pos="top-1.5 left-1.5" />
          <ScrewHole pos="top-1.5 right-1.5" />
          <ScrewHole pos="bottom-1.5 left-1.5" />
          <ScrewHole pos="bottom-1.5 right-1.5" />

          <div className="flex items-center justify-between px-5 sm:px-8 py-3.5 border-b-2" style={{ borderColor: ZB.edge }}>
            <span className="flex items-baseline gap-3">
              <span className="font-jp text-[14px] leading-none" style={{ color: ZB.inkMid }}>銘板</span>
              <span className="font-mono text-[11px] tracking-[0.35em] leading-none" style={{ color: ZB.ink }}>NAMEPLATE</span>
            </span>
            <span className="w-3.5 h-3.5" style={{ background: accent }} aria-hidden />
          </div>

          <div className="px-5 sm:px-8 pt-7 pb-6 border-b" style={{ borderColor: ZB.edge }}>
            <div className="font-mono text-[10px] tracking-[0.2em] mb-3" style={{ color: ZB.inkDim }}>
              <span className="font-jp mr-2 tracking-normal" style={{ color: ZB.inkMid }}>{PLATE_TERMS.model.jp}</span>{PLATE_TERMS.model.en}
            </div>
            <h1
              className="font-archivo leading-[0.95] tracking-tight"
              style={{ fontSize: 'clamp(40px, 8vw, 96px)', color: ZB.ink }}
            >
              SINA DILEK
            </h1>
          </div>

          <div className="px-5 sm:px-8 py-4 [&>*:last-child]:border-b-0">
            <PlateRow term={PLATE_TERMS.serial} value="NX-2003-UK" />
            <PlateRow term={PLATE_TERMS.rated} value="CTO @ PRICE LANTERN / CS @ ESSEX" />
            <PlateRow term={PLATE_TERMS.year} value="2003" />
            <PlateRow term={PLATE_TERMS.status} value="OPERATIONAL" />
          </div>
        </div>
      </Reveal>
    </section>
  )
}

// ── ManifestIndex — table of contents; route rows are real links ──

type IndexRow =
  | { kind: 'route'; to: string; jp: string; en: string; count: string }
  | { kind: 'anchor'; target: string; jp: string; en: string; count: string }

const INDEX_ROWS: IndexRow[] = [
  { kind: 'route', to: '/projects', jp: LABELS.projects.jp, en: 'DATA PLATES', count: `${pad2(projects.length)} UNITS` },
  { kind: 'anchor', target: 'inspection', jp: '検査記録', en: 'INSPECTION LOG', count: `${pad2(experience.length)} RECORD` },
  { kind: 'anchor', target: 'ratings', jp: LABELS.capabilities.jp, en: 'CAPABILITIES', count: `${pad2(capabilities.length)} RATED` },
  { kind: 'route', to: '/log', jp: LABELS.log.jp, en: 'LOG', count: `${pad2(blogPosts.length)} ENTRIES` },
  { kind: 'anchor', target: 'contact', jp: LABELS.contact.jp, en: 'CONTACT', count: `${pad2(contactLinks.length)} CHANNELS` },
]

function IndexRowBody({ i, jp, en, count }: { i: number; jp: string; en: string; count: string }) {
  return (
    <>
      <span className="font-mono text-[10px] tabular-nums" style={{ color: ZB.inkDim }}>{pad2(i + 1)}</span>
      <span className="flex items-baseline gap-2.5 min-w-0">
        <span className="font-jp text-[12px]" style={{ color: ZB.inkMid }}>{jp}</span>
        <span className="font-mono text-[12px] tracking-[0.2em] truncate transition-colors text-[color:var(--zb-ink)] group-hover:text-[color:var(--zb-accent)]">
          {en}
        </span>
      </span>
      <span className="font-mono text-[10px] tracking-[0.1em] tabular-nums" style={{ color: ZB.inkDim }}>{count}</span>
    </>
  )
}

function ManifestIndex() {
  const rowClass = 'group grid grid-cols-[32px_1fr_auto] items-baseline gap-4 py-3.5 border-b'

  return (
    <section className="px-5 pt-24 sm:pt-32">
      <div className="mx-auto max-w-[880px]">
        <Reveal>
          <SectionHead jp="目録" en="MANIFEST INDEX" tag="SEC-00" accentSquare />
        </Reveal>
        <div className="mt-8">
          {INDEX_ROWS.map((r, i) => (
            <Reveal key={r.en} delay={i * 0.08}>
              {r.kind === 'route' ? (
                <PlateLink to={r.to} className={rowClass} style={{ borderColor: ZB.edge }}>
                  <IndexRowBody i={i} jp={r.jp} en={r.en} count={r.count} />
                </PlateLink>
              ) : (
                <a
                  href={`#${r.target}`}
                  onClick={e => {
                    e.preventDefault()
                    document.getElementById(r.target)?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className={rowClass}
                  style={{ borderColor: ZB.edge }}
                >
                  <IndexRowBody i={i} jp={r.jp} en={r.en} count={r.count} />
                </a>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── PlateTeasers — compact unit register; each row opens a spec sheet ──
// Status column is the plate's indicator system: hot units read accent.

function PlateTeasers() {
  const { accent } = useTheme()
  return (
    <section className="px-5 pt-28">
      <div className="mx-auto max-w-[880px]">
        <Reveal>
          <SectionHead jp={LABELS.projects.jp} en="DATA PLATES" tag={`${pad2(projects.length)} UNITS`} />
        </Reveal>
        <Reveal className="mt-8">
          <div className="border-2" style={{ borderColor: ZB.edge, background: ZB.plate }}>
            {projects.map(p => {
              const hot = p.status === 'LIVE' || p.status === 'ACTIVE'
              return (
                <PlateLink
                  key={p.id}
                  to={`/projects/${p.id}`}
                  className="group grid grid-cols-[24px_1fr_auto] sm:grid-cols-[24px_1fr_84px_76px_16px] items-baseline gap-x-4 px-5 sm:px-7 py-3.5 border-b"
                  style={{ borderColor: ZB.edge }}
                >
                  <span className="font-mono text-[12px] select-none" style={{ color: ZB.inkDim }} aria-hidden>{p.glyph}</span>
                  <span className="font-archivo text-[15px] leading-none truncate transition-colors text-[color:var(--zb-ink)] group-hover:text-[color:var(--zb-accent)]">
                    {p.name}
                  </span>
                  <span className="hidden sm:inline font-mono text-[10px] tracking-[0.15em] tabular-nums" style={{ color: ZB.inkDim }}>
                    {p.idx}
                  </span>
                  <span className="hidden sm:inline font-mono text-[10px] tracking-[0.15em]" style={{ color: hot ? accent : ZB.inkMid }}>
                    {p.status}
                  </span>
                  <span
                    className="font-mono text-[11px] justify-self-end inline-block transition-transform duration-200 group-hover:translate-x-0.5"
                    style={{ color: ZB.inkDim }}
                    aria-hidden
                  >
                    →
                  </span>
                </PlateLink>
              )
            })}
            <PlateLink to="/projects" className="group flex items-center justify-between px-5 sm:px-7 py-3" style={{ background: ZB.bgDeep }}>
              <span className="font-mono text-[10px] tracking-[0.2em]" style={{ color: ZB.inkDim }}>
                <span className="font-jp mr-2 tracking-normal" style={{ color: ZB.inkMid }}>全機</span>ALL UNITS
              </span>
              <span className="font-mono text-[11px] tracking-[0.2em] transition-colors text-[color:var(--zb-ink)] group-hover:text-[color:var(--zb-accent)]">
                /PROJECTS <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden>→</span>
              </span>
            </PlateLink>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ── InspectionLog — experience as an inspection record ──
// Single accent at rest: the rotated vermillion PASS stamp.

function InspectionLog() {
  const { accent } = useTheme()
  return (
    <section id="inspection" className="px-5 pt-28 scroll-mt-16">
      <div className="mx-auto max-w-[880px]">
        <Reveal>
          <SectionHead jp="検査記録" en="INSPECTION LOG" tag={`${pad2(experience.length)} RECORD`} />
        </Reveal>

        {experience.map(job => (
          <Reveal key={job.id} className="mt-12">
            <div className="relative border-2" style={{ borderColor: ZB.edge, background: ZB.plate }}>
              <div
                className="absolute top-5 right-4 sm:top-7 sm:right-8 -rotate-6 border-2 px-2.5 py-1 font-mono text-[11px] tracking-[0.3em] leading-none select-none pointer-events-none"
                style={{ borderColor: accent, color: accent }}
                aria-hidden
              >
                <span className="font-jp mr-1.5 tracking-normal">検</span>PASS
              </div>

              <div className="px-5 sm:px-7 pt-7 pb-5 border-b-2" style={{ borderColor: ZB.edge }}>
                <h3 className="font-archivo text-2xl sm:text-3xl leading-tight pr-24" style={{ color: ZB.ink }}>{job.role}</h3>
                <div className="mt-2 font-mono text-[12px] tracking-[0.08em]" style={{ color: ZB.inkMid }}>{job.company} · {job.tagline}</div>
                <div className="mt-1 font-mono text-[10px] tracking-[0.15em]" style={{ color: ZB.inkDim }}>{job.period} · {job.location.toUpperCase()}</div>
                <p className="mt-4 font-mono text-[12px] leading-[1.7] max-w-[640px]" style={{ color: ZB.inkMid }}>{job.summary}</p>
              </div>

              <div className="[&>div:last-child_.insp-row]:border-b-0">
                {job.highlights.map((h, i) => (
                  <Reveal key={h.label} delay={i * 0.08}>
                    <div
                      className="insp-row grid grid-cols-[84px_1fr] sm:grid-cols-[110px_1fr] gap-4 px-5 sm:px-7 py-4 border-b"
                      style={{ borderColor: ZB.edge }}
                    >
                      <span className="font-mono text-[15px] tabular-nums leading-5" style={{ color: ZB.ink }}>{h.stat}</span>
                      <div>
                        <div className="font-mono text-[11px] tracking-[0.2em] uppercase" style={{ color: ZB.inkMid }}>{h.label}</div>
                        <p className="mt-1 font-mono text-[11.5px] leading-[1.65]" style={{ color: ZB.inkDim }}>{h.detail}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

// ── RatingsPlate — capabilities as electrical ratings ──
// Stepped 10-cell bars; the current-level cell carries accent only on
// PRIMARY entries (per spec — the plate's indicator system).

const CATEGORY_ORDER: Capability['category'][] = ['LANGUAGES', 'FRAMEWORKS', 'SYSTEMS', 'TOOLS']
const CATEGORY_JP: Record<Capability['category'], string> = {
  LANGUAGES: '言語',
  FRAMEWORKS: '枠組',
  SYSTEMS: '系統',
  TOOLS: '工具',
}

function SteppedBar({ pct, level }: { pct: number; level: Capability['level'] }) {
  const { accent } = useTheme()
  const filled = Math.max(0, Math.min(10, Math.round(pct / 10)))
  return (
    <div className="flex gap-[3px]" role="img" aria-label={`${pct}%`}>
      {Array.from({ length: 10 }, (_, i) => {
        const isFilled = i < filled
        const isCurrent = i === filled - 1
        return (
          <span
            key={i}
            className="h-[9px] flex-1 max-w-[22px] border"
            style={{
              background: isFilled ? (isCurrent && level === 'PRIMARY' ? accent : ZB.inkMid) : 'transparent',
              borderColor: isFilled ? 'transparent' : ZB.edge,
            }}
          />
        )
      })}
    </div>
  )
}

function RatingsPlate() {
  const groups = CATEGORY_ORDER
    .map(c => ({ category: c, items: capabilities.filter(k => k.category === c) }))
    .filter(g => g.items.length > 0)

  return (
    <section id="ratings" className="px-5 pt-28 scroll-mt-16">
      <div className="mx-auto max-w-[880px]">
        <Reveal>
          <SectionHead jp={LABELS.capabilities.jp} en={LABELS.capabilities.en} tag={`${pad2(capabilities.length)} RATED`} />
        </Reveal>

        <Reveal className="mt-12">
          <div className="border-2" style={{ borderColor: ZB.edge, background: ZB.plate }}>
            {groups.map((g, gi) => (
              <div key={g.category}>
                <div
                  className={`flex items-center justify-between px-5 sm:px-7 py-2.5 border-b-2 ${gi > 0 ? 'border-t-2' : ''}`}
                  style={{ borderColor: ZB.edge, background: ZB.bgDeep }}
                >
                  <span className="font-mono text-[10px] tracking-[0.25em]" style={{ color: ZB.inkDim }}>
                    <span className="font-jp mr-2 tracking-normal" style={{ color: ZB.inkMid }}>{CATEGORY_JP[g.category]}</span>
                    {g.category}
                  </span>
                  <span className="font-mono text-[10px] tabular-nums" style={{ color: ZB.inkDim }}>{pad2(g.items.length)}</span>
                </div>
                <div className="[&>div:last-child]:border-b-0">
                  {g.items.map(cap => (
                    <div
                      key={cap.name}
                      className="grid grid-cols-[1fr_auto] sm:grid-cols-[170px_92px_1fr_48px] items-center gap-x-4 gap-y-2 px-5 sm:px-7 py-3 border-b"
                      style={{ borderColor: ZB.edge }}
                    >
                      <span className="font-mono text-[13px] leading-none" style={{ color: ZB.ink }}>{cap.name}</span>
                      <span className="hidden sm:block font-mono text-[9px] tracking-[0.2em]" style={{ color: ZB.inkDim }}>{cap.level}</span>
                      <div className="col-span-2 sm:col-span-1 sm:order-none order-last">
                        <SteppedBar pct={cap.pct} level={cap.level} />
                      </div>
                      <span className="font-mono text-[11px] tabular-nums text-right" style={{ color: ZB.inkDim }}>{cap.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ── LogTeaser — three date-stamped entries; each opens its page ──
// Single accent at rest: the section-head square.

function LogTeaser() {
  return (
    <section className="px-5 pt-28">
      <div className="mx-auto max-w-[880px]">
        <Reveal>
          <SectionHead jp={LABELS.log.jp} en={LABELS.log.en} tag={`${pad2(blogPosts.length)} ENTRIES`} accentSquare />
        </Reveal>
        <div className="mt-8">
          {blogPosts.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.08}>
              <PlateLink
                to={`/log/${post.id}`}
                className="group grid grid-cols-[auto_1fr_auto] sm:grid-cols-[96px_1fr_auto_auto_auto] items-baseline gap-x-4 py-4 border-b"
                style={{ borderColor: ZB.edge }}
              >
                <span className="font-mono text-[11px] tabular-nums" style={{ color: ZB.inkDim }}>{post.date}</span>
                <span className="font-mono text-[13px] tracking-[0.08em] truncate transition-colors text-[color:var(--zb-ink)] group-hover:text-[color:var(--zb-accent)]">
                  {post.title}
                </span>
                <span className="hidden sm:inline font-mono text-[10px] tracking-[0.1em]" style={{ color: ZB.inkDim }}>
                  {post.tags.join(' · ')}
                </span>
                <span className="hidden sm:inline font-mono text-[10px] tabular-nums" style={{ color: ZB.inkDim }}>{post.readTime}</span>
                <span
                  className="font-mono text-[12px] justify-self-end inline-block transition-transform duration-200 group-hover:translate-x-0.5"
                  style={{ color: ZB.inkDim }}
                  aria-hidden
                >
                  →
                </span>
              </PlateLink>
            </Reveal>
          ))}
          <Reveal delay={blogPosts.length * 0.08}>
            <PlateLink to="/log" className="group flex items-center justify-between py-3.5">
              <span className="font-mono text-[10px] tracking-[0.2em]" style={{ color: ZB.inkDim }}>
                <span className="font-jp mr-2 tracking-normal" style={{ color: ZB.inkMid }}>全記録</span>FULL LOG
              </span>
              <span className="font-mono text-[11px] tracking-[0.2em] transition-colors text-[color:var(--zb-ink)] group-hover:text-[color:var(--zb-accent)]">
                /LOG <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden>→</span>
              </span>
            </PlateLink>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ── ContactPlate — three channels stamped on one plate ──
// Single accent at rest: the email row's value.

const CONTACT_JP: Record<string, string> = {
  EMAIL: 'メール',
  GITHUB: 'ギットハブ',
  LINKEDIN: 'リンクトイン',
}

function ContactPlate() {
  const { accent } = useTheme()
  return (
    <section id="contact" className="px-5 pt-28 scroll-mt-16">
      <div className="mx-auto max-w-[880px]">
        <Reveal>
          <SectionHead jp={LABELS.contact.jp} en={LABELS.contact.en} tag={`${pad2(contactLinks.length)} CHANNELS`} />
        </Reveal>

        <Reveal className="mt-12">
          <div className="border-2 px-5 sm:px-8 py-4 [&>a:last-child>div]:border-b-0" style={{ borderColor: ZB.edge, background: ZB.plate }}>
            {contactLinks.map(c => {
              const isEmail = c.label === 'EMAIL'
              return (
                <a
                  key={c.label}
                  href={c.href}
                  target={isEmail ? undefined : '_blank'}
                  rel={isEmail ? undefined : 'noreferrer'}
                  className="block group"
                >
                  <div className="grid grid-cols-[110px_1fr] sm:grid-cols-[140px_1fr] gap-4 py-3 border-b" style={{ borderColor: ZB.edge }}>
                    <span className="font-mono text-[10px] tracking-[0.2em] leading-5" style={{ color: ZB.inkDim }}>
                      <span className="font-jp mr-2 tracking-normal" style={{ color: ZB.inkMid }}>{CONTACT_JP[c.label] ?? '連絡'}</span>{c.label}
                    </span>
                    <span
                      className={`font-mono text-[13px] leading-5 transition-colors group-hover:text-[color:var(--zb-accent)] ${isEmail ? '' : 'text-[color:var(--zb-ink)]'}`}
                      style={isEmail ? { color: accent } : undefined}
                    >
                      {c.value} <span style={{ color: ZB.inkDim }} aria-hidden>↗</span>
                    </span>
                  </div>
                </a>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ── Page ──

export default function HomePage() {
  return (
    <>
      <NameplateHero />
      <ManifestIndex />
      <PlateTeasers />
      <InspectionLog />
      <RatingsPlate />
      <LogTeaser />
      <ContactPlate />
    </>
  )
}
