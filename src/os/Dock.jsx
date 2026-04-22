import React, { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useWindows } from '../state/windows.jsx'

const DOCK_APPS = [
    { kind: 'terminal', label: 'Terminal', color: '#1a1a1a', accent: '#00e676' },
    { kind: 'finder', label: 'Projects', color: '#2b6cff', accent: '#e7f0ff' },
    { kind: 'notes', label: 'About', color: '#f3c94b', accent: '#3c2f10' },
    { kind: 'photos', label: 'Photos', color: '#ff5b8a', accent: '#ffe7ef' },
    { kind: 'contact', label: 'Contacts', color: '#9a6bff', accent: '#eee6ff' },
]

const EXTERNAL = [
    {
        label: 'GitHub',
        href: 'https://github.com/castilloluis',
        color: '#0d1117',
        accent: '#ffffff',
    },
]

const BASE = 48
const MAX = 62
const RANGE = 180

function DockIcon({ kind, mouseX, children, onClick, label, badge }) {
    const ref = useRef(null)
    const { registerDockIcon } = useWindows()
    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: BASE }
        return val - bounds.x - bounds.width / 2
    })
    const sizeRaw = useTransform(
        distance,
        [-RANGE, -RANGE / 2, 0, RANGE / 2, RANGE],
        [BASE, BASE + (MAX - BASE) * 0.35, MAX, BASE + (MAX - BASE) * 0.35, BASE],
    )
    const size = useSpring(sizeRaw, { mass: 0.35, stiffness: 220, damping: 26 })

    useEffect(() => {
        if (!kind) return
        registerDockIcon(kind, ref.current)
        return () => registerDockIcon(kind, null)
    }, [kind, registerDockIcon])

    return (
        <div className="dock-cell">
            <motion.button
                ref={ref}
                className="dock-item"
                style={{ width: size, height: size }}
                onClick={onClick}
                whileTap={{ y: -8, transition: { duration: 0.15 } }}
                aria-label={label}
            >
                {children}
                {badge && <span className="dock-badge" />}
            </motion.button>
            <span className="dock-label">{label}</span>
        </div>
    )
}

function AppIcon({ kind }) {
    if (kind === 'terminal') {
        return (
            <span className="dock-icon" style={{ background: `linear-gradient(160deg, #202428, #0a0a0a)` }}>
                <span className="dock-terminal-prompt">&gt;_</span>
            </span>
        )
    }
    if (kind === 'finder') {
        return (
            <span className="dock-icon" style={{ background: `linear-gradient(170deg, #5fa9ff, #1947c9)` }}>
                <span className="dock-finder-face">
                    <span className="dock-finder-eye" />
                    <span className="dock-finder-eye" />
                    <span className="dock-finder-smile" />
                </span>
            </span>
        )
    }
    if (kind === 'notes') {
        return (
            <span className="dock-icon" style={{ background: `linear-gradient(170deg, #fff3b0, #f2b134)` }}>
                <span className="dock-notes-lines">
                    <span /><span /><span /><span />
                </span>
            </span>
        )
    }
    if (kind === 'photos') {
        return <span className="dock-icon dock-icon-photos" />
    }
    if (kind === 'contact') {
        return (
            <span className="dock-icon" style={{ background: `linear-gradient(170deg, #c7a6ff, #7242d6)` }}>
                <svg viewBox="0 0 64 64" width="56%" height="56%" fill="none">
                    <circle cx="32" cy="24" r="11" fill="#ffffff" />
                    <path
                        d="M10 54c0-12 10-20 22-20s22 8 22 20"
                        fill="#ffffff"
                    />
                </svg>
            </span>
        )
    }
    return null
}

export default function Dock() {
    const { open, windows } = useWindows()
    const mouseX = useMotionValue(Infinity)
    const [hover, setHover] = useState(false)

    return (
        <motion.div
            className={`dock-wrap ${hover ? 'dock-wrap-hover' : ''}`}
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
            <motion.div
                className="dock"
                onMouseMove={(e) => mouseX.set(e.clientX)}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => {
                    mouseX.set(Infinity)
                    setHover(false)
                }}
            >
                {DOCK_APPS.map((app) => {
                    const isOpen = windows.some((w) => w.kind === app.kind)
                    return (
                        <DockIcon
                            key={app.kind}
                            kind={app.kind}
                            mouseX={mouseX}
                            label={app.label}
                            badge={isOpen}
                            onClick={() => open(app.kind)}
                        >
                            <AppIcon kind={app.kind} />
                        </DockIcon>
                    )
                })}
                <span className="dock-divider" />
                {EXTERNAL.map((ext) => (
                    <DockIcon
                        key={ext.label}
                        mouseX={mouseX}
                        label={ext.label}
                        onClick={() => window.open(ext.href, '_blank', 'noopener,noreferrer')}
                    >
                        <span className="dock-icon" style={{ background: ext.color }}>
                            <svg viewBox="0 0 24 24" width="55%" height="55%" fill={ext.accent}>
                                <path d="M12 .5a11.5 11.5 0 0 0-3.63 22.4c.58.1.8-.26.8-.56v-2c-3.24.7-3.92-1.56-3.92-1.56-.53-1.35-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.26 3.4.96.1-.75.4-1.26.74-1.55-2.58-.3-5.3-1.29-5.3-5.73 0-1.27.46-2.3 1.2-3.11-.12-.3-.52-1.48.11-3.08 0 0 .98-.31 3.2 1.19a11.1 11.1 0 0 1 5.82 0c2.22-1.5 3.2-1.19 3.2-1.19.63 1.6.23 2.78.11 3.08.75.81 1.2 1.84 1.2 3.11 0 4.45-2.72 5.42-5.31 5.71.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
                            </svg>
                        </span>
                    </DockIcon>
                ))}
            </motion.div>
        </motion.div>
    )
}
