import React from 'react'
import { motion } from 'framer-motion'
import CharacterPanel from './CharacterPanel'
import Inventory from './Inventory'
import AboutBox from './AboutBox'
import StatsSidebar from './StatsSidebar'
import QuickLinks from './QuickLinks'

const CharacterTab = ({ onTabChange }) => {
    return (
        <motion.div
            className="character-tab"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
        >
            <CharacterPanel />
            <div className="character-middle">
                <Inventory onSeeSkills={() => onTabChange('Skills')} />
                <AboutBox />
            </div>
            <div className="character-right">
                <StatsSidebar />
                <QuickLinks />
            </div>
        </motion.div>
    )
}

export default CharacterTab
