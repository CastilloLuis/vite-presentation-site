import React, { createContext, useContext, useEffect, useRef, useState } from 'react'

import { profile } from '@/data/site'
import { LIVE_INDEX, SKY_PRESETS, currentHour, rgb, skyAt } from '@/lib/sky'


const SkyCtx = createContext(null)

/** Sky state for anything that has to sit on top of it. */
export const useSky = () => useContext(SkyCtx)

/** Shortest way round a 24h clock, so 23:00 → 01:00 goes forward through midnight. */
function easeHour(from, to, t) {
    const d = ((to - from + 36) % 24) - 12
    return (from + d * t + 24) % 24
}

const clockLabel = (hour) =>
    `${String(Math.floor(hour)).padStart(2, '0')}:${String(Math.floor((hour % 1) * 60)).padStart(2, '0')}`

function makeClouds(count) {
    return Array.from({ length: count }, () => ({
        x: Math.random(),
        y: 0.12 + Math.random() * 0.55,
        scale: 0.5 + Math.random() * 1.1,
        speed: 0.004 + Math.random() * 0.012,
        alpha: 0.18 + Math.random() * 0.3,
        squash: 0.32 + Math.random() * 0.2,
    }))
}

function makeStars(count) {
    return Array.from({ length: count }, () => ({
        x: Math.random(),
        y: Math.random() * 0.72,
        r: 0.4 + Math.random() * 1.1,
        phase: Math.random() * Math.PI * 2,
        rate: 0.6 + Math.random() * 1.6,
    }))
}

/**
 * The hour the prerendered pages are built at.
 *
 * Those pages are hydrated, which means the server's markup and the browser's
 * first render have to agree — and the live clock does not agree with itself
 * across a build machine and a reader six timezones away. They seed from this
 * instead; the animation loop reads the real clock on its first frame and
 * eases from here to there, which is the same transition the scrubber makes.
 */
export const SEED_HOUR = 13

export function SkyProvider({ children, seed }) {
    const wrapRef = useRef(null)
    const canvasRef = useRef(null)

    const [presetIndex, setPresetIndex] = useState(LIVE_INDEX)
    const preset = SKY_PRESETS[presetIndex]

    // The loop reads the preset through a ref so changing it never restarts the
    // animation — the sky eases from where it is to where it is going.
    const presetRef = useRef(preset)
    useEffect(() => {
        presetRef.current = preset
    }, [preset])

    // Last reading of the real clock, refreshed every 15s while "Live".
    const targetHourRef = useRef(currentHour(profile.timezone))

    // Only the things that actually change the markup live in state. The
    // gradient itself is written straight to the element, every frame.
    // Seeded once so the very first paint already has a sky, before the
    // animation loop takes over.
    const [seedGradient] = useState(() => skyAt(seed ?? currentHour(profile.timezone)).gradient)

    const [ui, setUi] = useState(() => {
        const s = skyAt(seed ?? currentHour(profile.timezone))
        return { label: s.label, isDay: s.isDay, bright: s.bright, time: clockLabel(s.hour), ink: s.onSky }
    })

    useEffect(() => {
        const canvas = canvasRef.current
        const wrap = wrapRef.current
        if (!canvas || !wrap) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const clouds = makeClouds(reduced ? 7 : 13)
        const stars = makeStars(reduced ? 45 : 130)

        let w = 0
        let h = 0
        const resize = () => {
            const rect = wrap.getBoundingClientRect()
            const dpr = Math.min(window.devicePixelRatio || 1, 2)
            w = Math.max(rect.width, 1)
            h = Math.max(rect.height, 1)
            canvas.width = Math.round(w * dpr)
            canvas.height = Math.round(h * dpr)
            canvas.style.width = `${w}px`
            canvas.style.height = `${h}px`
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        }
        resize()
        const ro = new ResizeObserver(resize)
        ro.observe(wrap)

        let visible = true
        const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), {
            rootMargin: '250px',
        })
        io.observe(wrap)

        let current = presetRef.current.hour ?? currentHour(profile.timezone)
        let elapsed = 0
        let clockTick = 1e9 // force a clock read on the first frame
        let lastUi = null
        let raf = 0
        let last = performance.now()

        const frame = (now) => {
            raf = requestAnimationFrame(frame)
            const dt = Math.min((now - last) / 1000, 0.05)
            last = now
            if (!visible) return
            elapsed += dt

            // Where the sky wants to be: the real clock, or the pinned preset.
            clockTick += dt
            let target = presetRef.current.hour
            if (target == null) {
                if (clockTick > 15) {
                    clockTick = 0
                    targetHourRef.current = currentHour(profile.timezone)
                }
                target = targetHourRef.current
            }

            // Ease toward it.
            const delta = ((target - current + 36) % 24) - 12
            if (Math.abs(delta) > 0.002) current = easeHour(current, target, Math.min(dt * 1.6, 1))
            else current = target

            const s = skyAt(current)

            // 60fps paint, straight to the DOM — no re-render.
            wrap.style.background = s.gradient

            // Re-render only when something in the markup would actually differ.
            const time = clockLabel(current)
            if (
                !lastUi ||
                lastUi.label !== s.label ||
                lastUi.isDay !== s.isDay ||
                lastUi.bright !== s.bright ||
                lastUi.time !== time
            ) {
                lastUi = { label: s.label, isDay: s.isDay, bright: s.bright, time, ink: s.onSky }
                setUi(lastUi)
            }

            ctx.clearRect(0, 0, w, h)

            // ---- stars ----
            if (s.stars > 0.01) {
                ctx.fillStyle = '#ffffff'
                for (const st of stars) {
                    const twinkle = 0.55 + 0.45 * Math.sin(elapsed * st.rate + st.phase)
                    ctx.globalAlpha = s.stars * twinkle * 0.9
                    ctx.beginPath()
                    ctx.arc(st.x * w, st.y * h, st.r, 0, Math.PI * 2)
                    ctx.fill()
                }
                ctx.globalAlpha = 1
            }

            // ---- clouds ----
            // Warm near the horizon, cool up high. Cheap, but convincing.
            for (const c of clouds) {
                if (!reduced) {
                    c.x += c.speed * dt
                    if (c.x > 1.35) c.x = -0.35
                }

                const rad = 150 * c.scale
                const tint = c.y > 0.42 ? s.mid : s.top
                const lift = 0.45 + s.luminance * 0.75
                const base = [
                    Math.min(255, tint[0] + 90 * lift),
                    Math.min(255, tint[1] + 88 * lift),
                    Math.min(255, tint[2] + 84 * lift),
                ]

                ctx.save()
                ctx.translate(c.x * w, c.y * h)
                ctx.scale(1, c.squash)
                for (let p = 0; p < 3; p++) {
                    const ox = (p - 1) * rad * 0.52
                    const pr = rad * (p === 1 ? 1 : 0.72)
                    const g = ctx.createRadialGradient(ox, 0, 0, ox, 0, pr)
                    g.addColorStop(0, rgb(base, c.alpha))
                    g.addColorStop(1, rgb(base, 0))
                    ctx.fillStyle = g
                    ctx.beginPath()
                    ctx.arc(ox, 0, pr, 0, Math.PI * 2)
                    ctx.fill()
                }
                ctx.restore()
            }
        }

        raf = requestAnimationFrame(frame)
        return () => {
            cancelAnimationFrame(raf)
            ro.disconnect()
            io.disconnect()
        }
    }, [])

    return (
        <SkyCtx.Provider value={{ ui, presetIndex, setPresetIndex, ink: rgb(ui.ink) }}>
            {/* The sky is the page. Everything else floats on top of it. */}
            <div
                ref={wrapRef}
                aria-hidden
                className="fixed inset-0 -z-10"
                style={{ background: seedGradient }}
            >
                <canvas ref={canvasRef} className="absolute inset-0" />
            </div>
            {children}
        </SkyCtx.Provider>
    )
}
