import React, { useCallback } from 'react'

export default function MobileControls({ keysRef }) {
  const press = useCallback((key) => {
    keysRef.current.add(key)
  }, [keysRef])

  const release = useCallback((key) => {
    keysRef.current.delete(key)
  }, [keysRef])

  const handleTouch = (key) => ({
    onTouchStart: (e) => { e.preventDefault(); press(key) },
    onTouchEnd: (e) => { e.preventDefault(); release(key) },
    onMouseDown: () => press(key),
    onMouseUp: () => release(key),
    onMouseLeave: () => release(key),
  })

  return (
    <div className="mobile-controls">
      <div className="dpad">
        <button className="dpad-btn dpad-up" {...handleTouch('arrowup')}>▲</button>
        <button className="dpad-btn dpad-left" {...handleTouch('arrowleft')}>◀</button>
        <button className="dpad-btn dpad-right" {...handleTouch('arrowright')}>▶</button>
        <button className="dpad-btn dpad-down" {...handleTouch('arrowdown')}>▼</button>
      </div>
      <button
        className="action-btn"
        {...handleTouch('e')}
      >
        E
      </button>
    </div>
  )
}
