import { useParams } from 'react-router-dom'
import { projects } from '../design49Data'
import { PLATE_TERMS, ZB, plateId } from '../zenBrutalism'
import { PlateLink, ZbRedirect, pad2, useTheme } from './chrome'
import { PlateRow, PrevNextNav, Reveal, ScrewHole, SectionHead } from './plates'

// ═══════════════════════════════════════════════════════════════════
// Design 51 / ProjectDetailPage — the full equipment spec sheet.
// Nameplate header, impact strip, overview, problem/approach pair,
// fitted-features grid, live-unit CTA, prev/next register nav.
// ═══════════════════════════════════════════════════════════════════

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { accent } = useTheme()

  const idx = projects.findIndex(p => p.id === id)
  if (idx === -1) return <ZbRedirect to="/projects" />

  const p = projects[idx]
  const hot = p.status === 'LIVE' || p.status === 'ACTIVE'
  const prevIdx = (idx - 1 + projects.length) % projects.length
  const nextIdx = (idx + 1) % projects.length
  const prev = projects[prevIdx]
  const next = projects[nextIdx]

  return (
    <div className="px-5 pt-24 sm:pt-28">
      <div className="mx-auto max-w-[880px]">
        {/* ── Breadcrumb rail ── */}
        <Reveal>
          <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em]">
            <PlateLink to="/projects" className="group flex items-baseline gap-2">
              <span
                className="inline-block transition-transform duration-200 group-hover:-translate-x-0.5"
                style={{ color: ZB.inkDim }}
                aria-hidden
              >
                ←
              </span>
              <span className="transition-colors text-[color:var(--zb-ink)] group-hover:text-[color:var(--zb-accent)]">
                <span className="font-jp mr-2 tracking-normal">製品</span>DATA PLATES
              </span>
            </PlateLink>
            <span className="tabular-nums" style={{ color: ZB.inkDim }}>
              {plateId(idx + 1)} / {plateId(projects.length)}
            </span>
          </div>
        </Reveal>

        {/* ── Nameplate header — the unit's own plate, full size ── */}
        {/* Single accent at rest: STATUS value when the unit runs hot. */}
        <Reveal className="mt-8">
          <div className="relative border-2" style={{ borderColor: ZB.edge, background: ZB.plate }}>
            <ScrewHole pos="top-1.5 left-1.5" />
            <ScrewHole pos="top-1.5 right-1.5" />
            <ScrewHole pos="bottom-1.5 left-1.5" />
            <ScrewHole pos="bottom-1.5 right-1.5" />

            <div className="flex items-center justify-between px-5 sm:px-8 py-3.5 border-b-2" style={{ borderColor: ZB.edge }}>
              <span className="flex items-baseline gap-3">
                <span className="font-jp text-[14px] leading-none" style={{ color: ZB.inkMid }}>仕様書</span>
                <span className="font-mono text-[11px] tracking-[0.35em] leading-none" style={{ color: ZB.ink }}>SPEC SHEET</span>
              </span>
              <span className="font-mono text-[10px] tracking-[0.15em] tabular-nums" style={{ color: ZB.inkDim }}>{p.idx}</span>
            </div>

            <div className="px-5 sm:px-8 pt-7 pb-6 border-b" style={{ borderColor: ZB.edge }}>
              <div className="flex items-start justify-between gap-6">
                <div className="min-w-0">
                  <div className="font-mono text-[10px] tracking-[0.2em] mb-3" style={{ color: ZB.inkDim }}>
                    <span className="font-jp mr-2 tracking-normal" style={{ color: ZB.inkMid }}>{PLATE_TERMS.model.jp}</span>
                    {PLATE_TERMS.model.en}
                  </div>
                  <h1
                    className="font-archivo leading-[0.95] tracking-tight"
                    style={{ fontSize: 'clamp(34px, 6.5vw, 72px)', color: ZB.ink }}
                  >
                    {p.name.toUpperCase()}
                  </h1>
                  <p className="mt-3 font-mono text-[12px] tracking-[0.05em]" style={{ color: ZB.inkMid }}>— {p.brief}</p>
                </div>
                <span className="hidden sm:block font-mono text-4xl leading-none select-none shrink-0" style={{ color: ZB.inkDim }} aria-hidden>
                  {p.glyph}
                </span>
              </div>
            </div>

            <div className="px-5 sm:px-8 py-4 [&>*:last-child]:border-b-0">
              <PlateRow term={PLATE_TERMS.serial} value={p.idx} />
              <PlateRow term={PLATE_TERMS.rated} value={p.stack.join(' / ')} />
              <PlateRow term={PLATE_TERMS.year} value={p.year} />
              <PlateRow term={PLATE_TERMS.status} value={p.status} valueColor={hot ? accent : ZB.inkMid} />
            </div>
          </div>
        </Reveal>

        {/* ── Impact strip — recessed well, vermillion register bar ── */}
        <Reveal className="mt-10">
          <div className="relative border-2 px-5 sm:px-8 py-6" style={{ borderColor: ZB.edge, background: ZB.bgDeep }}>
            <span className="absolute left-[-2px] top-[-2px] bottom-[-2px] w-[3px]" style={{ background: accent }} aria-hidden />
            <div className="font-mono text-[10px] tracking-[0.25em] mb-3" style={{ color: ZB.inkDim }}>
              <span className="font-jp mr-2 tracking-normal" style={{ color: ZB.inkMid }}>効果</span>IMPACT
            </div>
            <p className="font-mono text-[14px] sm:text-[15px] leading-[1.75] max-w-[720px]" style={{ color: ZB.ink }}>
              {p.impact}
            </p>
          </div>
        </Reveal>

        {/* ── Overview ── */}
        <Reveal className="mt-14">
          <SectionHead jp="概要" en="OVERVIEW" tag={`DOC-${pad2(idx + 1)}-A`} />
          <p className="mt-6 font-mono text-[13px] leading-[1.8] max-w-[700px]" style={{ color: ZB.inkMid }}>
            {p.overview}
          </p>
        </Reveal>

        {/* ── Problem / Approach — paired inspection panels ── */}
        <Reveal className="mt-14">
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="border-2 px-5 sm:px-6 py-5" style={{ borderColor: ZB.edge, background: ZB.plate }}>
              <div className="font-mono text-[10px] tracking-[0.25em] mb-3 pb-3 border-b" style={{ color: ZB.inkDim, borderColor: ZB.edge }}>
                <span className="font-jp mr-2 tracking-normal" style={{ color: ZB.inkMid }}>課題</span>PROBLEM
              </div>
              <p className="font-mono text-[12px] leading-[1.75]" style={{ color: ZB.inkMid }}>{p.problem}</p>
            </div>
            <div className="border-2 px-5 sm:px-6 py-5" style={{ borderColor: ZB.edge, background: ZB.plate }}>
              <div className="font-mono text-[10px] tracking-[0.25em] mb-3 pb-3 border-b" style={{ color: ZB.inkDim, borderColor: ZB.edge }}>
                <span className="font-jp mr-2 tracking-normal" style={{ color: ZB.inkMid }}>手法</span>APPROACH
              </div>
              <p className="font-mono text-[12px] leading-[1.75]" style={{ color: ZB.inkMid }}>{p.approach}</p>
            </div>
          </div>
        </Reveal>

        {/* ── Fitted features — numbered cell grid ── */}
        <Reveal className="mt-14">
          <SectionHead jp="機能" en="FEATURES" tag={`${pad2(p.features.length)} FITTED`} />
          <div className="mt-6 grid sm:grid-cols-2 border-2" style={{ borderColor: ZB.edge, background: ZB.plate }}>
            {p.features.map((f, i) => (
              <div
                key={f}
                className={`flex items-baseline gap-3 px-5 sm:px-6 py-4 border-b [&:last-child]:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0 ${i % 2 === 0 ? 'sm:border-r' : ''}`}
                style={{ borderColor: ZB.edge }}
              >
                <span className="font-mono text-[9px] tracking-[0.2em] tabular-nums shrink-0" style={{ color: ZB.inkDim }}>
                  F-{pad2(i + 1)}
                </span>
                <span className="font-mono text-[12px] leading-[1.6]" style={{ color: ZB.ink }}>{f}</span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ── Live unit CTA ── */}
        <Reveal className="mt-14">
          <a
            href={p.link}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-2 px-5 sm:px-8 py-5"
            style={{ borderColor: ZB.edge, background: ZB.plate }}
          >
            <span className="font-mono text-[10px] tracking-[0.25em]" style={{ color: ZB.inkDim }}>
              <span className="font-jp mr-2 tracking-normal" style={{ color: ZB.inkMid }}>実機確認</span>VIEW LIVE UNIT
            </span>
            <span className="font-mono text-[12px] sm:text-[13px] tracking-[0.08em] transition-colors text-[color:var(--zb-ink)] group-hover:text-[color:var(--zb-accent)]">
              {p.link.replace(/^https?:\/\//, '')}{' '}
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden>↗</span>
            </span>
          </a>
        </Reveal>

        {/* ── Register nav ── */}
        <Reveal className="mt-14">
          <PrevNextNav
            prev={{ to: `/projects/${prev.id}`, label: prev.name, sub: plateId(prevIdx + 1) }}
            next={{ to: `/projects/${next.id}`, label: next.name, sub: plateId(nextIdx + 1) }}
          />
        </Reveal>
      </div>
    </div>
  )
}
