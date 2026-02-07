import React from 'react'
import { motion } from 'framer-motion'
import { stats } from '../data/gameData'

const StatsTab = () => {
    return (
        <motion.div
            className="stats-tab"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
        >
            <div className="stats-attributes">
                <h2 className="section-title">Attributes</h2>
                <div className="stats-grid">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.abbr}
                            className="stat-card"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.06 }}
                        >
                            <span className="stat-abbr">{stat.abbr}</span>
                            <span className="stat-value">{stat.value}</span>
                            <span className="stat-label">{stat.label}</span>
                            <span className="stat-desc">{stat.description}</span>
                            <div className="stat-bar-track">
                                <motion.div
                                    className="stat-bar-fill"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${stat.value}%` }}
                                    transition={{ duration: 0.7, delay: i * 0.06 + 0.15 }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="stats-summary-col">
                <h2 className="section-title">Summary</h2>
                <div className="summary-box">
                    <div className="summary-row">
                        <span>Total XP</span><span className="summary-val">2,500,000</span>
                    </div>
                    <div className="summary-row">
                        <span>Quests Done</span><span className="summary-val">12</span>
                    </div>
                    <div className="summary-row">
                        <span>Tech Mastered</span><span className="summary-val">19</span>
                    </div>
                    <div className="summary-row">
                        <span>Years Active</span><span className="summary-val">8</span>
                    </div>
                </div>

                <h2 className="section-title" style={{ marginTop: '1.5rem' }}>Class Traits</h2>
                <div className="traits-list">
                    {['Design System Architect', 'Component Library Builder', 'Cross-Platform Delivery', 'Team & Technical Leadership'].map((trait) => (
                        <div key={trait} className="trait-row">
                            <span className="trait-star">★</span>
                            <span>{trait}</span>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

export default StatsTab
