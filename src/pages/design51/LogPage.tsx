import { blogPosts } from '../design49Data'
import { ZB } from '../zenBrutalism'
import { PlateLink, pad2 } from './chrome'
import { PageHead, Reveal } from './plates'

// ═══════════════════════════════════════════════════════════════════
// Design 51 / LogPage — the full shop-floor log. Date-stamped rows;
// each entry opens its own page.
// ═══════════════════════════════════════════════════════════════════

export default function LogPage() {
  return (
    <div className="px-5 pt-24 sm:pt-32">
      <div className="mx-auto max-w-[880px]">
        <Reveal>
          <PageHead
            jpTag="日誌記録"
            enTag={`SHOP LOG — ${pad2(blogPosts.length)} ENTRIES`}
            title="LOG"
            lede="Field notes from the shop floor. Rebuilds, milestones, lessons — date-stamped and filed."
          />
        </Reveal>

        <div className="mt-10">
          {blogPosts.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.08}>
              <PlateLink
                to={`/log/${post.id}`}
                className="group grid grid-cols-[auto_1fr_auto] sm:grid-cols-[110px_1fr_auto] items-baseline gap-x-5 py-5 border-b"
                style={{ borderColor: ZB.edge }}
              >
                <span className="font-mono text-[11px] tabular-nums" style={{ color: ZB.inkDim }}>{post.date}</span>
                <span className="min-w-0">
                  <span className="block font-mono text-[14px] tracking-[0.06em] truncate transition-colors text-[color:var(--zb-ink)] group-hover:text-[color:var(--zb-accent)]">
                    {post.title}
                  </span>
                  <span className="mt-1.5 block font-mono text-[11.5px] leading-[1.6] truncate" style={{ color: ZB.inkDim }}>
                    {post.excerpt}
                  </span>
                </span>
                <span className="text-right shrink-0">
                  <span className="hidden sm:block font-mono text-[10px] tracking-[0.1em]" style={{ color: ZB.inkDim }}>
                    {post.tags.join(' · ')}
                  </span>
                  <span className="mt-1 block font-mono text-[10px] tabular-nums" style={{ color: ZB.inkDim }}>
                    {post.readTime}{' '}
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden>→</span>
                  </span>
                </span>
              </PlateLink>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}
