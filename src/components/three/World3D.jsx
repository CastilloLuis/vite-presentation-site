import React, { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import Ground from './Ground'
import Vehicle from './Vehicle'
import FollowCamera from './FollowCamera'
import Buildings from './Buildings'
import Decorations from './Decorations'
import InteractionZone3D from './InteractionZone3D'
import { ZONES_3D } from '../../data/worldData3D'

export default function World3D({ keysRef, frozen, activeZoneId, onPositionUpdate, vehicleType }) {
  const vehicleRef = useRef()

  return (
    <div className="game-viewport-3d">
      <Canvas
        shadows
        camera={{ fov: 50, near: 0.1, far: 200, position: [0, 8, -18] }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        {/* Sky/background */}
        <color attach="background" args={['#1a1a2e']} />
        <fog attach="fog" args={['#1a1a2e', 50, 100]} />

        {/* Lighting — optimized: fewer lights, better quality */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[20, 30, 10]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={80}
          shadow-camera-left={-40}
          shadow-camera-right={40}
          shadow-camera-top={40}
          shadow-camera-bottom={-40}
          shadow-bias={-0.0005}
        />
        {/* Fill light from opposite side */}
        <directionalLight position={[-15, 20, -10]} intensity={0.4} />
        {/* Hemisphere — sky/ground fill */}
        <hemisphereLight args={['#6a6aae', '#3a7a3c', 0.5]} />

        <Physics gravity={[0, -20, 0]}>
          <Ground />
          <Buildings />
          <Decorations />
          <Vehicle
            ref={vehicleRef}
            keysRef={keysRef}
            frozen={frozen}
            onPositionUpdate={onPositionUpdate}
            vehicleType={vehicleType}
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
