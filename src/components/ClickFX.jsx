import React, { useEffect, useRef, useState } from 'react'
import { play } from '@/lib/sound'

let nextId = 0

// Eight spokes, evenly around the circle.
const SPOKES = Array.from({ length: 8 }, (_, i) => i * 45)

/**
 * A spark that bursts where you click, plus the tap sound.
 *
 * Listens on the document rather than wrapping anything, so it covers the
 * page, the board and the lightbox alike. Elements that make their own
 * sound carry data-quiet, so a click is never heard twice.
 */
export default function ClickFX() {
    const [rings, setRings] = useState([])
    const reduced = useRef(false)

    useEffect(() => {
        reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        const onDown = (e) => {
            if (e.button !== undefined && e.button !== 0) return
            const quiet = e.target instanceof Element && e.target.closest('[data-quiet]')
            if (!quiet) play('tap')

            if (reduced.current) return
            const id = nextId++
            setRings((r) => [...r, { id, x: e.clientX, y: e.clientY }])
            setTimeout(() => setRings((r) => r.filter((k) => k.id !== id)), 560)
        }

        document.addEventListener('pointerdown', onDown)
        return () => document.removeEventListener('pointerdown', onDown)
    }, [])

    if (!rings.length) return null

    return (
        <div className="clickfx" aria-hidden>
            {rings.map((r) => (
                <span key={r.id} className="clickfx__spark" style={{ left: r.x, top: r.y }}>
                    {SPOKES.map((a) => (
                        <i key={a} style={{ '--a': `${a}deg` }} />
                    ))}
                </span>
            ))}
        </div>
    )
}
