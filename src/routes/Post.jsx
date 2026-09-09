import React from 'react'
import { useParams } from 'react-router'
import { posts } from 'virtual:posts'
import CardPage from '@/routes/CardPage'
import NotFound from '@/routes/NotFound'
import { formatDay } from '@/lib/date'

export default function Post() {
    const { slug } = useParams()
    const post = posts.find((p) => p.slug === slug)

    if (!post) return <NotFound />

    return (
        <CardPage back={{ to: '/writing', label: 'Back' }}>
            <header className="read__head">
                <h1 className="t-hero text-ink">{post.title}</h1>
                <p className="t-meta text-ink-faint">
                    <time dateTime={post.date}>{formatDay(post.date)}</time>
                    <span aria-hidden> · </span>
                    {post.minutes} min read
                </p>
            </header>

            {/* Rendered to HTML in the build, not here. */}
            <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
        </CardPage>
    )
}
