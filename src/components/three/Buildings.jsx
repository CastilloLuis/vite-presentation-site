import React from 'react'
import { RigidBody } from '@react-three/rapier'
import { Float, Text, Billboard } from '@react-three/drei'
import { ZONES_3D } from '../../data/worldData3D'

function GroundLabel({ position, children, color = '#ffffff' }) {
  return (
    <group position={position}>
      {/* Flat text on the ground, slightly above to avoid z-fighting */}
      <Text
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.05, 0]}
        fontSize={1.8}
        color={color}
        anchorX="center"
        anchorY="middle"
        font="/fonts/VT323-Regular.ttf"
        outlineWidth={0.06}
        outlineColor="#000000"
      >
        {children}
      </Text>
    </group>
  )
}

function TownCenter({ zone }) {
  const [x, , z] = zone.position
  return (
    <group position={[x, 0, z]}>
      {/* Stone platform */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
          <boxGeometry args={[12, 0.5, 12]} />
          <meshStandardMaterial color="#5e5e5e" flatShading />
        </mesh>
      </RigidBody>

      {/* Corner pillars */}
      {[
        [-5, 0, -5], [5, 0, -5], [-5, 0, 5], [5, 0, 5],
      ].map((pos, i) => (
        <RigidBody key={i} type="fixed" colliders="cuboid">
          <mesh position={[pos[0], 2, pos[2]]} castShadow>
            <boxGeometry args={[1, 4, 1]} />
            <meshStandardMaterial color="#7a7a7a" flatShading />
          </mesh>
        </RigidBody>
      ))}

      {/* Floating fountain orb */}
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh position={[0, 3, 0]}>
          <sphereGeometry args={[0.8, 8, 8]} />
          <meshStandardMaterial
            color="#a0d0ff"
            emissive="#6090c0"
            emissiveIntensity={0.6}
            flatShading
          />
        </mesh>
      </Float>
      <pointLight position={[0, 3.5, 0]} color="#a0d0ff" intensity={1} distance={15} />

      {/* Label */}
      <Billboard position={[0, 5.5, 0]}>
        <Text
          fontSize={1}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/VT323-Regular.ttf"
          outlineWidth={0.05}
          outlineColor="#000000"
        >
          TOWN CENTER
        </Text>
      </Billboard>

      {/* Ground label */}
      <GroundLabel position={[0, 0.5, -8]} color="#ffffff">TOWN CENTER</GroundLabel>
    </group>
  )
}

function SkillsWorkshop({ zone }) {
  const [x, , z] = zone.position
  return (
    <group position={[x, 0, z]}>
      {/* Wooden building */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[10, 5, 10]} />
          <meshStandardMaterial color="#7a5c12" flatShading />
        </mesh>
      </RigidBody>

      {/* Roof */}
      <mesh position={[0, 5.5, 0]} castShadow>
        <coneGeometry args={[7.5, 2.5, 4]} />
        <meshStandardMaterial color="#5a4210" flatShading />
      </mesh>

      {/* Anvil */}
      <mesh position={[0, 5.2, 5.5]} castShadow>
        <boxGeometry args={[1.2, 0.6, 0.8]} />
        <meshStandardMaterial color="#4a4a4a" flatShading />
      </mesh>

      {/* Spark lights */}
      <pointLight position={[0, 6, 5.5]} color="#FBBF24" intensity={0.8} distance={6} />
      <pointLight position={[-3, 3, 0]} color="#F0B429" intensity={0.5} distance={10} />

      {/* Label */}
      <Billboard position={[0, 7.5, 0]}>
        <Text
          fontSize={0.9}
          color="#F0B429"
          anchorX="center"
          anchorY="middle"
          font="/fonts/VT323-Regular.ttf"
          outlineWidth={0.05}
          outlineColor="#000000"
        >
          SKILLS WORKSHOP
        </Text>
      </Billboard>

      {/* Ground label */}
      <GroundLabel position={[0, 0, 7]} color="#F0B429">SKILLS WORKSHOP</GroundLabel>
    </group>
  )
}

function StatsTower({ zone }) {
  const [x, , z] = zone.position
  return (
    <group position={[x, 0, z]}>
      {/* Tall tower — brighter purple so it's visible */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 5, 0]} castShadow receiveShadow>
          <boxGeometry args={[8, 10, 8]} />
          <meshStandardMaterial color="#3d2a6e" flatShading />
        </mesh>
      </RigidBody>

      {/* Tower top accent */}
      <mesh position={[0, 10.5, 0]} castShadow>
        <boxGeometry args={[9, 1, 9]} />
        <meshStandardMaterial color="#5a3e96" flatShading />
      </mesh>

      {/* Floating crystal */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={0.8}>
        <mesh position={[0, 13, 0]} rotation={[0, 0, Math.PI / 6]}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#C4B5FD"
            emissive="#7C3AED"
            emissiveIntensity={1}
            flatShading
          />
        </mesh>
      </Float>
      {/* Crystal glow */}
      <pointLight position={[0, 13, 0]} color="#A78BFA" intensity={2} distance={22} />
      {/* Wall accent lights on all sides */}
      <pointLight position={[0, 5, 5]} color="#7C3AED" intensity={1} distance={12} />
      <pointLight position={[0, 5, -5]} color="#7C3AED" intensity={1} distance={12} />
      <pointLight position={[5, 5, 0]} color="#A78BFA" intensity={0.8} distance={10} />
      <pointLight position={[-5, 5, 0]} color="#A78BFA" intensity={0.8} distance={10} />

      {/* Label */}
      <Billboard position={[0, 15, 0]}>
        <Text
          fontSize={0.9}
          color="#A78BFA"
          anchorX="center"
          anchorY="middle"
          font="/fonts/VT323-Regular.ttf"
          outlineWidth={0.05}
          outlineColor="#000000"
        >
          STATS TOWER
        </Text>
      </Billboard>

      {/* Ground label */}
      <GroundLabel position={[0, 0, 6]} color="#A78BFA">STATS TOWER</GroundLabel>
    </group>
  )
}

function ContactHub({ zone }) {
  const [x, , z] = zone.position
  return (
    <group position={[x, 0, z]}>
      {/* Blue building */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[10, 5, 10]} />
          <meshStandardMaterial color="#1a3a5e" flatShading />
        </mesh>
      </RigidBody>

      {/* Dome roof */}
      <mesh position={[0, 5.5, 0]} castShadow>
        <sphereGeometry args={[5.5, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#1a4a6e" flatShading />
      </mesh>

      {/* Antenna */}
      <mesh position={[0, 8, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 4, 6]} />
        <meshStandardMaterial color="#60A5FA" flatShading />
      </mesh>
      {/* Antenna tip */}
      <mesh position={[0, 10.2, 0]}>
        <sphereGeometry args={[0.3, 6, 6]} />
        <meshStandardMaterial
          color="#60A5FA"
          emissive="#3B82F6"
          emissiveIntensity={1}
          flatShading
        />
      </mesh>
      <pointLight position={[0, 10.2, 0]} color="#3B82F6" intensity={1} distance={12} />
      <pointLight position={[0, 3, 6]} color="#60A5FA" intensity={0.4} distance={8} />

      {/* Label */}
      <Billboard position={[0, 12, 0]}>
        <Text
          fontSize={0.9}
          color="#60A5FA"
          anchorX="center"
          anchorY="middle"
          font="/fonts/VT323-Regular.ttf"
          outlineWidth={0.05}
          outlineColor="#000000"
        >
          CONTACT HUB
        </Text>
      </Billboard>

      {/* Ground label */}
      <GroundLabel position={[0, 0, 7]} color="#60A5FA">CONTACT HUB</GroundLabel>
    </group>
  )
}

const BUILDING_MAP = {
  about: TownCenter,
  skills: SkillsWorkshop,
  stats: StatsTower,
  contact: ContactHub,
}

export default function Buildings() {
  return (
    <group>
      {ZONES_3D.map((zone) => {
        const BuildingComponent = BUILDING_MAP[zone.id]
        return BuildingComponent ? <BuildingComponent key={zone.id} zone={zone} /> : null
      })}
    </group>
  )
}
