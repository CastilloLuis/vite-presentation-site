import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import AppIcon from '../os/AppIcon.jsx'
import { useWindows } from '../state/windows.jsx'

const APPS = [
    { kind: 'terminal', label: 'Terminal' },
    { kind: 'finder', label: 'Projects' },
    { kind: 'notes', label: 'About' },
    { kind: 'photos', label: 'Photos' },
    { kind: 'contact', label: 'Contacts' },
]

function HomeCell({ kind, label, onOpen, index }) {
    const ref = useRef(null)
    const { registerDockIcon } = useWindows()

    useEffect(() => {
        if (!kind) return
        registerDockIcon(kind, ref.current)
        return () => registerDockIcon(kind, null)
    }, [kind, registerDockIcon])

    return (
        <motion.button
            className="home-cell"
            onClick={() => onOpen(kind)}
            initial={{ opacity: 0, y: 14, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                duration: 0.55,
                delay: 0.3 + index * 0.04,
                ease: [0.22, 1, 0.36, 1],
            }}
            whileTap={{ scale: 0.92 }}
        >
            <span className="home-icon" ref={ref}>
                <AppIcon kind={kind} />
            </span>
            <span className="home-label">{label}</span>
        </motion.button>
    )
}

function Intro() {
    return (
        <motion.div
            className="home-intro"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="home-intro-eyebrow">luisOS · portfolio</div>
            <h1 className="home-intro-name">Luis Castillo</h1>
            <div className="home-intro-role">Senior Software Engineer · 8+ years</div>
            <p className="home-intro-bio">
                Leading frontend teams, taking products from scratch to prod, shipping design systems that scale.
                Crypto-native along the way.
            </p>
            <p className="home-intro-quote">
                <span>AI? AI gives speed.</span> I give direction.
            </p>
        </motion.div>
    )
}

export default function Home({ onOpen }) {
    return (
        <div className="home-screen">
            <Intro />

            <div className="home-grid">
                {APPS.map((a, i) => (
                    <HomeCell key={a.kind} kind={a.kind} label={a.label} index={i} onOpen={onOpen} />
                ))}
                <motion.a
                    className="home-cell"
                    href="https://github.com/castilloluis"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 14, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                        duration: 0.55,
                        delay: 0.3 + APPS.length * 0.04,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    whileTap={{ scale: 0.92 }}
                >
                    <span className="home-icon">
                        <AppIcon kind="github" />
                    </span>
                    <span className="home-label">GitHub</span>
                </motion.a>
            </div>

            <motion.div
                className="home-hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
            >
                Tap <strong>Terminal</strong> for the full story · <strong>About</strong> for the bio
            </motion.div>
        </div>
    )
}
