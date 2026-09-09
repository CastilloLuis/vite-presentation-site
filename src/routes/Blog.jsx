import React from 'react'
import { Link } from 'react-router'
import { posts } from 'virtual:posts'
import { profile } from '@/data/site'

const fmt = (iso) =>
    new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
    })

export default function Blog() {
    return (
        <div className="prose-page">
            <header className="prose-head">
                <Link to="/" className="prose-back">{profile.name}</Link>
                <h1 className="t-lead text-ink">Writing</h1>
            </header>

            {posts.length === 0 ? (
                <p className="t-body text-ink-faint">Nothing published yet.</p>
            ) : (
                <ul className="post-list">
                    {posts.map((p) => (
                        <li key={p.slug}>
                            <Link to={`/blog/${p.slug}`} className="post-link">
                                <span className="post-link__title t-head">{p.title}</span>
                                {p.description && (
                                    <span className="post-link__blurb t-body">{p.description}</span>
                                )}
                                <span className="post-link__meta t-meta">
                                    <time dateTime={p.date}>{fmt(p.date)}</time>
                                    <span aria-hidden> · </span>
                                    {p.minutes} min read
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
