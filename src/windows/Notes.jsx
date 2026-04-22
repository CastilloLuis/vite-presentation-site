import React from 'react'

export default function Notes() {
    return (
        <div className="notes">
            <div className="notes-meta">
                <span>About.md</span>
                <span className="notes-meta-dim">last modified · today</span>
            </div>
            <article className="notes-body">
                <h1>Luis Castillo</h1>
                <p className="notes-lede">
                    Dedicated Senior Software Engineer with 8+ years specializing in frontend development, design
                    systems, and architecture.
                </p>

                <p>
                    I take ownership of projects, lead teams, and drive technical initiatives forward — always
                    delivering high-quality, scalable code architecture.
                </p>

                <blockquote className="notes-pull">
                    AI? AI gives speed. I give direction.
                </blockquote>

                <p>
                    Senior Software Engineer. 8+ years of software engineering — leading app teams, taking
                    products from scratch to production, and shipping design systems that scale. Crypto-native
                    along the way.
                </p>

                <p>
                    My stack lives around <strong>Go</strong> and <strong>Node.js</strong> with TypeScript, REST and
                    gRPC, Postgres, Redis, and the usual suspects for queues and caching. On the frontend I work in{' '}
                    <strong>React</strong> and <strong>Next.js</strong>, and I&apos;ll pick up cross-platform work
                    when a product needs to live outside the browser. I care about clean interfaces, tight feedback
                    loops, and code that the next person can actually read.
                </p>

                <p>
                    Day-to-day I lean on <strong>Claude Code</strong> and orchestrate agents to plan and move faster —
                    running them in parallel for refactors, investigations, test coverage, and the grunt work that
                    used to eat whole afternoons — while I stay focused on architecture and the calls that actually
                    matter.
                </p>

                <p>
                    Always down to talk about product, design, crypto infra, or how you&apos;re wiring agents into
                    your own workflow.
                </p>

                <p className="notes-sig">— luis</p>
            </article>
        </div>
    )
}
