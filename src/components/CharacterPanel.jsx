import React from 'react'
import { motion } from 'framer-motion'

const CharacterPanel = () => {
    return (
        <div className="character-panel">
            <div className="mc-slot portrait-slot">
                <img
                    src="/pfp.png"
                    alt="Luis Castillo Character Portrait"
                    className="portrait-img"
                />
                <div className="portrait-overlay" />
            </div>
            <div className="character-info">
                <h1 className="character-name">Luis Castillo</h1>
                <p className="character-class">Senior Software Engineer <br />Frontend Architect</p>
            </div>
        </div>
    )
}

export default CharacterPanel
