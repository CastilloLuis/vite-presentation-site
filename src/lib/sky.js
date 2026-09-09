// ============================================
// Sky — the colour of the sky at a given hour.
// Drives the sky gradient, the stars and the clouds.
// ============================================

// Keyframes around a 24h clock. Colours are [r, g, b].
const KEYFRAMES = [
    { h: 0.0, top: [5, 6, 15], mid: [10, 15, 32], bottom: [16, 22, 46], stars: 1.0 },
    { h: 4.5, top: [13, 19, 48], mid: [36, 40, 76], bottom: [74, 58, 85], stars: 0.55 },
    { h: 6.2, top: [55, 88, 141], mid: [164, 120, 140], bottom: [232, 160, 106], stars: 0.12 },
    { h: 8.5, top: [63, 123, 192], mid: [133, 176, 218], bottom: [207, 226, 240], stars: 0.0 },
    { h: 13.0, top: [44, 110, 198], mid: [106, 164, 222], bottom: [183, 215, 240], stars: 0.0 },
    { h: 17.0, top: [61, 117, 182], mid: [143, 167, 198], bottom: [221, 185, 140], stars: 0.0 },
    { h: 19.0, top: [55, 88, 141], mid: [176, 128, 135], bottom: [213, 142, 98], stars: 0.05 },
    { h: 20.5, top: [26, 36, 68], mid: [58, 53, 87], bottom: [107, 74, 92], stars: 0.4 },
    { h: 22.0, top: [8, 11, 28], mid: [14, 20, 40], bottom: [23, 29, 58], stars: 0.9 },
    { h: 24.0, top: [5, 6, 15], mid: [10, 15, 32], bottom: [16, 22, 46], stars: 1.0 },
]

const SUNRISE = 6.2
const SUNSET = 19.6

const lerp = (a, b, t) => a + (b - a) * t
const lerpRgb = (a, b, t) => [
    Math.round(lerp(a[0], b[0], t)),
    Math.round(lerp(a[1], b[1], t)),
    Math.round(lerp(a[2], b[2], t)),
]

export const rgb = (c, alpha) =>
    alpha === undefined ? `rgb(${c[0]} ${c[1]} ${c[2]})` : `rgb(${c[0]} ${c[1]} ${c[2]} / ${alpha})`

const INK_DARK = [17, 17, 17]
const INK_LIGHT = [250, 250, 250]

/** Relative luminance, 0 (black) to 1 (white). */
export function luminance([r, g, b]) {
    const f = (v) => {
        const s = v / 255
        return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
    }
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
}

/** WCAG contrast ratio between two colours, 1 to 21. */
export function contrast(a, b) {
    const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
    return (hi + 0.05) / (lo + 0.05)
}

/**
 * The full sky state at `hour` (a float, 0–24), interpolated between
 * keyframes. `isDay` still drives the scrubber's icon and the ink choice,
 * but nothing is drawn in the sky itself any more beyond the gradient, the
 * stars and the clouds.
 */
export function skyAt(hour) {
    const h = ((hour % 24) + 24) % 24

    let i = 0
    while (i < KEYFRAMES.length - 2 && KEYFRAMES[i + 1].h <= h) i++
    const a = KEYFRAMES[i]
    const b = KEYFRAMES[i + 1]
    const t = (h - a.h) / (b.h - a.h)

    const top = lerpRgb(a.top, b.top, t)
    const mid = lerpRgb(a.mid, b.mid, t)
    const bottom = lerpRgb(a.bottom, b.bottom, t)
    const stars = lerp(a.stars, b.stars, t)

    const isDay = h >= SUNRISE && h <= SUNSET

    // Pick whichever ink actually reads on this sky, rather than trusting a
    // brightness threshold — sunrise and sunset sit right on the fence.
    const lum = luminance(bottom) * 0.6 + luminance(mid) * 0.4
    const ink = contrast(INK_DARK, bottom) >= contrast(INK_LIGHT, bottom) ? INK_DARK : INK_LIGHT

    return {
        hour: h,
        top,
        mid,
        bottom,
        stars,
        isDay,
        luminance: lum,
        onSky: ink,
        // True when the sky is light enough that it wants dark ink on it.
        bright: ink === INK_DARK,
        gradient: `linear-gradient(to bottom, ${rgb(top)} 0%, ${rgb(mid)} 46%, ${rgb(bottom)} 100%)`,
        label: labelFor(h),
    }
}

function labelFor(h) {
    if (h < 4.5) return 'Night'
    if (h < 6.2) return 'Dawn'
    if (h < 8.5) return 'Sunrise'
    if (h < 11.5) return 'Morning'
    if (h < 15) return 'Midday'
    if (h < 17.5) return 'Afternoon'
    if (h < 19.6) return 'Golden hour'
    if (h < 21) return 'Dusk'
    return 'Night'
}

/**
 * Stops on the scrubber, left to right. The last one follows the real clock,
 * which is where the control rests until someone moves it.
 */
export const SKY_PRESETS = [
    { key: 'night', hour: 1.5, label: 'Night', icon: 'moonStars' },
    { key: 'dawn', hour: 5.6, label: 'Dawn', icon: 'sunHorizon' },
    { key: 'sunrise', hour: 6.6, label: 'Sunrise', icon: 'sunHorizon' },
    { key: 'morning', hour: 9, label: 'Morning', icon: 'cloudSun' },
    { key: 'midday', hour: 13, label: 'Midday', icon: 'sun' },
    { key: 'afternoon', hour: 16.5, label: 'Afternoon', icon: 'sun' },
    { key: 'golden', hour: 18.6, label: 'Golden hour', icon: 'sunHorizon' },
    { key: 'dusk', hour: 20.4, label: 'Dusk', icon: 'moon' },
    { key: 'live', hour: null, label: 'Live', icon: 'auto' },
]

export const LIVE_INDEX = SKY_PRESETS.length - 1

/** Current local hour as a float, e.g. 14.5 for 14:30. */
export function currentHour(timeZone) {
    const now = new Date()
    if (!timeZone) return now.getHours() + now.getMinutes() / 60
    try {
        const parts = new Intl.DateTimeFormat('en-GB', {
            timeZone,
            hour: '2-digit',
            minute: '2-digit',
            hourCycle: 'h23',
        }).formatToParts(now)
        const get = (type) => Number(parts.find((p) => p.type === type)?.value ?? 0)
        return get('hour') + get('minute') / 60
    } catch {
        return now.getHours() + now.getMinutes() / 60
    }
}
