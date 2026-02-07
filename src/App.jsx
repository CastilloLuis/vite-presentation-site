import React, { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import TabNav from './components/TabNav'
import CharacterTab from './components/CharacterTab'
import SkillsTab from './components/SkillsTab'
import QuestsTab from './components/QuestsTab'
import StatsTab from './components/StatsTab'
import './style.css'

function App() {
    const [activeTab, setActiveTab] = useState('Character')
    const [theme, setTheme] = useState('dark')

    useEffect(() => {
        document.documentElement.classList.add('dark')
    }, [])

    const toggleTheme = () => {
        const next = theme === 'dark' ? 'light' : 'dark'
        setTheme(next)
        document.documentElement.classList.toggle('dark')
    }

    return (
        <main className="game-container">
            <div className="game-wrapper">
                <TabNav
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    theme={theme}
                    onToggleTheme={toggleTheme}
                />
                <div className="mc-panel game-panel">
                    <AnimatePresence mode="wait">
                        {activeTab === 'Character' && <CharacterTab key="c" onTabChange={setActiveTab} />}
                        {activeTab === 'Skills' && <SkillsTab key="s" />}
                        {activeTab === 'Quests' && <QuestsTab key="q" />}
                        {activeTab === 'Stats' && <StatsTab key="st" />}
                    </AnimatePresence>
                </div>
            </div>
        </main>
    )
}

export default App
