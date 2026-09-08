import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Mark, { brandVars } from '@/components/Marks'
import InstagramMark from '@/components/InstagramMark'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { motion } from 'framer-motion'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { PANELS, photoHandle, photoNote, photos, stack } from '@/data/site'
import useMediaQuery, { NARROW } from '@/lib/useMediaQuery'
import { play } from '@/lib/sound'
import { cn } from '@/lib/utils'

/* ---------- Stack ---------- */
// Tile is 2.1em; this is the per-step offset when open, in em. The closed
// offset lives in the stylesheet alongside the transition.
const TILE = 2.1
const STEP_OPEN = 2.25

/**
 * One row: a label and a pile of marks that fans open on hover.
 *
 * Same construction as the app stack in the intro — the container holds the
 * *open* width so the row never reflows, and the tiles are placed by
 * transform alone. Which tooltip is open is one piece of state, because the
 * tiles overlap and slide under the cursor.
 */
function StackRow({ row }) {
    const [active, setActive] = useState(-1)
    const openWidth = TILE + (row.items.length - 1) * STEP_OPEN

    return (
        <div className="stack-row flex items-center gap-4">
            <span className="stack-row__label t-meta w-[8.5rem] shrink-0 text-ink-faint">
                {row.label}
            </span>

            <span
                className="brandstack"
                style={{ '--fan-w': `${openWidth}em` }}
                onPointerLeave={() => setActive(-1)}
            >
                {row.items.map((name, i) => (
                    <Tooltip key={name} open={active === i}>
                        <TooltipTrigger asChild>
                            <span
                                className="brandstack__chip"
                                style={{
                                    '--i': i,
                                    // The hovered chip has to come to the
                                    // front: its ring is drawn outside its
                                    // box, so a neighbour stacked above it
                                    // would paint over that edge.
                                    zIndex: active === i ? row.items.length + 1 : row.items.length - i,
                                    ...brandVars(name),
                                }}
                                onPointerEnter={() => {
                                    setActive(i)
                                    play('hover')
                                }}
                                tabIndex={0}
                                onFocus={() => setActive(i)}
                                onBlur={() => setActive(-1)}
                                role="img"
                                aria-label={name}
                            >
                                <Mark name={name} />
                            </span>
                        </TooltipTrigger>
                        <TooltipContent>{name}</TooltipContent>
                    </Tooltip>
                ))}
            </span>
        </div>
    )
}

function Stack() {
    return (
        <TooltipProvider delayDuration={80} disableHoverableContent>
            <div className="stack-rows flex h-full flex-col justify-start">
                {stack.map((row) => (
                    <StackRow key={row.label} row={row} />
                ))}
            </div>
        </TooltipProvider>
    )
}

/* ---------- Photos ---------- */
/**
 * A justified row: every frame keeps its real proportions and the row still
 * fills the panel edge to edge. Each photo's flex-grow is its aspect ratio
 * and flex-basis is zero, so widths come out proportional to shape — squares
 * sit wider than portraits, and nothing gets cropped into a letterbox.
 */
const PHOTO_GAP = 6

/**
 * One justified row. It only avoids cropping if its height matches its
 * width: h = (available width - gaps) / sum of ratios. Measured rather than
 * guessed, so every frame shows its whole picture at any panel size.
 */
function JustifiedRow({ items, offset, onOpen }) {
    const ref = useRef(null)
    const [h, setH] = useState(0)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const ratioSum = items.reduce((a, p) => a + p.ratio, 0)
        const measure = () => {
            const usable = el.clientWidth - (items.length - 1) * PHOTO_GAP
            setH(usable > 0 ? usable / ratioSum : 0)
        }
        measure()
        const ro = new ResizeObserver(measure)
        ro.observe(el)
        return () => ro.disconnect()
    }, [items])

    return (
        <div ref={ref} className="flex w-full min-h-0 items-center">
            <div
                className="flex w-full"
                style={{ height: h ? `${h}px` : '100%', gap: `${PHOTO_GAP}px` }}
            >
                {items.map((p, i) => (
                    <button
                        key={p.src}
                        type="button"
                        onClick={() => {
                            play('shutter')
                            onOpen(offset + i)
                        }}
                        data-quiet
                        aria-label={`Open photograph ${offset + i + 1} of ${photos.length}`}
                        className="photo-tile"
                        style={{ flexGrow: p.ratio, flexBasis: 0 }}
                    >
                        <img src={p.src} alt={p.alt} decoding="async" />
                    </button>
                ))}
            </div>
        </div>
    )
}

function Photos() {
    const [open, setOpen] = useState(-1)
    const showing = open >= 0

    // Five frames across a phone would be about fifty pixels wide each, so
    // they break over two rows there. Each row justifies on its own, which
    // keeps every picture uncropped.
    const narrow = useMediaQuery(NARROW)
    const rows = narrow ? [photos.slice(0, 3), photos.slice(3)] : [photos]

    const step = useCallback((dir) => {
        setOpen((i) => (i + dir + photos.length) % photos.length)
    }, [])

    useEffect(() => {
        if (!showing) return
        const onKey = (e) => {
            if (e.key === 'ArrowRight') step(1)
            if (e.key === 'ArrowLeft') step(-1)
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [showing, step])

    return (
        <div className="flex h-full flex-col gap-3 pt-1">
            <div className="flex min-h-0 flex-1 flex-col justify-center gap-1.5">
                {rows.map((row, r) => (
                    <JustifiedRow
                        key={r}
                        items={row}
                        offset={r === 0 ? 0 : rows[0].length}
                        onOpen={setOpen}
                    />
                ))}
            </div>

            <p className="t-meta shrink-0 text-ink-faint">
                {photoNote}{' '}
                <a
                    href={photoHandle.url}
                    target="_blank"
                    rel="noreferrer"
                    className="ig-link"
                    onPointerEnter={() => play('hover')}
                >
                    <InstagramMark className="ig-link__mark" />
                    <span className="ig-link__handle">{photoHandle.label}</span>
                </a>
            </p>

            <Dialog open={showing} onOpenChange={(v) => !v && setOpen(-1)}>
                <DialogContent>
                    <DialogTitle className="sr-only">
                        {showing ? photos[open].alt : 'Photograph'}
                    </DialogTitle>
                    {showing && (
                        <img
                            src={photos[open].src}
                            alt={photos[open].alt}
                            className="max-h-[82svh] w-auto max-w-full object-contain"
                        />
                    )}
                    <div className="mt-4 flex items-center gap-4">
                        <button
                            type="button"
                            onClick={() => step(-1)}
                            className="t-ui text-white/50 transition-colors hover:text-white"
                        >
                            Previous
                        </button>
                        <span className="t-meta tabular-nums text-white/40">
                            {open + 1} / {photos.length}
                        </span>
                        <button
                            type="button"
                            onClick={() => step(1)}
                            className="t-ui text-white/50 transition-colors hover:text-white"
                        >
                            Next
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

const VIEWS = { Stack, Photos }

export default function Panels() {
    const [active, setActive] = useState(PANELS[0])
    const View = VIEWS[active]

    // The rule under the tabs slides to whichever one is current. Measured
    // rather than guessed, because the labels are different widths and the
    // type scale changes with the height of the window.
    const navRef = useRef(null)
    const [marker, setMarker] = useState({ x: 0, w: 0 })

    useLayoutEffect(() => {
        const nav = navRef.current
        if (!nav) return
        const measure = () => {
            const current = nav.querySelector('[aria-current="true"]')
            if (!current) return
            const n = nav.getBoundingClientRect()
            const c = current.getBoundingClientRect()
            setMarker({ x: c.left - n.left, w: c.width })
        }
        measure()
        // Watch the labels, not just the bar they sit in. The nav is full
        // width and never resizes, so observing it alone leaves the marker
        // stuck at whatever it measured before the webfont arrived.
        const ro = new ResizeObserver(measure)
        ro.observe(nav)
        nav.querySelectorAll('button').forEach((b) => ro.observe(b))
        document.fonts?.ready.then(measure)
        return () => ro.disconnect()
    }, [active])

    return (
        <div className="flex min-h-0 flex-col">
            <nav ref={navRef} className="tabs flex shrink-0 items-baseline gap-5 border-b border-line pb-2">
                {PANELS.map((name) => (
                    <button
                        key={name}
                        type="button"
                        onClick={() => setActive(name)}
                        aria-current={active === name ? 'true' : undefined}
                        className={cn(
                            't-ui cursor-pointer transition-colors',
                            active === name ? 'text-ink' : 'text-ink-faint hover:text-ink-soft'
                        )}
                    >
                        {name}
                    </button>
                ))}

                <span
                    className="tabs__marker"
                    aria-hidden
                    style={{ transform: `translateX(${marker.x}px)`, width: marker.w }}
                />
            </nav>

            <div className="panel-body hide-scrollbar min-h-0 overflow-y-auto">
                {/* Keyed fade-in, no exit animation — a tab must swap the
                    instant it is clicked, never wait on an outgoing one. */}
                {/* Settles downward into place. The travel is negative on
                    purpose: a positive offset pushes the content past the
                    bottom of a panel that scrolls, which is what put a
                    three-pixel scrollbar on the tab the first time round. */}
                <motion.div
                    key={active}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full"
                >
                    <View />
                </motion.div>
            </div>
        </div>
    )
}
