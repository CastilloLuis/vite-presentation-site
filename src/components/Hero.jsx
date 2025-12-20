import React from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Orbiting social icons configuration
const orbitingIcons = [
    { name: 'GitHub', slug: 'github', url: 'https://github.com/castilloluis', duration: 12, delay: 0 },
    { name: 'Discord', slug: 'discord', url: 'https://discord.com/users/iluiscastillo', duration: 15, delay: -5 },
    { name: 'Telegram', slug: 'telegram', url: 'https://t.me/prolcjs', duration: 18, delay: -10 }
]

const OrbitingIcon = ({ icon, orbitRadius, index, total }) => {
    // Calculate initial angle offset so icons are evenly distributed
    const angleOffset = (360 / total) * index

    return (
        <motion.div
            className="orbit-path"
            style={{
                position: 'absolute',
                width: orbitRadius * 2,
                height: orbitRadius * 2,
                top: '50%',
                left: '50%',
                marginLeft: -orbitRadius,
                marginTop: -orbitRadius,
                pointerEvents: 'none'
            }}
            animate={{ rotate: 360 }}
            transition={{
                duration: icon.duration,
                repeat: Infinity,
                ease: 'linear',
                delay: icon.delay
            }}
        >
            <motion.a
                href={icon.url}
                target="_blank"
                rel="noopener noreferrer"
                className="orbiting-icon"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    marginLeft: -20,
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15), 0 0 40px rgba(66, 133, 244, 0.1)',
                    border: '2px solid #e5e7eb',
                    cursor: 'pointer',
                    pointerEvents: 'auto',
                    transform: `rotate(${angleOffset}deg)`,
                    transformOrigin: `50% ${orbitRadius}px`
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                    delay: 0.5 + index * 0.15,
                    type: 'spring',
                    stiffness: 200,
                    damping: 15
                }}
                whileHover={{
                    scale: 1.3,
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.25), 0 0 60px rgba(66, 133, 244, 0.3)',
                    transition: { duration: 0.15, ease: 'easeOut' }
                }}
                whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
            >
                {/* Counter-rotate the icon to keep it upright */}
                <motion.img
                    src={`https://cdn.simpleicons.org/${icon.slug}`}
                    alt={icon.name}
                    style={{
                        width: 20,
                        height: 20,
                        filter: 'grayscale(30%)',
                        transition: 'filter 0.3s ease'
                    }}
                    animate={{ rotate: -360 }}
                    transition={{
                        duration: icon.duration,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: icon.delay
                    }}
                />
            </motion.a>
        </motion.div>
    )
}

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

            // Tilt the image (reduced to max 8 degrees for subtlety)
            // rotateY depends on X position (looking left/right)
            // rotateX depends on Y position (looking up/down) - inverted
            rotateY.set(normalizedX * 8)
            rotateX.set(-normalizedY * 8)
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

    const orbitRadius = 115 // Distance from center to orbiting icons

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
                width: '150px', // Reduced size
                height: '150px' // Reduced size
            }}>
                {/* Orbiting Social Icons */}
                <div className="orbit-container" style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: 0,
                    height: 0,
                    zIndex: 20
                }}>
                    {orbitingIcons.map((icon, index) => (
                        <OrbitingIcon
                            key={icon.slug}
                            icon={icon}
                            orbitRadius={orbitRadius}
                            index={index}
                            total={orbitingIcons.length}
                        />
                    ))}
                </div>

                <motion.div
                    style={{
                        position: 'relative',
                        width: '150px',
                        height: '150px',
                        rotateX: springRotateX,
                        rotateY: springRotateY,
                        transformStyle: 'preserve-3d',
                        cursor: 'pointer',
                        zIndex: 1
                    }}
                >
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
                            backgroundColor: 'white',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                        }}
                    />

                </motion.div>

                {/* Speech Bubble - Moved outside 3D container to stay flat */}
                {/* Hidden for now but component kept for future use */}
                <div className="speech-bubble-container" style={{ display: 'none' }}>
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
