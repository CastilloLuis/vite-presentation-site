import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App'

export { posts } from 'virtual:posts'

/** Renders one route to a markup string. Used only by scripts/prerender.mjs. */
export function render(url) {
    return renderToString(
        <StaticRouter location={url}>
            <App />
        </StaticRouter>
    )
}
