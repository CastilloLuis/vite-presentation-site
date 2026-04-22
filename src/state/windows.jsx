import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'

const WindowContext = createContext(null)

const DEFAULTS = {
    terminal: { title: 'luis — zsh', w: 760, h: 480, x: 180, y: 120 },
    finder: { title: 'Projects', w: 820, h: 520, x: 260, y: 150 },
    notes: { title: 'About.md', w: 660, h: 520, x: 320, y: 170 },
    photos: { title: 'Luis.jpg', w: 420, h: 520, x: 400, y: 110 },
    contact: { title: 'Contacts', w: 420, h: 440, x: 440, y: 180 },
}

export function WindowProvider({ children }) {
    const [windows, setWindows] = useState([])
    const zCounterRef = useRef(10)
    const dockIconRefs = useRef({})

    const registerDockIcon = useCallback((kind, node) => {
        if (node) dockIconRefs.current[kind] = node
        else delete dockIconRefs.current[kind]
    }, [])

    const getDockRect = useCallback((kind) => {
        const node = dockIconRefs.current[kind]
        if (!node) return null
        return node.getBoundingClientRect()
    }, [])

    const focus = useCallback((id) => {
        setWindows((prev) => {
            const next = zCounterRef.current + 1
            zCounterRef.current = next
            return prev.map((w) => (w.id === id ? { ...w, z: next, minimized: false } : w))
        })
    }, [])

    const open = useCallback((kind, overrides = {}) => {
        setWindows((prev) => {
            const existing = prev.find((w) => w.kind === kind)
            if (existing) {
                const next = zCounterRef.current + 1
                zCounterRef.current = next
                return prev.map((w) =>
                    w.id === existing.id
                        ? { ...w, z: next, minimized: false, exitKind: undefined }
                        : w,
                )
            }
            const base = DEFAULTS[kind] || { title: kind, w: 640, h: 440, x: 220, y: 160 }
            const id = `${kind}-${Date.now()}`
            const next = zCounterRef.current + 1
            zCounterRef.current = next
            return [
                ...prev,
                {
                    id,
                    kind,
                    ...base,
                    ...overrides,
                    z: next,
                    minimized: false,
                    exitKind: undefined,
                },
            ]
        })
    }, [])

    const close = useCallback((id) => {
        setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, exitKind: 'close' } : w)))
        requestAnimationFrame(() => {
            setWindows((prev) => prev.filter((w) => w.id !== id))
        })
    }, [])

    const minimize = useCallback((id) => {
        setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, exitKind: 'minimize' } : w)))
        requestAnimationFrame(() => {
            setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: true } : w)))
        })
    }, [])

    const updateBounds = useCallback((id, bounds) => {
        setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, ...bounds } : w)))
    }, [])

    const value = useMemo(
        () => ({
            windows,
            open,
            close,
            focus,
            minimize,
            updateBounds,
            registerDockIcon,
            getDockRect,
        }),
        [windows, open, close, focus, minimize, updateBounds, registerDockIcon, getDockRect],
    )

    return <WindowContext.Provider value={value}>{children}</WindowContext.Provider>
}

export function useWindows() {
    const ctx = useContext(WindowContext)
    if (!ctx) throw new Error('useWindows must be used within WindowProvider')
    return ctx
}
