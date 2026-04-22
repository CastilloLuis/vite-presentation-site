import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { personalProjects } from '../data/gameData'

function faviconFor(domain) {
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
}

export default function Finder() {
    const [selected, setSelected] = useState(personalProjects[0]?.domain)
    const active = personalProjects.find((p) => p.domain === selected) || personalProjects[0]

    return (
        <div className="finder">
            <aside className="finder-sidebar">
                <div className="finder-side-label">Favorites</div>
                <div className="finder-side-item is-active">◆ Projects</div>
            </aside>
            <section className="finder-main">
                <div className="finder-path">Projects ▸ Personal</div>
                <div className="finder-grid">
                    {personalProjects.map((p, i) => (
                        <motion.button
                            key={p.domain}
                            className={`finder-card ${selected === p.domain ? 'is-selected' : ''}`}
                            onClick={() => setSelected(p.domain)}
                            onDoubleClick={() => window.open(p.url, '_blank', 'noopener,noreferrer')}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <img className="finder-card-fav" src={faviconFor(p.domain)} alt="" />
                            <span className="finder-card-name">{p.name}</span>
                            <span className="finder-card-period">{p.domain}</span>
                        </motion.button>
                    ))}
                </div>
                {active && (
                    <motion.div
                        key={active.domain}
                        className="finder-detail"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="finder-detail-head">
                            <span className="finder-detail-name">{active.name}</span>
                            <a
                                className="finder-detail-status"
                                href={active.url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                open ↗
                            </a>
                        </div>
                        <div className="finder-detail-sub">{active.domain}</div>
                        <p className="finder-detail-desc">{active.tagline}</p>
                    </motion.div>
                )}
            </section>
        </div>
    )
}
