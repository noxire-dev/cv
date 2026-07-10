# Japanese Industrial Redesign — Design Spec

**Date:** 2026-07-06
**Status:** Approved direction, pending prototype comparison
**Working name:** Night Factory (Japanese industrial / zen brutalist fusion)

## Goal

Explore a successor to Design 49 (SYSTEM_052 Lavender v2) in a **Japanese industrial / machine-plate brutalist** direction: the precision-labeling and heavy-material language of Japanese factory signage and equipment nameplates, fused with the zen restraint (negative space, quiet confidence) of the Mirako design system. Build two prototypes, compare, pick one, polish the winner into the live design.

Success criteria: keeps Design 49's recruiter readability, makes people say "damn that's sick", and looks like no other dev portfolio.

## Shared material system

Both prototypes are built from one design language:

### Palette
- **Base:** warm charcoal (dark steel — not dead black, warmth like Mirako's `#141218` family)
- **Surfaces:** gunmetal panels, one step up from base
- **Lines:** visible 1.5–2px borders (industrial structure, not Mirako's 7% hairlines)
- **Ink:** warm off-white primary, dim gray secondary
- **Accent:** calibrated vermillion / shu red (start ~`#D9402B`, tune by eye). Hanko discipline: **one stamp per plate** — a single accent element per panel/section. No second accent color.

### Typography
- **Display:** heavy wide grotesk ("stamped steel" voice) — exact face chosen during build
- **Labels/data:** Geist Mono (continuity with Mirako; already reads machine-plate)
- **Bilingual labels** as the signature detail: `製品 / PROJECTS`, `履歴 / LOG`, `連絡 / CONTACT` — small kanji, mono caps, wide tracking

### Texture rules
- Static grain at ~2.5% opacity allowed (Mirako-style)
- **Forbidden:** animated grain, rust textures, grunge overlays
- Weight comes from borders, plate-stacking, labeling density
- Small-dose physical details: corner index marks, plate IDs (`PLT-004`), punch-hole registration marks

### Motion
- Mechanical, not fluid: snaps, steps, stamps; clip-path press-down reveals; stepped counters
- Design 49's scanline transition becomes a **stamp/shutter transition**
- Keep 49's instrumentation (live clock, scroll %, coordinate rails) recast as factory gauge readouts

## Prototype A — "Re-plate" (`Design50.tsx`)

Design 49's skeleton, re-materialized:
- Same views (home / work / projects / log), vertical project grid, nav, coordinate rails
- Lavender → vermillion; soft panels → machine plates (2px borders, plate IDs)
- Scanline → stamp/shutter transition
- Section labels → bilingual; display font → heavy grotesk
- Reuses `design49Data.ts` unchanged

## Prototype B — "Nameplate" (`Design51.tsx`)

From-scratch structure — the site as an **equipment manifest**:
- Hero: giant stamped nameplate (name, model no., stats as machine ratings)
- Projects: equipment data-plates (`MODEL: POOKIE / TYPE: CHAT ANALYZER / SN: PRJ-001 / RATED: REACT 19`), stacked vertically with punch-hole registration marks between sections
- Experience: inspection-log table
- Leans harder into ma — fewer elements per screen, more negative space
- Same data source (`design49Data.ts`)

## Build & comparison mechanics

- Both prototypes live in `src/pages/` alongside `Design49.tsx`, following the repo's existing pattern
- `main.tsx` gets a temporary switcher (keyboard toggle or query param) to flip 49 / 50 / 51 in the browser
- Both include the Ctrl+Shift+D dev accent picker from Design 49 for tuning vermillion by eye
- Design 49 stays untouched and remains the deployed design until a winner is chosen and polished

## Out of scope

- Content changes (projects, experience, blog data stay as-is)
- Light paper/concrete variant (dark night-factory only — decided)
- Mobile-first rework beyond keeping current responsive behavior

## Decisions log

| Decision | Choice |
|---|---|
| Aesthetic flavor | Factory / machine-plate (not steampunk, not old-Steam, not raw web-brutalist) |
| Fusion | Japanese industrial × zen brutalism (Mirako lineage) |
| Scope | Prototype both structures, then pick |
| Accent | Vermillion / shu red |
| Base tone | Dark (night factory) |
