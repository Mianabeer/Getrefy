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
      badge: 'Panda Creator 🐼',
      isVerifiedMaker: true,
      streakDays: 7
    },
    upvotes: 184,
    userUpvoted: false,
    commentCount: 2,
    createdAt: '2 hours ago',
    timestamp: Date.now() - 2 * 3600 * 1000,
    points: 320,
    isPandaChoice: true,
    isFeatured: true,
    screenshots: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&auto=format&fit=crop&q=80'
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
        upvotes: 12
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
    title: 'HyperSend — AI B2B Cold Email Personalization & Deliverability Engine',
    tagline: 'Automate hyper-targeted multi-channel outreach with AI prospect research & domain warmups',
    description: 'HyperSend analyzes prospect LinkedIn profiles, recent company news, and GitHub activity to draft bespoke cold outreach emails with 4x response rates. Built for solo founders and GTM teams.',
    productUrl: 'https://hypersend.io',
    category: 'SaaS',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80',
    maker: {
      name: 'Elena Rostova',
      handle: '@elena_design',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
      badge: 'Panda Fellow 🌟',
      isVerifiedMaker: true,
      streakDays: 14
    },
    upvotes: 215,
    userUpvoted: false,
    commentCount: 2,
    createdAt: '3 hours ago',
    timestamp: Date.now() - 3 * 3600 * 1000,
    points: 390,
    screenshots: [
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80'
    ],
    comments: [
      {
        id: 'c21',
        authorName: 'Samir Patel',
        authorHandle: '@samir_oss',
        authorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
        content: 'Top-tier UI! Does HyperSend handle SPF, DKIM, and DMARC domain validation checks automatically?',
        createdAt: '2 hours ago',
        upvotes: 18
      },
      {
        id: 'c22',
        authorName: 'Leo Vance',
        authorHandle: '@leovance',
        authorAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
        content: 'Loved the AI research agent feature. Saved me 10 hours of prospecting this week!',
        createdAt: '1 hour ago',
        upvotes: 7
      }
    ]
  },
  {
    id: 'post-3',
    title: 'DevForge — Seeking Feedback: What do you think of this WebAssembly Tailwind v4 Canvas UI?',
    tagline: 'Live browser playground for testing interactive UI components with zero compilation wait time',
    description: 'I built the core engine for DevForge in TypeScript and WebAssembly. It renders component states in sub-10ms. I am looking for feedback on our dark mode inspector UI and looking for a talented UI/UX co-founder!',
    productUrl: 'https://devforge.dev',
    category: 'Web Dev',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    maker: {
      name: 'David K.',
      handle: '@dk_frontend',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      badge: 'Web Hacker ⚡',
      isVerifiedMaker: true,
      streakDays: 4
    },
    upvotes: 128,
    userUpvoted: false,
    commentCount: 2,
    createdAt: '5 hours ago',
    timestamp: Date.now() - 5 * 3600 * 1000,
    points: 230,
    screenshots: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&auto=format&fit=crop&q=80'
    ],
    comments: [
      {
        id: 'c31',
        authorName: 'Elena Rostova',
        authorHandle: '@elena_design',
        authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
        content: "Love the editor layout! I'd suggest softening the panel borders to 1px #2A2A2C and increasing padding around the code tree view.",
        createdAt: '3 hours ago',
        upvotes: 19
      },
      {
        id: 'c32',
        authorName: 'Sarah Lin',
        authorHandle: '@sarahcodes',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
        content: 'This WebAssembly canvas engine is ridiculously fast. Hope you two team up!',
        createdAt: '2 hours ago',
        upvotes: 8
      }
    ]
  },
  {
    id: 'post-4',
    title: 'CartBoost — Instant Shopify Upsell & Slide Cart Recovery',
    tagline: 'Built by a Shopify store owner to boost AOV by 24% without intrusive popups',
    description: 'As a 6-figure dropshipper, I got tired of clunky $50/mo Shopify apps that slowed down my store. I coded CartBoost with native Liquid & React to offer slide-cart cross-sells and SMS recovery.',
    productUrl: 'https://cartboost.app',
    category: 'Dropshipping',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0a67568a0d70?w=800&auto=format&fit=crop&q=80',
    maker: {
      name: 'Lucas Wright',
      handle: '@lucas_ecom',
      avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&auto=format&fit=crop&q=80',
      isVerifiedMaker: true,
      streakDays: 6
    },
    upvotes: 145,
    userUpvoted: false,
    commentCount: 1,
    createdAt: '6 hours ago',
    timestamp: Date.now() - 6 * 3600 * 1000,
    points: 260,
    screenshots: [
      'https://images.unsplash.com/photo-1556742049-0a67568a0d70?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&auto=format&fit=crop&q=80'
    ],
    comments: [
      {
        id: 'c41',
        authorName: 'Maya Lin',
        authorHandle: '@mayalin_dev',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        content: 'Great execution! Lightweight carts make a huge difference in mobile conversion rates.',
        createdAt: '4 hours ago',
        upvotes: 8
      }
    ]
  },
  {
    id: 'post-5',
    title: 'Founder Journey — Month 3 Update: DevFlow hit $3,800 MRR with $0 ad spend! (Stripe Chart Inside)',
    tagline: 'Documenting our solo-founder growth from 0 to 85 paying active subscriptions',
    description: 'Month 3 milestone! We officially crossed $3,800 MRR on Stripe. Our highest converting channels were posting build-in-public devlogs on Getrefy, submitting to open-source lists, and answering technical questions on Reddit r/webdev.',
    productUrl: 'https://devflow.io',
    category: 'Founder Journey',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    maker: {
      name: 'Samir Patel',
      handle: '@samir_oss',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
      badge: 'Panda Creator 🚀',
      isVerifiedMaker: true,
      streakDays: 12
    },
    upvotes: 192,
    userUpvoted: false,
    commentCount: 2,
    createdAt: '8 hours ago',
    timestamp: Date.now() - 8 * 3600 * 1000,
    points: 340,
    screenshots: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&auto=format&fit=crop&q=80'
    ],
    comments: [
      {
        id: 'c51',
        authorName: 'Alex Chen',
        authorHandle: '@alexchen_dev',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        content: 'That Stripe MRR curve looks incredible Samir! What was your churn rate over the last 30 days?',
        createdAt: '5 hours ago',
        upvotes: 14
      }
    ]
  },
  {
    id: 'post-6',
    title: 'LogSnip — First Product Launch! Seeking feedback on our free tier error logging limits',
    tagline: 'Lightweight developer error tracker that fits in a single cURL snippet',
    description: 'Hi everyone! I am a 19-year-old self-taught developer and this is my very first product launch ever. Sentry felt too complex for my small side projects, so I built LogSnip. I would love your honest feedback on our dashboard stack trace UI!',
    productUrl: 'https://logsnip.dev',
    category: 'SaaS',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&auto=format&fit=crop&q=80',
    maker: {
      name: 'Leo Vance',
      handle: '@leovance',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
      badge: 'First Launch 🚀',
      isVerifiedMaker: true,
      streakDays: 3
    },
    upvotes: 168,
    userUpvoted: false,
    commentCount: 1,
    createdAt: '10 hours ago',
    timestamp: Date.now() - 10 * 3600 * 1000,
    points: 290,
    screenshots: [
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&auto=format&fit=crop&q=80'
    ],
    comments: [
      {
        id: 'c61',
        authorName: 'Markus Thorne',
        authorHandle: '@mthorne',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
        content: 'Congrats on your first launch Leo! The exception console UI is super readable. Suggest adding rate limiting headers on free tiers.',
        createdAt: '8 hours ago',
        upvotes: 11
      }
    ]
  },
  {
    id: 'post-7',
    title: 'Discussion: What\'s the best architecture for a real-time team chat app at 10k connections in 2026?',
    tagline: 'Comparing Node.js + Socket.io vs Go + WebSockets vs Supabase Realtime for low-latency web apps',
    description: 'Hey Getrefy community! I am architecting a multiplayer team chat feature. I am debating between Node.js + Socket.io vs Go + WebSockets vs Supabase Realtime. What stack do you use in production for 10k+ concurrent connections?',
    productUrl: 'https://getrefy.app/discussion/realtime-stack',
    category: 'Developer Tools',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    maker: {
      name: 'Sarah Lin',
      handle: '@sarahcodes',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      badge: 'Community Contributor 💬',
      isVerifiedMaker: true,
      streakDays: 9
    },
    upvotes: 104,
    userUpvoted: false,
    commentCount: 2,
    createdAt: '12 hours ago',
    timestamp: Date.now() - 12 * 3600 * 1000,
    points: 210,
    comments: [
      {
        id: 'c71',
        authorName: 'Alex Chen',
        authorHandle: '@alexchen_dev',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        content: 'Go + Gorilla WebSockets with Redis PubSub backplane has given us rock-solid 20ms response times at scale.',
        createdAt: '10 hours ago',
        upvotes: 21
      }
    ]
  },
  {
    id: 'post-8',
    title: 'PocketLog — Minimalist Habit Tracker & Daily Routine Timer for iOS',
    tagline: 'Native SwiftUI app with interactive iOS 18 widgets & offline iCloud sync',
    description: 'Built entirely in Swift and SwiftUI over 3 weekends. PocketLog features zero ads, zero subscriptions, local privacy, and elegant lock-screen widgets to keep your daily coding habits consistent.',
    productUrl: 'https://pocketlog.app',
    category: 'iOS Dev',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80',
    maker: {
      name: 'Julian Vance',
      handle: '@julianvance',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
      isVerifiedMaker: true,
      streakDays: 5
    },
    upvotes: 136,
    userUpvoted: false,
    commentCount: 1,
    createdAt: '14 hours ago',
    timestamp: Date.now() - 14 * 3600 * 1000,
    points: 245,
    screenshots: [
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80'
    ],
    comments: [
      {
        id: 'c81',
        authorName: 'Elena Rostova',
        authorHandle: '@elena_design',
        authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
        content: 'The dark mode haptics feel super crisp on iOS 18. Great job Julian!',
        createdAt: '12 hours ago',
        upvotes: 9
      }
    ]
  },
  {
    id: 'post-9',
    title: 'GenieCLI — Natural Language Terminal Assistant & Shell Script Generator',
    tagline: 'Translate plain English commands directly into safe, executable Bash/Zsh commands',
    description: 'GenieCLI lives in your terminal (npm i -g genie-cli). Type genie "find all pdf files modified yesterday and zip them" and it generates the exact command with dry-run safety explanations before running.',
    productUrl: 'https://geniecli.dev',
    category: 'AI Tools',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&auto=format&fit=crop&q=80',
    maker: {
      name: 'Markus Thorne',
      handle: '@mthorne',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      badge: 'Top Maker 🐼',
      isVerifiedMaker: true,
      streakDays: 18
    },
    upvotes: 248,
    userUpvoted: false,
    commentCount: 1,
    createdAt: '1 day ago',
    timestamp: Date.now() - 24 * 3600 * 1000,
    points: 430,
    isPandaChoice: true,
    isFeatured: true,
    screenshots: [
      'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80'
    ],
    comments: [
      {
        id: 'c91',
        authorName: 'Sarah Lin',
        authorHandle: '@sarahcodes',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
        content: 'I use this every day now! The dry-run safeguard prevented me from accidentally running a destructive rsync command.',
        createdAt: '22 hours ago',
        upvotes: 24
      }
    ]
  },
  {
    id: 'post-10',
    title: 'Founder Journey — Reached $1,200 MRR on MetricsKit privacy analytics (Live Revenue Dashboard)',
    tagline: 'Privacy-focused Google Analytics alternative built in 14 days for solo founders',
    description: 'MetricsKit gives you real-time visitor counts, referrer conversion funnels, and UTM campaign tracking without heavy tracking scripts or cookie banner bloat. Here is our live breakdown of traffic vs revenue.',
    productUrl: 'https://metricskit.io',
    category: 'SaaS',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&auto=format&fit=crop&q=80',
    maker: {
      name: 'Marcus Vance',
      handle: '@marcusv_saas',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      isVerifiedMaker: true,
      streakDays: 8
    },
    upvotes: 112,
    userUpvoted: false,
    commentCount: 1,
    createdAt: '1 day ago',
    timestamp: Date.now() - 26 * 3600 * 1000,
    points: 195,
    screenshots: [
      'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80'
    ],
    comments: [
      {
        id: 'c101',
        authorName: 'Alex Chen',
        authorHandle: '@alexchen_dev',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        content: 'Replaced Google Analytics on all my side projects with this last night. Clean stats, no GDPR nightmare!',
        createdAt: '20 hours ago',
        upvotes: 11
      }
    ]
  },
  {
    id: 'post-11',
    title: 'DevBio — One-Click Developer Portfolio & Github Showcase Builder',
    tagline: 'Turn your public repositories and open source PRs into a polished bio link in 60 seconds',
    description: 'DevBio connects to your GitHub account and automatically formats your top repos, pinned projects, tech stack badges, and total star counts into a modern personal landing page.',
    productUrl: 'https://devbio.link',
    category: 'Web Dev',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    maker: {
      name: 'Maya Lin',
      handle: '@mayalin_dev',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      isVerifiedMaker: true,
      streakDays: 5
    },
    upvotes: 89,
    userUpvoted: false,
    commentCount: 1,
    createdAt: '1 day ago',
    timestamp: Date.now() - 28 * 3600 * 1000,
    points: 160,
    comments: [
      {
        id: 'c111',
        authorName: 'David K.',
        authorHandle: '@dk_frontend',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
        content: 'The GitHub API integration is seamless. Super clean dark theme options as well.',
        createdAt: '22 hours ago',
        upvotes: 6
      }
    ]
  },
  {
    id: 'post-12',
    title: 'ShipAuto — AI Dropshipping Supplier & Inventory Sync Automation',
    tagline: 'Automate tracking numbers, stock alerts, and AliExpress orders across 5 stores',
    description: 'ShipAuto monitors inventory levels across multi-vendor supplier feeds, updates stock in real time, and auto-dispatches orders to avoid stockout cancellations and chargebacks.',
    productUrl: 'https://shipauto.com',
    category: 'Dropshipping',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0a67568a0d70?w=800&auto=format&fit=crop&q=80',
    maker: {
      name: 'Lucas Wright',
      handle: '@lucas_ecom',
      avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&auto=format&fit=crop&q=80',
      isVerifiedMaker: true,
      streakDays: 6
    },
    upvotes: 76,
    userUpvoted: false,
    commentCount: 1,
    createdAt: '2 days ago',
    timestamp: Date.now() - 48 * 3600 * 1000,
    points: 140,
    comments: [
      {
        id: 'c121',
        authorName: 'Leo Vance',
        authorHandle: '@leovance',
        authorAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
        content: 'This saves so much manual work when managing multiple store fronts.',
        createdAt: '1 day ago',
        upvotes: 5
      }
    ]
  },
  {
    id: 'post-13',
    title: '3 Months In: What I learned building & scaling a solo micro-SaaS to $1.2k MRR',
    tagline: 'Honest reflection on distribution, pricing mistakes, and customer churn',
    description: '3 months ago I took a leap of faith to build solo. Here is a breakdown of what worked (building in public, micro-influencer outreach), what failed (paid Google ads), and why raising prices from $9 to $29 reduced churn by half.',
    productUrl: 'https://getrefy.app/journey/3-months-learnings',
    category: 'Founder Journey',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&auto=format&fit=crop&q=80',
    maker: {
      name: 'Alex Chen',
      handle: '@alexchen_dev',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      badge: 'Panda Founder 🐼',
      isVerifiedMaker: true,
      streakDays: 15
    },
    upvotes: 230,
    userUpvoted: false,
    commentCount: 2,
    createdAt: '2 days ago',
    timestamp: Date.now() - 50 * 3600 * 1000,
    points: 410,
    comments: [
      {
        id: 'c131',
        authorName: 'Samir Patel',
        authorHandle: '@samir_oss',
        authorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
        content: 'The pricing insight is golden. Higher prices filter out demanding customers who churn anyway.',
        createdAt: '1 day ago',
        upvotes: 16
      }
    ]
  },
  {
    id: 'post-14',
    title: 'CssFlexie — Visual CSS Flexbox & Grid Builder (Super nervous about my 1st launch!)',
    tagline: 'Interactive visual tool to generate responsive layout code without writing CSS by hand',
    description: 'Honestly pretty nervous posting this here for the first time! I built CssFlexie over the weekend because I always struggled with complex grid alignments. You drag items, tweak gaps & flex properties, and get clean CSS. Feedback and constructive critique are super welcomed!',
    productUrl: 'https://cssflexie.dev',
    category: 'Web Dev',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
    maker: {
      name: 'Chloe Bennett',
      handle: '@chloe_ui',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      badge: 'First Launch 🚀',
      isVerifiedMaker: false,
      streakDays: 2
    },
    upvotes: 7,
    userUpvoted: false,
    commentCount: 1,
    createdAt: '2 days ago',
    timestamp: Date.now() - 52 * 3600 * 1000,
    points: 25,
    comments: [
      {
        id: 'c141',
        authorName: 'Elena Rostova',
        authorHandle: '@elena_design',
        authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
        content: "Don't be nervous Chloe! This is a fantastic tool. The visual gap handle controls are super intuitive.",
        createdAt: '1 day ago',
        upvotes: 4
      }
    ]
  },
  {
    id: 'post-15',
    title: 'Discussion: How do you handle auth in a serverless app — Supabase vs Firebase vs Clerk?',
    tagline: 'Sharing pros/cons of JWT cookie sessions, OAuth social logins, and edge middleware',
    description: 'What authentication provider do you reach for when spinning up new SaaS products? I love Supabase Auth for database integration, but Clerk has smooth pre-built UI components. How do you decide?',
    productUrl: 'https://getrefy.app/discussion/serverless-auth',
    category: 'Developer Tools',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    maker: {
      name: 'Samir Patel',
      handle: '@samir_oss',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
      badge: 'Panda Creator 🚀',
      isVerifiedMaker: true,
      streakDays: 12
    },
    upvotes: 95,
    userUpvoted: false,
    commentCount: 2,
    createdAt: '3 days ago',
    timestamp: Date.now() - 72 * 3600 * 1000,
    points: 170,
    comments: [
      {
        id: 'c151',
        authorName: 'Markus Thorne',
        authorHandle: '@mthorne',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
        content: 'Supabase Auth with RLS rules gives you security directly inside Postgres without extra middleware overhead.',
        createdAt: '2 days ago',
        upvotes: 15
      }
    ]
  },
  {
    id: 'post-16',
    title: 'WidgetPulse — Customizable Lock Screen & Desktop Widgets for iOS 18',
    tagline: 'Display API metrics, GitHub streak graphs, and server uptime directly on your iPhone lock screen',
    description: 'WidgetPulse connects to your custom REST APIs or JSON endpoints and renders customizable SwiftUI widgets on iOS 18 and macOS Sonoma.',
    productUrl: 'https://widgetpulse.app',
    category: 'iOS Dev',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
    maker: {
      name: 'Julian Vance',
      handle: '@julianvance',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
      isVerifiedMaker: true,
      streakDays: 5
    },
    upvotes: 54,
    userUpvoted: false,
    commentCount: 1,
    createdAt: '3 days ago',
    timestamp: Date.now() - 76 * 3600 * 1000,
    points: 110,
    comments: [
      {
        id: 'c161',
        authorName: 'Sarah Lin',
        authorHandle: '@sarahcodes',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
        content: 'Having my server uptime stats directly on my lock screen widget is a game changer.',
        createdAt: '2 days ago',
        upvotes: 5
      }
    ]
  },
  {
    id: 'post-17',
    title: 'APIQuick — Universal REST & GraphQL API SDK Generator',
    tagline: 'Input your OpenAPI spec and compile zero-dependency TypeScript & Python client SDKs',
    description: 'APIQuick parses your OpenAPI 3.1 or GraphQL schema definitions and compiles strongly-typed client libraries with built-in retry logic, auth interceptors, and error handling.',
    productUrl: 'https://apiquick.dev',
    category: 'Developer Tools',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    maker: {
      name: 'Sarah Lin',
      handle: '@sarahcodes',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      badge: 'Community Contributor 💬',
      isVerifiedMaker: true,
      streakDays: 9
    },
    upvotes: 82,
    userUpvoted: false,
    commentCount: 1,
    createdAt: '3 days ago',
    timestamp: Date.now() - 80 * 3600 * 1000,
    points: 150,
    comments: [
      {
        id: 'c171',
        authorName: 'Alex Chen',
        authorHandle: '@alexchen_dev',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        content: 'Saved us 3 days of manually writing TypeScript fetch wrappers for our backend services.',
        createdAt: '2 days ago',
        upvotes: 7
      }
    ]
  },
  {
    id: 'post-18',
    title: 'ReviewMind AI — Automated PR Code Review & Security Vulnerability Bot',
    tagline: 'GitHub App that leaves inline code comments on pull requests detecting SQLi, XSS & memory leaks',
    description: 'ReviewMind AI acts as an automated senior staff engineer on your team. It reviews every incoming GitHub PR, suggests refactoring optimizations, and flags potential security flaws before merging.',
    productUrl: 'https://reviewmind.ai',
    category: 'AI Tools',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    maker: {
      name: 'Markus Thorne',
      handle: '@mthorne',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      badge: 'Top Maker 🐼',
      isVerifiedMaker: true,
      streakDays: 18
    },
    upvotes: 175,
    userUpvoted: false,
    commentCount: 1,
    createdAt: '4 days ago',
    timestamp: Date.now() - 96 * 3600 * 1000,
    points: 310,
    comments: [
      {
        id: 'c181',
        authorName: 'Sarah Lin',
        authorHandle: '@sarahcodes',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
        content: 'Caught an unescaped SQL query in one of our junior dev PRs yesterday. Awesome tool!',
        createdAt: '3 days ago',
        upvotes: 12
      }
    ]
  },
  {
    id: 'post-19',
    title: 'OpenForm — Open Source Privacy-First Alternative to Typeform & Tally',
    tagline: 'Self-hostable drag-and-drop form builder with webhooks, CSV export, and encrypted responses',
    description: 'OpenForm is 100% open source under AGPLv3. Build multi-step conversational survey forms, collect leads, connect webhooks to Zapier or Slack, and own all your response data without monthly limits.',
    productUrl: 'https://openform.dev',
    category: 'Open Source',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    maker: {
      name: 'Samir Patel',
      handle: '@samir_oss',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
      badge: 'Panda Creator 🚀',
      isVerifiedMaker: true,
      streakDays: 12
    },
    upvotes: 310,
    userUpvoted: false,
    commentCount: 2,
    createdAt: '4 days ago',
    timestamp: Date.now() - 100 * 3600 * 1000,
    points: 520,
    isPandaChoice: true,
    isFeatured: true,
    comments: [
      {
        id: 'c191',
        authorName: 'Elena Rostova',
        authorHandle: '@elena_design',
        authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
        content: 'The form drag-and-drop UX is super smooth! Deployed a self-hosted instance on Railway in 5 mins.',
        createdAt: '3 days ago',
        upvotes: 22
      }
    ]
  },
  {
    id: 'post-20',
    title: 'ThumbCraft — AI YouTube Thumbnail & Social Graphic Generator for Creators',
    tagline: 'Generate high-CTR 4K thumbnails with auto background removal and typography presets',
    description: 'ThumbCraft uses fine-tuned AI visual models to create attention-grabbing thumbnails for YouTube videos, podcast covers, and Twitter launch images in seconds.',
    productUrl: 'https://thumbcraft.design',
    category: 'Creator Tools',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80',
    maker: {
      name: 'Elena Rostova',
      handle: '@elena_design',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
      badge: 'Design Lead ✨',
      isVerifiedMaker: true,
      streakDays: 14
    },
    upvotes: 118,
    userUpvoted: false,
    commentCount: 1,
    createdAt: '5 days ago',
    timestamp: Date.now() - 120 * 3600 * 1000,
    points: 200,
    comments: [
      {
        id: 'c201',
        authorName: 'Lucas Wright',
        authorHandle: '@lucas_ecom',
        authorAvatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&auto=format&fit=crop&q=80',
        content: 'Used this for our TikTok product ad banners and saw a noticeable jump in click-through rate.',
        createdAt: '4 days ago',
        upvotes: 8
      }
    ]
  },
  {
    id: 'post-21',
    title: 'QuickEnv — Secure Local .env File Manager & Team Secret Sync',
    tagline: 'CLI & desktop tray utility that encrypts and syncs local environment variables across devices',
    description: 'QuickEnv replaces messy .env files sent over Slack or Discord. It keeps your developer secrets encrypted at rest and lets team members sync dev keys safely with one command.',
    productUrl: 'https://quickenv.dev',
    category: 'Utilities',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&auto=format&fit=crop&q=80',
    maker: {
      name: 'David K.',
      handle: '@dk_frontend',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      isVerifiedMaker: true,
      streakDays: 4
    },
    upvotes: 6,
    userUpvoted: false,
    commentCount: 1,
    createdAt: '5 days ago',
    timestamp: Date.now() - 124 * 3600 * 1000,
    points: 20,
    comments: [
      {
        id: 'c211',
        authorName: 'Sarah Lin',
        authorHandle: '@sarahcodes',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
        content: 'Simple, effective utility for avoiding committed .env files on Git.',
        createdAt: '4 days ago',
        upvotes: 3
      }
    ]
  },
  {
    id: 'post-22',
    title: 'PixelQuest — Retro 8-bit Dungeon Crawler Web Game & Canvas Engine',
    tagline: 'Playable browser RPG built in pure HTML5 Canvas with custom chiptune sound engine',
    description: 'PixelQuest is a retro roguelike dungeon crawler playable directly in your web browser. Features procedural level generation, customizable 8-bit characters, and leaderboards.',
    productUrl: 'https://pixelquest.play',
    category: 'Games',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
    maker: {
      name: 'Leo Vance',
      handle: '@leovance',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
      badge: 'Game Developer 🎮',
      isVerifiedMaker: true,
      streakDays: 3
    },
    upvotes: 98,
    userUpvoted: false,
    commentCount: 1,
    createdAt: '6 days ago',
    timestamp: Date.now() - 144 * 3600 * 1000,
    points: 175,
    comments: [
      {
        id: 'c221',
        authorName: 'Alex Chen',
        authorHandle: '@alexchen_dev',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        content: 'Accidentally spent my whole lunch break playing floor 7! The chiptune soundtrack is incredible.',
        createdAt: '5 days ago',
        upvotes: 10
      }
    ]
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
  { name: 'Markus Thorne', handle: '@mthorne', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80', launches: 6, upvotes: 540, points: 4250, badge: 'Top Maker 🐼' },
  { name: 'Samir Patel', handle: '@samir_oss', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80', launches: 5, upvotes: 480, points: 3200, badge: 'Panda Fellow 🌟' },
  { name: 'Elena Rostova', handle: '@elena_design', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80', launches: 4, upvotes: 410, points: 2750, badge: 'Design Lead ✨' },
  { name: 'Alex Chen', handle: '@alexchen_dev', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80', launches: 3, upvotes: 390, points: 1950, badge: 'Panda Founder 🐼' },
  { name: 'Lucas Wright', handle: '@lucaswright', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80', launches: 3, upvotes: 310, points: 1620, badge: 'Full-Stack Lead ⚡' },
  { name: 'Maya Lin', handle: '@mayalin_tech', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80', launches: 3, upvotes: 295, points: 1510, badge: 'AI Engineer 🤖' },
  { name: 'Sarah Lin', handle: '@sarahcodes', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80', launches: 2, upvotes: 290, points: 1250, badge: 'Community Contributor 💬' },
  { name: 'Julian Vance', handle: '@julianvance', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80', launches: 2, upvotes: 245, points: 940, badge: 'iOS Creator 📱' },
  { name: 'David Kim', handle: '@dkim_builds', avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=100&auto=format&fit=crop&q=80', launches: 2, upvotes: 210, points: 890, badge: 'DevOps Architect ⚙️' },
  { name: 'Priya Sharma', handle: '@priyasharma', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80', launches: 2, upvotes: 195, points: 820, badge: 'SaaS Maker 🚀' },
  { name: 'Leo Vance', handle: '@leovance', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80', launches: 2, upvotes: 180, points: 620, badge: 'Game Dev 🎮' },
  { name: 'Marcus Vance', handle: '@marcusvance', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80', launches: 1, upvotes: 120, points: 410, badge: 'Rust Enthusiast ⚙️' },
  { name: 'Devina Vance', handle: '@devinavance', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80', launches: 1, upvotes: 85, points: 210, badge: 'UI Designer 🎨' },
  { name: 'Maya Brooks', handle: '@mayabrooks', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80', launches: 1, upvotes: 45, points: 150, badge: 'Junior Maker 🌱' }
];
