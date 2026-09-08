import React, { useState } from 'react'
import PencilMark from '@/components/PencilMark'
import Whiteboard from '@/components/Whiteboard'
import { play } from '@/lib/sound'
import useMediaQuery, { NARROW } from '@/lib/useMediaQuery'
import { profile } from '@/data/site'

export default function Masthead() {
    const [boardOpen, setBoardOpen] = useState(false)

    // On a wide screen everything identifying sits on one line. On a phone
    // that line shares its width with the pill and would wrap to five, so
    // the meta drops underneath and takes the full width instead. No clock —
    // the scrubber already carries the hour.
    const narrow = useMediaQuery(NARROW)

    // The phone keeps only where he is; the role and the years are already
    // the first thing the hero says, and repeating them costs a whole line.
    const meta = narrow ? (
        <span className="masthead__meta t-meta text-ink-faint">
            {profile.location} / {profile.availability}
        </span>
    ) : (
        <span className="masthead__meta t-meta text-ink-faint">
            <span className="mx-1.5">-</span>
            {profile.location} / {profile.availability}
            <span className="mx-1.5">-</span>
            {profile.role}
            <span className="mx-1.5">-</span>
            {profile.years}
        </span>
    )

    return (
        <header className="masthead card-x card-top flex w-full shrink-0 flex-col">
            <div className="flex w-full items-center justify-between gap-3">
                <h1 className="t-body min-w-0 truncate text-ink">
                    {profile.name}
                    {!narrow && meta}
                </h1>

                <div className="flex shrink-0 items-center gap-3">
                    <button
                        type="button"
                        onClick={() => {
                            play('open')
                            setBoardOpen(true)
                        }}
                        data-quiet
                        className="glass-pill inline-flex items-center gap-2 px-3.5 py-1.5"
                    >
                        <PencilMark className="pencil" />
                        <span className="pill-hand">Look how I work</span>
                    </button>

                    <Whiteboard
                        open={boardOpen}
                        onOpenChange={(v) => {
                            if (!v) play('close')
                            setBoardOpen(v)
                        }}
                    />
                </div>
            </div>

            {narrow && meta}
        </header>
    )
}
