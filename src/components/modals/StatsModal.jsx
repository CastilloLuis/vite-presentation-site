import React from 'react'
import { motion } from 'framer-motion'
import { stats, allQuests, inventoryItems } from '../../data/gameData'

export default function StatsModal() {
  const questsDone = allQuests.filter((q) => q.status === 'completed').length

  return (
    <div className="modal-stats">
      <div className="modal-stats-main">
        <h4>Attributes</h4>
        <div className="modal-stats-attributes">
          {stats.map((s, i) => (
            <motion.div
              key={s.abbr}
              className="stat-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
            >
              <div className="stat-card-abbr">{s.abbr}</div>
              <div className="stat-card-value">{s.value}</div>
              <div className="stat-card-label">{s.label}</div>
              <div className="stat-card-desc">{s.description}</div>
            </motion.div>
          ))}
        </div>
      </div>

      
    </div>
  )
}
