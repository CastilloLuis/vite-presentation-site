import React, { useMemo } from 'react'
import { Text, Billboard } from '@react-three/drei'
import { TREES, LANTERNS, PADEL_COURT } from '../../data/worldData3D'
import * as THREE from 'three'

function Tree({ position, scale = 1, hue = 0.28 }) {
  const color = useMemo(() => {
    const c = new THREE.Color()
    c.setHSL(hue, 0.55, 0.35)
    return c
  }, [hue])

  const lighterColor = useMemo(() => {
    const c = new THREE.Color()
    c.setHSL(hue, 0.45, 0.42)
    return c
  }, [hue])

  const trunkHeight = 2 * scale
  const canopyRadius = 1.8 * scale

  return (
    <group position={position}>
      {/* Trunk — smooth cylinder, slightly tapered */}
      <mesh position={[0, trunkHeight / 2, 0]} castShadow>
        <cylinderGeometry args={[0.15 * scale, 0.3 * scale, trunkHeight, 12]} />
        <meshStandardMaterial color="#6B4226" roughness={0.7} />
      </mesh>

      {/* Lower canopy — sphere (fluffy, rounded) */}
      <mesh position={[0, trunkHeight + canopyRadius * 0.6, 0]} castShadow>
        <sphereGeometry args={[canopyRadius, 16, 12]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>

      {/* Upper canopy — smaller sphere on top for a layered look */}
      <mesh position={[0, trunkHeight + canopyRadius * 1.3, 0]} castShadow>
        <sphereGeometry args={[canopyRadius * 0.6, 12, 10]} />
        <meshStandardMaterial color={lighterColor} roughness={0.6} />
      </mesh>
    </group>
  )
}

function Lantern({ position, color = '#FBBF24' }) {
  return (
    <group position={position}>
      {/* Post — smooth tapered cylinder */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.1, 2.4, 12]} />
        <meshStandardMaterial color="#6B5B3E" roughness={0.6} />
      </mesh>

      {/* Lamp housing — capsule shape */}
      <mesh position={[0, 2.5, 0]}>
        <capsuleGeometry args={[0.18, 0.15, 4, 12]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.5}
          roughness={0.2}
        />
      </mesh>

      {/* Top cap */}
      <mesh position={[0, 2.8, 0]}>
        <coneGeometry args={[0.22, 0.15, 12]} />
        <meshStandardMaterial color="#5B4B2E" roughness={0.5} />
      </mesh>

      <pointLight
        position={[0, 2.6, 0]}
        color={color}
        intensity={0.6}
        distance={8}
      />
    </group>
  )
}

function PadelCourt() {
  const { position, length, width, wallHeight, glassHeight } = PADEL_COURT
  const [cx, , cz] = position
  const halfL = length / 2
  const halfW = width / 2
  const totalWallH = wallHeight + glassHeight

  return (
    <group position={[cx, 0, cz]}>
      {/* Court surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
        <planeGeometry args={[length, width]} />
        <meshStandardMaterial color="#2563EB" roughness={0.4} />
      </mesh>

      {/* Center line */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <planeGeometry args={[0.08, width]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Service lines */}
      {[-halfL * 0.5, halfL * 0.5].map((xOff, i) => (
        <mesh key={`svc-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[xOff, 0.03, 0]}>
          <planeGeometry args={[0.06, width]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      ))}

      {/* Side boundary lines */}
      {[-halfW, halfW].map((zOff, i) => (
        <mesh key={`side-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, zOff]}>
          <planeGeometry args={[length, 0.08]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      ))}

      {/* End boundary lines */}
      {[-halfL, halfL].map((xOff, i) => (
        <mesh key={`end-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[xOff, 0.03, 0]}>
          <planeGeometry args={[0.08, width]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      ))}

      {/* Net */}
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[0.06, 0.9, width]} />
        <meshStandardMaterial color="#e0e0e0" transparent opacity={0.7} roughness={0.3} />
      </mesh>

      {/* Net posts — smooth cylinders */}
      {[-halfW - 0.15, halfW + 0.15].map((zOff, i) => (
        <group key={`post-${i}`}>
          <mesh position={[0, 0.5, zOff]}>
            <cylinderGeometry args={[0.05, 0.05, 1, 12]} />
            <meshStandardMaterial color="#888" roughness={0.3} metalness={0.5} />
          </mesh>
          {/* Post cap */}
          <mesh position={[0, 1.02, zOff]}>
            <sphereGeometry args={[0.07, 8, 8]} />
            <meshStandardMaterial color="#aaa" roughness={0.3} metalness={0.5} />
          </mesh>
        </group>
      ))}

      {/* Back walls — smooth with rounded top edge */}
      {[-halfL, halfL].map((xOff, i) => (
        <group key={`bw-${i}`} position={[xOff, 0, 0]}>
          <mesh position={[0, wallHeight / 2, 0]}>
            <boxGeometry args={[0.12, wallHeight, width + 0.3]} />
            <meshStandardMaterial color="#444" roughness={0.4} metalness={0.3} />
          </mesh>
          {/* Glass panel */}
          <mesh position={[0, wallHeight + glassHeight / 2, 0]}>
            <boxGeometry args={[0.08, glassHeight, width + 0.3]} />
            <meshStandardMaterial color="#88ccff" transparent opacity={0.2} roughness={0.1} metalness={0.4} />
          </mesh>
          {/* Top rail — rounded */}
          <mesh position={[0, totalWallH, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <capsuleGeometry args={[0.04, width + 0.2, 4, 8]} />
            <meshStandardMaterial color="#666" roughness={0.3} metalness={0.4} />
          </mesh>
        </group>
      ))}

      {/* Side walls — glass */}
      {[-halfW, halfW].map((zOff, i) => (
        <group key={`sw-${i}`} position={[0, 0, zOff]}>
          <mesh position={[0, totalWallH / 2, 0]}>
            <boxGeometry args={[length, totalWallH, 0.06]} />
            <meshStandardMaterial color="#88ccff" transparent opacity={0.15} roughness={0.1} metalness={0.4} />
          </mesh>
          {/* Top rail — rounded */}
          <mesh position={[0, totalWallH, 0]} rotation={[0, 0, Math.PI / 2]}>
            <capsuleGeometry args={[0.04, length, 4, 8]} />
            <meshStandardMaterial color="#666" roughness={0.3} metalness={0.4} />
          </mesh>
        </group>
      ))}

      {/* Corner posts — smooth cylinders with caps */}
      {[
        [-halfL, halfW], [halfL, halfW],
        [-halfL, -halfW], [halfL, -halfW],
      ].map(([xOff, zOff], i) => (
        <group key={`cp-${i}`}>
          <mesh position={[xOff, totalWallH / 2, zOff]}>
            <cylinderGeometry args={[0.06, 0.06, totalWallH, 12]} />
            <meshStandardMaterial color="#666" roughness={0.3} metalness={0.4} />
          </mesh>
          <mesh position={[xOff, totalWallH + 0.04, zOff]}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshStandardMaterial color="#888" roughness={0.3} metalness={0.4} />
          </mesh>
        </group>
      ))}

      {/* Court lights — smooth poles with spherical lamps */}
      {[
        [-halfL - 1, halfW + 1],
        [halfL + 1, halfW + 1],
        [-halfL - 1, -halfW - 1],
        [halfL + 1, -halfW - 1],
      ].map(([xOff, zOff], i) => (
        <group key={`cl-${i}`}>
          <mesh position={[xOff, 3, zOff]}>
            <cylinderGeometry args={[0.04, 0.06, 6, 12]} />
            <meshStandardMaterial color="#666" roughness={0.4} metalness={0.3} />
          </mesh>
          <mesh position={[xOff, 6.1, zOff]}>
            <sphereGeometry args={[0.2, 12, 12]} />
            <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={0.8} roughness={0.2} />
          </mesh>
          <pointLight position={[xOff, 5.5, zOff]} color="#ffffff" intensity={0.8} distance={14} />
        </group>
      ))}

      {/* Label */}
      <Billboard position={[0, 5, 0]}>
        <Text
          fontSize={0.7}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/VT323-Regular.ttf"
          outlineWidth={0.04}
          outlineColor="#000000"
        >
          PADEL COURT
        </Text>
      </Billboard>
    </group>
  )
}

export default function Decorations() {
  return (
    <group>
      {TREES.map((t, i) => (
        <Tree key={`tree-${i}`} position={t.position} scale={t.scale} hue={t.hue} />
      ))}
      {LANTERNS.map((l, i) => (
        <Lantern key={`lantern-${i}`} position={l.position} color={l.color} />
      ))}
      <PadelCourt />
    </group>
  )
}
