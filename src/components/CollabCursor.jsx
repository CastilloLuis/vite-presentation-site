import React from 'react'
import { profile } from '@/data/site'

/**
 * A collaborator's cursor, the way Figma shows one. It lives inside the
 * pan/zoom layer, so it sits in sheet coordinates and travels with the
 * paper when you drag or zoom.
 *
 * Its path follows the order the drawing is made in, so it reads as the
 * hand that is drawing rather than a decoration parked in a corner.
 */
export default function CollabCursor() {
    return (
        <div className="collab" aria-hidden>
            {/* Three layers, one job each: the outer fades in once, the
                path element rides the sheet on a loop, and the inner one
                cancels the zoom so the cursor keeps one size the way
                Figma's does. They have to be separate elements because
                the fade and the travel would otherwise fight over
                `transform` on the same node. */}
            <div className="collab__path">
            <div className="collab__inner">
            <svg className="collab__arrow" viewBox="0 0 14 16" fill="none">
                <path
                    d="M1.2 1.1 12.4 8.3 7.2 9.1 5.1 14.2z"
                    fill="currentColor"
                    stroke="#fff"
                    strokeWidth="1.1"
                    strokeLinejoin="round"
                />
            </svg>
            <span className="collab__pill">
                <img className="collab__avatar" src="/icons/avatar.png" alt="" />
                {profile.name.split(' ')[0].toLowerCase()} @ kasti.dev
            </span>
            </div>
            </div>
        </div>
    )
}
