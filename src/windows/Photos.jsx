import React from 'react'

export default function Photos() {
    return (
        <div className="photos">
            <div className="photos-frame">
                <img src="/pfp.png" alt="Luis Castillo" />
            </div>
            <div className="photos-caption">
                <span className="photos-title">Luis Castillo</span>
                <span className="photos-sub">1 of 1 · JPEG</span>
            </div>
        </div>
    )
}
