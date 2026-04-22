import { useEffect, useState } from 'react'

export function useIsMobile(breakpoint = 780) {
    const getMatch = () => {
        if (typeof window === 'undefined') return false
        return window.matchMedia(`(max-width: ${breakpoint}px)`).matches
    }

    const [isMobile, setIsMobile] = useState(getMatch)

    useEffect(() => {
        const mq = window.matchMedia(`(max-width: ${breakpoint}px)`)
        const handler = (e) => setIsMobile(e.matches)
        mq.addEventListener('change', handler)
        setIsMobile(mq.matches)
        return () => mq.removeEventListener('change', handler)
    }, [breakpoint])

    return isMobile
}
