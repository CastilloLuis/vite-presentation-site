
import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Generate a pill-shaped texture using a canvas
const generatePillTexture = () => {
    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 128 // Approx 9:16 ratio
    const ctx = canvas.getContext('2d')

    // Draw pill
    ctx.fillStyle = '#1a73e8' // Google Blue
    ctx.beginPath()
    const radius = canvas.width * 0.35 // 35% border radius
    ctx.roundRect(0, 0, canvas.width, canvas.height, radius)
    ctx.fill()

    const texture = new THREE.CanvasTexture(canvas)
    return texture
}

const Particles = ({ count = 800 }) => {
    const mesh = useRef()
    const { viewport, mouse } = useThree()
    const texture = useMemo(() => generatePillTexture(), [])

    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100
            const factor = 20 + Math.random() * 100
            const speed = 0.01 + Math.random() / 200
            const x = (Math.random() - 0.5) * 20
            const y = (Math.random() - 0.5) * 20
            const z = (Math.random() - 0.5) * 10
            // Store velocity
            temp.push({ t, factor, speed, x, y, z, vx: 0, vy: 0, vz: 0 })
        }
        return temp
    }, [count])

    const dummy = useMemo(() => new THREE.Object3D(), [])

    useFrame((state) => {
        particles.forEach((particle, i) => {
            // Mouse interaction (Attraction)
            const mouseX = (state.mouse.x * viewport.width) / 2
            const mouseY = (state.mouse.y * viewport.height) / 2

            const dx = mouseX - particle.x
            const dy = mouseY - particle.y
            const dist = Math.sqrt(dx * dx + dy * dy)

            // Attraction force
            if (dist < 10) {
                const force = (10 - dist) / 10
                particle.vx += dx * force * 0.002
                particle.vy += dy * force * 0.002
            }

            // Friction
            particle.vx *= 0.95
            particle.vy *= 0.95

            // Update position
            particle.x += particle.vx
            particle.y += particle.vy

            // Gentle float/noise
            let t = particle.t += particle.speed / 4
            const floatX = Math.sin(t) * 0.02
            const floatY = Math.cos(t) * 0.02

            dummy.position.set(
                particle.x + floatX,
                particle.y + floatY,
                particle.z
            )

            // Scale based on depth/movement
            const s = 0.2 // Base scale
            dummy.scale.set(s, s, s)

            // Rotate slightly to follow movement or random
            dummy.rotation.z = Math.atan2(particle.vy, particle.vx) - Math.PI / 2

            dummy.updateMatrix()
            mesh.current.setMatrixAt(i, dummy.matrix)
        })
        mesh.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={mesh} args={[null, null, count]}>
            <planeGeometry args={[0.45, 0.8]} /> {/* 9px x 16px ratio approx */}
            <meshBasicMaterial
                map={texture}
                transparent
                opacity={0.8}
                side={THREE.DoubleSide}
                alphaTest={0.1}
            />
        </instancedMesh>
    )
}

const ParticleScene = () => {
    return (
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
            <Particles count={600} />
        </Canvas>
    )
}

export default ParticleScene
