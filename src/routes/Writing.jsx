import React from 'react'
import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router'
import { posts } from 'virtual:posts'
import CardPage from '@/routes/CardPage'
import { formatDay } from '@/lib/date'

export default function Writing() {
    return (
        <CardPage back={{ to: '/', label: 'Back' }}>
            <header className="read__head">
                <h1 className="t-hero text-ink">Writing</h1>
                <p className="t-meta text-ink-faint">
                    Notes on engineering, product and the agents doing the work.
                </p>
            </header>

            {posts.length === 0 ? (
                <p className="t-body text-ink-faint">Nothing published yet.</p>
            ) : (
                <ul className="post-list">
                    {posts.map((p) => (
                        <li key={p.slug}>
                            <Link to={`/writing/${p.slug}`} className="post-link">
                                <span className="post-link__title t-head">
                                    {p.title}
                                    <ChevronRight className="row-chev" aria-hidden />
                                </span>
                                {p.description && (
                                    <span className="post-link__blurb t-body">{p.description}</span>
                                )}
                                <span className="post-link__meta t-meta">
                                    <time dateTime={p.date}>{formatDay(p.date)}</time>
                                    <span aria-hidden> · </span>
                                    {p.minutes} min read
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </CardPage>
    )
}
