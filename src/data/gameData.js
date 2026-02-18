// ============================================
// RPG Portfolio — All game data constants
// Grounded in 8+ years of real engineering work
// ============================================

export const TABS = ['Character', 'Skills'];

// ---- INVENTORY: Every skill in the belt ----
export const inventoryItems = [
    // — AI-Powered Dev Tools —
    { name: 'Claude Code', slug: 'anthropic', powerLevel: 'Proficient', flavor: '"My senior engineering partner — thinks, codes, ships."', color: '#D4A27F' },
    { name: 'Cursor', slug: 'cursor', powerLevel: 'Proficient', flavor: '"My main IDE with AI built in."', color: '#ffffff' },
    // — Frontend Architecture —
    { name: 'React', slug: 'react', powerLevel: 'Senior', flavor: '"I build apps and design systems with it."', color: '#61DAFB' },
    { name: 'Next.js', slug: 'nextdotjs', powerLevel: 'Proficient', flavor: '"I use it for SSR, routing, and full-stack apps."', color: '#ffffff' },
    { name: 'TypeScript', slug: 'typescript', powerLevel: 'Senior', flavor: '"I type everything — safer code, fewer bugs."', color: '#3178C6' },
    { name: 'JavaScript', slug: 'javascript', powerLevel: 'Senior', flavor: '"My core language for frontend and backend."', color: '#F7DF1E' },
    { name: 'Angular', slug: 'angular', powerLevel: 'Familiar', flavor: '"I used it for enterprise apps with RxJS."', color: '#DD0031' },
    { name: 'Vue', slug: 'vuedotjs', powerLevel: 'Familiar', flavor: '"I pick it up for smaller projects."', color: '#4FC08D' },
    { name: 'React Query', slug: 'reactquery', powerLevel: 'Proficient', flavor: '"I use it to fetch and cache server data."', color: '#FF4154' },
    { name: 'GraphQL', slug: 'graphql', powerLevel: 'Proficient', flavor: '"I query APIs and build schemas with it."', color: '#E10098' },
    { name: 'Node.js', slug: 'nodedotjs', powerLevel: 'Proficient', flavor: '"I build APIs and backend services with it."', color: '#339933' },
    // — Design Systems & UI —
    { name: 'Tailwind CSS', slug: 'tailwindcss', powerLevel: 'Proficient', flavor: '"I style everything with utility classes."', color: '#06B6D4' },
    { name: 'Styled Comp.', slug: 'styledcomponents', powerLevel: 'Proficient', flavor: '"I use it for scoped, themeable styles."', color: '#DB7093' },
    { name: 'shadcn/ui', slug: 'shadcnui', powerLevel: 'Proficient', flavor: '"I build UIs with its composable components."', color: '#ffffff' },
    { name: 'Radix UI', slug: 'radixui', powerLevel: 'Proficient', flavor: '"I use it for accessible, unstyled primitives."', color: '#ffffff' },
    { name: 'Framer Motion', slug: 'framer', powerLevel: 'Proficient', flavor: '"I animate transitions and interactions."', color: '#0055FF' },
    { name: 'Storybook', slug: 'storybook', powerLevel: 'Proficient', flavor: '"I document and test components in isolation."', color: '#FF4785' },
    // — Mobile & Cross-Platform —
    { name: 'React Native', slug: 'react', powerLevel: 'Proficient', flavor: '"I build iOS and Android apps with it."', color: '#61DAFB' },
    { name: 'Expo', slug: 'expo', powerLevel: 'Proficient', flavor: '"I use it to ship mobile apps fast."', color: '#BABABA' },
    { name: 'Flutter', slug: 'flutter', powerLevel: 'Familiar', flavor: '"I build cross-platform UIs with Dart."', color: '#02569B' },
    { name: 'Swift', slug: 'swift', powerLevel: 'Learning', flavor: '"I use it for native iOS features."', color: '#F05138' },
    // — Web3 Tooling —
    { name: 'Wagmi', slug: 'wagmi', powerLevel: 'Proficient', flavor: '"I connect React apps to smart contracts."', color: '#ffffff' },
    { name: 'Viem', url: 'https://viem.sh/icon-light.png', powerLevel: 'Proficient', flavor: '"I read and write to the blockchain with it."', color: '#ffffff' },
    { name: 'Ethers.js', slug: 'ethers', powerLevel: 'Proficient', flavor: '"I interact with Ethereum contracts and wallets."', color: '#2535A0' },
    { name: 'WalletConnect', slug: 'walletconnect', powerLevel: 'Proficient', flavor: '"I integrate wallet connections into dApps."', color: '#3B99FC' },
    { name: 'RainbowKit', url: 'https://rainbowkit.com/rainbow.svg', powerLevel: 'Proficient', flavor: '"I use it for wallet connect UI flows."', color: '#7B3FE4' },
    // — Extra —
    { name: 'Python', slug: 'python', powerLevel: 'Familiar', flavor: '"I use it for scripts and automation."', color: '#3776AB' },
    { name: 'SQL', slug: 'postgresql', powerLevel: 'Familiar', color: '#4169E1' },
    { name: 'Supabase', slug: 'supabase', powerLevel: 'Familiar', flavor: '"I use it for auth, storage, and realtime."', color: '#3FCF8E' },
]

export const TOTAL_INVENTORY_SLOTS = 36
export const INVENTORY_COLS = 9

// ---- SKILLS: Grouped by discipline ----
export const skillCategories = [
    {
        key: 'frontend',
        label: 'Frontend Architecture',
        color: '#61DAFB',
        skills: [
            { name: 'React', slug: 'react', rank: 'Grandmaster' },
            { name: 'Next.js', slug: 'nextdotjs', rank: 'Expert' },
            { name: 'TypeScript', slug: 'typescript', rank: 'Grandmaster' },
            { name: 'JavaScript', slug: 'javascript', rank: 'Grandmaster' },
            { name: 'Angular', slug: 'angular', rank: 'Adept' },
            { name: 'Vue', slug: 'vuedotjs', rank: 'Adept' },
            { name: 'React Query', slug: 'reactquery', rank: 'Expert' },
            { name: 'GraphQL', slug: 'graphql', rank: 'Expert' },
            { name: 'shadcn/ui', slug: 'shadcnui', rank: 'Expert' },
            { name: 'Radix UI', slug: 'radixui', rank: 'Expert' },
            { name: 'Framer Motion', slug: 'framer', rank: 'Expert' },
            { name: 'Storybook', slug: 'storybook', rank: 'Expert' },
            { name: 'Tailwind CSS', slug: 'tailwindcss', rank: 'Expert' },
            { name: 'Styled Comp.', slug: 'styledcomponents', rank: 'Expert' },
        ],
    },
    {
        key: 'backend',
        label: 'Backend & Infra',
        color: '#F472B6',
        skills: [
            { name: 'Node.js', slug: 'nodedotjs', rank: 'Expert' },
            { name: 'Python', slug: 'python', rank: 'Familiar' },
            { name: 'SQL', slug: 'postgresql', rank: 'Familiar' },
            { name: 'Supabase', slug: 'supabase', rank: 'Familiar' },
        ],
    },
    {
        key: 'mobile',
        label: 'Mobile & Cross-Platform',
        color: '#4ADE80',
        skills: [
            { name: 'React Native', slug: 'react', rank: 'Expert' },
            { name: 'Expo', slug: 'expo', rank: 'Expert' },
            { name: 'Flutter', slug: 'flutter', rank: 'Adept' },
            { name: 'Swift', slug: 'swift', rank: 'Apprentice' },
            { name: 'Kotlin', slug: 'kotlin', rank: 'Apprentice' },
            { name: 'Dart', slug: 'dart', rank: 'Adept' },
        ],
    },
    {
        key: 'web3',
        label: 'Web3 Tooling',
        color: '#F0B429',
        skills: [
            { name: 'Wagmi', slug: 'wagmi', rank: 'Expert' },
            { name: 'Viem', url: 'https://viem.sh/icon-light.png', rank: 'Expert' },
            { name: 'Ethers.js', slug: 'ethers', rank: 'Expert' },
            { name: 'WalletConnect', slug: 'walletconnect', rank: 'Expert' },
            { name: 'RainbowKit', url: 'https://rainbowkit.com/rainbow.svg', rank: 'Expert' },
            { name: 'Solidity Integrations', slug: 'solidity', rank: 'Familiar' },
        ],
    },
    {
        key: 'ai',
        label: 'AI-Powered Dev',
        color: '#D4A27F',
        skills: [
            { name: 'Claude Code', slug: 'anthropic', rank: 'Expert' },
            { name: 'Cursor', slug: 'cursor', rank: 'Expert' },
            { name: 'Codex', url: 'https://icons.getbootstrap.com/assets/icons/openai.svg', rank: 'Adept' },
            // { name: 'Copilot', slug: 'githubcopilot', rank: 'Adept' },
            { name: 'Vercel AI', slug: 'vercel', rank: 'Familiar' },
            // { name: 'Hugging Face', slug: 'huggingface', rank: 'Familiar' },
        ],
    },
]

// ---- QUESTS: Real roles & projects (sidebar preview) ----
export const quests = [
    { name: 'Gelato Network', progress: 90, status: 'in-progress', color: '#EAB308' },
    { name: 'Spectral Labs', progress: 100, status: 'completed', color: '#22C55E' },
    { name: 'Rappi Super App', progress: 100, status: 'completed', color: '#22C55E' },
]

// ---- QUESTS TAB: Full quest log ----
export const allQuests = [
    {
        name: 'Gelato Network',
        role: 'Tech Lead — Senior Frontend Engineer',
        period: '2023 – Present',
        progress: 90,
        status: 'in-progress',
        color: '#EAB308',
        description: 'Leading frontend architecture for Relay, VRF, OneBalance, Functions, Oracles, RaaS, and Account Abstraction. Owning the full lifecycle from design system to deployment across decentralized infrastructure products.',
    },
    {
        name: 'Spectral Labs',
        role: 'Senior Software Engineer',
        period: '2021 – 2023',
        progress: 100,
        status: 'completed',
        color: '#22C55E',
        description: 'Built the frontend from on-chain credit scoring through AI-driven agent orchestration. Shipped real-time dashboards, modular architecture with React/TypeScript/Tailwind, and deep protocol integrations.',
    },
    {
        name: 'Rappi',
        role: 'Senior Frontend Engineer',
        period: '2019 – 2021',
        progress: 100,
        status: 'completed',
        color: '#22C55E',
        description: 'Scaled frontend for Latin America\'s first super app — 8M+ MAU across 9 countries. Built MiTienda (commerce platform for SMBs) and the Partners integration suite from scratch.',
    },
    {
        name: 'CodeCharm',
        role: 'Software Engineer',
        period: '2018 – 2019',
        progress: 100,
        status: 'completed',
        color: '#22C55E',
        description: 'Built Code2Flow (natural language → flowcharts) and Magma Studio (real-time collaborative art) using Angular, RxJS, NgRx, and NestJS. First deep dive into reactive architecture.',
    },
    {
        name: 'dOrg & Concrete',
        role: 'DAO Member & Engineer',
        period: 'Ongoing',
        progress: 75,
        status: 'in-progress',
        color: '#3B82F6',
        description: 'Contributing to dOrg DAO governance and engineering. Built core frontend for Concrete Protocol\'s DeFi app — automated yield vaults and cross-chain borrowing with modern Web3 tooling.',
    },
]

// ---- SOCIAL LINKS ----
export const socialLinks = [
    { name: 'Discord', slug: 'discord', url: 'https://discord.com/users/iluiscastillo' },
    { name: 'Telegram', slug: 'telegram', url: 'https://t.me/prolcjs' },
    { name: 'GitHub', slug: 'github', url: 'https://github.com/castilloluis' },
]

// ---- STATS: What 8+ years forges ----
export const stats = [
    { label: 'Architecture', value: 99, description: 'Systems & Patterns', abbr: 'ARC' },
    { label: 'Frontend', value: 99, description: 'UI Engineering', abbr: 'FE' },
    { label: 'Design Sys.', value: 99, description: 'Tokens & Components', abbr: 'DS' },
    { label: 'Leadership', value: 99, description: 'Team & Product', abbr: 'LDR' },
    { label: 'Cross-Plat.', value: 99, description: 'Web · Mobile · SDK', abbr: 'XP' },
    { label: 'Performance', value: 99, description: 'Speed & Reliability', abbr: 'PRF' },
]
