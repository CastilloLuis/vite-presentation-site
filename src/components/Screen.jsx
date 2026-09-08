import React from 'react'

// Two rows of binary on the screen. `bit` 0 draws a ring, 1 draws a bar.
const BITS = [
    [0, 1, 0, 1, 1],
    [1, 0, 1, 0, 0],
]
const COL_X = [10, 17, 24, 31, 38]
const ROW_Y = [11, 20]

/**
 * The counterpart to the scribble: the same information, ordered and running
 * on something. The frame draws itself, then the bits come up on the display.
 * Hovering replays it.
 */
export default function Screen() {
    let bit = -1

    return (
        <span
            className="mark screen"
            role="img"
            aria-label="a screen showing binary"
        >
            <svg viewBox="1.4 1.4 45.2 31.6" fill="none" aria-hidden>
                <g
                    className="screen__frame"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <rect pathLength="1" x="2.4" y="2.4" width="43.2" height="26" rx="3" />
                    <path pathLength="1" d="M24 28.4v3.6" />
                    <path pathLength="1" d="M18 32h12" />
                </g>

                <g stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                    {BITS.map((row, r) =>
                        row.map((v, c) => {
                            bit += 1
                            const style = { animationDelay: `${1.72 + bit * 0.05}s` }
                            return v === 0 ? (
                                <circle
                                    key={`${r}-${c}`}
                                    className="screen__bit"
                                    style={style}
                                    cx={COL_X[c]}
                                    cy={ROW_Y[r]}
                                    r="2.1"
                                />
                            ) : (
                                <path
                                    key={`${r}-${c}`}
                                    className="screen__bit"
                                    style={style}
                                    d={`M${COL_X[c]} ${ROW_Y[r] - 2.4}v4.8`}
                                />
                            )
                        })
                    )}
                </g>
            </svg>
        </span>
    )
}
