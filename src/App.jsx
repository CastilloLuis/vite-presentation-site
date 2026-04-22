import React, { useState } from 'react'
import BootScreen from './os/BootScreen.jsx'
import Desktop from './os/Desktop.jsx'
import { WindowProvider } from './state/windows.jsx'
import './style.css'

function App() {
    const [booted, setBooted] = useState(false)

    return (
        <WindowProvider>
            <div className="os-root">
                {!booted && <BootScreen onDone={() => setBooted(true)} />}
                {booted && <Desktop />}
            </div>
        </WindowProvider>
    )
}

export default App
