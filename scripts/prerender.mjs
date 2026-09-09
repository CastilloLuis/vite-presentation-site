/**
 * Renders the blog routes to static HTML.
 *
 * This is the whole reason the blog is worth having: the scrapers that build
 * link previews — X, LinkedIn, Discord, Slack — do not run JavaScript. Served
 * as a client-rendered app, every post would share as the same generic card
 * and search engines would have to execute the bundle to find a word of it.
 *
 * The home route is deliberately left alone. It is a canvas and a screen of
 * motion; there is nothing in it a crawler wants, and rendering it here would
 * mean making the sky, the sound and the pointer work server-side for no gain.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')

const SITE = 'https://kasti.dev'
const OG_IMAGE = `${SITE}/og.png`

const { render, posts } = await import(path.join(dist, 'server/entry-server.js'))
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

const esc = (s) =>
    String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])

/**
 * Swaps the document's head for this page's own. The template carries the
 * home page's tags, and a post that inherits them is a post that shares as
 * somebody else's summary.
 */
function withHead(html, { title, description, url, type, published }) {
    let out = html
        .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
        .replace(/(<meta name="description"\s+content=")[\s\S]*?(" \/>)/, `$1${esc(description)}$2`)
        .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
        .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${esc(url)}$2`)
        .replace(/(<meta property="og:type" content=")[^"]*(")/, `$1${type}$2`)
        .replace(/(<meta property="og:description"\s+content=")[\s\S]*?(")/, `$1${esc(description)}$2`)
        .replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${OG_IMAGE}$2`)

    const extra = [`  <link rel="canonical" href="${esc(url)}" />`]
    if (published) {
        extra.push(`  <meta property="article:published_time" content="${published}" />`)
    }
    return out.replace('</head>', `${extra.join('\n')}\n</head>`)
}

/** Everything a search engine needs to file the post as an article. */
function jsonLd(post, url) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        url,
        image: OG_IMAGE,
        author: { '@type': 'Person', name: 'Luis Castillo', url: SITE },
    }
}

const pages = [
    {
        url: '/blog',
        title: 'Writing — Luis Castillo',
        description: 'Notes on software engineering, product and AI.',
        type: 'website',
    },
    ...posts.map((p) => ({
        url: `/blog/${p.slug}`,
        title: `${p.title} — Luis Castillo`,
        description: p.description || p.title,
        type: 'article',
        published: p.date,
        ld: jsonLd(p, `${SITE}/blog/${p.slug}`),
    })),
]

for (const page of pages) {
    const markup = render(page.url)
    let html = template.replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
    html = withHead(html, { ...page, url: `${SITE}${page.url}` })

    if (page.ld) {
        html = html.replace(
            '</head>',
            `  <script type="application/ld+json">${JSON.stringify(page.ld)}</script>\n</head>`
        )
    }

    // /blog/thing -> dist/blog/thing/index.html, so any static host serves it
    // at the clean URL without rewrite rules.
    const dir = path.join(dist, page.url)
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(path.join(dir, 'index.html'), html)
    console.log(`  ${page.url}  ${(html.length / 1024).toFixed(1)} KB`)
}

// The server bundle is a build artefact, not something to deploy.
fs.rmSync(path.join(dist, 'server'), { recursive: true, force: true })
console.log(`prerendered ${pages.length} page${pages.length === 1 ? '' : 's'}`)
