import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWindows } from '../state/windows.jsx'

const KIND_LABELS = {
    terminal: 'Terminal',
    finder: 'Projects',
    notes: 'Notes',
    photos: 'Photos',
    contact: 'Contacts',
}

function formatTime(d) {
    const day = d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })
    const time = d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
    return `${day}  ${time}`
}

export default function MenuBar() {
    const { windows } = useWindows()
    const [now, setNow] = useState(() => new Date())

    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 1000 * 15)
        return () => clearInterval(id)
    }, [])

    const focused = windows
        .filter((w) => !w.minimized)
        .sort((a, b) => b.z - a.z)[0]
    const activeName = focused ? KIND_LABELS[focused.kind] || focused.title : null

    return (
        <motion.div
            className="menubar"
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="menubar-left">
                <AnimatePresence mode="wait">
                    {activeName && (
                        <motion.span
                            key={activeName}
                            className="menubar-active"
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 4 }}
                            transition={{ duration: 0.2 }}
                        >
                            {activeName}
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>
            <div className="menubar-right">
                <span className="menubar-time">{formatTime(now)}</span>
            </div>
        </motion.div>
    )
}
