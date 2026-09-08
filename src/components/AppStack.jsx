import React, { useState } from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { play } from '@/lib/sound'
import { projects } from '@/data/site'

// Tile is 1.72em; this is the per-step offset while closed, in em.
const STEP_CLOSED = 0.86
const STEP_OPEN = 1.98
const TILE = 1.72

/**
 * The apps as a tight overlapped stack sitting inside a line of text. Hover
 * the group and they fan apart; hover one and it names itself.
 *
 * The container holds the *closed* width and the tiles are absolutely
 * positioned, so opening them moves only transforms — the sentence around it
 * never reflows. Opening extends to the right, which is why this sits at the
 * end of its line.
 *
 * Which tooltip is open is driven by one piece of state rather than left to
 * each tooltip's own hover handling: the tiles overlap and move under the
 * cursor, and Radix's grace area would otherwise hold the previous label open
 * while you slide onto the next tile.
 */
export default function AppStack() {
    const [active, setActive] = useState(-1)
    const closedWidth = TILE + (projects.length - 1) * STEP_CLOSED
    const openWidth = TILE + (projects.length - 1) * STEP_OPEN

    return (
        <TooltipProvider delayDuration={80} disableHoverableContent>
            {/* Both widths are published: there is no hover on a touch
                screen, so the stylesheet fans the stack open there and needs
                the open width to reserve. */}
            <span
                className="app-stack"
                style={{ '--stack-w': `${closedWidth}em`, '--stack-open-w': `${openWidth}em` }}
                onPointerLeave={() => setActive(-1)}
            >
                {projects.map((p, i) => (
                    <Tooltip key={p.name} open={active === i}>
                        <TooltipTrigger asChild>
                            <a
                                href={p.href}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={`${p.name} — ${p.blurb}`}
                                className="app-stack__item"
                                style={{
                                    '--i': i,
                                    '--r': `${(i - (projects.length - 1) / 2) * 5}deg`,
                                    zIndex: projects.length - i,
                                }}
                                onPointerEnter={() => {
                                    setActive(i)
                                    play('hover')
                                }}
                                onFocus={() => setActive(i)}
                                onBlur={() => setActive(-1)}
                            >
                                <img src={p.icon} alt="" decoding="async" />
                            </a>
                        </TooltipTrigger>
                        <TooltipContent>
                            {p.name} — {p.blurb}
                        </TooltipContent>
                    </Tooltip>
                ))}
            </span>
        </TooltipProvider>
    )
}
