import { CategoryType, ProductPost, Badge } from '../types';

export const CATEGORIES: { id: CategoryType; name: string; description: string; icon: string }[] = [
  { id: 'SaaS', name: 'SaaS', description: 'Software as a Service products and cloud platforms', icon: 'Layers' },
  { id: 'Developer Tools', name: 'Developer Tools', description: 'APIs, CLI tools, libraries, and dev workflow apps', icon: 'Terminal' },
  { id: 'AI Tools', name: 'AI Tools', description: 'LLM wrappers, autonomous agents, and AI utilities', icon: 'Sparkles' },
  { id: 'Web Dev', name: 'Web Dev', description: 'Frontend frameworks, hosting, components, and CSS tools', icon: 'Globe' },
  { id: 'iOS Dev', name: 'iOS Dev', description: 'Swift, SwiftUI, and native iOS applications', icon: 'Smartphone' },
  { id: 'Open Source', name: 'Open Source', description: 'Community-driven open source repositories', icon: 'Code' },
  { id: 'Creator Tools', name: 'Creator Tools', description: 'Design, video, audio, and content generation platforms', icon: 'PenTool' },
  { id: 'Founder Journey', name: 'Founder Journey', description: 'Solopreneur builds, indie hacker updates, and launch stories', icon: 'Rocket' },
  { id: 'Mobile Apps', name: 'Mobile Apps', description: 'iOS and Android mobile products', icon: 'AppWindow' },
  { id: 'Design & Creative', name: 'Design & Creative', description: 'UI kits, icon sets, typography, and vector generators', icon: 'Palette' },
  { id: 'Dropshipping', name: 'Dropshipping', description: 'E-commerce automation and store management tools', icon: 'Package' },
  { id: 'Health', name: 'Health', description: 'Fitness trackers, mental health tools, and biohacking apps', icon: 'HeartPulse' },
  { id: 'Utilities', name: 'Utilities', description: 'Desktop scripts, browser extensions, and productivity helpers', icon: 'Cpu' },
  { id: 'Games', name: 'Games', description: 'Indie games, web games, and game engine templates', icon: 'Gamepad2' },
];

export const INITIAL_POSTS: ProductPost[] = [
  {
    id: 'post-1',
    title: 'DevPulse — Real-time API Health & Downtime Inspector',
    tagline: 'Lightweight latency monitor that alerts your Slack & Telegram in under 200ms',
    description: 'DevPulse is a developer-first uptime monitor built with Go and Rust. It pings your endpoints from 12 global edge locations, tracks SSL expiration, and generates clean public status pages with zero setup.',
    productUrl: 'https://devpulse.io',
    category: 'Developer Tools',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    maker: {
      name: 'Alex Chen',
      handle: '@alexchen_dev',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      badge: 'Top Maker 🐼',
      isVerifiedMaker: true
    },
    upvotes: 184,
    userUpvoted: false,
    commentCount: 29,
    createdAt: '2 hours ago',
    points: 320,
    isPandaChoice: true,
    isFeatured: true,
    screenshots: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80'
    ],
    comments: [
      {
        id: 'c1',
        authorName: 'Sarah Lin',
        authorHandle: '@sarahcodes',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
        authorRole: 'Backend Engineer',
        content: 'This looks super clean! How does the edge latency tracking handle localized cloud network spikes?',
        createdAt: '1 hour ago',
        upvotes: 8
      },
      {
        id: 'c2',
        authorName: 'Markus Thorne',
        authorHandle: '@mthorne',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
        authorRole: 'DevOps Lead',
        content: 'Feedback for maker: Loved the Slack webhook config UI. Suggest adding PagerDuty fallback option.',
        createdAt: '45 mins ago',
        isPrivate: true,
        upvotes: 4
      }
    ]
  },
  {
    id: 'post-2',
    title: 'CodeCraft — AI React Component Generator with Tailwind CSS',
    tagline: 'Prompt to production-ready React components with responsive Tailwind classes',
    description: 'CodeCraft lets developers describe any component or view layout in plain text and generates pristine TypeScript React code with zero AI slop, accessible ARIA attributes, and dark mode support.',
    productUrl: 'https://codecraft.dev',
    category: 'AI Tools',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    maker: {
      name: 'Elena Rostova',
      handle: '@elena_design',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
      badge: 'Panda Fellow 🌟',
      isVerifiedMaker: true
    },
    upvotes: 142,
    userUpvoted: false,
    commentCount: 18,
    createdAt: '4 hours ago',
    points: 275,
    screenshots: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80'
    ],
    comments: [
      {
        id: 'c3',
        authorName: 'David K.',
        authorHandle: '@dk_frontend',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
        content: 'Does it support export to Radix UI and shadcn primitives?',
        createdAt: '2 hours ago',
        upvotes: 5
      }
    ]
  },
  {
    id: 'post-3',
    title: 'SwiftPalette — macOS Color Picker & Contrast Inspector for Designers',
    tagline: 'Native SwiftUI app with WCAG AA/AAA compliance & instant CSS/Hex copy',
    description: 'Built natively for macOS Sequoia with SwiftUI. SwiftPalette sits in your menu bar and allows instant sampling across multi-monitor setups with automatic color palette extraction.',
    productUrl: 'https://swiftpalette.app',
    category: 'iOS Dev',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
    maker: {
      name: 'Julian Vance',
      handle: '@julianvance',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
      isVerifiedMaker: true
    },
    upvotes: 98,
    userUpvoted: false,
    commentCount: 12,
    createdAt: '6 hours ago',
    points: 190,
    comments: []
  },
  {
    id: 'post-4',
    title: 'MicroLaunch — Open Source Indie Hacker Product Hunt Alternative',
    tagline: 'Self-hostable product directory with transparent upvotes and Markdown specs',
    description: 'Built with Next.js 14, Tailwind, and PostgreSQL. MicroLaunch empowers solo founders to showcase their apps without algorithmic bias, featuring RSS feeds, API keys, and weekly email digests.',
    productUrl: 'https://github.com/microlaunch/core',
    category: 'Open Source',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&auto=format&fit=crop&q=80',
    maker: {
      name: 'Samir Patel',
      handle: '@samir_oss',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
      badge: 'Panda Creator 🚀',
      isVerifiedMaker: true
    },
    upvotes: 215,
    userUpvoted: false,
    commentCount: 34,
    createdAt: '8 hours ago',
    points: 380,
    comments: []
  },
  {
    id: 'post-5',
    title: 'DropMatrix — Dropshipping Product Research & Competitor Tracker',
    tagline: 'Automated shopify product scraping with price tracking & ad spy tools',
    description: 'DropMatrix scans thousands of Shopify stores to detect trending products before they explode on TikTok. Features automated supplier search on AliExpress and margins calculator.',
    productUrl: 'https://dropmatrix.io',
    category: 'Dropshipping',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    maker: {
      name: 'Lucas Wright',
      handle: '@lucas_ecom',
      avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&auto=format&fit=crop&q=80',
      isVerifiedMaker: true
    },
    upvotes: 76,
    userUpvoted: false,
    commentCount: 9,
    createdAt: '12 hours ago',
    points: 150,
    comments: []
  },
  {
    id: 'post-6',
    title: 'FocusPanda — Pomodoro & Ambient Soundscapes for Deep Work',
    tagline: 'Minimalist focus timer with spatial binaural beats and session analytics',
    description: 'Designed specifically for software engineers and writers who need sustained deep work blocks. FocusPanda combines custom audio synthesis with subtle desktop notifications and streak tracking.',
    productUrl: 'https://focuspanda.app',
    category: 'Utilities',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&auto=format&fit=crop&q=80',
    maker: {
      name: 'Maya Lin',
      handle: '@mayalin_dev',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      badge: 'Panda Founder 🐼',
      isVerifiedMaker: true
    },
    upvotes: 165,
    userUpvoted: false,
    commentCount: 22,
    createdAt: '1 day ago',
    points: 290,
    comments: []
  }
];

export const BADGES: Badge[] = [
  { id: 'b1', name: 'First Launch', icon: '🚀', description: 'Published a product on Getrefy', dateEarned: 'Aug 2026' },
  { id: 'b2', name: '7-Day Streak', icon: '🔥', description: 'Active on Getrefy for 7 consecutive days', dateEarned: 'Aug 2026' },
  { id: 'b3', name: 'Top 10 Maker', icon: '🏆', description: 'Reached top 10 on the weekly launch leaderboard', dateEarned: 'Aug 2026' },
  { id: 'b4', name: 'Community Supporter', icon: '💬', description: 'Left 10+ constructive feedback comments', dateEarned: 'Aug 2026' },
  { id: 'b5', name: 'Panda Verified', icon: '🐼', description: 'Verified developer creator profile' }
];

export const TOP_MAKERS = [
  { name: 'Samir Patel', handle: '@samir_oss', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80', launches: 5, upvotes: 480, points: 1250, badge: 'Panda Fellow 🌟' },
  { name: 'Alex Chen', handle: '@alexchen_dev', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80', launches: 3, upvotes: 390, points: 980, badge: 'Top Maker 🐼' },
  { name: 'Maya Lin', handle: '@mayalin_dev', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80', launches: 4, upvotes: 320, points: 840, badge: 'Panda Founder 🐼' },
  { name: 'Elena Rostova', handle: '@elena_design', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80', launches: 2, upvotes: 280, points: 720, badge: 'Design Lead ✨' },
];
