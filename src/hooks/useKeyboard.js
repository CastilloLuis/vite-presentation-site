import { useEffect, useRef } from 'react'

export default function useKeyboard() {
  const keys = useRef(new Set())

  useEffect(() => {
    const onDown = (e) => {
      // Prevent scrolling with arrow keys/space
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault()
      }
      keys.current.add(e.key.toLowerCase())
    }

    const onUp = (e) => {
      keys.current.delete(e.key.toLowerCase())
    }

    const onBlur = () => {
      keys.current.clear()
    }

    window.addEventListener('keydown', onDown)
    window.addEventListener('keyup', onUp)
    window.addEventListener('blur', onBlur)

    return () => {
      window.removeEventListener('keydown', onDown)
      window.removeEventListener('keyup', onUp)
      window.removeEventListener('blur', onBlur)
    }
  }, [])

  return keys
}
