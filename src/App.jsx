import React from 'react'
import { Route, Routes } from 'react-router'
import Home from '@/routes/Home'
import Blog from '@/routes/Blog'
import Post from '@/routes/Post'
import NotFound from '@/routes/NotFound'
import './index.css'

/**
 * Two things live here: the card, and the writing.
 *
 * The blog routes are rendered to static HTML at build time (see
 * scripts/prerender.mjs) because the scrapers that build link previews do not
 * run JavaScript — without it every post would share as the same generic
 * card. The home route stays client-rendered: it is one screen of animation
 * over a canvas, and there is nothing in it a crawler wants.
 */
export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<Post />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
