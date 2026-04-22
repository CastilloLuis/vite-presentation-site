import React from 'react'

export default function AppIcon({ kind }) {
    if (kind === 'terminal') {
        return (
            <span className="app-icon" style={{ background: 'linear-gradient(160deg, #202428, #0a0a0a)' }}>
                <span className="app-icon-terminal-prompt">&gt;_</span>
            </span>
        )
    }
    if (kind === 'finder') {
        return (
            <span className="app-icon" style={{ background: 'linear-gradient(170deg, #5fa9ff, #1947c9)' }}>
                <span className="app-icon-finder-face">
                    <span className="app-icon-finder-eye" />
                    <span className="app-icon-finder-eye" />
                    <span className="app-icon-finder-smile" />
                </span>
            </span>
        )
    }
    if (kind === 'notes') {
        return (
            <span className="app-icon" style={{ background: 'linear-gradient(170deg, #fff3b0, #f2b134)' }}>
                <span className="app-icon-notes-lines">
                    <span /><span /><span /><span />
                </span>
            </span>
        )
    }
    if (kind === 'photos') {
        return <span className="app-icon app-icon-photos" />
    }
    if (kind === 'contact') {
        return (
            <span className="app-icon" style={{ background: 'linear-gradient(170deg, #c7a6ff, #7242d6)' }}>
                <svg viewBox="0 0 64 64" width="56%" height="56%" fill="none">
                    <circle cx="32" cy="24" r="11" fill="#ffffff" />
                    <path d="M10 54c0-12 10-20 22-20s22 8 22 20" fill="#ffffff" />
                </svg>
            </span>
        )
    }
    if (kind === 'github') {
        return (
            <span className="app-icon" style={{ background: '#0d1117' }}>
                <svg viewBox="0 0 24 24" width="55%" height="55%" fill="#ffffff">
                    <path d="M12 .5a11.5 11.5 0 0 0-3.63 22.4c.58.1.8-.26.8-.56v-2c-3.24.7-3.92-1.56-3.92-1.56-.53-1.35-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.26 3.4.96.1-.75.4-1.26.74-1.55-2.58-.3-5.3-1.29-5.3-5.73 0-1.27.46-2.3 1.2-3.11-.12-.3-.52-1.48.11-3.08 0 0 .98-.31 3.2 1.19a11.1 11.1 0 0 1 5.82 0c2.22-1.5 3.2-1.19 3.2-1.19.63 1.6.23 2.78.11 3.08.75.81 1.2 1.84 1.2 3.11 0 4.45-2.72 5.42-5.31 5.71.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
                </svg>
            </span>
        )
    }
    return null
}
