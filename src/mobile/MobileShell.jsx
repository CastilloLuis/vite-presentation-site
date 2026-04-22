import React from 'react'
import { AnimatePresence } from 'framer-motion'
import Wallpaper from '../os/Wallpaper.jsx'
import Home from './Home.jsx'
import AppShell from './AppShell.jsx'
import { useWindows } from '../state/windows.jsx'

export default function MobileShell() {
    const { windows, open, close } = useWindows()

    const active = windows
        .filter((w) => !w.minimized)
        .sort((a, b) => b.z - a.z)[0]

    return (
        <div className="mobile-shell">
            <Wallpaper />
            <Home onOpen={(kind) => open(kind)} />
            <AnimatePresence>
                {active && (
                    <AppShell key={active.id} win={active} onClose={() => close(active.id)} />
                )}
            </AnimatePresence>
        </div>
    )
}
