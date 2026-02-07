import React, { useState } from 'react'

const InventorySlot = ({ item }) => {
    const [hovered, setHovered] = useState(false)

    return (
        <div
            className="mc-slot"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {item && (
                <>
                    <div className="slot-inner">
                        <img
                            src={item.url || `https://cdn.simpleicons.org/${item.slug}`}
                            alt={item.name}
                            className="slot-icon"
                        />
                    </div>
                    {hovered && (
                        <div className="mc-tooltip">
                            <p className="tooltip-title" style={{ color: item.color }}>
                                {item.name}
                            </p>
                            {item.powerLevel && (
                                <p className="tooltip-power">{item.powerLevel}</p>
                            )}
                            {item.flavor && (
                                <p className="tooltip-flavor">{item.flavor}</p>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default InventorySlot
