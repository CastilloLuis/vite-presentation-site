import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

const OFFSET = new THREE.Vector3(0, 6, -10)
const LOOK_OFFSET = new THREE.Vector3(0, 1.5, 4)
const LERP_SPEED = 2
const LOOK_LERP_SPEED = 4

export default function FollowCamera({ vehicleRef }) {
  const { camera } = useThree()
  const initialized = useRef(false)
  const smoothPos = useRef(new THREE.Vector3())
  const smoothLook = useRef(new THREE.Vector3())
  const _targetPos = useRef(new THREE.Vector3())
  const _lookAt = useRef(new THREE.Vector3())
  const _forward = useRef(new THREE.Vector3())

  useFrame((_, delta) => {
    const body = vehicleRef.current?.getBody?.()
    if (!body) return

    const pos = body.translation()
    const rot = body.rotation()
    const quat = new THREE.Quaternion(rot.x, rot.y, rot.z, rot.w)

    // Camera offset rotated by vehicle yaw
    _forward.current.copy(OFFSET).applyQuaternion(quat)
    _targetPos.current.set(pos.x + _forward.current.x, pos.y + OFFSET.y, pos.z + _forward.current.z)

    // Look-at target
    _lookAt.current.set(
      pos.x + LOOK_OFFSET.x,
      pos.y + LOOK_OFFSET.y,
      pos.z + LOOK_OFFSET.z
    )

    if (!initialized.current) {
      smoothPos.current.copy(_targetPos.current)
      smoothLook.current.copy(_lookAt.current)
      camera.position.copy(smoothPos.current)
      camera.lookAt(smoothLook.current)
      initialized.current = true
    } else {
      // Heavy smoothing on both position and look-at
      const tPos = 1 - Math.exp(-LERP_SPEED * delta)
      const tLook = 1 - Math.exp(-LOOK_LERP_SPEED * delta)
      smoothPos.current.lerp(_targetPos.current, tPos)
      smoothLook.current.lerp(_lookAt.current, tLook)
      camera.position.copy(smoothPos.current)
      camera.lookAt(smoothLook.current)
    }
  })

  return null
}
