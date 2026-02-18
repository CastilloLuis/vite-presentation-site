import React, { useRef, useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import Ground from './Ground'
import Vehicle from './Vehicle'
import FollowCamera from './FollowCamera'
import Buildings from './Buildings'
import Decorations from './Decorations'
import InteractionZone3D from './InteractionZone3D'
import { ZONES_3D } from '../../data/worldData3D'

export default function World3D({ keysRef, frozen, activeZoneId, onPositionUpdate }) {
  const vehicleRef = useRef()

  return (
    <div className="game-viewport-3d">
      <Canvas
        shadows
        camera={{ fov: 55, near: 0.1, far: 200, position: [0, 12, -24] }}
        gl={{ antialias: true }}
      >
        {/* Sky/background */}
        <color attach="background" args={['#1a1a2e']} />
        <fog attach="fog" args={['#1a1a2e', 40, 90]} />

        {/* Lighting */}
        <ambientLight intensity={0.8} />
        <directionalLight
          position={[20, 30, 10]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={80}
          shadow-camera-left={-40}
          shadow-camera-right={40}
          shadow-camera-top={40}
          shadow-camera-bottom={-40}
        />
        {/* Fill light from opposite side */}
        <directionalLight position={[-15, 20, -10]} intensity={0.5} />
        {/* Hemisphere light — sky/ground color fill */}
        <hemisphereLight args={['#4a4a8e', '#2a5a2c', 0.6]} />

        <Physics gravity={[0, -20, 0]}>
          <Ground />
          <Buildings />
          <Decorations />
          <Vehicle
            ref={vehicleRef}
            keysRef={keysRef}
            frozen={frozen}
            onPositionUpdate={onPositionUpdate}
          />
        </Physics>

        <FollowCamera vehicleRef={vehicleRef} />

        {/* Interaction zone prompts */}
        {ZONES_3D.map((zone) => (
          <InteractionZone3D
            key={zone.id}
            zone={zone}
            isNear={activeZoneId === zone.id}
          />
        ))}
      </Canvas>
    </div>
  )
}
