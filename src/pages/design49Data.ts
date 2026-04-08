// Design 49 MASTER — Data
// Separated from component to keep the main file clean

export type View = 'home' | 'projects' | 'project' | 'blog' | 'blog-post' | 'experience'

export type Project = {
  id: string
  name: string
  idx: string
  brief: string
  impact: string
  overview: string
  problem: string
  approach: string
  stack: string[]
  features: string[]
  year: string
  status: string
  link: string
  glyph: string
}

export type ExperienceJob = {
  id: string
  role: string
  company: string
  tagline: string
  period: string
  location: string
  summary: string
  highlights: { stat: string; label: string; detail: string }[]
}

export type BlogPost = {
  id: string
  title: string
  date: string
  readTime: string
  excerpt: string
  content: string
  tags: string[]
}

export type Capability = {
  name: string
  level: 'PRIMARY' | 'SECONDARY' | 'FRAMEWORK' | 'LEARNING'
  pct: number
  category: 'LANGUAGES' | 'FRAMEWORKS' | 'SYSTEMS' | 'TOOLS'
}

// ── THEME ──
export const LAVENDER = '#957FB8'
export const LAVENDER_SOFT = '#6B5A8A'
export const BG = '#0D0D12'
export const PANEL = '#16161F'
export const PANEL_DARK = '#111018'
export const EDGE = '#2A2A3A'
export const DIM = '#7B7494'
export const MID = '#ADA8BC'
export const BRIGHT = '#E8E0ED'

// ── THEME PRESETS ──

export type ThemePreset = {
  id: string
  name: string
  accent: string
}

export const THEME_PRESETS: ThemePreset[] = [
  { id: 'lave', name: 'LAVENDER', accent: '#CDB4DB' },
  { id: 'viol', name: 'VIOLET', accent: '#8B5CF6' },
  { id: 'midn', name: 'MIDNIGHT', accent: '#7C8FE8' },
  { id: 'steel', name: 'STEEL', accent: '#94A3B8' },
  { id: 'toky', name: 'TOKYO', accent: '#7AA2F7' },
  { id: 'wist', name: 'WISTERIA', accent: '#C9A0DC' },
  { id: 'iris', name: 'IRIS', accent: '#818CF8' },
  { id: 'dusk', name: 'DUSK', accent: '#A78BFA' },
  { id: 'mauve', name: 'MAUVE', accent: '#C084FC' },
  { id: 'frost', name: 'FROST', accent: '#93C5FD' },
  { id: 'rose', name: 'ROSÉ', accent: '#F9A8D4' },
  { id: 'sage', name: 'SAGE', accent: '#86EFAC' },
  { id: 'ember', name: 'EMBER', accent: '#FB923C' },
  { id: 'plum', name: 'PLUM', accent: '#A855F7' },
  { id: 'arctic', name: 'ARCTIC', accent: '#67E8F9' },
  { id: 'slate', name: 'SLATE', accent: '#64748B' },
  { id: 'coral', name: 'CORAL', accent: '#FB7185' },
  { id: 'mint', name: 'MINT', accent: '#6EE7B7' },
  { id: 'haze', name: 'HAZE', accent: '#957FB8' },
]

export function deriveAccentSoft(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return '#' + [r, g, b]
    .map(c => Math.max(0, Math.round(c * 0.7)))
    .map(c => c.toString(16).padStart(2, '0'))
    .join('')
}

// ── GRID ──
export const GRID_COLS = 12
export const GRID_ROW_H = 80
export const GRID_COL_W = `${100 / GRID_COLS}vw`
export const RAIL_LEFT_W = 28

// ── PROJECTS ──
export const projects: Project[] = [
  {
    id: 'pookie', name: 'Pookie', idx: 'PRJ_001', glyph: '💬', brief: 'Privacy-first chat analytics',
    impact: 'Processes 800k+ lines / 1.3M+ messages entirely in-browser — no backend, no data leaves the device.',
    overview: 'Privacy-first WhatsApp analytics platform. Pookie\'s core engine (Pulse) processes large chat exports entirely in-browser using React, TypeScript, and Web Workers. Modular analysis: response times, activity heatmaps, behavioural trends, emoji usage, milestones, and conversation insights.',
    problem: 'Chat analyzers either require uploading your private data to a server or choke on large exports.',
    approach: 'All processing runs in Web Workers on the client via the Pulse engine — no server, no storage, no privacy risk. Parsing pipeline handles 800k+ lines without blocking the UI.',
    stack: ['React', 'TypeScript', 'Web Workers'], features: ['800k+ lines / 1.3M+ messages', 'Pulse analytics engine', 'Export to PNG, PDF, HTML', 'Ingests .txt and .zip exports'],
    year: '2026', status: 'LIVE', link: 'https://pookie.sh',
  },
  {
    id: 'moji', name: 'Moji', idx: 'PRJ_002', glyph: '✦', brief: 'Workspace-centric productivity app',
    impact: 'Full-stack productivity platform — workspaces, tasks, notes, and rich-text pages with real-time updates.',
    overview: 'Workspace-centric productivity platform built with FastAPI, Next.js, and Supabase (PostgreSQL). Secure auth with JWT and row-level security, modular REST API with typed schemas, and a responsive TypeScript frontend.',
    problem: 'Most productivity apps are bloated with features nobody uses. Needed something fast and opinionated.',
    approach: 'Full-stack with FastAPI backend, Next.js frontend, and Supabase for auth + database. Modular REST API with typed schemas.',
    stack: ['FastAPI', 'Next.js', 'Supabase'], features: ['Workspaces & rich-text pages', 'JWT + row-level security', 'Typed REST API', 'Real-time updates'],
    year: '2025', status: 'LIVE', link: 'https://usemoji.app',
  },
  {
    id: 'vello', name: 'Vello', idx: 'PRJ_003', glyph: '✉', brief: 'B2B email outreach automation',
    impact: 'Scalable cold email workflows with reply classification, inbox rotation, and send pacing.',
    overview: 'Python backend for scalable cold email workflows with modular services for reply classification, inbox rotation, and send pacing. Built to scale without burning sender reputation.',
    problem: 'Cold email at scale either destroys deliverability or requires expensive managed services that lock you in.',
    approach: 'Modular service architecture with protocol-based provider abstraction. Self-hostable and extensible.',
    stack: ['Python', 'Modular Services'], features: ['Reply classification', 'Inbox rotation', 'Send pacing', 'SMTP / SendGrid support'],
    year: '2025', status: 'DEV', link: 'https://github.com/noxire-dev/vello',
  },
  {
    id: 'gosh', name: 'GoSH', idx: 'PRJ_004', glyph: '>', brief: 'Shell written in Go',
    impact: 'Fully functional Unix shell — pipes, redirects, process management from scratch.',
    overview: 'Minimalist shell demonstrating core systems programming: process forking, I/O redirection, command parsing — built entirely in Go.',
    problem: 'Developers use shells daily without understanding how they actually work under the hood.',
    approach: 'Incremental build: lexer → parser → executor. Go for clean concurrency and a strong stdlib.',
    stack: ['Go', 'Systems'], features: ['Pipe chains', 'I/O redirection', 'Process spawning', 'Built-in cmds'],
    year: '2025', status: 'ACTIVE', link: 'https://github.com/noxire-dev/GoSH',
  },
  {
    id: 'midnight', name: 'Midnight Moon', idx: 'PRJ_005', glyph: '◑', brief: 'VSCode theme collection',
    impact: 'Dark themes built for long sessions — contrast ratios chosen by color science, not aesthetics.',
    overview: 'Carefully crafted VS Code theme collection with multiple variants and full semantic token coverage.',
    problem: 'Most dark themes look good in screenshots but cause eye strain after two hours of coding.',
    approach: 'Color science first. Tested contrast ratios against WCAG. Iterated based on daily use.',
    stack: ['Design', 'JSON'], features: ['Multiple variants', 'Semantic highlighting', 'Terminal colors', 'Full UI theming'],
    year: '2024', status: 'STABLE', link: 'https://github.com/noxire-dev/midnight-theme',
  },
]

// ── EXPERIENCE ──
export const experience: ExperienceJob[] = [
  {
    id: 'pricelantern',
    role: 'Chief Technology Officer (CTO)',
    company: 'Price Lantern',
    tagline: 'AI-Powered Quote Analysis Platform · Pre-seed Startup',
    period: 'Nov 2025 – Present',
    location: 'Remote',
    summary: 'Founding engineer turned CTO at a pre-seed B2B AI platform for the construction and trade industry. Own full technical direction, infrastructure, and a small engineering team.',
    highlights: [
      { stat: 'v2', label: 'Full rewrite', detail: 'Leading a full v2 rewrite in FastAPI, Supabase, and React — replacing the legacy Django/Firebase stack after identifying scalability bottlenecks.' },
      { stat: '~2x', label: 'Pipeline speed', detail: 'Designed a cache-first retail enrichment pipeline with parallel scraping across UK retailers, Firebase TTL caching, and batched persistence — cold lookups ~2x faster, cached queries 80–95% faster.' },
      { stat: '40–50%', label: 'AI phase cut', detail: 'Hardened the AI integration with retry logic, timeouts, and model upgrades. Running scraper and AI search in parallel cuts that phase by ~40–50%.' },
      { stat: '2,000+', label: 'Docs processed', detail: 'Processed 2,000+ real-world invoices and quotes, improving extraction consistency across messy real-world document formats.' },
      { stat: '957+ ln', label: 'Test & docs', detail: 'Built the test suite (957+ lines) covering normalisation, matching, and edge cases, plus 724 lines of architecture docs and onboarding guides.' },
      { stat: '1 DR', label: 'Team lead', detail: 'Hired and manage one direct report through task delegation, PR reviews, and technical mentorship.' },
    ],
  },
]

// ── BLOG ──
export const blogPosts: BlogPost[] = [
  { id: 'v2-rebuild', title: 'Portfolio V2', date: '2025.11.19', readTime: '3m', excerpt: 'Scrapped everything. Started over with React + TypeScript.', content: 'When I first started this 3 years ago, I used Flask and questionable design choices. Knowing only Python, Flask felt magical.\n\nI\'ve since learned a lot — new languages, new frameworks, new design thinking. Time for a clean slate.\n\nReact, TypeScript, Tailwind, Vite. Every decision intentional.', tags: ['SYS', 'DSN'] },
  { id: 'first-year', title: 'Year 1 Complete', date: '2025.08.28', readTime: '2m', excerpt: '96/100. First Class Honours. University of Essex.', content: 'First year at Essex — 96/100, First Class Honours.\n\nThe biggest lesson wasn\'t technical. It was decomposition: breaking complex problems into manageable pieces, managing time.\n\nSecond year starts with momentum.', tags: ['EDU', 'LOG'] },
  { id: 'learning-c', title: 'Learning C', date: '2025.02.23', readTime: '2m', excerpt: 'Not to master it. To understand everything built on top.', content: 'Started C not to become a C developer, but to understand how Go, Rust, and C++ work underneath.\n\nImplementing my own string functions, my own linked list — suddenly everything makes sense.\n\nSegfaults aren\'t fun. But every hour in C compounds.', tags: ['SYS', 'LOG'] },
]

// ── CAPABILITIES ──
export const capabilities: Capability[] = [
  { name: 'Python', level: 'PRIMARY', pct: 95, category: 'LANGUAGES' },
  { name: 'Go', level: 'PRIMARY', pct: 80, category: 'LANGUAGES' },
  { name: 'TypeScript', level: 'PRIMARY', pct: 85, category: 'LANGUAGES' },
  { name: 'JavaScript', level: 'PRIMARY', pct: 85, category: 'LANGUAGES' },
  { name: 'Java', level: 'SECONDARY', pct: 70, category: 'LANGUAGES' },
  { name: 'SQL', level: 'SECONDARY', pct: 75, category: 'LANGUAGES' },
  { name: 'C', level: 'LEARNING', pct: 45, category: 'LANGUAGES' },
  { name: 'FastAPI', level: 'PRIMARY', pct: 90, category: 'FRAMEWORKS' },
  { name: 'React', level: 'PRIMARY', pct: 80, category: 'FRAMEWORKS' },
  { name: 'Next.js', level: 'FRAMEWORK', pct: 70, category: 'FRAMEWORKS' },
  { name: 'Django', level: 'FRAMEWORK', pct: 65, category: 'FRAMEWORKS' },
  { name: 'Claude Code', level: 'PRIMARY', pct: 90, category: 'TOOLS' },
  { name: 'Cursor', level: 'PRIMARY', pct: 85, category: 'TOOLS' },
  { name: 'Codex', level: 'SECONDARY', pct: 65, category: 'TOOLS' },
]

// ── CONTACT ──
export type ContactLink = { label: string; value: string; href: string }

export const contactLinks: ContactLink[] = [
  { label: 'EMAIL', value: 'hi@sinadilek.com', href: 'mailto:hi@sinadilek.com' },
  { label: 'GITHUB', value: 'noxire-dev', href: 'https://github.com/noxire-dev' },
  { label: 'LINKEDIN', value: 'sina-dilek', href: 'https://linkedin.com/in/sina-dilek-395501247' },
]
