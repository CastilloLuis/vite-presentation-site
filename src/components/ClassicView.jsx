import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  inventoryItems,
  skillCategories,
  allQuests,
  socialLinks,
  stats,
} from '../data/gameData'

const TABS = ['About', 'Skills', 'Stats']

function SkillIcon({ item }) {
  const src = item.url || `https://cdn.simpleicons.org/${item.slug}`
  return <img src={src} alt={item.name} className="cv-icon" loading="lazy" draggable={false} />
}

function InventorySlot({ item }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="cv-inv-slot"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <SkillIcon item={item} />
      {hovered && (
        <div className="cv-inv-tooltip">
          <span className="cv-inv-tooltip-name">{item.name}</span>
          <span className="cv-inv-tooltip-level">{item.powerLevel}</span>
          {item.flavor && <span className="cv-inv-tooltip-flavor">{item.flavor}</span>}
        </div>
      )}
    </div>
  )
}

// ---- About Tab ----
function AboutTab({ onViewSkills }) {
  return (
    <motion.div className="cv-about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="cv-about-hero">
        <div className="cv-portrait">
          <img src="/pfp.png" alt="Luis Castillo" draggable={false} />
        </div>
        <div className="cv-about-info">
          <h2 className="cv-name">Luis Castillo</h2>
          <p className="cv-title">Senior Software Engineer / Frontend Architect</p>
          <div className="cv-badges">
            <span className="badge badge--level">Lv. 99</span>
            <span className="badge badge--class">Tech Lead</span>
            <span className="badge badge--years">8+ Years</span>
          </div>
        </div>
      </div>

      <p className="cv-bio">
          Dedicated Senior Software Engineer with 8+ years specializing in product development,
          design systems, and architecture. I build scalable applications with React, TypeScript,
          and modern web technologies. AI? AI is my copilot. I'm the driver.
      </p>

      <div className="cv-inventory">
        <div className="cv-section-header">
          <h3 className="cv-section-title">Toolings</h3>
          <button className="cv-view-all" onClick={onViewSkills}>View All</button>
        </div>
        <div className="cv-inventory-grid">
          {inventoryItems.map((item) => (
            <InventorySlot key={item.name} item={item} />
          ))}
        </div>
      </div>

      <div className="cv-stats-quick">
        <h3 className="cv-section-title">Attributes</h3>
        <div className="cv-stats-bars">
          {stats.map((s) => (
            <div key={s.abbr} className="cv-stat-row">
              <span className="cv-stat-label">{s.label}</span>
              <div className="cv-stat-track">
                <motion.div
                  className="cv-stat-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${s.value}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              </div>
              <span className="cv-stat-val">{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="cv-socials">
        <h3 className="cv-section-title">Links</h3>
        <div className="cv-social-row">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="cv-social-link"
            >
              <img
                src={`https://cdn.simpleicons.org/${link.slug}/white`}
                alt={link.name}
                className="cv-icon"
                draggable={false}
              />
              <span>{link.name}</span>
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ---- Skills Tab ----
function SkillsTab() {
  return (
    <motion.div className="cv-skills" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="cv-skills-grid">
        {skillCategories.map((cat, ci) => (
          <div key={cat.key} className="cv-skill-category">
            <h3 className="cv-skill-cat-title" style={{ color: cat.color }}>{cat.label}</h3>
            <div className="cv-skill-list">
              {cat.skills.map((skill, si) => (
                <motion.div
                  key={skill.name}
                  className="cv-skill-item"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: ci * 0.08 + si * 0.02 }}
                >
                  <SkillIcon item={skill} />
                  <span>{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

// ---- Experience Tab ----
function ExperienceTab() {
  return (
    <motion.div className="cv-experience" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {allQuests.map((q, i) => (
        <motion.div
          key={q.name}
          className="cv-quest-card"
          style={{ borderLeftColor: q.color }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
        >
          <div className="cv-quest-header">
            <h3 className="cv-quest-name">{q.name}</h3>
            <span className="cv-quest-period">{q.period}</span>
          </div>
          <p className="cv-quest-role">{q.role}</p>
          <p className="cv-quest-desc">{q.description}</p>
          <div className="cv-quest-progress">
            <div className="cv-quest-track">
              <motion.div
                className="cv-quest-fill"
                style={{ background: q.color }}
                initial={{ width: 0 }}
                animate={{ width: `${q.progress}%` }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              />
            </div>
            <span className="cv-quest-pct">{q.progress}%</span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

// ---- Stats Tab ----
function StatsTab() {
  const questsDone = allQuests.filter((q) => q.status === 'completed').length
  return (
    <motion.div className="cv-stats-tab" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="cv-stats-cards">
        {stats.map((s, i) => (
          <motion.div
            key={s.abbr}
            className="cv-stat-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <span className="cv-stat-card-abbr">{s.abbr}</span>
            <span className="cv-stat-card-value">{s.value}</span>
            <span className="cv-stat-card-label">{s.label}</span>
            <span className="cv-stat-card-desc">{s.description}</span>
          </motion.div>
        ))}
      </div>

      <div className="cv-summary-row">
        <div className="cv-summary-item"><span className="cv-summary-val">{stats.reduce((a, s) => a + s.value, 0)}</span><span>Total XP</span></div>
        <div className="cv-summary-item"><span className="cv-summary-val">{questsDone}</span><span>Quests Done</span></div>
        <div className="cv-summary-item"><span className="cv-summary-val">{inventoryItems.length}</span><span>Tech Mastered</span></div>
        <div className="cv-summary-item"><span className="cv-summary-val">8+</span><span>Years Active</span></div>
      </div>

      <div className="cv-traits">
        <h3 className="cv-section-title">Class Traits</h3>
        <ul className="cv-traits-list">
          <li>Design System Architecture</li>
          <li>Frontend Performance Optimization</li>
          <li>Cross-Platform Development</li>
          <li>Team Leadership & Mentoring</li>
          <li>Web3 & DeFi Integration</li>
        </ul>
      </div>
    </motion.div>
  )
}

// ---- Main Classic View ----
export default function ClassicView({ onSwitchMode }) {
  const [activeTab, setActiveTab] = useState('About')

  return (
    <div className="classic-view">
      <div className="cv-container">
        {/* Header */}
        <div className="cv-header">
          <div className="cv-tabs">
            {TABS.map((tab) => (
              <button
                key={tab}
                className={`cv-tab ${activeTab === tab ? 'cv-tab--active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="cv-mode-toggle" onClick={onSwitchMode}>
            EXPLORE THE WORLD
          </button>
        </div>

        {/* Content */}
        <div className="cv-panel">
          <AnimatePresence mode="wait">
            {activeTab === 'About' && <AboutTab key="about" onViewSkills={() => setActiveTab('Skills')} />}
            {activeTab === 'Skills' && <SkillsTab key="skills" />}
            {activeTab === 'Stats' && <StatsTab key="stats" />}
          </AnimatePresence>
        </div>

        <div className="cv-footer">
          Hover items for details · Click tabs to switch views
        </div>
      </div>
    </div>
  )
}
