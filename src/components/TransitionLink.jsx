import React from 'react'
import { flushSync } from 'react-dom'
import { Link, useNavigate } from 'react-router'

/**
 * A link that morphs one page into the next.
 *
 * Router's own `viewTransition` prop only works under the data router; with
 * the declarative `<Routes>` it is quietly ignored, so the transition is
 * started here instead. `flushSync` is the point of the exercise — the
 * browser snapshots the page when the callback returns, so the navigation has
 * to have been committed to the DOM by then rather than left for React to
 * schedule.
 *
 * It still renders a real anchor. Middle-click, modified clicks and anything
 * reading the markup get an ordinary href; only the plain left click is
 * intercepted, and only where the browser supports it.
 */
export default function TransitionLink({ to, onClick, children, ...rest }) {
    const navigate = useNavigate()

    const handle = (e) => {
        onClick?.(e)

        const plain =
            !e.defaultPrevented &&
            e.button === 0 &&
            !(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)

        if (!plain || !document.startViewTransition) return

        e.preventDefault()
        const t = document.startViewTransition(() => flushSync(() => navigate(to)))
        // A transition that gets skipped — a second click before the first
        // has settled, or a tab that is not visible — rejects these. The
        // navigation still happened; the animation simply did not, which is
        // not something to report.
        t.ready.catch(() => {})
        t.finished.catch(() => {})
    }

    return (
        <Link to={to} onClick={handle} {...rest}>
            {children}
        </Link>
    )
}
