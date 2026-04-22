import React, { useState } from 'react'
import BootScreen from './os/BootScreen.jsx'
import Desktop from './os/Desktop.jsx'
import MobileShell from './mobile/MobileShell.jsx'
import { WindowProvider } from './state/windows.jsx'
import { useIsMobile } from './hooks/useIsMobile.js'
import './style.css'

function App() {
    const [booted, setBooted] = useState(false)
    const isMobile = useIsMobile()

    return (
        <WindowProvider>
            <div className="os-root">
                {!booted && <BootScreen onDone={() => setBooted(true)} />}
                {booted && (isMobile ? <MobileShell /> : <Desktop />)}
            </div>
        </WindowProvider>
    )
}

export default App
