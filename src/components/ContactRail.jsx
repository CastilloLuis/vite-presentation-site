import React from 'react'
import { Mail } from 'lucide-react'
import Mark from '@/components/Marks'
import SoundToggle from '@/components/SoundToggle'
import { useSky } from '@/components/SkyProvider'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { play } from '@/lib/sound'
import { profile, socials } from '@/data/site'

const pretty = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')

/** The ways to reach him, as marks in the margin. Hover names the address. */
export default function ContactRail({ horizontal = false }) {
    const { ink } = useSky()

    return (
        <TooltipProvider delayDuration={80} disableHoverableContent>
            <nav className={cn('rail', horizontal && 'rail--row')} aria-label="Contact">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <a
                            href={`mailto:${profile.email}`}
                            aria-label={`Email — ${profile.email}`}
                            className="rail__link"
                            onPointerEnter={() => play('hover')}
                        >
                            <Mail className="size-[1em]" strokeWidth={1.7} />
                        </a>
                    </TooltipTrigger>
                    <TooltipContent side={horizontal ? "top" : "left"}>{profile.email}</TooltipContent>
                </Tooltip>

                {socials.map((s) => (
                    <Tooltip key={s.name}>
                        <TooltipTrigger asChild>
                            <a
                                href={s.url}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={`${s.name} — ${pretty(s.url)}`}
                                className="rail__link"
                                onPointerEnter={() => play('hover')}
                            >
                                <Mark name={s.name} />
                            </a>
                        </TooltipTrigger>
                        <TooltipContent side={horizontal ? "top" : "left"}>{pretty(s.url)}</TooltipContent>
                    </Tooltip>
                ))}

                {/* Sound sits at the foot of the same column. */}
                <span className="rail__rule" aria-hidden style={horizontal ? undefined : { color: ink }} />
                <SoundToggle />
            </nav>
        </TooltipProvider>
    )
}
