import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GameWorld from './components/GameWorld'
import ClassicView from './components/ClassicView'
import './style.css'

function LoadingScreen({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 1800)
    return () => clearTimeout(timer)
  }, [onDone])

  return (
    <motion.div
      className="loading-screen"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="loading-content">
        <div className="loading-portrait">
          <img src="/pfp.png" alt="Luis Castillo" draggable={false} />
        </div>
        <h1 className="loading-title">Luis Castillo</h1>
        <p className="loading-subtitle">Senior Software Engineer</p>
        <div className="loading-bar">
          <motion.div
            className="loading-bar-fill"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
        </div>
        <p className="loading-hint">Preparing 3D world...</p>
      </div>
    </motion.div>
  )
}

function App() {
  const [loaded, setLoaded] = useState(false)
  const [viewMode, setViewMode] = useState('game')

  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  useEffect(() => {
    const action = viewMode === 'classic' ? 'add' : 'remove'
    document.documentElement.classList[action]('classic-mode')
    document.body.classList[action]('classic-mode')
  }, [viewMode])

  return (
    <AnimatePresence mode="wait">
      {!loaded ? (
        <LoadingScreen key="loading" onDone={() => setLoaded(true)} />
      ) : viewMode === 'game' ? (
        <motion.div
          key="game"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{ width: '100%', height: '100%' }}
        >
          <GameWorld onSwitchMode={() => setViewMode('classic')} />
        </motion.div>
      ) : (
        <motion.div
          key="classic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{ width: '100%', minHeight: '100%' }}
        >
          <ClassicView onSwitchMode={() => setViewMode('game')} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default App
