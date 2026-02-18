import { useFrame } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'

export const VEHICLE_STATS = {
  car: { drive: 15, reverse: 8, turn: 3, stationaryTurn: 2.5, damping: 0.92 },
  cat: { drive: 13, reverse: 6, turn: 4, stationaryTurn: 3.5, damping: 0.85 },
}

export default function useVehicleControls(bodyRef, keysRef, frozen, vehicleType = 'car') {
  const frozenRef = useRef(frozen)
  useEffect(() => {
    frozenRef.current = frozen
  }, [frozen])

  const typeRef = useRef(vehicleType)
  useEffect(() => {
    typeRef.current = vehicleType
  }, [vehicleType])

  const _quat = useRef(new THREE.Quaternion())
  const _forward = useRef(new THREE.Vector3())

  useFrame(() => {
    const body = bodyRef.current
    if (!body || frozenRef.current) return

    const keys = keysRef.current
    if (!keys || typeof keys.has !== 'function') return

    const stats = VEHICLE_STATS[typeRef.current] || VEHICLE_STATS.car

    const up = keys.has('arrowup') || keys.has('w')
    const down = keys.has('arrowdown') || keys.has('s')
    const left = keys.has('arrowleft') || keys.has('a')
    const right = keys.has('arrowright') || keys.has('d')

    const rot = body.rotation()
    _quat.current.set(rot.x, rot.y, rot.z, rot.w)
    _forward.current.set(0, 0, 1).applyQuaternion(_quat.current)

    const linvel = body.linvel()

    // Movement
    if (up) {
      body.setLinvel({
        x: _forward.current.x * stats.drive,
        y: linvel.y,
        z: _forward.current.z * stats.drive,
      }, true)
    } else if (down) {
      body.setLinvel({
        x: -_forward.current.x * stats.reverse,
        y: linvel.y,
        z: -_forward.current.z * stats.reverse,
      }, true)
    } else {
      body.setLinvel({
        x: linvel.x * stats.damping,
        y: linvel.y,
        z: linvel.z * stats.damping,
      }, true)
    }

    // Turning
    const turnDir = (left ? 1 : 0) - (right ? 1 : 0)
    if (turnDir !== 0) {
      const speed = (up || down) ? stats.turn : stats.stationaryTurn
      body.setAngvel({ x: 0, y: turnDir * speed, z: 0 }, true)
    } else {
      const angvel = body.angvel()
      body.setAngvel({ x: 0, y: angvel.y * 0.85, z: 0 }, true)
    }
  })
}
