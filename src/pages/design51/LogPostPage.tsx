import { useParams } from 'react-router-dom'
import { blogPosts } from '../design49Data'
import { ZB } from '../zenBrutalism'
import { PlateLink, ZbRedirect, pad2, useTheme } from './chrome'
import { PlateRow, PrevNextNav, Reveal, ScrewHole } from './plates'

// ═══════════════════════════════════════════════════════════════════
// Design 51 / LogPostPage — one filed log entry as a written record:
// stamped header plate, term rows for the metadata, the entry body,
// prev/next entry nav.
// ═══════════════════════════════════════════════════════════════════

const LOG_TERMS = {
  date: { jp: '日付', en: 'DATE' },
  read: { jp: '所要', en: 'READ TIME' },
  tags: { jp: '分類', en: 'TAGS' },
} as const

export default function LogPostPage() {
  const { id } = useParams<{ id: string }>()
  const { accent } = useTheme()

  const idx = blogPosts.findIndex(post => post.id === id)
  if (idx === -1) return <ZbRedirect to="/log" />

  const post = blogPosts[idx]
  const prevIdx = (idx - 1 + blogPosts.length) % blogPosts.length
  const nextIdx = (idx + 1) % blogPosts.length
  const prev = blogPosts[prevIdx]
  const next = blogPosts[nextIdx]

  return (
    <div className="px-5 pt-24 sm:pt-28">
      <div className="mx-auto max-w-[760px]">
        {/* ── Breadcrumb rail ── */}
        <Reveal>
          <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em]">
            <PlateLink to="/log" className="group flex items-baseline gap-2">
              <span
                className="inline-block transition-transform duration-200 group-hover:-translate-x-0.5"
                style={{ color: ZB.inkDim }}
                aria-hidden
              >
                ←
              </span>
              <span className="transition-colors text-[color:var(--zb-ink)] group-hover:text-[color:var(--zb-accent)]">
                <span className="font-jp mr-2 tracking-normal">日誌</span>LOG
              </span>
            </PlateLink>
            <span className="tabular-nums" style={{ color: ZB.inkDim }}>
              ENT-{pad2(idx + 1)} / {pad2(blogPosts.length)}
            </span>
          </div>
        </Reveal>

        {/* ── Entry plate — hanko square is this plate's single accent ── */}
        <Reveal className="mt-8">
          <article className="relative border-2" style={{ borderColor: ZB.edge, background: ZB.plate }}>
            <ScrewHole pos="top-1.5 left-1.5" />
            <ScrewHole pos="top-1.5 right-1.5" />
            <ScrewHole pos="bottom-1.5 left-1.5" />
            <ScrewHole pos="bottom-1.5 right-1.5" />

            <div className="flex items-center justify-between px-5 sm:px-8 py-3.5 border-b-2" style={{ borderColor: ZB.edge }}>
              <span className="flex items-baseline gap-3">
                <span className="font-jp text-[14px] leading-none" style={{ color: ZB.inkMid }}>日誌記録</span>
                <span className="font-mono text-[11px] tracking-[0.35em] leading-none" style={{ color: ZB.ink }}>LOG ENTRY</span>
              </span>
              <span className="w-3.5 h-3.5" style={{ background: accent }} aria-hidden />
            </div>

            <div className="px-5 sm:px-8 pt-7 pb-6 border-b" style={{ borderColor: ZB.edge }}>
              <h1
                className="font-archivo leading-[1.02] tracking-tight"
                style={{ fontSize: 'clamp(28px, 5.5vw, 52px)', color: ZB.ink }}
              >
                {post.title}
              </h1>
            </div>

            <div className="px-5 sm:px-8 py-4 border-b" style={{ borderColor: ZB.edge }}>
              <PlateRow term={LOG_TERMS.date} value={post.date} />
              <PlateRow term={LOG_TERMS.read} value={post.readTime.toUpperCase()} />
              <div className="[&>div]:border-b-0">
                <PlateRow term={LOG_TERMS.tags} value={post.tags.join(' · ')} />
              </div>
            </div>

            <div className="px-5 sm:px-8 py-7 sm:py-9">
              <p className="font-mono text-[13.5px] leading-[1.75] max-w-[560px]" style={{ color: ZB.ink }}>
                {post.excerpt}
              </p>
              <div className="mt-6 space-y-5 max-w-[560px]">
                {post.content.split('\n\n').map((para, i) => (
                  <p key={i} className="font-mono text-[12.5px] leading-[1.8]" style={{ color: ZB.inkMid }}>
                    {para}
                  </p>
                ))}
              </div>
              <div className="mt-8 flex items-center gap-3" aria-hidden>
                <span className="h-px flex-1" style={{ background: ZB.edge }} />
                <span className="font-mono text-[9px] tracking-[0.3em]" style={{ color: ZB.inkDim }}>END OF ENTRY</span>
                <span className="h-px flex-1" style={{ background: ZB.edge }} />
              </div>
            </div>
          </article>
        </Reveal>

        {/* ── Register nav ── */}
        <Reveal className="mt-14">
          <PrevNextNav
            prev={{ to: `/log/${prev.id}`, label: prev.title, sub: prev.date }}
            next={{ to: `/log/${next.id}`, label: next.title, sub: next.date }}
          />
        </Reveal>
      </div>
    </div>
  )
}
