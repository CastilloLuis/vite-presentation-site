import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { Marked } from 'marked'
import hljs from 'highlight.js'

const DIR = 'content/posts'
const ID = 'virtual:posts'
const RESOLVED = '\0' + ID

/**
 * Posts, read from markdown at build time.
 *
 * The parsing and the highlighting happen here, in Node, so `marked`,
 * `gray-matter` and `highlight.js` never reach the browser — what ships is
 * the finished HTML string and a little metadata. Writing a post is adding a
 * file to content/posts and pushing.
 */
const marked = new Marked({
    gfm: true,
    breaks: false,
    renderer: {
        code({ text, lang }) {
            const language = lang && hljs.getLanguage(lang) ? lang : null
            const body = language
                ? hljs.highlight(text, { language }).value
                : escapeHtml(text)
            const label = language ? ` data-lang="${language}"` : ''
            return `<pre${label}><code class="hljs">${body}</code></pre>\n`
        },
    },
})

function escapeHtml(s) {
    return s.replace(/[&<>"']/g, (c) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    })[c])
}

function toISODay(value, file) {
    const d = value instanceof Date ? value : new Date(value)
    if (Number.isNaN(d.getTime())) throw new Error(`${file}: date is not a date`)
    return d.toISOString().slice(0, 10)
}

/** Rough, and honest about it: 200 words a minute, one minute minimum. */
function readingTime(markdown) {
    const words = markdown.trim().split(/\s+/).length
    return Math.max(1, Math.round(words / 200))
}

function load(root) {
    const dir = path.resolve(root, DIR)
    if (!fs.existsSync(dir)) return []

    return fs
        .readdirSync(dir)
        .filter((f) => f.endsWith('.md'))
        .map((file) => {
            const raw = fs.readFileSync(path.join(dir, file), 'utf8')
            const { data, content } = matter(raw)
            const slug = data.slug ?? file.replace(/\.md$/, '')

            if (!data.title) throw new Error(`${file}: frontmatter needs a title`)
            if (!data.date) throw new Error(`${file}: frontmatter needs a date`)

            return {
                slug,
                title: data.title,
                // YAML parses a bare 2026-09-09 into a Date, so this cannot
                // just be stringified — that yields "Wed Sep 09". Normalised
                // to an ISO day: it survives being serialised into the bundle,
                // sorts lexically, and is what <time datetime> wants.
                date: toISODay(data.date, file),
                description: data.description ?? '',
                tags: data.tags ?? [],
                draft: Boolean(data.draft),
                minutes: readingTime(content),
                html: marked.parse(content),
            }
        })
        .filter((p) => !(p.draft && process.env.NODE_ENV === 'production'))
        .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export default function posts() {
    let root = process.cwd()

    return {
        name: 'posts',
        configResolved(config) {
            root = config.root
        },
        resolveId(id) {
            if (id === ID) return RESOLVED
        },
        load(id) {
            if (id === RESOLVED) {
                return `export const posts = ${JSON.stringify(load(root))}`
            }
        },
        configureServer(server) {
            // Editing a post should refresh the page like editing a component.
            server.watcher.add(path.resolve(root, DIR))
            const changed = (file) => {
                if (!file.endsWith('.md')) return
                const mod = server.moduleGraph.getModuleById(RESOLVED)
                if (mod) server.moduleGraph.invalidateModule(mod)
                server.ws.send({ type: 'full-reload' })
            }
            server.watcher.on('add', changed)
            server.watcher.on('change', changed)
            server.watcher.on('unlink', changed)
        },
    }
}
