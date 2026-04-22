import React, { useEffect, useState } from 'react'

function formatTime(d) {
    return d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
}

export default function StatusBar() {
    const [now, setNow] = useState(() => new Date())

    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 1000 * 15)
        return () => clearInterval(id)
    }, [])

    return (
        <div className="mobile-status">
            <span className="mobile-status-time">{formatTime(now)}</span>
            <span className="mobile-status-notch" />
            <span className="mobile-status-right">
                <svg viewBox="0 0 20 12" width="18" height="12" fill="currentColor" aria-hidden>
                    <rect x="1" y="6" width="3" height="5" rx="0.5" />
                    <rect x="6" y="4" width="3" height="7" rx="0.5" />
                    <rect x="11" y="2" width="3" height="9" rx="0.5" />
                    <rect x="16" y="0" width="3" height="11" rx="0.5" opacity="0.4" />
                </svg>
            </span>
        </div>
    )
}
