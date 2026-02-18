import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody, CuboidCollider } from '@react-three/rapier'
import useVehicleControls from '../../hooks/useVehicleControls'

// ── Car Mesh ──
function CarMesh() {
  return (
    <group>
      {/* Body */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[2, 0.65, 3.4]} />
        <meshStandardMaterial color="#4A90D9" roughness={0.3} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.68, 0]} castShadow>
        <boxGeometry args={[1.85, 0.08, 3.2]} />
        <meshStandardMaterial color="#5A9FE6" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Cabin */}
      <mesh position={[0, 0.95, -0.15]} castShadow>
        <boxGeometry args={[1.55, 0.55, 1.7]} />
        <meshStandardMaterial color="#3a7ac0" roughness={0.35} metalness={0.1} />
      </mesh>
      <mesh position={[0, 1.23, -0.15]} castShadow>
        <boxGeometry args={[1.4, 0.06, 1.5]} />
        <meshStandardMaterial color="#4A90D9" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Windshield */}
      <mesh position={[0, 0.9, 0.65]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[1.35, 0.45, 0.04]} />
        <meshStandardMaterial color="#a8d8ff" transparent opacity={0.5} roughness={0.1} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0.9, -1.0]} rotation={[-0.2, 0, 0]}>
        <boxGeometry args={[1.35, 0.45, 0.04]} />
        <meshStandardMaterial color="#a8d8ff" transparent opacity={0.5} roughness={0.1} metalness={0.3} />
      </mesh>

      {/* Side windows */}
      {[0.78, -0.78].map((x, i) => (
        <mesh key={`sw-${i}`} position={[x, 0.92, -0.15]}>
          <boxGeometry args={[0.04, 0.38, 1.4]} />
          <meshStandardMaterial color="#a8d8ff" transparent opacity={0.4} roughness={0.1} metalness={0.3} />
        </mesh>
      ))}

      {/* Bumpers */}
      <mesh position={[0, 0.18, 1.72]} castShadow rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.1, 1.5, 4, 12]} />
        <meshStandardMaterial color="#3a3a4a" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.18, -1.72]} castShadow rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.1, 1.5, 4, 12]} />
        <meshStandardMaterial color="#3a3a4a" roughness={0.5} />
      </mesh>

      {/* Wheels */}
      {[
        [1.05, 0.15, 1.0], [-1.05, 0.15, 1.0],
        [1.05, 0.15, -1.0], [-1.05, 0.15, -1.0],
      ].map((pos, i) => (
        <group key={`wheel-${i}`} position={pos}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.3, 0.3, 0.22, 16]} />
            <meshStandardMaterial color="#2C3E50" roughness={0.85} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.17, 0.17, 0.24, 12]} />
            <meshStandardMaterial color="#aaa" roughness={0.25} metalness={0.6} />
          </mesh>
        </group>
      ))}

      {/* Headlights */}
      {[[0.6, 0.38, 1.72], [-0.6, 0.38, 1.72]].map((pos, i) => (
        <group key={`hl-${i}`}>
          <mesh position={pos}>
            <sphereGeometry args={[0.14, 12, 12]} />
            <meshStandardMaterial color="#ffffcc" emissive="#ffffcc" emissiveIntensity={2} roughness={0.1} />
          </mesh>
          <pointLight position={[pos[0], pos[1], pos[2] + 1]} color="#ffffcc" intensity={0.5} distance={8} />
        </group>
      ))}

      {/* Taillights */}
      {[[0.6, 0.38, -1.72], [-0.6, 0.38, -1.72]].map((pos, i) => (
        <mesh key={`tl-${i}`} position={pos}>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshStandardMaterial color="#ff3333" emissive="#ff3333" emissiveIntensity={1} roughness={0.2} />
        </mesh>
      ))}
    </group>
  )
}

// ── Cat Mesh ── ultra-simple plush toy style
function CatMesh() {
  const FUR = '#F5A623'
  const PINK = '#F8BBD0'

  return (
    <group>
      {/* Body — one big round blob */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <sphereGeometry args={[0.7, 16, 16]} />
        <meshStandardMaterial color={FUR} roughness={0.75} />
      </mesh>

      {/* Head — oversized for cute proportions */}
      <mesh position={[0, 0.95, 0.75]} castShadow>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshStandardMaterial color={FUR} roughness={0.75} />
      </mesh>

      {/* Eyes — just two small black dots */}
      {[-0.17, 0.17].map((x, i) => (
        <mesh key={`eye-${i}`} position={[x, 1.02, 1.25]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color="#111" roughness={0.4} />
        </mesh>
      ))}

      {/* Nose — tiny pink triangle */}
      <mesh position={[0, 0.9, 1.3]}>
        <coneGeometry args={[0.04, 0.05, 3]} />
        <meshStandardMaterial color={PINK} roughness={0.5} />
      </mesh>

      {/* Ears — simple cones */}
      {[-0.3, 0.3].map((x, i) => (
        <mesh key={`ear-${i}`} position={[x, 1.45, 0.65]} rotation={[0.3, 0, x > 0 ? 0.2 : -0.2]} castShadow>
          <coneGeometry args={[0.14, 0.3, 4]} />
          <meshStandardMaterial color={FUR} roughness={0.75} />
        </mesh>
      ))}

      {/* Legs — 4 tiny stubs */}
      {[
        [-0.3, 0, 0.3], [0.3, 0, 0.3],
        [-0.3, 0, -0.3], [0.3, 0, -0.3],
      ].map((pos, i) => (
        <mesh key={`leg-${i}`} position={[pos[0], 0.12, pos[2]]} castShadow>
          <cylinderGeometry args={[0.12, 0.1, 0.25, 8]} />
          <meshStandardMaterial color={FUR} roughness={0.75} />
        </mesh>
      ))}

      {/* Tail — one curved capsule */}
      <mesh position={[0, 0.8, -0.8]} rotation={[-0.8, 0, 0]} castShadow>
        <capsuleGeometry args={[0.08, 0.6, 4, 8]} />
        <meshStandardMaterial color={FUR} roughness={0.75} />
      </mesh>
    </group>
  )
}

// ── Collider configs per vehicle ──
const COLLIDER_CONFIG = {
  car: { args: [1, 0.6, 1.7], posY: 0.55 },
  cat: { args: [0.55, 0.6, 0.9], posY: 0.6 },
}

const MESH_MAP = {
  car: CarMesh,
  cat: CatMesh,
}

const Vehicle = forwardRef(function Vehicle({ keysRef, frozen, onPositionUpdate, vehicleType = 'car' }, ref) {
  const bodyRef = useRef()
  useVehicleControls(bodyRef, keysRef, frozen, vehicleType)

  useImperativeHandle(ref, () => ({
    getBody: () => bodyRef.current,
  }))

  // Report position + respawn if fallen off map
  useFrame(() => {
    const body = bodyRef.current
    if (!body) return
    const pos = body.translation()
    const rot = body.rotation()

    // Respawn at Town Center if fallen below ground
    if (pos.y < -10) {
      body.setTranslation({ x: 0, y: 3, z: -8 }, true)
      body.setLinvel({ x: 0, y: 0, z: 0 }, true)
      body.setAngvel({ x: 0, y: 0, z: 0 }, true)
      return
    }

    onPositionUpdate?.({ x: pos.x, y: pos.y, z: pos.z }, rot)
  })

  const collider = COLLIDER_CONFIG[vehicleType] || COLLIDER_CONFIG.car
  const MeshComponent = MESH_MAP[vehicleType] || CarMesh

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
      <CuboidCollider args={collider.args} position={[0, collider.posY, 0]} />
      <MeshComponent />
    </RigidBody>
  )
})

export default Vehicle
