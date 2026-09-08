/**
 * Fold the Vite build into one self-contained HTML file for publishing as an
 * Artifact. Artifacts are served under a CSP that blocks every asset host, so
 * nothing may be fetched at runtime: the CSS and JS are inlined and every
 * image the bundle references becomes a data: URI.
 *
 * The output is body content, not a document — the Artifact tool supplies the
 * doctype, <html> and <head> around it.
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join, extname } from 'node:path'

const DIST = 'dist'
const OUT = process.argv[2]

const MIME = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
}

const dataUri = (path) => {
    const ext = extname(path).toLowerCase()
    const mime = MIME[ext]
    if (!mime) throw new Error(`no mime type for ${path}`)
    return `data:${mime};base64,${readFileSync(join(DIST, path)).toString('base64')}`
}

const asset = (dir) => readdirSync(join(DIST, dir)).map((f) => `${dir}/${f}`)
const assets = [...asset('icons'), ...asset('logos'), ...asset('photos')]

/** Swap every "/path/to/asset" literal for its inline equivalent. */
const inline = (src) => {
    let out = src
    for (const a of assets) {
        const ref = `"/${a}"`
        if (!out.includes(ref)) continue
        out = out.split(ref).join(JSON.stringify(dataUri(a)))
    }
    return out
}

const names = readdirSync(join(DIST, 'assets'))
const css = readFileSync(join(DIST, 'assets', names.find((n) => n.endsWith('.css'))), 'utf8')
const js = readFileSync(join(DIST, 'assets', names.find((n) => n.endsWith('.js'))), 'utf8')

// The card is sized to hold one screen, so on a normal display nothing
// scrolls on its own. The page is never locked though: a phone, or a short
// landscape window, needs to scroll or the card's ends become unreachable.
const head = `<title>Luis Castillo</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;600&family=Inter:wght@400..700&display=swap">
<style>
html, body { min-height: 100%; }
${inline(css)}
</style>
<div id="root"></div>
<script type="module">
${inline(js)}
</script>
`

writeFileSync(OUT, head)

const left = assets.filter((a) => head.includes(`"/${a}"`))
if (left.length) throw new Error(`not inlined: ${left.join(', ')}`)
console.log(`${OUT} — ${(head.length / 1e6).toFixed(2)} MB, ${assets.length} assets inlined`)
