import React from 'react'
import { motion } from 'framer-motion'
import { useWindows } from '../state/windows.jsx'
import Terminal from '../terminal/Terminal.jsx'
import Finder from '../windows/Finder.jsx'
import Notes from '../windows/Notes.jsx'
import Photos from '../windows/Photos.jsx'
import Contacts from '../windows/Contacts.jsx'

const TITLES = {
    terminal: 'Terminal',
    finder: 'Projects',
    notes: 'About',
    photos: 'Photos',
    contact: 'Contacts',
}

function Body({ kind }) {
    switch (kind) {
        case 'terminal': return <Terminal />
        case 'finder': return <Finder />
        case 'notes': return <Notes />
        case 'photos': return <Photos />
        case 'contact': return <Contacts />
        default: return null
    }
}

const variants = {
    initial: ({ iconRect }) => {
        if (!iconRect) return { opacity: 0, scale: 0.96 }
        const vw = window.innerWidth
        const vh = window.innerHeight
        const targetCx = vw / 2
        const targetCy = vh / 2
        const iconCx = iconRect.x + iconRect.width / 2
        const iconCy = iconRect.y + iconRect.height / 2
        return {
            opacity: 0,
            x: iconCx - targetCx,
            y: iconCy - targetCy,
            scale: Math.max(iconRect.width / vw, 0.12),
            filter: 'blur(6px)',
        }
    },
    animate: {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        transition: {
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
            filter: { duration: 0.28, ease: 'easeOut' },
        },
    },
    exit: ({ iconRect }) => {
        if (!iconRect) return { opacity: 0, scale: 0.96, transition: { duration: 0.22 } }
        const vw = window.innerWidth
        const vh = window.innerHeight
        const targetCx = vw / 2
        const targetCy = vh / 2
        const iconCx = iconRect.x + iconRect.width / 2
        const iconCy = iconRect.y + iconRect.height / 2
        return {
            opacity: 0,
            x: iconCx - targetCx,
            y: iconCy - targetCy,
            scale: Math.max(iconRect.width / vw, 0.12),
            filter: 'blur(6px)',
            transition: {
                duration: 0.48,
                ease: [0.6, 0.02, 0.3, 0.98],
                opacity: { duration: 0.38, delay: 0.1 },
            },
        }
    },
}

export default function AppShell({ win, onClose }) {
    const { getDockRect } = useWindows()
    const custom = { iconRect: getDockRect(win.kind) }

    return (
        <motion.div
            className={`mobile-app mobile-app-${win.kind}`}
            custom={custom}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <div className="mobile-app-bar">
                <button className="mobile-app-back" onClick={onClose} aria-label="Close">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M15.5 5.5 9 12l6.5 6.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Home</span>
                </button>
                <span className="mobile-app-title">{TITLES[win.kind] || win.title}</span>
                <span className="mobile-app-right" />
            </div>
            <div className="mobile-app-body">
                <Body kind={win.kind} />
            </div>
        </motion.div>
    )
}
