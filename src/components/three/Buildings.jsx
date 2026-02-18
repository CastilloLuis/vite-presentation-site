import React from 'react'
import { RigidBody } from '@react-three/rapier'
import { Float, Text, Billboard } from '@react-three/drei'
import { ZONES_3D } from '../../data/worldData3D'

function GroundLabel({ position, children, color = '#ffffff' }) {
  return (
    <group position={position}>
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
      {/* Circular stone platform */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[7, 7.5, 0.6, 24]} />
          <meshStandardMaterial color="#6a6a6a" roughness={0.7} />
        </mesh>
      </RigidBody>

      {/* Inner ring */}
      <mesh position={[0, 0.35, 0]}>
        <torusGeometry args={[5.5, 0.15, 8, 24]} />
        <meshStandardMaterial color="#8a8a8a" roughness={0.5} />
      </mesh>

      {/* Corner pillars — cylindrical */}
      {[
        [-4.5, 0, -4.5], [4.5, 0, -4.5], [-4.5, 0, 4.5], [4.5, 0, 4.5],
      ].map((pos, i) => (
        <RigidBody key={i} type="fixed" colliders="cuboid">
          <group position={[pos[0], 0, pos[2]]}>
            <mesh position={[0, 2, 0]} castShadow>
              <cylinderGeometry args={[0.4, 0.5, 4, 12]} />
              <meshStandardMaterial color="#8a8a8a" roughness={0.5} />
            </mesh>
            {/* Pillar cap */}
            <mesh position={[0, 4.1, 0]} castShadow>
              <sphereGeometry args={[0.55, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
              <meshStandardMaterial color="#9a9a9a" roughness={0.4} />
            </mesh>
          </group>
        </RigidBody>
      ))}

      {/* Floating fountain orb */}
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh position={[0, 3.5, 0]}>
          <sphereGeometry args={[0.9, 16, 16]} />
          <meshStandardMaterial
            color="#a0d0ff"
            emissive="#6090c0"
            emissiveIntensity={0.6}
            roughness={0.15}
            metalness={0.2}
          />
        </mesh>
        {/* Orbiting ring */}
        <mesh position={[0, 3.5, 0]} rotation={[0.3, 0, 0.2]}>
          <torusGeometry args={[1.3, 0.06, 8, 32]} />
          <meshStandardMaterial color="#80b8e8" emissive="#4080b0" emissiveIntensity={0.4} roughness={0.2} />
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

      <GroundLabel position={[0, 0.6, -8]} color="#ffffff">TOWN CENTER</GroundLabel>
    </group>
  )
}

function SkillsWorkshop({ zone }) {
  const [x, , z] = zone.position
  return (
    <group position={[x, 0, z]}>
      {/* Main building — rounded cylinder base */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[5, 5.5, 5, 8]} />
          <meshStandardMaterial color="#8B6914" roughness={0.6} />
        </mesh>
      </RigidBody>

      {/* Wooden ring accents */}
      <mesh position={[0, 1, 0]}>
        <torusGeometry args={[5.3, 0.12, 8, 8]} />
        <meshStandardMaterial color="#6B4F10" roughness={0.7} />
      </mesh>
      <mesh position={[0, 3.5, 0]}>
        <torusGeometry args={[5.1, 0.12, 8, 8]} />
        <meshStandardMaterial color="#6B4F10" roughness={0.7} />
      </mesh>

      {/* Conical roof — smoother */}
      <mesh position={[0, 5.8, 0]} castShadow>
        <coneGeometry args={[6, 2.5, 12]} />
        <meshStandardMaterial color="#5a4210" roughness={0.7} />
      </mesh>

      {/* Roof tip ornament */}
      <mesh position={[0, 7.2, 0]}>
        <sphereGeometry args={[0.3, 12, 12]} />
        <meshStandardMaterial color="#FBBF24" emissive="#FBBF24" emissiveIntensity={0.5} roughness={0.2} />
      </mesh>

      {/* Anvil — smoother */}
      <mesh position={[0, 5.3, 5.5]} castShadow>
        <capsuleGeometry args={[0.25, 0.7, 4, 8]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.4} metalness={0.5} />
      </mesh>

      {/* Spark lights */}
      <pointLight position={[0, 6, 5.5]} color="#FBBF24" intensity={0.8} distance={6} />
      <pointLight position={[0, 3, 5.5]} color="#F0B429" intensity={0.5} distance={10} />

      {/* Label */}
      <Billboard position={[0, 8.5, 0]}>
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

      <GroundLabel position={[0, 0, 7]} color="#F0B429">SKILLS WORKSHOP</GroundLabel>
    </group>
  )
}

function StatsTower({ zone }) {
  const [x, , z] = zone.position
  return (
    <group position={[x, 0, z]}>
      {/* Tower — cylindrical for smooth look */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 5, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[3.8, 4.2, 10, 12]} />
          <meshStandardMaterial color="#3d2a6e" roughness={0.5} />
        </mesh>
      </RigidBody>

      {/* Ring accents around tower */}
      {[2, 5, 8].map((y, i) => (
        <mesh key={`ring-${i}`} position={[0, y, 0]}>
          <torusGeometry args={[4 + (10 - y) * 0.02, 0.1, 8, 16]} />
          <meshStandardMaterial color="#5a3e96" roughness={0.4} metalness={0.2} />
        </mesh>
      ))}

      {/* Tower top — dome */}
      <mesh position={[0, 10.2, 0]} castShadow>
        <sphereGeometry args={[4.2, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#5a3e96" roughness={0.4} />
      </mesh>

      {/* Floating crystal — smoother octahedron */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={0.8}>
        <mesh position={[0, 13, 0]} rotation={[0, 0, Math.PI / 6]}>
          <octahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#C4B5FD"
            emissive="#7C3AED"
            emissiveIntensity={1}
            roughness={0.15}
            metalness={0.3}
          />
        </mesh>
        {/* Crystal orbiting ring */}
        <mesh position={[0, 13, 0]} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[1.6, 0.04, 8, 32]} />
          <meshStandardMaterial color="#A78BFA" emissive="#7C3AED" emissiveIntensity={0.6} roughness={0.2} />
        </mesh>
      </Float>

      {/* Crystal glow */}
      <pointLight position={[0, 13, 0]} color="#A78BFA" intensity={2} distance={22} />
      {/* Wall accent lights */}
      <pointLight position={[0, 5, 5]} color="#7C3AED" intensity={0.8} distance={12} />
      <pointLight position={[0, 5, -5]} color="#7C3AED" intensity={0.8} distance={12} />

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

      <GroundLabel position={[0, 0, 6]} color="#A78BFA">STATS TOWER</GroundLabel>
    </group>
  )
}

function ContactHub({ zone }) {
  const [x, , z] = zone.position
  return (
    <group position={[x, 0, z]}>
      {/* Rounded base building */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[5, 5.5, 5, 16]} />
          <meshStandardMaterial color="#1a3a5e" roughness={0.5} />
        </mesh>
      </RigidBody>

      {/* Building ring accent */}
      <mesh position={[0, 2.5, 0]}>
        <torusGeometry args={[5.2, 0.1, 8, 16]} />
        <meshStandardMaterial color="#2a5a8e" roughness={0.4} />
      </mesh>

      {/* Dome roof — full hemisphere */}
      <mesh position={[0, 5, 0]} castShadow>
        <sphereGeometry args={[5.2, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#1a4a6e" roughness={0.45} />
      </mesh>

      {/* Antenna — smooth cylinder */}
      <mesh position={[0, 8, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 4, 12]} />
        <meshStandardMaterial color="#60A5FA" roughness={0.3} metalness={0.3} />
      </mesh>

      {/* Antenna tip — glowing sphere */}
      <Float speed={3} floatIntensity={0.2}>
        <mesh position={[0, 10.2, 0]}>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshStandardMaterial
            color="#60A5FA"
            emissive="#3B82F6"
            emissiveIntensity={1.2}
            roughness={0.1}
            metalness={0.2}
          />
        </mesh>
      </Float>

      {/* Signal rings around antenna */}
      {[0, 1, 2].map((i) => (
        <Float key={`signal-${i}`} speed={2} floatIntensity={0.1 + i * 0.05}>
          <mesh position={[0, 9 + i * 0.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.6 + i * 0.4, 0.02, 8, 24]} />
            <meshStandardMaterial
              color="#60A5FA"
              emissive="#3B82F6"
              emissiveIntensity={0.5 - i * 0.1}
              transparent
              opacity={0.6 - i * 0.15}
              roughness={0.2}
            />
          </mesh>
        </Float>
      ))}

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
