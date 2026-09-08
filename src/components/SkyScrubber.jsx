import React, { useCallback, useRef } from 'react'
import { Cloudy, Moon, Sunrise, Sun, Stars } from 'lucide-react'
import { useSky } from '@/components/SkyProvider'
import { LIVE_INDEX, SKY_PRESETS } from '@/lib/sky'
import { cn } from '@/lib/utils'

const ICONS = { sun: Sun, moon: Moon, moonStars: Stars, sunHorizon: Sunrise, cloudSun: Cloudy }

function iconFor(preset, ui) {
    if (preset.icon !== 'auto') return ICONS[preset.icon] ?? Sun
    return ui.isDay ? Sun : Moon
}

/**
 * Time-of-day scrubber, stood on end so it can live in the margin beside the
 * card. Click a stop, drag along it, or use the arrow keys. It rests on the
 * last stop, which follows the real clock.
 */
export default function SkyScrubber({ horizontal = false }) {
    const { ui, presetIndex, setPresetIndex, ink } = useSky()
    const scaleRef = useRef(null)
    const dragging = useRef(false)

    const preset = SKY_PRESETS[presetIndex]
    const Icon = iconFor(preset, ui)
    const last = SKY_PRESETS.length - 1

    const setFromPointer = useCallback(
        (e) => {
            const el = scaleRef.current
            if (!el) return
            const r = el.getBoundingClientRect()
            const ratio = horizontal
                ? (e.clientX - r.left) / r.width
                : (e.clientY - r.top) / r.height
            setPresetIndex(Math.round(Math.min(Math.max(ratio, 0), 1) * last))
        },
        [horizontal, last, setPresetIndex]
    )

    const onPointerDown = (e) => {
        dragging.current = true
        e.currentTarget.setPointerCapture(e.pointerId)
        setFromPointer(e)
    }
    const onPointerMove = (e) => {
        if (dragging.current) setFromPointer(e)
    }
    const endDrag = () => {
        dragging.current = false
    }

    const onKeyDown = (e) => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            e.preventDefault()
            setPresetIndex(Math.max(0, presetIndex - 1))
        }
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            e.preventDefault()
            setPresetIndex(Math.min(last, presetIndex + 1))
        }
        if (e.key === 'Home') setPresetIndex(0)
        if (e.key === 'End') setPresetIndex(last)
    }

    return (
        <div
            className={cn('scrub', horizontal && 'scrub--row')}
            style={
                horizontal
                    ? undefined
                    : {
                          color: ink,
                          background: ui.bright
                              ? 'rgb(255 255 255 / 0.3)'
                              : 'rgb(16 18 32 / 0.4)',
                      }
            }
        >
            <button
                type="button"
                data-quiet
                onClick={() => setPresetIndex(presetIndex === LIVE_INDEX ? 0 : LIVE_INDEX)}
                aria-label={
                    presetIndex === LIVE_INDEX
                        ? 'Sky follows the current hour. Activate to pin it.'
                        : `Sky pinned to ${preset.label}. Activate to follow the current hour.`
                }
                className="scrub__dial"
                style={
                    horizontal
                        ? undefined
                        : { background: ui.bright ? 'rgb(0 0 0 / 0.06)' : 'rgb(255 255 255 / 0.1)' }
                }
            >
                <Icon className="size-3.5" strokeWidth={1.6} />
            </button>

            <div
                ref={scaleRef}
                role="slider"
                tabIndex={0}
                aria-label="Time of day"
                aria-orientation={horizontal ? 'horizontal' : 'vertical'}
                aria-valuemin={0}
                aria-valuemax={last}
                aria-valuenow={presetIndex}
                aria-valuetext={preset.hour == null ? 'Live' : preset.label}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                onKeyDown={onKeyDown}
                className="scrub__scale"
            >
                {SKY_PRESETS.map((p, i) => (
                    <span
                        key={p.key}
                        className={cn('scrub__tick', i === presetIndex && 'is-active')}
                    />
                ))}
                <span
                    aria-hidden
                    className="scrub__indicator"
                    style={
                        horizontal
                            ? { left: `${(presetIndex / last) * 100}%` }
                            : { top: `${(presetIndex / last) * 100}%` }
                    }
                />
            </div>

            <span className="scrub__time t-micro tabular-nums">
                {preset.hour == null ? ui.time : preset.label.slice(0, 5)}
            </span>
        </div>
    )
}
