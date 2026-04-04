export type View = 'home' | 'project' | 'blog' | 'blog-post'

export type Project = {
  id: string
  code: string
  name: string
  short: string
  impact: string
  description: string
  challenge: string
  approach: string
  stack: string[]
  features: string[]
  year: string
  status: string
  link: string
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

export const projects: Project[] = [
  {
    id: 'gosh',
    code: 'PRJ_001',
    name: 'GoSH',
    short: 'Minimal shell written in Go',
    impact: 'Built a working shell with pipes, redirects, process management, and built-in commands.',
    description:
      'GoSH is a systems project built to understand how shells actually work. It covers tokenization, command parsing, process spawning, and stream redirection.',
    challenge:
      'Shells look simple from the outside, but they hide a lot of low-level behavior. The goal was to make those mechanics visible by implementing them directly.',
    approach:
      'Started with a lexer, then a parser, then an executor. Go was the right fit because the standard library makes process work clear without hiding too much.',
    stack: ['Go', 'Systems', 'CLI'],
    features: ['Pipe chains', 'I/O redirection', 'Process spawning', 'Built-in commands'],
    year: '2025',
    status: 'ACTIVE',
    link: 'https://github.com/noxire-dev/GoSH',
  },
  {
    id: 'moji',
    code: 'PRJ_002',
    name: 'Moji',
    short: 'Note taking and productivity app',
    impact: 'Designed and shipped a UI-first productivity app focused on fast everyday use.',
    description:
      'Moji is a note and task application built around speed, clarity, and lightweight interactions. The product direction was intentionally opinionated.',
    challenge:
      'Most productivity tools are crowded with features. The problem was how to keep useful depth without making the interface feel heavy.',
    approach:
      'Designed the workflow first, then built the backend to support it. Flask and SQLite kept the stack simple while still letting the UI stay responsive.',
    stack: ['Python', 'Flask', 'JavaScript', 'SQLite'],
    features: ['Markdown notes', 'Task management', 'Tags and categories', 'Dark mode'],
    year: '2025',
    status: 'ACTIVE',
    link: 'https://github.com/noxire-dev/moji',
  },
  {
    id: 'lorekeeper',
    code: 'PRJ_003',
    name: 'LoreKeeper',
    short: 'Community platform for tabletop RPG resources',
    impact: 'Built a community-driven discovery platform for free TTRPG material.',
    description:
      'LoreKeeper organizes free tabletop RPG content into a single searchable platform. The focus was community discovery, curation, and better browsing.',
    challenge:
      'Free TTRPG content is spread across forums, Discord servers, and personal blogs. The challenge was designing a clearer destination for finding and sharing it.',
    approach:
      'Used a marketplace style without payments, then centered the experience around search, ratings, and resource presentation.',
    stack: ['Python', 'PostgreSQL', 'JavaScript'],
    features: ['User accounts', 'Search and filtering', 'Community ratings', 'PDF viewer'],
    year: '2025',
    status: 'DEV',
    link: 'https://github.com/noxire-dev/LoreKeeper',
  },
  {
    id: 'midnight-moon',
    code: 'PRJ_004',
    name: 'Midnight Moon',
    short: 'Dark VS Code theme collection',
    impact: 'Designed a theme system optimized for long coding sessions and better contrast balance.',
    description:
      'Midnight Moon is a collection of editor themes tuned for readable syntax, calmer contrast, and long-term comfort during development work.',
    challenge:
      'A lot of dark themes look dramatic but fail during actual use. The goal was to make something visually distinct without becoming tiring.',
    approach:
      'Iterated on color relationships through daily use, adjusting semantic token colors and UI contrast rather than styling everything equally.',
    stack: ['Design', 'JSON', 'VS Code'],
    features: ['Multiple variants', 'Semantic token highlighting', 'Terminal colors', 'Full UI theming'],
    year: '2024',
    status: 'STABLE',
    link: 'https://github.com/noxire-dev/midnight-theme',
  },
]

export const blogPosts: BlogPost[] = [
  {
    id: 'portfolio-v2',
    title: 'Rebuilding My Portfolio From Scratch',
    date: '2025-11-19',
    readTime: '3 min',
    excerpt: 'Why I scrapped the first version and rebuilt the site with a clearer design system.',
    content:
      'When I started this project years ago, Flask felt magical because it let me build something real quickly.\n\nSince then I have learned more about frontend systems, typography, and structure. The rebuild was not just about changing tech. It was about making the portfolio feel deliberate.\n\nReact, TypeScript, Tailwind, and Vite made iteration faster, but the more important change was design discipline: stronger hierarchy, fewer distractions, and better storytelling.',
    tags: ['dev', 'design'],
  },
  {
    id: 'first-year',
    title: '96 Out Of 100 In First Year',
    date: '2025-08-28',
    readTime: '2 min',
    excerpt: 'What finishing first year at Essex taught me beyond the grade itself.',
    content:
      'I finished first year at the University of Essex with 96 out of 100 and First Class Honours.\n\nThe useful part was not the number on its own. It was learning how to break hard work into smaller pieces, keep momentum, and recover quickly when stuck.\n\nThat way of thinking affects how I build software too: smaller loops, clearer systems, less wasted motion.',
    tags: ['uni', 'growth'],
  },
  {
    id: 'learning-c',
    title: 'Why I Started Learning C',
    date: '2025-02-23',
    readTime: '2 min',
    excerpt: 'Not to become a C specialist, but to understand the layers underneath everything else.',
    content:
      'I started learning C because I wanted to understand the lower-level ideas hidden by higher-level languages.\n\nOnce you implement your own data structures, pointer logic, and memory-sensitive code, a lot of concepts in Go, Rust, and C++ stop feeling abstract.\n\nIt is frustrating work sometimes, but it compounds. Every hour spent in C sharpens how I think everywhere else.',
    tags: ['systems', 'learning'],
  },
]

export const skills = [
  { name: 'Python', level: 94, kind: 'core' },
  { name: 'Go', level: 82, kind: 'core' },
  { name: 'TypeScript', level: 80, kind: 'core' },
  { name: 'JavaScript', level: 85, kind: 'core' },
  { name: 'React', level: 78, kind: 'framework' },
  { name: 'Flask', level: 86, kind: 'framework' },
  { name: 'Java', level: 70, kind: 'support' },
  { name: 'C', level: 48, kind: 'learning' },
]

export const profileFacts = [
  { label: 'Location', value: 'Essex, UK' },
  { label: 'Program', value: 'BSc Computer Science' },
  { label: 'Result', value: '96/100, First Class' },
  { label: 'Status', value: 'Open to internships' },
]

export const contactLinks = [
  { label: 'Email', value: 'contact@sinadilek.com', href: 'mailto:contact@sinadilek.com' },
  { label: 'GitHub', value: 'noxire-dev', href: 'https://github.com/noxire-dev' },
  { label: 'LinkedIn', value: 'sina-dilek', href: 'https://linkedin.com/in/sina-dilek-0b1b3b1b9' },
]
