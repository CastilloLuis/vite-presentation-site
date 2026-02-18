import React, { useState } from 'react'

const VEHICLES = [
  {
    id: 'car',
    name: 'Car',
    emoji: '\uD83D\uDE97',
    desc: 'Classic ride. Balanced speed and handling.',
    speed: 3,
    handling: 3,
    style: 3,
  },
  {
    id: 'cat',
    name: 'Cat',
    emoji: '\uD83D\uDC31',
    desc: 'Agile and curious. Purrfect handling.',
    speed: 3,
    handling: 4,
    style: 5,
  },
]

function StatDots({ value, max = 5 }) {
  return (
    <div className="vs-stat-dots">
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className={`vs-dot ${i < value ? 'vs-dot--filled' : ''}`} />
      ))}
    </div>
  )
}

export default function VehicleSelector({ onSelect }) {
  const [hovered, setHovered] = useState(null)

  return (
    <div className="vehicle-selector">
      <div className="vs-container">
        <h2 className="vs-title">Choose Your Ride</h2>
        <p className="vs-subtitle">Pick a vehicle to explore the world</p>

        <div className="vs-options">
          {VEHICLES.map((v) => (
            <button
              key={v.id}
              className={`vs-card ${hovered === v.id ? 'vs-card--hover' : ''}`}
              onClick={() => onSelect(v.id)}
              onMouseEnter={() => setHovered(v.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <span className="vs-emoji">{v.emoji}</span>
              <span className="vs-name">{v.name}</span>
              <span className="vs-desc">{v.desc}</span>
              <div className="vs-stats">
                <div className="vs-stat-row">
                  <span className="vs-stat-label">Speed</span>
                  <StatDots value={v.speed} />
                </div>
                <div className="vs-stat-row">
                  <span className="vs-stat-label">Handling</span>
                  <StatDots value={v.handling} />
                </div>
                <div className="vs-stat-row">
                  <span className="vs-stat-label">Style</span>
                  <StatDots value={v.style} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
