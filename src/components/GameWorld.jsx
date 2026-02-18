import React, { useState, useCallback, useRef, useEffect } from 'react'
import useKeyboard from '../hooks/useKeyboard'
import useGameAudio from '../hooks/useGameAudio'
import { ZONES_3D } from '../data/worldData3D'
import World3D from './three/World3D'
import GameModal from './GameModal'
import GameHUD from './GameHUD'
import MobileControls from './MobileControls'

function getActiveZone(px, pz) {
  for (const zone of ZONES_3D) {
    const [zx, , zz] = zone.position
    const dx = px - zx
    const dz = pz - zz
    const dist = Math.sqrt(dx * dx + dz * dz)
    if (dist < zone.proximity) {
      return zone
    }
  }
  return null
}

export default function GameWorld({ onSwitchMode }) {
  const keys = useKeyboard()
  const { updateEngine, playInteract } = useGameAudio()
  const [activeZone, setActiveZone] = useState(null)
  const [modalType, setModalType] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 3, z: -15 })
  const prevPosRef = useRef({ x: 0, z: -15 })

  // Detect mobile
  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Position update from Vehicle — also drives engine audio
  const handlePositionUpdate = useCallback((pos) => {
    setPlayerPos(pos)
    const zone = getActiveZone(pos.x, pos.z)
    setActiveZone(zone)

    // Compute speed from position delta
    const dx = pos.x - prevPosRef.current.x
    const dz = pos.z - prevPosRef.current.z
    const speed = Math.sqrt(dx * dx + dz * dz) * 10 // scale up for audio
    prevPosRef.current = { x: pos.x, z: pos.z }
    updateEngine(speed)
  }, [updateEngine])

  // Handle E key for interaction
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key.toLowerCase() === 'e' && activeZone && !modalType) {
        playInteract()
        setModalType(activeZone.modalType)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [activeZone, modalType])

  const closeModal = useCallback(() => setModalType(null), [])

  return (
    <div className="game-viewport">
      <World3D
        keysRef={keys}
        frozen={!!modalType}
        activeZoneId={activeZone && !modalType ? activeZone.id : null}
        onPositionUpdate={handlePositionUpdate}
      />

      <GameHUD
        playerX={playerPos.x}
        playerZ={playerPos.z}
        onSwitchMode={onSwitchMode}
      />

      {isMobile && <MobileControls keysRef={keys} />}

      {modalType && <GameModal type={modalType} onClose={closeModal} />}
    </div>
  )
}
