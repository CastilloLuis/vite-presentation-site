import React from 'react'
import { Html } from '@react-three/drei'

export default function InteractionZone3D({ zone, isNear }) {
  if (!isNear) return null

  const [x, , z] = zone.position
  // Float the prompt above the building
  const promptY = zone.id === 'stats' ? 17 : zone.id === 'about' ? 7 : 9

  return (
    <group position={[x, promptY, z]}>
      <Html center distanceFactor={20} className="interaction-prompt-3d-wrapper">
        <div className="interaction-prompt-3d">
          <span className="prompt-key">E</span>
          <span className="prompt-text">{zone.promptText}</span>
        </div>
      </Html>
    </group>
  )
}
