import React from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const Hero = () => {
    const [text, setText] = React.useState('')
    const fullText = "Hey there! Welcome👋"

    // Eye follow effect (3D Tilt)
    const rotateX = useMotionValue(0)
    const rotateY = useMotionValue(0)

    // Smooth spring animation for the movement
    const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 15 })
    const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 15 })

    React.useEffect(() => {
        const handleMouseMove = (e) => {
            const { innerWidth, innerHeight } = window
            // Calculate normalized position (-1 to 1)
            const normalizedX = (e.clientX / innerWidth) - 0.5
            const normalizedY = (e.clientY / innerHeight) - 0.5

            // Tilt the image (max 15 degrees)
            // rotateY depends on X position (looking left/right)
            // rotateX depends on Y position (looking up/down) - inverted
            rotateY.set(normalizedX * 20)
            rotateX.set(-normalizedY * 20)
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [rotateX, rotateY])

    React.useEffect(() => {
        let currentIndex = 0
        let interval;

        // Wait 0.5s before starting
        const startTimeout = setTimeout(() => {
            interval = setInterval(() => {
                if (currentIndex <= fullText.length) {
                    setText(fullText.slice(0, currentIndex))
                    currentIndex++
                } else {
                    clearInterval(interval)
                }
            }, 100) // Typing speed
        }, 500)

        return () => {
            clearTimeout(startTimeout)
            if (interval) clearInterval(interval)
        }
    }, [])

    return (
        <div className="hero-content" style={{
            display: 'flex',
            flexDirection: 'column', // Stack vertically
            alignItems: 'center', // Center horizontally
            gap: '2rem',
            maxWidth: '900px',
            margin: '2rem auto 0 auto', // Removed bottom margin
            textAlign: 'center', // Center text
            padding: '0 1rem'
        }}>
            <div style={{
                position: 'relative',
                flexShrink: 0,
                perspective: '1000px',
                width: '180px', // Enforce width for centering context
                height: '180px' // Enforce height
            }}>
                <motion.div
                    style={{
                        position: 'relative',
                        width: '180px',
                        height: '180px',
                        rotateX: springRotateX,
                        rotateY: springRotateY,
                        transformStyle: 'preserve-3d',
                        cursor: 'pointer'
                    }}
                >
                    {/* Offset Background Card */}
                    <div style={{
                        position: 'absolute',
                        top: '15px',
                        left: '15px',
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#222', // Dark shadow-like color
                        borderRadius: '24px',
                        transform: 'translateZ(-20px)', // Push back
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
                    }} />

                    {/* Main Image */}
                    <img
                        src="/pfp.png"
                        alt="Luis Castillo"
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '24px',
                            objectFit: 'cover',
                            border: '4px solid white',
                            backgroundColor: 'white', // Fallback
                            transform: 'translateZ(20px)', // Push forward
                            boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                        }}
                    />

                </motion.div>

                {/* Speech Bubble - Moved outside 3D container to stay flat */}
                <div className="speech-bubble-container">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                            delay: 0.7
                        }}
                        className="speech-bubble"
                    >
                        {text}
                        <span className="cursor"></span>
                    </motion.div>
                </div>
            </div>

            <div style={{ maxWidth: '600px' }}>
                <h2 style={{
                    fontSize: '2.5rem',
                    fontWeight: '800',
                    marginBottom: '1rem',
                    letterSpacing: '-0.02em'
                }}>
                    Luis Castillo
                </h2>
                <p className="bio" style={{
                    fontFamily: 'var(--font-space)',
                    fontSize: '14px',
                    textTransform: 'uppercase',
                    lineHeight: '1.6'
                }}>
                    SENIOR SOFTWARE ENGINEER AND TECH LEAD SPECIALIZING IN AI, BLOCKCHAIN, AND PRODUCT DEVELOPMENT. I BUILD SCALABLE CROSS-PLATFORM APPLICATIONS USING MODERN TECH STACKS.
                </p>
            </div>
        </div>
    )
}

export default Hero
