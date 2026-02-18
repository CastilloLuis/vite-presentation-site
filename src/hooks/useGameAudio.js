import { useRef, useEffect, useCallback } from 'react'

// Synthesized game audio using Web Audio API — no external files needed

export default function useGameAudio() {
  const ctxRef = useRef(null)
  const engineRef = useRef(null)
  const ambientRef = useRef(null)
  const startedRef = useRef(false)

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    if (ctxRef.current.state === 'suspended') {
      ctxRef.current.resume()
    }
    return ctxRef.current
  }, [])

  // --- Engine: gentle sine-based hum with smooth transitions ---
  const startEngine = useCallback(() => {
    if (engineRef.current) return
    const ctx = getCtx()

    // Single sine oscillator — soft and pleasant
    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = 50

    // Very aggressive lowpass to keep it warm
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 80
    filter.Q.value = 0.5

    const gain = ctx.createGain()
    gain.gain.value = 0

    osc.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)
    osc.start()

    engineRef.current = { osc, filter, gain }
  }, [getCtx])

  const updateEngine = useCallback((speed) => {
    if (!engineRef.current) return
    const ctx = ctxRef.current
    if (!ctx) return

    const { osc, filter, gain } = engineRef.current
    const now = ctx.currentTime

    // Smooth ramp — prevents clicking/popping
    const t = Math.min(speed / 15, 1)
    const freq = 40 + t * 30        // 40-70 Hz — very subtle range
    const vol = t * 0.02             // 0 to 0.02 — barely audible
    const filterFreq = 60 + t * 80   // 60-140 Hz

    osc.frequency.linearRampToValueAtTime(freq, now + 0.1)
    filter.frequency.linearRampToValueAtTime(filterFreq, now + 0.1)
    gain.gain.linearRampToValueAtTime(vol, now + 0.1)
  }, [])

  const stopEngine = useCallback(() => {
    if (!engineRef.current) return
    const { osc, gain } = engineRef.current
    gain.gain.value = 0
    osc.stop()
    engineRef.current = null
  }, [])

  // --- Interaction chime: soft two-tone boop ---
  const playInteract = useCallback(() => {
    const ctx = getCtx()
    const now = ctx.currentTime

    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(440, now)
    osc.frequency.exponentialRampToValueAtTime(660, now + 0.08)

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.08, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.2)
  }, [getCtx])

  // --- Ambient: very quiet filtered noise ---
  const startAmbient = useCallback(() => {
    if (ambientRef.current) return
    const ctx = getCtx()

    const bufferSize = ctx.sampleRate * 4
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1)
    }

    const noise = ctx.createBufferSource()
    noise.buffer = buffer
    noise.loop = true

    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 150
    lp.Q.value = 0.3

    const hp = ctx.createBiquadFilter()
    hp.type = 'highpass'
    hp.frequency.value = 50

    const gain = ctx.createGain()
    gain.gain.value = 0.008

    noise.connect(lp)
    lp.connect(hp)
    hp.connect(gain)
    gain.connect(ctx.destination)
    noise.start()

    ambientRef.current = { noise, gain }
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

  useEffect(() => {
    return () => {
      stopEngine()
      if (ambientRef.current) {
        ambientRef.current.noise.stop()
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
