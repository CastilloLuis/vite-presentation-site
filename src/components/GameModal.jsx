import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AboutModal from './modals/AboutModal'
import SkillsModal from './modals/SkillsModal'
import StatsModal from './modals/StatsModal'
import ContactModal from './modals/ContactModal'

const MODAL_MAP = {
  about: { component: AboutModal, title: 'Town Center — Profile' },
  skills: { component: SkillsModal, title: 'Skills Workshop' },
  stats: { component: StatsModal, title: 'Stats Tower — Attributes' },
  contact: { component: ContactModal, title: 'Contact Hub' },
}

export default function GameModal({ type, onClose }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const modal = MODAL_MAP[type]
  if (!modal) return null

  const Content = modal.component

  return (
    <AnimatePresence>
      <motion.div
        className="game-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      >
        <motion.div
          className="game-modal"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="game-modal-header">
            <h2 className="game-modal-title">{modal.title}</h2>
            <button className="game-modal-close" onClick={onClose}>
              ESC
            </button>
          </div>
          <div className="game-modal-body">
            <Content />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
