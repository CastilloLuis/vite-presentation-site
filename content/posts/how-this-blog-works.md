---
title: How this blog works
date: 2026-09-09
description: Markdown files, no CMS, and a build step that renders every post to static HTML so link previews actually work.
tags: [meta, vite]
---

There is no CMS behind this. A post is a markdown file in `content/posts`, and
publishing one is a commit.

That covers the boring half of the problem. The interesting half is that this
site is a client-rendered Vite app, and a client-rendered blog is a bad blog.

## Scrapers do not run JavaScript

When you paste a link into Slack, X, LinkedIn or Discord, something on the
other end fetches the URL and reads the `<head>`. It does not boot a React
app first. Served as a single-page app, every post here would come back with
an empty `<div id="root">` and whatever meta tags the home page happens to
carry — so every post would preview as the same generic card, with the same
title, forever.

Search engines do execute JavaScript, but later and less reliably than they
read HTML.

So the build renders the blog routes ahead of time:

```bash
vite build                                    # the browser bundle
vite build --ssr src/entry-server.jsx         # the same app, for Node
node scripts/prerender.mjs                    # walk the routes, write HTML
```

The prerender step imports the server bundle, renders each route to a string,
drops it into the built `index.html`, and rewrites the head for that page:

```js
const markup = render('/blog/how-this-blog-works')
const html = template.replace(
    '<div id="root"></div>',
    `<div id="root">${markup}</div>`
)
```

Each post lands at `dist/blog/<slug>/index.html`, which any static host serves
at the clean URL with no rewrite rules.

## What is not prerendered

The home page. It is a canvas, a screen of motion and some sound — there is
nothing in it a crawler wants, and making it render without a browser would be
work in exchange for nothing. It is still delivered as an empty root and mounts
on the client, exactly as before.

## Markdown stays out of the bundle

The parsing and the syntax highlighting happen in a small Vite plugin, in
Node, at build time. What reaches the browser is a finished HTML string and a
little metadata — `marked`, `gray-matter` and `highlight.js` are never shipped.

> A blog that costs the reader 200KB of parser to read 800 words is not simple,
> whatever the README says.

## Adding a post

Write the file, give it a title and a date, push:

```markdown
---
title: Something I learned
date: 2026-10-01
description: One sentence, and it becomes the link preview.
---

The post.
```

Set `draft: true` and it stays out of production builds while still showing up
in the dev server.
