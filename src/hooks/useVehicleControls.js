import { useFrame } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'

const DRIVE_SPEED = 15
const REVERSE_SPEED = 8
const TURN_SPEED = 3
const STATIONARY_TURN_SPEED = 2.5

export default function useVehicleControls(bodyRef, keysRef, frozen) {
  const frozenRef = useRef(frozen)
  useEffect(() => {
    frozenRef.current = frozen
  }, [frozen])

  const _quat = useRef(new THREE.Quaternion())
  const _forward = useRef(new THREE.Vector3())

  useFrame(() => {
    const body = bodyRef.current
    if (!body || frozenRef.current) return

    const keys = keysRef.current
    if (!keys || typeof keys.has !== 'function') return

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
        x: _forward.current.x * DRIVE_SPEED,
        y: linvel.y,
        z: _forward.current.z * DRIVE_SPEED,
      }, true)
    } else if (down) {
      body.setLinvel({
        x: -_forward.current.x * REVERSE_SPEED,
        y: linvel.y,
        z: -_forward.current.z * REVERSE_SPEED,
      }, true)
    } else {
      body.setLinvel({
        x: linvel.x * 0.92,
        y: linvel.y,
        z: linvel.z * 0.92,
      }, true)
    }

    // Turning — works always, faster while driving
    const turnDir = (left ? 1 : 0) - (right ? 1 : 0)
    if (turnDir !== 0) {
      const speed = (up || down) ? TURN_SPEED : STATIONARY_TURN_SPEED
      body.setAngvel({ x: 0, y: turnDir * speed, z: 0 }, true)
    } else {
      const angvel = body.angvel()
      body.setAngvel({ x: 0, y: angvel.y * 0.85, z: 0 }, true)
    }
  })
}
