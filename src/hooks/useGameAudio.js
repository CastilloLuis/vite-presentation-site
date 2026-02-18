import { useRef, useEffect, useCallback } from 'react'

// Synthesized game audio using Web Audio API — no external files needed

export default function useGameAudio() {
  const ctxRef = useRef(null)
  const engineRef = useRef(null)
  const ambientRef = useRef(null)
  const startedRef = useRef(false)

  // Lazy-init AudioContext (must be triggered by user gesture)
  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    if (ctxRef.current.state === 'suspended') {
      ctxRef.current.resume()
    }
    return ctxRef.current
  }, [])

  // --- Engine sound: low rumble that pitches up with speed ---
  const startEngine = useCallback(() => {
    if (engineRef.current) return
    const ctx = getCtx()

    // Two detuned oscillators for richer sound
    const osc1 = ctx.createOscillator()
    const osc2 = ctx.createOscillator()
    osc1.type = 'sawtooth'
    osc2.type = 'square'
    osc1.frequency.value = 55
    osc2.frequency.value = 55
    osc2.detune.value = 7

    // Lowpass filter for warmth
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 120
    filter.Q.value = 2

    // Gain node (starts silent)
    const gain = ctx.createGain()
    gain.gain.value = 0

    osc1.connect(filter)
    osc2.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    osc1.start()
    osc2.start()

    engineRef.current = { osc1, osc2, filter, gain }
  }, [getCtx])

  const updateEngine = useCallback((speed) => {
    if (!engineRef.current) return
    const { osc1, osc2, filter, gain } = engineRef.current
    // speed 0-15 mapped to frequency and volume
    const t = Math.min(speed / 15, 1)
    const freq = 45 + t * 60 // 45-105 Hz
    const vol = 0.015 + t * 0.04 // very subtle: 0.015 - 0.055
    const filterFreq = 100 + t * 200

    osc1.frequency.value = freq
    osc2.frequency.value = freq
    filter.frequency.value = filterFreq
    gain.gain.value = vol
  }, [])

  const stopEngine = useCallback(() => {
    if (!engineRef.current) return
    const { osc1, osc2, gain } = engineRef.current
    gain.gain.value = 0
    osc1.stop()
    osc2.stop()
    engineRef.current = null
  }, [])

  // --- Interaction chime: short two-tone "boop" ---
  const playInteract = useCallback(() => {
    const ctx = getCtx()
    const now = ctx.currentTime

    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(520, now)
    osc.frequency.setValueAtTime(780, now + 0.08)

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.12, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.25)
  }, [getCtx])

  // --- Ambient background: quiet filtered noise pad ---
  const startAmbient = useCallback(() => {
    if (ambientRef.current) return
    const ctx = getCtx()

    // Generate noise buffer
    const bufferSize = ctx.sampleRate * 4
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1)
    }

    const noise = ctx.createBufferSource()
    noise.buffer = buffer
    noise.loop = true

    // Very aggressive filtering for a soft pad
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 200
    lp.Q.value = 0.5

    const hp = ctx.createBiquadFilter()
    hp.type = 'highpass'
    hp.frequency.value = 60

    const gain = ctx.createGain()
    gain.gain.value = 0.012 // very subtle

    noise.connect(lp)
    lp.connect(hp)
    hp.connect(gain)
    gain.connect(ctx.destination)
    noise.start()

    // Quiet wind-like oscillator layer
    const wind = ctx.createOscillator()
    wind.type = 'sine'
    wind.frequency.value = 85

    const windGain = ctx.createGain()
    windGain.gain.value = 0.008

    wind.connect(windGain)
    windGain.connect(ctx.destination)
    wind.start()

    ambientRef.current = { noise, wind, gain, windGain }
  }, [getCtx])

  // Auto-start on first user interaction
  const ensureStarted = useCallback(() => {
    if (startedRef.current) return
    startedRef.current = true
    startEngine()
    startAmbient()
  }, [startEngine, startAmbient])

  useEffect(() => {
    const handler = () => ensureStarted()
    window.addEventListener('keydown', handler, { once: true })
    window.addEventListener('click', handler, { once: true })
    window.addEventListener('touchstart', handler, { once: true })
    return () => {
      window.removeEventListener('keydown', handler)
      window.removeEventListener('click', handler)
      window.removeEventListener('touchstart', handler)
    }
  }, [ensureStarted])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopEngine()
      if (ambientRef.current) {
        const { noise, wind } = ambientRef.current
        noise.stop()
        wind.stop()
        ambientRef.current = null
      }
      if (ctxRef.current) {
        ctxRef.current.close()
        ctxRef.current = null
      }
    }
  }, [stopEngine])

  return { updateEngine, playInteract }
}
