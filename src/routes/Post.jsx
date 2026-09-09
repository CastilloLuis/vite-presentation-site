import React from 'react'
import { Link, useParams } from 'react-router'
import { posts } from 'virtual:posts'
import NotFound from '@/routes/NotFound'

const fmt = (iso) =>
    new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
    })

export default function Post() {
    const { slug } = useParams()
    const post = posts.find((p) => p.slug === slug)

    if (!post) return <NotFound />

    return (
        <div className="prose-page">
            <header className="prose-head">
                <Link to="/blog" className="prose-back">Writing</Link>
                <h1 className="t-lead text-ink">{post.title}</h1>
                <p className="t-meta text-ink-faint">
                    <time dateTime={post.date}>{fmt(post.date)}</time>
                    <span aria-hidden> · </span>
                    {post.minutes} min read
                </p>
            </header>

            {/* The markdown is rendered to HTML in the build, not here. */}
            <article className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
    )
}
