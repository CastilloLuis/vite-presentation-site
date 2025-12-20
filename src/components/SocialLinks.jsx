import React from 'react'

const socialIcons = [
    { name: 'Discord', slug: 'discord', url: 'https://discord.com/users/iluiscastillo', color: '#5865F2' },
    { name: 'Telegram', slug: 'telegram', url: 'https://t.me/prolcjs', color: '#26A5E4' },
    { name: 'GitHub', slug: 'github', url: 'https://github.com/castilloluis', color: '#181717' }
]

const SocialLinks = () => {
    return (
        <section style={{ marginTop: '1rem', textAlign: 'center' }}>
            <h2 style={{ 
                fontSize: '1.1rem', 
                fontWeight: '500',
                letterSpacing: '0.05em',
                marginBottom: '1rem',
                opacity: 0.8
            }}>
                Let's Build Something Amazing
            </h2>
            <div className="social-icons-row">
                {socialIcons.map((icon) => (
                    <a
                        key={icon.slug}
                        href={icon.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon-link"
                        style={{ '--hover-color': icon.color }}
                    >
                        <img
                            src={`https://cdn.simpleicons.org/${icon.slug}`}
                            alt={icon.name}
                            className="social-icon-img"
                        />
                    </a>
                ))}
            </div>
        </section>
    )
}

export default SocialLinks
