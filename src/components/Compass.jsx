import React from 'react'

/** A needle swinging onto its bearing. */
export default function Compass() {
    return (
        <span className="mark compass" role="img" aria-label="a compass finding its bearing">
            <svg viewBox="2 2 28 28" fill="none" aria-hidden>
                <g stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <circle className="compass__ring" pathLength="1" cx="16" cy="16" r="13" />
                    <path
                        className="compass__needle"
                        d="M10.5 21.5 L19 12 L21.5 10.5 L20 13 L11.5 22 Z"
                    />
                </g>
                <circle className="compass__pin" cx="16" cy="16" r="1.4" fill="currentColor" />
            </svg>
        </span>
    )
}
