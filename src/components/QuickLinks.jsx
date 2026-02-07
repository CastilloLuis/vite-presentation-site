import React from 'react'
import { socialLinks } from '../data/gameData'

const QuickLinks = () => {
    return (
        <div className="quick-links-section">
            <h2 className="section-title-sm">Quick Link Icons</h2>
            <div className="quick-links">
                {socialLinks.map((link) => (
                    <a
                        key={link.slug}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mc-slot quick-link-slot"
                    >
                        <img
                            src={`https://cdn.simpleicons.org/${link.slug}`}
                            alt={link.name}
                            className="quick-link-icon"
                        />
                    </a>
                ))}
            </div>
        </div>
    )
}

export default QuickLinks
