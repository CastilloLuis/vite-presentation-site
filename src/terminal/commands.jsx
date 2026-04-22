import React from 'react'
import { inventoryItems, skillCategories, stats, socialLinks, personalProjects } from '../data/gameData'

const BOOT_BANNER = `
 ██╗     ██╗   ██╗██╗███████╗  ██████╗ ███████╗
 ██║     ██║   ██║██║██╔════╝ ██╔═══██╗██╔════╝
 ██║     ██║   ██║██║███████╗ ██║   ██║███████╗
 ██║     ██║   ██║██║╚════██║ ██║   ██║╚════██║
 ███████╗╚██████╔╝██║███████║ ╚██████╔╝███████║
 ╚══════╝ ╚═════╝ ╚═╝╚══════╝  ╚═════╝ ╚══════╝`

export function WelcomeBanner() {
    return (
        <div className="term-welcome">
            <pre className="term-ascii">{BOOT_BANNER}</pre>
            <div className="term-welcome-body">
                <div>
                    <span className="term-dim">guest@luisOS</span>
                    <span className="term-dim"> · </span>
                    <span>portfolio v4.0</span>
                </div>
                <div className="term-welcome-tag">
                    Luis Castillo — Senior Software Engineer · 8+ years · Frontend, Design Systems, Web3
                </div>
                <div className="term-welcome-bio">
                    8+ years building software — leading frontend teams, taking products from scratch to prod, and
                    shipping design systems that scale. Crypto-native along the way: dApps, small Web3 teams, and
                    systems where a bad deploy is a very public problem. Stack lives around Go, Node/TypeScript,
                    Postgres/Redis, and React/Next on the frontend.
                </div>
                <div className="term-welcome-hint">
                    Type <span className="term-kbd">/</span> to browse commands, or try{' '}
                    <span className="term-cmd">/summary</span> ·{' '}
                    <span className="term-cmd">/skills</span> ·{' '}
                    <span className="term-cmd">/projects</span> ·{' '}
                    <span className="term-cmd">/contact</span>
                </div>
            </div>
        </div>
    )
}

function Bar({ value, color }) {
    const blocks = Math.round((value / 100) * 20)
    return (
        <span className="term-bar">
            <span className="term-bar-ghost" style={{ color }}>
                {'█'.repeat(20).split('').map((_, i) => (i < blocks ? '█' : '░')).join('')}
            </span>
        </span>
    )
}

function faviconFor(domain) {
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
}

export const commands = {
    help: {
        description: 'List every available command.',
        run: () => (
            <div className="term-block">
                <div className="term-h">Available commands</div>
                <div className="term-grid-2">
                    {[
                        ['/summary', 'full overview — who I am, what I bring, what I ship with'],
                        ['/skills [category]', 'skills grouped by discipline'],
                        ['/projects', 'personal projects — the side work'],
                        ['/stats', 'engineering stats (ARC · FE · DS · LDR · XP · PRF)'],
                        ['/inventory', 'tool belt — every tech I ship with'],
                        ['/contact', 'how to reach me'],
                        ['/whoami', 'one-liner bio'],
                        ['/clear', 'clear the screen (⌃L)'],
                        ['/theme', 'toggle terminal theme'],
                        ['/open <app>', 'open finder · notes · photos · contact'],
                    ].map(([cmd, desc]) => (
                        <React.Fragment key={cmd}>
                            <span className="term-cmd">{cmd}</span>
                            <span className="term-dim">{desc}</span>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        ),
    },

    whoami: {
        description: 'One-liner bio.',
        run: () => (
            <div className="term-block">
                <span className="term-accent">Luis Castillo</span> — Senior Software Engineer. Frontend
                architecture, design systems, cross-platform, crypto infra.
            </div>
        ),
    },

    summary: {
        description: 'Full overview — who I am, what I bring, what I ship with.',
        run: () => (
            <div className="term-block term-summary">
                <div className="term-h">Luis Castillo</div>
                <div className="term-sub">
                    Senior Software Engineer · 8+ years · crypto-native · AI-leveraged.
                </div>

                <div className="term-h-sm">Who</div>
                <p className="term-p">
                    I take ownership of projects, lead frontend teams, and drive technical initiatives from scratch
                    to production — design systems, architecture, release pipelines, the lot. 8+ years of software
                    engineering; crypto-native along the way: shipping dApps, leading small Web3 teams, and running
                    systems where a bad deploy is a very public problem.
                </p>
                <p className="term-p term-quote">
                    <span className="term-accent">AI? AI gives speed.</span> I give direction.
                </p>

                <div className="term-h-sm">Why me</div>
                <ul className="term-ul">
                    <li>
                        <strong>Ownership end-to-end.</strong> From design tokens to post-ship telemetry, I carry the
                        thread. Nothing falls through the seams.
                    </li>
                    <li>
                        <strong>Cross-stack fluency.</strong> Comfortable across Go, Node/TS, Postgres/Redis, React,
                        Next, and cross-platform when a product needs to live outside the browser.
                    </li>
                    <li>
                        <strong>Leadership without friction.</strong> I lead by unblocking — clear interfaces, tight
                        feedback loops, code the next person can actually read.
                    </li>
                    <li>
                        <strong>Leverage over hustle.</strong> I orchestrate agents in parallel for refactors, test
                        coverage, and investigations — so I stay focused on the calls that actually matter.
                    </li>
                </ul>

                <div className="term-h-sm">Stack I ship with</div>
                <div className="term-stack-grid">
                    <div>
                        <span className="term-stack-k">Backend</span>
                        <span>Go · Node.js + TypeScript · REST &amp; gRPC · Postgres · Redis · queues &amp; caching</span>
                    </div>
                    <div>
                        <span className="term-stack-k">Frontend</span>
                        <span>React · Next.js · Tailwind · Radix · shadcn · Framer Motion</span>
                    </div>
                    <div>
                        <span className="term-stack-k">Cross-platform</span>
                        <span>React Native · Expo · Flutter (when a product leaves the browser)</span>
                    </div>
                    <div>
                        <span className="term-stack-k">Web3</span>
                        <span>Wagmi · Viem · Ethers · WalletConnect · RainbowKit · Solidity integrations</span>
                    </div>
                </div>

                <div className="term-h-sm">AI-powered dev (daily)</div>
                <div className="term-stack-grid">
                    <div>
                        <span className="term-stack-k">Claude Code</span>
                        <span>Primary agent — plans, codes, ships. Parallel sub-agents for grunt work.</span>
                    </div>
                    <div>
                        <span className="term-stack-k">Cursor</span>
                        <span>Daily IDE with AI wired in for tight feedback loops.</span>
                    </div>
                    <div>
                        <span className="term-stack-k">Codex / Vercel AI</span>
                        <span>Picked up when the task calls for a different flavor.</span>
                    </div>
                </div>

                <div className="term-h-sm">Next</div>
                <div className="term-dim">
                    <span className="term-cmd">/skills</span> · <span className="term-cmd">/projects</span> ·{' '}
                    <span className="term-cmd">/stats</span> · <span className="term-cmd">/contact</span>
                </div>
            </div>
        ),
    },

    skills: {
        description: 'Skills grouped by discipline. Pass a key to filter.',
        run: (args) => {
            const key = args[0]?.toLowerCase()
            const filtered = key ? skillCategories.filter((c) => c.key === key) : skillCategories
            if (!filtered.length) {
                return (
                    <div className="term-block">
                        <span className="term-err">No category "{args[0]}".</span> Try: ai · frontend · backend ·
                        mobile · web3.
                    </div>
                )
            }
            return (
                <div className="term-block">
                    {filtered.map((cat) => (
                        <div key={cat.key} className="term-skill-cat">
                            <div className="term-h-sm" style={{ color: cat.color }}>
                                {cat.label}
                            </div>
                            <div className="term-skill-row">
                                {cat.skills.map((s) => (
                                    <span key={s.name} className="term-chip">
                                        <span className="term-chip-name">{s.name}</span>
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )
        },
    },

    projects: {
        description: 'Personal projects — the side work.',
        run: () => (
            <div className="term-block">
                <div className="term-h">Personal projects</div>
                <div className="term-dim term-proj-intro">
                    The stuff I build for myself. Small, opinionated, shipped.
                </div>
                <div className="term-proj-list">
                    {personalProjects.map((p) => (
                        <a
                            key={p.domain}
                            className="term-proj"
                            href={p.url}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img className="term-proj-fav" src={faviconFor(p.domain)} alt="" />
                            <div className="term-proj-main">
                                <div className="term-proj-top">
                                    <span className="term-proj-name">{p.name}</span>
                                    <span className="term-proj-domain">{p.domain} ↗</span>
                                </div>
                                <div className="term-proj-tag">{p.tagline}</div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        ),
    },

    stats: {
        description: 'Engineering stats.',
        run: () => (
            <div className="term-block">
                <div className="term-h">Stats</div>
                <div className="term-stats">
                    {stats.map((s) => (
                        <div key={s.abbr} className="term-stat-row">
                            <span className="term-stat-abbr">{s.abbr}</span>
                            <span className="term-stat-label">{s.label}</span>
                            <Bar value={s.value} color="#7ee787" />
                            <span className="term-stat-val">{s.value}</span>
                        </div>
                    ))}
                </div>
                <div className="term-dim term-footnote">
                    8+ years forges a particular shape. Numbers are vibes — the receipts are in{' '}
                    <span className="term-cmd">/projects</span>.
                </div>
            </div>
        ),
    },

    inventory: {
        description: 'Every tech in the belt.',
        run: () => (
            <div className="term-block">
                <div className="term-h">Inventory · {inventoryItems.length} items</div>
                <div className="term-inv-grid">
                    {inventoryItems.map((it) => (
                        <div key={it.name} className="term-inv-row">
                            <span className="term-inv-dot" style={{ background: it.color }} />
                            <span className="term-inv-name">{it.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        ),
    },

    contact: {
        description: 'Reach out.',
        run: () => (
            <div className="term-block">
                <div className="term-h">Contact</div>
                <div className="term-contact-list">
                    {socialLinks.map((s) => (
                        <a key={s.name} className="term-contact-row" href={s.url} target="_blank" rel="noreferrer">
                            <span className="term-contact-name">{s.name}</span>
                            <span className="term-dim">{s.url.replace(/https?:\/\//, '')}</span>
                        </a>
                    ))}
                    <a className="term-contact-row" href="mailto:contact@kasti.dev">
                        <span className="term-contact-name">Email</span>
                        <span className="term-dim">contact@kasti.dev</span>
                    </a>
                </div>
            </div>
        ),
    },

    clear: { description: 'Clear the screen.', run: () => null, meta: 'clear' },
    cls: { alias: 'clear' },

    theme: {
        description: 'Toggle terminal theme (green · amber · mono).',
        run: (_args, ctx) => {
            ctx.cycleTheme()
            return (
                <div className="term-block">
                    <span className="term-dim">theme →</span> <span className="term-accent">{ctx.nextTheme()}</span>
                </div>
            )
        },
    },

    open: {
        description: 'Open an app: finder · notes · photos · contact.',
        run: (args, ctx) => {
            const app = (args[0] || '').toLowerCase()
            const valid = ['finder', 'notes', 'photos', 'contact', 'terminal']
            if (!valid.includes(app)) {
                return (
                    <div className="term-block">
                        <span className="term-err">usage:</span> /open finder · notes · photos · contact
                    </div>
                )
            }
            ctx.openApp(app)
            return (
                <div className="term-block">
                    <span className="term-dim">opening</span> <span className="term-accent">{app}</span>…
                </div>
            )
        },
    },

    ls: {
        description: 'List virtual files.',
        run: () => (
            <div className="term-block">
                <div className="term-ls">
                    <span>about.md</span>
                    <span>skills.json</span>
                    <span>projects/</span>
                    <span>resume.pdf</span>
                    <span>contacts.vcf</span>
                </div>
            </div>
        ),
    },
}

export function resolveCommand(name) {
    const direct = commands[name]
    if (!direct) return null
    if (direct.alias) return commands[direct.alias]
    return direct
}

export const COMMAND_LIST = Object.entries(commands)
    .filter(([, v]) => !v.alias)
    .map(([k, v]) => ({ name: k, description: v.description }))
