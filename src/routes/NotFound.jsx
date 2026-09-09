import React from 'react'
import { Link } from 'react-router'

export default function NotFound() {
    return (
        <div className="prose-page">
            <header className="prose-head">
                <h1 className="t-lead text-ink">Not here.</h1>
            </header>
            <p className="t-body text-ink-body">
                That page does not exist. Try the <Link to="/blog" className="prose-a">writing</Link>{' '}
                or go <Link to="/" className="prose-a">back to the start</Link>.
            </p>
        </div>
    )
}
