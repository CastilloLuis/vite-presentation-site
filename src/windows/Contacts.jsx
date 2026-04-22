import React from 'react'
import { socialLinks } from '../data/gameData'

const ICONS = {
    Discord: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M20.3 4.4A19.5 19.5 0 0 0 15.7 3l-.2.4a18 18 0 0 0-7 0L8.3 3A19.5 19.5 0 0 0 3.7 4.4C1 8.5.3 12.5.6 16.5a20 20 0 0 0 6 3l.5-.7c-.9-.3-1.8-.8-2.6-1.3.2-.1.4-.3.6-.4a14 14 0 0 0 13.8 0l.6.4c-.8.5-1.7 1-2.6 1.3l.5.7a20 20 0 0 0 6-3c.3-4.6-.6-8.6-3-12ZM8.7 14.3c-1 0-1.8-1-1.8-2.1 0-1.2.8-2.1 1.8-2.1s1.9 1 1.8 2.1c0 1.2-.8 2.1-1.8 2.1Zm6.6 0c-1 0-1.8-1-1.8-2.1 0-1.2.8-2.1 1.8-2.1s1.9 1 1.8 2.1c0 1.2-.8 2.1-1.8 2.1Z" />
        </svg>
    ),
    Telegram: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M21.8 3.4 2.6 10.8c-1.2.5-1.2 1.2-.2 1.5l4.9 1.5 11.3-7.1c.5-.3 1-.1.6.2l-9.1 8.3.3 4.8c.5 0 .7-.2 1-.5l2.4-2.3 4.9 3.6c.9.5 1.6.2 1.8-.8l3.3-15.5c.3-1.3-.5-1.8-1.4-1.4Z" />
        </svg>
    ),
    GitHub: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M12 .5a11.5 11.5 0 0 0-3.63 22.4c.58.1.8-.26.8-.56v-2c-3.24.7-3.92-1.56-3.92-1.56-.53-1.35-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.26 3.4.96.1-.75.4-1.26.74-1.55-2.58-.3-5.3-1.29-5.3-5.73 0-1.27.46-2.3 1.2-3.11-.12-.3-.52-1.48.11-3.08 0 0 .98-.31 3.2 1.19a11.1 11.1 0 0 1 5.82 0c2.22-1.5 3.2-1.19 3.2-1.19.63 1.6.23 2.78.11 3.08.75.81 1.2 1.84 1.2 3.11 0 4.45-2.72 5.42-5.31 5.71.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
        </svg>
    ),
}

export default function Contacts() {
    return (
        <div className="contacts">
            <div className="contacts-header">
                <img className="contacts-avatar" src="/pfp.png" alt="Luis Castillo" />
                <div className="contacts-name">Luis Castillo</div>
                <div className="contacts-role">Senior Software Engineer · Tech Lead</div>
            </div>
            <div className="contacts-divider" />
            <div className="contacts-list">
                {socialLinks.map((s) => (
                    <a key={s.name} className="contacts-row" href={s.url} target="_blank" rel="noreferrer">
                        <span className="contacts-icon">{ICONS[s.name]}</span>
                        <span className="contacts-label">{s.name}</span>
                        <span className="contacts-value">{s.url.replace(/https?:\/\//, '')}</span>
                    </a>
                ))}
                <a className="contacts-row" href="mailto:contact@kasti.dev">
                    <span className="contacts-icon">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                            <path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm8 7.8L3.4 7h17.2L12 12.8Z" />
                        </svg>
                    </span>
                    <span className="contacts-label">Email</span>
                    <span className="contacts-value">contact@kasti.dev</span>
                </a>
            </div>
        </div>
    )
}
