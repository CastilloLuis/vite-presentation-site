import React from 'react'
import AppStack from '@/components/AppStack'
import Robots from '@/components/Robots'
import Compass from '@/components/Compass'
import Screen from '@/components/Screen'
import Scribble from '@/components/Scribble'
import RevealText from '@/components/RevealText'
import Portrait from '@/components/Portrait'
import { profile } from '@/data/site'

export default function Identity() {
    return (
        <div className="shrink-0">
            {/* The type scale sits on the wrapper so the portrait beside it
                can size itself in `em` against the heading. */}
            <div className="hero t-hero text-ink">
                <Portrait />
                <p className="max-w-[24ch] min-w-0">
                    <RevealText text={profile.statement} delay={0.12} stagger={0.06} />
                </p>
            </div>

            <p className="t-body mt-3 max-w-[62ch] text-ink-body">
                <RevealText
                    text={profile.summary}
                    delay={0.4}
                    stagger={0.014}
                    slots={{ scribble: <Scribble />, screen: <Screen /> }}
                />
            </p>

            <p className="t-body mt-2.5 max-w-[62ch] text-ink-body">
                <RevealText
                    text={profile.practice}
                    delay={0.62}
                    stagger={0.012}
                    slots={{ agents: <Robots />, compass: <Compass /> }}
                />
            </p>

            <p className="t-body mt-2 text-ink-body">
                <RevealText
                    text={profile.apps}
                    delay={0.72}
                    stagger={0.012}
                    slots={{ projects: <AppStack /> }}
                />
            </p>

        </div>
    )
}
