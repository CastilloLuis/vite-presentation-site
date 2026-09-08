import React from 'react'

/**
 * A knot of scribble, drawn in one unbroken stroke. Generated from a seeded
 * random walk that loops the blob twice at varying radius, then baked so it
 * is identical on every render.
 *
 * Loose on purpose: an earlier, denser version turned into a solid blob at
 * the size it actually renders (~32px), so the strokes are spaced far enough
 * apart to stay separable inline.
 *
 * The viewBox is the path's measured ink bounds, not the generator's canvas —
 * the ink sat well off-centre in that canvas, which threw the alignment out.
 * With a tight box, `vertical-align: middle` lands it on the text properly.
 */
const KNOT = 'M56.0 22.9C32.8 14.1 57.6 44.0 37.1 38.5C36.1 14.0 19.9 50.0 17.1 29.5C32.0 22.8 5.9 21.3 17.9 14.4C31.7 26.9 19.5 -1.0 32.0 8.3C26.8 40.9 56.4 -4.5 54.5 23.0C41.7 12.5 52.0 36.9 40.3 29.1C24.3 9.9 28.8 47.4 13.3 32.3C21.6 31.6 10.9 25.6 17.9 24.2C30.5 25.6 13.3 14.5 24.0 14.7C38.6 31.4 31.8 -2.5 45.6 10.4'
const VIEW_BOX = '12 5.1 45.3 35.4'

export default function Scribble() {
    return (
        <span
            className="mark scribble"
            role="img"
            aria-label="a scribble"
        >
            <svg viewBox={VIEW_BOX} fill="none" aria-hidden>
                <path
                    className="scribble__knot"
                    pathLength="1"
                    d={KNOT}
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </span>
    )
}
