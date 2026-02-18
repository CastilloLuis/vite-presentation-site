import React from 'react'
import { motion } from 'framer-motion'
import { stats } from '../../data/gameData'

export default function AboutModal() {
  return (
    <div className="modal-about">
      <div className="modal-about-hero">
        <div className="modal-about-portrait">
          <img src="/pfp.png" alt="Luis Castillo" draggable={false} />
        </div>
        <div className="modal-about-info">
          <h3 className="modal-about-name">Luis Castillo</h3>
          <p className="modal-about-title">Senior Software Engineer / Frontend Architect</p>
          <div className="modal-about-badges">
            <span className="badge badge--level">Lv. 99</span>
            <span className="badge badge--class">Tech Lead</span>
            <span className="badge badge--years">8+ Years</span>
          </div>
        </div>
      </div>

      <div className="modal-about-bio">
        <p>
          Dedicated Senior Software Engineer with 8+ years specializing in product development,
          design systems, and architecture. I build scalable applications with React, TypeScript,
          and modern web technologies. AI? AI is my copilot. I'm the driver.
        </p>
      </div>

      <div className="modal-about-stats">
        <h4>Quick Stats</h4>
        <div className="modal-stats-grid">
          {stats.map((s) => (
            <motion.div
              key={s.abbr}
              className="modal-stat-item"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <div className="modal-stat-label">
                <span className="modal-stat-abbr">{s.abbr}</span>
                <span>{s.label}</span>
                <span className="modal-stat-value">{s.value}</span>
              </div>
              <div className="modal-stat-bar">
                <motion.div
                  className="modal-stat-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${s.value}%` }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
