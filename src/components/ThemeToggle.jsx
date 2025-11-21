import React from 'react'
import { motion } from 'framer-motion'

const ThemeToggle = ({ theme, toggleTheme }) => {
    return (
        <button
            onClick={toggleTheme}
            style={{
                position: 'fixed',
                top: '2rem',
                right: '2rem',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                border: '1px solid var(--toggle-border)',
                backgroundColor: 'var(--toggle-bg)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 1000,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                outline: 'none'
            }}
            className="theme-toggle"
        >
            <motion.div
                initial={false}
                animate={{
                    rotate: theme === 'dark' ? 180 : 0,
                    scale: theme === 'dark' ? 0.8 : 1
                }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
                {theme === 'dark' ? (
                    // Moon Icon
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#ffffff' }}>
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                ) : (
                    // Sun Icon
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#1a1a1a' }}>
                        <circle cx="12" cy="12" r="5"></circle>
                        <line x1="12" y1="1" x2="12" y2="3"></line>
                        <line x1="12" y1="21" x2="12" y2="23"></line>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                        <line x1="1" y1="12" x2="3" y2="12"></line>
                        <line x1="21" y1="12" x2="23" y2="12"></line>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                )}
            </motion.div>
        </button>
    )
}

export default ThemeToggle
