import React from 'react'
import { Link } from 'react-router'
import CardPage from '@/routes/CardPage'

export default function NotFound() {
    return (
        <CardPage back={{ to: '/', label: 'Back' }}>
            <header className="read__head">
                <h1 className="t-hero text-ink">Not here.</h1>
            </header>
            <p className="t-body text-ink-body">
                That page does not exist. Try the <Link to="/blog" className="prose-a">writing</Link>,
                or go <Link to="/" className="prose-a">back to the start</Link>.
            </p>
        </CardPage>
    )
}
