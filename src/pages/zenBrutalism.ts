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
