import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { COMMAND_LIST, WelcomeBanner, resolveCommand } from './commands.jsx'
import { useWindows } from '../state/windows.jsx'

const THEMES = ['green', 'amber', 'mono']

export default function Terminal() {
    const { open } = useWindows()
    const [lines, setLines] = useState(() => [
        { id: 'banner', kind: 'welcome' },
    ])
    const [input, setInput] = useState('')
    const [history, setHistory] = useState([])
    const [historyIdx, setHistoryIdx] = useState(-1)
    const [themeIdx, setThemeIdx] = useState(0)
    const [showSuggest, setShowSuggest] = useState(false)
    const [suggestIdx, setSuggestIdx] = useState(0)
    const scrollRef = useRef(null)
    const inputRef = useRef(null)

    const ctx = useMemo(
        () => ({
            cycleTheme: () => setThemeIdx((i) => (i + 1) % THEMES.length),
            nextTheme: () => THEMES[(themeIdx + 1) % THEMES.length],
            openApp: (app) => open(app),
        }),
        [themeIdx, open],
    )

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
    }, [lines])

    useEffect(() => {
        const handler = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault()
                inputRef.current?.focus()
            }
            if (e.ctrlKey && e.key.toLowerCase() === 'l') {
                e.preventDefault()
                setLines([])
            }
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [])

    const filteredSuggestions = useMemo(() => {
        if (!input.startsWith('/')) return []
        const q = input.slice(1).toLowerCase()
        return COMMAND_LIST.filter((c) => c.name.startsWith(q)).slice(0, 8)
    }, [input])

    useEffect(() => {
        setSuggestIdx(0)
        setShowSuggest(input.startsWith('/') && filteredSuggestions.length > 0)
    }, [input, filteredSuggestions.length])

    function runRaw(raw) {
        const trimmed = raw.trim()
        if (!trimmed) return
        setHistory((h) => [trimmed, ...h].slice(0, 60))
        setHistoryIdx(-1)

        const clean = trimmed.startsWith('/') ? trimmed.slice(1) : trimmed
        const [cmdName, ...args] = clean.split(/\s+/)
        const cmd = resolveCommand(cmdName.toLowerCase())

        const entryId = `e-${Date.now()}`
        if (!cmd) {
            setLines((l) => [
                ...l,
                { id: entryId, kind: 'prompt', text: trimmed },
                {
                    id: `${entryId}-r`,
                    kind: 'output',
                    node: (
                        <div className="term-block">
                            <span className="term-err">command not found:</span> {cmdName}. Try{' '}
                            <span className="term-cmd">/help</span>.
                        </div>
                    ),
                },
            ])
            return
        }
        if (cmd.meta === 'clear') {
            setLines([])
            return
        }
        const node = cmd.run(args, ctx)
        setLines((l) => [
            ...l,
            { id: entryId, kind: 'prompt', text: trimmed },
            node ? { id: `${entryId}-r`, kind: 'output', node } : null,
        ].filter(Boolean))
    }

    function onKeyDown(e) {
        if (showSuggest) {
            if (e.key === 'ArrowDown') {
                e.preventDefault()
                setSuggestIdx((i) => Math.min(i + 1, filteredSuggestions.length - 1))
                return
            }
            if (e.key === 'ArrowUp') {
                e.preventDefault()
                setSuggestIdx((i) => Math.max(i - 1, 0))
                return
            }
            if (e.key === 'Escape') {
                setShowSuggest(false)
                return
            }
            if (e.key === 'Tab') {
                e.preventDefault()
                const pick = filteredSuggestions[suggestIdx]
                if (pick) setInput(`/${pick.name} `)
                return
            }
        }
        if (e.key === 'Enter') {
            e.preventDefault()
            if (showSuggest && filteredSuggestions[suggestIdx]) {
                runRaw(`/${filteredSuggestions[suggestIdx].name}`)
            } else {
                runRaw(input)
            }
            setInput('')
            setShowSuggest(false)
            return
        }
        if (e.key === 'ArrowUp' && !showSuggest) {
            e.preventDefault()
            const next = Math.min(historyIdx + 1, history.length - 1)
            setHistoryIdx(next)
            if (history[next]) setInput(history[next])
            return
        }
        if (e.key === 'ArrowDown' && !showSuggest) {
            e.preventDefault()
            const next = Math.max(historyIdx - 1, -1)
            setHistoryIdx(next)
            setInput(next === -1 ? '' : history[next])
            return
        }
    }

    return (
        <div className={`term term-theme-${THEMES[themeIdx]}`} onClick={() => inputRef.current?.focus()}>
            <div className="term-scroll" ref={scrollRef}>
                {lines.map((line) => {
                    if (line.kind === 'welcome') return <WelcomeBanner key={line.id} />
                    if (line.kind === 'prompt') {
                        return (
                            <motion.div
                                key={line.id}
                                className="term-line term-line-prompt"
                                initial={{ opacity: 0, x: -4 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.18 }}
                            >
                                <span className="term-prompt-sigil">❯</span>
                                <span className="term-prompt-text">{line.text}</span>
                            </motion.div>
                        )
                    }
                    return (
                        <motion.div
                            key={line.id}
                            className="term-line term-line-output"
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                        >
                            {line.node}
                        </motion.div>
                    )
                })}
            </div>

            <div className="term-input-dock">
                <AnimatePresence>
                    {showSuggest && (
                        <motion.div
                            key="suggest"
                            className="term-suggest"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            transition={{ duration: 0.16 }}
                        >
                            {filteredSuggestions.map((s, i) => (
                                <div
                                    key={s.name}
                                    className={`term-suggest-row ${i === suggestIdx ? 'is-active' : ''}`}
                                    onMouseEnter={() => setSuggestIdx(i)}
                                    onMouseDown={(e) => {
                                        e.preventDefault()
                                        runRaw(`/${s.name}`)
                                        setInput('')
                                        setShowSuggest(false)
                                    }}
                                >
                                    <span className="term-suggest-name">/{s.name}</span>
                                    <span className="term-suggest-desc">{s.description}</span>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="term-input-row">
                    <span className="term-prompt-sigil">❯</span>
                    <input
                        ref={inputRef}
                        className="term-input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={onKeyDown}
                        spellCheck={false}
                        autoCapitalize="off"
                        autoComplete="off"
                        placeholder="type / for commands"
                        autoFocus={
                            typeof window !== 'undefined' &&
                            !window.matchMedia('(max-width: 780px)').matches
                        }
                    />
                </div>
            </div>
        </div>
    )
}
