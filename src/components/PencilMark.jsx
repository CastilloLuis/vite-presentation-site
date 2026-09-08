import React from 'react'

/**
 * A pencil that keeps sketching: it travels a short arc while a stroke draws
 * underneath it, then both reset. Same construction as the other marks —
 * pathLength="1" and a dashoffset, driven by CSS so it costs nothing.
 */
export default function PencilMark({ className }) {
    return (
        <span className={className} aria-hidden>
            <svg viewBox="0 0 22 20" fill="none">
                {/* the line it leaves behind */}
                <path
                    className="pencil__line"
                    pathLength="1"
                    d="M2.5 16.5C6 14.6 8.2 17.2 11.4 15.1C14.6 13 16.4 14.4 19.5 12.6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                />
                {/* the pencil itself */}
                <g className="pencil__body" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">
                    <path d="M6.4 11.6 L13.7 3.1 L16.5 5.5 L9.2 14 Z" />
                    <path d="M6.4 11.6 L5.2 15.2 L8.7 14.2" />
                    <path d="M13.7 3.1 L14.9 1.7 A1.9 1.9 0 0 1 17.8 4.1 L16.5 5.5" />
                </g>
            </svg>
        </span>
    )
}
