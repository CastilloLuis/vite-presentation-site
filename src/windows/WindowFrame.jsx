import React, { useState } from 'react'
import { Rnd } from 'react-rnd'
import { motion } from 'framer-motion'
import { useWindows } from '../state/windows.jsx'

const MENUBAR_H = 28

const variants = {
    initial: ({ dockRect, winX, winY, winW, winH }) => {
        if (!dockRect) return { opacity: 0, scale: 0.94, y: 12 }
        const dx = (dockRect.x + dockRect.width / 2) - (winX + winW / 2)
        const dy = (dockRect.y + dockRect.height / 2) - (winY + MENUBAR_H + winH / 2)
        return {
            opacity: 0,
            x: dx,
            y: dy,
            scale: Math.max(dockRect.width / winW, 0.08),
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
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
            scale: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
            filter: { duration: 0.3, ease: 'easeOut' },
        },
    },
    exit: ({ dockRect, winX, winY, winW, winH, exitKind }) => {
        if (exitKind === 'close' || !dockRect) {
            return {
                opacity: 0,
                scale: 0.94,
                y: 8,
                filter: 'blur(4px)',
                transition: { duration: 0.22, ease: 'easeIn' },
            }
        }
        const dx = (dockRect.x + dockRect.width / 2) - (winX + winW / 2)
        const dy = (dockRect.y + dockRect.height / 2) - (winY + MENUBAR_H + winH / 2)
        return {
            opacity: 0,
            x: dx,
            y: dy,
            scale: Math.max(dockRect.width / winW, 0.08),
            filter: 'blur(6px)',
            transition: {
                duration: 0.58,
                ease: [0.6, 0.02, 0.3, 0.98],
                opacity: { duration: 0.45, delay: 0.12 },
            },
        }
    },
}

export default function WindowFrame({ win, children, title, accent, chromeClass = '' }) {
    const { close, focus, minimize, updateBounds, getDockRect } = useWindows()
    const [hoverControls, setHoverControls] = useState(false)

    const custom = {
        dockRect: getDockRect(win.kind),
        winX: win.x,
        winY: win.y,
        winW: win.w,
        winH: win.h,
        exitKind: win.exitKind,
    }

    return (
        <Rnd
            size={{ width: win.w, height: win.h }}
            position={{ x: win.x, y: win.y }}
            minWidth={360}
            minHeight={260}
            bounds="parent"
            dragHandleClassName="window-titlebar"
            cancel=".window-controls, .window-content"
            style={{ zIndex: win.z, position: 'absolute' }}
            onDragStart={() => focus(win.id)}
            onDragStop={(_, d) => updateBounds(win.id, { x: d.x, y: d.y })}
            onResizeStart={() => focus(win.id)}
            onResizeStop={(_, __, ref, ___, pos) => {
                updateBounds(win.id, {
                    w: parseInt(ref.style.width, 10),
                    h: parseInt(ref.style.height, 10),
                    x: pos.x,
                    y: pos.y,
                })
            }}
        >
            <motion.div
                className={`window ${chromeClass}`}
                custom={custom}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                onMouseDown={() => focus(win.id)}
                style={{ width: '100%', height: '100%' }}
            >
                <div
                    className="window-titlebar"
                    onMouseEnter={() => setHoverControls(true)}
                    onMouseLeave={() => setHoverControls(false)}
                >
                    <div
                        className={`window-controls ${hoverControls ? 'is-hover' : ''}`}
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        <button
                            className="wc wc-close"
                            onClick={(e) => {
                                e.stopPropagation()
                                close(win.id)
                            }}
                            aria-label="Close"
                        >
                            <svg viewBox="0 0 10 10" width="7" height="7">
                                <path d="M1.5 1.5 8.5 8.5 M8.5 1.5 1.5 8.5" stroke="#4a0000" strokeWidth="1.4" strokeLinecap="round" />
                            </svg>
                        </button>
                        <button
                            className="wc wc-min"
                            onClick={(e) => {
                                e.stopPropagation()
                                minimize(win.id)
                            }}
                            aria-label="Minimize"
                        >
                            <svg viewBox="0 0 10 10" width="7" height="7">
                                <path d="M2 5 H8" stroke="#5a3a00" strokeWidth="1.6" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>
                    <span className="window-title" style={accent ? { color: accent } : undefined}>
                        {title || win.title}
                    </span>
                    <span className="window-title-right" />
                </div>
                <div className="window-content">{children}</div>
            </motion.div>
        </Rnd>
    )
}
