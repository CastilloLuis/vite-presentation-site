import React from 'react'
import { stats } from '../data/gameData'

const StatsSidebar = () => {
    return (
        <div className="quest-list-section">
            <h2 className="section-title">Stats</h2>
            <div className="stats-sidebar">
                {stats.map((stat) => (
                    <div key={stat.abbr} className="stats-sidebar-row">
                        <div className="stats-sidebar-header">
                            <span className="stats-sidebar-label">{stat.label}</span>
                            <span className="stats-sidebar-value">{stat.value}</span>
                        </div>
                        <div className="stat-bar-track">
                            <div
                                className="stat-bar-fill"
                                style={{ width: `${stat.value}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default StatsSidebar
