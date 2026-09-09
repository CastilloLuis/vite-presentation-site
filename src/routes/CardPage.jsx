import React from 'react'
import { Link } from 'react-router'
import { SkyProvider, SEED_HOUR } from '@/components/SkyProvider'
import ClickFX from '@/components/ClickFX'
import { profile } from '@/data/site'

/**
 * The shell the writing sits in: the same card, on the same sky, as the front
 * page — only sized for reading and free to grow with the text.
 *
 * The sky is seeded rather than read from the clock because these pages are
 * prerendered and hydrated; the loop picks up the real hour a frame later.
 */
export default function CardPage({ back, children }) {
    return (
        <SkyProvider seed={SEED_HOUR}>
            <div className="card-inset read">
                <article className="sky-card read__card">
                    <nav className="read__top">
                        <Link to={back.to} className="prose-back">{back.label}</Link>
                        <Link to="/" className="read__name t-meta">{profile.name}</Link>
                    </nav>
                    {children}
                </article>
            </div>
            <ClickFX />
        </SkyProvider>
    )
}
