# Japanese Industrial Redesign (Zen Brutalism) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build two dark "night factory" Japanese-industrial prototype designs (Design 50 "Re-plate", Design 51 "Nameplate") on a shared Zen Brutalism token module, with a browser switcher, leaving Design 49 untouched and deployed.

**Architecture:** A new `zenBrutalism.ts` token module holds the reusable design system (palette, bilingual labels, nameplate field terms, motion easings, dev presets). Design 50 is a re-materialized copy of `Design49.tsx` consuming those tokens; Design 51 is a from-scratch single-scroll "equipment manifest" page. `main.tsx` gains a query-param + keyboard switcher.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind 3, framer-motion. Fonts: Archivo Black (display), JetBrains Mono (labels/data), Noto Sans JP (kanji — new).

## Global Constraints

- Design 49 stays deployed and **unmodified** (`src/pages/Design49.tsx`, `src/pages/design49Data.ts` content untouched; 50/51 import from `design49Data.ts` read-only)
- Accent discipline: vermillion `#D9402B` (tunable), **one accent element per plate/section**, no second accent color
- Forbidden: animated grain, rust textures, grunge overlays. Static grain ≤ 3% opacity allowed
- Motion: mechanical easing only — `cubic-bezier(0.85, 0, 0.15, 1)` snaps/steps/stamps; no soft floaty easing
- Bilingual labels use real Japanese nameplate terms (see Task 1 `LABELS` / `PLATE_TERMS`)
- Verification per task: `npx tsc --noEmit` passes and `npm run build` succeeds; visual checks on `npm run dev` (port 4000)
- Both prototypes must render all data from `design49Data.ts`: 5 projects, 1 experience job, 3 blog posts, 14 capabilities, 3 contact links

---

### Task 1: Zen Brutalism token module

**Files:**
- Create: `src/pages/zenBrutalism.ts`

**Interfaces:**
- Produces: `ZB` (palette const object), `MECH_EASE` (number tuple), `LABELS`, `PLATE_TERMS`, `ZB_PRESETS`, `plateId(n: number): string`, `zbAccentSoft(hex: string): string` — consumed by Tasks 3 and 4.

- [ ] **Step 1: Write the module**

```ts
// zenBrutalism.ts — ZEN BRUTALISM design system, v0.1
// Japanese industrial / machine-plate brutalism. Night-factory dark.
// Reusable token seed: keep this file free of component code.

// ── MATERIAL ──
export const ZB = {
  bg:        '#141114',  // warm charcoal — dark steel, not dead black
  bgDeep:    '#0E0C0E',  // recessed wells, page edges
  plate:     '#1C181B',  // gunmetal plate surface
  plateUp:   '#241F23',  // raised plate / hover
  edge:      '#373136',  // primary 2px border tone
  edgeHi:    '#4E464C',  // border on hover/active
  ink:       '#EAE4DA',  // warm off-white primary text
  inkMid:    '#A89E93',  // secondary
  inkDim:    '#6E655D',  // labels, dim metadata
  accent:    '#D9402B',  // vermillion / shu red — the hanko stamp
  accentDim: '#9A2E1F',
  accentSub: 'rgba(217, 64, 43, 0.08)',
} as const

// ── MOTION — mechanical, never floaty ──
export const MECH_EASE: [number, number, number, number] = [0.85, 0, 0.15, 1]
export const MECH_SNAP: [number, number, number, number] = [0.9, 0, 0.1, 1]
export const STAMP_DURATION = 0.38

// ── BILINGUAL LABELS (kanji / EN) ──
export const LABELS = {
  projects:     { jp: '製品', en: 'PROJECTS' },
  work:         { jp: '経歴', en: 'WORK' },
  log:          { jp: '日誌', en: 'LOG' },
  contact:      { jp: '連絡', en: 'CONTACT' },
  capabilities: { jp: '技能', en: 'CAPABILITIES' },
  profile:      { jp: '概要', en: 'PROFILE' },
  specs:        { jp: '仕様', en: 'SPECIFICATIONS' },
} as const
export type LabelKey = keyof typeof LABELS

// ── NAMEPLATE FIELD TERMS — real Japanese equipment-plate vocabulary ──
export const PLATE_TERMS = {
  model:  { jp: '型式',     en: 'MODEL' },
  serial: { jp: '製造番号', en: 'SERIAL NO.' },
  rated:  { jp: '定格',     en: 'RATED' },
  year:   { jp: '製造年',   en: 'MFG. YEAR' },
  status: { jp: '状態',     en: 'STATUS' },
  maker:  { jp: '製造者',   en: 'MANUFACTURER' },
} as const

// ── DEV PICKER PRESETS — vermillion family ──
export const ZB_PRESETS = [
  { name: 'SHU',    hex: '#D9402B' },
  { name: 'AKA',    hex: '#C7331E' },
  { name: 'HI',     hex: '#E85C3A' },
  { name: 'ENJI',   hex: '#B03A2E' },
  { name: 'SIGNAL', hex: '#E8590C' },
  { name: 'KURENAI',hex: '#C33149' },
] as const

// ── HELPERS ──
export function plateId(n: number): string {
  return `PLT-${String(n).padStart(3, '0')}`
}

export function zbAccentSoft(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return '#' + [r, g, b]
    .map(c => Math.max(0, Math.round(c * 0.7)))
    .map(c => c.toString(16).padStart(2, '0'))
    .join('')
}
```

- [ ] **Step 2: Verify it typechecks**

Run: `npx tsc --noEmit`
Expected: exit 0, no output

- [ ] **Step 3: Commit**

```bash
git add src/pages/zenBrutalism.ts
git commit -m "feat: add Zen Brutalism design system tokens (v0.1)"
```

---

### Task 2: Fonts + design switcher scaffolding

**Files:**
- Modify: `index.html:41` (font link)
- Modify: `tailwind.config.js` (add `jp` font family)
- Modify: `src/main.tsx` (switcher)
- Create: `src/pages/Design50.tsx` (stub, replaced in Task 3)
- Create: `src/pages/Design51.tsx` (stub, replaced in Task 4)

**Interfaces:**
- Consumes: nothing from Task 1
- Produces: `?d=49|50|51` query param and Ctrl+Shift+1/2/3 switching; `Design50`/`Design51` default exports (React components, no props)

- [ ] **Step 1: Add Noto Sans JP to the font link in `index.html`**

Replace line 41 with:

```html
    <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=JetBrains+Mono:wght@400;700&family=Noto+Sans+JP:wght@500;700&family=Syne:wght@400;600;700;800&display=swap" rel="stylesheet" />
```

- [ ] **Step 2: Add `jp` font family to `tailwind.config.js` fontFamily block**

```js
        'jp': ['Noto Sans JP', 'sans-serif'],
```

- [ ] **Step 3: Create stub prototypes**

`src/pages/Design50.tsx`:
```tsx
// Design 50: RE-PLATE — Zen Brutalism re-materialization of Design 49 (built in Task 3)
export default function Design50() {
  return <div style={{ color: '#EAE4DA', background: '#141114', minHeight: '100vh', padding: 40, fontFamily: 'JetBrains Mono' }}>DESIGN 50 — RE-PLATE (stub)</div>
}
```

`src/pages/Design51.tsx`:
```tsx
// Design 51: NAMEPLATE — equipment-manifest structure (built in Task 4)
export default function Design51() {
  return <div style={{ color: '#EAE4DA', background: '#141114', minHeight: '100vh', padding: 40, fontFamily: 'JetBrains Mono' }}>DESIGN 51 — NAMEPLATE (stub)</div>
}
```

- [ ] **Step 4: Replace `src/main.tsx` with the switcher**

```tsx
import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Design49 from './pages/Design49'
import Design50 from './pages/Design50'
import Design51 from './pages/Design51'

// Temporary prototype switcher: ?d=49|50|51, Ctrl+Shift+1/2/3.
// Remove (restoring plain <Design49 />) once a winner ships.
const DESIGNS: Record<string, React.ComponentType> = { '49': Design49, '50': Design50, '51': Design51 }
const KEY_MAP: Record<string, string> = { Digit1: '49', Digit2: '50', Digit3: '51' }

function DesignSwitcher() {
  const param = new URLSearchParams(window.location.search).get('d')
  const [design, setDesign] = useState(param && param in DESIGNS ? param : '49')

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && KEY_MAP[e.code]) {
        e.preventDefault()
        const d = KEY_MAP[e.code]
        setDesign(d)
        const url = new URL(window.location.href)
        url.searchParams.set('d', d)
        window.history.replaceState(null, '', url)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const Active = DESIGNS[design]
  return <Active key={design} />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DesignSwitcher />
  </StrictMode>,
)
```

- [ ] **Step 5: Verify**

Run: `npx tsc --noEmit && npm run build`
Expected: both exit 0

Run: `npm run dev` and check `http://localhost:4000/?d=50` shows the stub; Ctrl+Shift+1 returns to Design 49 intact.

- [ ] **Step 6: Commit**

```bash
git add index.html tailwind.config.js src/main.tsx src/pages/Design50.tsx src/pages/Design51.tsx
git commit -m "feat: add design switcher, JP font, prototype stubs"
```

---

### Task 3: Design 50 — "Re-plate"

**Files:**
- Create: `src/pages/Design50.tsx` (replaces stub — start from a copy of `src/pages/Design49.tsx`)

**Interfaces:**
- Consumes: everything `Design49.tsx` imports from `design49Data.ts` (unchanged), plus `ZB`, `MECH_EASE`, `STAMP_DURATION`, `LABELS`, `ZB_PRESETS`, `plateId`, `zbAccentSoft` from `./zenBrutalism`
- Produces: default export `Design50` (React component, no props)

This task is a **transformation of a copy**, not a rewrite. Use the frontend-design skill for taste calls. Apply these exact transformations:

- [ ] **Step 1: Copy the file and rename**

Copy `Design49.tsx` → `Design50.tsx`. Rename the component and header comment to `Design 50: RE-PLATE — SYSTEM_053 SHU`.

- [ ] **Step 2: Re-map the material constants**

Design 49 imports `BG, PANEL, PANEL_DARK, EDGE, DIM, MID, BRIGHT, LAVENDER, LAVENDER_SOFT` from `design49Data`. In Design 50, remove those names from the data import and alias them locally so the rest of the file needs minimal edits:

```ts
import { ZB, MECH_EASE, STAMP_DURATION, LABELS, ZB_PRESETS, plateId, zbAccentSoft } from './zenBrutalism'

const BG = ZB.bg, PANEL = ZB.plate, PANEL_DARK = ZB.bgDeep, EDGE = ZB.edge
const DIM = ZB.inkDim, MID = ZB.inkMid, BRIGHT = ZB.ink
const ACCENT_DEFAULT = ZB.accent
```

Replace the accent default (`LAVENDER`) with `ACCENT_DEFAULT` in the theme context/state, and `deriveAccentSoft` with `zbAccentSoft`. Replace `DEV_PRESETS` with `ZB_PRESETS`.

- [ ] **Step 3: Plate treatment**

Every major panel/card: border width `1px` → `2px` (`border` → `border-2` or inline `borderWidth: 2`), and add a `plateId(n)` tag in mono 10px `ZB.inkDim` in one corner of each of the major home-view panels (hero plate, capabilities plate, experience plate, projects plate, contact plate — number them top to bottom). Corner index marks: 8px `+` glyphs at panel corners on the hero plate only.

- [ ] **Step 4: Bilingual section labels**

Add once and use for all section headers (WORK / PROJECTS / LOG / CONTACT / CAPABILITIES nav and section headings):

```tsx
function BilingualLabel({ k, accent }: { k: keyof typeof LABELS; accent: string }) {
  const l = LABELS[k]
  return (
    <span className="inline-flex items-baseline gap-2">
      <span className="font-jp text-[11px] font-medium" style={{ color: accent }}>{l.jp}</span>
      <span className="font-mono text-[11px] tracking-[0.25em]" style={{ color: ZB.inkDim }}>{l.en}</span>
    </span>
  )
}
```

- [ ] **Step 5: Stamp transition**

Replace the scanline view-transition overlay with a press-down stamp shutter (same trigger points where the scanline overlay currently mounts):

```tsx
function StampTransition({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[200] pointer-events-none"
          style={{ background: ZB.bgDeep, transformOrigin: 'top' }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          exit={{ scaleY: 0, transformOrigin: 'bottom' }}
          transition={{ duration: STAMP_DURATION, ease: MECH_EASE }}
        />
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 6: Type + motion sweep**

Hero name and view titles: `font-archivo uppercase` (keep sizes). All framer-motion `transition` eases in the file: replace soft eases with `MECH_EASE`. Progress bars/counters animate in steps (`ease: 'steps(8)'` via tween where applicable, else `MECH_EASE`). One vermillion element per plate: audit each panel — if two accent-colored elements are visible at rest, demote one to `ZB.inkMid`.

- [ ] **Step 7: Verify**

Run: `npx tsc --noEmit && npm run build` — exit 0.
Visual on `?d=50`: all views reachable (home/projects/project/log/blog-post/experience), data renders, no lavender remnants (search file for `#CDB4DB`, `#957FB8` → 0 hits), Ctrl+Shift+D picker shows vermillion presets.

- [ ] **Step 8: Commit**

```bash
git add src/pages/Design50.tsx
git commit -m "feat: Design 50 RE-PLATE — zen brutalism re-materialization of 49"
```

---

### Task 4: Design 51 — "Nameplate"

**Files:**
- Create: `src/pages/Design51.tsx` (replaces stub, from scratch)

**Interfaces:**
- Consumes: `projects, experience, blogPosts, capabilities, contactLinks` and types from `./design49Data`; all tokens from `./zenBrutalism`
- Produces: default export `Design51` (React component, no props)

Single-scroll equipment-manifest page. Sections top to bottom: fixed factory chrome → NameplateHero → ManifestIndex → DataPlates (projects) → InspectionLog (experience) → RatingsPlate (capabilities) → LogSection (blog) → ContactPlate → footer. Use the frontend-design skill; the structural spec:

- [ ] **Step 1: Factory chrome**

Fixed top status bar (40px, `ZB.bgDeep`, 2px bottom border): left = `SINA DILEK — 製造所` + `MANIFEST v1`, right = live 24h clock (1s interval) + scroll percentage as `▮▮▮▯▯ 43%` stepped gauge (mono, 10-step). Left rail (desktop only): vertical punch-hole registration marks — 6px circles with 2px `ZB.edge` ring every 120px, `position: fixed`.

- [ ] **Step 2: NameplateHero**

A single giant centered plate (`max-w-[880px]`, `border-2 ZB.edge`, background `ZB.plate`) laid out like a real equipment nameplate: header row `銘板 / NAMEPLATE` + one vermillion filled square (the hanko — the section's single accent); body grid of PLATE_TERMS rows using real terms — `型式 MODEL: SINA DILEK`, `製造番号 SERIAL NO.: NX-2003-UK`, `定格 RATED: CTO @ PRICE LANTERN / CS @ ESSEX`, `製造年 MFG. YEAR: 2003`, `状態 STATUS: OPERATIONAL`. Name in Archivo Black ~clamp(40px, 8vw, 96px). Row structure:

```tsx
function PlateRow({ term, value }: { term: { jp: string; en: string }; value: string }) {
  return (
    <div className="grid grid-cols-[140px_1fr] gap-4 py-2.5 border-b" style={{ borderColor: ZB.edge }}>
      <span className="font-mono text-[10px] tracking-[0.2em]" style={{ color: ZB.inkDim }}>
        <span className="font-jp mr-2" style={{ color: ZB.inkMid }}>{term.jp}</span>{term.en}
      </span>
      <span className="font-mono text-[13px]" style={{ color: ZB.ink }}>{value}</span>
    </div>
  )
}
```

- [ ] **Step 3: DataPlates — projects as equipment plates**

One plate per project, stacked vertically with generous ma (`space-y-24`), each `max-w-[880px]`: header row = glyph + Archivo Black name + `plateId(i+1)`; PlateRow fields `型式 MODEL: {name.toUpperCase()}`, `製造番号 SERIAL NO.: {idx}`, `定格 RATED: {stack.join(' / ')}`, `製造年 MFG. YEAR: {year}`, `状態 STATUS: {status}` (status value is the plate's single vermillion element when LIVE/ACTIVE); `brief` as a one-line caption; click-to-expand (framer-motion height, MECH_EASE) revealing overview/problem/approach/features + link. Between plates: a centered punch-mark divider (`○ ─── ○`, `ZB.edge`).

- [ ] **Step 4: InspectionLog, RatingsPlate, LogSection, ContactPlate**

- InspectionLog: experience as an inspection table — header `検査記録 / INSPECTION LOG`; the Price Lantern job's highlights as rows `{stat} · {label} — {detail}` with mono stats in `ZB.ink`, one vermillion `PASS` stamp rotated -6° in the corner.
- RatingsPlate: capabilities grouped by category like electrical ratings — stepped bars (10 discrete cells per bar, filled per `pct/10`, filled cell = `ZB.inkMid`, current-level cell = accent only on PRIMARY).
- LogSection: blog posts as `日誌 / LOG` entries, date-stamped mono rows, expand in place.
- ContactPlate: `連絡 / CONTACT` — three PlateRows from `contactLinks`, email row's value in vermillion (section's single accent).
- Footer: `ESSEX, UK · GMT+0 · 手作業で設計・製造 / DESIGNED & BUILT BY HAND · © 2026`.

- [ ] **Step 5: Motion + reveal + dev picker**

Sections reveal on scroll with a 12px translate + opacity tween, `MECH_EASE`, 0.5s, staggered 80ms — patient like Mirako but snapping like a press. No parallax, no floats.

Port the Ctrl+Shift+D dev color picker from `Design49.tsx` (lines 53–117), using `ZB_PRESETS` and an accent state threaded through a context or props — same pattern as Design 50.

- [ ] **Step 6: Verify**

Run: `npx tsc --noEmit && npm run build` — exit 0.
Visual on `?d=51`: all 5 projects, experience highlights, 3 posts, 14 capabilities grouped, 3 contacts render; expand/collapse works; one accent per section at rest; responsive at 375px (plates go full-width, chrome collapses to top bar only).

- [ ] **Step 7: Commit**

```bash
git add src/pages/Design51.tsx
git commit -m "feat: Design 51 NAMEPLATE — equipment-manifest zen brutalism prototype"
```

---

### Task 5: Comparison pass

**Files:** none created; verification + notes only.

- [ ] **Step 1: Full build + dev sweep**

Run: `npx tsc --noEmit && npm run build` — exit 0. `npm run dev`: flip 49 → 50 → 51 with Ctrl+Shift+1/2/3; confirm 49 is pixel-identical to before (untouched).

- [ ] **Step 2: Spec compliance audit (both prototypes)**

Checklist from the spec: hanko discipline (one accent per plate at rest) / no animated grain, rust, grunge / bilingual labels present on every section / motion mechanical / instrumentation present (clock, scroll gauge) / all data renders.

- [ ] **Step 3: Present both to Sina**

Screenshots or live dev-server walkthrough of `?d=50` and `?d=51`; capture his verdict and iterate on the winner in a follow-up plan.

- [ ] **Step 4: Commit any audit fixes**

```bash
git add -A src/pages
git commit -m "polish: spec-compliance fixes from comparison audit"
```
