import React from 'react'
import { TABS } from '../data/gameData'

const TabNav = ({ activeTab, onTabChange, theme, onToggleTheme }) => {
    return (
        <div className="tab-nav">
            <div className="tab-nav-tabs">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        className={`mc-tab ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => onTabChange(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <button className="mc-panel theme-toggle" onClick={onToggleTheme}>
                {theme === 'dark' ? '☀' : '☾'}
            </button>
        </div>
    )
}

export default TabNav
