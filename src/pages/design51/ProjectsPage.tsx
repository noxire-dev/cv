import { Fragment } from 'react'
import { projects } from '../design49Data'
import { pad2 } from './chrome'
import { DataPlate, PageHead, PunchDivider, Reveal } from './plates'

// ═══════════════════════════════════════════════════════════════════
// Design 51 / ProjectsPage — the full unit register. Every project
// as a complete data plate; each plate opens its spec sheet.
// ═══════════════════════════════════════════════════════════════════

export default function ProjectsPage() {
  return (
    <div className="px-5 pt-24 sm:pt-32">
      <div className="mx-auto max-w-[880px]">
        <Reveal>
          <PageHead
            jpTag="製品目録"
            enTag={`UNIT REGISTER — ${pad2(projects.length)} UNITS`}
            title="DATA PLATES"
            lede="Every unit leaves the shop with its own plate. Open one for the full specification sheet."
          />
        </Reveal>

        <div className="mt-12">
          {projects.map((p, i) => (
            <Fragment key={p.id}>
              {i > 0 && <PunchDivider />}
              <Reveal>
                <DataPlate p={p} n={i + 1} />
              </Reveal>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}
