import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Mark, { brandVars } from '@/components/Marks'
import InstagramMark from '@/components/InstagramMark'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { PANELS, photoHandle, photoNote, photos, stack } from '@/data/site'
import useMediaQuery, { NARROW } from '@/lib/useMediaQuery'
import { Link } from 'react-router'
import { posts } from 'virtual:posts'
import { formatDay } from '@/lib/date'
import { play } from '@/lib/sound'
import { cn } from '@/lib/utils'

/* ---------- Stack ---------- */
/** -1 at the first tile, +1 at the last, 0 in the middle. */
const spread = (i, n) => (n < 2 ? 0 : (i - (n - 1) / 2) / ((n - 1) / 2))

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

    return (
        <div className="stack-row flex items-center gap-4">
            <span className="stack-row__label t-meta w-[8.5rem] shrink-0 text-ink-faint">
                {row.label}
            </span>

            {/* The row reserves its open width so the panel never reflows when
                the tiles fan. Only the count comes from here — how far they
                spread is the stylesheet's call, and it has to be, because the
                reserved width and the travel are the same number and would
                drift apart if they were set in two places. */}
            <span
                className="brandstack"
                style={{ '--n': row.items.length }}
                onPointerLeave={() => setActive(-1)}
            >
                {row.items.map((name, i) => (
                    <Tooltip key={name} open={active === i}>
                        <TooltipTrigger asChild>
                            <span
                                className="brandstack__chip"
                                style={{
                                    '--i': i,
                                    // Fanned like a deck: the tilt runs from
                                    // one edge to the other whatever the row
                                    // holds, so a row of nine leans no harder
                                    // than a row of three.
                                    '--r': `${spread(i, row.items.length) * 4}deg`,
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

/* ---------- Blog ---------- */
/**
 * The three most recent, and a way through to the rest. The posts themselves
 * are separate pages rather than a panel: they are the one thing on this site
 * worth a link of its own, and a tab cannot be linked to.
 */
const RECENT = 3

function Blog() {
    const recent = posts.slice(0, RECENT)

    if (recent.length === 0) {
        return (
            <div className="panel-blog">
                <p className="t-body text-ink-faint">Nothing published yet.</p>
            </div>
        )
    }

    return (
        <div className="panel-blog">
            <ul className="panel-blog__list">
                {recent.map((p) => (
                    <li key={p.slug}>
                        <Link
                            to={`/blog/${p.slug}`}
                            className="panel-post"
                            onPointerEnter={() => play('hover')}
                        >
                            <span className="panel-post__head">
                                <span className="panel-post__title t-body">{p.title}</span>
                                <span className="panel-post__meta t-meta">
                                    <time dateTime={p.date}>{formatDay(p.date)}</time>
                                    <span aria-hidden> · </span>
                                    {p.minutes} min
                                </span>
                            </span>
                            {p.description && (
                                <span className="panel-post__blurb t-meta">{p.description}</span>
                            )}
                        </Link>
                    </li>
                ))}
            </ul>

        </div>
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

const VIEWS = { Stack, Blog, Photos }

export default function Panels() {
    const [active, setActive] = useState(PANELS[0])

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

            {/* Both panels sit in the same grid cell, so the box is always
                as tall as the taller of them. It cannot scroll, because it is
                never smaller than its contents, and it cannot jump between
                tabs, because its height no longer depends on which is showing.
                The one on top fades and settles into place. */}
            <div className="panel-body min-h-0">
                {PANELS.map((name) => {
                    const Panel = VIEWS[name]
                    const on = name === active
                    return (
                        <div
                            key={name}
                            className="panel-slot"
                            data-on={on}
                            aria-hidden={!on}
                            inert={!on}
                        >
                            <Panel />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
