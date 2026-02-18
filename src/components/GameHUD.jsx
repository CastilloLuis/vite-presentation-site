import React from 'react'
import { ZONES_3D, MINIMAP_WORLD_RANGE } from '../data/worldData3D'

function Minimap({ playerX, playerZ }) {
  const mapW = 160
  const mapH = 120
  // Map world coords (-range..+range) to minimap pixels
  const toMapX = (wx) => ((wx + MINIMAP_WORLD_RANGE) / (MINIMAP_WORLD_RANGE * 2)) * mapW
  const toMapY = (wz) => ((wz + MINIMAP_WORLD_RANGE) / (MINIMAP_WORLD_RANGE * 2)) * mapH

  return (
    <div className="hud-minimap">
      {/* Zone dots */}
      {ZONES_3D.map((z) => (
        <div
          key={z.id}
          className={`minimap-zone minimap-zone--${z.id}`}
          style={{
            left: toMapX(z.position[0]) - 4,
            top: toMapY(z.position[2]) - 4,
          }}
        />
      ))}
      {/* Player dot */}
      <div
        className="minimap-player"
        style={{
          left: toMapX(playerX) - 3,
          top: toMapY(playerZ) - 3,
        }}
      />
    </div>
  )
}

export default function GameHUD({ playerX, playerZ, onSwitchMode }) {
  return (
    <div className="game-hud">
      {/* Name badge - top left */}
      <div className="hud-badge">
        <span className="hud-badge-name">Luis Castillo</span>
        <span className="hud-badge-title">Senior Software Engineer</span>
      </div>

      {/* Classic mode toggle */}
      {onSwitchMode && (
        <button className="hud-mode-toggle" onClick={onSwitchMode}>
          Simple View
        </button>
      )}

      {/* Controls hint - bottom center */}
      <div className="hud-controls">
        <span className="hud-controls-text">
          WASD / Arrow Keys to drive · E to interact
        </span>
      </div>

      {/* Minimap - top right */}
      <Minimap playerX={playerX} playerZ={playerZ} />
    </div>
  )
}
