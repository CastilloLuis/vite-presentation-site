import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function BootScreen({ onDone }) {
    const [phase, setPhase] = useState('logo')

    useEffect(() => {
        const t1 = setTimeout(() => setPhase('progress'), 450)
        const t2 = setTimeout(() => setPhase('done'), 1700)
        const t3 = setTimeout(() => onDone?.(), 2200)
        return () => {
            clearTimeout(t1)
            clearTimeout(t2)
            clearTimeout(t3)
        }
    }, [onDone])

    return (
        <AnimatePresence>
            {phase !== 'done' && (
                <motion.div
                    className="boot-screen"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    onClick={() => onDone?.()}
                >
                    <motion.div
                        className="boot-logo"
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <span className="boot-logo-mark">LC</span>
                        <span className="boot-logo-caption">luisOS</span>
                    </motion.div>

                    <motion.div
                        className="boot-progress"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: phase === 'progress' ? 1 : 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <motion.div
                            className="boot-progress-fill"
                            initial={{ width: '0%' }}
                            animate={{ width: phase === 'progress' ? '100%' : '0%' }}
                            transition={{ duration: 1.1, ease: 'easeInOut' }}
                        />
                    </motion.div>

                    <span className="boot-hint">click anywhere to skip</span>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
