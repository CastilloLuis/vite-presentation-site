import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Maximize2, Minus, Plus } from 'lucide-react'

const MIN = 0.3
const MAX = 4
const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi)

/**
 * A pannable, zoomable viewport — drag to move, wheel or pinch to zoom.
 *
 * Zoom is anchored to the pointer: the point under the cursor stays put,
 * which is what makes it feel like a canvas rather than a slider. The wheel
 * listener is attached manually because React's onWheel is passive and so
 * cannot preventDefault the page's own scroll.
 */
export default function PanZoom({ width, height, padding = 0.94, focus, minScale = 0, children }) {
    const viewRef = useRef(null)
    const [t, setT] = useState({ x: 0, y: 0, k: 1 })
    const drag = useRef(null)
    const pinch = useRef(null)
    const points = useRef(new Map())

    const fit = useCallback(() => {
        const el = viewRef.current
        if (!el) return
        const { width: vw, height: vh } = el.getBoundingClientRect()
        // `focus` narrows the fit to the part worth looking at, and
        // `minScale` is a legibility floor — on a phone the whole sheet
        // scaled to the width would put the handwriting at about four
        // pixels, so it opens larger than the view and pans instead.
        const r = focus ?? { x: 0, y: 0, w: width, h: height }
        const k = Math.max(Math.min(vw / r.w, vh / r.h) * padding, minScale)
        // Anything that overflows the view starts at its leading edge, so
        // the drawing opens at its beginning rather than halfway along.
        const place = (view, len, start) => {
            const scaled = len * k
            const inset = scaled > view ? (view - view / padding) / 2 : (view - scaled) / 2
            return inset - start * k
        }
        setT({ k, x: place(vw, r.w, r.x), y: place(vh, r.h, r.y) })
    }, [width, height, padding, focus, minScale])

    useEffect(() => {
        fit()
        const el = viewRef.current
        if (!el) return
        const ro = new ResizeObserver(fit)
        ro.observe(el)
        return () => ro.disconnect()
    }, [fit])

    // Zoom about a point in viewport coordinates.
    const zoomAt = useCallback((cx, cy, factor) => {
        setT((p) => {
            const k = clamp(p.k * factor, MIN, MAX)
            const r = k / p.k
            return { k, x: cx - (cx - p.x) * r, y: cy - (cy - p.y) * r }
        })
    }, [])

    useEffect(() => {
        const el = viewRef.current
        if (!el) return
        const onWheel = (e) => {
            e.preventDefault()
            const r = el.getBoundingClientRect()
            const cx = e.clientX - r.left
            const cy = e.clientY - r.top
            // A trackpad pinch arrives as ctrl+wheel; plain wheel pans on
            // some devices, so treat both as zoom for predictability.
            const factor = Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.0022))
            zoomAt(cx, cy, factor)
        }
        el.addEventListener('wheel', onWheel, { passive: false })
        return () => el.removeEventListener('wheel', onWheel)
    }, [zoomAt])

    // Touches are tracked by id: one finger drags, two pinch. Without the
    // map a second finger would be read as a jump of the first.
    const onPointerDown = (e) => {
        e.currentTarget.setPointerCapture(e.pointerId)
        points.current.set(e.pointerId, { x: e.clientX, y: e.clientY })

        if (points.current.size === 2) {
            const [a, b] = [...points.current.values()]
            pinch.current = Math.hypot(a.x - b.x, a.y - b.y)
            drag.current = null
        } else if (points.current.size === 1) {
            drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY }
        }
    }

    const onPointerMove = (e) => {
        if (!points.current.has(e.pointerId)) return
        points.current.set(e.pointerId, { x: e.clientX, y: e.clientY })

        if (points.current.size >= 2) {
            const [a, b] = [...points.current.values()]
            const d = Math.hypot(a.x - b.x, a.y - b.y)
            const el = viewRef.current
            if (pinch.current > 0 && el) {
                const r = el.getBoundingClientRect()
                zoomAt((a.x + b.x) / 2 - r.left, (a.y + b.y) / 2 - r.top, d / pinch.current)
            }
            pinch.current = d
            return
        }

        const dr = drag.current
        if (!dr || dr.id !== e.pointerId) return
        const dx = e.clientX - dr.x
        const dy = e.clientY - dr.y
        drag.current = { ...dr, x: e.clientX, y: e.clientY }
        setT((p) => ({ ...p, x: p.x + dx, y: p.y + dy }))
    }

    const endDrag = (e) => {
        if (e?.pointerId != null) points.current.delete(e.pointerId)
        else points.current.clear()

        pinch.current = null
        // Lifting one finger of a pinch hands the drag to the one still down,
        // rather than leaving the canvas stuck until it is lifted too.
        if (points.current.size === 1) {
            const [id] = points.current.keys()
            drag.current = { id, ...points.current.get(id) }
        } else {
            drag.current = null
        }
    }

    const step = (factor) => {
        const el = viewRef.current
        if (!el) return
        const r = el.getBoundingClientRect()
        zoomAt(r.width / 2, r.height / 2, factor)
    }

    const onKeyDown = (e) => {
        if (e.key === '+' || e.key === '=') { e.preventDefault(); step(1.25) }
        if (e.key === '-' || e.key === '_') { e.preventDefault(); step(0.8) }
        if (e.key === '0') { e.preventDefault(); fit() }
    }

    return (
        <div className="panzoom">
            <div
                ref={viewRef}
                className="panzoom__view"
                role="application"
                aria-label="Drag to move, scroll to zoom"
                tabIndex={0}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                onDoubleClick={fit}
                onKeyDown={onKeyDown}
            >
                <div
                    className="panzoom__layer"
                    style={{
                        transform: `translate(${t.x}px, ${t.y}px) scale(${t.k})`,
                        width,
                        height,
                        // Published so sheet-anchored overlays can cancel it out.
                        '--pz-scale': t.k,
                    }}
                >
                    {children}
                </div>
            </div>

            <div className="panzoom__controls">
                <button type="button" onClick={() => step(0.8)} aria-label="Zoom out">
                    <Minus className="size-3.5" />
                </button>
                <span className="panzoom__pct tabular-nums">{Math.round(t.k * 100)}%</span>
                <button type="button" onClick={() => step(1.25)} aria-label="Zoom in">
                    <Plus className="size-3.5" />
                </button>
                <button type="button" onClick={fit} aria-label="Fit to view">
                    <Maximize2 className="size-3.5" />
                </button>
            </div>
        </div>
    )
}
