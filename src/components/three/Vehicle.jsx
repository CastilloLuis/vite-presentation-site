import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody, CuboidCollider } from '@react-three/rapier'
import useVehicleControls from '../../hooks/useVehicleControls'

const Vehicle = forwardRef(function Vehicle({ keysRef, frozen, onPositionUpdate }, ref) {
  const bodyRef = useRef()
  useVehicleControls(bodyRef, keysRef, frozen)

  useImperativeHandle(ref, () => ({
    getBody: () => bodyRef.current,
  }))

  // Report position each frame
  useFrame(() => {
    const body = bodyRef.current
    if (!body) return
    const pos = body.translation()
    const rot = body.rotation()
    onPositionUpdate?.({ x: pos.x, y: pos.y, z: pos.z }, rot)
  })

  return (
    <RigidBody
      ref={bodyRef}
      type="dynamic"
      position={[0, 3, -15]}
      mass={1}
      linearDamping={0.5}
      angularDamping={2}
      enabledRotations={[false, true, false]}
      colliders={false}
    >
      {/* Explicit collider sized to car body */}
      <CuboidCollider args={[1, 0.6, 1.7]} position={[0, 0.55, 0]} />
      <group>
        {/* Car body */}
        <mesh position={[0, 0.35, 0]} castShadow>
          <boxGeometry args={[2, 0.7, 3.4]} />
          <meshStandardMaterial color="#4A90D9" flatShading />
        </mesh>

        {/* Cabin */}
        <mesh position={[0, 0.85, -0.2]} castShadow>
          <boxGeometry args={[1.6, 0.6, 1.8]} />
          <meshStandardMaterial color="#3a7ac0" flatShading />
        </mesh>

        {/* Windshield (front) */}
        <mesh position={[0, 0.85, 0.7]}>
          <boxGeometry args={[1.4, 0.5, 0.05]} />
          <meshStandardMaterial color="#a8d8ff" transparent opacity={0.6} flatShading />
        </mesh>

        {/* Rear window */}
        <mesh position={[0, 0.85, -1.1]}>
          <boxGeometry args={[1.4, 0.5, 0.05]} />
          <meshStandardMaterial color="#a8d8ff" transparent opacity={0.6} flatShading />
        </mesh>

        {/* Wheels */}
        {[
          [0.95, 0.1, 1.0],
          [-0.95, 0.1, 1.0],
          [0.95, 0.1, -1.0],
          [-0.95, 0.1, -1.0],
        ].map((pos, i) => (
          <mesh key={i} position={pos} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.3, 0.3, 0.2, 8]} />
            <meshStandardMaterial color="#2C3E50" flatShading />
          </mesh>
        ))}

        {/* Headlights */}
        {[
          [0.6, 0.35, 1.71],
          [-0.6, 0.35, 1.71],
        ].map((pos, i) => (
          <group key={`hl-${i}`}>
            <mesh position={pos}>
              <boxGeometry args={[0.3, 0.2, 0.05]} />
              <meshStandardMaterial color="#ffffcc" emissive="#ffffcc" emissiveIntensity={2} flatShading />
            </mesh>
            <pointLight position={[pos[0], pos[1], pos[2] + 1]} color="#ffffcc" intensity={0.5} distance={8} />
          </group>
        ))}

        {/* Taillights */}
        {[
          [0.6, 0.35, -1.71],
          [-0.6, 0.35, -1.71],
        ].map((pos, i) => (
          <mesh key={`tl-${i}`} position={pos}>
            <boxGeometry args={[0.3, 0.2, 0.05]} />
            <meshStandardMaterial color="#ff3333" emissive="#ff3333" emissiveIntensity={1} flatShading />
          </mesh>
        ))}
      </group>
    </RigidBody>
  )
})

export default Vehicle
