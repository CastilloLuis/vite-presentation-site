import React from 'react'
import { motion } from 'framer-motion'
import { skillCategories } from '../data/gameData'

const SkillItem = ({ skill, index, accentColor }) => (
    <motion.div
        className="skill-row"
        initial={{ opacity: 0, x: -15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.04 }}
    >
        <div className="mc-slot skill-icon-slot">
            <img
                src={skill.url || `https://cdn.simpleicons.org/${skill.slug}`}
                alt={skill.name}
                className="skill-icon-img"
            />
        </div>
        <span className="skill-label">{skill.name}</span>
    </motion.div>
)

const SkillsTab = () => {
    return (
        <motion.div
            className="skills-tab"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
        >
            {skillCategories.map((cat) => (
                <div key={cat.key} className="skill-category-box">
                    <h2 className="section-title" style={{ color: cat.color }}>
                        {cat.label}
                    </h2>
                    <div className="skill-list">
                        {cat.skills.map((skill, i) => (
                            <SkillItem
                                key={skill.name}
                                skill={skill}
                                index={i}
                                accentColor={cat.color}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </motion.div>
    )
}

export default SkillsTab
