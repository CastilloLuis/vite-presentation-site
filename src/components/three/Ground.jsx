import React from 'react'
import { RigidBody } from '@react-three/rapier'
import { PATHS, WORLD_SIZE } from '../../data/worldData3D'

const WALL_HEIGHT = 4
const WALL_THICKNESS = 2

function BoundaryWalls() {
  const half = WORLD_SIZE / 2
  const walls = [
    { pos: [0, WALL_HEIGHT / 2, -half - WALL_THICKNESS / 2], size: [WORLD_SIZE + WALL_THICKNESS * 2, WALL_HEIGHT, WALL_THICKNESS] },
    { pos: [0, WALL_HEIGHT / 2, half + WALL_THICKNESS / 2], size: [WORLD_SIZE + WALL_THICKNESS * 2, WALL_HEIGHT, WALL_THICKNESS] },
    { pos: [-half - WALL_THICKNESS / 2, WALL_HEIGHT / 2, 0], size: [WALL_THICKNESS, WALL_HEIGHT, WORLD_SIZE + WALL_THICKNESS * 2] },
    { pos: [half + WALL_THICKNESS / 2, WALL_HEIGHT / 2, 0], size: [WALL_THICKNESS, WALL_HEIGHT, WORLD_SIZE + WALL_THICKNESS * 2] },
  ]

  return walls.map((w, i) => (
    <RigidBody key={i} type="fixed" position={w.pos}>
      <mesh visible={false}>
        <boxGeometry args={w.size} />
        <meshStandardMaterial transparent opacity={0} />
      </mesh>
    </RigidBody>
  ))
}

function PathStrips() {
  return PATHS.map((p, i) => (
    <group key={i}>
      {/* Main path surface */}
      <mesh position={p.position} receiveShadow>
        <boxGeometry args={p.size} />
        <meshStandardMaterial color="#9B8B6B" roughness={0.7} />
      </mesh>
      {/* Path border — darker edges */}
      <mesh position={[p.position[0], p.position[1] - 0.01, p.position[2]]} receiveShadow>
        <boxGeometry args={[p.size[0] + 0.3, p.size[1], p.size[2] + 0.3]} />
        <meshStandardMaterial color="#7B6B4B" roughness={0.8} />
      </mesh>
    </group>
  ))
}

export default function Ground() {
  return (
    <group>
      {/* Main ground */}
      <RigidBody type="fixed" friction={1}>
        <mesh position={[0, -0.25, 0]} receiveShadow>
          <boxGeometry args={[WORLD_SIZE, 0.5, WORLD_SIZE]} />
          <meshStandardMaterial color="#3a7a2c" roughness={0.8} />
        </mesh>
      </RigidBody>

      {/* Path strips */}
      <PathStrips />

      {/* World boundary walls */}
      <BoundaryWalls />
    </group>
  )
}
