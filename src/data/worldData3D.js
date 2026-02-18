// 3D World layout data — positions, sizes, zones, decorations

export const WORLD_SIZE = 100

// Spawn point (just south of Town Center)
export const SPAWN_POSITION = [0, 1, -8]

// Interactive zones
export const ZONES_3D = [
  {
    id: 'about',
    modalType: 'about',
    label: 'Town Center',
    position: [0, 0, 0],
    size: [12, 6, 12],
    color: '#5e5e5e',
    accentColor: '#ffffff',
    promptText: 'Press E to view Profile',
    proximity: 10,
  },
  {
    id: 'skills',
    modalType: 'skills',
    label: 'Skills Workshop',
    position: [-30, 0, 0],
    size: [10, 5, 10],
    color: '#7a5c12',
    accentColor: '#F0B429',
    promptText: 'Press E to view Skills',
    proximity: 10,
  },
  {
    id: 'stats',
    modalType: 'stats',
    label: 'Stats Tower',
    position: [30, 0, 0],
    size: [8, 10, 8],
    color: '#221644',
    accentColor: '#A78BFA',
    promptText: 'Press E to view Stats',
    proximity: 10,
  },
  {
    id: 'contact',
    modalType: 'contact',
    label: 'Contact Hub',
    position: [0, 0, 30],
    size: [10, 5, 10],
    color: '#1a3a5e',
    accentColor: '#3B82F6',
    promptText: 'Press E to view Contact',
    proximity: 10,
  },
]

// Paths connecting zones (position, width, depth for flat boxes)
export const PATHS = [
  // Town Center to Skills Workshop (west)
  { position: [-15, 0.01, 0], size: [22, 0.1, 4] },
  // Town Center to Stats Tower (east)
  { position: [15, 0.01, 0], size: [22, 0.1, 4] },
  // Town Center to Contact Hub (south)
  { position: [0, 0.01, 15], size: [4, 0.1, 22] },
]

// Trees (cone canopy + cylinder trunk) — trimmed down
export const TREES = [
  // Near Town Center
  { position: [-8, 0, -8], scale: 1.2, hue: 0.28 },
  { position: [10, 0, 6], scale: 1.1, hue: 0.32 },
  // Along west path
  { position: [-18, 0, 4], scale: 1.3, hue: 0.29 },
  // Near Skills Workshop
  { position: [-36, 0, -6], scale: 1.1, hue: 0.24 },
  { position: [-36, 0, 6], scale: 0.9, hue: 0.31 },
  // Near Stats Tower
  { position: [36, 0, -5], scale: 1.0, hue: 0.22 },
  { position: [36, 0, 5], scale: 1.3, hue: 0.25 },
  // Along south path
  { position: [-4, 0, 10], scale: 1.0, hue: 0.27 },
  // Near Contact Hub
  { position: [-7, 0, 36], scale: 1.1, hue: 0.28 },
  { position: [7, 0, 36], scale: 1.0, hue: 0.24 },
  // Scattered edges
  { position: [-40, 0, -20], scale: 1.4, hue: 0.26 },
  { position: [0, 0, -30], scale: 1.1, hue: 0.28 },
  { position: [-20, 0, -25], scale: 0.9, hue: 0.30 },
  { position: [-25, 0, 30], scale: 1.0, hue: 0.27 },
]

// Padel court position (southeast area)
export const PADEL_COURT = {
  position: [20, 0, 20],
  // Court is 12 x 6 units (length x width)
  length: 12,
  width: 6,
  wallHeight: 2.5,
  glassHeight: 1.5,
}

// Rocks — removed (caused physics jitter)

// Lanterns (post + glowing sphere)
export const LANTERNS = [
  // Along paths
  { position: [-7, 0, -2], color: '#FBBF24' },
  { position: [7, 0, -2], color: '#FBBF24' },
  { position: [-20, 0, 2], color: '#FBBF24' },
  { position: [20, 0, 2], color: '#FBBF24' },
  { position: [-2, 0, 10], color: '#FBBF24' },
  { position: [2, 0, 22], color: '#FBBF24' },
  // Near buildings
  { position: [-25, 0, -2], color: '#F0B429' },
  { position: [25, 0, -2], color: '#A78BFA' },
  { position: [-3, 0, 25], color: '#60A5FA' },
  { position: [3, 0, 35], color: '#60A5FA' },
]

// Minimap config
export const MINIMAP_WORLD_RANGE = 50 // world goes from -50 to +50
