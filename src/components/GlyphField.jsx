import React, { useEffect, useMemo, useRef } from 'react'

/**
 * The punctuation of code rather than letters — brackets, slashes, bits — so
 * the field reads as terminal texture and never resolves into a word anyone
 * tries to read.
 */
const GLYPHS = [...'{}[]()<>/\\:;=+·01']

const COLS = 14

/**
 * Enough rows to overfill the tallest the panel gets. The grid is anchored
 * to the bottom and clipped at the top, so a surplus costs nothing and a
 * shortfall would leave a bald strip under the tabs — the one thing the
 * field exists to avoid.
 */
const ROWS = 18

/**
 * Deterministic noise. The field has to look scattered, but it must not be
 * *actually* random: a re-render that reshuffled every glyph would flicker
 * the whole corner, and the layout has to be identical on the server for the
 * prerendered HTML to match what React builds on the client.
 */
function noise(i) {
    const x = Math.sin(i * 12.9898) * 43758.5453
    return x - Math.floor(x)
}

/**
 * The quiet half of the stack panel.
 *
 * The rows run out well before the right edge of the card — the longest is
 * nine tiles, the shortest four — and what they leave behind was the only
 * dead space on the page. This fills it, full height, with a field of glyphs
 * that fades out before it reaches the rows.
 *
 * Purely decorative: hidden from the accessibility tree, inert to the
 * pointer, and painted behind the rows.
 */
export default function GlyphField() {
    const ref = useRef(null)

    const cells = useMemo(
        () =>
            Array.from({ length: COLS * ROWS }, (_, i) => ({
                glyph: GLYPHS[Math.floor(noise(i) * GLYPHS.length)],
                // Only part of the field breathes. Partly because a couple of
                // hundred elements animating opacity at once is real work for
                // the compositor, and partly because it simply looks better:
                // a field where everything pulses reads as a blinking panel,
                // where some of it holds still reads as texture.
                still: noise(i + 3049) > 0.45,
                // Spread across the cycle so the rest shimmers unevenly
                // instead of pulsing as one block.
                delay: noise(i + 1013) * 7,
                peak: 0.35 + noise(i + 2027) * 0.65,
            })),
        []
    )

    // Swapping characters is what separates this from a static pattern, and
    // it is done straight to the DOM: re-rendering 252 spans several times a
    // second to change three of them would be the most expensive thing on
    // the page, for an effect nobody is meant to notice.
    useEffect(() => {
        const host = ref.current
        if (!host) return
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        const id = setInterval(() => {
            const spans = host.children
            for (let n = 0; n < 4; n++) {
                const cell = spans[(Math.random() * spans.length) | 0]
                if (cell) cell.textContent = GLYPHS[(Math.random() * GLYPHS.length) | 0]
            }
        }, 700)

        return () => clearInterval(id)
    }, [])

    return (
        <div ref={ref} className="glyphfield" style={{ '--cols': COLS }} aria-hidden>
            {cells.map((c, i) => (
                <span
                    key={i}
                    data-still={c.still || undefined}
                    style={{ '--d': `${c.delay}s`, '--o': c.peak }}
                >
                    {c.glyph}
                </span>
            ))}
        </div>
    )
}
