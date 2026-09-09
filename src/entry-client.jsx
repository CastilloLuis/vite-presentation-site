import React from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App'

const root = document.getElementById('root')

const tree = (
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
)

// The blog routes ship with their markup already in the document, so they are
// hydrated. The home route is delivered empty and mounts from scratch — a
// hydrate against an empty container throws away the tree and warns.
if (root.hasChildNodes()) {
    hydrateRoot(root, tree)
} else {
    createRoot(root).render(tree)
}
