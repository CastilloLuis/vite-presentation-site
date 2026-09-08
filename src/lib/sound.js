// ============================================
// Tiny synthesised UI sounds.
//
// Nothing is downloaded — every sound is a couple of oscillators and a gain
// envelope, which keeps them a few hundred bytes instead of a few hundred
// kilobytes and means they can be tuned by hand.
//
// The AudioContext is created on the first gesture, because browsers refuse
// to start one before the user has interacted with the page.
// ============================================

const KEY = 'sound'
let ctx = null
let muted = read()

function read() {
    try {
        return localStorage.getItem(KEY) === 'off'
    } catch {
        return false
    }
}

export function isMuted() {
    return muted
}

export function setMuted(next) {
    muted = next
    try {
        localStorage.setItem(KEY, next ? 'off' : 'on')
    } catch {
        /* private mode — the setting just will not persist */
    }
}

function audio() {
    if (muted) return null
    if (!ctx) {
        const AC = window.AudioContext || window.webkitAudioContext
        if (!AC) return null
        ctx = new AC()
    }
    if (ctx.state === 'suspended') ctx.resume()
    return ctx
}

/** One oscillator with a short percussive envelope. */
function blip(c, { type = 'sine', from, to, at = 0, dur = 0.09, gain = 0.05 }) {
    const osc = c.createOscillator()
    const amp = c.createGain()
    const t = c.currentTime + at

    osc.type = type
    osc.frequency.setValueAtTime(from, t)
    if (to && to !== from) osc.frequency.exponentialRampToValueAtTime(to, t + dur)

    // A quick attack and a smooth tail — a hard stop sounds like a glitch.
    amp.gain.setValueAtTime(0.0001, t)
    amp.gain.exponentialRampToValueAtTime(gain, t + 0.008)
    amp.gain.exponentialRampToValueAtTime(0.0001, t + dur)

    osc.connect(amp).connect(c.destination)
    osc.start(t)
    osc.stop(t + dur + 0.02)
}

/** A pinch of filtered noise — the body of a shutter or a paper sound. */
function noise(c, { at = 0, dur = 0.07, gain = 0.05, freq = 2400, q = 0.8 }) {
    const t = c.currentTime + at
    const frames = Math.max(1, Math.floor(c.sampleRate * dur))
    const buf = c.createBuffer(1, frames, c.sampleRate)
    const data = buf.getChannelData(0)
    for (let i = 0; i < frames; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / frames)

    const src = c.createBufferSource()
    src.buffer = buf
    const bp = c.createBiquadFilter()
    bp.type = 'bandpass'
    bp.frequency.value = freq
    bp.Q.value = q
    const amp = c.createGain()
    amp.gain.setValueAtTime(gain, t)
    amp.gain.exponentialRampToValueAtTime(0.0001, t + dur)

    src.connect(bp).connect(amp).connect(c.destination)
    src.start(t)
    src.stop(t + dur)
}

const VOICES = {
    // Anything clickable, anywhere: a soft low tap.
    tap: (c) => {
        blip(c, { type: 'triangle', from: 210, to: 120, dur: 0.075, gain: 0.045 })
        noise(c, { dur: 0.035, gain: 0.018, freq: 1800 })
    },
    // Opening the board: two notes going up.
    open: (c) => {
        blip(c, { type: 'sine', from: 330, to: 494, dur: 0.13, gain: 0.05 })
        blip(c, { type: 'sine', from: 494, to: 659, at: 0.075, dur: 0.16, gain: 0.035 })
    },
    close: (c) => {
        blip(c, { type: 'sine', from: 440, to: 262, dur: 0.13, gain: 0.04 })
    },
    // Passing over something small — barely there on purpose.
    hover: (c) => {
        blip(c, { type: 'sine', from: 1150, to: 1500, dur: 0.03, gain: 0.014 })
    },
    // A photo: a little shutter.
    shutter: (c) => {
        noise(c, { dur: 0.045, gain: 0.06, freq: 3200, q: 1.2 })
        blip(c, { type: 'square', from: 160, to: 90, at: 0.035, dur: 0.05, gain: 0.02 })
    },
}

export function play(kind) {
    const c = audio()
    if (!c) return
    const voice = VOICES[kind]
    if (!voice) return
    try {
        voice(c)
    } catch {
        /* audio can fail on locked-down devices; never let it break a click */
    }
}
