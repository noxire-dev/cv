import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import type { Project } from '../design49Data'
import { MECH_EASE, PLATE_TERMS, ZB, plateId } from '../zenBrutalism'
import { PlateLink, useTheme } from './chrome'

// ═══════════════════════════════════════════════════════════════════
// Design 51 / plates — shared plate anatomy: reveal motion, term rows,
// section heads, screw holes, punch dividers, the full DataPlate, and
// the prev/next register nav used by detail pages.
// ═══════════════════════════════════════════════════════════════════

// ── Scroll reveal — 12px translate + opacity, MECH_EASE, 0.5s ──

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: MECH_EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

// ── Term row: bilingual label column + value column ──

export function PlateRow({ term, value, valueColor }: { term: { jp: string; en: string }; value: string; valueColor?: string }) {
  return (
    <div className="grid grid-cols-[110px_1fr] sm:grid-cols-[140px_1fr] gap-4 py-2.5 border-b" style={{ borderColor: ZB.edge }}>
      <span className="font-mono text-[10px] tracking-[0.2em] leading-5" style={{ color: ZB.inkDim }}>
        <span className="font-jp mr-2 tracking-normal" style={{ color: ZB.inkMid }}>{term.jp}</span>{term.en}
      </span>
      <span className="font-mono text-[13px] leading-5" style={{ color: valueColor ?? ZB.ink }}>{value}</span>
    </div>
  )
}

export function SectionHead({ jp, en, tag, accentSquare }: { jp: string; en: string; tag?: string; accentSquare?: boolean }) {
  const { accent } = useTheme()
  return (
    <div className="flex items-center gap-3">
      {accentSquare && <span className="w-2 h-2 shrink-0" style={{ background: accent }} aria-hidden />}
      <span className="font-jp text-[13px] leading-none" style={{ color: ZB.inkMid }}>{jp}</span>
      <h2 className="font-mono text-[11px] tracking-[0.3em] leading-none" style={{ color: ZB.ink }}>{en}</h2>
      <span className="flex-1 h-px" style={{ background: ZB.edge }} aria-hidden />
      {tag && <span className="font-mono text-[10px] tracking-[0.15em] tabular-nums" style={{ color: ZB.inkDim }}>{tag}</span>}
    </div>
  )
}

export function ScrewHole({ pos }: { pos: string }) {
  return (
    <span
      className={`absolute ${pos} w-[9px] h-[9px] rounded-full border-2 pointer-events-none`}
      style={{ borderColor: ZB.edge, background: ZB.bgDeep }}
      aria-hidden
    />
  )
}

export function PunchDivider() {
  return (
    <div className="flex items-center justify-center gap-4 py-12 select-none" aria-hidden>
      <span className="w-[7px] h-[7px] rounded-full border-2" style={{ borderColor: ZB.edge }} />
      <span className="w-20 sm:w-28 h-px" style={{ background: ZB.edge }} />
      <span className="w-[7px] h-[7px] rounded-full border-2" style={{ borderColor: ZB.edge }} />
    </div>
  )
}

// ── Bilingual page header — list pages open with one of these ──
// The small accent square is the header's single accent at rest.

export function PageHead({ jpTag, enTag, title, lede }: { jpTag: string; enTag: string; title: string; lede?: string }) {
  const { accent } = useTheme()
  return (
    <header>
      <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.25em]" style={{ color: ZB.inkDim }}>
        <span className="w-2 h-2 shrink-0" style={{ background: accent }} aria-hidden />
        <span>
          <span className="font-jp mr-2 tracking-normal" style={{ color: ZB.inkMid }}>{jpTag}</span>{enTag}
        </span>
      </div>
      <h1 className="mt-4 font-archivo text-4xl sm:text-5xl leading-none tracking-tight" style={{ color: ZB.ink }}>
        {title}
      </h1>
      {lede && (
        <p className="mt-4 font-mono text-[12px] leading-[1.7] max-w-[560px]" style={{ color: ZB.inkMid }}>{lede}</p>
      )}
      <div className="mt-8 h-px" style={{ background: ZB.edge }} aria-hidden />
    </header>
  )
}

// ── DataPlate — full equipment plate, links to its spec sheet ──
// Single accent per plate at rest: STATUS value, only when LIVE/ACTIVE.

export function DataPlate({ p, n }: { p: Project; n: number }) {
  const { accent } = useTheme()
  const hot = p.status === 'LIVE' || p.status === 'ACTIVE'

  return (
    <PlateLink to={`/projects/${p.id}`} className="block group">
      <article className="border-2" style={{ borderColor: ZB.edge, background: ZB.plate }}>
        <div className="flex items-center justify-between gap-4 px-5 sm:px-7 py-4 border-b-2" style={{ borderColor: ZB.edge }}>
          <div className="flex items-baseline gap-3 min-w-0">
            <span className="font-mono text-[14px] select-none" style={{ color: ZB.inkMid }} aria-hidden>{p.glyph}</span>
            <h3 className="font-archivo text-xl sm:text-2xl leading-none truncate" style={{ color: ZB.ink }}>{p.name}</h3>
          </div>
          <span className="font-mono text-[10px] tracking-[0.15em] tabular-nums shrink-0" style={{ color: ZB.inkDim }}>
            {plateId(n)}
          </span>
        </div>

        <div className="px-5 sm:px-7 py-3">
          <PlateRow term={PLATE_TERMS.model} value={p.name.toUpperCase()} />
          <PlateRow term={PLATE_TERMS.serial} value={p.idx} />
          <PlateRow term={PLATE_TERMS.rated} value={p.stack.join(' / ')} />
          <PlateRow term={PLATE_TERMS.year} value={p.year} />
          <PlateRow term={PLATE_TERMS.status} value={p.status} valueColor={hot ? accent : ZB.inkMid} />
        </div>

        <p className="px-5 sm:px-7 pb-4 font-mono text-[11px] tracking-[0.05em]" style={{ color: ZB.inkDim }}>
          — {p.brief}
        </p>

        <div className="flex items-center justify-between px-5 sm:px-7 py-3 border-t-2" style={{ borderColor: ZB.edge, background: ZB.bgDeep }}>
          <span className="font-mono text-[10px] tracking-[0.2em]" style={{ color: ZB.inkDim }}>
            <span className="font-jp mr-2 tracking-normal" style={{ color: ZB.inkMid }}>仕様書</span>SPEC SHEET
          </span>
          <span className="font-mono text-[11px] tracking-[0.2em] transition-colors text-[color:var(--zb-ink)] group-hover:text-[color:var(--zb-accent)]">
            OPEN <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden>→</span>
          </span>
        </div>
      </article>
    </PlateLink>
  )
}

// ── Prev/next register nav — plate-styled, wraps around the register ──

export type RegisterTarget = { to: string; label: string; sub: string }

export function PrevNextNav({ prev, next }: { prev: RegisterTarget; next: RegisterTarget }) {
  return (
    <nav className="grid grid-cols-2 border-2" style={{ borderColor: ZB.edge, background: ZB.plate }} aria-label="Register">
      <PlateLink to={prev.to} className="group px-4 sm:px-6 py-5 min-w-0">
        <div className="font-mono text-[9px] tracking-[0.25em] mb-2" style={{ color: ZB.inkDim }}>
          <span className="inline-block transition-transform duration-200 group-hover:-translate-x-0.5" aria-hidden>←</span> PREV
          <span className="font-jp tracking-normal ml-1.5" style={{ color: ZB.inkMid }}>前</span>
        </div>
        <div className="font-archivo text-[15px] sm:text-lg leading-tight truncate transition-colors text-[color:var(--zb-ink)] group-hover:text-[color:var(--zb-accent)]">
          {prev.label}
        </div>
        <div className="mt-1 font-mono text-[10px] tracking-[0.15em] tabular-nums" style={{ color: ZB.inkDim }}>{prev.sub}</div>
      </PlateLink>
      <PlateLink to={next.to} className="group px-4 sm:px-6 py-5 min-w-0 text-right border-l-2" style={{ borderColor: ZB.edge }}>
        <div className="font-mono text-[9px] tracking-[0.25em] mb-2" style={{ color: ZB.inkDim }}>
          <span className="font-jp tracking-normal mr-1.5" style={{ color: ZB.inkMid }}>次</span>NEXT
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 ml-1" aria-hidden>→</span>
        </div>
        <div className="font-archivo text-[15px] sm:text-lg leading-tight truncate transition-colors text-[color:var(--zb-ink)] group-hover:text-[color:var(--zb-accent)]">
          {next.label}
        </div>
        <div className="mt-1 font-mono text-[10px] tracking-[0.15em] tabular-nums" style={{ color: ZB.inkDim }}>{next.sub}</div>
      </PlateLink>
    </nav>
  )
}
