import React from 'react'
import ClickFX from '@/components/ClickFX'
import ContactRail from '@/components/ContactRail'
import SkyScrubber from '@/components/SkyScrubber'
import Masthead from '@/components/Masthead'
import { SkyProvider } from '@/components/SkyProvider'
import Identity from '@/sections/Identity'
import Marquee from '@/sections/Marquee'
import Panels from '@/sections/Panels'
import useMediaQuery, { NARROW } from '@/lib/useMediaQuery'
import { play } from '@/lib/sound'
import { profile } from '@/data/site'
import './index.css'

// Light only for now. The dark token set is still in the stylesheet, so
// bringing the toggle back is a matter of restoring the class swap.
export default function App() {
    // On a phone there are no margins to stand anything in, so the scrubber
    // and the contact marks come inside and sit along the foot of the card.
    const narrow = useMediaQuery(NARROW)

    return (
        <SkyProvider>
            {/* The card floats, centred, on the sky, with the scrubber and
                contact marks out in the margins. It is sized to hold one
                screen, so on a normal display nothing scrolls — but the
                height is a minimum rather than a clamp, because a phone, or
                a laptop in landscape at 390px tall, cannot hold it, and
                clipping there would put the top and bottom out of reach. */}
            <div className="card-inset relative flex min-h-[100svh] flex-col justify-center">
                <div className="sky-card mx-auto flex w-full max-w-[60rem] flex-none flex-col overflow-hidden">
                    <Masthead />
                    <main className="app-main card-x flex min-h-0 w-full flex-1 flex-col pt-4">
                        <Identity />
                        {/* <Marquee /> */}
                        <Panels />
                    </main>

                    {/* The foot of the card carries the bottom inset either
                        way: the marks and the scrubber on a phone, and just
                        the address to write to on a wide screen. */}
                    {narrow ? (
                        <footer className="cardfoot card-x">
                            <SkyScrubber horizontal />
                            <ContactRail horizontal />
                        </footer>
                    ) : (
                        <footer className="cardmail card-x">
                            <a
                                href={`mailto:${profile.email}`}
                                className="cardmail__link t-ui"
                                onPointerEnter={() => play('hover')}
                            >
                                {profile.email}
                            </a>
                        </footer>
                    )}
                </div>

                {/* Both sit in the margin beside the card, on the open sky. */}
                {!narrow && (
                    <>
                        <div className="gutter gutter--left">
                            <SkyScrubber />
                        </div>
                        <div className="gutter gutter--right">
                            <ContactRail />
                        </div>
                    </>
                )}
            </div>

            <ClickFX />
        </SkyProvider>
    )
}
