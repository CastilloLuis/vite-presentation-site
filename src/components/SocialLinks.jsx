import React from 'react'

const SocialLinks = () => {
    const links = [
        { name: 'Discord', slug: 'discord', url: 'https://discord.com/users/iluiscastillo' },
        { name: 'Telegram', slug: 'telegram', url: 'https://t.me/prolcjs' },
        // { name: 'LinkedIn', slug: 'linkedin', url: 'https://www.linkedin.com/in/luis-eduardo-castillo-55a02b170/' },
        { name: 'GitHub', slug: 'github', url: 'https://github.com/castilloluis' }
    ]

    return (
        <section style={{ marginTop: '1rem', textAlign: 'center' }}>
            <h2>Let's Build Something Amazing</h2>
            <div className="social-links">
                {links.map((link, index) => (
                    <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
                        <img
                            src={`https://cdn.simpleicons.org/${link.slug}`}
                            alt={link.name}
                            className="badge"
                            title={link.name}
                        />
                    </a>
                ))}
            </div>
        </section>
    )
}

export default SocialLinks
