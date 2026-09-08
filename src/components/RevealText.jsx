import React, { useMemo } from 'react'
import Mark, { hasMark } from '@/components/Marks'
import { cn } from '@/lib/utils'

/**
 * Splits a line into animatable tokens.
 *   *asterisks*  lift a phrase to full ink, however many words it holds,
 *                so "*forward-deployed AI*" resolves as one piece
 *   {claude}     drops a logo mark inline, mid-sentence
 */
function parse(text) {
    const tokens = []
    const re = /\*([^*]+)\*|\{(\w+)\}/g
    let last = 0
    let m

    const pushPlain = (str) => {
        for (const part of str.split(/(\s+)/)) {
            if (part === '') continue
            if (/^\s+$/.test(part)) tokens.push({ space: true })
            else tokens.push({ text: part })
        }
    }

    while ((m = re.exec(text)) !== null) {
        if (m.index > last) pushPlain(text.slice(last, m.index))
        if (m[1] !== undefined) tokens.push({ text: m[1], chip: true })
        else tokens.push({ slot: m[2] })
        last = m.index + m[0].length
    }
    if (last < text.length) pushPlain(text.slice(last))

    // Trailing punctuation is not a word. Left as its own token it becomes
    // its own inline-block and can wrap alone, which is how the full stop
    // after "forward-deployed AI" ended up on a line of its own. It rides
    // with the token it belongs to instead.
    for (let k = tokens.length - 1; k > 0; k -= 1) {
        const t = tokens[k]
        const prev = tokens[k - 1]
        if (t.text && /^[.,;:!?)\]]+$/.test(t.text) && prev && !prev.space) {
            prev.tail = (prev.tail ?? '') + t.text
            tokens.splice(k, 1)
        }
    }

    return tokens
}

/**
 * Resolves a line word by word — each starts muted and blurred, then snaps to
 * full ink on a stagger. Driven by CSS animation rather than JS, so it still
 * plays in a background tab and still resolves under reduced-motion.
 */
export default function RevealText({ text, className, slots, delay = 0, stagger = 0.045 }) {
    const tokens = useMemo(() => parse(text), [text])
    const animated = tokens.filter((t) => !t.space).length

    // Emphasised phrases wait for the rest of the line to finish, then land
    // together — the second beat.
    const lateAt = delay + animated * stagger + 0.22
    let i = -1
    let lateIndex = -1

    return (
        <span className={cn('inline', className)}>
            {tokens.map((t, k) => {
                if (t.space) return <React.Fragment key={k}> </React.Fragment>
                i += 1
                const late = Boolean(t.chip)
                if (late) lateIndex += 1
                // Late phrases arrive one after another, not all at once.
                const at = late ? lateAt + lateIndex * 0.13 : delay + i * stagger
                return (
                    <span
                        key={k}
                        className={late ? 'word word--late' : 'word'}
                        style={{ animationDelay: `${at.toFixed(3)}s` }}
                    >
        {t.slot ? (
                            slots?.[t.slot] ?? null
                        ) : t.chip ? (
                            hasMark(t.text) ? (
                                <span className="chip group/mark inline-flex items-baseline gap-[0.3em] whitespace-nowrap">
                                    <Mark name={t.text} />
                                    {t.text}
                                </span>
                            ) : (
                                <span className="chip">{t.text}</span>
                            )
                        ) : (
                            t.text
                        )}
                        {/* Outside the chip, so it keeps the sentence's own
                            colour, but inside this word, so it cannot wrap
                            away from what it punctuates. */}
                        {t.tail}
                    </span>
                )
            })}
        </span>
    )
}
