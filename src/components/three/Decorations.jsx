import React, { useMemo } from 'react'
import { Text, Billboard } from '@react-three/drei'
import { TREES, LANTERNS, PADEL_COURT } from '../../data/worldData3D'
import * as THREE from 'three'

function Tree({ position, scale = 1, hue = 0.28 }) {
  const color = useMemo(() => {
    const c = new THREE.Color()
    c.setHSL(hue, 0.6, 0.3)
    return c
  }, [hue])

  const lighterColor = useMemo(() => {
    const c = new THREE.Color()
    c.setHSL(hue, 0.5, 0.38)
    return c
  }, [hue])

  const trunkHeight = 2 * scale
  const canopyRadius = 1.5 * scale
  const canopyHeight = 3 * scale

  return (
    <group position={position}>
      {/* Trunk — no physics, purely visual */}
      <mesh position={[0, trunkHeight / 2, 0]} castShadow>
        <cylinderGeometry args={[0.2 * scale, 0.3 * scale, trunkHeight, 6]} />
        <meshStandardMaterial color="#5a3a1a" flatShading />
      </mesh>

      {/* Lower canopy */}
      <mesh position={[0, trunkHeight + canopyHeight * 0.3, 0]} castShadow>
        <coneGeometry args={[canopyRadius, canopyHeight * 0.6, 6]} />
        <meshStandardMaterial color={color} flatShading />
      </mesh>

      {/* Upper canopy */}
      <mesh position={[0, trunkHeight + canopyHeight * 0.7, 0]} castShadow>
        <coneGeometry args={[canopyRadius * 0.65, canopyHeight * 0.5, 6]} />
        <meshStandardMaterial color={lighterColor} flatShading />
      </mesh>
    </group>
  )
}

function Lantern({ position, color = '#FBBF24' }) {
  return (
    <group position={position}>
      <mesh position={[0, 1.2, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.1, 2.4, 6]} />
        <meshStandardMaterial color="#6B5B3E" flatShading />
      </mesh>

      <mesh position={[0, 2.6, 0]}>
        <sphereGeometry args={[0.25, 6, 6]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.5}
          flatShading
        />
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
        <meshStandardMaterial color="#2563EB" flatShading />
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
        <boxGeometry args={[0.08, 0.9, width]} />
        <meshStandardMaterial color="#e0e0e0" flatShading />
      </mesh>

      {/* Net posts */}
      {[-halfW - 0.15, halfW + 0.15].map((zOff, i) => (
        <mesh key={`post-${i}`} position={[0, 0.5, zOff]}>
          <cylinderGeometry args={[0.06, 0.06, 1, 6]} />
          <meshStandardMaterial color="#666666" flatShading />
        </mesh>
      ))}

      {/* Back walls (short sides) */}
      {[-halfL, halfL].map((xOff, i) => (
        <group key={`bw-${i}`} position={[xOff, 0, 0]}>
          <mesh position={[0, wallHeight / 2, 0]}>
            <boxGeometry args={[0.15, wallHeight, width + 0.3]} />
            <meshStandardMaterial color="#333333" flatShading />
          </mesh>
          <mesh position={[0, wallHeight + glassHeight / 2, 0]}>
            <boxGeometry args={[0.12, glassHeight, width + 0.3]} />
            <meshStandardMaterial color="#88ccff" transparent opacity={0.25} flatShading />
          </mesh>
        </group>
      ))}

      {/* Side walls (long sides) */}
      {[-halfW, halfW].map((zOff, i) => (
        <group key={`sw-${i}`} position={[0, 0, zOff]}>
          <mesh position={[0, totalWallH / 2, 0]}>
            <boxGeometry args={[length, totalWallH, 0.1]} />
            <meshStandardMaterial color="#88ccff" transparent opacity={0.2} flatShading />
          </mesh>
          <mesh position={[0, totalWallH, 0]}>
            <boxGeometry args={[length + 0.2, 0.08, 0.08]} />
            <meshStandardMaterial color="#555555" flatShading />
          </mesh>
        </group>
      ))}

      {/* Corner posts */}
      {[
        [-halfL, halfW], [halfL, halfW],
        [-halfL, -halfW], [halfL, -halfW],
      ].map(([xOff, zOff], i) => (
        <mesh key={`cp-${i}`} position={[xOff, totalWallH / 2, zOff]}>
          <boxGeometry args={[0.12, totalWallH, 0.12]} />
          <meshStandardMaterial color="#444444" flatShading />
        </mesh>
      ))}

      {/* Court lights */}
      {[
        [-halfL - 1, halfW + 1],
        [halfL + 1, halfW + 1],
        [-halfL - 1, -halfW - 1],
        [halfL + 1, -halfW - 1],
      ].map(([xOff, zOff], i) => (
        <group key={`cl-${i}`}>
          <mesh position={[xOff, 3, zOff]}>
            <cylinderGeometry args={[0.05, 0.07, 6, 6]} />
            <meshStandardMaterial color="#555555" flatShading />
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
