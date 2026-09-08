import React from 'react'
import MagmaMark from '@/components/MagmaMark'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { companies } from '@/data/site'

// Every mark sits on the same optical height, the way a logo wall should.
const LOGO_HEIGHT = 17.5

/**
 * Logos render as CSS masks filled with currentColor rather than as images.
 * Most of these files ship white-on-transparent, which would vanish on the
 * light theme — as a mask they take the page's ink colour instead, and the
 * one multicolour file (Code2Flow) flattens to match the rest.
 */
function Logo({ company }) {
    if (company.mark === 'magma') {
        return (
            <span className="flex items-center gap-1.5" style={{ height: LOGO_HEIGHT }}>
                <MagmaMark className="h-full w-auto" />
                <span className="t-body leading-none" style={{ letterSpacing: '-0.32px' }}>
                    {company.name}
                </span>
            </span>
        )
    }

    if (!company.logo) {
        return (
            <span className="t-body block leading-none whitespace-nowrap" style={{ letterSpacing: '-0.32px' }}>
                {company.name}
            </span>
        )
    }

    return (
        <span
            role="img"
            aria-label={company.name}
            className="block"
            style={{
                height: LOGO_HEIGHT,
                width: LOGO_HEIGHT * (company.aspect ?? 3),
                backgroundColor: 'currentColor',
                maskImage: `url(${company.logo})`,
                WebkitMaskImage: `url(${company.logo})`,
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskPosition: 'center',
            }}
        />
    )
}

function Item({ company }) {
    const body = (
        <span className="group block cursor-default text-ink-faint transition-colors duration-200 hover:text-ink">
            <Logo company={company} />
        </span>
    )

    // Nothing true to say about this one yet, so no tooltip.
    if (!company.note) return <li className="shrink-0">{body}</li>

    return (
        <li className="shrink-0">
            <Tooltip delayDuration={60}>
                <TooltipTrigger asChild>{body}</TooltipTrigger>
                <TooltipContent>{company.note}</TooltipContent>
            </Tooltip>
        </li>
    )
}

export default function Marquee() {
    const track = [...companies, ...companies]

    return (
        <TooltipProvider>
            <div className="marquee-mask marquee-track mx-auto w-[84%] shrink-0 overflow-hidden py-[15px]">
                <ul
                    className="animate-marquee flex w-max items-center gap-8 pr-8"
                    style={{ '--marquee-duration': '64s' }}
                >
                    {track.map((c, i) => (
                        <Item key={`${c.name}-${i}`} company={c} />
                    ))}
                </ul>
            </div>
        </TooltipProvider>
    )
}
