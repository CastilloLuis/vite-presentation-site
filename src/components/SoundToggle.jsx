import React, { useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { isMuted, play, setMuted } from '@/lib/sound'

/** Turns every sound on the page off, and remembers the choice. */
export default function SoundToggle() {
    const [off, setOff] = useState(isMuted)

    const toggle = () => {
        const next = !off
        setMuted(next)
        setOff(next)
        // Confirm audibly when switching it back on.
        if (!next) play('tap')
    }

    return (
        <button
            type="button"
            onClick={toggle}
            data-quiet
            aria-label={off ? 'Turn sound on' : 'Turn sound off'}
            aria-pressed={!off}
            className="rail__link"
            onPointerEnter={() => play('hover')}
        >
            {off ? <VolumeX className="size-[0.95em]" strokeWidth={1.7} /> : <Volume2 className="size-[0.95em]" strokeWidth={1.7} />}
        </button>
    )
}
