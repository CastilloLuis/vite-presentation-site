// ============================================
// Site content — everything editable lives here
// ============================================

export const profile = {
    name: 'Luis Castillo',
    role: 'Senior Software Engineer',
    years: '8+ years',
    location: 'Madrid, Spain',
    availability: 'Remote',
    timezone: 'Europe/Madrid',
    email: 'contact@kasti.dev',
    resumeUrl: '/resume.pdf',

    // The largest line on the page. *wrapped* words render as serif chips.
    statement: 'Software engineering, product, and *forward-deployed AI*.',

    // Supporting paragraph.
    // Two inline marks carry the sentence: the tangle going in, the ordered
    // thing coming out. The stack itself lives in its own panel.
    summary:
        '*Eight years* turning {scribble} complexity into {screen} clean, tailored software, across *Web2, Web3 and AI*.',

    // Second line: how the work actually gets done.
    practice:
        'I lead engineering teams and ship products to production. Go and Node underneath, Next.js on top, {agents} agents orchestrating, {compass} me giving direction.',

    // Its own line, kept short so the app stack always stays beside the text
    // and has the rest of the line to fan open into.
    apps: 'On my free time I like to build apps: {projects}',
}

// ---- Panels ----
export const PANELS = ['Stack', 'Writing', 'Photos']

// ---- Work ----
export const work = [
    {
        period: '2023 — Now',
        company: 'Gelato Network',
        role: 'Tech Lead',
        url: 'https://www.gelato.network/',
        detail: 'Relay, VRF, OneBalance, Functions, Oracles, RaaS and Account Abstraction. Design system through to deployment, and the engineers building against it.',
    },
    {
        period: '2021 — 2023',
        company: 'Spectral Labs',
        role: 'Senior Software Engineer',
        url: 'https://www.spectrallabs.xyz/',
        detail: 'On-chain credit scoring through to AI agent orchestration. Real-time dashboards, protocol integrations, and the data plumbing that keeps them honest.',
    },
    {
        period: '2019 — 2021',
        company: 'Rappi',
        role: 'Senior Engineer',
        url: 'https://www.rappi.com/',
        detail: "Latin America's first super app — 8M+ monthly users across nine countries. Built MiTienda and the Partners integration suite from an empty repo.",
    },
    {
        period: '2018 — 2019',
        company: 'CodeCharm',
        role: 'Software Engineer',
        url: null,
        detail: 'Code2Flow turned natural language into flowcharts. Magma Studio did real-time collaborative art. Angular, RxJS, NgRx, NestJS.',
    },
    {
        period: 'Ongoing',
        company: 'dOrg · Concrete',
        role: 'DAO member · Engineer',
        url: 'https://www.dorg.tech/',
        detail: 'Governance and engineering at dOrg. Core frontend for Concrete — automated yield vaults and cross-chain borrowing.',
    },
]

// ---- Projects ----
export const projects = [
    {
        name: 'ShapeIt',
        href: 'https://shapeit.kasti.dev',
        domain: 'shapeit.kasti.dev',
        icon: '/icons/shapeit.png',
        blurb: 'A playground for shapes and visual tinkering.',
    },
    {
        name: 'Easy Wishlist',
        href: 'https://easywishlist.site',
        domain: 'easywishlist.site',
        icon: '/icons/easywishlist.png',
        blurb: 'Wishlists made simple — share, gift, done.',
    },
    {
        name: 'MyFitnessPaw',
        href: 'https://myfitnesspaw.app',
        domain: 'myfitnesspaw.app',
        icon: '/icons/myfitnesspaw.png',
        blurb: 'Fitness tracking. For cats.',
    },
]

// ---- Stack ----
// Each row collapses to a small pile of marks and fans open on hover.
// The label carries the idea; the marks carry the tools.
export const stack = [
    {
        label: 'Product & interfaces',
        items: [
            'Next.js', 'React', 'Angular', 'Vue.js', 'Svelte',
            'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Radix UI',
        ],
    },
    {
        label: 'Backend & data',
        items: ['Go', 'Node.js', 'PostgreSQL', 'Redis', 'Python', 'Express'],
    },
    {
        label: 'Agentic orchestration',
        items: ['Claude Code', 'Codex', 'Gemini', 'Grok', 'OpenCode'],
    },
    {
        label: 'Crypto / Web3',
        items: ['Wagmi', 'Ethers', 'Web3.js', 'Ethereum', 'Solana', 'Optimism', 'Polygon'],
    },
    {
        label: 'Mobile',
        items: ['React Native', 'Expo', 'Swift', 'Flutter'],
    },
]

// ---- Companies marquee ----
// Logos live in public/logos/ and render as masks in the page's ink colour,
// so they read in both themes. `aspect` is the source viewBox ratio, which
// keeps every mark on the same optical height. No logo file? A wordmark shows.
// Not links — this is a record of where the work happened, not referrals.
// `note` says what the company does, in as few words as it takes.
export const companies = [
    { name: 'Gelato', logo: '/logos/gelato.svg', aspect: 99.999 / 18.607, note: 'Smart wallets and rollups' },
    { name: 'Rappi', logo: '/logos/rappi.png', aspect: 1280 / 538, note: 'LATAM unicorn super app, 9 countries' },
    { name: 'Spectral', logo: '/logos/spectral.svg', aspect: 180 / 33, note: 'Protocols for onchain AI' },
    { name: 'dOrg', logo: '/logos/dorg.svg', aspect: 474 / 189, note: 'Web3 developer collective' },
    { name: 'Concrete', logo: '/logos/concrete.svg', aspect: 212 / 26, note: 'Onchain yield infrastructure' },
    { name: 'The Grid', logo: '/logos/thegrid.svg', aspect: 110 / 20, note: 'Marketplace for LLM inference' },
    { name: 'Code2Flow', logo: '/logos/code2flow.svg', aspect: 179 / 47, note: 'Natural language to flowcharts' },
    { name: 'MAGMA', mark: 'magma', note: 'Real-time collaborative drawing' },
    { name: 'CPS LATAM', note: 'Software factory for health and education' },
]

// ---- Photos ----
// `ratio` is width / height. The gallery lays the row out with each photo's
// flex-grow set to its ratio, so every frame keeps its real proportions and
// the row still fills the panel edge to edge.
export const photos = [
    { src: '/photos/05.jpg', ratio: 0.8, alt: 'Photograph by Luis Castillo' },
    { src: '/photos/04.jpg', ratio: 0.86, alt: 'Photograph by Luis Castillo' },
    { src: '/photos/03.jpg', ratio: 0.8, alt: 'Photograph by Luis Castillo' },
    { src: '/photos/02.jpg', ratio: 1.0, alt: 'Photograph by Luis Castillo' },
    { src: '/photos/01.jpg', ratio: 1.0, alt: 'Photograph by Luis Castillo' },
]

export const photoNote = 'In my free time I take pictures. More of them on'
export const photoHandle = { label: '@kastiframes', url: 'https://www.instagram.com/kastiframes/' }

// ---- Contact ----
// Email leads the rail, so it is listed separately in ContactRail.
export const socials = [
    { name: 'GitHub', url: 'https://github.com/castilloluis' },
    { name: 'Telegram', url: 'https://t.me/prolcjs' },
    { name: 'Discord', url: 'https://discord.com/users/iluiscastillo' },
]
