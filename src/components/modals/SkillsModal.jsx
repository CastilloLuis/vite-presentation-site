import React from 'react'
import { motion } from 'framer-motion'
import { skillCategories } from '../../data/gameData'

function SkillIcon({ skill }) {
  const src = skill.url || `https://cdn.simpleicons.org/${skill.slug}`
  return (
    <img
      src={src}
      alt={skill.name}
      className="skill-modal-icon"
      loading="lazy"
      draggable={false}
    />
  )
}

export default function SkillsModal() {
  return (
    <div className="modal-skills">
      {skillCategories.map((cat, ci) => (
        <div key={cat.key} className="modal-skill-category">
          <h4 className="modal-skill-category-title" style={{ color: cat.color }}>
            {cat.label}
          </h4>
          <div className="modal-skill-list">
            {cat.skills.map((skill, si) => (
              <motion.div
                key={skill.name}
                className="modal-skill-item"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: ci * 0.1 + si * 0.03 }}
              >
                <SkillIcon skill={skill} />
                <span className="modal-skill-name">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
