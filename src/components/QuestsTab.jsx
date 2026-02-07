import React from 'react'
import { motion } from 'framer-motion'
import { allQuests } from '../data/gameData'

const QuestsTab = () => {
    return (
        <motion.div
            className="quests-tab"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
        >
            <div className="quests-tab-header">
                <h2 className="section-title">Quest Log</h2>
                <div className="quest-legend">
                    <span className="legend-item">
                        <span className="legend-dot" style={{ background: '#22C55E' }} />
                        Completed
                    </span>
                    <span className="legend-item">
                        <span className="legend-dot" style={{ background: '#EAB308' }} />
                        In Progress
                    </span>
                </div>
            </div>

            <div className="quests-tab-list">
                {allQuests.map((quest, i) => (
                    <motion.div
                        key={quest.name}
                        className="quest-card"
                        style={{ borderLeftColor: quest.color }}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07 }}
                    >
                        <div className="quest-card-top">
                            <span className="quest-card-name" style={{ color: quest.color }}>
                                {quest.name}
                            </span>
                            <span className="quest-card-pct">
                                {quest.period}
                            </span>
                        </div>
                        {quest.role && (
                            <p className="quest-card-role">{quest.role}</p>
                        )}
                        <p className="quest-card-desc">{quest.description}</p>
                        <div className="quest-bar-track">
                            <motion.div
                                className="quest-bar-fill"
                                style={{ backgroundColor: quest.color }}
                                initial={{ width: 0 }}
                                animate={{ width: `${quest.progress}%` }}
                                transition={{ duration: 0.8, delay: i * 0.07 + 0.2 }}
                            />
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

export default QuestsTab
