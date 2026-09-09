import React from 'react'
import { Navigate, Route, Routes, useParams } from 'react-router'
import Home from '@/routes/Home'
import Writing from '@/routes/Writing'
import Post from '@/routes/Post'
import NotFound from '@/routes/NotFound'
import './index.css'

/** /blog/thing kept working after the rename. */
function LegacyPost() {
    const { slug } = useParams()
    return <Navigate to={`/writing/${slug}`} replace />
}

/**
 * Two things live here: the card, and the writing.
 *
 * The writing routes are rendered to static HTML at build time (see
 * scripts/prerender.mjs) because the scrapers that build link previews do not
 * run JavaScript — without it every post would share as the same generic
 * card. The home route stays client-rendered: it is one screen of motion over
 * a canvas, and there is nothing in it a crawler wants.
 */
export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/writing" element={<Writing />} />
            <Route path="/writing/:slug" element={<Post />} />

            {/* The old paths, before this was called Writing. */}
            <Route path="/blog" element={<Navigate to="/writing" replace />} />
            <Route path="/blog/:slug" element={<LegacyPost />} />

            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
