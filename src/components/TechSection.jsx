import React from 'react'

const TechSection = ({ title, badges }) => {
    return (
        <section style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem', // Reduced gap further
            marginBottom: 0 // Removed gap, controlled by parent
        }}>
            <h3 style={{
                fontSize: '0.9rem',
                color: '#888',
                margin: 0, // Remove bottom margin
                letterSpacing: '0.1em',
                fontFamily: 'var(--font-mono)',
                minWidth: '135px', // Fixed width for alignment
                width: '135px', // Explicit width
                flexShrink: 0, // Prevent shrinking
                textAlign: 'left'
            }}>{title}</h3>
            <div className="badges" style={{ padding: 0, width: 'auto' }}>
                {badges.map((badge, index) => (
                    <div key={index} className="badge-container">
                        <img
                            src={badge.url || `https://cdn.simpleicons.org/${badge.slug}`}
                            alt={badge.name}
                            className="badge"
                        />
                        <span className="tooltip">{badge.name}</span>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default TechSection
