import React, { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Wallpaper from './Wallpaper.jsx'
import MenuBar from './MenuBar.jsx'
import Dock from './Dock.jsx'
import WindowFrame from '../windows/WindowFrame.jsx'
import Terminal from '../terminal/Terminal.jsx'
import Finder from '../windows/Finder.jsx'
import Notes from '../windows/Notes.jsx'
import Photos from '../windows/Photos.jsx'
import Contacts from '../windows/Contacts.jsx'
import { useWindows } from '../state/windows.jsx'

const TITLE_MAP = {
    terminal: 'luis — zsh',
    finder: 'Projects',
    notes: 'About.md',
    photos: 'Luis.jpg',
    contact: 'Contacts',
}

function WindowBody({ kind }) {
    switch (kind) {
        case 'terminal':
            return <Terminal />
        case 'finder':
            return <Finder />
        case 'notes':
            return <Notes />
        case 'photos':
            return <Photos />
        case 'contact':
            return <Contacts />
        default:
            return null
    }
}

function centerBounds(w, h) {
    if (typeof window === 'undefined') return { x: 0, y: 0 }
    const vw = window.innerWidth
    const vh = window.innerHeight - 28
    return {
        x: Math.max(24, Math.round((vw - w) / 2)),
        y: Math.max(24, Math.round((vh - h) / 2 - 20)),
    }
}

export default function Desktop() {
    const { windows, open } = useWindows()

    useEffect(() => {
        const t = setTimeout(() => {
            open('terminal', { ...centerBounds(760, 520), w: 760, h: 520 })
        }, 350)
        return () => clearTimeout(t)
    }, [open])

    return (
        <div className="desktop">
            <Wallpaper />
            <MenuBar />
            <div className="desktop-surface">
                <AnimatePresence>
                    {windows
                        .filter((w) => !w.minimized)
                        .map((w) => (
                            <WindowFrame
                                key={w.id}
                                win={w}
                                title={TITLE_MAP[w.kind] || w.title}
                                chromeClass={`window-${w.kind}`}
                            >
                                <WindowBody kind={w.kind} />
                            </WindowFrame>
                        ))}
                </AnimatePresence>
            </div>
            <Dock />
        </div>
    )
}
