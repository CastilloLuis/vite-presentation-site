import React from 'react'
import { motion } from 'framer-motion'

export default function Wallpaper() {
    return (
        <motion.div
            className="wallpaper"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden
        >
            <div className="wallpaper-layer wallpaper-aurora-a" />
            <div className="wallpaper-layer wallpaper-aurora-b" />
            <div className="wallpaper-layer wallpaper-aurora-c" />
            <div className="wallpaper-grain" />
            <div className="wallpaper-vignette" />
        </motion.div>
    )
}
