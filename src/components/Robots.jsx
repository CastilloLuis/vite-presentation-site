import React from 'react'

// Three heads in a row. Negative delays so each is already mid-turn on the
// first frame — nobody sits still waiting their turn.
const HEADS = [
    { x: 0, delay: '0s' },
    { x: 11.2, delay: '-0.85s' },
    { x: 22.4, delay: '-1.7s' },
]

/** Just the heads, looking around. Always on screen. */
export default function Robots() {
    return (
        <span className="mark robots" role="img" aria-label="agents at work">
            <svg viewBox="1.1 -0.9 34.2 13.2" fill="none" aria-hidden>
                <g
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    {HEADS.map((h) => (
                        <g key={h.x} transform={`translate(${h.x},0)`}>
                            <g className="bot__head" style={{ animationDelay: h.delay }}>
                                <path d="M7 2.6V4.2" />
                                <circle cx="7" cy="1.4" r="1.15" />
                                <rect x="2.6" y="4.2" width="8.8" height="7" rx="2.2" />
                                <circle cx="5.2" cy="7.7" r="0.95" fill="currentColor" stroke="none" />
                                <circle cx="8.8" cy="7.7" r="0.95" fill="currentColor" stroke="none" />
                            </g>
                        </g>
                    ))}
                </g>
            </svg>
        </span>
    )
}
