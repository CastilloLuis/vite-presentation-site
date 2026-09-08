import { useEffect, useState } from 'react'

/**
 * Tracks a media query from JS.
 *
 * Only for differences CSS cannot express: the scrubber and the contact
 * marks live in the margins beside the card on a wide screen and inside it
 * on a phone, and no stylesheet can move a node between two parents. Purely
 * visual differences stay in the stylesheet where they belong.
 */
export default function useMediaQuery(query) {
    const [matches, setMatches] = useState(
        () => typeof window !== 'undefined' && window.matchMedia(query).matches
    )

    useEffect(() => {
        const mq = window.matchMedia(query)
        const onChange = () => setMatches(mq.matches)
        onChange()
        mq.addEventListener('change', onChange)
        // Belt and braces: if the change event is ever missed the rendered
        // structure and the stylesheet disagree, which lays the footer out
        // with the desktop rules. Resize always fires.
        window.addEventListener('resize', onChange)
        return () => {
            mq.removeEventListener('change', onChange)
            window.removeEventListener('resize', onChange)
        }
    }, [query])

    return matches
}

/** The one breakpoint the layout actually changes shape at. */
export const NARROW = '(max-width: 639px)'
